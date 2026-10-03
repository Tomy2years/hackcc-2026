import "server-only";
import { createSign } from "node:crypto";

// Talks to the Google Sheets API as the service account, using only Node's crypto
// (no Google SDK dependency). The sheet must be shared with GOOGLE_SERVICE_ACCOUNT_EMAIL
// as Editor and have a tab named "Registrations".

const SHEET_TAB = "Registrations";
const SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SHEETS_API = "https://sheets.googleapis.com/v4/spreadsheets";

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

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(clientEmail: string, privateKey: string): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.value;

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

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsigned}.${signature}`,
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Google token request failed (${res.status})`);

  const json = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = { value: json.access_token, expiresAt: Date.now() + json.expires_in * 1000 };
  return json.access_token;
}

async function sheetsRequest(path: string, init?: RequestInit): Promise<Response> {
  const { clientEmail, privateKey, sheetId } = getConfig();
  const token = await getAccessToken(clientEmail, privateKey);
  const res = await fetch(`${SHEETS_API}/${sheetId}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Google Sheets request failed (${res.status})`);
  return res;
}

/** Every email in column B (lowercased), used to number repeat submissions. */
export async function readRegisteredEmails(): Promise<string[]> {
  const range = encodeURIComponent(`${SHEET_TAB}!B2:B`);
  const res = await sheetsRequest(`/values/${range}?majorDimension=COLUMNS`);
  const json = (await res.json()) as { values?: string[][] };
  return (json.values?.[0] ?? []).map(email => email.trim().toLowerCase());
}

/**
 * Appends one row. RAW input means Sheets stores every value as plain text
 * and never evaluates it as a formula.
 */
export async function appendRow(row: string[]): Promise<void> {
  const range = encodeURIComponent(`${SHEET_TAB}!A:L`);
  await sheetsRequest(`/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`, {
    method: "POST",
    body: JSON.stringify({ values: [row] }),
  });
}
