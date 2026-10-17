"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { TransitionVariant } from "./types";
import TransitionMinimalScenic from "./TransitionMinimalScenic";
import TransitionScenicHighway from "./TransitionScenicHighway";
import TransitionCurvedCoastal from "./TransitionCurvedCoastal";
import TransitionDashboardHUD from "./TransitionDashboardHUD";
import OldOriginalTransition from "./OldOriginalTransition";

type ExtendedVariant = TransitionVariant | "old-original";

const ROAD_STOPS = [
  {
    name: "Stop 1: Hollywood Hills ➔ Inglewood",
    routeNumber: "101",
    nextStop: "INGLEWOOD",
    mileage: "EXIT 2B",
    direction: "right" as const,
    signPosition: "right" as const,
    sceneA: "/assets/roadtrip/zone1-hero/hero-background.jpeg",
    sceneB: "/assets/roadtrip/zone2-details/inglewood-daytime.jpg",
  },
  {
    name: "Stop 2: Inglewood ➔ Santa Monica Pier",
    routeNumber: "1",
    nextStop: "SANTA MONICA",
    mileage: "PCH · 4 MI",
    direction: "left" as const,
    signPosition: "left" as const,
    sceneA: "/assets/roadtrip/zone2-details/inglewood-daytime.jpg",
    sceneB: "/assets/roadtrip/zone3-about/santa-monica-pier-bg-daytime.jpeg",
  },
  {
    name: "Stop 3: Santa Monica ➔ Coastal Cove",
    routeNumber: "1",
    nextStop: "COASTAL COVE",
    mileage: "PCH S",
    direction: "right" as const,
    signPosition: "right" as const,
    sceneA: "/assets/roadtrip/zone3-about/santa-monica-pier-bg-daytime.jpeg",
    sceneB: "/assets/roadtrip/zone5-faq/Double-Dome.jpg",
  },
  {
    name: "Stop 4: Coastal Cove ➔ San Diego",
    routeNumber: "5",
    nextStop: "SAN DIEGO",
    mileage: "FINISH LINE",
    direction: "left" as const,
    signPosition: "left" as const,
    sceneA: "/assets/roadtrip/zone5-faq/Double-Dome.jpg",
    sceneB: "/assets/roadtrip/zone6-cta-footer/San-Diego-Beach.jpg",
  },
];

export default function RoadTransitionComparison() {
  const [activeVariant, setActiveVariant] = useState<ExtendedVariant>("minimal-scenic");
  const [selectedStopIndex, setSelectedStopIndex] = useState(0);
  const [displayMode, setDisplayMode] = useState<"slider" | "live-scroll" | "side-by-side">("slider");
  const [sliderProgress, setSliderProgress] = useState(0.48);
  const [isPlaying, setIsPlaying] = useState(false);

  const stop = ROAD_STOPS[selectedStopIndex];

  // Auto-drive play loop for slider
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setSliderProgress((prev) => {
        if (prev >= 0.95) return 0.05;
        return prev + 0.015;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const renderTransitionComponent = (variant: ExtendedVariant, progressValue?: number) => {
    const commonProps = {
      routeNumber: stop.routeNumber,
      nextStop: stop.nextStop,
      mileage: stop.mileage,
      direction: stop.direction,
      signPosition: stop.signPosition,
      progress: progressValue,
      interactive: true,
    };

    switch (variant) {
      case "minimal-scenic":
        return <TransitionMinimalScenic {...commonProps} />;
      case "scenic-highway":
        return <TransitionScenicHighway {...commonProps} />;
      case "curved-coastal":
        return <TransitionCurvedCoastal {...commonProps} />;
      case "dashboard-hud":
        return <TransitionDashboardHUD {...commonProps} />;
      case "old-original":
        return <OldOriginalTransition {...commonProps} />;
    }
  };

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
      {/* Direction Selection Bar */}
      <div className="bg-slate-900/95 border border-white/15 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-md flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                TRANSITION SHOWCASE
              </span>
              <span className="bg-amber-400/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-400/30">
                4 New Directions + Current
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-heading font-black text-white mt-0.5">
              California Road Trip Transition Lab
            </h2>
          </div>

          {/* View Modes */}
          <div className="flex bg-slate-950 p-1 rounded-lg border border-white/10 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setDisplayMode("slider");
                setIsPlaying(false);
              }}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                displayMode === "slider" ? "bg-amber-400 text-slate-950 font-bold shadow" : "text-slate-300 hover:text-white"
              }`}
            >
              🎛️ Scrub Simulator
            </button>
            <button
              type="button"
              onClick={() => {
                setDisplayMode("live-scroll");
                setIsPlaying(false);
              }}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                displayMode === "live-scroll" ? "bg-amber-400 text-slate-950 font-bold shadow" : "text-slate-300 hover:text-white"
              }`}
            >
              📜 Live Scenic Scroll
            </button>
            <button
              type="button"
              onClick={() => {
                setDisplayMode("side-by-side");
                setIsPlaying(false);
              }}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                displayMode === "side-by-side" ? "bg-amber-400 text-slate-950 font-bold shadow" : "text-slate-300 hover:text-white"
              }`}
            >
              ⚖️ Side-by-Side (Old vs New)
            </button>
          </div>
        </div>

        {/* 4 Creative Directions Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {/* Direction 4 (User Leaning) */}
          <button
            type="button"
            onClick={() => setActiveVariant("minimal-scenic")}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              activeVariant === "minimal-scenic"
                ? "bg-amber-400/15 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)] ring-1 ring-amber-400"
                : "bg-slate-950/60 border-white/10 hover:border-white/20 hover:bg-slate-950"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold uppercase text-amber-400">DIRECTION 4</span>
                <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.2 rounded border border-emerald-500/30">
                  Recommended
                </span>
              </div>
              <div className="font-heading font-black text-sm text-white leading-snug">
                Minimal &amp; Scenic Atmospheric
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                Soft golden-hour coastal gradients, California Botts&apos; dots, safe sign clearance, compact 72vh height.
              </p>
            </div>
            <div className="mt-2 text-[10px] font-mono text-amber-300/80">⚡ 72vh • Fast &amp; Agile</div>
          </button>

          {/* Direction 1 */}
          <button
            type="button"
            onClick={() => setActiveVariant("scenic-highway")}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              activeVariant === "scenic-highway"
                ? "bg-amber-400/15 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)] ring-1 ring-amber-400"
                : "bg-slate-950/60 border-white/10 hover:border-white/20 hover:bg-slate-950"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold uppercase text-amber-400">DIRECTION 1</span>
              </div>
              <div className="font-heading font-black text-sm text-white leading-snug">
                Scenic Highway Overlook
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                Rolling golden hills, California golden poppies, wooden guardrails, glowing headlights, click-to-honk!
              </p>
            </div>
            <div className="mt-2 text-[10px] font-mono text-amber-300/80">🌄 78vh • Rich Scenery</div>
          </button>

          {/* Direction 2 */}
          <button
            type="button"
            onClick={() => setActiveVariant("curved-coastal")}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              activeVariant === "curved-coastal"
                ? "bg-amber-400/15 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)] ring-1 ring-amber-400"
                : "bg-slate-950/60 border-white/10 hover:border-white/20 hover:bg-slate-950"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold uppercase text-amber-400">DIRECTION 2</span>
              </div>
              <div className="font-heading font-black text-sm text-white leading-snug">
                Curved Coastal Horizon
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                Curved PCH highway arc, Pacific Ocean waves, coastal bluffs, car rotates and banks along the bend.
              </p>
            </div>
            <div className="mt-2 text-[10px] font-mono text-cyan-300/80">🌊 82vh • PCH Curve</div>
          </button>

          {/* Direction 3 */}
          <button
            type="button"
            onClick={() => setActiveVariant("dashboard-hud")}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              activeVariant === "dashboard-hud"
                ? "bg-amber-400/15 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)] ring-1 ring-amber-400"
                : "bg-slate-950/60 border-white/10 hover:border-white/20 hover:bg-slate-950"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold uppercase text-amber-400">DIRECTION 3</span>
              </div>
              <div className="font-heading font-black text-sm text-white leading-snug">
                Retro Dashboard &amp; HUD
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                Rolling mechanical odometer, 65 MPH speedometer needle, California surf radio tuner, checkpoint stamp.
              </p>
            </div>
            <div className="mt-2 text-[10px] font-mono text-amber-300/80">📻 76vh • Interactive HUD</div>
          </button>

          {/* Old Original */}
          <button
            type="button"
            onClick={() => setActiveVariant("old-original")}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              activeVariant === "old-original"
                ? "bg-red-500/15 border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.2)] ring-1 ring-red-400"
                : "bg-slate-950/60 border-white/10 hover:border-white/20 hover:bg-slate-950"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold uppercase text-red-400">ORIGINAL</span>
                <span className="text-[9px] bg-red-500/20 text-red-300 px-1.5 py-0.2 rounded font-bold">
                  Current Live
                </span>
              </div>
              <div className="font-heading font-black text-sm text-white leading-snug">
                Old 125vh Mustard Grass
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                Massive solid mustard grass (#9a7439) slab, long scroll hold, sign overlaps top navbar.
              </p>
            </div>
            <div className="mt-2 text-[10px] font-mono text-red-300/80">⚠️ 125vh • Sluggish</div>
          </button>
        </div>

        {/* Secondary Bar: Route Stop Selector + Scrub Simulator Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/10">
          {/* Route Stop Select */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Road Stop:</span>
            <div className="flex bg-slate-950 p-1 rounded-lg border border-white/10 text-xs">
              {ROAD_STOPS.map((s, idx) => (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => setSelectedStopIndex(idx)}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                    selectedStopIndex === idx
                      ? "bg-amber-400 text-slate-950 font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Stop {idx + 1} ({s.routeNumber})
                </button>
              ))}
            </div>
          </div>

          {/* Scrub Simulator Slider Controls (if in slider mode) */}
          {displayMode === "slider" && (
            <div className="flex items-center gap-3 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-white/10 flex-1 max-w-md">
              <button
                type="button"
                onClick={() => setIsPlaying((p) => !p)}
                className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs hover:bg-amber-300 transition-colors cursor-pointer shrink-0"
                title={isPlaying ? "Pause auto-drive" : "Play auto-drive"}
              >
                {isPlaying ? "⏸" : "▶"}
              </button>
              <div className="flex-1 flex flex-col gap-0.5">
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>SCRUB PROGRESS:</span>
                  <span className="text-amber-400 font-bold">{Math.round(sliderProgress * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.005"
                  value={sliderProgress}
                  onChange={(e) => {
                    setSliderProgress(parseFloat(e.target.value));
                    setIsPlaying(false);
                  }}
                  className="w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>
              <button
                type="button"
                onClick={() => setSliderProgress(0.48)}
                className="text-[10px] text-slate-400 hover:text-white font-mono underline cursor-pointer shrink-0"
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main View Area */}
      {displayMode === "slider" ? (
        /* ========================================================================= */
        /* MODE 1: INTERACTIVE SCRUB SIMULATOR                                       */
        /* ========================================================================= */
        <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-slate-950 shadow-2xl">
          {/* Top header indicator */}
          <div className="bg-slate-900/90 border-b border-white/10 px-4 py-2.5 flex items-center justify-between text-xs backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-white uppercase tracking-wider">
                {activeVariant === "minimal-scenic" && "Option 4: Minimal & Scenic Atmospheric"}
                {activeVariant === "scenic-highway" && "Option 1: Scenic California Highway"}
                {activeVariant === "curved-coastal" && "Option 2: Curved Coastal Horizon (PCH)"}
                {activeVariant === "dashboard-hud" && "Option 3: Retro Dashboard & Odometer HUD"}
                {activeVariant === "old-original" && "Old Original 125vh Transition"}
              </span>
              <span className="text-slate-400 font-mono">({stop.name})</span>
            </div>
            <div className="text-[11px] text-amber-300 font-mono">
              💡 Tip: Click the seal convertible to honk! 🚗
            </div>
          </div>

          {/* Render the selected transition component with manual progress */}
          <div className="relative w-full">
            {renderTransitionComponent(activeVariant, sliderProgress)}
          </div>
        </div>
      ) : displayMode === "side-by-side" ? (
        /* ========================================================================= */
        /* MODE 2: SIDE-BY-SIDE COMPARISON (OLD VS SELECTED NEW)                     */
        /* ========================================================================= */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Old Original */}
          <div className="rounded-2xl border border-red-500/30 bg-slate-950/80 overflow-hidden shadow-2xl flex flex-col">
            <div className="bg-red-950/60 border-b border-red-500/30 px-4 py-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="bg-red-600 text-white font-black text-[10px] px-2 py-0.5 rounded uppercase">
                  BEFORE
                </span>
                <span className="font-bold text-red-200">Old Original (Current Site)</span>
              </div>
              <span className="text-[11px] font-mono text-red-300">125vh • Sluggish Mustard Grass</span>
            </div>
            <div className="relative w-full overflow-hidden" style={{ maxHeight: "68vh" }}>
              {renderTransitionComponent("old-original", 0.48)}
            </div>
            <div className="p-3 bg-slate-900 border-t border-white/10 text-xs text-slate-300">
              <span className="font-bold text-red-400">Issues:</span> Heavy mustard dirt covers the full screen;
              sluggish 125vh scroll; exit sign climbs up under sticky navbar.
            </div>
          </div>

          {/* Right: Selected New Direction */}
          <div className="rounded-2xl border border-amber-400/50 bg-slate-950/80 overflow-hidden shadow-2xl flex flex-col ring-1 ring-amber-400/30">
            <div className="bg-amber-950/60 border-b border-amber-400/30 px-4 py-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded uppercase">
                  AFTER (NEW)
                </span>
                <span className="font-bold text-amber-200">
                  {activeVariant === "minimal-scenic" && "Option 4: Minimal Scenic Atmosphere"}
                  {activeVariant === "scenic-highway" && "Option 1: Scenic Highway Overlook"}
                  {activeVariant === "curved-coastal" && "Option 2: Curved Coastal Horizon"}
                  {activeVariant === "dashboard-hud" && "Option 3: Retro Dashboard & HUD"}
                  {activeVariant === "old-original" && "Old Original"}
                </span>
              </div>
              <span className="text-[11px] font-mono text-amber-300">
                {activeVariant === "minimal-scenic" ? "72vh • -42% Scroll Drag" : "Snappy & Scenic"}
              </span>
            </div>
            <div className="relative w-full overflow-hidden" style={{ maxHeight: "68vh" }}>
              {renderTransitionComponent(activeVariant, 0.48)}
            </div>
            <div className="p-3 bg-slate-900 border-t border-white/10 text-xs text-slate-300">
              <span className="font-bold text-amber-400">Enhancements:</span> Warm atmospheric California golden-hour
              gradients; authentic Botts&apos; dots; safe sign clearance; interactive mascot honk.
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* MODE 3: LIVE SCENIC SCROLL WALKTHROUGH                                    */
        /* ========================================================================= */
        <div className="rounded-2xl border border-white/15 bg-slate-950 overflow-hidden shadow-2xl">
          <div className="bg-slate-900 border-b border-white/10 px-4 py-2.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="font-bold text-white">Full Page Scroll Experience Simulator</span>
              <span className="text-slate-400 font-mono">(Scroll down inside this box to test the transition!)</span>
            </div>
            <span className="text-[11px] font-mono text-amber-300">Natural mouse wheel / touch scroll</span>
          </div>

          <div className="relative h-[80vh] overflow-y-auto">
            {/* Scene A (Top Stop) */}
            <div className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
              <Image
                src={stop.sceneA}
                alt="Scene A"
                fill
                className="object-cover object-center"
              />
              <div className="relative z-10 bg-slate-950/80 border border-white/20 rounded-2xl p-6 text-center backdrop-blur-md max-w-md">
                <span className="text-xs font-mono uppercase text-amber-400 font-bold">DEPARTURE SCENE</span>
                <h3 className="font-heading font-black text-2xl text-white mt-1">
                  {stop.name.split("➔")[0]}
                </h3>
                <p className="text-xs text-slate-300 mt-2">
                  Scroll down slowly to watch the road transition smoothly arrive and carry you to the next stop!
                </p>
                <div className="mt-4 text-amber-400 font-bold text-lg animate-bounce">↓</div>
              </div>
            </div>

            {/* The Transition Under Test */}
            <div className="relative w-full">
              {renderTransitionComponent(activeVariant)}
            </div>

            {/* Scene B (Arrival Stop) */}
            <div className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
              <Image
                src={stop.sceneB}
                alt="Scene B"
                fill
                className="object-cover object-center"
              />
              <div className="relative z-10 bg-slate-950/80 border border-white/20 rounded-2xl p-6 text-center backdrop-blur-md max-w-md">
                <span className="text-xs font-mono uppercase text-emerald-400 font-bold">ARRIVAL SCENE</span>
                <h3 className="font-heading font-black text-2xl text-white mt-1">
                  {stop.name.split("➔")[1]}
                </h3>
                <p className="text-xs text-slate-300 mt-2">
                  Welcome to {stop.nextStop}! The transition gracefully reveals this scenic destination without abrupt jarring cuts.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comparative Specs Card */}
      <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="space-y-1">
          <div className="font-mono text-slate-400 text-[10px] uppercase">1. SCROLL PACING</div>
          <div className="font-bold text-white text-sm">72vh (New) vs 125vh (Old)</div>
          <p className="text-slate-400 text-[11px]">
            Reduces scrolling drag by 42%, making navigation between hackathon stops feel swift, rewarding, and fun.
          </p>
        </div>
        <div className="space-y-1">
          <div className="font-mono text-slate-400 text-[10px] uppercase">2. SCENIC ATMOSPHERE</div>
          <div className="font-bold text-white text-sm">Golden Hour Atmospheric Mist</div>
          <p className="text-slate-400 text-[11px]">
            Replaced cardboard mustard dirt with natural California twilight gradients that seamlessly merge with scenic photos.
          </p>
        </div>
        <div className="space-y-1">
          <div className="font-mono text-slate-400 text-[10px] uppercase">3. ROAD DETAILS</div>
          <div className="font-bold text-white text-sm">Botts&apos; Dots &amp; Realistic Grain</div>
          <p className="text-slate-400 text-[11px]">
            Authentic Californian raised reflective road markers along the double yellow lines, fine noise asphalt texture.
          </p>
        </div>
        <div className="space-y-1">
          <div className="font-mono text-slate-400 text-[10px] uppercase">4. INTERACTIVITY</div>
          <div className="font-bold text-white text-sm">Click-to-Honk &amp; HUD</div>
          <p className="text-slate-400 text-[11px]">
            Click the seal convertible to honk &quot;Beep beep!&quot;, glowing headlight beams, or optional real-time odometer HUD.
          </p>
        </div>
      </div>
    </div>
  );
}
