"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

// Top-level Image Asset paths
const DAY_BG = "/assets/roadtrip/zone1-hero/hero-background.jpeg";
const NIGHT_BG = "/assets/roadtrip/zone1-hero/hero-background-night.jpeg";
const HACKCC_SIGN = "/assets/roadtrip/zone1-hero/HackCC-sign.png";
const DATE_SIGN = "/assets/roadtrip/zone1-hero/date-sign.png";

export default function Zone1Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasTurnedNight, setHasTurnedNight] = useState(false);

  // Track scroll position across the hero section for pinned sticky scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Latch night state once user scrolls past sunset threshold (>= 0.38)
  // Once users scroll down to become night-time, it stays night for the rest of the session
  // unless they reload or reopen the page.
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.38 && !hasTurnedNight) {
      setHasTurnedNight(true);
    }
  });

  // Dynamic transforms for daytime -> golden hour sunset -> city skyline disappearance -> night
  // Daytime sky stays prominent while the sun descends
  const dayOpacityTransform = useTransform(scrollYProgress, [0.18, 0.38], [1, 0]);
  const nightOpacityTransform = useTransform(scrollYProgress, [0.22, 0.40], [0, 1]);

  // Sunset golden-hour horizon glow that blooms behind the skyline as the sun approaches it
  const sunsetGlowTransform = useTransform(scrollYProgress, [0.10, 0.24, 0.38], [0, 0.85, 0]);

  // Sun motion trajectory:
  // Starts high left-of-center and arcs down towards DTLA skyline near center-right
  const sunX = useTransform(scrollYProgress, [0.0, 0.16, 0.36], ["0vw", "7vw", "16vw"]);
  const sunY = useTransform(scrollYProgress, [0.0, 0.16, 0.36], ["0vh", "12vh", "32vh"]);
  const sunScale = useTransform(scrollYProgress, [0.0, 0.18, 0.36], [1.0, 0.7, 0.35]);

  // Sun smoothly dissolves as it sinks into the skyline silhouette
  const sunOpacityTransform = useTransform(scrollYProgress, [0.0, 0.22, 0.36], [1, 1, 0]);

  // Derived style opacities respecting latched night state (stays night once turned)
  const dayOpacity = hasTurnedNight ? 0 : dayOpacityTransform;
  const nightOpacity = hasTurnedNight ? 1 : nightOpacityTransform;
  const sunOpacity = hasTurnedNight ? 0 : sunOpacityTransform;
  const sunsetGlowOpacity = hasTurnedNight ? 0 : sunsetGlowTransform;

  return (
    <section ref={sectionRef} id="zone-hero" className="relative h-[200vh] w-full bg-slate-950">
      {/* Sticky Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background Image Layer 1: Daytime Hills */}
        <motion.div className="absolute inset-0 z-0" style={{ opacity: dayOpacity }}>
          <Image
            src={DAY_BG}
            alt="Daytime Hollywood Hills Background"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Subtle bottom edge transition only (preserves bright natural sky) */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/50" />
        </motion.div>

        {/* Background Image Layer 2: Nighttime Hills (contains moon) */}
        <motion.div className="absolute inset-0 z-0" style={{ opacity: nightOpacity }}>
          <Image
            src={NIGHT_BG}
            alt="Nighttime Hollywood Hills Background"
            fill
            className="object-cover object-center"
          />
          {/* Natural night atmosphere gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/70" />
        </motion.div>

        {/* Golden Hour Sunset Horizon Atmospheric Glow */}
        <motion.div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{ opacity: sunsetGlowOpacity }}
        >
          <div className="absolute top-[20vh] sm:top-[22vh] left-1/2 -translate-x-1/2 w-[90vw] max-w-5xl h-[26vh] bg-gradient-to-t from-amber-500/40 via-orange-400/25 to-transparent blur-3xl rounded-full" />
        </motion.div>

        {/* Setting Sun (Arcs naturally towards city skyline and dissolves behind rooftops) */}
        <div
          className="absolute inset-0 z-[5] pointer-events-none overflow-hidden"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 25vh, rgba(0,0,0,0.6) 30vh, transparent 35vh)",
            maskImage: "linear-gradient(to bottom, black 0%, black 25vh, rgba(0,0,0,0.6) 30vh, transparent 35vh)",
          }}
        >
          <motion.div
            className="absolute top-16 left-1/3 flex items-center justify-center"
            style={{
              x: sunX,
              y: sunY,
              opacity: sunOpacity,
              scale: sunScale,
            }}
          >
            {/* Radiant Sunset Outer Glow Layers */}
            <div className="absolute w-44 h-44 rounded-full bg-amber-400/35 blur-2xl" />
            <div className="absolute w-32 h-32 rounded-full bg-orange-500/40 blur-xl" />
            {/* Core Vibrant SoCal Sun */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-amber-500 via-[#FBFA74] to-yellow-100 shadow-[0_0_55px_rgba(251,250,116,0.9)] border-2 border-amber-200/80" />
          </motion.div>
        </div>

        {/* HackCC Sign & Date Sign Image Layer - Centered consistently on hill across all screen sizes */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none px-4 sm:px-8">
          <div className="w-full max-w-2xl sm:max-w-4xl md:max-w-4xl [transform:rotate(-1.4deg)_skewY(-0.8deg)] drop-shadow-[0_16px_32px_rgba(0,0,0,0.7)] flex flex-col items-center">
            {/* Main HackCC 2026 Sign */}
            <div className="w-full">
              <Image
                src={HACKCC_SIGN}
                alt="HackCC Hollywood Sign"
                width={2560}
                height={1440}
                className="w-full h-auto object-contain mx-auto"
                priority
              />
            </div>

            {/* Date Sign (November 14-15) directly underneath */}
            <div className="w-3/4 sm:w-[70%] -mt-[31%] sm:-mt-[31%]">
              <Image
                src={DATE_SIGN}
                alt="HackCC Event Dates: November 14-15"
                width={2560}
                height={1440}
                className="w-full h-auto object-contain mx-auto"
                priority
              />
            </div>
          </div>
        </div>

        {/* Bottom Gradient Edge Transition: Blends smoothly into dark slate */}
        <div className="absolute inset-x-0 bottom-0 h-48 sm:h-72 bg-gradient-to-t from-slate-950 via-slate-950/80 via-30% to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
