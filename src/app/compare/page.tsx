"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faInstagram } from "@fortawesome/free-brands-svg-icons";

// Real scenic assets across the roadtrip
const SCENES = [
  {
    id: "zone1-day",
    name: "Zone 1: Daytime Hollywood Hills (Pure Visual / Natural Sky)",
    image: "/assets/roadtrip/zone1-hero/hero-background.jpeg",
    signImage: "/assets/roadtrip/zone1-hero/HackCC-sign.png",
    dateSignImage: "/assets/roadtrip/zone1-hero/date-sign.png",
    scrim: "",
    type: "Sign Only",
    isSignOnly: true,
  },
  {
    id: "zone2-about",
    name: "Zone 2: Daytime Inglewood Skyline (About HackCC)",
    image: "/assets/roadtrip/zone2-details/inglewood-daytime.jpg",
    scrim: "",
    type: "Daytime Cityscape",
    isSignOnly: false,
  },
  {
    id: "zone3-sponsors",
    name: "Zone 3: Daytime Santa Monica Pier (Sponsors)",
    image: "/assets/roadtrip/zone3-about/santa-monica-pier-bg-daytime.jpeg",
    scrim: "",
    type: "Daytime Ocean Pier",
    isSignOnly: false,
  },
  {
    id: "zone4-faq",
    name: "Zone 4: PCH Coastal Highway (Double Dome / FAQ)",
    image: "/assets/roadtrip/zone5-faq/Double-Dome.jpg",
    scrim: "",
    type: "Sunny Coastal",
    isSignOnly: false,
  },
  {
    id: "zone5-cta",
    name: "Zone 5: San Diego Beach (Golden Sun / Apply)",
    image: "/assets/roadtrip/zone6-cta-footer/San-Diego-Beach.jpg",
    scrim: "",
    type: "Golden Beach",
    isSignOnly: false,
  },
];


type FontOption = "bagel" | "sans" | "fraunces";
type ComparisonMode = "faq-designs" | "footer-designs" | "layout-artifacts" | "typography";
type FooterOption = "seamless" | "stamp" | "freeway-board";
type FAQOption = "postcard" | "boardwalk" | "highway-sign" | "rockside";
type AirmailBorderOption =
  | "hybrid-red-cream"
  | "hybrid-red-tan"
  | "warm-rose-tan"
  | "sun-faded"
  | "clean-tan"
  | "solid-light-red";
type ScreenSimulation = "full" | "tablet" | "mobile";

const AIRMAIL_GRADIENTS: Record<AirmailBorderOption, string> = {
  "hybrid-red-cream":
    "repeating-linear-gradient(135deg, #DE6C5D 0px, #DE6C5D 12px, #FAF7EE 12px, #FAF7EE 22px)",
  "hybrid-red-tan":
    "repeating-linear-gradient(135deg, #DE6C5D 0px, #DE6C5D 10px, #FAF7EE 10px, #FAF7EE 18px, #D4C7B0 18px, #D4C7B0 28px, #FAF7EE 28px, #FAF7EE 36px)",
  "warm-rose-tan": "linear-gradient(135deg, #E8D3C4 0%, #DDBFB0 100%)",
  "sun-faded":
    "repeating-linear-gradient(135deg, #D96B5B 0px, #D96B5B 14px, #FAF7EE 14px, #FAF7EE 20px, #5EA4B8 20px, #5EA4B8 34px, #FAF7EE 34px, #FAF7EE 40px)",
  "clean-tan": "#E2D8C6",
  "solid-light-red": "linear-gradient(135deg, #E67A6E 0%, #D96657 100%)",
};

const COMPARE_FAQS = [
  {
    id: "apply",
    question: "When can I apply?",
    badge: "Applications",
    spokenAnswer:
      "Applications open soon! Keep your eyes on our Discord and Instagram for the official drop date. We review applications on a rolling basis, so jumping in early gives you the best shot at securing your seat on the route.",
  },
  {
    id: "what-is-hackathon",
    question: "What is a hackathon anyway?",
    badge: "The Basics",
    spokenAnswer:
      "Think of it as a 14-hour creative sprint! You team up with friends, brainstorm an idea, build a working tech project from scratch, and demo it at the finish line. No pressure—just great food, supportive mentors, and tons of building.",
  },
  {
    id: "teams",
    question: "Can I compete in a team?",
    badge: "Teams & Crews",
    spokenAnswer:
      "You bet! You can ride solo or roll with a crew of up to 4 hackers. Don't have a team yet? Don't stress—we host team-matching mixers right before hacking kicks off so nobody has to road trip alone.",
  },
  {
    id: "cost",
    question: "How much does it cost to attend?",
    badge: "Free Event",
    spokenAnswer:
      "Zero dollars, zero cents! HackCC is 100% free for all admitted community college students. That covers all your meals, snacks, caffeine, exclusive swag bags, workshops, and eligibility for all prize tracks.",
  },
  {
    id: "experience",
    question: "Do I need prior coding experience?",
    badge: "All Levels Welcome",
    spokenAnswer:
      "Not at all! HackCC is crafted specifically for community college students of all experience levels. We host beginner-friendly starter workshops in Git and web building, with hands-on mentors walking the floor the entire time.",
  },
  {
    id: "eligibility",
    question: "Who is eligible to participate?",
    badge: "Eligibility",
    spokenAnswer:
      "Any student currently enrolled in a California community college! High school seniors planning to attend CC and recent CC transfer students are also warmly welcomed to apply and join the route.",
  },
];

export default function CompareDesignPage() {
  const [selectedSceneIndex, setSelectedSceneIndex] = useState(3); // Default to Zone 4 (Double Dome FAQ)
  const [activeTab, setActiveTab] = useState<ComparisonMode>("faq-designs");
  const [faqOption, setFaqOption] = useState<FAQOption>("postcard");
  const [airmailBorder, setAirmailBorder] = useState<AirmailBorderOption>("warm-rose-tan");
  const [openFAQId, setOpenFAQId] = useState<string | null>("apply");
  const [activeFont, setActiveFont] = useState<FontOption>("bagel");
  const [footerStyle, setFooterStyle] = useState<FooterOption>("seamless");
  const [viewMode, setViewMode] = useState<"side-by-side" | "single">("side-by-side");
  const [screenSimulation, setScreenSimulation] = useState<ScreenSimulation>("full");

  const toggleFAQ = (id: string) => {
    setOpenFAQId((prev) => (prev === id ? null : id));
  };

  const currentScene = SCENES[selectedSceneIndex];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Controls Toolbar */}
      <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/design-system"
              className="text-xs uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
            >
              ← Design System
            </Link>
            <span className="text-white/20">|</span>
            {/* Primary Mode Tabs */}
            <div className="flex bg-slate-900 p-1 rounded-lg border border-white/10 text-xs font-semibold">
              <button
                onClick={() => {
                  setActiveTab("faq-designs");
                  setSelectedSceneIndex(3);
                }}
                className={`px-3 py-1.5 rounded transition-all cursor-pointer ${activeTab === "faq-designs"
                    ? "bg-amber-400 text-slate-950 shadow font-bold"
                    : "text-slate-300 hover:text-white"
                  }`}
              >
                🧭 FAQ Redesigns (4 Directions)
              </button>
              <button
                onClick={() => setActiveTab("footer-designs")}
                className={`px-3 py-1.5 rounded transition-all cursor-pointer ${activeTab === "footer-designs"
                    ? "bg-amber-400 text-slate-950 shadow font-bold"
                    : "text-slate-300 hover:text-white"
                  }`}
              >
                🏁 Footer Redesigns (3 Directions)
              </button>
              <button
                onClick={() => setActiveTab("layout-artifacts")}
                className={`px-3 py-1.5 rounded transition-all cursor-pointer ${activeTab === "layout-artifacts"
                    ? "bg-amber-400 text-slate-950 shadow font-bold"
                    : "text-slate-300 hover:text-white"
                  }`}
              >
                🛣️ Layout &amp; Artifacts
              </button>
              <button
                onClick={() => setActiveTab("typography")}
                className={`px-3 py-1.5 rounded transition-all cursor-pointer ${activeTab === "typography"
                    ? "bg-amber-400 text-slate-950 shadow font-bold"
                    : "text-slate-300 hover:text-white"
                  }`}
              >
                🔤 Typography Personality
              </button>
            </div>
          </div>

          {/* Scene Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 hidden sm:inline">Scene:</span>
            <select
              value={selectedSceneIndex}
              onChange={(e) => setSelectedSceneIndex(Number(e.target.value))}
              className="bg-slate-900 border border-white/15 rounded-lg px-3 py-1.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              {SCENES.map((scene, idx) => (
                <option key={scene.id} value={idx}>
                  {scene.name} ({scene.type})
                </option>
              ))}
            </select>
          </div>

          {/* Secondary Controls (Dependent on Active Tab) */}
          {activeTab === "faq-designs" ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 hidden md:inline">Creative Direction:</span>
              <div className="flex bg-slate-900 p-1 rounded-lg border border-white/10 text-xs font-semibold">
                <button
                  onClick={() => setFaqOption("postcard")}
                  className={`px-3 py-1.5 rounded transition-all cursor-pointer ${faqOption === "postcard"
                      ? "bg-amber-400 text-slate-950 font-bold shadow"
                      : "text-slate-300 hover:text-white"
                    }`}
                >
                  Direction A: Scrapbook &amp; Red Stamp
                </button>
                <button
                  onClick={() => setFaqOption("boardwalk")}
                  className={`px-3 py-1.5 rounded transition-all cursor-pointer ${faqOption === "boardwalk"
                      ? "bg-amber-400 text-slate-950 font-bold shadow"
                      : "text-slate-300 hover:text-white"
                    }`}
                >
                  Direction B: Boardwalk Kiosk
                </button>
                <button
                  onClick={() => setFaqOption("highway-sign")}
                  className={`px-3 py-1.5 rounded transition-all cursor-pointer ${faqOption === "highway-sign"
                      ? "bg-amber-400 text-slate-950 font-bold shadow"
                      : "text-slate-300 hover:text-white"
                    }`}
                >
                  Direction C: Caltrans Sign
                </button>
                <button
                  onClick={() => setFaqOption("rockside")}
                  className={`px-3 py-1.5 rounded transition-all cursor-pointer ${faqOption === "rockside"
                      ? "bg-amber-400 text-slate-950 font-bold shadow"
                      : "text-slate-300 hover:text-white"
                    }`}
                >
                  Direction D: Rockside Perch
                </button>
              </div>

              {faqOption === "postcard" && (
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-white/10 text-xs">
                  <span className="text-slate-400 text-[11px] px-1 font-medium">Border:</span>
                  <button
                    onClick={() => setAirmailBorder("hybrid-red-cream")}
                    className={`px-2 py-1 rounded transition-all cursor-pointer text-[11px] ${
                      airmailBorder === "hybrid-red-cream"
                        ? "bg-amber-400 text-slate-950 font-bold"
                        : "text-slate-300 hover:text-white"
                    }`}
                    title="Light red & warm cream diagonal stripes (monochrome airmail)"
                  >
                    Red &amp; Cream (Airmail)
                  </button>
                  <button
                    onClick={() => setAirmailBorder("hybrid-red-tan")}
                    className={`px-2 py-1 rounded transition-all cursor-pointer text-[11px] ${
                      airmailBorder === "hybrid-red-tan"
                        ? "bg-amber-400 text-slate-950 font-bold"
                        : "text-slate-300 hover:text-white"
                    }`}
                    title="Mix: Light red alternating with warm cardstock tan and cream"
                  >
                    Red &amp; Tan (Hybrid)
                  </button>
                  <button
                    onClick={() => setAirmailBorder("warm-rose-tan")}
                    className={`px-2 py-1 rounded transition-all cursor-pointer text-[11px] ${
                      airmailBorder === "warm-rose-tan"
                        ? "bg-amber-400 text-slate-950 font-bold"
                        : "text-slate-300 hover:text-white"
                    }`}
                    title="Warm sandy rose cardstock (subtle blend between tan and light red)"
                  >
                    Warm Rose-Tan
                  </button>
                  <button
                    onClick={() => setAirmailBorder("clean-tan")}
                    className={`px-2 py-1 rounded transition-all cursor-pointer text-[11px] ${
                      airmailBorder === "clean-tan"
                        ? "bg-amber-400 text-slate-950 font-bold"
                        : "text-slate-300 hover:text-white"
                    }`}
                    title="Previous clean tan/gray cardstock border"
                  >
                    Tan/Gray (Before)
                  </button>
                  <button
                    onClick={() => setAirmailBorder("solid-light-red")}
                    className={`px-2 py-1 rounded transition-all cursor-pointer text-[11px] ${
                      airmailBorder === "solid-light-red"
                        ? "bg-amber-400 text-slate-950 font-bold"
                        : "text-slate-300 hover:text-white"
                    }`}
                    title="Solid light red border"
                  >
                    Solid Red
                  </button>
                  <button
                    onClick={() => setAirmailBorder("sun-faded")}
                    className={`px-2 py-1 rounded transition-all cursor-pointer text-[11px] ${
                      airmailBorder === "sun-faded"
                        ? "bg-amber-400 text-slate-950 font-bold"
                        : "text-slate-300 hover:text-white"
                    }`}
                    title="Original red & cyan airmail stripes"
                  >
                    Red &amp; Cyan
                  </button>
                </div>
              )}
            </div>
          ) : activeTab === "footer-designs" ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 hidden md:inline">Footer Direction:</span>
              <div className="flex bg-slate-900 p-1 rounded-lg border border-white/10 text-xs font-semibold">
                <button
                  onClick={() => setFooterStyle("seamless")}
                  className={`px-3 py-1.5 rounded transition-all cursor-pointer ${footerStyle === "seamless"
                      ? "bg-amber-400 text-slate-950 font-bold shadow"
                      : "text-slate-300 hover:text-white"
                    }`}
                >
                  Direction A: Seamless Twilight
                </button>
                <button
                  onClick={() => setFooterStyle("stamp")}
                  className={`px-3 py-1.5 rounded transition-all cursor-pointer ${footerStyle === "stamp"
                      ? "bg-amber-400 text-slate-950 font-bold shadow"
                      : "text-slate-300 hover:text-white"
                    }`}
                >
                  Direction B: Editorial CA Stamp
                </button>
                <button
                  onClick={() => setFooterStyle("freeway-board")}
                  className={`px-3 py-1.5 rounded transition-all cursor-pointer ${footerStyle === "freeway-board"
                      ? "bg-amber-400 text-slate-950 font-bold shadow"
                      : "text-slate-300 hover:text-white"
                    }`}
                >
                  Direction C: Freeway Sign Board
                </button>
              </div>
            </div>
          ) : activeTab === "layout-artifacts" ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 hidden md:inline">Test Screen Width:</span>
              <div className="flex bg-slate-900 p-1 rounded-lg border border-white/10 text-xs font-semibold">
                <button
                  onClick={() => setScreenSimulation("full")}
                  className={`px-2.5 py-1.5 rounded transition-colors cursor-pointer ${screenSimulation === "full"
                      ? "bg-amber-400 text-slate-950 font-bold"
                      : "text-slate-300 hover:text-white"
                    }`}
                  title="Full desktop viewport"
                >
                  Desktop
                </button>
                <button
                  onClick={() => setScreenSimulation("tablet")}
                  className={`px-2.5 py-1.5 rounded transition-colors cursor-pointer ${screenSimulation === "tablet"
                      ? "bg-amber-400 text-slate-950 font-bold"
                      : "text-slate-300 hover:text-white"
                    }`}
                  title="Tablet portrait (768px)"
                >
                  Tablet (768px)
                </button>
                <button
                  onClick={() => setScreenSimulation("mobile")}
                  className={`px-2.5 py-1.5 rounded transition-colors cursor-pointer ${screenSimulation === "mobile"
                      ? "bg-amber-400 text-slate-950 font-bold"
                      : "text-slate-300 hover:text-white"
                    }`}
                  title="Mobile phone (390px)"
                >
                  Mobile (390px)
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex bg-slate-900 p-1 rounded-lg border border-white/10 text-xs font-semibold">
                <button
                  onClick={() => setViewMode("side-by-side")}
                  className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${viewMode === "side-by-side"
                      ? "bg-amber-400 text-slate-950 shadow font-bold"
                      : "text-slate-300 hover:text-white"
                    }`}
                >
                  Side-by-Side
                </button>
                <button
                  onClick={() => setViewMode("single")}
                  className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${viewMode === "single"
                      ? "bg-amber-400 text-slate-950 shadow font-bold"
                      : "text-slate-300 hover:text-white"
                    }`}
                >
                  Full View
                </button>
              </div>

              {viewMode === "single" && (
                <div className="flex bg-slate-900 p-1 rounded-lg border border-white/10 text-xs font-semibold">
                  <button
                    onClick={() => setActiveFont("bagel")}
                    className={`px-2.5 py-1.5 rounded transition-colors ${activeFont === "bagel"
                        ? "bg-amber-400 text-slate-950 font-bold"
                        : "text-slate-300 hover:text-white"
                      }`}
                  >
                    Bagel Fat One
                  </button>
                  <button
                    onClick={() => setActiveFont("sans")}
                    className={`px-2.5 py-1.5 rounded transition-colors ${activeFont === "sans"
                        ? "bg-amber-400 text-slate-950 font-bold"
                        : "text-slate-300 hover:text-white"
                      }`}
                  >
                    Modern Sans
                  </button>
                  <button
                    onClick={() => setActiveFont("fraunces")}
                    className={`px-2.5 py-1.5 rounded transition-colors ${activeFont === "fraunces"
                        ? "bg-amber-400 text-slate-950 font-bold"
                        : "text-slate-300 hover:text-white"
                      }`}
                  >
                    Fraunces Serif
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main Simulation Wrapper */}
      <div className="flex-1 flex flex-col justify-center items-center p-2 sm:p-6 bg-slate-950">
        <div
          className={`w-full transition-all duration-300 relative overflow-hidden rounded-2xl border border-white/15 shadow-2xl flex flex-col justify-center ${screenSimulation === "mobile"
              ? "max-w-[400px] min-h-[750px]"
              : screenSimulation === "tablet"
                ? "max-w-[768px] min-h-[700px]"
                : "max-w-7xl min-h-[calc(100vh-140px)]"
            }`}
        >
          {/* Simulation Header Badge */}
          {screenSimulation !== "full" && (
            <div className="z-30 bg-slate-900/90 text-amber-300 text-[11px] font-mono py-1 px-3 text-center border-b border-white/10 flex items-center justify-between">
              <span>Simulation: {screenSimulation.toUpperCase()} VIEWPORT</span>
              <span>Notice how fluid Grid &amp; Flexbox wrap naturally</span>
            </div>
          )}

          {/* Full-Screen Scenic Background Layer */}
          <div className="absolute inset-0 z-0">
            <Image
              src={currentScene.image}
              alt={currentScene.name}
              fill
              className="object-cover object-center"
              priority
            />
            {/* Natural background without artificial dark scrim */}
            {currentScene.scrim ? <div className={`absolute inset-0 ${currentScene.scrim}`} /> : null}
          </div>

          {/* Zone 1 Sign Only Scene */}
          {currentScene.isSignOnly ? (
            <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center space-y-6">
              <div className="w-full max-w-2xl sm:max-w-4xl md:max-w-4xl [transform:rotate(-1.4deg)_skewY(-0.8deg)] drop-shadow-[0_16px_32px_rgba(0,0,0,0.7)] flex flex-col items-center">
                {currentScene.signImage && (
                  <div className="w-full">
                    <Image
                      src={currentScene.signImage}
                      alt="HackCC Hollywood Sign"
                      width={2560}
                      height={1440}
                      className="w-full h-auto object-contain mx-auto"
                      priority
                    />
                  </div>
                )}
                {currentScene.dateSignImage && (
                  <div className="w-3/4 sm:w-[70%] -mt-[31%]">
                    <Image
                      src={currentScene.dateSignImage}
                      alt="HackCC Date Sign - November 14-15"
                      width={2560}
                      height={1440}
                      className="w-full h-auto object-contain mx-auto"
                      priority
                    />
                  </div>
                )}
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs text-white">
                <span>☀️ Zone 1: Pure natural sky &amp; Hollywood Sign (no text, no artificial dimming)</span>
              </div>
            </div>
          ) : activeTab === "faq-designs" ? (
            /* ========================================================================= */
            /* TAB 0: FAQ REDESIGNS (4 CANDIDATE CREATIVE DIRECTIONS)                    */
            /* ========================================================================= */
            <div className="relative z-10 w-full py-6 px-3 sm:px-6 flex flex-col items-center">
              {/* Context info banner */}
              <div className="w-full max-w-5xl bg-slate-900/90 border border-white/10 rounded-xl px-5 py-3 mb-6 flex flex-wrap items-center justify-between gap-3 text-xs backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold uppercase tracking-wider bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded text-[11px]">
                    {faqOption === "postcard" && "Direction A: Scrapbook Notecard & Red Stamp (Current)"}
                    {faqOption === "boardwalk" && "Direction B: Coastal Boardwalk Wayside Kiosk"}
                    {faqOption === "highway-sign" && "Direction C: Caltrans Highway Vista Point Sign"}
                    {faqOption === "rockside" && "Direction D: Coastal Rockside Perch (Unboxed Vignette)"}
                  </span>
                  <span className="text-slate-300 hidden sm:inline">
                    {faqOption === "postcard" && "Warm cream notecard, taped Polaroid seal, authentic red postal cancellation ink stamp."}
                    {faqOption === "boardwalk" && "Rustic weathered timber frame, brass carriage bolts, dark slate trailhead placard, Ranger Sammy."}
                    {faqOption === "highway-sign" && "Caltrans Interstate Green banner, CA-1 highway shield, reflective border, steel sign hardware."}
                    {faqOption === "rockside" && "100% scenic ocean opening with left-side mascot perch on coastal rocks & crisp translucent cards."}
                  </span>
                </div>
                <span className="text-amber-300 font-mono text-[11px]">
                  Zone 4 PCH Double Dome Ocean Scene
                </span>
              </div>

              {/* Monumental Road Trip Header */}
              <div className="mb-10 sm:mb-14 lg:mb-16 text-center max-w-4xl">
                <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal uppercase tracking-tight text-white font-heading leading-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
                  ROAD TRIP FAQ
                </h2>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* DIRECTION A: ROAD TRIP SCRAPBOOK / NOTECARD & RED STAMP       */}
              {/* ------------------------------------------------------------- */}
              {faqOption === "postcard" && (
                <div className="relative w-full max-w-5xl -rotate-[0.6deg] hover:rotate-0 transition-transform duration-300">
                  {/* Realistic Amber Cellophane / Scotch Tape Strip */}
                  <div className="absolute -top-4 sm:-top-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none select-none">
                    <div className="relative w-40 sm:w-56 h-8 sm:h-11 bg-amber-200/70 backdrop-blur-[2px] border-t-2 border-white/95 border-b border-amber-900/35 shadow-[0_6px_16px_rgba(0,0,0,0.28),_0_2px_4px_rgba(0,0,0,0.18)] rotate-[1.2deg] flex items-center justify-center [clip-path:polygon(0%_0%,_98.5%_0%,_100%_12.5%,_98.5%_25%,_100%_37.5%,_98.5%_50%,_100%_62.5%,_98.5%_75%,_100%_87.5%,_98.5%_100%,_0%_100%,_1.5%_87.5%,_0%_75%,_1.5%_62.5%,_0%_50%,_1.5%_37.5%,_0%_25%,_1.5%_12.5%)]">
                      {/* Tape specular reflection line down the center */}
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-white/80 shadow-[0_0_2px_rgba(255,255,255,0.8)]" />
                      {/* Warm golden-hour cellophane gradient sheen */}
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-300/40 via-white/50 to-amber-300/40" />
                      {/* Subtle adhesive texture line */}
                      <div className="absolute inset-x-3 inset-y-1 border-t border-dashed border-amber-900/15 pointer-events-none" />
                    </div>
                  </div>

                  {/* Postcard Shell with Vintage Sun-Faded Airmail Par Avion Border */}
                  <div
                    className="relative w-full rounded-2xl p-2 sm:p-2.5 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.4),_0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden"
                    style={{
                      background: AIRMAIL_GRADIENTS[airmailBorder],
                    }}
                  >
                    {/* Inner Postcard Paper Body */}
                    <div className="relative w-full rounded-xl bg-[#FAF7EE] border border-[#DE6C5D]/25 p-5 sm:p-9 lg:p-10 text-slate-800">
                      {/* Delicate Inset Postal Hairline Frame Rule (as on authentic travel postcards) */}
                      <div className="absolute inset-2 sm:inset-3 rounded-lg border border-red-900/15 pointer-events-none" />

                      {/* Top Bar: Polaroid Sammy + Perforated Stamp */}
                      <div className="flex flex-row items-start sm:items-center justify-between gap-3 pb-5 sm:pb-6 mb-5 sm:mb-6 border-b border-amber-900/15">
                        <div className="relative flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                          <div className="relative shrink-0 bg-white p-1.5 sm:p-2 pb-2 sm:pb-2.5 rounded-md shadow-md border border-slate-200/90 -rotate-2 select-none">
                            <div className="absolute -top-2 sm:-top-2.5 left-1/2 -translate-x-1/2 w-9 sm:w-11 h-2.5 sm:h-3.5 bg-amber-300/85 border-t border-b border-amber-400/70 rotate-1 shadow-xs pointer-events-none" />
                            <div className="relative w-11 h-11 sm:w-14 sm:h-14 bg-gradient-to-b from-sky-100 to-amber-50 rounded overflow-hidden flex items-center justify-center">
                              <Image
                                src="/assets/mascots/lollipop-mascot.png"
                                alt="HackCC Mascot"
                                fill
                                className="object-contain p-0.5 sm:p-1"
                              />
                            </div>
                            <div className="mt-0.5 sm:mt-1 text-center font-serif italic text-[9px] sm:text-[11px] font-semibold text-slate-700 leading-tight">
                              Route Guide
                            </div>
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
                              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-amber-900/90 font-bold truncate block">
                                POST CARD · ROUTE 1
                              </span>
                            </div>
                            <h3 className="text-sm sm:text-lg font-bold font-sans text-slate-900 leading-tight sm:leading-snug truncate">
                              Coastal Cove Stop
                            </h3>
                            <p className="text-[11px] sm:text-xs text-slate-600 font-sans mt-0.5 hidden xs:block">
                              Field notes for your 14-hour sprint
                            </p>
                          </div>
                        </div>

                        {/* Authentic Perforated California Postage Stamp & Postmark Cancellation */}
                        <div className="relative shrink-0 inline-flex items-center select-none">
                          {/* Wavy Ink Postmark Cancellation Lines & Stamped Circular Postmark */}
                          <div className="hidden sm:flex items-center absolute -left-20 sm:-left-24 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                            {/* Wavy Postal Cancellation "Killer Bars" */}
                            <svg className="w-16 sm:w-20 h-10 text-red-700/80 -rotate-3" viewBox="0 0 80 40" fill="none">
                              <path d="M 0 8 Q 15 2 30 8 T 60 8 T 80 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                              <path d="M 5 16 Q 20 10 35 16 T 65 16 T 80 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                              <path d="M 0 24 Q 15 18 30 24 T 60 24 T 80 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                              <path d="M 8 32 Q 23 26 38 32 T 68 32 T 80 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>

                            {/* Circular Rubber Ink Cancellation Stamp */}
                            <div className="relative -ml-3 w-16 h-16 sm:w-[68px] sm:h-[68px] rounded-full border-2 border-dashed border-red-700/80 flex flex-col items-center justify-center text-red-800 -rotate-12 bg-red-600/[0.04] shadow-xs">
                              <span className="font-mono font-black text-[8px] sm:text-[9px] tracking-widest uppercase text-center leading-none text-red-800">
                                PCH · CA
                              </span>
                              <span className="font-mono font-bold text-[7px] sm:text-[8px] uppercase tracking-wider text-red-700 my-0.5">
                                NOV 14 2026
                              </span>
                              <span className="font-mono text-[7px] tracking-tight uppercase text-red-600/80">
                                COASTAL COVE
                              </span>
                            </div>
                          </div>

                          {/* Authentic Perforated Postage Stamp Card */}
                          <div className="relative z-10 w-[64px] sm:w-[86px] h-[80px] sm:h-[108px] drop-shadow-[0_4px_10px_rgba(0,0,0,0.2)] rotate-2 hover:rotate-0 transition-transform">
                            <svg width="100%" height="100%" viewBox="0 0 88 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <defs>
                                <mask id="compare-stamp-perfs">
                                  <rect width="88" height="110" fill="white" />
                                  {/* Top Edge Perforations */}
                                  <circle cx="11" cy="0" r="3.2" fill="black" />
                                  <circle cx="22" cy="0" r="3.2" fill="black" />
                                  <circle cx="33" cy="0" r="3.2" fill="black" />
                                  <circle cx="44" cy="0" r="3.2" fill="black" />
                                  <circle cx="55" cy="0" r="3.2" fill="black" />
                                  <circle cx="66" cy="0" r="3.2" fill="black" />
                                  <circle cx="77" cy="0" r="3.2" fill="black" />
                                  {/* Bottom Edge Perforations */}
                                  <circle cx="11" cy="110" r="3.2" fill="black" />
                                  <circle cx="22" cy="110" r="3.2" fill="black" />
                                  <circle cx="33" cy="110" r="3.2" fill="black" />
                                  <circle cx="44" cy="110" r="3.2" fill="black" />
                                  <circle cx="55" cy="110" r="3.2" fill="black" />
                                  <circle cx="66" cy="110" r="3.2" fill="black" />
                                  <circle cx="77" cy="110" r="3.2" fill="black" />
                                  {/* Left Edge Perforations */}
                                  <circle cx="0" cy="11" r="3.2" fill="black" />
                                  <circle cx="0" cy="22" r="3.2" fill="black" />
                                  <circle cx="0" cy="33" r="3.2" fill="black" />
                                  <circle cx="0" cy="44" r="3.2" fill="black" />
                                  <circle cx="0" cy="55" r="3.2" fill="black" />
                                  <circle cx="0" cy="66" r="3.2" fill="black" />
                                  <circle cx="0" cy="77" r="3.2" fill="black" />
                                  <circle cx="0" cy="88" r="3.2" fill="black" />
                                  <circle cx="0" cy="99" r="3.2" fill="black" />
                                  {/* Right Edge Perforations */}
                                  <circle cx="88" cy="11" r="3.2" fill="black" />
                                  <circle cx="88" cy="22" r="3.2" fill="black" />
                                  <circle cx="88" cy="33" r="3.2" fill="black" />
                                  <circle cx="88" cy="44" r="3.2" fill="black" />
                                  <circle cx="88" cy="55" r="3.2" fill="black" />
                                  <circle cx="88" cy="66" r="3.2" fill="black" />
                                  <circle cx="88" cy="77" r="3.2" fill="black" />
                                  <circle cx="88" cy="88" r="3.2" fill="black" />
                                  <circle cx="88" cy="99" r="3.2" fill="black" />
                                </mask>
                              </defs>

                              {/* Stamp Body Masked by Perforations */}
                              <g mask="url(#compare-stamp-perfs)">
                                <rect width="88" height="110" fill="#FFFDF8" />
                                <rect x="5.5" y="5.5" width="77" height="99" fill="#F0F9FF" stroke="#0284C7" strokeWidth="1.5" />
                                <rect x="8" y="8" width="72" height="94" fill="none" stroke="#0284C7" strokeWidth="0.75" strokeDasharray="2 1.5" />

                                <text x="44" y="17" fontFamily="monospace" fontSize="6.5" fontWeight="900" fill="#0369A1" textAnchor="middle" letterSpacing="1.2">
                                  USA · 2026
                                </text>

                                <g transform="translate(19, 23)">
                                  <rect width="50" height="54" rx="3" fill="#E0F2FE" />
                                  <circle cx="25" cy="22" r="13" fill="#FBBF24" />
                                  <circle cx="25" cy="22" r="8" fill="#FDE68A" />
                                  <path d="M 0 34 Q 12 30 25 34 T 50 34 L 50 54 L 0 54 Z" fill="#0284C7" />
                                  <path d="M 0 40 Q 12 37 25 40 T 50 40 L 50 54 L 0 54 Z" fill="#0369A1" />
                                  <path d="M 0 46 Q 12 43 25 46 T 50 46 L 50 54 L 0 54 Z" fill="#075985" />
                                  <g transform="translate(14, 8)">
                                    <path d="M 11 0 L 22 4 L 20 18 Q 11 26 11 26 Q 11 26 2 18 L 0 4 Z" fill="#15803D" stroke="#FFFFFF" strokeWidth="1.2" />
                                    <text x="11" y="8" fontFamily="sans-serif" fontSize="3.8" fontWeight="900" fill="#FFFFFF" textAnchor="middle">CALIFORNIA</text>
                                    <text x="11" y="19" fontFamily="sans-serif" fontSize="10" fontWeight="900" fill="#FFFFFF" textAnchor="middle">1</text>
                                  </g>
                                </g>

                                <text x="13" y="97" fontFamily="sans-serif" fontSize="8" fontWeight="900" fill="#0369A1" textAnchor="start">
                                  FREE
                                </text>
                                <text x="75" y="97" fontFamily="monospace" fontSize="6.5" fontWeight="bold" fill="#0284C7" textAnchor="end">
                                  HACKCC
                                </text>
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* 2-Column Accordion with Center Divider */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-y-0 md:gap-x-10 lg:gap-x-14 items-start">
                        {/* Col 1 */}
                        <div className="divide-y divide-amber-900/10 md:pr-8 lg:pr-10 md:border-r md:border-dashed md:border-amber-900/20">
                          {COMPARE_FAQS.slice(0, 3).map((faq) => {
                            const isOpen = openFAQId === faq.id;
                            return (
                              <div key={faq.id} className="py-4 first:pt-0 last:pb-0">
                                <button
                                  onClick={() => toggleFAQ(faq.id)}
                                  className="w-full text-left flex items-start justify-between gap-4 py-1 group cursor-pointer focus:outline-none"
                                >
                                  <div className="space-y-1">
                                    <span className="font-mono text-[10px] uppercase tracking-wider text-amber-800/80 font-bold block">
                                      {faq.badge}
                                    </span>
                                    <h3 className={`text-base sm:text-lg font-bold font-sans transition-colors ${isOpen ? "text-amber-800" : "text-slate-800 group-hover:text-amber-800"
                                      }`}>
                                      {faq.question}
                                    </h3>
                                  </div>
                                  <span className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-xs font-bold transition-transform ${isOpen ? "rotate-180 bg-amber-400 border-amber-500 text-slate-950" : "text-slate-500 group-hover:border-slate-400"
                                    }`}>
                                    ↓
                                  </span>
                                </button>
                                {isOpen && (
                                  <div className="pt-3 pb-1 pl-3 border-l-2 border-amber-500 text-slate-600 text-sm leading-relaxed font-sans">
                                    {faq.spokenAnswer}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Col 2 */}
                        <div className="divide-y divide-amber-900/10 md:pl-2">
                          {COMPARE_FAQS.slice(3, 6).map((faq) => {
                            const isOpen = openFAQId === faq.id;
                            return (
                              <div key={faq.id} className="py-4 first:pt-0 last:pb-0">
                                <button
                                  onClick={() => toggleFAQ(faq.id)}
                                  className="w-full text-left flex items-start justify-between gap-4 py-1 group cursor-pointer focus:outline-none"
                                >
                                  <div className="space-y-1">
                                    <span className="font-mono text-[10px] uppercase tracking-wider text-amber-800/80 font-bold block">
                                      {faq.badge}
                                    </span>
                                    <h3 className={`text-base sm:text-lg font-bold font-sans transition-colors ${isOpen ? "text-amber-800" : "text-slate-800 group-hover:text-amber-800"
                                      }`}>
                                      {faq.question}
                                    </h3>
                                  </div>
                                  <span className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-xs font-bold transition-transform ${isOpen ? "rotate-180 bg-amber-400 border-amber-500 text-slate-950" : "text-slate-500 group-hover:border-slate-400"
                                    }`}>
                                    ↓
                                  </span>
                                </button>
                                {isOpen && (
                                  <div className="pt-3 pb-1 pl-3 border-l-2 border-amber-500 text-slate-600 text-sm leading-relaxed font-sans">
                                    {faq.spokenAnswer}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ------------------------------------------------------------- */}
              {/* DIRECTION B: COASTAL BOARDWALK WAYSIDE KIOSK                  */}
              {/* ------------------------------------------------------------- */}
              {faqOption === "boardwalk" && (
                <div className="relative w-full max-w-5xl rounded-3xl bg-stone-900/95 border-2 border-stone-700/80 shadow-[0_24px_60px_rgba(0,0,0,0.7)] overflow-hidden backdrop-blur-md">
                  {/* Weathered Timber Header Bar with Brass Bolts */}
                  <div className="bg-gradient-to-r from-[#2c1d11] via-[#3d2817] to-[#2c1d11] border-b-2 border-amber-900/50 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative">
                    {/* Brass Lag Bolts in 4 corners */}
                    <div className="absolute top-2.5 left-2.5 w-3 h-3 rounded-full bg-amber-600/90 border border-amber-300 shadow-inner flex items-center justify-center">
                      <div className="w-1.5 h-0.5 bg-amber-950 rotate-45" />
                    </div>
                    <div className="absolute top-2.5 right-2.5 w-3 h-3 rounded-full bg-amber-600/90 border border-amber-300 shadow-inner flex items-center justify-center">
                      <div className="w-1.5 h-0.5 bg-amber-950 -rotate-45" />
                    </div>

                    {/* Ranger Sammy Perched on Timber Post */}
                    <div className="flex items-center gap-3.5 pl-3">
                      <div className="relative w-14 h-14 bg-stone-800/80 border border-amber-600/50 rounded-xl p-1 shadow-md">
                        <Image
                          src="/assets/mascots/lollipop-mascot.png"
                          alt="Park Ranger Sammy"
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-heading text-lg sm:text-xl text-amber-300 tracking-wide">
                            COASTAL COVE WAYSIDE KIOSK
                          </span>
                          <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase">
                            TRAILHEAD MP 42
                          </span>
                        </div>
                        <p className="text-xs text-stone-300 font-sans">
                          Official route briefings &amp; hacker safety advisories
                        </p>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-2 pr-3">
                      <span className="text-[11px] font-mono text-amber-400/90 tracking-wider uppercase border border-amber-500/30 px-3 py-1 rounded-full bg-amber-950/40">
                        🌲 PACIFIC COAST PARK SERVICE
                      </span>
                    </div>
                  </div>

                  {/* Kiosk Body: 2-Column Board */}
                  <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {COMPARE_FAQS.map((faq) => {
                      const isOpen = openFAQId === faq.id;
                      return (
                        <div
                          key={faq.id}
                          className={`rounded-xl border p-4 transition-all duration-200 ${isOpen
                              ? "bg-stone-800/90 border-amber-400/60 shadow-lg"
                              : "bg-stone-800/40 border-stone-700/60 hover:border-stone-500/80"
                            }`}
                        >
                          <button
                            onClick={() => toggleFAQ(faq.id)}
                            className="w-full text-left flex items-start justify-between gap-3 cursor-pointer focus:outline-none"
                          >
                            <div>
                              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 block mb-1">
                                {faq.badge}
                              </span>
                              <h3 className="text-base font-bold text-stone-100 font-sans leading-snug">
                                {faq.question}
                              </h3>
                            </div>
                            <span
                              className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-transform ${isOpen
                                  ? "rotate-180 bg-amber-400 text-slate-950 font-black"
                                  : "text-stone-400 bg-stone-700/60"
                                }`}
                            >
                              ↓
                            </span>
                          </button>
                          {isOpen && (
                            <div className="mt-3 pt-3 border-t border-stone-700 text-stone-300 text-xs sm:text-sm leading-relaxed font-sans">
                              {faq.spokenAnswer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ------------------------------------------------------------- */}
              {/* DIRECTION C: CALTRANS HIGHWAY VISTA POINT SIGN                */}
              {/* ------------------------------------------------------------- */}
              {faqOption === "highway-sign" && (
                <div className="relative w-full max-w-5xl rounded-3xl bg-[#0B1D13]/95 border-2 border-emerald-400/50 shadow-[0_24px_60px_rgba(0,0,0,0.7)] overflow-hidden backdrop-blur-md">
                  {/* Caltrans Green Interstate Header */}
                  <div className="bg-[#15803D] border-b-2 border-white/80 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative">
                    {/* Highway Bolts in corners */}
                    <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 rounded-full bg-slate-300 border border-slate-600 shadow-inner" />
                    <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-slate-300 border border-slate-600 shadow-inner" />

                    <div className="flex items-center gap-3.5">
                      {/* CA-1 Highway Shield */}
                      <div className="bg-white text-[#15803D] border border-white font-mono font-black text-xs px-2.5 py-1 rounded shadow flex flex-col items-center leading-none">
                        <span className="text-[9px]">CALIFORNIA</span>
                        <span className="text-sm font-black">1</span>
                      </div>
                      <div>
                        <h3 className="font-sans font-black uppercase text-white text-base sm:text-xl tracking-tight leading-tight">
                          COASTAL COVE VISTA POINT · TRAVELER ADVISORY
                        </h3>
                        <p className="text-xs text-emerald-100 font-mono">
                          CALTRANS DISTRICT 7 · ROUTE 2026 INFO
                        </p>
                      </div>
                    </div>

                    {/* Sammy peeking over the sign */}
                    <div className="hidden sm:flex items-center gap-2 bg-emerald-900/60 border border-emerald-300/40 rounded-full px-3 py-1">
                      <div className="relative w-6 h-6">
                        <Image
                          src="/assets/mascots/lollipop-mascot.png"
                          alt="Roadside Sammy"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-white uppercase">
                        Sammy: Official Highway Guide
                      </span>
                    </div>
                  </div>

                  {/* Signboard Body */}
                  <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {COMPARE_FAQS.map((faq, idx) => {
                      const isOpen = openFAQId === faq.id;
                      return (
                        <div
                          key={faq.id}
                          className={`rounded-xl border p-4 transition-all duration-200 ${isOpen
                              ? "bg-emerald-950/80 border-amber-400 shadow-lg"
                              : "bg-emerald-950/40 border-emerald-700/50 hover:border-emerald-500/70"
                            }`}
                        >
                          <button
                            onClick={() => toggleFAQ(faq.id)}
                            className="w-full text-left flex items-start justify-between gap-3 cursor-pointer focus:outline-none"
                          >
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-mono font-bold bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded">
                                  EXIT {idx + 1}
                                </span>
                                <span className="text-[10px] font-mono uppercase text-emerald-300">
                                  {faq.badge}
                                </span>
                              </div>
                              <h4 className="text-base font-bold text-white font-sans leading-snug">
                                {faq.question}
                              </h4>
                            </div>
                            <span
                              className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-transform ${isOpen
                                  ? "rotate-180 bg-amber-400 text-slate-950 font-black"
                                  : "text-emerald-300 bg-emerald-900/80"
                                }`}
                            >
                              ↓
                            </span>
                          </button>
                          {isOpen && (
                            <div className="mt-3 pt-3 border-t border-emerald-800 text-emerald-100 text-xs sm:text-sm leading-relaxed font-sans">
                              {faq.spokenAnswer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ------------------------------------------------------------- */}
              {/* DIRECTION D: COASTAL ROCKSIDE PERCH & OPEN VIGNETTE           */}
              {/* ------------------------------------------------------------- */}
              {faqOption === "rockside" && (
                <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column (Span 4): Sammy Rockside Perch & Route Stats */}
                  <div className="lg:col-span-4 rounded-3xl bg-slate-950/80 border border-white/20 p-6 backdrop-blur-md shadow-2xl flex flex-col items-center text-center space-y-4">
                    <div className="relative w-36 h-36 sm:w-44 sm:h-44 bg-gradient-to-b from-sky-400/20 via-amber-400/10 to-transparent rounded-2xl border border-white/15 p-2 flex items-center justify-center">
                      <Image
                        src="/assets/mascots/lollipop-mascot.png"
                        alt="Sammy Mascot"
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <div>
                      <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1">
                        SAMMY · ROUTE NAVIGATOR
                      </span>
                      <h3 className="font-heading text-2xl text-white">Got Questions?</h3>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        Perched right here at Coastal Cove to help you navigate every mile of HackCC.
                      </p>
                    </div>

                    <div className="w-full pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-left">
                      <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                        <span className="text-[10px] font-mono text-slate-400 uppercase block">Duration</span>
                        <span className="text-lg font-heading text-amber-400">14 HRS</span>
                      </div>
                      <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                        <span className="text-[10px] font-mono text-slate-400 uppercase block">Cost</span>
                        <span className="text-lg font-heading text-emerald-400">$0 FREE</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column (Span 8): Floating Translucent Glass Placards */}
                  <div className="lg:col-span-8 space-y-3">
                    {COMPARE_FAQS.map((faq) => {
                      const isOpen = openFAQId === faq.id;
                      return (
                        <div
                          key={faq.id}
                          className={`rounded-2xl border transition-all duration-200 backdrop-blur-md ${isOpen
                              ? "bg-slate-950/90 border-amber-400/80 shadow-2xl p-5 sm:p-6"
                              : "bg-slate-950/60 border-white/15 hover:border-white/30 p-4 sm:p-5"
                            }`}
                        >
                          <button
                            onClick={() => toggleFAQ(faq.id)}
                            className="w-full text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                          >
                            <div className="space-y-1">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                                {faq.badge}
                              </span>
                              <h4 className="text-base sm:text-lg font-bold text-white font-sans">
                                {faq.question}
                              </h4>
                            </div>
                            <span
                              className={`mt-1 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-transform ${isOpen
                                  ? "rotate-180 bg-amber-400 text-slate-950"
                                  : "text-slate-300 bg-white/10"
                                }`}
                            >
                              ↓
                            </span>
                          </button>
                          {isOpen && (
                            <div className="mt-3 pt-3 border-t border-white/10 text-slate-200 text-sm leading-relaxed font-sans pl-2 border-l-2 border-amber-400">
                              {faq.spokenAnswer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : activeTab === "layout-artifacts" ? (
            /* ========================================================================= */
            /* TAB 1: LAYOUT & ARTIFACTS COMPARISON (Vibecoded vs. Professional)        */
            /* ========================================================================= */
            <div className="relative z-10 p-4 sm:p-6 w-full">
              <div
                className={`grid gap-6 items-start ${screenSimulation === "mobile" || screenSimulation === "tablet"
                    ? "grid-cols-1"
                    : "grid-cols-1 lg:grid-cols-2"
                  }`}
              >
                {/* ------------------------------------------------------------- */}
                {/* OPTION A: THE "VIBECODED" ANTI-PATTERN                        */}
                {/* ------------------------------------------------------------- */}
                <div className="relative rounded-2xl overflow-hidden border border-red-500/40 bg-slate-950/60 p-4 sm:p-6 backdrop-blur-md">
                  {/* Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="text-xs uppercase font-black tracking-wider bg-red-600 text-white px-2.5 py-1 rounded">
                      ❌ The AI &quot;Vibecoded&quot; Anti-Pattern
                    </span>
                    <span className="text-[11px] text-red-300 font-mono">
                      Floating Glass + Hardcoded Positions
                    </span>
                  </div>

                  {/* Vibecoded Card Demo: Frosted glass, cyan neon glow, fake gradient scrim */}
                  <div className="relative rounded-xl border border-cyan-400/40 bg-slate-900/70 backdrop-blur-xl p-5 shadow-[0_0_30px_rgba(6,182,212,0.25)] space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                        <span className="text-xs font-mono uppercase tracking-wider text-cyan-300">
                          Generic AI Container
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                        Vibe Card
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      HackCC 2026 Registration
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Notice how this generic frosted rectangle looks identical to every AI crypto/SaaS template. It relies on a dark background scrim that ruins the scenic California sunset.
                    </p>

                    {/* Hardcoded Positioning Flaw Demo */}
                    <div className="bg-red-950/50 border border-red-500/30 rounded-lg p-3 text-[11px] text-red-200 space-y-1">
                      <div className="font-bold flex items-center gap-1.5 text-red-300">
                        <span>⚠️ Why Hardcoded Positioning Fails:</span>
                      </div>
                      <p>
                        Novice devs write <code className="bg-red-900/60 px-1 rounded">w-[480px] absolute top-[280px] left-[150px]</code>. On mobile (390px), this causes overflow clip and horizontal scroll blowouts.
                      </p>
                    </div>

                    <div className="pt-2 flex gap-3">
                      <button className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                        Generic Neon Button
                      </button>
                    </div>
                  </div>

                  {/* Bullet Critique */}
                  <ul className="mt-4 space-y-1.5 text-[11px] text-slate-300 font-sans border-t border-white/10 pt-3">
                    <li className="flex items-start gap-1.5">
                      <span className="text-red-400">✗</span>
                      <span>Dark glass box washes out California road trip scenery</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-red-400">✗</span>
                      <span>Neon cyan glow has zero thematic tie to California highways</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-red-400">✗</span>
                      <span>Coordinates break on tablets, mobile screens &amp; ultrawides</span>
                    </li>
                  </ul>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* OPTION B: ZONE 4 SPONSORS ONLY (SUBTLE ROADSIDE ACCENT)       */}
                {/* ------------------------------------------------------------- */}
                <div className="relative rounded-2xl overflow-hidden border border-emerald-500/40 bg-slate-950/30 p-4 sm:p-6 backdrop-blur-sm space-y-4">
                  {/* Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs uppercase font-black tracking-wider bg-emerald-600 text-white px-2.5 py-1 rounded">
                      ✓ Zone 4: Roadside Accent Sign
                    </span>
                    <span className="text-[11px] text-emerald-300 font-mono">
                      Subtle Character Accent (Not the Main Attraction)
                    </span>
                  </div>

                  <p className="text-xs text-slate-300">
                    The sign is kept <strong>compact and modest</strong>—it simply sits at the side of the road to add California character, while sponsor tiers and the scenery remain the main focus:
                  </p>

                  {/* Compact Wayside Road Sign Marker (Modest size, not full-screen card) */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-900/40 border border-white/10 rounded-xl p-4">
                    {/* The Small Roadside Marker */}
                    <div className="relative bg-[#15803D] border-2 border-white rounded-xl p-3 shadow-lg text-white w-full sm:w-auto sm:min-w-[200px] shrink-0">
                      {/* Compact Exit Tab */}
                      <div className="absolute -top-2.5 right-3 bg-[#15803D] border border-white px-2 py-0.5 rounded text-[9px] font-black text-amber-300 shadow">
                        EXIT 2026
                      </div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="bg-white text-[#15803D] text-[10px] font-black px-1.5 py-0.5 rounded-sm">
                          CA 1
                        </span>
                        <span className="text-xs font-bold tracking-wide">
                          SPONSOR WAY
                        </span>
                      </div>
                      <p className="text-[11px] text-emerald-100 flex items-center gap-1 font-mono">
                        <span>↗</span>
                        <span>Tech Corridor Ahead</span>
                      </p>
                    </div>

                    {/* The Primary Content: Unboxed Sponsors Floating Freely */}
                    <div className="flex-1 space-y-1 text-center sm:text-left">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                        Primary Attraction: Unboxed Sponsors
                      </p>
                      <p className="text-xs text-slate-200">
                        Sponsor logos and partner tiers breathe in the open scenery without being stuffed inside the sign container.
                      </p>
                    </div>
                  </div>

                  {/* Bullet Praise */}
                  <ul className="space-y-1.5 text-[11px] text-slate-300 font-sans border-t border-white/10 pt-3">
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-400">✓</span>
                      <span><strong>Subtle character accent</strong>: Adds road-trip flavor without dominating the landscape</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-400">✓</span>
                      <span><strong>Zone 4 only</strong>: Only used where asphalt road scenery naturally fits roadside markers</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-400">✓</span>
                      <span><strong>Natural luminous background</strong>: Scenery is close to normal with zero heavy darkening</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* OPTION C: CAL HACKS UNBOXED MONUMENTAL STATS GRID             */}
              {/* ------------------------------------------------------------- */}
              <div className="mt-6 rounded-2xl border border-amber-400/30 bg-slate-950/40 p-5 backdrop-blur-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-xs uppercase font-black tracking-wider bg-amber-400 text-slate-950 px-2.5 py-1 rounded">
                    ✓ Option C: Cal Hacks Pure Unboxed Grid
                  </span>
                  <span className="text-[11px] text-amber-300 font-mono">
                    Zero Boxes • Monumental Stats • Pure Fluid Flow
                  </span>
                </div>
                <p className="text-xs text-slate-300 mb-4 max-w-3xl">
                  When content doesn&apos;t need a sign container, Cal Hacks &amp; HackMIT leave it <strong>100% unboxed</strong> directly in the landscape, structured by a clean responsive CSS Grid:
                </p>

                {/* Monumental Stats Grid */}
                <div
                  className={`grid gap-6 py-2 ${screenSimulation === "mobile" ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-3"
                    }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-heading text-4xl sm:text-5xl md:text-6xl text-amber-400">14</span>
                      <span className="font-sans font-black text-xl text-amber-300">HRS</span>
                    </div>
                    <p className="font-sans font-bold text-xs uppercase tracking-wider text-white">Non-stop sprint</p>
                    <p className="text-[11px] text-slate-400">Pure build velocity</p>
                  </div>
                  <div className="space-y-1 sm:border-l sm:border-white/20 sm:pl-6">
                    <div className="flex items-baseline gap-1">
                      <span className="font-heading text-4xl sm:text-5xl md:text-6xl text-white">250</span>
                      <span className="font-sans font-black text-xl text-amber-400">+</span>
                    </div>
                    <p className="font-sans font-bold text-xs uppercase tracking-wider text-white">Hacker capacity</p>
                    <p className="text-[11px] text-slate-400">100% Community College</p>
                  </div>
                  <div className="space-y-1 sm:border-l sm:border-white/20 sm:pl-6">
                    <div className="flex items-baseline gap-1">
                      <span className="font-heading text-4xl sm:text-5xl md:text-6xl text-amber-300">$10K</span>
                      <span className="font-sans font-black text-xl text-amber-400">+</span>
                    </div>
                    <p className="font-sans font-bold text-xs uppercase tracking-wider text-white">Prize purse</p>
                    <p className="text-[11px] text-slate-400">Track &amp; sponsor awards</p>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === "footer-designs" ? (
            /* ========================================================================= */
            /* TAB 1: FOOTER REDESIGNS (3 CANDIDATE DIRECTIONS)                         */
            /* ========================================================================= */
            <div className="relative z-10 w-full">
              {/* Context bar */}
              <div className="bg-slate-900/90 border-b border-white/10 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-wider bg-amber-400 text-slate-950 px-2.5 py-1 rounded-md mr-3">
                    {footerStyle === "seamless" && "Direction A: Seamless Twilight Horizon"}
                    {footerStyle === "stamp" && "Direction B: Editorial Cal Hacks California Stamp"}
                    {footerStyle === "freeway-board" && "Direction C: Freeway Sign Directory Marker"}
                  </span>
                  <span className="text-xs text-slate-300 font-mono">
                    {footerStyle === "seamless" && "Blends directly from the San Diego sunset beach artwork, 4 balanced columns, contact link"}
                    {footerStyle === "stamp" && "Clean editorial typography with a bold 'MADE IN CALIFORNIA' badge and horizontal roadtrip links"}
                    {footerStyle === "freeway-board" && "Authentic Caltrans highway green exit banner grounded over the coastline"}
                  </span>
                </div>
                <div className="text-xs text-amber-300 font-mono">
                  Simulated on Zone 6 (Beach) Seam
                </div>
              </div>

              {/* Top Teaser: Bottom of Zone 6 CTA so user sees the exact seam transition */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                <Image
                  src="/assets/roadtrip/zone6-cta-footer/San-Diego-Beach.jpg"
                  alt="Beach preview"
                  fill
                  className="object-cover object-bottom"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/40 to-slate-950/90" />
                <div className="absolute inset-x-0 bottom-6 text-center">
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-300/80">
                    ↑ Zone 6 CTA Beach Seam (End of Page Content)
                  </span>
                </div>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* OPTION A: SEAMLESS TWILIGHT HORIZON                           */}
              {/* ------------------------------------------------------------- */}
              {footerStyle === "seamless" && (
                <div className="relative bg-[#020617] border-t border-amber-400/30 text-slate-100 font-sans">
                  {/* Subtle golden sunset gradient overlay at the top edge */}
                  <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-amber-500/10 via-slate-950/40 to-transparent pointer-events-none" />

                  <div className="max-w-6xl mx-auto px-6 lg:px-8 py-14 relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
                      {/* Col 1: Wordmark & Narrative (Span 4) */}
                      <div className="lg:col-span-4 space-y-3">
                        <div className="flex items-center gap-2.5">
                          <span className="font-heading text-3xl text-white tracking-wide">
                            HackCC
                          </span>
                          <span className="bg-[#15803D] text-white border border-white/60 font-mono font-black text-[11px] px-2 py-0.5 rounded shadow-sm">
                            ROUTE 2026
                          </span>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          California&apos;s premier hackathon dedicated entirely to community college builders, designers, and visionaries.
                        </p>
                        <div className="pt-2 flex items-center gap-3">
                          <a
                            href="https://discord.gg/yRShGV7Py4"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Discord"
                            className="w-12 h-12 rounded-xl bg-white/10 hover:bg-[#5865F2] border border-white/20 hover:border-transparent text-white flex items-center justify-center text-2xl transition-all shadow-md hover:scale-110 active:scale-95"
                          >
                            <FontAwesomeIcon icon={faDiscord} className="w-6 h-6" />
                          </a>
                          <a
                            href="https://www.instagram.com/realhackcc/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="w-12 h-12 rounded-xl bg-white/10 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] border border-white/20 hover:border-transparent text-white flex items-center justify-center text-2xl transition-all shadow-md hover:scale-110 active:scale-95"
                          >
                            <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />
                          </a>
                        </div>
                      </div>

                      {/* Col 2: Stops & Zones (Span 3) */}
                      <div className="lg:col-span-3 space-y-2.5">
                        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400">
                          Roadtrip Stops
                        </h4>
                        <ul className="space-y-2 text-sm text-slate-300">
                          <li><a href="#zone-hero" className="hover:text-amber-300 transition-colors">01 / Hollywood Hills</a></li>
                          <li><a href="#zone-about" className="hover:text-amber-300 transition-colors">02 / Inglewood Skyline (About)</a></li>
                          <li><a href="#zone-sponsors" className="hover:text-amber-300 transition-colors">03 / Santa Monica Pier (Sponsors)</a></li>
                          <li><a href="#zone-faq" className="hover:text-amber-300 transition-colors">04 / PCH Coast (FAQ)</a></li>
                          <li><a href="#zone-apply" className="hover:text-amber-300 transition-colors">05 / San Diego Beach (Apply)</a></li>
                        </ul>
                      </div>

                      {/* Col 3: Directory (Span 2) */}
                      <div className="lg:col-span-2 space-y-2.5">
                        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400">
                          Directory
                        </h4>
                        <ul className="space-y-2 text-sm text-slate-300">
                          <li>
                            <Link href="/organizers" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                              <span>Crew</span>
                              <span className="text-[9px] bg-amber-400/20 text-amber-300 font-mono px-1 rounded">LEADS</span>
                            </Link>
                          </li>
                          <li><Link href="/2026" className="hover:text-amber-300 transition-colors">Archive</Link></li>
                          <li><Link href="/apply" className="text-amber-400 font-bold hover:underline">Apply Now →</Link></li>
                        </ul>
                      </div>

                      {/* Col 4: Dispatch & Location (Span 3) */}
                      <div className="lg:col-span-3 space-y-2.5">
                        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400">
                          Dispatch &amp; Contact
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Questions about partnerships, tracks, or volunteering?
                        </p>
                        <a
                          href="mailto:team@hackcc.net"
                          className="inline-block text-sm font-mono text-white underline underline-offset-4 decoration-amber-400 hover:text-amber-300 transition-colors"
                        >
                          team@hackcc.net
                        </a>
                        <div className="pt-2 text-xs text-slate-400">
                          📍 Southern California, USA
                        </div>
                      </div>
                    </div>

                    {/* Bottom Sub-bar */}
                    <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
                      <span>&copy; 2026 HackCC. Built for California community college students.</span>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-amber-300">SUNSET HORIZON</span>
                        <span>•</span>
                        <a href="#zone-hero" className="hover:text-white transition-colors">Back to top ↑</a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ------------------------------------------------------------- */}
              {/* OPTION B: EDITORIAL CAL HACKS STATE STAMP                     */}
              {/* ------------------------------------------------------------- */}
              {footerStyle === "stamp" && (
                <div className="relative bg-slate-950 border-t-2 border-white/20 text-slate-100 font-sans">
                  <div className="max-w-6xl mx-auto px-6 lg:px-8 py-14">
                    {/* Big Editorial Top Row: Massive Wordmark + California State Stamp */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/10">
                      <div>
                        <p className="font-serif italic text-amber-300 text-xl font-light mb-1">
                          The road trip of a lifetime
                        </p>
                        <h3 className="font-heading text-5xl sm:text-6xl text-white tracking-tight">
                          HackCC 2026
                        </h3>
                      </div>

                      {/* Authentic California Road-Trip Stamp */}
                      <div className="inline-flex items-center gap-4 bg-white/5 border border-white/15 px-5 py-3 rounded-2xl">
                        <div className="text-right">
                          <span className="block text-[10px] font-mono tracking-widest uppercase text-slate-400">ESTABLISHED</span>
                          <span className="block font-heading text-lg text-white">CALIFORNIA</span>
                        </div>
                        <div className="h-8 w-[1px] bg-white/20" />
                        <div className="text-left">
                          <span className="block text-[10px] font-mono tracking-widest uppercase text-amber-400">STATEWIDE</span>
                          <span className="block font-mono font-black text-sm text-emerald-400">ROUTE 1</span>
                        </div>
                      </div>
                    </div>

                    {/* Middle Row: Balanced 3-Cluster Horizontal Navigation */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
                      <div>
                        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                          Event Navigation
                        </h4>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-200">
                          <a href="#zone-about" className="hover:text-amber-300">About</a>
                          <a href="#zone-details" className="hover:text-amber-300">Tracks</a>
                          <a href="#zone-sponsors" className="hover:text-amber-300">Sponsors</a>
                          <a href="#zone-faq" className="hover:text-amber-300">FAQ</a>
                          <a href="#zone-apply" className="hover:text-amber-300">Register</a>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                          Connect &amp; Community
                        </h4>
                        <div className="flex items-center gap-3">
                          <a
                            href="https://discord.gg/yRShGV7Py4"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#5865F2] text-xs font-bold text-white transition-all"
                          >
                            <FontAwesomeIcon icon={faDiscord} className="w-4 h-4" />
                            <span>Discord</span>
                          </a>
                          <a
                            href="https://www.instagram.com/realhackcc/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#dc2743] text-xs font-bold text-white transition-all"
                          >
                            <FontAwesomeIcon icon={faInstagram} className="w-4 h-4" />
                            <span>Instagram</span>
                          </a>
                          <Link
                            href="/organizers"
                            className="text-xs font-bold text-amber-300 hover:underline px-2 py-1.5"
                          >
                            Meet Team →
                          </Link>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                          Direct Contact
                        </h4>
                        <a
                          href="mailto:contact@hackcc.net"
                          className="font-mono text-sm text-white hover:text-amber-300 transition-colors"
                        >
                          contact@hackcc.net
                        </a>
                      </div>
                    </div>

                    {/* Bottom Sub-bar */}
                    <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
                      <span>&copy; 2026 HackCC • Designed with pride in California</span>
                      <a href="#zone-hero" className="hover:text-white font-mono">BACK TO TOP ↑</a>
                    </div>
                  </div>
                </div>
              )}

              {/* ------------------------------------------------------------- */}
              {/* OPTION C: FREEWAY SIGN DIRECTORY BOARD                        */}
              {/* ------------------------------------------------------------- */}
              {footerStyle === "freeway-board" && (
                <div className="relative bg-[#020b14] border-t-4 border-[#15803D] text-slate-100 font-sans">
                  {/* Caltrans Highway Sign Board Header */}
                  <div className="bg-[#15803D] py-2 px-6 shadow-inner border-b border-black/30">
                    <div className="max-w-6xl mx-auto flex items-center justify-between text-white font-mono text-xs sm:text-sm font-black tracking-wider">
                      <div className="flex items-center gap-2">
                        <span>★ CALIFORNIA HIGHWAY PATROL</span>
                        <span className="text-amber-300">•</span>
                        <span>INTERSTATE CC-2026</span>
                      </div>
                      <span className="bg-white text-[#15803D] px-2 py-0.5 rounded text-[11px] font-bold">
                        NEXT EXIT: HACKATHON
                      </span>
                    </div>
                  </div>

                  <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                      {/* Mile Marker 1 */}
                      <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-emerald-500/50 transition-colors">
                        <span className="font-mono text-xs text-emerald-400 font-bold">MILE 01</span>
                        <h4 className="font-heading text-xl text-white mt-1 mb-2">HackCC Mission</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Empowering community college creators with real engineering experience.
                        </p>
                      </div>

                      {/* Mile Marker 2 */}
                      <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-emerald-500/50 transition-colors">
                        <span className="font-mono text-xs text-emerald-400 font-bold">MILE 02</span>
                        <h4 className="font-heading text-xl text-white mt-1 mb-2">Quick Stops</h4>
                        <div className="space-y-1 text-xs text-slate-300">
                          <div><a href="#zone-about" className="hover:text-amber-300">About the Event</a></div>
                          <div><a href="#zone-details" className="hover:text-amber-300">Tracks &amp; Prizes</a></div>
                          <div><a href="#zone-sponsors" className="hover:text-amber-300">Sponsor Highway</a></div>
                        </div>
                      </div>

                      {/* Mile Marker 3 */}
                      <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-emerald-500/50 transition-colors">
                        <span className="font-mono text-xs text-emerald-400 font-bold">MILE 03</span>
                        <h4 className="font-heading text-xl text-white mt-1 mb-2">Crew &amp; Route</h4>
                        <div className="space-y-1 text-xs text-slate-300">
                          <div><Link href="/organizers" className="hover:text-amber-300">Organizers</Link></div>
                          <div><Link href="/2026" className="hover:text-amber-300">Past Archives</Link></div>
                          <div><Link href="/apply" className="text-amber-400 font-bold">Apply (Open)</Link></div>
                        </div>
                      </div>

                      {/* Mile Marker 4 */}
                      <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-emerald-500/50 transition-colors">
                        <span className="font-mono text-xs text-emerald-400 font-bold">MILE 04</span>
                        <h4 className="font-heading text-xl text-white mt-1 mb-2">Emergency Radio</h4>
                        <div className="flex gap-3 mb-2">
                          <a
                            href="https://discord.gg/yRShGV7Py4"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-lg bg-white/10 hover:bg-[#5865F2] text-white transition-colors"
                          >
                            <FontAwesomeIcon icon={faDiscord} className="w-5 h-5" />
                          </a>
                          <a
                            href="https://www.instagram.com/realhackcc/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-lg bg-white/10 hover:bg-[#dc2743] text-white transition-colors"
                          >
                            <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
                          </a>
                        </div>
                        <span className="text-[11px] font-mono text-slate-400">dispatch@hackcc.net</span>
                      </div>
                    </div>

                    {/* Bottom Sub-bar */}
                    <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
                      <span>CALTRANS ROUTE 2026 • ALL RIGHTS RESERVED</span>
                      <a href="#zone-hero" className="hover:text-amber-300">MILEPOST 0 (TOP) ↑</a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : activeTab === "typography" ? (
            /* ========================================================================= */
            /* TAB 2: ARTIFACTS / LAYOUT VIEW                                            */
            /* ========================================================================= */
            <div className="relative z-10 p-4 sm:p-8 max-w-7xl mx-auto w-full">
              {/* Unboxed Layout Hero Demo */}
              <div className="space-y-6 sm:space-y-8 text-center lg:text-left py-4">
                <div className="space-y-1">
                  <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-amber-300/95 font-light tracking-wide">
                    California&apos;s premier
                  </p>
                  <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl text-white leading-[1.08] tracking-normal font-normal">
                    Statewide Hackathon
                  </h1>
                </div>
                <p className="text-slate-200 text-base sm:text-lg max-w-2xl leading-relaxed font-sans mx-auto lg:mx-0">
                  Bringing together community college builders, designers, and visionaries for a non-stop statewide journey of rapid invention and real-world technology.
                </p>
                <div className="grid grid-cols-3 gap-4 sm:gap-10 pt-4 pb-2 max-w-2xl mx-auto lg:mx-0 text-left">
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-1">
                      <span className="font-heading text-4xl sm:text-5xl md:text-6xl text-amber-400">14</span>
                      <span className="font-sans font-extrabold text-sm sm:text-xl text-amber-300">HRS</span>
                    </div>
                    <p className="font-sans font-bold text-xs uppercase tracking-wider text-white">Sprint duration</p>
                    <p className="text-[11px] text-slate-400">Non-stop building</p>
                  </div>
                  <div className="space-y-1 sm:border-l sm:border-white/20 sm:pl-6">
                    <div className="flex items-baseline gap-1">
                      <span className="font-heading text-4xl sm:text-5xl md:text-6xl text-white">250</span>
                      <span className="font-sans font-black text-xl text-amber-400">+</span>
                    </div>
                    <p className="font-sans font-bold text-xs uppercase tracking-wider text-white">Hacker capacity</p>
                    <p className="text-[11px] text-slate-400">100% Community College</p>
                  </div>
                  <div className="space-y-1 sm:border-l sm:border-white/20 sm:pl-6">
                    <div className="flex items-baseline gap-1">
                      <span className="font-heading text-4xl sm:text-5xl md:text-6xl text-amber-300">$10K</span>
                      <span className="font-sans font-black text-xl text-amber-400">+</span>
                    </div>
                    <p className="font-sans font-bold text-xs uppercase tracking-wider text-white">Prize purse</p>
                    <p className="text-[11px] text-slate-400">Track &amp; sponsor awards</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ========================================================================= */
            /* TAB 3: TYPOGRAPHY PERSONALITY SHOWCASE                                    */
            /* ========================================================================= */
            <div className="relative z-10 p-4 sm:p-8 max-w-7xl mx-auto w-full">
              {viewMode === "side-by-side" ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch py-8">
                  {/* Left: Bagel Fat One */}
                  <div className="flex flex-col">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs uppercase font-extrabold tracking-wider bg-amber-400 text-slate-950 px-2.5 py-1 rounded-md">
                        Style A: Clean Bagel Fat One
                      </span>
                      <span className="text-xs text-amber-200 font-mono">Retro California Road-Trip Surf</span>
                    </div>
                    <HeroTypographyBlock fontStyle="bagel" isCompact />
                  </div>

                  {/* Right: Modern Geometric Sans */}
                  <div className="flex flex-col">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs uppercase font-extrabold tracking-wider bg-white/20 text-slate-200 border border-white/20 px-2.5 py-1 rounded-md">
                        Style B: Modern Monumental Sans
                      </span>
                      <span className="text-xs text-slate-400 font-mono">Clean High-Tech Geometric</span>
                    </div>
                    <HeroTypographyBlock fontStyle="sans" isCompact />
                  </div>
                </div>
              ) : (
                <div className="max-w-4xl mx-auto py-12">
                  <div className="mb-4">
                    <span className="text-xs uppercase font-extrabold tracking-wider bg-amber-400 text-slate-950 px-3 py-1 rounded-md">
                      {activeFont === "bagel" && "Display Font: Bagel Fat One (Retro California Surf)"}
                      {activeFont === "sans" && "Display Font: Modern Monumental Sans (Clean High-Tech)"}
                      {activeFont === "fraunces" && "Display Font: Vintage Highway Editorial (Fraunces Serif)"}
                    </span>
                  </div>
                  <HeroTypographyBlock fontStyle={activeFont} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <footer className="bg-slate-950/95 border-t border-white/10 px-6 py-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <p>
            🛣️ <strong className="text-white">HackCC Layout Philosophy:</strong> Ban hardcoded pixel offsets &amp; generic floating glass boxes. Use responsive Flexbox/Grid with authentic California Road Trip artifacts (freeway signs, route shields) or 100% unboxed typography.
          </p>
          <div className="flex gap-4">
            <span className="text-amber-300">✓ Fluid CSS Grid</span>
            <span className="text-emerald-400">✓ Caltrans Green Artifacts</span>
            <span className="text-slate-300">✓ Zero Scrims</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ---------------------------------------------------------------------------
// DYNAMIC HERO TYPOGRAPHY BLOCK
// ---------------------------------------------------------------------------
function HeroTypographyBlock({
  fontStyle,
  isCompact = false,
}: {
  fontStyle: FontOption;
  isCompact?: boolean;
}) {
  return (
    <div className={`space-y-6 sm:space-y-8 text-center lg:text-left py-4 ${isCompact ? "scale-95 origin-top-left" : ""}`}>
      {/* Headline Block */}
      <div className="space-y-1">
        <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-amber-300/95 font-light tracking-wide">
          California&apos;s premier
        </p>

        {/* 1. BAGEL FAT ONE OPTION */}
        {fontStyle === "bagel" && (
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl text-white leading-[1.08] tracking-normal font-normal">
            Statewide Hackathon
          </h1>
        )}

        {/* 2. MODERN GEOMETRIC SANS OPTION */}
        {fontStyle === "sans" && (
          <h1 className="font-sans font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-white leading-none">
            Statewide Hackathon
          </h1>
        )}

        {/* 3. VINTAGE HIGHWAY EDITORIAL (FRAUNCES) OPTION */}
        {fontStyle === "fraunces" && (
          <h1 className="font-serif font-black text-4xl sm:text-6xl md:text-7xl text-white leading-[1.05] tracking-tight">
            Statewide Hackathon
          </h1>
        )}
      </div>

      {/* Open, Unboxed Narrative Description */}
      <p className="text-slate-200 text-base sm:text-lg max-w-2xl leading-relaxed font-sans mx-auto lg:mx-0">
        Bringing together community college builders, designers, and visionaries for a non-stop statewide journey of rapid invention and real-world technology.
      </p>

      {/* Massive Unboxed Stats (Font matches the selected personality) */}
      <div className="grid grid-cols-3 gap-4 sm:gap-10 pt-4 pb-2 max-w-2xl mx-auto lg:mx-0 text-left">
        {/* Stat 1: 14 HRS */}
        <div className="space-y-1">
          <div className="flex items-baseline gap-1">
            <span
              className={`text-4xl sm:text-6xl md:text-7xl text-amber-400 tracking-tight ${fontStyle === "bagel"
                  ? "font-heading font-normal"
                  : fontStyle === "fraunces"
                    ? "font-serif font-black"
                    : "font-sans font-black"
                }`}
            >
              14
            </span>
            <span className="font-sans font-extrabold text-base sm:text-2xl text-amber-300">
              HRS
            </span>
          </div>
          <p className="font-sans font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-100">
            Sprint
          </p>
          <p className="font-sans text-[11px] sm:text-xs text-slate-400 hidden sm:block">
            Non-stop build
          </p>
        </div>

        {/* Stat 2: 250 HACKERS */}
        <div className="space-y-1 border-l border-white/20 pl-4 sm:pl-10">
          <div className="flex items-baseline gap-0.5">
            <span
              className={`text-4xl sm:text-6xl md:text-7xl text-white tracking-tight ${fontStyle === "bagel"
                  ? "font-heading font-normal"
                  : fontStyle === "fraunces"
                    ? "font-serif font-black"
                    : "font-sans font-black"
                }`}
            >
              250
            </span>
            <span className="font-sans font-extrabold text-base sm:text-2xl text-amber-400">
              +
            </span>
          </div>
          <p className="font-sans font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-100">
            Hackers
          </p>
          <p className="font-sans text-[11px] sm:text-xs text-slate-400 hidden sm:block">
            Community college only
          </p>
        </div>

        {/* Stat 3: $10,000 PRIZES */}
        <div className="space-y-1 border-l border-white/20 pl-4 sm:pl-10">
          <div className="flex items-baseline gap-0.5">
            <span
              className={`text-4xl sm:text-6xl md:text-7xl text-amber-300 tracking-tight ${fontStyle === "bagel"
                  ? "font-heading font-normal"
                  : fontStyle === "fraunces"
                    ? "font-serif font-black"
                    : "font-sans font-black"
                }`}
            >
              $10K
            </span>
            <span className="font-sans font-extrabold text-base sm:text-2xl text-amber-400">
              +
            </span>
          </div>
          <p className="font-sans font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-100">
            Prizes
          </p>
          <p className="font-sans text-[11px] sm:text-xs text-slate-400 hidden sm:block">
            Cash &amp; sponsor awards
          </p>
        </div>
      </div>

      {/* Purposeful CTA Row (Solid Amber + Underlined Link) */}
      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-4">
        <Link
          href="/apply"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm sm:text-base tracking-wide font-sans transition-all transform hover:scale-105 shadow-lg shadow-black/40 cursor-pointer"
        >
          <span>Hit the Road (Apply)</span>
          <span className="text-slate-950 font-black text-xl">→</span>
        </Link>
        <Link
          href="/2026"
          className="inline-flex items-center justify-center px-6 py-4 text-white hover:text-amber-300 font-bold text-sm sm:text-base font-sans transition-colors cursor-pointer underline underline-offset-8 decoration-white/30 hover:decoration-amber-400"
        >
          Explore Event Schedule &amp; Route
        </Link>
      </div>
    </div>
  );
}
