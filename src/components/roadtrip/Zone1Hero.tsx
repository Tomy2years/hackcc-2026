"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { EVENT } from "@/lib/event";
import type { ApplicationStatus } from "@/lib/applicationStatus";
import { Button } from "@/components/ui/Button";
import { HighwaySign } from "./HighwaySign";
import { SCENE_QUALITY, SCENE_SIZES } from "./Scene";

// Screen-print plate of the Hollywood Hills at golden hour. A pixel-aligned night plate
// (hero-night.jpg) is still to come; until then dusk is a colour wash over this one.
// The painted sun was patched out of this copy: it sat behind the "HackCC" wordmark
const DAY_BG = "/assets/roadtrip/zone1-hero/hero-day-nosun.jpg";

// Deterministic star field (percent of the scene) so server and client render the same thing.
const STARS: [number, number, number][] = [
  [6, 8, 2], [14, 22, 1.5], [23, 6, 2], [31, 17, 1.5], [40, 10, 2.5], [48, 24, 1.5], [56, 5, 2],
  [63, 15, 1.5], [71, 9, 2], [79, 20, 1.5], [87, 7, 2.5], [94, 18, 1.5], [18, 32, 1.5], [52, 34, 1.5],
  [84, 31, 1.5], [36, 29, 1.5], [68, 28, 1.5], [10, 40, 1.5], [90, 41, 1.5],
];

export default function Zone1Hero({ status }: { status: ApplicationStatus }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // No pinning: the sun sets while the hero itself scrolls out of view.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const dusk = useTransform(scrollYProgress, [0.05, 0.45], [0, 0.42]);
  const night = useTransform(scrollYProgress, [0.3, 0.7], [0, 0.6]);
  const stars = useTransform(scrollYProgress, [0.4, 0.75], [0, 1]);

  return (
    <section ref={sectionRef} id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] overflow-hidden bg-night">
      <Image
        src={DAY_BG}
        alt="Illustration of the Hollywood Hills at golden hour: dry grass, the Griffith Observatory and downtown Los Angeles in the haze"
        fill
        priority
        quality={SCENE_QUALITY}
        sizes={SCENE_SIZES}
        className="-z-20 object-cover object-[72%_60%] md:object-[50%_60%]"
      />

      {!reduceMotion && (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <motion.div className="absolute inset-0 mix-blend-multiply bg-[linear-gradient(180deg,#3D3F8F_0%,#6B4F8A_40%,#C98A3A_75%,#D9A24A_100%)]" style={{ opacity: dusk }} />
          <motion.div className="absolute inset-0 mix-blend-multiply bg-[linear-gradient(180deg,#1A2350_0%,#2A3566_45%,#4A4A5A_100%)]" style={{ opacity: night }} />
          <motion.div className="absolute inset-0" style={{ opacity: stars }}>
            {STARS.map(([x, y, r], i) => (
              <span
                key={i}
                className="absolute rounded-full bg-white"
                style={{ left: `${x}%`, top: `${y}%`, width: r, height: r, opacity: 0.6 + (i % 3) * 0.15 }}
              />
            ))}
          </motion.div>
        </div>
      )}

      {/* Local backing: darker behind the copy on the left and along the hills, the sky and observatory stay bright */}
      <div aria-hidden className="backing-to-edge pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(15_17_20/0.82)_0%,rgb(15_17_20/0.55)_38%,rgb(15_17_20/0)_62%)] max-md:bg-[linear-gradient(0deg,rgb(15_17_20/0.95)_0%,rgb(15_17_20/0.7)_45%,rgb(15_17_20/0.15)_75%,rgb(15_17_20/0)_100%)]" />

      <div className="mx-auto flex w-full max-w-page items-end px-5 pb-24 pt-28 md:items-center md:px-8 md:pb-40">
        <div className="max-w-[40rem]">
          <p className="rise-in font-serif text-xl italic text-action md:text-2xl" style={{ "--i": 0 } as React.CSSProperties}>
            {EVENT.tagline}
          </p>
          <h1
            id="hero-title"
            className="rise-in mt-2 font-heading text-[clamp(3.5rem,11vw,7rem)] leading-[0.95] text-cream"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            HackCC <span className="text-action">2026</span>
          </h1>

          <p className="rise-in mt-5 max-w-[34rem] text-lg leading-relaxed text-cream md:text-xl" style={{ "--i": 2 } as React.CSSProperties}>
            A free, one-day hackathon for California community college students. Find a team, build something, and demo
            it by the end of the day.
          </p>

          <dl
            className="rise-in mt-7 grid grid-cols-1 gap-x-8 gap-y-4 border-y border-line py-5 sm:grid-cols-[auto_auto_auto]"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <div>
              <dt className="text-[13px] font-bold uppercase tracking-[0.14em] text-mist">When</dt>
              <dd className="mt-1 text-lg font-bold text-cream">{EVENT.dateLabel}</dd>
              <dd className="text-sm text-mist">{EVENT.dateStatus}</dd>
            </div>
            <div>
              <dt className="text-[13px] font-bold uppercase tracking-[0.14em] text-mist">Where</dt>
              <dd className="mt-1 text-lg font-bold text-cream sm:whitespace-nowrap">{EVENT.venue.name}</dd>
              <dd className="text-sm text-mist">{EVENT.venue.city}</dd>
            </div>
            <div>
              <dt className="text-[13px] font-bold uppercase tracking-[0.14em] text-mist">Who</dt>
              <dd className="mt-1 text-lg font-bold text-cream">Free · 18+</dd>
              <dd className="text-sm text-mist">CA community college students</dd>
            </div>
          </dl>

          <div className="rise-in mt-7 flex flex-wrap items-center gap-x-5 gap-y-3" style={{ "--i": 4 } as React.CSSProperties}>
            {status.canApply && status.href ? (
              <Button href={status.href} size="lg" arrow>
                {status.actionLabel}
              </Button>
            ) : (
              <p className="text-base font-bold text-cream">{status.actionLabel}.</p>
            )}
            <Button href={EVENT.social.discord} variant="tertiary">
              Join the Discord
            </Button>
          </div>

          <p className="rise-in mt-8 flex flex-wrap items-center gap-3 text-sm text-mist" style={{ "--i": 5 } as React.CSSProperties}>
            <HighwaySign>One venue · Costa Mesa</HighwaySign>
            <span>The event is one day at {EVENT.venue.name}. Scroll on for the drive down the coast.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
