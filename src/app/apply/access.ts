import "server-only";
import { connection } from "next/server";
import { cookies } from "next/headers";
import { getRegistrationState, isValidPreviewToken, PREVIEW_COOKIE, type RegistrationState } from "@/lib/registrationGate";

/**
 * What this visitor may do with the registration form:
 *  - "open":   see and submit it
 *  - "closed": see a "registration has closed" notice
 *  - "hidden": nothing (404)
 * Checked by the page AND by the submit action, so a hidden form can't be posted to.
 * Local `next dev` always has access so the team can work on it.
 */
export async function getRegistrationAccess(): Promise<RegistrationState> {
  // Env vars are read per request, never frozen into a prerendered page,
  // so flipping REGISTRATION_ENABLED off takes effect without a rebuild.
  await connection();

  if (process.env.NODE_ENV === "development") return "open";

  const state = getRegistrationState();
  if (state !== "hidden") return state;

  const cookieStore = await cookies();
  return isValidPreviewToken(cookieStore.get(PREVIEW_COOKIE)?.value) ? "open" : "hidden";
}
