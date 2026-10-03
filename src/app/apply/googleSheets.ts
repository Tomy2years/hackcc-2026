import "server-only";
import { createSign } from "node:crypto";

// Talks to the Google Sheets API as the service account, using only Node's crypto
// (no Google SDK dependency). The sheet must be shared with GOOGLE_SERVICE_ACCOUNT_EMAIL
// as Editor and have a tab named "Registrations" whose row 1 holds SHEET_HEADERS.

const SHEET_TAB = "Registrations";
const SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SHEETS_API = "https://sheets.googleapis.com/v4/spreadsheets";
const TIMEOUT_MS = 10_000;

/** Expected row 1 of the Registrations tab, in column order A–L. */
export const SHEET_HEADERS = [
  "Submitted At",
  "Email",
  "Name",
  "Phone",
  "College",
  "18+ Confirmed",
  "Interests",
  "First Hackathon",
  "T-Shirt",
  "Dietary Restrictions",
  "Code of Conduct",
  "Submission #",
] as const;

const LAST_COLUMN = String.fromCharCode("A".charCodeAt(0) + SHEET_HEADERS.length - 1);

function getConfig() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  // Hosting dashboards store the key on one line with literal "\n"s.
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!clientEmail || !privateKey || !sheetId) {
    throw new Error("Google Sheets env vars are missing");
  }
  return { clientEmail, privateKey, sheetId };
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * fetch with a timeout and, when `retryStatuses` is given, up to 3 attempts with
 * jittered backoff on those statuses or network errors. Callers decide what is
 * safe to retry: reads and token requests always are, writes only on 429.
 */
async function fetchWithRetry(url: string, init: RequestInit, retryStatuses: number[] = []): Promise<Response> {
  const attempts = retryStatuses.length ? 3 : 1;
  let lastError: unknown;

  for (let attempt = 0; attempt < attempts; attempt++) {
    if (attempt > 0) await sleep(300 * 2 ** (attempt - 1) + Math.random() * 200);
    try {
      const res = await fetch(url, { ...init, cache: "no-store", signal: AbortSignal.timeout(TIMEOUT_MS) });
      if (!retryStatuses.includes(res.status) || attempt === attempts - 1) return res;
      lastError = new Error(`HTTP ${res.status}`);
    } catch (error) {
      lastError = error;
      if (attempt === attempts - 1) throw error;
    }
  }
  throw lastError;
}

let cachedToken: { value: string; expiresAt: number } | null = null;
let pendingToken: Promise<string> | null = null;

async function requestAccessToken(clientEmail: string, privateKey: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const encode = (part: object) => Buffer.from(JSON.stringify(part)).toString("base64url");
  const unsigned = `${encode({ alg: "RS256", typ: "JWT" })}.${encode({
    iss: clientEmail,
    scope: SCOPE,
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  })}`;
  const signature = createSign("RSA-SHA256").update(unsigned).sign(privateKey).toString("base64url");

  const res = await fetchWithRetry(
    TOKEN_URL,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: `${unsigned}.${signature}`,
      }),
    },
    [429, 500, 502, 503, 504]
  );
  if (!res.ok) throw new Error(`Google token request failed (${res.status})`);

  const json = (await res.json()) as { access_token?: string; expires_in?: number };
  if (!json.access_token) throw new Error("Google token response had no access_token");

  cachedToken = { value: json.access_token, expiresAt: Date.now() + (json.expires_in ?? 3600) * 1000 };
  return json.access_token;
}

/** One token per warm instance; concurrent cold-start calls share a single request. */
async function getAccessToken(clientEmail: string, privateKey: string): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.value;
  if (!pendingToken) {
    pendingToken = requestAccessToken(clientEmail, privateKey).finally(() => {
      pendingToken = null;
    });
  }
  return pendingToken;
}

async function sheetsRequest(path: string, init: RequestInit, retryStatuses: number[]): Promise<Response> {
  const { clientEmail, privateKey, sheetId } = getConfig();
  const token = await getAccessToken(clientEmail, privateKey);
  const res = await fetchWithRetry(
    `${SHEETS_API}/${sheetId}${path}`,
    { ...init, headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } },
    retryStatuses
  );
  if (!res.ok) throw new Error(`Google Sheets request failed (${res.status})`);
  return res;
}

/** Every email in column B below the header (lowercased), used to count rows and repeat submissions. */
export async function readRegisteredEmails(): Promise<string[]> {
  const range = encodeURIComponent(`${SHEET_TAB}!B2:B`);
  const res = await sheetsRequest(`/values/${range}?majorDimension=COLUMNS`, {}, [429, 500, 502, 503, 504]);
  const json = (await res.json()) as { values?: string[][] };
  // Strip the formula-guard apostrophe so stored values compare equal to fresh input.
  return (json.values?.[0] ?? []).map(email => email.trim().replace(/^'/, "").toLowerCase());
}

/**
 * Appends one row. RAW input means Sheets stores every value as plain text
 * and never evaluates it as a formula. Retried only on 429 (nothing was written).
 */
export async function appendRow(row: string[]): Promise<void> {
  if (row.length !== SHEET_HEADERS.length) throw new Error("Row does not match SHEET_HEADERS");
  const range = encodeURIComponent(`${SHEET_TAB}!A:${LAST_COLUMN}`);
  await sheetsRequest(
    `/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    { method: "POST", body: JSON.stringify({ values: [row] }) },
    [429]
  );
}
