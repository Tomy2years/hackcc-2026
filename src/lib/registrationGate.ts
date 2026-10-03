import { timingSafeEqual } from "node:crypto";

// Registration stays hidden (404) until REGISTRATION_ENABLED=true, and closes
// automatically once REGISTRATION_CLOSES_AT (ISO date-time) has passed.
// Before launch, organizers open /apply?preview=<REGISTRATION_PREVIEW_TOKEN> once;
// the proxy swaps that link for an httpOnly cookie so the page works for them only.
// Imported by the proxy and by server code only. Never from a client component.
// (No `server-only` import here: the proxy bundle can't load that package.)

export const PREVIEW_COOKIE = "hackcc_register_preview";

const MIN_TOKEN_LENGTH = 32;

export type RegistrationState = "hidden" | "open" | "closed";

export function getRegistrationState(): RegistrationState {
  if (process.env.REGISTRATION_ENABLED !== "true") return "hidden";

  const closesAt = process.env.REGISTRATION_CLOSES_AT;
  if (closesAt) {
    const deadline = Date.parse(closesAt);
    if (Number.isNaN(deadline)) throw new Error("REGISTRATION_CLOSES_AT is not a valid date");
    if (Date.now() >= deadline) return "closed";
  }

  return "open";
}

export function isValidPreviewToken(value: string | null | undefined): boolean {
  const token = process.env.REGISTRATION_PREVIEW_TOKEN;
  if (!token || token.length < MIN_TOKEN_LENGTH || !value) return false;

  const given = Buffer.from(value);
  const expected = Buffer.from(token);
  return given.length === expected.length && timingSafeEqual(given, expected);
}
