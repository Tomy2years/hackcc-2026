import "server-only";
import { getRegistrationAccess } from "@/app/apply/access";
import { getApplicationStatus, type ApplicationStatus } from "./applicationStatus";

/** The application status for the current request. Pages call this once and pass it down. */
export async function getPublicApplicationStatus(): Promise<ApplicationStatus> {
  return getApplicationStatus(await getRegistrationAccess());
}
