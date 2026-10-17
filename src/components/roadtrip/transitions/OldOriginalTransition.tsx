"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform, useMotionValue } from "framer-motion";
import { TransitionProps } from "./types";

const SEAL_CAR_RIGHT = "/assets/roadtrip/seal-car-right.png";
const SEAL_CAR_LEFT = "/assets/roadtrip/seal-car-left.png";

const ROAD_HEIGHT_VH = 125;
const ROAD_EDGE_VH = 8;
const SHOULDER_VH = 4;
const LANE_VH = 26;
const DECK_VH = SHOULDER_VH * 2 + LANE_VH * 2;
const DECK_TOP_VH = (ROAD_HEIGHT_VH - DECK_VH) / 2;
const DECK_BOTTOM_VH = DECK_TOP_VH + DECK_VH;
const LANES_TOP_VH = DECK_TOP_VH + SHOULDER_VH;
const LANES_BOTTOM_VH = DECK_BOTTOM_VH - SHOULDER_VH;
const CENTER_VH = LANES_TOP_VH + LANE_VH;

const GRASS_EDGE = "#c49a52";
const GRASS_ROADSIDE = "#9a7439";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const WAVE_EDGE = "M0,40 C180,8 360,10 540,30 S900,58 1080,30 S1350,4 1440,22";
const WAVE_SHAPE = `${WAVE_EDGE} L1440,100 L0,100 Z`;

function WaveEdge({ position, mirrored }: { position: "top" | "bottom"; mirrored: boolean }) {
  const isTop = position === "top";
  return (
    <div
      className={`absolute inset-x-0 ${isTop ? "top-0" : "bottom-0"}`}
      style={{ height: `${ROAD_EDGE_VH}vh` }}
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`absolute inset-0 h-full w-full drop-shadow-[0_-14px_28px_rgba(0,0,0,0.45)] ${
          isTop ? "" : "-scale-y-100"
        } ${mirrored ? "-scale-x-100" : ""}`}
      >
        <path d={WAVE_SHAPE} fill={GRASS_EDGE} />
        <path d={WAVE_EDGE} fill="none" stroke="#5c4526" strokeWidth="3" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}

export default function OldOriginalTransition({
  routeNumber,
  nextStop,
  mileage = "NEXT EXIT",
  direction = "right",
  signPosition = "right",
  progress: manualProgress,
}: TransitionProps) {
  const roadRef = useRef<HTMLDivElement>(null);
  const isRight = direction === "right";

  const { scrollYProgress } = useScroll({
    target: roadRef,
    offset: ["start end", "end start"],
  });

  const fallbackMotionValue = useMotionValue(manualProgress ?? 0.5);
  if (manualProgress !== undefined) {
    fallbackMotionValue.set(manualProgress);
  }

  const effectiveProgress = manualProgress !== undefined ? fallbackMotionValue : scrollYProgress;

  const travelVh = 100 + ROAD_HEIGHT_VH;
  const laneTopVh = isRight ? CENTER_VH : LANES_TOP_VH;
  const laneCenterVh = laneTopVh + LANE_VH / 2;

  const driveStart = laneCenterVh / travelVh + 0.02;
  const driveEnd = (100 + laneCenterVh) / travelVh - 0.02;
  const driveMid1 = driveStart + (driveEnd - driveStart) * 0.33;
  const driveMid2 = driveStart + (driveEnd - driveStart) * 0.66;

  const carLeft = useTransform(effectiveProgress, [driveStart, driveEnd], isRight ? ["0%", "100%"] : ["100%", "0%"]);
  const carX = useTransform(effectiveProgress, [driveStart, driveEnd], isRight ? ["-100%", "0%"] : ["0%", "-100%"]);
  const carY = useTransform(
    effectiveProgress,
    [driveStart, driveMid1, driveMid2, driveEnd],
    isRight ? ["0px", "-4px", "5px", "0px"] : ["0px", "5px", "-4px", "0px"]
  );
  const carRotate = useTransform(
    effectiveProgress,
    [driveStart, driveMid1, driveMid2, driveEnd],
    isRight ? [-1, 1.2, -0.8, 0.4] : [1, -1.2, 0.8, -0.4]
  );

  const signEnters = DECK_TOP_VH / travelVh;
  const signRaw = useTransform(effectiveProgress, [signEnters - 0.07, signEnters], [0.35, 1]);
  const signScale = useSpring(signRaw, { stiffness: 320, damping: 16, mass: 0.6 });

  return (
    <div
      ref={roadRef}
      aria-hidden="true"
      className="relative z-10 w-full overflow-x-clip select-none"
      style={{ height: `${ROAD_HEIGHT_VH}vh` }}
    >
      <div
        className="absolute inset-x-0"
        style={{
          top: `${ROAD_EDGE_VH - 0.5}vh`,
          bottom: `${ROAD_EDGE_VH - 0.5}vh`,
          background: `linear-gradient(180deg, ${GRASS_EDGE} 0%, ${GRASS_ROADSIDE} 22%, ${GRASS_ROADSIDE} 78%, ${GRASS_EDGE} 100%)`,
        }}
      >
        <div className="absolute inset-0 opacity-25 mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
      </div>

      <WaveEdge position="top" mirrored={!isRight} />
      <WaveEdge position="bottom" mirrored={isRight} />

      <div
        className="absolute inset-x-0 bg-gradient-to-b from-[#2c3039] via-[#23262e] to-[#1c1f26] border-y-[6px] border-[#5b4a36] shadow-[0_0_36px_rgba(0,0,0,0.4)]"
        style={{ top: `${DECK_TOP_VH}vh`, height: `${DECK_VH}vh` }}
      >
        <div className="absolute inset-0 opacity-25 mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
      </div>

      <div
        className="absolute inset-x-0 h-1.5 sm:h-2 -translate-y-1/2 bg-slate-50/95"
        style={{ top: `${LANES_TOP_VH}vh` }}
      />
      <div
        className="absolute inset-x-0 h-1.5 sm:h-2 -translate-y-1/2 bg-slate-50/95"
        style={{ top: `${LANES_BOTTOM_VH}vh` }}
      />

      <div
        className="absolute inset-x-0 -translate-y-1/2 flex flex-col gap-1.5 sm:gap-2"
        style={{ top: `${CENTER_VH}vh` }}
      >
        <div className="h-1.5 sm:h-2 bg-amber-400" />
        <div className="h-1.5 sm:h-2 bg-amber-400" />
      </div>

      <div
        className={`absolute z-20 -translate-y-full ${
          signPosition === "right"
            ? "right-4 sm:right-10 md:right-16 lg:right-24"
            : "left-4 sm:left-10 md:left-16 lg:left-24"
        }`}
        style={{ top: `${DECK_TOP_VH - 0.5}vh` }}
      >
        <motion.div
          style={{ scaleY: signScale }}
          className={`flex items-end gap-3 origin-bottom ${signPosition === "left" ? "flex-row-reverse" : ""}`}
        >
          <div className="relative mb-0.5 w-6 sm:w-7 h-8 sm:h-9 shrink-0 drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
            <svg viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <polygon points="2,28 22,28 20,31 4,31" fill="#c2410c" stroke="#090d16" strokeWidth="1.5" />
              <polygon points="5,28 12,4 19,28" fill="#ea580c" stroke="#090d16" strokeWidth="1.5" />
              <polygon points="8,19 10,13 14,13 16,19" fill="#ffffff" />
              <polygon points="6,25 7,21 17,21 18,25" fill="#ffffff" />
            </svg>
          </div>

          <div className="relative flex flex-col items-center drop-shadow-[0_8px_20px_rgba(0,0,0,0.75)]">
            <div className="relative z-10 bg-[#15803D] border-2 border-slate-950 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 min-w-[140px] sm:min-w-[180px] md:min-w-[200px]">
              <div className="absolute inset-0.5 sm:inset-1 border border-white/90 rounded-md sm:rounded-lg pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between gap-2 mb-1">
                <span className="inline-flex items-center justify-center bg-white text-[#15803D] font-mono font-black text-[10px] sm:text-xs px-1.5 py-0.5 rounded border border-slate-950 shadow-sm leading-none">
                  {routeNumber}
                </span>
                <span className="font-sans font-extrabold text-[9px] sm:text-[11px] text-white/95 uppercase tracking-wider">
                  {mileage}
                </span>
              </div>

              <div className="relative z-10 flex items-center justify-between gap-2 pt-0.5">
                <span className="font-sans font-black text-sm sm:text-base text-white uppercase tracking-wide">
                  {nextStop}
                </span>
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0 ${
                    signPosition === "left" ? "rotate-180" : ""
                  }`}
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

            <div className="flex justify-between w-4/5 -mt-0.5 pointer-events-none">
              <div className="w-1.5 h-8 sm:h-10 bg-slate-500 border-x border-slate-950 rounded-b-sm" />
              <div className="w-1.5 h-8 sm:h-10 bg-slate-500 border-x border-slate-950 rounded-b-sm" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 z-30" style={{ top: `${laneTopVh}vh`, height: `${LANE_VH}vh` }}>
        <motion.div
          style={{ left: carLeft, x: carX, y: carY, rotate: carRotate }}
          className="absolute top-0 bottom-0 flex items-center will-change-transform"
        >
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 0.45, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="absolute inset-x-[10%] bottom-[4%] h-[16%] rounded-full bg-black/55 blur-md" />
            <div
              className={`absolute bottom-[14%] w-3 h-2 rounded-full bg-slate-300/40 blur-[1px] animate-ping ${
                isRight ? "-left-2" : "-right-2"
              }`}
            />
            <Image
              src={isRight ? SEAL_CAR_RIGHT : SEAL_CAR_LEFT}
              alt=""
              width={578}
              height={358}
              className="relative h-[clamp(72px,16vh,190px)] w-auto object-contain select-none drop-shadow-[0_10px_18px_rgba(0,0,0,0.6)]"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
