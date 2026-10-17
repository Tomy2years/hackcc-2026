"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform, useMotionValue } from "framer-motion";
import { TransitionProps } from "./types";

const SEAL_CAR_RIGHT = "/assets/roadtrip/seal-car-right.webp";
const SEAL_CAR_LEFT = "/assets/roadtrip/seal-car-left.webp";

// Fine grain (inline SVG noise)
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function TransitionMinimalScenic({
  routeNumber,
  nextStop,
  mileage = "NEXT EXIT",
  direction = "right",
  signPosition = "right",
  progress: manualProgress,
  interactive = true,
}: TransitionProps) {
  const roadRef = useRef<HTMLDivElement>(null);
  const isRight = direction === "right";
  const [honked, setHonked] = useState(false);

  const { scrollYProgress } = useScroll({
    target: roadRef,
    offset: ["start end", "end start"],
  });

  const fallbackMotionValue = useMotionValue(manualProgress ?? 0.5);
  if (manualProgress !== undefined) {
    fallbackMotionValue.set(manualProgress);
  }

  const effectiveProgress = manualProgress !== undefined ? fallbackMotionValue : scrollYProgress;

  // Car animation: travels smoothly across the road
  const carLeft = useTransform(effectiveProgress, [0.15, 0.85], isRight ? ["-10%", "105%"] : ["105%", "-10%"]);
  const carY = useTransform(
    effectiveProgress,
    [0.15, 0.38, 0.62, 0.85],
    isRight ? ["0px", "-3px", "4px", "0px"] : ["0px", "4px", "-3px", "0px"]
  );
  const carRotate = useTransform(effectiveProgress, [0.15, 0.5, 0.85], isRight ? [-0.8, 1, 0] : [0.8, -1, 0]);

  // Sign pop-in animation
  const signRaw = useTransform(effectiveProgress, [0.08, 0.28], [0.3, 1]);
  const signScale = useSpring(signRaw, { stiffness: 340, damping: 20 });

  const handleCarClick = () => {
    if (!interactive) return;
    setHonked(true);
    setTimeout(() => setHonked(false), 2000);
  };

  return (
    <div
      ref={roadRef}
      aria-hidden="true"
      className="relative z-10 w-full overflow-hidden select-none"
      style={{ height: "72vh" }}
    >
      {/* Soft atmospheric golden-hour / twilight background replacing harsh mustard grass */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#1c1815] to-slate-950">
        <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
        {/* Subtle horizon amber warmth */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-48 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent blur-3xl" />
      </div>

      {/* Decorative California distant hillside silhouettes */}
      <div className="absolute inset-x-0 top-0 h-16 opacity-30 pointer-events-none">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-full fill-slate-900">
          <path d="M0,45 Q360,15 720,38 T1440,25 L1440,60 L0,60 Z" />
        </svg>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-16 opacity-30 pointer-events-none">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-full fill-slate-900 scale-y-[-1]">
          <path d="M0,45 Q360,20 720,35 T1440,28 L1440,60 L0,60 Z" />
        </svg>
      </div>

      {/* The Road Surface */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[42vh] bg-gradient-to-b from-[#242831] via-[#1a1c22] to-[#14161b] border-y-4 border-[#3c362c] shadow-[0_0_50px_rgba(0,0,0,0.6)]">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: GRAIN }} />

        {/* Subtle tire track wear */}
        <div className="absolute inset-x-0 top-[22%] h-[1.8vh] bg-black/25 blur-[4px]" />
        <div className="absolute inset-x-0 top-[38%] h-[1.8vh] bg-black/25 blur-[4px]" />
        <div className="absolute inset-x-0 top-[62%] h-[1.8vh] bg-black/25 blur-[4px]" />
        <div className="absolute inset-x-0 top-[78%] h-[1.8vh] bg-black/25 blur-[4px]" />

        {/* Solid white shoulder lines */}
        <div className="absolute inset-x-0 top-3 h-1.5 bg-slate-100/90 shadow-sm" />
        <div className="absolute inset-x-0 bottom-3 h-1.5 bg-slate-100/90 shadow-sm" />

        {/* Double yellow center lines */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
          <div className="h-1.5 bg-amber-400/95 shadow-sm" />
          <div className="h-1.5 bg-amber-400/95 shadow-sm" />
        </div>

        {/* California Botts' Dots along the center divider */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-around pointer-events-none px-4">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={`dot-${i}`}
              className="w-2 h-2 rounded-full bg-amber-200 border border-amber-500/80 shadow-[0_1px_3px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.8)] shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Caltrans Exit Sign (Positioned safely to avoid colliding with fixed navbar) */}
      <div
        className={`absolute z-20 top-[4%] ${
          signPosition === "right" ? "right-4 sm:right-8 md:right-16" : "left-4 sm:left-8 md:left-16"
        }`}
      >
        <motion.div
          style={{ scaleY: signScale }}
          className={`flex items-end gap-2.5 origin-bottom ${signPosition === "left" ? "flex-row-reverse" : ""}`}
        >
          {/* Highway cone */}
          <div className="relative mb-0.5 w-5 sm:w-6 h-7 sm:h-8 shrink-0 drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]">
            <svg viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <polygon points="2,28 22,28 20,31 4,31" fill="#c2410c" stroke="#090d16" strokeWidth="1.2" />
              <polygon points="5,28 12,4 19,28" fill="#ea580c" stroke="#090d16" strokeWidth="1.2" />
              <polygon points="8,19 10,13 14,13 16,19" fill="#ffffff" />
              <polygon points="6,25 7,21 17,21 18,25" fill="#ffffff" />
            </svg>
          </div>

          {/* Authentic California Freeway Green Sign */}
          <div className="relative flex flex-col items-center drop-shadow-[0_6px_16px_rgba(0,0,0,0.7)]">
            <div className="relative z-10 bg-[#15803D] border-2 border-slate-950 rounded-lg px-3.5 py-1.5 sm:py-2 min-w-[130px] sm:min-w-[170px]">
              <div className="absolute inset-0.5 border border-white/85 rounded-md pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between gap-2 mb-0.5">
                <span className="inline-flex items-center justify-center bg-white text-[#15803D] font-mono font-black text-[9px] sm:text-[11px] px-1.5 py-0.5 rounded border border-slate-950 shadow-xs leading-none">
                  {routeNumber}
                </span>
                <span className="font-sans font-extrabold text-[8px] sm:text-[10px] text-white/95 uppercase tracking-wider">
                  {mileage}
                </span>
              </div>

              <div className="relative z-10 flex items-center justify-between gap-2">
                <span className="font-sans font-black text-xs sm:text-sm text-white uppercase tracking-wide">
                  {nextStop}
                </span>
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0 ${signPosition === "left" ? "rotate-180" : ""}`}
                >
                  <path
                    d="M3 8H13M13 8L9 4M13 8L9 12"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Support posts */}
            <div className="flex justify-between w-3/4 -mt-0.5 pointer-events-none">
              <div className="w-1.5 h-5 sm:h-7 bg-slate-500 border-x border-slate-950 rounded-b-xs" />
              <div className="w-1.5 h-5 sm:h-7 bg-slate-500 border-x border-slate-950 rounded-b-xs" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Seal Mascot Car */}
      <div
        className="absolute inset-x-0 z-30 pointer-events-auto"
        style={{
          top: isRight ? "54%" : "32%",
          height: "18vh",
        }}
      >
        <motion.div
          style={{ left: carLeft, y: carY, rotate: carRotate }}
          className="absolute top-0 bottom-0 flex items-center will-change-transform cursor-pointer"
          onClick={handleCarClick}
        >
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 0.45, repeat: Infinity, ease: "easeInOut" }}
            className="relative group"
          >
            {/* Interactive Honk Speech Bubble */}
            {honked && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: -20 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 z-50 bg-amber-400 text-slate-950 font-black text-xs px-3 py-1.5 rounded-full shadow-lg border border-slate-950 whitespace-nowrap"
              >
                Beep beep! Next stop: {nextStop}! 🚗💨
              </motion.div>
            )}

            {/* Car ground shadow */}
            <div className="absolute inset-x-[10%] bottom-[4%] h-[16%] rounded-full bg-black/60 blur-md" />

            {/* Exhaust puff */}
            <div
              className={`absolute bottom-[14%] w-3 h-2 rounded-full bg-slate-300/40 blur-[1px] animate-ping ${
                isRight ? "-left-2" : "-right-2"
              }`}
            />

            <Image
              src={isRight ? SEAL_CAR_RIGHT : SEAL_CAR_LEFT}
              alt="HackCC mascot seal driving convertible"
              width={578}
              height={358}
              className="relative h-[clamp(68px,14vh,160px)] w-auto object-contain select-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] transition-transform group-hover:scale-105 active:scale-95"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
