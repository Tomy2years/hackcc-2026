"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform, useMotionValue } from "framer-motion";
import { TransitionProps } from "./types";

const SEAL_CAR_RIGHT = "/assets/roadtrip/seal-car-right.webp";
const SEAL_CAR_LEFT = "/assets/roadtrip/seal-car-left.webp";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function TransitionScenicHighway({
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

  const carLeft = useTransform(effectiveProgress, [0.12, 0.88], isRight ? ["-10%", "105%"] : ["105%", "-10%"]);
  const carY = useTransform(
    effectiveProgress,
    [0.12, 0.35, 0.65, 0.88],
    isRight ? ["0px", "-4px", "5px", "0px"] : ["0px", "5px", "-4px", "0px"]
  );
  const carRotate = useTransform(effectiveProgress, [0.12, 0.5, 0.88], isRight ? [-1, 1.2, 0] : [1, -1.2, 0]);

  const signRaw = useTransform(effectiveProgress, [0.06, 0.25], [0.35, 1]);
  const signScale = useSpring(signRaw, { stiffness: 320, damping: 18 });

  const handleCarClick = () => {
    if (!interactive) return;
    setHonked(true);
    setTimeout(() => setHonked(false), 2200);
  };

  return (
    <div
      ref={roadRef}
      aria-hidden="true"
      className="relative z-10 w-full overflow-hidden select-none"
      style={{ height: "78vh" }}
    >
      {/* Scenic Horizon: California Golden Hills & Twilight Sky */}
      <div className="absolute inset-x-0 top-0 h-[28vh] bg-gradient-to-b from-slate-950 via-[#2d2218] to-[#1c1813] overflow-hidden">
        <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: GRAIN }} />

        {/* Golden Hour Horizon Glow */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-amber-500/20 via-orange-500/10 to-transparent blur-xl" />

        {/* Back ridge hills */}
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-6 w-full h-16 fill-[#382b20]/60"
        >
          <path d="M0,60 Q240,20 480,55 T960,35 Q1200,65 1440,30 L1440,120 L0,120 Z" />
        </svg>

        {/* Fore ridge hills with cypress and palm silhouettes */}
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 w-full h-20 fill-[#201912]"
        >
          <path d="M0,80 Q200,45 420,70 T860,50 Q1150,75 1440,45 L1440,120 L0,120 Z" />
        </svg>

        {/* Roadside Wooden Guardrail */}
        <div className="absolute inset-x-0 bottom-0 h-5 border-b-2 border-stone-800 bg-amber-950/40 flex justify-between px-6 pointer-events-none">
          {Array.from({ length: 28 }).map((_, i) => (
            <div key={`post-${i}`} className="w-1.5 h-6 bg-stone-700 border-x border-stone-900 -translate-y-1" />
          ))}
        </div>
      </div>

      {/* The Road Surface */}
      <div className="absolute inset-x-0 top-[28vh] h-[36vh] bg-gradient-to-b from-[#262933] via-[#1b1e25] to-[#13151b] border-y-4 border-[#3a3328] shadow-[0_0_60px_rgba(0,0,0,0.7)]">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: GRAIN }} />

        {/* Solid white edge markings */}
        <div className="absolute inset-x-0 top-3 h-1.5 bg-slate-100/90 shadow-sm" />
        <div className="absolute inset-x-0 bottom-3 h-1.5 bg-slate-100/90 shadow-sm" />

        {/* Double yellow center dividing lines */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
          <div className="h-1.5 bg-amber-400" />
          <div className="h-1.5 bg-amber-400" />
        </div>

        {/* California Botts' dots (Raised pavement markers) */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-around pointer-events-none px-4">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={`dot-${i}`}
              className="w-2.5 h-2.5 rounded-full bg-amber-200 border border-amber-600 shadow-[0_2px_4px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.9)]"
            />
          ))}
        </div>
      </div>

      {/* Lower Verge: California Golden Poppies & Roadside Grass */}
      <div className="absolute inset-x-0 bottom-0 h-[14vh] bg-gradient-to-b from-[#181512] to-slate-950 flex items-center justify-between px-6 overflow-hidden">
        {/* Golden Poppies along the shoulder */}
        <div className="flex items-end gap-3 sm:gap-6 opacity-85">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={`poppy-${i}`} className="flex flex-col items-center">
              {/* Petals */}
              <div
                className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 rounded-full bg-gradient-to-tr from-amber-500 via-orange-400 to-amber-300 shadow-sm"
                style={{
                  transform: `scale(${0.75 + (i % 4) * 0.15}) rotate(${((i * 37) % 40) - 20}deg)`,
                }}
              />
              {/* Stem */}
              <div className="w-0.5 h-3 sm:h-5 bg-emerald-700/80 -mt-0.5" />
            </div>
          ))}
        </div>
      </div>

      {/* Caltrans Exit Sign & Cone */}
      <div
        className={`absolute z-20 top-[6vh] ${
          signPosition === "right" ? "right-4 sm:right-8 md:right-16" : "left-4 sm:left-8 md:left-16"
        }`}
      >
        <motion.div
          style={{ scaleY: signScale }}
          className={`flex items-end gap-3 origin-bottom ${signPosition === "left" ? "flex-row-reverse" : ""}`}
        >
          {/* Traffic Cone */}
          <div className="relative mb-0.5 w-6 h-8 shrink-0 drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]">
            <svg viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <polygon points="2,28 22,28 20,31 4,31" fill="#c2410c" stroke="#090d16" strokeWidth="1.2" />
              <polygon points="5,28 12,4 19,28" fill="#ea580c" stroke="#090d16" strokeWidth="1.2" />
              <polygon points="8,19 10,13 14,13 16,19" fill="#ffffff" />
              <polygon points="6,25 7,21 17,21 18,25" fill="#ffffff" />
            </svg>
          </div>

          {/* Green Exit Sign */}
          <div className="relative flex flex-col items-center drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)]">
            <div className="relative z-10 bg-[#15803D] border-2 border-slate-950 rounded-lg px-4 py-2 min-w-[140px] sm:min-w-[180px]">
              <div className="absolute inset-0.5 border border-white/85 rounded-md pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between gap-2 mb-0.5">
                <span className="inline-flex items-center justify-center bg-white text-[#15803D] font-mono font-black text-[9px] sm:text-[11px] px-1.5 py-0.5 rounded border border-slate-950 leading-none">
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
                  className={`w-4 h-4 text-white shrink-0 ${signPosition === "left" ? "rotate-180" : ""}`}
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

            <div className="flex justify-between w-3/4 -mt-0.5 pointer-events-none">
              <div className="w-1.5 h-6 bg-slate-500 border-x border-slate-950" />
              <div className="w-1.5 h-6 bg-slate-500 border-x border-slate-950" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Seal Mascot Car with Headlight Beams */}
      <div
        className="absolute inset-x-0 z-30 pointer-events-auto"
        style={{
          top: isRight ? "46%" : "30%",
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
                animate={{ opacity: 1, scale: 1, y: -25 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 z-50 bg-amber-400 text-slate-950 font-black text-xs px-3 py-1.5 rounded-full shadow-xl border border-slate-950 whitespace-nowrap flex items-center gap-1.5"
              >
                <span>🚗💨</span>
                <span>HONK! Cruising to {nextStop}!</span>
              </motion.div>
            )}

            {/* Glowing Golden Headlight Cone */}
            <div
              className={`absolute top-1/2 -translate-y-1/2 h-16 w-36 pointer-events-none opacity-40 blur-sm bg-gradient-to-r ${
                isRight
                  ? "left-[80%] from-amber-300/60 to-transparent"
                  : "right-[80%] from-transparent to-amber-300/60"
              }`}
              style={{
                clipPath: isRight
                  ? "polygon(0 40%, 100% 0, 100% 100%, 0 60%)"
                  : "polygon(0 0, 100% 40%, 100% 60%, 0 100%)",
              }}
            />

            {/* Ground Shadow */}
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
              className="relative h-[clamp(70px,15vh,170px)] w-auto object-contain select-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] transition-transform group-hover:scale-105 active:scale-95"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
