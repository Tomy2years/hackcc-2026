"use client";

import Image from "next/image";

const SAN_DIEGO_BEACH_BG = "/assets/roadtrip/zone6-cta-footer/San-Diego-Beach.jpg";

export default function Zone6FooterCTA() {
  return (
    <section id="zone-apply" className="relative min-h-screen w-full overflow-hidden">
      {/* Full-Screen Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={SAN_DIEGO_BEACH_BG}
          alt="San Diego Beach Background"
          fill
          className="object-cover object-center"
        />
        {/* Contrast Scrim Layer (Darkens bright beach sky & sunset for text legibility) */}
        <div className="absolute inset-0 bg-slate-950/45" />
      </div>

      {/* Top & Bottom Gradient Edge Transitions */}
      <div className="absolute inset-x-0 top-0 h-48 sm:h-72 bg-gradient-to-b from-slate-950 via-slate-950/80 via-30% to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-48 sm:h-72 bg-gradient-to-t from-slate-950 via-slate-950/80 via-30% to-transparent z-10 pointer-events-none" />
    </section>
  );
}



