"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";

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

      {/* Get Involved Content */}
      <div className="relative z-20 flex min-h-screen w-full flex-col items-center justify-center gap-6 px-4 pt-16 pb-32 text-center sm:gap-8 sm:pt-20 sm:pb-40">
        <h2 className="cartoony-title text-5xl sm:text-7xl md:text-8xl">
          Get Involved
        </h2>
        <div className="mt-2 flex w-full flex-row flex-wrap items-center justify-center gap-4 sm:gap-8">
          <Button
            href="/apply"
            variant="primary"
            size="lg"
            className="whitespace-nowrap !text-xl !px-10 !py-5 sm:!text-2xl sm:!px-14 sm:!py-7"
          >
            Hacker Applications
          </Button>
          <Button
            href="/organizer-application"
            variant="secondary"
            size="lg"
            className="whitespace-nowrap !text-xl !px-10 !py-5 sm:!text-2xl sm:!px-14 sm:!py-7"
          >
            Organizer Applications
          </Button>
          <Button
            href="/sponsor-us"
            variant="accent"
            size="lg"
            className="whitespace-nowrap !text-xl !px-10 !py-5 sm:!text-2xl sm:!px-14 sm:!py-7"
          >
            Sponsor Us
          </Button>
        </div>
      </div>
    </section>
  );
}



