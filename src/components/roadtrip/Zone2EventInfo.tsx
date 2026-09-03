"use client";

import Image from "next/image";

const INGLEWOOD_ART = "/assets/roadtrip/zone2-details/inglewood.jpeg";

export default function Zone2EventInfo() {
  return (
    <section id="zone-details" className="relative min-h-screen w-full overflow-hidden">
      {/* Full-Screen Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={INGLEWOOD_ART}
          alt="Inglewood Night Skyline Background"
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



