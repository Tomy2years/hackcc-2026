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

      <div className="relative z-20 mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-20 sm:px-10">
        <div className="max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-amber-300/90">
            Get Involved
          </p>
          <h2 className="mt-4 text-4xl font-black uppercase tracking-tight text-white sm:text-6xl">
            Join the next stop on the route
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-slate-200 sm:text-lg">
            Whether you&apos;re building, organizing, or backing the event, there&apos;s a place for you in the HackCC community.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
            <Button href="/apply" variant="primary" size="lg" className="min-w-[220px]">
              Hacker Applications
            </Button>
            <Button href="/apply/organizer" variant="primary" size="lg" className="min-w-[220px]">
              Organizer Applications
            </Button>
            <Button href="/sponsor" variant="accent" size="lg" className="min-w-[220px]">
              Sponsor Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}



