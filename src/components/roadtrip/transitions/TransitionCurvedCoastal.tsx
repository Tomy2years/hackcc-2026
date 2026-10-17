"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { TransitionProps } from "./types";

const SEAL_CAR_RIGHT = "/assets/roadtrip/seal-car-right.webp";
const SEAL_CAR_LEFT = "/assets/roadtrip/seal-car-left.webp";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function TransitionCurvedCoastal({
  routeNumber,
  nextStop,
  mileage = "PACIFIC COAST HWY",
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

  // Along the sweeping curve: X moves across, Y curves downward then rises, Rotate banks with the road bend
  const carLeft = useTransform(effectiveProgress, [0.1, 0.9], isRight ? ["-8%", "104%"] : ["104%", "-8%"]);
  const carY = useTransform(
    effectiveProgress,
    [0.1, 0.35, 0.55, 0.75, 0.9],
    isRight ? ["-15px", "18px", "32px", "14px", "-8px"] : ["-8px", "14px", "32px", "18px", "-15px"]
  );
  const carRotate = useTransform(
    effectiveProgress,
    [0.1, 0.35, 0.55, 0.75, 0.9],
    isRight ? [-3, 4, 1, -3, -1] : [1, 3, -1, -4, 3]
  );

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
      style={{ height: "82vh" }}
    >
      {/* Upper Half: Pacific Ocean Coastal Bluffs & Waves */}
      <div className="absolute inset-x-0 top-0 h-[48vh] bg-gradient-to-b from-slate-950 via-[#0e273c] to-[#12314a] overflow-hidden">
        <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: GRAIN }} />

        {/* Ocean Wave Rhythms */}
        <div className="absolute inset-x-0 top-1/4 h-24 opacity-30">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full fill-sky-400/20">
            <path d="M0,40 C320,15 480,60 800,30 C1120,60 1280,20 1440,35 L1440,80 L0,80 Z" />
          </svg>
        </div>
        <div className="absolute inset-x-0 top-1/3 h-20 opacity-25">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-full fill-cyan-300/20">
            <path d="M0,25 C300,50 600,10 900,40 C1200,15 1350,35 1440,25 L1440,60 L0,60 Z" />
          </svg>
        </div>

        {/* Coastal Bluffs Silhouette */}
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-4 w-full h-16 fill-[#1b2a26]"
        >
          <path d="M0,70 Q280,30 560,65 T1120,40 Q1300,60 1440,35 L1440,100 L0,100 Z" />
        </svg>

        {/* Scenic PCH Seagulls */}
        <div className="absolute top-10 right-1/4 flex gap-4 opacity-40">
          <span className="text-white text-xs select-none">~^~</span>
          <span className="text-white text-[10px] select-none -translate-y-2">~^~</span>
        </div>
      </div>

      {/* Sweeping Curved Road Canvas */}
      <div className="absolute inset-x-0 top-[26vh] h-[46vh] overflow-hidden">
        {/* Curved Asphalt Band */}
        <svg
          viewBox="0 0 1440 280"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full drop-shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        >
          {/* Main Road Bed */}
          <path
            d="M0,60 C380,140 760,170 1140,120 L1440,80 L1440,220 C1140,260 760,280 380,220 L0,180 Z"
            fill="#1c1f26"
            stroke="#3a3020"
            strokeWidth="6"
          />

          {/* White Outer Shoulder Line */}
          <path
            d="M0,72 C380,148 760,178 1140,128 L1440,88"
            fill="none"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="3.5"
          />

          {/* White Inner Shoulder Line */}
          <path
            d="M0,168 C380,208 760,268 1140,248 L1440,208"
            fill="none"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="3.5"
          />

          {/* Double Yellow Center Curved Line */}
          <path
            d="M0,118 C380,178 760,222 1140,188 L1440,148"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="3"
          />
          <path
            d="M0,124 C380,184 760,228 1140,194 L1440,154"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="3"
          />
        </svg>

        {/* Road Grain Texture Overlay */}
        <div className="absolute inset-0 opacity-25 mix-blend-overlay pointer-events-none" style={{ backgroundImage: GRAIN }} />
      </div>

      {/* Lower Coastline / Beach Dunes */}
      <div className="absolute inset-x-0 bottom-0 h-[18vh] bg-gradient-to-t from-slate-950 via-[#1f1912] to-transparent pointer-events-none" />

      {/* PCH Route 1 California Marker Badge */}
      <div
        className={`absolute z-20 top-6 ${
          signPosition === "right" ? "right-6 sm:right-12 md:right-20" : "left-6 sm:left-12 md:left-20"
        }`}
      >
        <div className="relative flex flex-col items-center drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)]">
          {/* Caltrans Highway Sign */}
          <div className="relative z-10 bg-[#15803D] border-2 border-slate-950 rounded-xl px-4 py-2 min-w-[150px] sm:min-w-[190px]">
            <div className="absolute inset-0.5 border border-white/85 rounded-lg pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between gap-2 mb-0.5">
              {/* California State Route Spade Shield */}
              <div className="bg-white text-[#15803D] font-mono font-black text-[10px] px-1.5 py-0.5 rounded border border-slate-950 flex items-center gap-1">
                <span>CA</span>
                <span>{routeNumber}</span>
              </div>
              <span className="font-sans font-extrabold text-[9px] text-white/90 uppercase tracking-wider">
                {mileage}
              </span>
            </div>

            <div className="relative z-10 flex items-center justify-between gap-2">
              <span className="font-sans font-black text-xs sm:text-sm text-white uppercase tracking-wide">
                {nextStop}
              </span>
              <span className="text-white font-bold text-sm">→</span>
            </div>
          </div>
          <div className="w-1.5 h-6 bg-slate-500 border-x border-slate-950" />
        </div>
      </div>

      {/* Seal Mascot Car: Follows the curved road path with dynamic banking */}
      <div
        className="absolute inset-x-0 z-30 pointer-events-auto"
        style={{
          top: isRight ? "46%" : "34%",
          height: "20vh",
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
            {honked && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: -25 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 z-50 bg-amber-400 text-slate-950 font-black text-xs px-3 py-1.5 rounded-full shadow-xl border border-slate-950 whitespace-nowrap"
              >
                Coastal cruise to {nextStop}! 🌊🚗
              </motion.div>
            )}

            <div className="absolute inset-x-[10%] bottom-[4%] h-[16%] rounded-full bg-black/60 blur-md" />
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
              className="relative h-[clamp(72px,15vh,170px)] w-auto object-contain select-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] transition-transform group-hover:scale-105 active:scale-95"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
