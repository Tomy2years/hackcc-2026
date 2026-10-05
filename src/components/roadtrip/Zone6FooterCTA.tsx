"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";

const SAN_DIEGO_BEACH_BG = "/assets/roadtrip/zone6-cta-footer/San-Diego-Beach.jpg";

// Firework spark palette: golden hour amber, white, Pacific cyan, sunset orange
const FIREWORK_COLORS = ["#FBBF24", "#FFFFFF", "#38BDF8", "#F97316"];
const SPARKS_PER_BURST = 18;
const BURST_DURATION = 0.85;

const HOOK_TEXT = "The searching ends, the building begins";
const TYPING_INTERVAL_MS = 55;
const ERASING_INTERVAL_MS = 25;
const HOLD_TYPED_MS = 2200;
const HOLD_EMPTY_MS = 500;

interface Spark {
  id: number;
  dx: number;
  dy: number;
  size: number;
  color: string;
}

interface Burst {
  id: number;
  sparks: Spark[];
}

interface FireworkButtonProps {
  children: React.ReactNode;
  className: string;
}

// Dummy button (no route yet) that shoots a firework burst out from behind itself on hover
function FireworkButton({ children, className }: FireworkButtonProps) {
  const [bursts, setBursts] = useState<Burst[]>([]);
  const nextBurstId = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  const launchBurst = (button: HTMLButtonElement) => {
    if (prefersReducedMotion) return;

    // Sparks travel past the pill's edge in every direction, so reach scales with the button size
    const { width, height } = button.getBoundingClientRect();
    const sparks: Spark[] = Array.from({ length: SPARKS_PER_BURST }, (_, index) => {
      const angle = (index / SPARKS_PER_BURST) * Math.PI * 2 + Math.random() * 0.35;
      const reach = 28 + Math.random() * 62;
      return {
        id: index,
        dx: Math.cos(angle) * (width / 2 + reach),
        dy: Math.sin(angle) * (height / 2 + reach),
        size: 5 + Math.random() * 5,
        color: FIREWORK_COLORS[index % FIREWORK_COLORS.length],
      };
    });

    const id = nextBurstId.current++;
    setBursts((current) => [...current, { id, sparks }]);
  };

  const clearBurst = (id: number) => {
    setBursts((current) => current.filter((burst) => burst.id !== id));
  };

  return (
    <span className="relative inline-flex w-full sm:w-auto">
      {/* Spark layer sits behind the button so sparks emerge from its edges */}
      <span aria-hidden="true" className="absolute left-1/2 top-1/2 z-0 pointer-events-none">
        {bursts.map((burst) =>
          burst.sparks.map((spark) => (
            <motion.span
              key={`${burst.id}-${spark.id}`}
              className="absolute rounded-full"
              style={{
                width: spark.size,
                height: spark.size,
                marginLeft: -spark.size / 2,
                marginTop: -spark.size / 2,
                backgroundColor: spark.color,
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: [0, spark.dx * 0.85, spark.dx],
                y: [0, spark.dy * 0.85, spark.dy + 22],
                opacity: [1, 1, 0],
                scale: [1, 1, 0.3],
              }}
              transition={{ duration: BURST_DURATION, ease: "easeOut", times: [0, 0.55, 1] }}
              onAnimationComplete={spark.id === SPARKS_PER_BURST - 1 ? () => clearBurst(burst.id) : undefined}
            />
          )),
        )}
      </span>

      <button
        type="button"
        onMouseEnter={(event) => launchBurst(event.currentTarget)}
        className={`relative z-10 ${className}`}
      >
        {children}
      </button>
    </span>
  );
}

// Hook label that types itself out, holds, erases and repeats for as long as it is on screen
function TypedHook({ text }: { text: string }) {
  const hookRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(hookRef, { amount: 0.6 });
  const prefersReducedMotion = useReducedMotion();
  const [typedCount, setTypedCount] = useState(0);
  const [isErasing, setIsErasing] = useState(false);

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;

    const isFullyTyped = typedCount >= text.length;
    const isEmpty = typedCount === 0;

    // One step per timeout: type forward, hold the full line, erase back, hold empty, repeat
    let delay = isErasing ? ERASING_INTERVAL_MS : TYPING_INTERVAL_MS;
    if (!isErasing && isFullyTyped) delay = HOLD_TYPED_MS;
    if (isErasing && isEmpty) delay = HOLD_EMPTY_MS;

    const timer = window.setTimeout(() => {
      if (!isErasing) {
        if (isFullyTyped) setIsErasing(true);
        else setTypedCount(typedCount + 1);
      } else if (isEmpty) {
        setIsErasing(false);
      } else {
        setTypedCount(typedCount - 1);
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [isInView, prefersReducedMotion, text, typedCount, isErasing]);

  const visibleCount = prefersReducedMotion ? text.length : typedCount;

  return (
    <span
      ref={hookRef}
      className="inline-block bg-slate-950 text-white font-sans font-bold text-sm tracking-wide px-5 py-2 rounded-full shadow-lg shadow-black/30"
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="relative inline-block">
        {/* Invisible full text reserves the pill's final size so it does not grow while typing */}
        <span className="invisible">{text}</span>
        <span className="absolute inset-0 text-left">
          {text.slice(0, visibleCount)}
          {!prefersReducedMotion && (
            <motion.span
              className="inline-block w-[2px] h-[1em] ml-px -mr-[3px] align-[-0.15em] bg-white"
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ duration: 0.9, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
            />
          )}
        </span>
      </span>
    </span>
  );
}

export default function Zone6FooterCTA() {
  return (
    <section id="zone-apply" className="relative min-h-screen w-full overflow-hidden">
      {/* Full-Screen Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={SAN_DIEGO_BEACH_BG}
          alt="San Diego skyline across the bay from a sandy beach with a lifeguard tower and pier"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Top & Bottom Gradient Edge Transitions */}
      <div className="absolute inset-x-0 top-0 h-48 sm:h-72 bg-gradient-to-b from-slate-950 via-slate-950/80 via-30% to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-48 sm:h-72 bg-gradient-to-t from-slate-950 via-slate-950/80 via-30% to-transparent z-10 pointer-events-none" />

      {/* Get Involved Content (unboxed, centered over the scenery) */}
      <div className="relative z-20 flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="w-full max-w-4xl text-center">
          <p className="mb-3">
            <TypedHook text={HOOK_TEXT} />
          </p>
          <h2 className="font-heading font-normal text-white text-3xl sm:text-5xl lg:text-7xl leading-[1.08] mb-4 drop-shadow-[0_3px_14px_rgba(0,0,0,0.6)]">
            Get Involved
          </h2>
          <p className="font-body font-bold text-white text-base sm:text-lg lg:text-xl leading-snug text-balance max-w-xl mx-auto mb-8 sm:mb-10 [text-shadow:-1.5px_-1.5px_0_#0f172a,1.5px_-1.5px_0_#0f172a,-1.5px_1.5px_0_#0f172a,1.5px_1.5px_0_#0f172a,0_-1.5px_0_#0f172a,0_1.5px_0_#0f172a,-1.5px_0_0_#0f172a,1.5px_0_0_#0f172a,0_3px_8px_rgba(2,6,23,0.5)]">
            Build with us, help run the show, or back the next wave of California community college builders.
          </p>

          {/* Dummy buttons: destinations are not decided yet, so these are plain buttons with no route */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <FireworkButton className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-sans font-black text-sm tracking-wide px-8 py-4 rounded-full shadow-lg shadow-black/30 transition-all transform hover:scale-105 cursor-pointer">
              <span>Hacker Application</span>
              <span className="text-xl leading-none">→</span>
            </FireworkButton>
            <FireworkButton className="inline-flex items-center justify-center w-full sm:w-auto bg-slate-950 hover:bg-slate-800 text-white font-sans font-bold text-sm tracking-wide px-8 py-4 rounded-full shadow-lg shadow-black/30 transition-all transform hover:scale-105 cursor-pointer">
              Organizer Application
            </FireworkButton>
            <FireworkButton className="inline-flex items-center justify-center w-full sm:w-auto bg-slate-950 hover:bg-slate-800 text-white font-sans font-bold text-sm tracking-wide px-8 py-4 rounded-full shadow-lg shadow-black/30 transition-all transform hover:scale-105 cursor-pointer">
              Sponsor Us
            </FireworkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
