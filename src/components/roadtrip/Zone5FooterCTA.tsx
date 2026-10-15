"use client";

import Link from "next/link";

export default function Zone5FooterCTA() {
  return (
    <section
      id="zone-apply"
      className="relative min-h-screen sm:h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8"
    >

      <div className="relative z-20 mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-6 py-8 sm:px-10 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Classy Serif Italic Hook - Enriched & larger for effortless readability */}
          <p className="font-serif italic text-amber-300 font-semibold text-2xl sm:text-3xl md:text-4xl tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            Ready to hit the road?
          </p>

          {/* Monumental Headline - Big, proud & high-contrast */}
          <h2 className="mt-2 sm:mt-4 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal uppercase tracking-tight text-white font-heading leading-[1.04] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] drop-shadow-[0_12px_32px_rgba(0,0,0,0.9)]">
            JOIN THE NEXT STOP ON THE ROUTE
          </h2>

          {/* Cohesive California Road Trip CTA Buttons: Larger buttons, Hacker Applications centered & largest, Sponsor Us green, Organizer Applications styled as is */}
          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            {/* Secondary Action: Deep Coastal Twilight Glass */}
            <Link
              href="/apply/organizer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-950/70 hover:bg-slate-900/95 border border-white/30 hover:border-amber-400 text-white font-bold text-base sm:text-lg px-8 sm:px-9 py-4 sm:py-4.5 rounded-full backdrop-blur-md shadow-xl shadow-black/40 transition-all transform hover:scale-105 active:scale-95 cursor-pointer order-2 sm:order-1"
            >
              <span>Organizer Applications</span>
            </Link>

            {/* Main Attraction: Solid Warm Sunset Amber (Centered, Largest & Highlighted) */}
            <Link
              href="/apply"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-lg sm:text-xl md:text-2xl px-10 sm:px-12 py-4.5 sm:py-5.5 rounded-full shadow-2xl shadow-amber-400/35 transition-all transform hover:scale-105 active:scale-95 group cursor-pointer order-1 sm:order-2"
            >
              <span>Hacker Applications</span>
              <span className="text-xl sm:text-2xl transition-transform group-hover:translate-x-1.5">→</span>
            </Link>

            {/* Partner Action: California Road Trip Green */}
            <Link
              href="/sponsor"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 border border-emerald-400/50 hover:border-emerald-300 text-white font-bold text-base sm:text-lg px-8 sm:px-9 py-4 sm:py-4.5 rounded-full backdrop-blur-md shadow-xl shadow-emerald-950/50 transition-all transform hover:scale-105 active:scale-95 cursor-pointer order-3 sm:order-3"
            >
              <span>Sponsor Us</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
