/**
 * Colours for the joins between scenes, sampled from the artwork either side and taken dark.
 * Each fade is opaque only at the exact seam, so two scenes meet on one shared colour
 * instead of a black band. Content areas below a scene use that scene's deep coastal blue.
 *
 * All six plates are blue-hour coast, so the tones lean teal (hue ~200–210°), not violet.
 */
export const SEAM = {
  /** Hollywood's dark golden hills meet Inglewood's blue sky. */
  heroToDetails: "#1A242A",
  /** Inglewood's dark freeway edge (#162533) meets Santa Monica's sky. */
  detailsToAbout: "#132230",
} as const;

export const TONE = {
  /** Santa Monica at blue hour. */
  about: "#10202D",
  /** Orange County at night, a touch deeper. */
  projects: "#0E1C27",
  /** San Onofre's ocean before dawn. */
  faq: "#0F1F2A",
  /** San Diego bay. */
  apply: "#10202A",
} as const;
