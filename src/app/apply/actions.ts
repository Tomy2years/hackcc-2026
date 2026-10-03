"use server";

import { headers } from "next/headers";
import { canAccessRegistration } from "./access";
import { appendRow, readRegisteredEmails } from "./googleSheets";
import { OTHER_COLLEGE, registrationSchema } from "./schema";
import { verifyTurnstile } from "./turnstile";

export type SubmitRegistrationResult = { ok: true; error?: undefined } | { ok: false; error: string };

// Repeat submissions from one email are kept (newest wins) up to this many rows.
const MAX_ROWS_PER_EMAIL = 5;

// Stops a cell from being read as a formula if the sheet is ever exported to CSV and opened in Excel.
const plainText = (value: string) => (/^[=+\-@\t\r]/.test(value) ? `'${value}` : value);
const yesNo = (value: boolean) => (value ? "Yes" : "No");

/**
 * The only way registration data leaves the browser. Everything the client sends
 * is treated as untrusted and checked again here before it reaches the sheet.
 */
export async function submitRegistration(
  input: unknown,
  turnstileToken: unknown
): Promise<SubmitRegistrationResult> {
  if (!(await canAccessRegistration())) {
    return { ok: false, error: "Registration isn't open yet." };
  }

  const parsed = registrationSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Some answers need another look. Please check the form and try again." };
  }

  if (typeof turnstileToken !== "string" || !turnstileToken || turnstileToken.length > 2048) {
    return { ok: false, error: "Please complete the security check above the submit button." };
  }

  try {
    const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim();
    if (!(await verifyTurnstile(turnstileToken, ip))) {
      return { ok: false, error: "The security check expired or failed. Please try it again." };
    }

    const data = parsed.data;
    const email = data.email.toLowerCase();
    const earlierRows = (await readRegisteredEmails()).filter(existing => existing === email).length;

    // Same reply as a save, so the form never reveals whether an email has registered.
    if (earlierRows >= MAX_ROWS_PER_EMAIL) return { ok: true };

    const college = data.college === OTHER_COLLEGE ? `Other: ${data.otherCollege ?? ""}` : data.college;

    await appendRow([
      new Date().toISOString(),
      plainText(email),
      plainText(data.name),
      data.phone,
      plainText(college),
      yesNo(data.ageCheck),
      data.interests.join(", "),
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
