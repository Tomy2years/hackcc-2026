/**
 * Single source of truth for event facts. Every page reads from here so a
 * date or venue change is one edit, not a hunt through the codebase.
 */
export const EVENT = {
  name: "HackCC",
  edition: "HackCC 2026",
  year: 2026,
  tagline: "Southern California's community college hackathon",
  audience: "Free for California community college students, 18+",

  // TODO(team): confirm the date. The repo currently shows both "November 14-15"
  // (hero date sign) and "October 24-26, 2026" (old design-system badge).
  dateLabel: "Fall 2026",

  // TODO(team): confirm the venue. Carried over from the registration confirmation card.
  venue: {
    name: "Orange Coast College",
    address: "2701 Fairview Rd, Costa Mesa, CA 92626",
    city: "Costa Mesa, CA",
  },

  contactEmail: "team@hackcc.net",
  siteUrl: "https://hackcc.net",

  social: {
    discord: "https://discord.gg/yRShGV7Py4",
    instagram: "https://www.instagram.com/realhackcc/",
  },
} as const;
