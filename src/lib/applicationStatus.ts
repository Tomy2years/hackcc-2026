import type { RegistrationState } from "./registrationGate";

/**
 * Everything the site says about applying, derived from one value. The header, hero,
 * FAQ, final invitation and footer all read this, and the /apply route and its server
 * action read the same RegistrationState, so they cannot drift apart.
 *
 * HackCC uses an application (reviewed, decisions emailed), not a first-come
 * registration: the Fall 2025 event was invite-only on Devpost, and the form's
 * confirmation promises a decision.
 */
export type ApplicationStatus = {
  state: RegistrationState;
  canApply: boolean;
  /** Label for the main action or the status in its place. */
  actionLabel: string;
  href: "/apply" | null;
  /** One sentence for the hero and the final invitation. */
  summary: string;
  /** Answer to "When can I apply?" in the FAQ. */
  faqAnswer: string;
};

export function getApplicationStatus(state: RegistrationState): ApplicationStatus {
  switch (state) {
    case "open":
      return {
        state,
        canApply: true,
        actionLabel: "Apply now",
        href: "/apply",
        summary: "Applications are open. It takes about five minutes.",
        faqAnswer:
          "Now. The application is open and takes about five minutes. We review applications and email every applicant a decision.",
      };
    case "closed":
      return {
        state,
        canApply: false,
        actionLabel: "Applications closed",
        href: null,
        summary: "Applications for HackCC 2026 have closed.",
        faqAnswer: "Applications for HackCC 2026 have closed. Follow the Discord for news about the next event.",
      };
    case "hidden":
    default:
      return {
        state: "hidden",
        canApply: false,
        actionLabel: "Applications open soon",
        href: null,
        summary: "Applications aren't open yet. Join the Discord to hear when they open.",
        faqAnswer:
          "Applications aren't open yet and the dates haven't been set. We'll announce them on Discord and Instagram, and an Apply button will appear on this page.",
      };
  }
}
