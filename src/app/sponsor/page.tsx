"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Copy,
  Check,
  ArrowRight,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import { SPONSORSHIP_EMAIL } from "@/data/contact";

// Top-level static references & images
import hackccIcon from "../../../public/images/hackcc-icon.png";

const SCENIC_BG = "/assets/roadtrip/zone3-about/santa-monica-pier-bg-nighttime.jpeg";
const AWS_LOGO = "/aws-white.svg";
const GOOGLE_LOGO = "/google.svg";
const BOOTDEV_LOGO = "/bootdev.png";

const OFFICIAL_EMAIL = SPONSORSHIP_EMAIL;
const MAILTO_LINK = `mailto:${OFFICIAL_EMAIL}?subject=Sponsoring%20HackCC%202026&body=Hi%20HackCC%20Organizing%20Team%2C%0A%0AI'm%20reaching%20out%20from%20%5BYour%20Company%20%2F%20Organization%5D%20regarding%20sponsorship%20opportunities%20for%20HackCC%202026.%0A%0AWe're%20interested%20in%3A%0A-%20Receiving%20the%20full%20Sponsorship%20Prospectus%0A-%20Hosting%20a%20Custom%20Prize%20Track%20%2F%20API%20Bounty%0A-%20Mentorship%20or%20Workshop%20Sessions%0A-%20Custom%20Partnership%20Opportunities%0A%0APlease%20let%20us%20know%20your%20availability%20for%20a%20quick%20introductory%20chat.%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D%0A%5BYour%20Title%2FRole%5D%0A%5BCompany%20Website%20or%20LinkedIn%5D`;

const SPONSOR_BENEFITS = [
  {
    num: "01",
    tag: "TALENT PIPELINE",
    title: "Untapped Community College Pipeline",
    description:
      "Connect with high-achieving, resilient CC developers and transfer-ready engineers from across California before they arrive at traditional university career fairs.",
  },
  {
    num: "02",
    tag: "DEV REL & API ADOPTION",
    title: "Dedicated API & Platform Bounties",
    description:
      "Get 250+ passionate hackers actively building, integrating, and testing your developer tools, APIs, AI models, and cloud infrastructure over 48 intensive hours.",
  },
  {
    num: "03",
    tag: "ENGINEERING ENGAGEMENT",
    title: "Hands-On Mentorship & Workshops",
    description:
      "Send your engineering and product leaders to host technical breakout workshops, judge competitive tracks, and mentor student teams 1-on-1 on the floor.",
  },
  {
    num: "04",
    tag: "STATEWIDE REACH",
    title: "Statewide Brand Visibility",
    description:
      "Prominent placement on event badges, hacker shirts, mainstage opening and closing ceremonies, website showcase, and ongoing community channels reaching 1,000+ students.",
  },
];

const FAQS = [
  {
    q: "Why sponsor HackCC instead of a four-year university hackathon?",
    a: "California community colleges represent 1.8+ million students—the largest and most diverse higher education system in the nation. HackCC is the first and only premier hackathon dedicated exclusively to CC talent. Our attendees are intensely motivated, transfer-bound, and possess gritty real-world problem-solving abilities that tech companies rarely reach through standard university recruiting.",
  },
  {
    q: "How can our team receive the full Sponsorship Prospectus deck?",
    a: `Simply click the email button on this page or write to ${SPONSORSHIP_EMAIL}. We will immediately send over our complete 2026 Sponsorship Prospectus with detailed tier options, demographic breakdowns, and custom add-ons.`,
  },
  {
    q: "Can our engineers mentor hackers or host technical workshops?",
    a: "Yes! Hands-on engagement is at the heart of HackCC. Partners can host dedicated workshop slots to demo developer tools, APIs, and frameworks. Engineers and mentors from all partner companies are warmly welcomed on the floor throughout the entire 48-hour build.",
  },
  {
    q: "Are custom or in-kind sponsorships accepted?",
    a: "Absolutely. We happily collaborate on API credits, hardware bounties, travel scholarships for distant CC students, and meal or caffeine sponsorships. Email us to discuss tailor-made packages.",
  },
];

export default function SponsorPage() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(OFFICIAL_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <main className="relative min-h-screen text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950 overflow-x-hidden">
      {/* Scenic Background Layer - natural California night photography */}
      <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden">
        <Image
          src={SCENIC_BG}
          alt="California Scenic Coastline at Twilight"
          fill
          priority
          className="object-cover object-center scale-105"
        />
        {/* Natural contrast scrim layer: keeps scenery luminous while guaranteeing effortless legibility */}
        <div className="absolute inset-0 bg-slate-950/65 pointer-events-none" />
      </div>

      {/* Top Navigation Bar: Minimalist & Unboxed */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/50 border-b border-white/10 px-4 sm:px-6 lg:px-8 py-3.5 transition-colors">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 group"
            >
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
              href="/"
              className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs sm:text-sm transition-all hover:scale-105 active:scale-95 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400 transition-transform group-hover:-translate-x-1" />
              <span>Back to main site</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={MAILTO_LINK}
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm px-4 py-2 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-sm"
            >
              <Mail className="w-4 h-4" />
              <span>Email Us</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section: 100% Unboxed, Monumental Typography Breathing in Scenery */}
      <section className="relative pt-20 sm:pt-28 lg:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl mx-auto text-center">
          {/* Expressive Serif Hook */}
          <p className="font-serif italic text-amber-300 font-semibold text-2xl sm:text-3xl md:text-4xl tracking-wide">
            Fuel the next generation of California builders
          </p>

          {/* Monumental Headline */}
          <h1 className="mt-3 sm:mt-4 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal uppercase tracking-tight text-white font-heading leading-[1.04]">
            SPONSOR HACKCC 2026
          </h1>

          {/* Unboxed Narrative */}
          <p className="mt-6 text-slate-200 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-sans">
            HackCC is California&apos;s premier hackathon exclusively dedicated to empowering community college students.
            Partner with us to mentor, recruit, and inspire 250+ passionate student developers, designers, and creators from 23 campuses across the state.
          </p>

          {/* Clean, Unboxed Direct Action Controls - No floating glass box */}
          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary Action Button */}
            <a
              href={MAILTO_LINK}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-4.5 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95 group cursor-pointer"
            >
              <Mail className="w-5 h-5 text-slate-950" />
              <span>Email {OFFICIAL_EMAIL}</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>

            {/* Copy Email Button */}
            <button
              type="button"
              onClick={handleCopyEmail}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900/80 hover:bg-slate-800 border border-white/20 text-white font-bold text-base px-6 py-4 rounded-full transition-all active:scale-95 cursor-pointer"
              title="Copy email to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 font-semibold">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-300" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-slate-400 font-mono">
            Organizers reply within 24–48 hours with our complete 2026 sponsorship deck.
          </p>
        </div>
      </section>

      {/* Monumental Key Stats (Unboxed & Borderless) */}
      <section className="py-12 sm:py-16 border-y border-white/10 bg-slate-950/40">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 text-center">
            <div className="space-y-1">
              <span className="font-heading text-5xl sm:text-6xl md:text-7xl font-normal text-amber-400">
                250+
              </span>
              <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-300 font-bold">
                CC Builders &amp; Hackers
              </p>
            </div>

            <div className="space-y-1 md:border-l md:border-white/15">
              <span className="font-heading text-5xl sm:text-6xl md:text-7xl font-normal text-white">
                23
              </span>
              <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-300 font-bold">
                California CC Campuses
              </p>
            </div>

            <div className="space-y-1 md:border-l md:border-white/15">
              <span className="font-heading text-5xl sm:text-6xl md:text-7xl font-normal text-amber-400">
                48 HRS
              </span>
              <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-300 font-bold">
                High-Intensity Sprint
              </p>
            </div>

            <div className="space-y-1 md:border-l md:border-white/15">
              <span className="font-heading text-5xl sm:text-6xl md:text-7xl font-normal text-white">
                $10K+
              </span>
              <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-300 font-bold">
                In Prizes &amp; Tracks
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Sponsor HackCC: Authentic Unboxed Editorial Layout (No generic icon boxes or card pills) */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <p className="font-serif italic text-amber-400 text-xl sm:text-2xl md:text-3xl font-medium tracking-wide">
              Why Partner With HackCC?
            </p>
            <h2 className="mt-2 text-3xl sm:text-5xl md:text-6xl font-normal uppercase tracking-tight text-white font-heading leading-tight">
              DIRECT ACCESS TO CALIFORNIA&apos;S BEST KEPT SECRET
            </h2>
          </div>

          {/* Clean, editorial unboxed grid with hairline separators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            {SPONSOR_BENEFITS.map((b) => (
              <div
                key={b.num}
                className="border-t border-white/15 pt-6 space-y-3"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs font-black tracking-widest text-amber-400">
                    {b.num} • {b.tag}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {b.title}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Current & Past Partners */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-slate-950/40">
        <div className="w-full max-w-5xl mx-auto text-center">
          <p className="font-serif italic text-amber-400 text-lg sm:text-xl font-medium tracking-wide mb-2">
            Trusted by industry leaders
          </p>
          <h2 className="text-2xl sm:text-4xl font-normal uppercase tracking-tight text-white font-heading mb-10">
            OUR ROAD TRIP PARTNERS
          </h2>

          <div className="rounded-3xl border border-white/15 bg-slate-950/60 p-8 sm:p-12 shadow-xl backdrop-blur-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center justify-items-center">
              <div className="flex h-20 sm:h-24 w-full items-center justify-center p-3 select-none">
                <Image
                  src={AWS_LOGO}
                  alt="AWS"
                  width={200}
                  height={100}
                  className="max-h-14 sm:max-h-16 w-auto object-contain transition-transform hover:scale-105"
                />
              </div>
              <div className="flex h-20 sm:h-24 w-full items-center justify-center p-3 select-none">
                <Image
                  src={GOOGLE_LOGO}
                  alt="Google"
                  width={200}
                  height={100}
                  className="max-h-12 sm:max-h-14 w-auto object-contain transition-transform hover:scale-105"
                />
              </div>
              <div className="flex h-20 sm:h-24 w-full items-center justify-center p-3 select-none">
                <Image
                  src={BOOTDEV_LOGO}
                  alt="Boot.dev"
                  width={200}
                  height={100}
                  className="max-h-14 sm:max-h-16 w-auto object-contain transition-transform hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsor FAQ Section: Clean Editorial Questions */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="font-serif italic text-amber-400 text-xl sm:text-2xl font-medium tracking-wide">
              Got Questions?
            </p>
            <h2 className="mt-2 text-3xl sm:text-5xl font-normal uppercase tracking-tight text-white font-heading">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <div className="divide-y divide-white/10">
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                className="py-6 sm:py-8 space-y-2.5"
              >
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {faq.q}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Monumental Bottom CTA: 100% Unboxed */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 text-center border-t border-white/10 bg-slate-950/30">
        <div className="w-full max-w-4xl mx-auto">
          <p className="font-serif italic text-amber-300 font-semibold text-2xl sm:text-3xl md:text-4xl tracking-wide">
            Let&apos;s build something unforgettable together
          </p>
          <h2 className="mt-3 sm:mt-4 text-4xl sm:text-6xl md:text-7xl font-normal uppercase tracking-tight text-white font-heading leading-tight">
            CONNECT WITH OUR PARTNERSHIP TEAM
          </h2>
          <p className="mt-6 text-slate-200 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Reach out directly to request our full sponsorship prospectus deck or schedule a quick introductory meeting with the organizing leads.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={MAILTO_LINK}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-lg px-10 py-4.5 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95 group cursor-pointer"
            >
              <Mail className="w-5 h-5 text-slate-950" />
              <span>Email {OFFICIAL_EMAIL}</span>
              <span className="text-2xl transition-transform group-hover:translate-x-1.5">→</span>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900/80 hover:bg-slate-800 border border-white/20 text-white font-bold text-base px-8 py-4.5 rounded-full transition-all active:scale-95 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-300 font-semibold">Copied {OFFICIAL_EMAIL}!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 text-slate-300" />
                  <span>Copy Email</span>
                </>
              )}
            </button>
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
            <span className="font-heading text-lg text-white">HackCC</span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://discord.gg/yRShGV7Py4"
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
          </div>
        </div>
      </footer>
    </main>
  );
}
