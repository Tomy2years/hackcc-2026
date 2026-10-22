"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  Copy,
  Check,
  ChevronDown,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

// Top-level image imports
import hackccIcon from "../../../../public/images/hackcc-icon.png";
import organizersData from "@/data/organizers.json";
import { GENERAL_EMAIL } from "@/data/contact";

const SCENIC_BG = "/assets/roadtrip/organizers/coastal-overlook.jpeg";
const OFFICIAL_EMAIL = GENERAL_EMAIL;

const EMAIL_SUBJECT = "HackCC 2026 Organizer Application";
const EMAIL_BODY = `Hi HackCC Organizing Team,

I'd love to help organize HackCC 2026!

- Full Name: 
- College / Major / Expected Transfer Year: 
- Team(s) of Interest (Website, Engineering / Hardware, Logistics, Sponsorships, Marketing): 
- Why do you want to help build HackCC? 
- LinkedIn / GitHub / Portfolio (optional): 

Looking forward to connecting!`;

const MAILTO_LINK = `mailto:${OFFICIAL_EMAIL}?subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(EMAIL_BODY)}`;
const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(OFFICIAL_EMAIL)}&su=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(EMAIL_BODY)}`;

const TEAMS = [
  {
    num: "01",
    tag: "DIGITAL EXPERIENCE",
    title: "Website Team",
    lead: "Tom Perel (Irvine Valley College)",
    description:
      "Design, build, and maintain the public HackCC website, interactive road-trip maps, animated UI zones, hacker portals, and responsive design systems using Next.js and Tailwind CSS.",
  },
  {
    num: "02",
    tag: "HARDWARE & LAB",
    title: "Engineering Team",
    lead: "Ethan Wu (Diablo Valley College)",
    description:
      "Power HackCC's official Hardware Track. Build and run our dedicated on-site hardware lab, manage components and dev boards (Raspberry Pis, Arduinos, ESP32s, sensors, 3D printers), and mentor hackers bringing physical computing and IoT projects to life.",
  },
  {
    num: "03",
    tag: "OPERATIONS & VENUE",
    title: "Logistics Team",
    lead: "Hillary Nguyen (Orange Coast College)",
    description:
      "Design the physical road trip experience from the ground up. Coordinate venue layouts, hardware labs, catering logistics, Boba runs, and two action-packed days of seamless hacker hospitality.",
  },
  {
    num: "04",
    tag: "INDUSTRY & PARTNERSHIPS",
    title: "Sponsorships Team",
    lead: "Kareem Tadros (Irvine Valley College)",
    description:
      "Pitch Silicon Valley tech companies and industry sponsors. Secure major grant funding, curate custom API bounties, invite engineer mentors to campus, and negotiate tier packages.",
  },
  {
    num: "05",
    tag: "CREATIVE & BRAND",
    title: "Marketing Team",
    lead: "Grace Xu (Foothill College)",
    description:
      "Shape the retro California road trip aesthetic. Craft custom enamel pins, embroidered highway patches, event t-shirts, sticker sheets, motion graphics, and statewide promotional social campaigns.",
  },
];

const WHY_JOIN_PERKS = [
  {
    num: "01",
    tag: "REAL IMPACT",
    title: "Production Scale at 300+ Hackers",
    description:
      "Skip textbook exercises and toy side projects. Manage thousands of dollars in real budgets, deploy code tested by hundreds of users, and steer a major statewide convention.",
  },
  {
    num: "02",
    tag: "TRANSFER & RESUME",
    title: "High-Signal Transfer Leadership",
    description:
      "Hackathon leadership is one of the highest-rated extracurriculars on university transfer applications to UC Berkeley, UCLA, Stanford, and beyond. Showcase genuine organizational grit.",
  },
  {
    num: "03",
    tag: "INDUSTRY ACCESS",
    title: "Direct Access to Tech Mentors & Sponsors",
    description:
      "Work directly with DevRel engineers, recruiters, and engineering leaders from top partners like AWS, Google, and high-growth Silicon Valley startups who support California CC talent.",
  },
  {
    num: "04",
    tag: "STATEWIDE NETWORK",
    title: "Lifelong Community College Network",
    description:
      "Form deep friendships with ambitious, motivated community college developers, designers, and organizers spanning over 8+ campuses across Northern and Southern California.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Drop Us a Note",
    description:
      "Send a quick email letting us know your college, current major/year, and which team(s) you're excited to join. No formal resume needed.",
  },
  {
    step: "02",
    title: "Casual 15-Min Intro Chat",
    description:
      "A low-stress, friendly video chat with current organizing leads to meet each other, discuss your interests, and answer your questions.",
  },
  {
    step: "03",
    title: "Hop in Discord & Hit the Road",
    description:
      "Get onboarded to our team Discord, workspaces, and weekly sprint planning as we gear up for HackCC 2026.",
  },
];

const FAQS = [
  {
    q: "Do I need prior hackathon organizing or coding experience?",
    a: "Not at all! We look for enthusiasm, grit, and reliability above all else. Every new team member is paired with experienced leads who mentor you through your role step-by-step.",
  },
  {
    q: "Can I apply if I attend a community college far away from the venue?",
    a: "Yes, absolutely! Our team is distributed statewide across Northern and Southern California (from De Anza and Foothill in the Bay Area to IVC, OCC, and El Camino in SoCal). Most planning happens virtually over Discord and Google Meet.",
  },
  {
    q: "What is the expected weekly time commitment?",
    a: "During the planning phase, organizers typically contribute 3–5 hours per week on their team's deliverables and attend a 45-minute weekly all-hands sprint. Time commitment scales up slightly during event week.",
  },
  {
    q: "Can organizers also participate as hackers?",
    a: "Core organizers with advance access to judging rubrics, sponsor track details, or event administration cannot compete for monetary prizes. However, you are warmly welcomed to build demo hacks, mentor beginner attendees, and run workshops!",
  },
  {
    q: "How does the selection process work?",
    a: "We review inquiries on a rolling weekly basis. If your interests match what our teams need, we will schedule a friendly 15-minute introductory video chat so we can meet each other and answer any questions you have.",
  },
];

// Featured crew spotlight curated for applicant preview (5 on top, 5 on bottom)
const FEATURED_CREW_IDS = [
  "tom-perel",
  "grace-xu",
  "kareem-tadros",
  "ethan-wu",
  "paul-pham",
  "anjani-shaw",
  "hillary-nguyen",
  "dasha-binskaia",
  "rohan-gopalan",
  "jacob-aquino",
];

const FEATURED_CREW = FEATURED_CREW_IDS.map((id) =>
  (organizersData as Array<{
    id: string;
    name: string;
    role: string;
    college?: string;
    image: string;
    objectPosition?: string;
    imageScale?: string;
  }>).find((m) => m.id === id)
).filter((m): m is NonNullable<typeof m> => Boolean(m));

export default function OrganizerApplyPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(OFFICIAL_EMAIL);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const handleCopyTemplate = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_BODY);
      setCopiedTemplate(true);
      setTimeout(() => setCopiedTemplate(false), 2500);
    } catch {
      setCopiedTemplate(true);
      setTimeout(() => setCopiedTemplate(false), 2500);
    }
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <main className="relative min-h-screen text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950 overflow-x-hidden">
      {/* Scenic Background Layer - natural California coastal photography */}
      <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden">
        <Image
          src={SCENIC_BG}
          alt="California Scenic Coastal Overlook"
          fill
          priority
          className="object-cover object-center scale-105"
        />
        {/* Natural contrast scrim layer: luminous California scenery without heavy murky dimming */}
        <div className="absolute inset-0 bg-slate-950/65 pointer-events-none" />
      </div>

      {/* Top Navigation Bar: Minimalist & Unboxed */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/60 border-b border-white/10 px-4 sm:px-6 lg:px-8 py-3.5 transition-colors">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 relative shrink-0">
                <Image
                  src={hackccIcon}
                  alt="HackCC Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-heading text-lg text-white group-hover:text-amber-300 transition-colors hidden sm:inline">
                HackCC
              </span>
            </Link>

            <Link
              href="/organizers"
              className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs sm:text-sm transition-all hover:scale-105 active:scale-95 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400 transition-transform group-hover:-translate-x-1" />
              <span>Back to Organizers</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#apply"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm px-4 py-2 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-sm"
            >
              <Mail className="w-4 h-4" />
              <span>Apply Now</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section: 100% Unboxed, Monumental Typography Breathing in Scenery */}
      <section className="relative pt-20 sm:pt-28 lg:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl mx-auto text-center">
          {/* Expressive Serif Hook */}
          <p className="font-serif italic text-amber-300 font-semibold text-2xl sm:text-3xl md:text-4xl tracking-wide">
            Steer California&apos;s premier community college road trip
          </p>

          {/* Monumental Headline */}
          <h1 className="mt-3 sm:mt-4 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal uppercase tracking-tight text-white font-heading leading-[1.04]">
            JOIN THE ORGANIZING TEAM
          </h1>

          {/* Event Landmark Coordinates Strip */}
          <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-white/20 text-xs sm:text-sm font-mono text-amber-300 shadow-sm backdrop-blur-sm">
            <span className="font-bold text-white">Orange Coast College · Costa Mesa, CA</span>
            <span className="text-white/40 hidden xs:inline">•</span>
            <span>Nov 14–15, 2026</span>
          </div>

          {/* Unboxed Narrative */}
          <p className="mt-6 text-slate-200 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-sans">
            HackCC is built by students, for students. We are expanding our statewide organizing crew of community college engineers, designers, logisticians, and community builders to craft the biggest hackathon California community colleges have ever seen.
          </p>

          {/* Clean, Unboxed Direct Action Controls */}
          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#apply"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-4.5 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95 group cursor-pointer"
            >
              <span>Apply to Organize</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>

            <Link
              href="/organizers"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900/80 hover:bg-slate-800 border border-white/20 text-white font-bold text-base px-6 py-4 rounded-full transition-all active:scale-95 cursor-pointer"
            >
              <span>Meet the Crew ({organizersData.length} Organizers)</span>
            </Link>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-slate-400 font-mono">
            Rolling weekly review • No prior hackathon organizing experience required • Open to all California CCs
          </p>
        </div>
      </section>

      {/* Monumental Key Stats (Unboxed & Borderless) */}
      <section className="py-12 sm:py-16 border-y border-white/10 bg-slate-950/40">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 text-center">
            <div className="space-y-1">
              <span className="font-heading text-5xl sm:text-6xl md:text-7xl font-normal text-amber-400">
                {organizersData.length}
              </span>
              <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-300 font-bold">
                Organizers &amp; Leads
              </p>
            </div>

            <div className="space-y-1 md:border-l md:border-white/15">
              <span className="font-heading text-5xl sm:text-6xl md:text-7xl font-normal text-white">
                8+
              </span>
              <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-300 font-bold">
                California CC Campuses
              </p>
            </div>

            <div className="space-y-1 md:border-l md:border-white/15">
              <span className="font-heading text-5xl sm:text-6xl md:text-7xl font-normal text-amber-400">
                5
              </span>
              <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-300 font-bold">
                Specialized Teams
              </p>
            </div>

            <div className="space-y-1 md:border-l md:border-white/15">
              <span className="font-heading text-5xl sm:text-6xl md:text-7xl font-normal text-white">
                300+
              </span>
              <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-300 font-bold">
                Participants
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Organizer Roles: Authentic Unboxed Editorial Layout (No generic icon boxes or card pills) */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <p className="font-serif italic text-amber-400 text-xl sm:text-2xl md:text-3xl font-medium tracking-wide">
              Find your lane on the road trip
            </p>
            <h2 className="mt-2 text-3xl sm:text-5xl md:text-6xl font-normal uppercase tracking-tight text-white font-heading leading-tight">
              OPEN ORGANIZER ROLES
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              Pick the area where you want to lead, build, or learn. You will work directly with current team leads and receive hands-on mentorship.
            </p>
          </div>

          {/* Clean, editorial unboxed grid with hairline separators */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
            {TEAMS.map((team) => (
              <div
                key={team.num}
                className="border-t border-white/15 pt-6 space-y-3"
              >
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-mono text-xs font-black tracking-widest text-amber-400">
                    {team.num} • {team.tag}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {team.title}
                </h3>
                <p className="text-xs text-amber-300/80 font-mono mt-0.5 mb-2">
                  Team Lead: {team.lead}
                </p>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {team.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Organize HackCC: High-Impact Perks */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-slate-950/40">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="font-serif italic text-amber-400 text-xl sm:text-2xl font-medium tracking-wide">
              Why join the crew?
            </p>
            <h2 className="mt-2 text-3xl sm:text-5xl font-normal uppercase tracking-tight text-white font-heading">
              BUILT FOR STUDENT LEADERS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            {WHY_JOIN_PERKS.map((p) => (
              <div key={p.num} className="border-t border-white/15 pt-6 space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs font-black tracking-widest text-amber-400">
                    {p.num} • {p.tag}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {p.title}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Current Organizers Spotlight: Authentic Social Proof */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="font-serif italic text-amber-400 text-xl sm:text-2xl font-medium tracking-wide">
              Backed by CC students statewide
            </p>
            <h2 className="mt-2 text-3xl sm:text-5xl font-normal uppercase tracking-tight text-white font-heading">
              MEET YOUR FELLOW ROADTRIPPERS
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base">
              You will be collaborating with students from Irvine Valley, Orange Coast, Diablo Valley, De Anza, Foothill, El Camino, and transfer alumni at UC San Diego.
            </p>
          </div>

          {/* Clean avatars grid (5 on top, 5 on bottom) */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 sm:gap-8 mb-12">
            {FEATURED_CREW.map((member) => (
              <div
                key={member.id}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-amber-400 transition-colors shadow-lg relative mb-3 bg-slate-900">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="112px"
                    className={`object-cover ${member.imageScale || "scale-100"}`}
                    style={{ objectPosition: member.objectPosition || "center 20%" }}
                  />
                </div>
                <h4 className="font-bold text-white text-base sm:text-lg group-hover:text-amber-300 transition-colors">
                  {member.name}
                </h4>
                <p className="text-xs text-amber-400 font-mono mt-0.5">
                  {member.role}
                </p>
                <p className="text-xs text-slate-400 font-sans mt-0.5">
                  {member.college}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/organizers"
              className="inline-flex items-center gap-2 text-white hover:text-amber-300 font-bold underline underline-offset-8 decoration-white/30 hover:decoration-amber-400 transition-colors text-sm sm:text-base"
            >
              <span>Explore all {organizersData.length} team members</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Simple 3-Step Process */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-slate-950/40">
        <div className="w-full max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="font-serif italic text-amber-400 text-xl sm:text-2xl font-medium tracking-wide">
              Fast, friendly, low-stress
            </p>
            <h2 className="mt-2 text-3xl sm:text-5xl font-normal uppercase tracking-tight text-white font-heading">
              HOW TO JOIN THE CREW
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((s) => (
              <div
                key={s.step}
                className="border-t border-white/15 pt-6 space-y-3"
              >
                <span className="font-heading text-4xl text-amber-400 block">
                  {s.step}
                </span>
                <h3 className="text-xl font-bold text-white">
                  {s.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Call to Action Section */}
      <section id="apply" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="w-full max-w-3xl mx-auto text-center">
          <p className="font-serif italic text-amber-300 font-semibold text-2xl sm:text-3xl md:text-4xl tracking-wide">
            Ready to ride shotgun?
          </p>
          <h2 className="mt-3 sm:mt-4 text-4xl sm:text-6xl md:text-7xl font-normal uppercase tracking-tight text-white font-heading leading-tight">
            SUBMIT YOUR APPLICATION
          </h2>
          <p className="mt-6 text-slate-200 text-base sm:text-lg leading-relaxed">
            Send us a message directly at <span className="text-amber-400 font-mono font-bold">{OFFICIAL_EMAIL}</span>. Click the button below to pre-fill our easy organizer application template:
          </p>

          {/* Quick email template preview */}
          <div className="mt-8 text-left rounded-2xl border border-white/15 bg-slate-950/70 p-6 sm:p-8 backdrop-blur-md font-mono text-xs sm:text-sm text-slate-300 space-y-2">
            <div className="text-slate-400 pb-3 border-b border-white/10 flex items-center justify-between">
              <span>To: {OFFICIAL_EMAIL}</span>
              <span className="text-amber-400">Subject: HackCC 2026 Organizer Application</span>
            </div>
            <p className="text-slate-400 pt-2 font-sans italic">What to include in your note:</p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-200 font-sans">
              <li><strong>Full Name</strong> &amp; Preferred Pronouns</li>
              <li><strong>Community College</strong>, Current Major &amp; Expected Transfer Year</li>
              <li><strong>Team(s) of Interest</strong> (Website, Engineering / Hardware, Logistics, Sponsorships, Marketing)</li>
              <li><strong>Why you want to build HackCC</strong> and what you&apos;d love to learn or contribute</li>
              <li><strong>Links</strong> (LinkedIn, GitHub, Portfolio, or Twitter — all completely optional!)</li>
            </ul>
          </div>

          {/* Direct CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href={GMAIL_COMPOSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-base sm:text-lg px-8 py-4 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95 group cursor-pointer"
            >
              <Mail className="w-5 h-5 text-slate-950" />
              <span>Compose in Gmail</span>
              <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
            </a>

            <a
              href={MAILTO_LINK}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900/80 hover:bg-slate-800 border border-white/20 text-white font-bold text-sm sm:text-base px-6 py-4 rounded-full transition-all active:scale-95 cursor-pointer"
            >
              <Mail className="w-4 h-4 text-slate-300" />
              <span>Open in Mail App</span>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900/80 hover:bg-slate-800 border border-white/20 text-white font-bold text-sm sm:text-base px-6 py-4 rounded-full transition-all active:scale-95 cursor-pointer"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 font-semibold">Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-300" />
                  <span>Copy Email</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleCopyTemplate}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900/80 hover:bg-slate-800 border border-white/20 text-white font-bold text-sm sm:text-base px-6 py-4 rounded-full transition-all active:scale-95 cursor-pointer"
            >
              {copiedTemplate ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 font-semibold">Template Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-300" />
                  <span>Copy Template</span>
                </>
              )}
            </button>
          </div>

          <p className="mt-6 text-xs sm:text-sm text-slate-400 font-mono">
            We review rolling inquiries every Sunday. Expect a response from an organizing lead within 3–5 business days.
          </p>
        </div>
      </section>

      {/* Organizer FAQ Section: Clean Editorial Questions */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-slate-950/40">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="font-serif italic text-amber-400 text-xl sm:text-2xl font-medium tracking-wide">
              Frequently Asked Questions
            </p>
            <h2 className="mt-2 text-3xl sm:text-5xl font-normal uppercase tracking-tight text-white font-heading">
              ORGANIZER FAQS
            </h2>
          </div>

          <div className="divide-y divide-white/10">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-6 sm:py-7">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sub-Footer */}
      <footer className="border-t border-white/10 bg-slate-950/80 backdrop-blur-md py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
        <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 relative shrink-0">
              <Image
                src={hackccIcon}
                alt="HackCC Logo"
                width={24}
                height={24}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-heading text-lg text-white">HackCC 2026</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <a
              href="https://discord.gg/X7ktb9224J"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HackCC Discord"
              className="text-slate-400 hover:text-white transition-colors text-base"
            >
              <FontAwesomeIcon icon={faDiscord} className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/realhackcc/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HackCC Instagram"
              className="text-slate-400 hover:text-white transition-colors text-base"
            >
              <FontAwesomeIcon icon={faInstagram} className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${OFFICIAL_EMAIL}`}
              aria-label="Email HackCC"
              className="text-slate-400 hover:text-amber-300 font-mono transition-colors flex items-center gap-1.5"
            >
              <FontAwesomeIcon icon={faEnvelope} className="w-3.5 h-3.5" />
              <span>{OFFICIAL_EMAIL}</span>
            </a>
            <Link href="/" className="hover:text-white transition-colors">
              Main Site
            </Link>
            <Link href="/organizers" className="hover:text-white transition-colors">
              Organizers
            </Link>
            <Link href="/sponsors" className="hover:text-white transition-colors">
              Sponsors
            </Link>
            <Link href="/apply" className="hover:text-amber-300 font-semibold transition-colors">
              Apply
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
