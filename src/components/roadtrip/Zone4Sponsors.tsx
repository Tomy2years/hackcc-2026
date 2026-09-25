"use client";

import Image from "next/image";

const OC_ANAHEIM_BG = "/assets/roadtrip/zone4-sponsors/oc-anaheim.jpeg";

export default function Zone4Sponsors() {
  return (
    <section id="zone-sponsors" className="relative min-h-screen w-full overflow-hidden">
      {/* Full-Screen Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={OC_ANAHEIM_BG}
          alt="Orange County and Anaheim Night Background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Top & Bottom Gradient Edge Transitions */}
      <div className="absolute inset-x-0 top-0 h-48 sm:h-72 bg-gradient-to-b from-slate-950 via-slate-950/80 via-30% to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-48 sm:h-72 bg-gradient-to-t from-slate-950 via-slate-950/80 via-30% to-transparent z-10 pointer-events-none" />
    </section>
  );
}

