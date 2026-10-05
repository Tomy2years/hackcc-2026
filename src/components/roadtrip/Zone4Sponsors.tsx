"use client";

import Image from "next/image";

const OC_ANAHEIM_BG = "/assets/roadtrip/zone4-sponsors/oc-anaheim.jpeg";

const sponsors = [
  { name: "AWS", src: "/aws.svg", width: 220, height: 120 },
  { name: "Boot.dev", src: "/bootdev.png", width: 200, height: 120 },
  { name: "Google", src: "/google.svg", width: 220, height: 120 },
];

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
        />
      </div>

      {/* Top & Bottom Gradient Edge Transitions */}
      <div className="absolute inset-x-0 top-0 h-48 sm:h-72 bg-gradient-to-b from-slate-950 via-slate-950/80 via-30% to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-48 sm:h-72 bg-gradient-to-t from-slate-950 via-slate-950/80 via-30% to-transparent z-10 pointer-events-none" />

      <div className="relative z-20 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 pb-16 pt-28 sm:px-10">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-amber-300/90">
            Sponsors
          </p>
          <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">
            Powered by road trip partners
          </h2>
        </div>

        <div className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="flex h-32 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/40 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.35)] backdrop-blur-[2px]"
            >
              <Image
                src={sponsor.src}
                alt={sponsor.name}
                width={sponsor.width}
                height={sponsor.height}
                className="max-h-16 w-auto object-contain brightness-110 contrast-125 sm:max-h-20"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

