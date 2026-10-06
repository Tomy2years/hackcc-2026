import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import hackccIcon from "../../../public/images/hackcc-icon.png";

const SCENIC_BG = "/assets/roadtrip/zone6-cta-footer/San-Diego-Beach.jpg";

/** Shown at /apply once REGISTRATION_CLOSES_AT has passed. */
export function RegistrationClosed() {
  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 font-sans overflow-x-hidden">
      <div className="fixed inset-0 z-0 w-full h-full overflow-hidden">
        <Image src={SCENIC_BG} alt="San Diego beach at sunset" fill priority className="object-cover object-center scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-slate-950/85 pointer-events-none" />
      </div>

      <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/40 border-b border-white/10 px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="w-full flex items-center justify-between gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400 transition-transform group-hover:-translate-x-1" />
            <span>Back to main site</span>
          </Link>
          <div className="flex items-center gap-2.5">
            <Image src={hackccIcon} alt="HackCC Logo" width={36} height={36} className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
            <span className="font-heading text-base sm:text-lg tracking-wider text-amber-400 hidden sm:inline-block">HACKCC 2026</span>
          </div>
        </div>
      </header>

      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24 text-center">
        <p className="font-serif italic text-amber-200/95 text-lg sm:text-2xl font-light tracking-wide mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
          The gates are down
        </p>
        <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl text-white leading-[1.08] tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
          REGISTRATION HAS CLOSED
        </h1>
        <p className="text-slate-200 text-base sm:text-lg max-w-lg mx-auto mt-5 leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
          Thanks for your interest in HackCC 2026. Registration is no longer accepting new submissions.
          Questions? Email <a href="mailto:team@hackcc.net" className="font-bold text-amber-300 underline underline-offset-4">team@hackcc.net</a>.
        </p>
        <div className="mt-10 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-8 py-3.5 rounded-full text-base shadow-xl shadow-black/40 transition-all hover:scale-105 active:scale-95"
          >
            <span>Back to main site</span>
            <span className="text-lg">→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
