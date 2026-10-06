import { EVENT } from "./event";

/**
 * Homepage content. Every fact here is sourced; where the team hasn't decided
 * something, the copy says so instead of guessing.
 *
 * Sources
 * - hackcc-2025.devpost.com: date, venue, 103 registered participants, 29 submissions,
 *   "$7,200+ in prizes", sponsors (MiraCosta College, Boot.dev), 14-hour format, rules.
 * - Each project's Devpost page: award name, tagline, team names.
 * - Archived Spring 2026 site (src/archive/2026): "18 community colleges", teams of up
 *   to 4, team formation at the start, Boot.dev pass for every participant,
 *   testimonials (quoted verbatim below), and the archived schedule.
 * - Photos in public/archive/2026/2026-images, captioned by what they show.
 */

export const LAST_EVENT = {
  name: "HackCC Fall 2025",
  date: "November 8, 2025",
  venue: "MiraCosta College, Oceanside",
  devpostUrl: "https://hackcc-2025.devpost.com/project-gallery",
  stats: [
    { value: "103", label: "registered participants" },
    { value: "18", label: "community colleges" },
    { value: "29", label: "projects submitted" },
    { value: "$7,200+", label: "in prizes" },
  ],
} as const;

export type Project = {
  name: string;
  award: string;
  summary: string;
  team?: string;
  url: string;
  photo?: "overall" | "aiml" | "socialGood";
};

export const FEATURED_PROJECT: Project = {
  name: "AssistAI",
  award: "Overall Winner",
  summary:
    "An AI transfer counselor for community college students. It builds a personalized course plan and answers transfer questions for the colleges students apply to most.",
  team: "Evan, Aiden Tabrizi and Ryan Pacheco",
  url: "https://devpost.com/software/assistai-wr5xsn",
  photo: "overall",
};

export const MORE_PROJECTS: Project[] = [
  {
    name: "Realibuddy",
    award: "Best AI/ML",
    summary: "A voice coach that catches negative self-talk as you speak, in real time.",
    team: "Justin Allen, Sean Esla, Jonathan Aung and Peter Guan",
    url: "https://devpost.com/software/pavshock",
    photo: "aiml",
  },
  {
    name: "ClubConnect",
    award: "Best Social Good/Impact",
    summary: "A campus map, event listings and check-in to help students find and join clubs.",
    url: "https://devpost.com/software/clubconnect-mfcj74",
    photo: "socialGood",
  },
  {
    name: "Dungeon Dweller",
    award: "Best Creative/Game",
    summary: "A Zelda-style dungeon crawler built during the event.",
    url: "https://devpost.com/software/dungeon-dweller",
  },
];

export const PAST_SPONSORS = ["MiraCosta College", "Boot.dev"] as const;

/** Verbatim excerpts from the archived site's testimonials ("…" marks a cut). */
export const TESTIMONIALS = [
  {
    name: "Remiel Shirazi",
    context: "First hackathon, first place (StudyCCC)",
    quote:
      "Last year, I grouped up and participated in HackCC as my first hackathon where we won first place building StudyCCC. This led to joining their team and fast forward to HackCC 2025, another success!",
    image: "remiel",
  },
  {
    name: "Yinghao Guan",
    context: "Best AI/ML, Realibuddy",
    quote:
      "This gave us the chance to practice rapid prototyping, AI integration, and time-critical decision making under a 14-hour development window.",
    image: "yinghao",
  },
  {
    name: "Cameron Rafanan",
    context: "Best Creative/Game, Dungeon Dweller",
    quote:
      "I had the most wonderful opportunity to work with amazing people at HackCC, hosted at MiraCosta College. Together, we created Dungeon Dweller, a dungeon crawler game — and our submission was voted Best Creative/Game!",
    image: "cameron",
  },
] as const;

/**
 * Schedule from the archived site. It is not the 2026 schedule, and the archive
 * doesn't say which event it belongs to, so it is only shown as a labelled example.
 */
export const ARCHIVED_SCHEDULE = [
  { time: "8:00 AM", item: "Doors open" },
  { time: "9:00 AM", item: "Opening ceremony" },
  { time: "10:00 AM", item: "Hacking starts and team formation" },
  { time: "11:00 AM", item: "Workshop: Vibecoding/API intro" },
  { time: "12:00 PM", item: "Lunch" },
  { time: "1:00 PM", item: "Workshop: GitHub intro" },
  { time: "2:00 PM", item: "Super Smash Bros tournament" },
  { time: "4:00 PM", item: "Clash Royale tournament" },
  { time: "5:00 PM", item: "Poker tournament" },
  { time: "6:30 PM", item: "Dinner" },
  { time: "7:00 PM", item: "Submissions due (soft deadline)" },
  { time: "8:00 PM", item: "Hacking ends (hard deadline)" },
  { time: "8:15 PM", item: "Project expo" },
  { time: "9:15 PM", item: "Closing ceremony" },
  { time: "10:00 PM", item: "Doors close" },
] as const;

export type FaqItem = { id: string; q: string; a: string };
export type FaqGroup = { title: string; items: FaqItem[] };

/** The FAQ. The "When can I apply?" answer comes from the application status. */
export function buildFaq(applyAnswer: string): FaqGroup[] {
  return [
    {
      title: "The basics",
      items: [
        {
          id: "what-is-a-hackathon",
          q: "What is a hackathon?",
          a: "An event where you team up and build a project in a short time, then show it to judges and other teams. Last year HackCC ran for 14 hours in one day, with workshops and prizes.",
        },
        { id: "who-can-apply", q: "Who can apply?", a: `${EVENT.eligibility}. Any major, any experience level.` },
        {
          id: "need-to-code",
          q: "Do I need to know how to code?",
          a: "No. Past HackCC schedules included beginner workshops such as an intro to GitHub and an intro to APIs, and teams need people who design, write and present as well as program.",
        },
        {
          id: "teams",
          q: "Do I need a team?",
          a: "No. Teams can have up to 4 people, and there is a team formation session at the start. You can also look for teammates on Discord beforehand.",
        },
        {
          id: "cost",
          q: "How much does it cost?",
          a: "Nothing. Applying and attending are free. Last year every participant also received a Boot.dev coding pass.",
        },
      ],
    },
    {
      title: "Applying",
      items: [
        { id: "when-apply", q: "When can I apply?", a: applyAnswer },
        {
          id: "application-questions",
          q: "What does the application ask?",
          a: "Your name, email, phone number, college, interests, T-shirt size and any dietary restrictions. There is no essay.",
        },
        {
          id: "acceptance",
          q: "Does everyone who applies get in?",
          a: "Applications are reviewed and every applicant gets an email with a decision. How many people we can accept depends on the venue.",
        },
      ],
    },
    {
      title: "On the day",
      items: [
        {
          id: "food",
          q: "Is food provided?",
          a: "Yes. Breakfast, lunch, dinner and snacks are provided. Tell us about dietary restrictions in your application.",
        },
        {
          id: "getting-there",
          q: "Where is it, and how do I get there?",
          a: `${EVENT.venue.name}, ${EVENT.venue.address}. Parking, transit and room details will be posted here and on Discord before the event.`,
        },
        {
          id: "overnight",
          q: "Is it overnight?",
          a: "No. HackCC is a one-day event. The 2026 start and end times will be posted with the date.",
        },
        {
          id: "judging",
          q: "How is judging done?",
          a: "Last year teams submitted to Devpost with an image of the project and a GitHub link before the deadline, then demoed at the project expo. Projects had to be started at the event.",
        },
      ],
    },
  ];
}
