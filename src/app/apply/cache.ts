import "server-only";
import { createHmac } from "node:crypto";
import { Redis } from "@upstash/redis";
import { readRegisteredEmails } from "./googleSheets";

// Redis key namespaced for HackCC registrations
const REDIS_KEY_EMAILS = "hackcc:reg:emails";
const REDIS_KEY_TOTAL = "hackcc:reg:total";
const REDIS_KEY_SEEDED_AT = "hackcc:reg:seeded_at";

// Re-sync with Google Sheets periodically to pick up any manual edits by organizers
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

const hasRedisEnv = Boolean(
  (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) ||
  (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
);

const redis = hasRedisEnv ? Redis.fromEnv() : null;

function getSecret(): string {
  return process.env.REGISTRATION_CACHE_SECRET || process.env.GOOGLE_PRIVATE_KEY || "hackcc-dev-salt";
}

// Rate limiting config: max submissions per IP in a rolling window
const IP_RATE_LIMIT_WINDOW_S = 600; // 10 minutes
const DEFAULT_IP_RATE_LIMIT_MAX = 10; // max 10 submissions per 10 minutes per IP
const REDIS_PREFIX_IP_LIMIT = "hackcc:ratelimit:ip:";

// In-memory rate limiting fallback for local dev or when Redis is absent
const ipRateLimitMemory = new Map<string, { count: number; resetAt: number }>();

function getMaxSubmissionsPerIp(): number {
  const parsed = Number(process.env.REGISTRATION_IP_RATE_LIMIT_MAX);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_IP_RATE_LIMIT_MAX;
}

/**
 * Window-based per-IP rate limiter.
 * Returns true if request is within limits, false if rate limit is exceeded.
 */
export async function checkIpRateLimit(ip: string | undefined): Promise<boolean> {
  if (!ip) return true; // Can't rate limit without an identifiable IP; Turnstile handles bot defense

  const maxSubmissions = getMaxSubmissionsPerIp();
  const now = Date.now();

  if (redis) {
    try {
      const key = `${REDIS_PREFIX_IP_LIMIT}${ip}`;
      const count = await redis.incr(key);
      if (count === 1) {
        await redis.expire(key, IP_RATE_LIMIT_WINDOW_S);
      }
      return count <= maxSubmissions;
    } catch (err) {
      console.warn("[ratelimit] Redis error, falling back to memory:", err instanceof Error ? err.message : err);
    }
  }

  // In-memory fallback
  const record = ipRateLimitMemory.get(ip);
  if (!record || now > record.resetAt) {
    ipRateLimitMemory.set(ip, { count: 1, resetAt: now + IP_RATE_LIMIT_WINDOW_S * 1000 });
    return true;
  }

  record.count += 1;
  return record.count <= maxSubmissions;
}

/**
 * Blind-index hash of the email. Uses HMAC-SHA256 with a server secret.
 * Neither raw emails nor reversible strings are ever stored in Redis or memory.
 */
export function hashEmail(email: string): string {
  return createHmac("sha256", getSecret()).update(email.trim().toLowerCase()).digest("hex");
}

// In-memory fallback if Redis credentials are not configured (e.g. local dev)
interface MemoryCache {
  counts: Map<string, number>;
  totalRows: number;
  seededAt: number;
}

let memoryCache: MemoryCache | null = null;
let syncPromise: Promise<void> | null = null;

async function syncFromGoogleSheets(): Promise<void> {
  const rawEmails = await readRegisteredEmails();
  const counts = new Map<string, number>();

  for (const raw of rawEmails) {
    const h = hashEmail(raw);
    counts.set(h, (counts.get(h) ?? 0) + 1);
  }

  const now = Date.now();

  if (redis) {
    const pipeline = redis.pipeline();
    pipeline.del(REDIS_KEY_EMAILS);

    if (counts.size > 0) {
      const hashEntries: Record<string, number> = {};
      counts.forEach((count, hash) => {
        hashEntries[hash] = count;
      });
      pipeline.hset(REDIS_KEY_EMAILS, hashEntries);
    }

    pipeline.set(REDIS_KEY_TOTAL, rawEmails.length);
    pipeline.set(REDIS_KEY_SEEDED_AT, now);
    await pipeline.exec();
  }

  // Always update memory cache as well
  memoryCache = {
    counts,
    totalRows: rawEmails.length,
    seededAt: now,
  };
}

/** Single-flight lock so concurrent cold starts only execute one Google Sheets fetch */
async function ensureSynced(): Promise<void> {
  if (!syncPromise) {
    syncPromise = syncFromGoogleSheets().finally(() => {
      syncPromise = null;
    });
  }
  return syncPromise;
}

/**
 * Retrieves existing submission count for this applicant and total registration rows.
 * Uses Upstash Redis when configured; falls back seamlessly to in-memory cache.
 */
export async function getRegistrationCounts(email: string): Promise<{ earlierRows: number; totalRows: number }> {
  const emailHash = hashEmail(email);
  const now = Date.now();

  if (redis) {
    try {
      const pipeline = redis.pipeline();
      pipeline.hget<number>(REDIS_KEY_EMAILS, emailHash);
      pipeline.get<number>(REDIS_KEY_TOTAL);
      pipeline.get<number>(REDIS_KEY_SEEDED_AT);
      const [earlierRaw, totalRaw, seededAtRaw] = await pipeline.exec<[number | null, number | null, number | null]>();

      const isExpired = !seededAtRaw || now - Number(seededAtRaw) > CACHE_TTL_MS;

      if (isExpired || totalRaw === null) {
        await ensureSynced();
        // Read directly from updated memory or re-read Redis
        const count = memoryCache?.counts.get(emailHash) ?? 0;
        const total = memoryCache?.totalRows ?? 0;
        return { earlierRows: count, totalRows: total };
      }

      return {
        earlierRows: earlierRaw !== null && earlierRaw !== undefined ? Number(earlierRaw) : 0,
        totalRows: totalRaw !== null && totalRaw !== undefined ? Number(totalRaw) : 0,
      };
    } catch (err) {
      console.warn("[cache] Redis read error, falling back to direct sheet sync:", err instanceof Error ? err.message : err);
      await ensureSynced();
      return {
        earlierRows: memoryCache?.counts.get(emailHash) ?? 0,
        totalRows: memoryCache?.totalRows ?? 0,
      };
    }
  }

  // Fallback: in-memory cache for local development
  if (!memoryCache || now - memoryCache.seededAt > CACHE_TTL_MS) {
    await ensureSynced();
  }

  return {
    earlierRows: memoryCache?.counts.get(emailHash) ?? 0,
    totalRows: memoryCache?.totalRows ?? 0,
  };
}

/**
 * Updates the cache immediately upon a successful submission write-through.
 * Keeps Redis and memory in sync without needing a Google Sheets read.
 */
export async function recordSubmission(email: string): Promise<void> {
  const emailHash = hashEmail(email);

  if (redis) {
    try {
      const pipeline = redis.pipeline();
      pipeline.hincrby(REDIS_KEY_EMAILS, emailHash, 1);
      pipeline.incr(REDIS_KEY_TOTAL);
      await pipeline.exec();
    } catch (err) {
      console.warn("[cache] Redis increment error:", err instanceof Error ? err.message : err);
    }
  }

  if (memoryCache) {
    const current = memoryCache.counts.get(emailHash) ?? 0;
    memoryCache.counts.set(emailHash, current + 1);
    memoryCache.totalRows += 1;
  }
}
