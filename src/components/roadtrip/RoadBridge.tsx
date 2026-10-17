"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const SEAL_CAR_RIGHT = "/assets/roadtrip/seal-car-right.png";
const SEAL_CAR_LEFT = "/assets/roadtrip/seal-car-left.png";

/*
 * TRANSITION GEOMETRY (values in vh scaling with viewport)
 *
 * A clean, stylized California highway bordered by a single sleek cartoon rolling hill.
 * Palette matched directly to the trees in the Hollywood Hills daytime scene (Zone 1):
 *   - Sunlit foliage crest highlight: #a8ad28 / #b8bd32 (sunlit chartreuse tree crown rim)
 *   - Tree canopy body: #465824 / #6e8224 (rich olive-forest chaparral green)
 *   - Deep shaded base: #2e3c17 to #1a240e (shadowed forest base)
 *   - Clean cartoon outline: #121b0c
 *
 *   0    ─ 16vh   Top cartoon hill (slender single rolling wave)
 *   16   ─ 92vh   The highway: shoulder · lane · double yellow · lane · shoulder
 *   92   ─ 108vh  Bottom cartoon hill (mirrored rolling verge)
 */
export const ROAD_HEIGHT_VH = 108;
/** Depth of the wavy trailing verge. The next stop tucks this far underneath. */
export const ROAD_EDGE_VH = 6;

const HILL_VH = 16;
const SHOULDER_VH = 3.5;
const DECK_VH = ROAD_HEIGHT_VH - HILL_VH * 2; // 76vh
const DECK_TOP_VH = HILL_VH; // 16vh
const DECK_BOTTOM_VH = ROAD_HEIGHT_VH - HILL_VH; // 92vh
const LANES_TOP_VH = DECK_TOP_VH + SHOULDER_VH; // 19.5vh
const LANES_BOTTOM_VH = DECK_BOTTOM_VH - SHOULDER_VH; // 88.5vh
const LANE_VH = (LANES_BOTTOM_VH - LANES_TOP_VH) / 2; // 34.5vh
const CENTER_VH = LANES_TOP_VH + LANE_VH; // 54vh

// Fine asphalt grain (inline SVG noise)
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

interface RoadBridgeProps {
  routeNumber: string;
  nextStop: string;
  mileage?: string;
  direction?: "right" | "left";
  signPosition?: "left" | "right";
  hasCone?: boolean;
}

/** Top single cartoon rolling hill matching Hollywood Hills daytime tree colors */
function TopCartoonHill({ mirrored }: { mirrored: boolean }) {
  return (
    <div
      className={`absolute inset-x-0 top-0 overflow-hidden pointer-events-none drop-shadow-[0_-10px_20px_rgba(0,0,0,0.4)] ${
        mirrored ? "-scale-x-100" : ""
      }`}
      style={{ height: `${HILL_VH}vh` }}
    >
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full block"
      >
        <defs>
          {/* Hollywood Hills daytime tree foliage gradient */}
          <linearGradient id="top-hill-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a8ad28" />
            <stop offset="18%" stopColor="#6e8224" />
            <stop offset="45%" stopColor="#465824" />
            <stop offset="78%" stopColor="#2e3c17" />
            <stop offset="100%" stopColor="#1a240e" />
          </linearGradient>

          {/* Road verge turf curb */}
          <linearGradient id="top-curb-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a240e" />
            <stop offset="50%" stopColor="#242116" />
            <stop offset="100%" stopColor="#14120a" />
          </linearGradient>
        </defs>

        {/* Single clean cartoon rolling hill body */}
        <path
          d="M0,38 C220,12 440,16 660,38 C880,60 1100,20 1280,12 C1360,8 1410,16 1440,22 L1440,160 L0,160 Z"
          fill="url(#top-hill-gradient)"
        />

        {/* Sunlit crest highlight ribbon (tree canopy sunlit rim) */}
        <path
          d="M0,38 C220,12 440,16 660,38 C880,60 1100,20 1280,12 C1360,8 1410,16 1440,22 L1440,32 C1410,26 1360,18 1280,22 C1100,30 880,70 660,48 C440,26 220,22 0,48 Z"
          fill="#b8bd32"
          opacity="0.65"
        />

        {/* Crisp cartoon outline along the crest */}
        <path
          d="M0,38 C220,12 440,16 660,38 C880,60 1100,20 1280,12 C1360,8 1410,16 1440,22"
          fill="none"
          stroke="#121b0c"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />

        {/* Roadside curb line where hill meets asphalt */}
        <rect x="0" y="153" width="1440" height="7" fill="url(#top-curb-gradient)" />
        <line x1="0" y1="153" x2="1440" y2="153" stroke="#121b0c" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

/** Bottom single cartoon rolling hill matching Hollywood Hills daytime tree colors */
function BottomCartoonHill({ mirrored }: { mirrored: boolean }) {
  return (
    <div
      className={`absolute inset-x-0 bottom-0 overflow-hidden pointer-events-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] ${
        mirrored ? "-scale-x-100" : ""
      }`}
      style={{ height: `${HILL_VH}vh` }}
    >
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full block"
      >
        <defs>
          {/* Hollywood Hills daytime tree foliage gradient */}
          <linearGradient id="bottom-hill-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a240e" />
            <stop offset="22%" stopColor="#2e3c17" />
            <stop offset="55%" stopColor="#465824" />
            <stop offset="82%" stopColor="#6e8224" />
            <stop offset="100%" stopColor="#a8ad28" />
          </linearGradient>

          {/* Road verge turf curb */}
          <linearGradient id="bottom-curb-gradient" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#1a240e" />
            <stop offset="50%" stopColor="#242116" />
            <stop offset="100%" stopColor="#14120a" />
          </linearGradient>
        </defs>

        {/* Roadside curb line where hill meets asphalt */}
        <rect x="0" y="0" width="1440" height="7" fill="url(#bottom-curb-gradient)" />
        <line x1="0" y1="7" x2="1440" y2="7" stroke="#121b0c" strokeWidth="1.5" />

        {/* Single clean cartoon rolling hill body */}
        <path
          d="M0,0 L1440,0 L1440,138 C1410,144 1360,152 1280,148 C1100,140 880,100 660,122 C440,144 220,148 0,122 Z"
          fill="url(#bottom-hill-gradient)"
        />

        {/* Sunlit crest highlight ribbon */}
        <path
          d="M0,122 C220,148 440,144 660,122 C880,100 1100,140 1280,148 C1360,152 1410,144 1440,138 L1440,128 C1410,134 1360,142 1280,138 C1100,130 880,90 660,112 C440,134 220,138 0,112 Z"
          fill="#b8bd32"
          opacity="0.65"
        />

        {/* Crisp cartoon outline along the crest */}
        <path
          d="M0,122 C220,148 440,144 660,122 C880,100 1100,140 1280,148 C1360,152 1410,144 1440,138"
          fill="none"
          stroke="#121b0c"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

export default function RoadBridge({
  routeNumber,
  nextStop,
  mileage = "NEXT EXIT",
  direction = "right",
  signPosition = "right",
  hasCone = true,
}: RoadBridgeProps) {
  const roadRef = useRef<HTMLDivElement>(null);
  const isRight = direction === "right";

  // 0 = strip's leading edge just touching the bottom of the screen
  // 1 = strip's trailing edge just leaving the top of the screen
  const { scrollYProgress } = useScroll({
    target: roadRef,
    offset: ["start end", "end start"],
  });

  const travelVh = 100 + ROAD_HEIGHT_VH;

  // US traffic drives on the right: eastbound (→) takes lower lane, westbound (←) upper lane
  const laneTopVh = isRight ? CENTER_VH : LANES_TOP_VH;
  const laneCenterVh = laneTopVh + LANE_VH / 2;

  // Scroll window during which the car's lane is on screen
  const driveStart = laneCenterVh / travelVh + 0.02;
  const driveEnd = (100 + laneCenterVh) / travelVh - 0.02;
  const driveMid1 = driveStart + (driveEnd - driveStart) * 0.33;
  const driveMid2 = driveStart + (driveEnd - driveStart) * 0.66;

  // Car crosses from fully off one side of the screen to fully off the other
  const carLeft = useTransform(scrollYProgress, [driveStart, driveEnd], isRight ? ["0%", "100%"] : ["100%", "0%"]);
  const carX = useTransform(scrollYProgress, [driveStart, driveEnd], isRight ? ["-100%", "0%"] : ["0%", "-100%"]);
  const carY = useTransform(
    scrollYProgress,
    [driveStart, driveMid1, driveMid2, driveEnd],
    isRight ? ["0px", "-4px", "5px", "0px"] : ["0px", "5px", "-4px", "0px"]
  );
  const carRotate = useTransform(
    scrollYProgress,
    [driveStart, driveMid1, driveMid2, driveEnd],
    isRight ? [-1, 1.2, -0.8, 0.4] : [1, -1.2, 0.8, -0.4]
  );

  // Caltrans exit sign springs up as it scrolls into view
  const signEnters = DECK_TOP_VH / travelVh;
  const signRaw = useTransform(scrollYProgress, [signEnters - 0.07, signEnters], [0.35, 1]);
  const signScale = useSpring(signRaw, { stiffness: 320, damping: 16, mass: 0.6 });

  return (
    <div
      ref={roadRef}
      aria-hidden="true"
      className="relative z-10 w-full overflow-x-clip select-none pointer-events-none"
      style={{ height: `${ROAD_HEIGHT_VH}vh` }}
    >
      {/* Top Single Cartoon Rolling Hill */}
      <TopCartoonHill mirrored={!isRight} />

      {/* Bottom Single Cartoon Rolling Hill */}
      <BottomCartoonHill mirrored={isRight} />

      {/* The Highway Road Surface */}
      <div
        className="absolute inset-x-0 bg-gradient-to-b from-[#2c3039] via-[#23262e] to-[#1c1f26] border-y-[5px] border-[#1e2319] shadow-[0_0_36px_rgba(0,0,0,0.5)]"
        style={{ top: `${DECK_TOP_VH}vh`, height: `${DECK_VH}vh` }}
      >
        <div className="absolute inset-0 opacity-25 mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
      </div>

      {/* Subtle tire-wear paths */}
      {[0, 1].map((lane) =>
        [0.3, 0.7].map((t) => (
          <div
            key={`wear-${lane}-${t}`}
            className="absolute inset-x-0 h-[2.6vh] bg-black/20 blur-[6px]"
            style={{ top: `${LANES_TOP_VH + LANE_VH * (lane + t)}vh` }}
          />
        ))
      )}

      {/* Solid white edge shoulder lines */}
      <div
        className="absolute inset-x-0 h-1.5 sm:h-2 -translate-y-1/2 bg-slate-50/95"
        style={{ top: `${LANES_TOP_VH}vh` }}
      />
      <div
        className="absolute inset-x-0 h-1.5 sm:h-2 -translate-y-1/2 bg-slate-50/95"
        style={{ top: `${LANES_BOTTOM_VH}vh` }}
      />

      {/* California double-yellow centre line */}
      <div
        className="absolute inset-x-0 -translate-y-1/2 flex flex-col gap-1.5 sm:gap-2"
        style={{ top: `${CENTER_VH}vh` }}
      >
        <div className="h-1.5 sm:h-2 bg-amber-400" />
        <div className="h-1.5 sm:h-2 bg-amber-400" />
      </div>

      {/* Caltrans exit sign + cone, planted on the roadside just above the road */}
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
          {hasCone && (
            <div className="relative mb-0.5 w-6 sm:w-7 h-8 sm:h-9 shrink-0 drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
              <svg viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <polygon points="2,28 22,28 20,31 4,31" fill="#c2410c" stroke="#090d16" strokeWidth="1.5" />
                <polygon points="5,28 12,4 19,28" fill="#ea580c" stroke="#090d16" strokeWidth="1.5" />
                <polygon points="8,19 10,13 14,13 16,19" fill="#ffffff" />
                <polygon points="6,25 7,21 17,21 18,25" fill="#ffffff" />
              </svg>
            </div>
          )}

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

      {/* Seal mascot convertible driving its lane (purely visual transition) */}
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
            {/* Ground shadow */}
            <div className="absolute inset-x-[10%] bottom-[4%] h-[16%] rounded-full bg-black/55 blur-md" />
            {/* Exhaust puff */}
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
              draggable={false}
              className="relative h-[clamp(72px,16vh,190px)] w-auto object-contain select-none drop-shadow-[0_10px_18px_rgba(0,0,0,0.6)] pointer-events-none"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
