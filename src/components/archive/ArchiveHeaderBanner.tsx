"use client";

import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

interface ArchiveHeaderBannerProps {
  currentYear: "2024" | "2025" | "2026";
}

const ARCHIVE_EDITIONS = [
  { year: "2024", label: "2024", href: "/archive/2024", route: "ROUTE 24" },
  { year: "2025", label: "2025", href: "/archive/2025", route: "ROUTE 25" },
  { year: "2026", label: "2026", href: "/archive/2026", route: "ROUTE 26" },
];

export default function ArchiveHeaderBanner({ currentYear }: ArchiveHeaderBannerProps) {
  return (
    <div className="sticky top-0 z-50 w-full bg-slate-950/90 backdrop-blur-md border-b border-white/15 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
        {/* Left: Back to Archive Hub & Brand */}
        <div className="flex items-center gap-3">
          <Link
            href="/archive"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-all font-semibold active:scale-95"
            aria-label="Back to Archive Hub"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">All Archives</span>
            <span className="sm:hidden">Archives</span>
          </Link>

          <div className="h-4 w-px bg-white/20 hidden md:block" />

          <div className="flex items-center gap-2">
            <span className="bg-[#15803D] text-white border border-white/40 font-mono font-black text-[10px] sm:text-xs px-2 py-0.5 rounded shadow-sm">
              ROUTE {currentYear.slice(2)}
            </span>
            <span className="font-heading tracking-wide text-white drop-shadow-sm text-sm sm:text-base">
              HackCC {currentYear} Archive
            </span>
          </div>
        </div>

        {/* Center / Right: Year Switcher Pills & Live Site Link */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-slate-400 font-mono text-[11px] hidden lg:inline">JUMP:</span>
          <div className="flex items-center bg-slate-900/90 rounded-lg p-0.5 border border-white/10">
            {ARCHIVE_EDITIONS.map((edition) => {
              const isActive = edition.year === currentYear;
              return (
                <Link
                  key={edition.year}
                  href={edition.href}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-all ${
                    isActive
                      ? "bg-amber-400 text-slate-950 shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {edition.label}
                </Link>
              );
            })}
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500/20 to-amber-400/20 hover:from-amber-500/30 hover:to-amber-400/30 border border-amber-400/40 text-amber-300 hover:text-amber-200 font-semibold transition-all active:scale-95"
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">2026 Live Road Trip</span>
            <span className="sm:hidden">Live Site</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
