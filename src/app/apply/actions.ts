"use server";

import { headers } from "next/headers";
import { getRegistrationAccess } from "./access";
import { appendRow, readRegisteredEmails } from "./googleSheets";
import { OTHER_COLLEGE, registrationSchema } from "./schema";
import { verifyTurnstile } from "./turnstile";

export type SubmitRegistrationResult = { ok: true; error?: undefined } | { ok: false; error: string };

// Repeat submissions from one email are kept (organizers use the newest) up to this many rows.
const MAX_ROWS_PER_EMAIL = 5;

// Hard ceiling on total rows so a flood can't fill the sheet. Override with REGISTRATION_MAX_ROWS.
const DEFAULT_MAX_ROWS = 5_000;

const CONTACT = "team@hackcc.net";

// Stops a cell from being read as a formula if the sheet is ever exported to CSV and opened in
// Excel. Covers leading whitespace/BOM and full-width variants of = + - @.
const FORMULA_START = /^[\s﻿]*[=+\-@\t\r\n＝＋－＠]/;
const plainText = (value: string) => (FORMULA_START.test(value) ? `'${value}` : value);
const yesNo = (value: boolean) => (value ? "Yes" : "No");

function maxRows(): number {
  const parsed = Number(process.env.REGISTRATION_MAX_ROWS);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_MAX_ROWS;
}

/** Best-effort client IP for Turnstile's `remoteip` hint. Platform headers first, then the proxy chain. */
async function clientIp(): Promise<string | undefined> {
  const h = await headers();
  return (
    h.get("x-real-ip")?.trim() ||
    h.get("cf-connecting-ip")?.trim() ||
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    undefined
  );
}

/**
 * The only way registration data leaves the browser. Everything the client sends
 * is treated as untrusted and checked again here before it reaches the sheet.
 */
export async function submitRegistration(
  input: unknown,
  turnstileToken: unknown
): Promise<SubmitRegistrationResult> {
  const access = await getRegistrationAccess();
  if (access === "closed") return { ok: false, error: "Registration has closed." };
  if (access !== "open") return { ok: false, error: "Registration isn't open yet." };

  const parsed = registrationSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Some answers need another look. Please check the form and try again." };
  }

  if (typeof turnstileToken !== "string" || !turnstileToken || turnstileToken.length > 2048) {
    return { ok: false, error: "Please complete the security check above the submit button." };
  }

  try {
    if (!(await verifyTurnstile(turnstileToken, await clientIp()))) {
      return { ok: false, error: "The security check expired or failed. Please try it again." };
    }

    const data = parsed.data;
    const email = data.email.toLowerCase();
    const existing = await readRegisteredEmails();

    if (existing.length >= maxRows()) {
      return { ok: false, error: `Registration is full. Email ${CONTACT} if you think this is a mistake.` };
    }

    const earlierRows = existing.filter(stored => stored === email).length;
    if (earlierRows >= MAX_ROWS_PER_EMAIL) {
      return {
        ok: false,
        error: `This email has reached the limit of ${MAX_ROWS_PER_EMAIL} submissions. Email ${CONTACT} to make changes.`,
      };
    }

    const college = data.college === OTHER_COLLEGE ? `Other: ${data.otherCollege?.trim() ?? ""}` : data.college;

    await appendRow([
      new Date().toISOString(),
      plainText(email),
      plainText(data.name),
      plainText(data.phone),
      plainText(college),
      yesNo(data.ageCheck),
      plainText(data.interests.join(", ")),
      yesNo(data.isFirstTimer),
      data.tshirtSize,
      plainText(data.dietaryRestrictions?.trim() ?? ""),
      yesNo(data.codeOfConduct),
      String(earlierRows + 1),
    ]);

    return { ok: true };
  } catch (error) {
    // Log the failure reason only, never the applicant's answers.
    console.error("[register] save failed:", error instanceof Error ? error.message : "unknown error");
    return { ok: false, error: "We couldn't save your registration. Please try again. Your answers are still here." };
  }
}
