import "server-only";
import { cookies } from "next/headers";
import { isRegistrationOpen, isValidPreviewToken, PREVIEW_COOKIE } from "@/lib/registrationGate";

/**
 * True when this visitor may see and submit the registration form.
 * Checked by the page AND by the submit action, so a hidden form can't be posted to.
 * Local `next dev` always has access so the team can work on it.
 */
export async function canAccessRegistration(): Promise<boolean> {
  if (process.env.NODE_ENV === "development") return true;
  if (isRegistrationOpen()) return true;

  const cookieStore = await cookies();
  return isValidPreviewToken(cookieStore.get(PREVIEW_COOKIE)?.value);
}
