"use client";

import Image from "next/image";

const SANTA_MONICA_PIER_BG_NIGHTTIME = "/assets/roadtrip/zone3-about/santa-monica-pier-bg-nighttime.jpeg";

export default function Zone3About() {
  return (
    <section id="zone-about" className="relative min-h-screen w-full overflow-hidden">
      {/* Full-Screen Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={SANTA_MONICA_PIER_BG_NIGHTTIME}
          alt="Santa Monica Pier Nighttime Background"
          fill
          className="object-cover object-center"
        />
        {/* Contrast Scrim Layer */}
        <div className="absolute inset-0 bg-slate-950/40" />
      </div>

      {/* Top & Bottom Gradient Edge Transitions */}
      <div className="absolute inset-x-0 top-0 h-48 sm:h-72 bg-gradient-to-b from-slate-950 via-slate-950/80 via-30% to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-48 sm:h-72 bg-gradient-to-t from-slate-950 via-slate-950/80 via-30% to-transparent z-10 pointer-events-none" />
    </section>
  );
}

