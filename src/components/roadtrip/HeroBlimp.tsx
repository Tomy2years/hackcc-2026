"use client";

import { motion } from "framer-motion";

interface HeroBlimpProps {
  className?: string;
}

export default function HeroBlimp({ className = "" }: HeroBlimpProps) {
  return (
    <motion.div
      initial={{ y: 0, rotate: 0.5 }}
      animate={{
        y: [0, -10, 2, -8, 0],
        rotate: [1, -1.2, 0.6, -0.8, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`relative select-none pointer-events-none drop-shadow-[0_14px_28px_rgba(0,0,0,0.6)] ${className}`}
    >
      <svg
        viewBox="0 0 520 215"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
      >
        {/* ─── TAIL FINS (EMPENNAGE - REAR LEFT) ─── */}
        {/* Upper Vertical Fin */}
        <path
          d="M 142 40 L 114 10 Q 86 8 80 18 L 94 48 Z"
          fill="#F8FAFC"
          stroke="#1E293B"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Upper Fin Accent Stripe */}
        <path
          d="M 122 25 L 100 12 L 94 18 L 112 34 Z"
          fill="#F59E0B"
          stroke="#1E293B"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Upper Fin Red Beacon Bulb */}
        <circle cx="106" cy="9" r="4.5" fill="#EF4444" stroke="#1E293B" strokeWidth="2.5" />
        <circle cx="108" cy="7.5" r="1.5" fill="#FFFFFF" />

        {/* Lower Vertical Fin */}
        <path
          d="M 142 114 L 114 148 Q 86 150 80 140 L 94 108 Z"
          fill="#94A3B8"
          stroke="#1E293B"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Lower Fin Accent Stripe */}
        <path
          d="M 122 128 L 100 144 L 94 138 L 112 120 Z"
          fill="#F59E0B"
          stroke="#1E293B"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Horizontal Rudder Fin */}
        <path
          d="M 154 78 L 86 68 Q 72 78 84 88 L 152 81 Z"
          fill="#E2E8F0"
          stroke="#1E293B"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path
          d="M 124 74 L 90 70 L 88 80 L 122 78 Z"
          fill="#F59E0B"
          stroke="#1E293B"
          strokeWidth="2"
        />

        {/* ─── MAIN GAS ENVELOPE (HULL - FLYING RIGHT) ─── */}
        {/* Main Chubby Cartoon Hull Body */}
        <path
          d="M 435 78 C 435 24, 325 16, 215 20 C 130 24, 78 50, 78 78 C 78 106, 130 132, 215 136 C 325 140, 435 132, 435 78 Z"
          fill="#FFFDF8"
          stroke="#1E293B"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Cel-shaded Underbelly Shadow */}
        <path
          d="M 435 78 C 425 110, 345 134, 215 136 C 130 132, 78 106, 78 78 C 115 112, 235 120, 435 78 Z"
          fill="#CBD5E1"
        />

        {/* Bold Cartoon Orange Cheatline Across the Hull */}
        <path
          d="M 435 78 C 375 88, 260 91, 78 78 L 81 90 C 260 104, 375 100, 435 87 Z"
          fill="#F59E0B"
          stroke="#1E293B"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Nose Cone & Mooring Spindle (Front Right) */}
        <path
          d="M 435 68 Q 448 78 435 88 Z"
          fill="#E2E8F0"
          stroke="#1E293B"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <line x1="446" y1="78" x2="460" y2="78" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="462" cy="78" r="4.5" fill="#F59E0B" stroke="#1E293B" strokeWidth="2.5" />

        {/* Specular Cartoon Highlight Arc on Top of Envelope */}
        <path
          d="M 400 32 C 345 24, 245 24, 150 32"
          stroke="#FFFFFF"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* ─── HAND-DRAWN CARTOON SIGN PLACARD (Side of Blimp) ─── */}
        {/* Placard Cartoon Shadow */}
        <rect
          x="144"
          y="34"
          width="270"
          height="60"
          rx="16"
          fill="#0F172A"
          opacity="0.25"
        />

        {/* Main Cartoony Warm Cream Sign Placard */}
        <rect
          x="141"
          y="30"
          width="270"
          height="60"
          rx="16"
          fill="#FFFBEB"
          stroke="#1E293B"
          strokeWidth="3.5"
        />

        {/* Top Mini Header: ★ VENUE ★ */}
        <text
          x="276"
          y="45"
          textAnchor="middle"
          fill="#B45309"
          fontSize="10"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="2.5"
        >
          ★ VENUE ★
        </text>

        {/* Main Cartoon Title: "ORANGE COAST COLLEGE" in Bagel Fat One */}
        <text
          x="276"
          y="67.5"
          textAnchor="middle"
          fill="#0F172A"
          fontSize="21"
          fontWeight="normal"
          style={{ fontFamily: "var(--font-bagel), cursive" }}
        >
          ORANGE COAST COLLEGE
        </text>

        {/* Subtitle: Costa Mesa · Nov 14–15 */}
        <text
          x="276"
          y="81.5"
          textAnchor="middle"
          fill="#9A3412"
          fontSize="9.5"
          fontWeight="800"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="1.2"
        >
          COSTA MESA · NOV 14–15
        </text>

        {/* Corner Rivets */}
        <circle cx="151" cy="40" r="2.5" fill="#1E293B" />
        <circle cx="401" cy="40" r="2.5" fill="#1E293B" />
        <circle cx="151" cy="80" r="2.5" fill="#1E293B" />
        <circle cx="401" cy="80" r="2.5" fill="#1E293B" />

        {/* ─── SUSPENSION STRUTS ─── */}
        <line x1="215" y1="134" x2="215" y2="150" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
        <line x1="285" y1="136" x2="285" y2="150" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
        <line x1="355" y1="134" x2="355" y2="150" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />

        {/* ─── SAMMY THE AVIATOR SEAL PILOT (LOOKING RIGHT / FLYING FORWARD) ─── */}
        {/* Rendered in his natural, original orientation facing right toward the flight path */}
        <image
          href="/assets/mascots/flight-mascot.png"
          x="286"
          y="88"
          width="92"
          height="92"
          preserveAspectRatio="xMidYMid meet"
        />

        {/* Cartoon Cockpit Wrap-around Windshield (lower front right) */}
        <path
          d="M 384 160 Q 380 137 362 133"
          stroke="#1E293B"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 384 160 Q 380 137 362 133 L 360 160 Z"
          fill="#38BDF8"
          opacity="0.45"
        />
        {/* Windshield Reflection Slits */}
        <line x1="376" y1="150" x2="368" y2="138" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />

        {/* Steering Wheel / Control Column */}
        <line x1="366" y1="150" x2="358" y2="155" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="367" cy="148" rx="3.5" ry="6" fill="none" stroke="#1E293B" strokeWidth="2.5" />

        {/* ─── GONDOLA BODY (AIRSHIP CABIN) ─── */}
        {/* Lower cabin structure that frames Sammy in the pilot seat */}
        <path
          d="M 204 150 L 380 150 Q 386 150 386 160 L 384 184 Q 382 192 370 192 L 214 192 Q 200 192 198 182 L 196 160 Q 196 150 204 150 Z"
          fill="#1E293B"
          stroke="#0F172A"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Front Glowing Cartoon Headlight (Facing Right) */}
        <ellipse cx="386" cy="168" rx="3" ry="5.5" fill="#FEF08A" stroke="#0F172A" strokeWidth="2" />
        <circle cx="386.5" cy="166" r="1.5" fill="#FFFFFF" />

        {/* Gondola Bold Orange Racing Stripe */}
        <path
          d="M 196 168 L 385 168"
          stroke="#F59E0B"
          strokeWidth="3"
        />

        {/* Glowing Cartoon Passenger Portholes (Rear Cabin) */}
        {/* Porthole 1 */}
        <circle cx="226" cy="168" r="6.5" fill="#FEF08A" stroke="#0F172A" strokeWidth="2.5" />
        <circle cx="224.5" cy="165.5" r="1.5" fill="#FFFFFF" />

        {/* Porthole 2 */}
        <circle cx="252" cy="168" r="7.5" fill="#FEF08A" stroke="#0F172A" strokeWidth="2.5" />
        <circle cx="250" cy="165.5" r="2" fill="#FFFFFF" />

        {/* Porthole 3 */}
        <circle cx="278" cy="168" r="7.5" fill="#FEF08A" stroke="#0F172A" strokeWidth="2.5" />
        <circle cx="276" cy="165.5" r="2" fill="#FFFFFF" />

        {/* ─── ENGINE POD & STATIC CARTOON PROPELLER (REAR LEFT) ─── */}
        {/* Engine Housing */}
        <rect
          x="183"
          y="160"
          width="13"
          height="16"
          rx="3"
          fill="#334155"
          stroke="#0F172A"
          strokeWidth="2.5"
        />
        {/* Clean Static Cartoon Propeller */}
        <ellipse cx="180" cy="168" rx="3" ry="14" fill="#E2E8F0" stroke="#0F172A" strokeWidth="2" />
        <circle cx="180" cy="168" r="3.5" fill="#F59E0B" stroke="#0F172A" strokeWidth="2" />
        {/* Cartoon Spin Motion Blur Arcs */}
        <path
          d="M 175 156 A 13 13 0 0 0 175 180"
          stroke="#94A3B8"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.65"
        />
      </svg>
    </motion.div>
  );
}
