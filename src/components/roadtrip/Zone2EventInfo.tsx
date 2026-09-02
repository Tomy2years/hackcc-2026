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
    </section>
  );
}



