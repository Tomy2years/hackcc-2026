"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { TransitionProps } from "./types";

const SEAL_CAR_RIGHT = "/assets/roadtrip/seal-car-right.webp";
const SEAL_CAR_LEFT = "/assets/roadtrip/seal-car-left.webp";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function TransitionDashboardHUD({
  routeNumber,
  nextStop,
  mileage = "CALIFORNIA ROAD TRIP",
  direction = "right",
  signPosition = "right",
  progress: manualProgress,
  interactive = true,
}: TransitionProps) {
  const roadRef = useRef<HTMLDivElement>(null);
  const isRight = direction === "right";
  const [honked, setHonked] = useState(false);
  const [stationIndex, setStationIndex] = useState(0);

  const STATIONS = [
    "98.7 FM • K-HACK SoCal Surf Rock",
    "101.1 FM • Pacific Coast Lo-Fi Beats",
    "104.3 FM • California Sunshine Pop",
  ];

  const { scrollYProgress } = useScroll({
    target: roadRef,
    offset: ["start end", "end start"],
  });

  const fallbackMotionValue = useMotionValue(manualProgress ?? 0.5);
  if (manualProgress !== undefined) {
    fallbackMotionValue.set(manualProgress);
  }

  const effectiveProgress = manualProgress !== undefined ? fallbackMotionValue : scrollYProgress;

  const carLeft = useTransform(effectiveProgress, [0.15, 0.85], isRight ? ["-10%", "105%"] : ["105%", "-10%"]);
  const carY = useTransform(
    effectiveProgress,
    [0.15, 0.38, 0.62, 0.85],
    isRight ? ["0px", "-3px", "4px", "0px"] : ["0px", "4px", "-3px", "0px"]
  );

  // Dynamic mechanical odometer calculating mileage based on progress
  const odometerMiles = useTransform(effectiveProgress, [0, 1], [14.0, 48.6]);
  const [displayMiles, setDisplayMiles] = useState("028.4");

  // Keep display miles updated
  odometerMiles.on("change", (val) => {
    setDisplayMiles(val.toFixed(1).padStart(5, "0"));
  });

  // Speedometer needle wiggle
  const speedNeedle = useTransform(effectiveProgress, [0, 0.5, 1], [-25, 40, -10]);

  const handleCarClick = () => {
    if (!interactive) return;
    setHonked(true);
    setTimeout(() => setHonked(false), 2000);
  };

  const cycleRadio = () => {
    setStationIndex((prev) => (prev + 1) % STATIONS.length);
  };

  return (
    <div
      ref={roadRef}
      aria-hidden="true"
      className="relative z-10 w-full overflow-hidden select-none"
      style={{ height: "76vh" }}
    >
      {/* Twilight Roadside Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#191a20] to-slate-950">
        <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
      </div>

      {/* Top Floating Dashboard HUD Bar */}
      <div className="absolute inset-x-0 top-4 z-40 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto bg-slate-900/90 border border-white/15 rounded-2xl p-2.5 sm:p-3 shadow-2xl backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
          {/* Mechanical Rolling Odometer */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              TRIP ODOMETER:
            </span>
            <div className="bg-slate-950 border border-white/20 rounded px-2 py-0.5 flex items-center font-mono font-black text-xs sm:text-sm text-white tracking-widest shadow-inner">
              <span className="text-amber-400">{displayMiles.slice(0, 3)}</span>
              <span className="text-white/40">.</span>
              <span className="text-slate-300">{displayMiles.slice(4)}</span>
              <span className="text-[9px] text-white/50 ml-1">MI</span>
            </div>
          </div>

          {/* Speedometer Gauge Dial */}
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-full bg-slate-950 border border-white/25 flex items-center justify-center overflow-hidden shadow-inner">
              <div className="absolute inset-1 border border-dashed border-white/20 rounded-full" />
              <motion.div
                style={{ rotate: speedNeedle }}
                className="w-0.5 h-3.5 bg-amber-400 origin-bottom rounded-full -translate-y-1 shadow-sm"
              />
              <div className="w-1.5 h-1.5 rounded-full bg-white z-10" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-slate-400 leading-none">SPEED</span>
              <span className="text-xs font-bold text-white leading-none">65 MPH</span>
            </div>
          </div>

          {/* Retro Radio Tuner */}
          <button
            type="button"
            onClick={cycleRadio}
            className="flex items-center gap-2 bg-slate-950/80 hover:bg-slate-800 border border-white/10 rounded-lg px-2.5 py-1 transition-colors cursor-pointer text-left"
          >
            <span className="text-amber-400 text-xs animate-pulse">📻</span>
            <div className="flex flex-col">
              <span className="text-[8px] font-mono text-slate-400 uppercase leading-none">STATION</span>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-200 leading-none">
                {STATIONS[stationIndex]}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* The Road Surface */}
      <div className="absolute inset-x-0 top-[24vh] h-[36vh] bg-gradient-to-b from-[#252831] via-[#1a1c22] to-[#121419] border-y-4 border-[#3d372d] shadow-[0_0_50px_rgba(0,0,0,0.6)]">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: GRAIN }} />

        {/* White Edge Lines */}
        <div className="absolute inset-x-0 top-3 h-1.5 bg-slate-100/90" />
        <div className="absolute inset-x-0 bottom-3 h-1.5 bg-slate-100/90" />

        {/* Center Double Yellow Lines with Botts' Dots */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
          <div className="h-1.5 bg-amber-400 shadow-sm" />
          <div className="h-1.5 bg-amber-400 shadow-sm" />
        </div>

        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-around pointer-events-none px-4">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={`dot-${i}`}
              className="w-2 h-2 rounded-full bg-amber-200 border border-amber-500 shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
            />
          ))}
        </div>
      </div>

      {/* Road Trip Souvenir Passport Stamp */}
      <div
        className={`absolute z-20 top-[18vh] ${
          signPosition === "right" ? "right-4 sm:right-10 md:right-16" : "left-4 sm:left-10 md:left-16"
        }`}
      >
        <div className="border-2 border-dashed border-amber-400/80 bg-slate-900/90 text-amber-300 rounded-lg px-3 py-1.5 rotate-[-3deg] shadow-lg flex items-center gap-2 select-none">
          <div className="w-5 h-5 rounded-full border border-amber-400 flex items-center justify-center font-black text-[9px]">
            ★
          </div>
          <div>
            <div className="text-[8px] font-mono uppercase tracking-wider text-amber-200">
              {mileage} • CHECKPOINT
            </div>
            <div className="font-heading font-black text-xs sm:text-sm text-white">
              {nextStop} (ROUTE {routeNumber})
            </div>
          </div>
        </div>
      </div>

      {/* Seal Mascot Car */}
      <div
        className="absolute inset-x-0 z-30 pointer-events-auto"
        style={{
          top: isRight ? "42%" : "28%",
          height: "18vh",
        }}
      >
        <motion.div
          style={{ left: carLeft, y: carY }}
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
                animate={{ opacity: 1, scale: 1, y: -20 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 z-50 bg-amber-400 text-slate-950 font-black text-xs px-3 py-1.5 rounded-full shadow-lg border border-slate-950 whitespace-nowrap"
              >
                Cruising at 65 MPH! 🚗💨
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
              className="relative h-[clamp(68px,14vh,160px)] w-auto object-contain select-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] transition-transform group-hover:scale-105 active:scale-95"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
