import { EVENT } from "./event";

/**
 * Landing-page content. Facts here are real and sourced; anything not yet
 * decided by the team says so in plain words instead of guessing.
 * Sources: hackcc-2025.devpost.com (Fall 2025 numbers, prizes, winners),
 * the archived Spring 2026 site (testimonials, 2025 schedule).
 */

export const LAST_EVENT = {
  label: "HackCC Fall 2025",
  venue: "MiraCosta College, Oceanside",
  date: "November 8, 2025",
  stats: [
    { value: "103", label: "hackers" },
    { value: "18", label: "community colleges" },
    { value: "29", label: "projects shipped" },
    { value: "$7,200+", label: "in prizes" },
  ],
  devpostUrl: "https://hackcc-2025.devpost.com/project-gallery",
} as const;

export const PAST_WINNERS = [
  {
    name: "AssistAI",
    award: "Overall winner",
    blurb: "An AI transfer counselor for community college students.",
    url: "https://devpost.com/software/assistai-wr5xsn",
  },
  {
    name: "Realibuddy",
    award: "Best AI/ML",
    blurb: "A real-time voice coach that catches negative self-talk as you speak.",
    url: "https://devpost.com/software/pavshock",
  },
  {
    name: "ClubConnect",
    award: "Best Social Good",
    blurb: "Find, join and keep up with clubs on your campus.",
    url: "https://devpost.com/software/clubconnect-mfcj74",
  },
  {
    name: "Dungeon Dweller",
    award: "Best Creative / Game",
    blurb: "A Zelda-style dungeon crawler built in one day.",
    url: "https://devpost.com/software/dungeon-dweller",
  },
] as const;

export const PAST_SPONSORS = ["MiraCosta College", "Boot.dev"] as const;

/** Real quotes from past attendees (archived site). Image keys map to files in public/archive/2026. */
export const TESTIMONIALS = [
  {
    name: "Remiel Shirazi",
    role: "First-place team, StudyCCC",
    quote:
      "I participated in HackCC as my first hackathon, where we won first place building StudyCCC. That led to joining the team, and HackCC 2025 was a full-circle moment.",
    image: "remiel",
  },
  {
    name: "Yinghao Guan",
    role: "Best AI/ML, Realibuddy",
    quote:
      "We practiced rapid prototyping, AI integration and time-critical decision making under a 14-hour development window.",
    image: "yinghao",
  },
  {
    name: "Cameron Rafanan",
    role: "Best Creative/Game, Dungeon Dweller",
    quote:
      "Together we created Dungeon Dweller, a dungeon crawler game, and our submission was voted Best Creative/Game. It was such a blast.",
    image: "cameron",
  },
] as const;

/** The 2025 run of show. Shown as "last year's itinerary" until the 2026 schedule is set. */
export const LAST_SCHEDULE = [
  { time: "8:00 AM", what: "Doors open, check-in, breakfast" },
  { time: "9:00 AM", what: "Opening ceremony" },
  { time: "10:00 AM", what: "Hacking starts, team formation" },
  { time: "11:00 AM", what: "Workshop: APIs and vibe-coding intro" },
  { time: "12:00 PM", what: "Lunch" },
  { time: "1:00 PM", what: "Workshop: GitHub intro" },
  { time: "2:00 PM", what: "Smash Bros, Clash Royale and poker tournaments through the afternoon" },
  { time: "6:30 PM", what: "Dinner" },
  { time: "8:00 PM", what: "Hacking ends (hard deadline)" },
  { time: "8:15 PM", what: "Project expo" },
  { time: "9:15 PM", what: "Closing ceremony and awards" },
  { time: "10:00 PM", what: "Doors close" },
] as const;

/** Application milestones. `date: null` means the team hasn't set it yet. */
export const TIMELINE = [
  { label: "Applications open", date: null },
  { label: "Applications close", date: null },
  { label: "Decisions emailed", date: null },
  { label: "Event day", date: EVENT.dateLabel },
] as const;

export type FaqItem = { q: string; a: string };
export type FaqGroup = { title: string; items: FaqItem[] };

export const FAQ: FaqGroup[] = [
  {
    title: "The basics",
    items: [
      {
        q: "What is a hackathon?",
        a: "A one-day event where you team up, pick a problem, and build something you can demo by evening. HackCC runs about 14 hours. There are workshops, mentors, food and prizes. It's a sprint, not an exam.",
      },
      {
        q: "Who can come?",
        a: `Any California community college student who is 18 or older, from any major. Last time, 103 students from 18 colleges came, and many had never been to a hackathon.`,
      },
      {
        q: "Do I need to know how to code?",
        a: "No. Last year's workshops started from zero (an intro to GitHub, an intro to APIs), mentors walk the room all day, and teams need designers, writers and people who can present just as much as programmers. If you've attended a hackathon before but didn't submit a project, you still count as a first-timer to us.",
      },
      {
        q: "I don't have a team.",
        a: "Most people don't when they arrive. Teams are up to 4 people, and there's a team-formation session right after the opening ceremony. You can also find teammates in our Discord beforehand.",
      },
      {
        q: "How much does it cost?",
        a: "Nothing. Applying is free, attending is free, and meals are on us. Last year every participant also went home with a Boot.dev coding pass.",
      },
    ],
  },
  {
    title: "Getting there",
    items: [
      {
        q: "Where is it?",
        a: `${EVENT.venue.name}, ${EVENT.venue.address}. We'll post the exact building and room, plus a parking map, before the event.`,
      },
      {
        q: "Is there parking? What about the bus?",
        a: "Orange Coast College has student lots and is served by OC Bus. We'll confirm whether weekend parking permits are needed and post the details here and on Discord.",
      },
      {
        q: "Can you help with gas or travel?",
        a: "We don't have a travel budget confirmed yet. If that changes we'll say so here with exact amounts. In the meantime, we'll open a carpool channel on Discord.",
      },
      {
        q: "Is it overnight?",
        a: "No. HackCC is a single day, roughly 8 AM to 10 PM. You sleep in your own bed.",
      },
    ],
  },
  {
    title: "The day",
    items: [
      {
        q: "What should I bring?",
        a: "A laptop and charger, your student ID, headphones, a water bottle and a hoodie. Classrooms get cold by the afternoon.",
      },
      {
        q: "What's the food situation?",
        a: "Breakfast, lunch, dinner and snacks are provided. Tell us about dietary restrictions on your application so we can plan for them.",
      },
      {
        q: "What are the prizes?",
        a: "Last year we awarded $7,200+ in prizes across an overall winner and three categories: Best AI/ML, Best Social Good, and Best Creative/Game. 2026 prizes will be announced with the sponsors.",
      },
      {
        q: "How does judging work?",
        a: "You submit your project to Devpost with a short description, an image and your GitHub repo before the deadline, then demo it at the project expo. Judges score every team. Previous projects aren't allowed; everything is built on the day.",
      },
    ],
  },
  {
    title: "Applying",
    items: [
      {
        q: "When do applications open?",
        a: "Dates aren't set yet. The Apply button will appear at the top of this page the moment they are, and we'll announce it on Discord and Instagram.",
      },
      {
        q: "What does the application ask?",
        a: "Your name, email, phone, college, what you're interested in, a T-shirt size and any dietary needs. It takes about five minutes. There's no essay.",
      },
      {
        q: "Will everyone who applies get in?",
        a: "Space depends on the venue, so we review applications and email every applicant a decision. Applying early helps.",
      },
      {
        q: "Who runs this?",
        a: "Students from community colleges across Southern California, on their own time. You can meet all of us on the organizers page.",
      },
    ],
  },
];
