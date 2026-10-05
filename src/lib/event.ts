/**
 * Single source of truth for event facts. Every page reads from here so a
 * date or venue change is one edit, not a hunt through the codebase.
 */
export const EVENT = {
  name: "HackCC",
  edition: "HackCC 2026",
  year: 2026,
  tagline: "Southern California's community college hackathon",

  // TODO(team): confirm the date. Earlier drafts showed both "November 14-15" and
  // "October 24-26, 2026"; until one is confirmed the site says it is pending.
  dateLabel: "Fall 2026",
  dateStatus: "Exact date to be announced",

  // TODO(team): confirm the venue. It comes from the team's original application page
  // ("Plotting route to Orange Coast College") and its confirmation card.
  venue: {
    name: "Orange Coast College",
    address: "2701 Fairview Rd, Costa Mesa, CA 92626",
    city: "Costa Mesa, CA",
  },

  // From the application form's own requirements (schema.ts): a California community
  // college student who will be 18 or older by Fall 2026.
  eligibility: "California community college students, 18 or older",

  contactEmail: "team@hackcc.net",
  siteUrl: "https://hackcc.net",

  social: {
    discord: "https://discord.gg/yRShGV7Py4",
    instagram: "https://www.instagram.com/realhackcc/",
  },
} as const;
