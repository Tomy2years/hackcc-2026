"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Top-level Image Asset paths
const DAY_BG = "/assets/roadtrip/zone1-hero/hero-background.jpeg";
const NIGHT_BG = "/assets/roadtrip/zone1-hero/hero-background-night.jpeg";
const HACKCC_SIGN = "/assets/roadtrip/zone1-hero/HackCC-sign.png";

// Fraction of the pinned scroll track where the sunset finishes (screen fully dark).
const NIGHT_AT = 0.88;

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

// 3-point keyframe interpolation (mirrors a simple ease: start -> mid -> end).
function keyframes(t: number, stops: [number, number, number], mid: number) {
  return t <= mid
    ? lerp(stops[0], stops[1], t / mid)
    : lerp(stops[1], stops[2], (t - mid) / (1 - mid));
}

export default function Zone1Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  // Track scroll position directly off the section's own bounding rect, driven by
  // native scroll events (rAF-throttled) instead of framer-motion's scroll-linked
  // measurement, which could get out of sync with the actual scroll position when
  // a sticky child is involved.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const pinnedDistance = rect.height - window.innerHeight;
      const scrolled = pinnedDistance > 0 ? -rect.top / pinnedDistance : 0;
      setProgress(Math.min(Math.max(scrolled, 0), 1));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // As the scene reaches full night, hold steady there — darkness never reverses
  // just from continuing to scroll further down.
  const t = Math.min(progress / NIGHT_AT, 1);

  const dayOpacity = 1 - t;
  const nightOpacity = t;

  const sunX = keyframes(t, [0, 90, 200], 0.45);
  const sunY = keyframes(t, [0, 25, 165], 0.45);
  const sunScale = keyframes(t, [1.0, 0.65, 0.25], 0.45);
  const sunOpacity = keyframes(t, [1.0, 0.75, 0], 0.55);

  return (
    <section ref={sectionRef} id="zone-hero" className="relative h-[150vh] w-full bg-slate-950">
      {/* Sticky Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-start overflow-hidden pt-24">
        {/* Background Image Layer 1: Daytime Hills */}
        <div className="absolute inset-0 z-0" style={{ opacity: dayOpacity }}>
          <Image
            src={DAY_BG}
            alt="Daytime Hollywood Hills Background"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Soft day lighting gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-slate-950/60" />
        </div>

        {/* Background Image Layer 2: Nighttime Hills (contains moon) */}
        <div className="absolute inset-0 z-0" style={{ opacity: nightOpacity }}>
          <Image
            src={NIGHT_BG}
            alt="Nighttime Hollywood Hills Background"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Night atmosphere gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/40 via-transparent to-slate-950/80" />
        </div>

        {/* Setting Sun (Arcs to the right & sets into city skyline horizon) */}
        <div
          className="absolute top-16 left-1/3 z-[5] pointer-events-none flex items-center justify-center"
          style={{
            transform: `translate(${sunX}px, ${sunY}px) scale(${sunScale})`,
            opacity: sunOpacity,
          }}
        >
          {/* Radiant Sunset Outer Glow Layers */}
          <div className="absolute w-44 h-44 rounded-full bg-amber-400/30 blur-2xl animate-pulse" />
          <div className="absolute w-32 h-32 rounded-full bg-orange-500/40 blur-xl" />
          {/* Core Vibrant SoCal Sun */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-amber-500 via-[#FBFA74] to-yellow-100 shadow-[0_0_60px_rgba(251,250,116,0.9)] border-2 border-amber-200/80" />
        </div>

        {/* Spacer above the sign: a fixed viewport-height fraction (not flex-grow) so the
            sign+dates group sits at the same relative position on every window shape,
            instead of shifting around based on how much leftover space happens to remain. */}
        <div className="relative z-10 h-[6vh] sm:h-[8vh]" />

        {/* HackCC Sign Image Layer — this is the front-page focal point, sized as big as
            possible on any viewport taller than ~600px (virtually every real desktop,
            laptop, and portrait-phone browser window). Viewports shorter than that —
            mainly landscape phones, or a browser squeezed very short — fall back to a
            deliberately smaller, safe fixed size via the media query below, since that's
            the one case with little vertical room to spare regardless of how it scales. */}
        <div className="relative z-20 w-full mb-1 sm:mb-2 pointer-events-none flex justify-center px-4 sm:px-8">
          <div className="relative w-full max-w-3xl sm:max-w-5xl md:max-w-6xl lg:max-w-7xl xl:max-w-[85rem] aspect-[2560/460] max-h-[clamp(140px,54vh,500px)] [@media(max-height:600px)]:max-h-[32vh] [transform:rotate(-1.4deg)_skewY(-0.8deg)] drop-shadow-[0_16px_32px_rgba(0,0,0,0.7)]">
            <Image
              src={HACKCC_SIGN}
              alt="HackCC Hollywood Sign"
              fill
              className="object-cover object-[center_45%]"
              priority
            />
          </div>
        </div>

        {/* Event Dates: same sign font, smaller, sitting right underneath the sign.
            A normal block (not a growing flex spacer) so it always renders at full
            height instead of being squeezed and clipped by leftover flex space.
            z-20 (above the bottom gradient overlay) and a dark plaque behind the
            text keep it legible regardless of how dark the hillside is underneath. */}
        <div className="relative z-20 w-full text-center px-4 pointer-events-none">
          <div className="inline-block rounded-2xl bg-slate-950/45 px-5 py-3 sm:px-8 sm:py-4 [transform:rotate(-1deg)]">
            <p className="cartoony-title text-2xl sm:text-4xl md:text-5xl [@media(max-height:600px)]:text-lg">
              November 14–15
            </p>
            <p className="cartoony-title text-xl sm:text-3xl md:text-4xl mt-1 [@media(max-height:600px)]:text-base">
              Orange Coast College
            </p>
          </div>
        </div>

        {/* Bottom Gradient Edge Transition: Blends smoothly into dark slate */}
        <div className="absolute inset-x-0 bottom-0 h-48 sm:h-72 bg-gradient-to-t from-slate-950 via-slate-950/80 via-30% to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
