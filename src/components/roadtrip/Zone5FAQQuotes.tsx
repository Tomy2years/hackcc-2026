"use client";

import Image from "next/image";

const DOUBLE_DOME_BG = "/assets/roadtrip/zone5-faq/Double-Dome.jpg";

export default function Zone5FAQQuotes() {
  return (
    <section id="zone-faq" className="relative min-h-screen w-full overflow-hidden">
      {/* Full-Screen Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={DOUBLE_DOME_BG}
          alt="PCH San Onofre Double Domes Background"
          fill
          className="object-cover object-center"
        />
        {/* Daytime Contrast Scrim Layer (Darkens bright sky for text legibility) */}
        <div className="absolute inset-0 bg-slate-950/45" />
      </div>

      {/* Top & Bottom Gradient Edge Transitions */}
      <div className="absolute inset-x-0 top-0 h-48 sm:h-72 bg-gradient-to-b from-slate-950 via-slate-950/80 via-30% to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-48 sm:h-72 bg-gradient-to-t from-slate-950 via-slate-950/80 via-30% to-transparent z-10 pointer-events-none" />
    </section>
  );
}

