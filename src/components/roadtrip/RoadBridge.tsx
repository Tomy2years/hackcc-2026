"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const SEAL_CAR_RIGHT = "/assets/roadtrip/seal-car-right.png";
const SEAL_CAR_LEFT = "/assets/roadtrip/seal-car-left.png";

interface RoadBridgeProps {
  routeNumber: string;
  nextStop: string;
  mileage?: string;
  direction?: "right" | "left";
  signPosition?: "left" | "right";
  hasCone?: boolean;
  /**
   * Nudge the road up off the seam (sm+) so it clears a heading at the top of the next zone.
   * On phones the road is shorter, so it shifts down slightly instead to keep the seam covered.
   */
  lifted?: boolean;
}

export default function RoadBridge({
  routeNumber,
  nextStop,
  mileage = "NEXT EXIT",
  direction = "right",
  signPosition = "right",
  hasCone = true,
  lifted = false,
}: RoadBridgeProps) {
  const bridgeRef = useRef<HTMLDivElement>(null);

  // Track scroll progress as this bridge travels through the viewport
  const { scrollYProgress } = useScroll({
    target: bridgeRef,
    offset: ["start end", "end start"],
  });

  const isRight = direction === "right";

  // ROAD POP-UP ANIMATION:
  // At rest on Scene 1 (scrollYProgress <= 0.0):
  // The road sits just below the bottom of Scene 1 (y: 12px) with opacity: 0 for 100% clean resting view.
  // The instant the user scrolls down (scrollYProgress > 0.0):
  // Opacity immediately hits 1.0. The road enters smoothly from the bottom of the screen (y: 12px -> -88px).
  // Scene 1 is above the road, Scene 2 is below the road. The user NEVER sees the 2 scenes touching without the road between them.
  // Between 0.18 and 0.82:
  // The road is centered on the seam (y: -88px, opacity: 1), and the mascot car drives across.
  // Between 0.80 and 1.00:
  // The road smoothly exits off the top of Scene 2 (y: -88px -> -240px).
  // At rest on Scene 2 (scrollYProgress >= 1.0):
  // The road is completely above the top of Scene 2 (y: -240px) with opacity: 0 for 100% clean resting view.
  const roadPopY = useTransform(
    scrollYProgress,
    [0.0, 0.20, 0.80, 1.0],
    ["12px", "-88px", "-88px", "-240px"]
  );

  const roadOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.02, 0.98, 1.0],
    [0, 1, 1, 0]
  );

  // UNIFORM RESPONSIVE HORIZONTAL DRIVE ACROSS ALL SCREEN SIZES:
  // Container percentage progress: 0% to 100% across the bridge width.
  // Element self-translation percentage: offsets by the car's OWN width (x: -115% to 15%).
  const carLeft = useTransform(
    scrollYProgress,
    [0.18, 0.82],
    isRight ? ["0%", "100%"] : ["100%", "0%"]
  );

  const carTranslateX = useTransform(
    scrollYProgress,
    [0.18, 0.82],
    isRight ? ["-115%", "15%"] : ["15%", "-115%"]
  );

  // Vertical highway curvature undulation & subtle tilt following the road curve
  const carY = useTransform(
    scrollYProgress,
    [0.18, 0.38, 0.62, 0.82],
    isRight ? ["0px", "-4px", "6px", "0px"] : ["0px", "6px", "-4px", "0px"]
  );

  const carRotate = useTransform(
    scrollYProgress,
    [0.18, 0.38, 0.62, 0.82],
    isRight ? [-1.2, 1.6, -1.0, 0.5] : [1.2, -1.6, 1.0, -0.5]
  );

  // Mathematically continuous asphalt road curves across 1440 viewBox width
  const roadPath = isRight
    ? "M -30,45 C 320,15 680,65 1060,35 C 1200,22 1350,38 1470,45 L 1470,155 C 1350,148 1200,132 1060,145 C 680,175 320,125 -30,155 Z"
    : "M -30,40 C 360,70 740,20 1100,50 C 1240,62 1360,48 1470,40 L 1470,150 C 1360,158 1240,172 1100,160 C 740,130 360,180 -30,150 Z";

  // White shoulder lines
  const topShoulderPath = isRight
    ? "M -30,49 C 320,19 680,69 1060,39 C 1200,26 1350,42 1470,49"
    : "M -30,44 C 360,74 740,24 1100,54 C 1240,66 1360,52 1470,44";

  const bottomShoulderPath = isRight
    ? "M -30,151 C 320,121 680,171 1060,141 C 1200,128 1350,144 1470,151"
    : "M -30,146 C 360,176 740,126 1100,156 C 1240,168 1360,154 1470,146";

  // Classic California Double Yellow Highway Center Divider Lines
  const centerLine1 = isRight
    ? "M -30,98 C 320,68 680,118 1060,88 C 1200,75 1350,91 1470,98"
    : "M -30,93 C 360,123 740,73 1100,103 C 1240,115 1360,101 1470,93";

  const centerLine2 = isRight
    ? "M -30,103 C 320,73 680,123 1060,93 C 1200,80 1350,96 1470,103"
    : "M -30,98 C 360,128 740,78 1100,108 C 1240,120 1360,106 1470,98";

  return (
    <div
      ref={bridgeRef}
      className={`relative z-35 w-full h-0 select-none pointer-events-none ${
        lifted ? "translate-y-4 sm:-translate-y-3 md:-translate-y-5" : ""
      }`}
      aria-hidden="true"
    >
      {/* Pop-Up Road Container: Hidden when resting on scenes; pops up right on the seam during scroll */}
      <motion.div
        style={{ y: roadPopY, opacity: roadOpacity }}
        className="absolute left-0 right-0 w-full"
      >
        {/* Highway Asphalt Surface & Road Markings */}
        <svg
          viewBox="0 0 1440 190"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-28 sm:h-36 md:h-44 block drop-shadow-[0_16px_36px_rgba(0,0,0,0.9)]"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Authentic California highway asphalt gradient */}
            <linearGradient id={`asphalt-${routeNumber}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2e3440" />
              <stop offset="45%" stopColor="#222630" />
              <stop offset="100%" stopColor="#1a1d24" />
            </linearGradient>

            {/* Roadside shoulder dirt/curb verge */}
            <linearGradient id="road-curb" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3d372e" />
              <stop offset="100%" stopColor="#1c1917" />
            </linearGradient>
          </defs>

          {/* Underlying Curb Verge */}
          <path
            d={roadPath}
            fill="url(#road-curb)"
            stroke="#0f172a"
            strokeWidth="10"
            strokeLinejoin="round"
          />

          {/* Main Asphalt Highway Surface */}
          <path
            d={roadPath}
            fill={`url(#asphalt-${routeNumber})`}
            stroke="#090d16"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* Solid White Shoulder Lines */}
          <path
            d={topShoulderPath}
            stroke="#ffffff"
            strokeWidth="3.5"
            strokeOpacity="0.95"
            strokeLinecap="round"
          />
          <path
            d={bottomShoulderPath}
            stroke="#ffffff"
            strokeWidth="3.5"
            strokeOpacity="0.95"
            strokeLinecap="round"
          />

          {/* Double Yellow Divider Lines */}
          <path
            d={centerLine1}
            stroke="#fbbf24"
            strokeWidth="3"
            strokeDasharray="22 14"
            strokeLinecap="round"
          />
          <path
            d={centerLine2}
            stroke="#fbbf24"
            strokeWidth="3"
            strokeDasharray="22 14"
            strokeLinecap="round"
          />

          {/* Reflective Roadside Pavement Markers */}
          <circle cx="280" cy={isRight ? 53 : 43} r="3" fill="#ffffff" />
          <circle cx="560" cy={isRight ? 66 : 39} r="3" fill="#ffffff" />
          <circle cx="840" cy={isRight ? 49 : 45} r="3" fill="#ffffff" />
          <circle cx="1120" cy={isRight ? 33 : 55} r="3" fill="#ffffff" />
        </svg>

        {/* Proportional Caltrans Highway Exit Sign & Traffic Cone */}
        <div
          className={`absolute top-1 sm:top-2 md:top-3 z-35 flex items-end gap-3 ${
            signPosition === "right"
              ? "right-4 sm:right-10 md:right-16 lg:right-24"
              : "left-4 sm:left-10 md:left-16 lg:left-24"
          }`}
        >
          {/* Optional Traffic Cone */}
          {hasCone && (
            <div className="relative mb-0.5 sm:mb-1 w-5 sm:w-6 h-7 sm:h-8 shrink-0 drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
              <svg viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <polygon points="2,28 22,28 20,31 4,31" fill="#c2410c" stroke="#090d16" strokeWidth="1.5" />
                <polygon points="5,28 12,4 19,28" fill="#ea580c" stroke="#090d16" strokeWidth="1.5" />
                <polygon points="8,19 10,13 14,13 16,19" fill="#ffffff" />
                <polygon points="6,25 7,21 17,21 18,25" fill="#ffffff" />
              </svg>
            </div>
          )}

          {/* Green Caltrans Highway Sign */}
          <div className="relative flex flex-col items-center drop-shadow-[0_8px_20px_rgba(0,0,0,0.75)]">
            {/* Main Green Signboard */}
            <div className="relative z-10 bg-[#15803D] border-2 border-slate-950 rounded-lg sm:rounded-xl px-2.5 sm:px-3.5 py-1.5 sm:py-2 min-w-[130px] sm:min-w-[160px] md:min-w-[175px]">
              <div className="absolute inset-0.5 sm:inset-1 border border-white/90 rounded-md sm:rounded-lg pointer-events-none" />

              {/* Top Row: Route Shield Badge & Mileage */}
              <div className="relative z-10 flex items-center justify-between gap-2 mb-1">
                <span className="inline-flex items-center justify-center bg-white text-[#15803D] font-mono font-black text-[9px] sm:text-[11px] px-1.5 py-0.5 rounded border border-slate-950 shadow-sm leading-none">
                  {routeNumber}
                </span>
                <span className="font-sans font-extrabold text-[8px] sm:text-[10px] text-white/95 uppercase tracking-wider">
                  {mileage}
                </span>
              </div>

              {/* Bottom Row: Next Stop Name & Direction Arrow */}
              <div className="relative z-10 flex items-center justify-between gap-2 pt-0.5">
                <span className="font-sans font-black text-xs sm:text-sm text-white uppercase tracking-wide">
                  {nextStop}
                </span>
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0 ${
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

            {/* Metal Signposts anchored to the road verge */}
            <div className="flex justify-between w-4/5 -mt-0.5 pointer-events-none">
              <div className="w-1 sm:w-1.5 h-7 sm:h-9 bg-slate-500 border-x border-slate-950 rounded-b-sm" />
              <div className="w-1 sm:w-1.5 h-7 sm:h-9 bg-slate-500 border-x border-slate-950 rounded-b-sm" />
            </div>
          </div>
        </div>

        {/* Animated Seal in Sports Car Driving Across the Road */}
        <motion.div
          style={{
            left: carLeft,
            x: carTranslateX,
            y: carY,
            rotate: carRotate,
          }}
          className={`absolute z-40 pointer-events-none will-change-transform ${
            isRight ? "bottom-3 sm:bottom-5 md:bottom-7" : "bottom-5 sm:bottom-7 md:bottom-9"
          }`}
        >
          {/* Subtle suspension driving bounce */}
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 0.45, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-28 sm:w-36 md:w-44 lg:w-48 drop-shadow-[0_12px_22px_rgba(0,0,0,0.85)]"
          >
            {/* Subtle cartoon exhaust puff behind rear bumper */}
            <div
              className={`absolute bottom-1.5 w-3 h-2 rounded-full bg-slate-300/40 blur-[1px] animate-ping pointer-events-none ${
                isRight ? "-left-2" : "-right-2"
              }`}
            />

            <Image
              src={isRight ? SEAL_CAR_RIGHT : SEAL_CAR_LEFT}
              alt={
                isRight
                  ? "HackCC Seal Mascot Driving Convertible Right"
                  : "HackCC Seal Mascot Driving Convertible Left"
              }
              width={578}
              height={358}
              className="w-full h-auto object-contain select-none"
              priority
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
