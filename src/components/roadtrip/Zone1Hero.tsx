"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { EVENT } from "@/lib/event";

// Screen-print plate of the Hollywood Hills at golden hour. A pixel-aligned night plate
// (hero-night.jpg) is coming; until then dusk is a colour wash over this one.
const DAY_BG = "/assets/roadtrip/zone1-hero/hero-day.jpg";

// Deterministic star field in viewport units so it renders identically on server and client.
const STARS: [number, number, number][] = [
  [6, 8, 2], [14, 22, 1.5], [23, 6, 2], [31, 17, 1.5], [40, 10, 2.5], [48, 24, 1.5], [56, 5, 2],
  [63, 15, 1.5], [71, 9, 2], [79, 20, 1.5], [87, 7, 2.5], [94, 18, 1.5], [18, 32, 1.5], [52, 34, 1.5],
  [84, 31, 1.5], [36, 29, 1.5], [68, 28, 1.5], [10, 40, 1.5], [90, 41, 1.5],
];

interface Zone1HeroProps {
  applyOpen: boolean;
}

export default function Zone1Hero({ applyOpen }: Zone1HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasTurnedNight, setHasTurnedNight] = useState(false);
  const reduceMotion = useReducedMotion();

  // The hero is pinned for two screens while the sun sets and the city lights come on.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", latest => {
    if (latest >= 0.35 && !hasTurnedNight) setHasTurnedNight(true);
    else if (latest <= 0.02 && hasTurnedNight) setHasTurnedNight(false);
  });

  // The painted sun fades out while the sky deepens: dusk wash first, then night, then stars.
  // Washes are kept light so the plate's shapes stay legible; a real night plate replaces this later.
  const paintedSunFade = useTransform(scrollYProgress, [0.04, 0.22], [0, 1]);
  const duskOpacityTransform = useTransform(scrollYProgress, [0.06, 0.3], [0, 0.42]);
  const nightOpacityTransform = useTransform(scrollYProgress, [0.24, 0.44], [0, 0.55]);
  const starsOpacityTransform = useTransform(scrollYProgress, [0.3, 0.46], [0, 1]);
  const copyY = useTransform(scrollYProgress, [0, 0.5], ["0vh", "-4vh"]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  const duskOpacity = hasTurnedNight ? 0.42 : duskOpacityTransform;
  const nightOpacity = hasTurnedNight ? 0.55 : nightOpacityTransform;
  const starsOpacity = hasTurnedNight ? 1 : starsOpacityTransform;
  const sunCoverOpacity = hasTurnedNight ? 1 : paintedSunFade;

  // Entrance: hook, title, facts, actions arrive one after another. Once, on load.
  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
  };
  const rise = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section ref={sectionRef} id="zone-hero" className={`relative w-full bg-night ${reduceMotion ? "h-screen" : "h-[200vh]"}`}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* The plate */}
        <Image
          src={DAY_BG}
          alt="The Hollywood Hills at golden hour: dry grass, the Griffith Observatory, and downtown Los Angeles in the haze"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_60%]"
        />

        {/* The painted sun dips out of sight: a sky-coloured patch fades in over it (same amber as the plate). */}
        {!reduceMotion && (
          <motion.div
            aria-hidden
            className="absolute rounded-full bg-[radial-gradient(circle,#F3A93A_0%,#F3A93A_50%,rgba(243,169,58,0)_70%)] left-[29.6%] top-[35.5%] w-[6.5vw] h-[6.5vw] min-w-16 min-h-16 max-w-28 max-h-28 -translate-x-1/2 -translate-y-1/2"
            style={{ opacity: sunCoverOpacity }}
          />
        )}

        {/* Dusk: an amber-to-indigo wash that deepens as the sun drops */}
        {!reduceMotion && (
          <motion.div
            aria-hidden
            className="absolute inset-0 mix-blend-multiply bg-[linear-gradient(180deg,#3D3F8F_0%,#6B4F8A_40%,#C98A3A_75%,#D9A24A_100%)]"
            style={{ opacity: duskOpacity }}
          />
        )}

        {/* Night: the sky goes navy; the hills fall into silhouette */}
        {!reduceMotion && (
          <motion.div
            aria-hidden
            className="absolute inset-0 mix-blend-multiply bg-[linear-gradient(180deg,#1A2350_0%,#2A3566_45%,#4A4A5A_100%)]"
            style={{ opacity: nightOpacity }}
          />
        )}

        {/* Stars, upper half only */}
        {!reduceMotion && (
          <motion.div aria-hidden className="absolute inset-0 pointer-events-none" style={{ opacity: starsOpacity }}>
            {STARS.map(([x, y, r], i) => (
              <span
                key={i}
                className="absolute rounded-full bg-white"
                style={{ left: `${x}vw`, top: `${y}vh`, width: r, height: r, opacity: 0.6 + (i % 3) * 0.15 }}
              />
            ))}
          </motion.div>
        )}

        {/* Ground gradient so the copy reads over the grass; the sky stays untouched */}
        <div className="absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-night via-night/75 via-40% to-transparent" />

        {/* Copy */}
        <motion.div
          className="absolute inset-0 flex items-end sm:items-center"
          style={{ y: reduceMotion ? 0 : copyY }}
        >
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 sm:pb-0 sm:pt-16">
            <motion.div className="max-w-3xl" variants={stagger} initial="hidden" animate="show">
              <motion.p
                variants={rise}
                className="font-serif italic text-action text-xl sm:text-2xl md:text-3xl mb-3 [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_2px_16px_rgba(0,0,0,0.6)]"
              >
                {EVENT.tagline}
              </motion.p>
              <motion.h1
                variants={rise}
                className="font-heading text-white text-[17vw] sm:text-8xl lg:text-9xl leading-[0.95] tracking-tight [text-shadow:0_4px_28px_rgba(0,0,0,0.45)]"
              >
                HackCC {EVENT.year}
              </motion.h1>

              <motion.dl
                variants={rise}
                className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-4 text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]"
              >
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-mist/80">When</dt>
                  <dd className="font-heading text-2xl sm:text-3xl mt-0.5">{EVENT.dateLabel}</dd>
                  <dd className="text-sm text-mist/80">Exact date coming soon</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-mist/80">Where</dt>
                  <dd className="font-heading text-2xl sm:text-3xl mt-0.5">{EVENT.venue.name}</dd>
                  <dd className="text-sm text-mist/80">{EVENT.venue.city}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-mist/80">Who</dt>
                  <dd className="font-heading text-2xl sm:text-3xl mt-0.5">Free, 18+</dd>
                  <dd className="text-sm text-mist/80">California community college students</dd>
                </div>
              </motion.dl>

              <motion.div variants={rise} className="mt-8 sm:mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                {applyOpen ? (
                  <Link
                    href="/apply"
                    className="inline-flex items-center gap-2.5 rounded-full bg-action hover:bg-action-hover text-night font-bold text-base sm:text-lg px-7 sm:px-8 py-3.5 sm:py-4 shadow-lg shadow-black/30 transition-all hover:scale-105 active:scale-95"
                  >
                    <span>Apply to HackCC {EVENT.year}</span>
                    <span aria-hidden className="text-xl leading-none">→</span>
                  </Link>
                ) : (
                  <p className="text-base sm:text-lg font-bold text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
                    Applications open soon.
                  </p>
                )}
                <a
                  href={EVENT.social.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-bold text-white hover:text-action underline underline-offset-8 decoration-white/40 hover:decoration-action transition-colors [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]"
                >
                  Join the Discord to hear first
                </a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        {!reduceMotion && (
          <motion.p
            aria-hidden
            className="absolute bottom-6 inset-x-0 text-center text-xs font-bold uppercase tracking-[0.2em] text-mist/70"
            style={{ opacity: cueOpacity }}
          >
            Scroll to head south ↓
          </motion.p>
        )}
      </div>
    </section>
  );
}
