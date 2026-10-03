import { timingSafeEqual } from "node:crypto";

// Registration stays hidden (404) until REGISTRATION_ENABLED=true.
// Before launch, organizers open /apply?preview=<REGISTRATION_PREVIEW_TOKEN> once;
// the proxy swaps that link for an httpOnly cookie so the page works for them only.
// Imported by the proxy and by server code only. Never from a client component.

export const PREVIEW_COOKIE = "hackcc_register_preview";

const MIN_TOKEN_LENGTH = 32;

export function isRegistrationOpen(): boolean {
  return process.env.REGISTRATION_ENABLED === "true";
}

export function isValidPreviewToken(value: string | null | undefined): boolean {
  const token = process.env.REGISTRATION_PREVIEW_TOKEN;
  if (!token || token.length < MIN_TOKEN_LENGTH || !value) return false;

  const given = Buffer.from(value);
  const expected = Buffer.from(token);
  return given.length === expected.length && timingSafeEqual(given, expected);
}
