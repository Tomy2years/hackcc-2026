"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroBlimp from "@/components/roadtrip/HeroBlimp";

// Top-level Image Asset paths
const DAY_BG = "/assets/roadtrip/zone1-hero/hero-background.jpeg";
const DAY_BG_MOBILE = "/assets/roadtrip/zone1-hero/hero-background-mobile.jpeg";
const NIGHT_BG = "/assets/roadtrip/zone1-hero/hero-background-night.jpeg";
const NIGHT_BG_MOBILE = "/assets/roadtrip/zone1-hero/hero-background-night-mobile.jpeg";
const HACKCC_SIGN = "/assets/roadtrip/zone1-hero/HackCC-sign.png";
const DATE_SIGN = "/assets/roadtrip/zone1-hero/date-sign.png";

export default function Zone1Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Track scroll position across the pinned hero section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Dynamic transforms: Night -> Sunrise -> Daytime completes fully before scrolling down to next scene
  // All transforms are fully bounded [0 ... 1] to guarantee WAAPI keyframes never bounce back
  // 1. Night dissolves as dawn begins, fully gone by 0.35, stays 0 through 1.0
  const nightOpacity = useTransform(scrollYProgress, [0, 0.05, 0.35, 1.0], [1, 1, 0, 0]);
  // 2. Daytime sky fades in, reaches full daylight by 0.40, stays 1 through 1.0
  const dayOpacity = useTransform(scrollYProgress, [0, 0.10, 0.40, 1.0], [0, 0, 1, 1]);
  // 3. Golden hour sunrise horizon glow blooms and clears into daylight
  const sunriseGlowOpacity = useTransform(scrollYProgress, [0, 0.08, 0.30, 0.55, 1.0], [0, 0, 0.95, 0, 0]);

  // 4. Sun rises from behind city skyline into high morning sky (completes fully by 0.65, stays through 1.0)
  const sunX = useTransform(scrollYProgress, [0, 0.30, 0.65, 1.0], ["14vw", "14vw", "0vw", "0vw"]);
  const sunY = useTransform(scrollYProgress, [0, 0.30, 0.65, 1.0], ["24vh", "24vh", "0vh", "0vh"]);
  const sunScale = useTransform(scrollYProgress, [0, 0.30, 0.65, 1.0], [0.55, 0.55, 1.0, 1.0]);
  // Sun appears only once night is gone and morning sky is ready, stays 1 through 1.0
  const sunOpacity = useTransform(scrollYProgress, [0, 0.30, 0.45, 1.0], [0, 0, 1, 1]);

  // 5. Blimp cruises across the high California sky with subtle parallax drift as you scroll
  const blimpX = useTransform(scrollYProgress, [0, 1.0], ["0vw", "4vw"]);
  const blimpY = useTransform(scrollYProgress, [0, 1.0], ["0vh", "3vh"]);

  return (
    <section ref={sectionRef} className="relative h-[200vh] w-full bg-slate-950">
      {/* Sticky Pinned Viewport Container: stays pinned while sun rises all the way up */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Image Layer 1: Nighttime Hills (Initial night state at top of page) */}
        <motion.div className="absolute inset-0 z-0 pointer-events-none select-none" style={{ opacity: nightOpacity }}>
          {/* Desktop 16:9 Widescreen */}
          <Image
            src={NIGHT_BG}
            alt="Nighttime Hollywood Hills Background"
            fill
            className="hidden sm:block object-cover object-center pointer-events-none select-none"
            priority
            draggable={false}
          />
          {/* Mobile 9:16 Portrait */}
          <Image
            src={NIGHT_BG_MOBILE}
            alt="Nighttime Hollywood Hills Background Mobile"
            fill
            className="block sm:hidden object-cover object-top pointer-events-none select-none"
            priority
            draggable={false}
          />
          {/* Natural night atmosphere gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/70 pointer-events-none" />
        </motion.div>

        {/* Background Image Layer 2: Daytime Hills (Sunlit morning sky) */}
        <motion.div className="absolute inset-0 z-0 pointer-events-none select-none" style={{ opacity: dayOpacity }}>
          {/* Desktop 16:9 Widescreen */}
          <Image
            src={DAY_BG}
            alt="Daytime Hollywood Hills Background"
            fill
            className="hidden sm:block object-cover object-center pointer-events-none select-none"
            priority
            draggable={false}
          />
          {/* Mobile 9:16 Portrait */}
          <Image
            src={DAY_BG_MOBILE}
            alt="Daytime Hollywood Hills Background Mobile"
            fill
            className="block sm:hidden object-cover object-top pointer-events-none select-none"
            priority
            draggable={false}
          />
          {/* Subtle transition preserving bright natural daytime sky */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/30 pointer-events-none" />
        </motion.div>

        {/* Golden Hour Sunrise Horizon Atmospheric Glow */}
        <motion.div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{ opacity: sunriseGlowOpacity }}
        >
          <div className="absolute top-[20vh] sm:top-[22vh] left-1/2 -translate-x-1/2 w-[90vw] max-w-5xl h-[26vh] bg-gradient-to-t from-amber-500/40 via-orange-400/25 to-transparent blur-3xl rounded-full" />
        </motion.div>

        {/* Rising Sun (Ascends from behind city skyline rooftops up into the clear sky) */}
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
            {/* Radiant Sunrise Outer Glow Layers */}
            <div className="absolute w-44 h-44 rounded-full bg-amber-400/35 blur-2xl" />
            <div className="absolute w-32 h-32 rounded-full bg-orange-500/40 blur-xl" />
            {/* Core Vibrant SoCal Sun */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-amber-500 via-[#FBFA74] to-yellow-100 shadow-[0_0_55px_rgba(251,250,116,0.9)] border-2 border-amber-200/80" />
          </motion.div>
        </div>

        {/* Floating Blimp in the California Sky: Announcing Orange Coast College */}
        <motion.div
          className="absolute z-[6] top-16 sm:top-8 md:top-9 lg:top-11 right-2 sm:right-5 md:right-8 lg:right-[6vw] xl:right-[7vw] w-[275px] xs:w-[315px] sm:w-[375px] md:w-[440px] lg:w-[510px] xl:w-[550px] 2xl:w-[590px] pointer-events-none select-none"
          style={{
            x: blimpX,
            y: blimpY,
          }}
        >
          <HeroBlimp />
        </motion.div>

        {/* HackCC Sign & Date Sign Image Layer - Centered consistently on hill across all screen sizes */}
        <div className="relative z-10 w-full max-w-2xl sm:max-w-4xl md:max-w-4xl [transform:rotate(-1.4deg)_skewY(-0.8deg)] drop-shadow-[0_16px_32px_rgba(0,0,0,0.7)] flex flex-col items-center px-4 sm:px-8 pt-24 pb-16 pointer-events-none">
          {/* Main HackCC 2026 Sign */}
          <div className="w-full">
            <Image
              src={HACKCC_SIGN}
              alt="HackCC Hollywood Sign"
              width={2560}
              height={1440}
              className="w-full h-auto object-contain mx-auto pointer-events-none select-none"
              priority
              draggable={false}
            />
          </div>

          {/* Date Sign (November 14-15) directly underneath */}
          <div className="w-3/4 sm:w-[70%] -mt-[31%] sm:-mt-[31%]">
            <Image
              src={DATE_SIGN}
              alt="HackCC Event Dates: November 14-15"
              width={2560}
              height={1440}
              className="w-full h-auto object-contain mx-auto pointer-events-none select-none"
              priority
              draggable={false}
            />
          </div>
        </div>

      </div>
    </section>
  );
}

