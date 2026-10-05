/** US phone numbers on the application: 10 digits, shown as 714-555-0199. */
export const PHONE_DIGITS = 10;

/**
 * Keeps only the first 10 digits and adds the dashes as you type ("7145" -> "714-5").
 * A pasted "+1 (714) 555-0199" keeps working: a leading 1 country code is dropped when there are 11 digits.
 */
export function formatPhone(input: string): string {
  let digits = input.replace(/\D/g, "");
  if (digits.length === PHONE_DIGITS + 1 && digits.startsWith("1")) digits = digits.slice(1);
  digits = digits.slice(0, PHONE_DIGITS);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/** Where the caret belongs in the formatted value: just after the same number of digits it followed before. */
export function caretAfterDigits(formatted: string, digitsBeforeCaret: number): number {
  if (digitsBeforeCaret <= 0) return 0;
  let seen = 0;
  for (let i = 0; i < formatted.length; i++) {
    if (/\d/.test(formatted[i]) && ++seen === digitsBeforeCaret) return i + 1;
  }
  return formatted.length;
}
