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
    id: "zone2-night",
    name: "Zone 2: Inglewood Twilight Skyline (Natural Horizon)",
    image: "/assets/roadtrip/zone2-details/inglewood.jpeg",
    scrim: "",
    type: "Night Cityscape",
    isSignOnly: false,
  },
  {
    id: "zone3-pier",
    name: "Zone 3: Santa Monica Pier Night (Vibrant Ocean)",
    image: "/assets/roadtrip/zone3-about/santa-monica-pier-bg-nighttime.jpeg",
    scrim: "",
    type: "Night Ocean",
    isSignOnly: false,
  },
  {
    id: "zone4-sponsors",
    name: "Zone 4: Orange County / Anaheim Roadway (Actual Highway)",
    image: "/assets/roadtrip/zone4-sponsors/oc-anaheim.jpeg",
    scrim: "",
    type: "Night Highway Road",
    isSignOnly: false,
  },
  {
    id: "zone5-highway",
    name: "Zone 5: PCH Coastal Highway (Luminous Sunshine)",
    image: "/assets/roadtrip/zone5-faq/Double-Dome.jpg",
    scrim: "",
    type: "Sunny Coastal",
    isSignOnly: false,
  },
  {
    id: "zone6-beach",
    name: "Zone 6: San Diego Sunset Beach (Golden Glow)",
    image: "/assets/roadtrip/zone6-cta-footer/San-Diego-Beach.jpg",
    scrim: "",
    type: "Golden Sunset",
    isSignOnly: false,
  },
];

type FontOption = "bagel" | "sans" | "fraunces";
type ComparisonMode = "layout-artifacts" | "typography" | "footer-designs";
type FooterOption = "seamless" | "stamp" | "freeway-board";
type ScreenSimulation = "full" | "tablet" | "mobile";

export default function CompareDesignPage() {
  const [selectedSceneIndex, setSelectedSceneIndex] = useState(1); // Default to Zone 2
  const [activeTab, setActiveTab] = useState<ComparisonMode>("footer-designs");
  const [activeFont, setActiveFont] = useState<FontOption>("bagel");
  const [footerStyle, setFooterStyle] = useState<FooterOption>("seamless");
  const [viewMode, setViewMode] = useState<"side-by-side" | "single">("side-by-side");
  const [screenSimulation, setScreenSimulation] = useState<ScreenSimulation>("full");

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
                onClick={() => setActiveTab("footer-designs")}
                className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                  activeTab === "footer-designs"
                    ? "bg-amber-400 text-slate-950 shadow font-bold"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                🏁 Footer Redesigns (3 Directions)
              </button>
              <button
                onClick={() => setActiveTab("layout-artifacts")}
                className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                  activeTab === "layout-artifacts"
                    ? "bg-amber-400 text-slate-950 shadow font-bold"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                🛣️ Layout &amp; Artifacts
              </button>
              <button
                onClick={() => setActiveTab("typography")}
                className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                  activeTab === "typography"
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
          {activeTab === "footer-designs" ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 hidden md:inline">Footer Direction:</span>
              <div className="flex bg-slate-900 p-1 rounded-lg border border-white/10 text-xs font-semibold">
                <button
                  onClick={() => setFooterStyle("seamless")}
                  className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                    footerStyle === "seamless"
                      ? "bg-amber-400 text-slate-950 font-bold shadow"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  Direction A: Seamless Twilight
                </button>
                <button
                  onClick={() => setFooterStyle("stamp")}
                  className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                    footerStyle === "stamp"
                      ? "bg-amber-400 text-slate-950 font-bold shadow"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  Direction B: Editorial CA Stamp
                </button>
                <button
                  onClick={() => setFooterStyle("freeway-board")}
                  className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                    footerStyle === "freeway-board"
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
                  className={`px-2.5 py-1.5 rounded transition-colors cursor-pointer ${
                    screenSimulation === "full"
                      ? "bg-amber-400 text-slate-950 font-bold"
                      : "text-slate-300 hover:text-white"
                  }`}
                  title="Full desktop viewport"
                >
                  Desktop
                </button>
                <button
                  onClick={() => setScreenSimulation("tablet")}
                  className={`px-2.5 py-1.5 rounded transition-colors cursor-pointer ${
                    screenSimulation === "tablet"
                      ? "bg-amber-400 text-slate-950 font-bold"
                      : "text-slate-300 hover:text-white"
                  }`}
                  title="Tablet portrait (768px)"
                >
                  Tablet (768px)
                </button>
                <button
                  onClick={() => setScreenSimulation("mobile")}
                  className={`px-2.5 py-1.5 rounded transition-colors cursor-pointer ${
                    screenSimulation === "mobile"
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
                  className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
                    viewMode === "side-by-side"
                      ? "bg-amber-400 text-slate-950 shadow font-bold"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  Side-by-Side
                </button>
                <button
                  onClick={() => setViewMode("single")}
                  className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
                    viewMode === "single"
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
                    className={`px-2.5 py-1.5 rounded transition-colors ${
                      activeFont === "bagel"
                        ? "bg-amber-400 text-slate-950 font-bold"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    Bagel Fat One
                  </button>
                  <button
                    onClick={() => setActiveFont("sans")}
                    className={`px-2.5 py-1.5 rounded transition-colors ${
                      activeFont === "sans"
                        ? "bg-amber-400 text-slate-950 font-bold"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    Modern Sans
                  </button>
                  <button
                    onClick={() => setActiveFont("fraunces")}
                    className={`px-2.5 py-1.5 rounded transition-colors ${
                      activeFont === "fraunces"
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
          className={`w-full transition-all duration-300 relative overflow-hidden rounded-2xl border border-white/15 shadow-2xl flex flex-col justify-center ${
            screenSimulation === "mobile"
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
          ) : activeTab === "layout-artifacts" ? (
            /* ========================================================================= */
            /* TAB 1: LAYOUT & ARTIFACTS COMPARISON (Vibecoded vs. Professional)        */
            /* ========================================================================= */
            <div className="relative z-10 p-4 sm:p-6 w-full">
              <div
                className={`grid gap-6 items-start ${
                  screenSimulation === "mobile" || screenSimulation === "tablet"
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
                      ❌ The AI "Vibecoded" Anti-Pattern
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
                  className={`grid gap-6 py-2 ${
                    screenSimulation === "mobile" ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-3"
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
                          <li><a href="#zone-details" className="hover:text-amber-300 transition-colors">02 / Inglewood Skyline</a></li>
                          <li><a href="#zone-about" className="hover:text-amber-300 transition-colors">03 / Santa Monica Pier</a></li>
                          <li><a href="#zone-sponsors" className="hover:text-amber-300 transition-colors">04 / Anaheim Freeway</a></li>
                          <li><a href="#zone-faq" className="hover:text-amber-300 transition-colors">05 / PCH Coast</a></li>
                          <li><a href="#zone-apply" className="hover:text-amber-300 transition-colors">06 / San Diego Sunset</a></li>
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
  isCompact,
}: {
  fontStyle: FontOption;
  isCompact?: boolean;
}) {
  return (
    <div className="space-y-6 sm:space-y-8 text-center lg:text-left py-4">
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
              className={`text-4xl sm:text-6xl md:text-7xl text-amber-400 tracking-tight ${
                fontStyle === "bagel"
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
              className={`text-4xl sm:text-6xl md:text-7xl text-white tracking-tight ${
                fontStyle === "bagel"
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
              className={`text-4xl sm:text-6xl md:text-7xl text-amber-300 tracking-tight ${
                fontStyle === "bagel"
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
