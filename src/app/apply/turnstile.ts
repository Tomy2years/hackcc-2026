import "server-only";

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TIMEOUT_MS = 8_000;

// Must match the `action` the widget is rendered with in TurnstileWidget.tsx.
export const TURNSTILE_ACTION = "register";

// Cloudflare's documented always-pass/always-fail TEST secrets (1x…, 2x…, 3x…, zeros, AA).
// Their siteverify replies carry a dummy hostname and no action, so those checks are
// skipped for them; they are refused in production, so that only ever affects local dev.
const TEST_SECRET = /^[123]x0+AA$/;

interface SiteverifyResponse {
  success?: boolean;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
}

function getSecret(): { secret: string; isTestKey: boolean } {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) throw new Error("TURNSTILE_SECRET_KEY is missing");
  const isTestKey = TEST_SECRET.test(secret);
  if (process.env.NODE_ENV === "production" && isTestKey) {
    throw new Error("TURNSTILE_SECRET_KEY is a Cloudflare test key; production needs a real one");
  }
  return { secret, isTestKey };
}

/** Hostnames the token may have been solved on. Unset = accept any (fine for local dev only). */
function allowedHostnames(): string[] | null {
  const raw = process.env.TURNSTILE_ALLOWED_HOSTNAMES;
  if (!raw) return null;
  return raw.split(",").map(host => host.trim().toLowerCase()).filter(Boolean);
}

/**
 * Asks Cloudflare whether the widget token is real, was solved for our registration
 * action, and on one of our hostnames. Each token works once.
 */
export async function verifyTurnstile(token: string, remoteIp?: string): Promise<boolean> {
  const { secret, isTestKey } = getSecret();
  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  const res = await fetch(VERIFY_URL, {
    method: "POST",
    body,
    cache: "no-store",
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) return false;

  const result = (await res.json()) as SiteverifyResponse;
  if (result.success !== true) return false;
  if (isTestKey) return true;

  if (result.action !== TURNSTILE_ACTION) return false;
  const hosts = allowedHostnames();
  if (hosts && !hosts.includes((result.hostname ?? "").toLowerCase())) return false;

  return true;
}
