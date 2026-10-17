"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { navigateToZone } from "@/components/roadtrip/zoneScroll";

// The King Seal mascot
const KING_MASCOT = "/assets/mascots/king-mascot.png";

export default function RoadTripFooter() {
  return (
    <footer className="relative w-full overflow-hidden text-slate-100 font-sans border-t border-white/20">
      {/* Tiny subtle top hairline indicator so it's clear to the user this is the footer area */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent z-10" />

      {/* Soft Coastal Shadow: lets the dunes, rocks & trail remain visible while guaranteeing 100% text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/60 to-[#020617]/95 pointer-events-none" />

      {/* Main Footer Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-8 lg:gap-12">
          {/* Left Empty Space: King Sammy Mascot */}
          <div className="hidden lg:flex flex-col items-center shrink-0 select-none">
            <div className="group relative cursor-pointer">
              <Image
                src={KING_MASCOT}
                alt="King Sammy Mascot"
                width={150}
                height={150}
                draggable={false}
                className="w-28 xl:w-36 h-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)] group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-300 pointer-events-none select-none"
              />
              {/* Character shadow on beach ground */}
              <div className="w-20 xl:w-24 h-2.5 bg-black/50 rounded-full blur-[3px] mx-auto -mt-2 group-hover:scale-75 transition-all duration-300" />
            </div>
          </div>

          {/* Center: The original information */}
          <div className="flex-1 w-full max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12">
              {/* Col 1: Branding & Mission (Span 5) */}
              <div className="md:col-span-5 space-y-4">
                <div className="flex items-start gap-3">
                  {/* On mobile/tablet, show King Sammy beside the brand */}
                  <div className="lg:hidden shrink-0 mt-0.5">
                    <Image
                      src={KING_MASCOT}
                      alt="King Sammy Mascot"
                      width={56}
                      height={56}
                      draggable={false}
                      className="w-12 h-12 object-contain drop-shadow-md pointer-events-none select-none"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="font-heading text-2xl sm:text-3xl text-white tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                        HackCC
                      </span>
                      <span className="bg-[#15803D] text-white border border-white/60 font-mono font-black text-[11px] px-2 py-0.5 rounded shadow-sm">
                        ROUTE 2026
                      </span>
                    </div>

                    <p className="mt-2 text-slate-300 text-sm leading-relaxed max-w-sm drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                      California&apos;s premier hackathon dedicated entirely to empowering, connecting, and celebrating community college students across the state.
                    </p>
                  </div>
                </div>

                {/* Social Icons */}
                <div className="flex items-center gap-4 pt-1">
                  <a
                    href="https://discord.gg/yRShGV7Py4"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="HackCC Discord"
                    className="w-14 h-14 rounded-2xl bg-white/10 hover:bg-[#5865F2] border border-white/20 hover:border-transparent text-white flex items-center justify-center text-3xl transition-all shadow-lg hover:scale-110 active:scale-95 group"
                  >
                    <FontAwesomeIcon icon={faDiscord} className="w-8 h-8" />
                  </a>
                  <a
                    href="https://www.instagram.com/realhackcc/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="HackCC Instagram"
                    className="w-14 h-14 rounded-2xl bg-white/10 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] border border-white/20 hover:border-transparent text-white flex items-center justify-center text-3xl transition-all shadow-lg hover:scale-110 active:scale-95 group"
                  >
                    <FontAwesomeIcon icon={faInstagram} className="w-8 h-8" />
                  </a>
                </div>
              </div>

              {/* Col 2: Navigation Links (Span 3) */}
              <div className="md:col-span-3 space-y-3">
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                  Roadmap &amp; Zones
                </h3>
                <ul className="space-y-2.5 text-sm">
                  <li>
                    <a
                      href="/zone-about"
                      onClick={(e) => navigateToZone(e, "zone-about", "/zone-about")}
                      className="text-slate-300 hover:text-white transition-colors drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]"
                    >
                      About HackCC
                    </a>
                  </li>
                  <li>
                    <a
                      href="/zone-sponsors"
                      onClick={(e) => navigateToZone(e, "zone-sponsors", "/zone-sponsors")}
                      className="text-slate-300 hover:text-white transition-colors drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]"
                    >
                      Sponsors &amp; Partners
                    </a>
                  </li>
                  <li>
                    <a
                      href="/zone-faq"
                      onClick={(e) => navigateToZone(e, "zone-faq", "/zone-faq")}
                      className="text-slate-300 hover:text-white transition-colors drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]"
                    >
                      FAQ &amp; Testimonials
                    </a>
                  </li>
                  <li>
                    <a
                      href="/zone-apply"
                      onClick={(e) => navigateToZone(e, "zone-apply", "/zone-apply")}
                      className="text-slate-300 hover:text-white transition-colors drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]"
                    >
                      Apply &amp; Get Involved
                    </a>
                  </li>
                </ul>
              </div>

              {/* Col 3: Resources & Directory (Span 4) */}
              <div className="md:col-span-4 space-y-3">
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                  Community &amp; Directory
                </h3>
                <ul className="space-y-2.5 text-sm">
                  <li>
                    <Link
                      href="/organizers"
                      className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]"
                    >
                      <span>Organizing Team</span>
                      <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-amber-300 font-mono">
                        MEET THE CREW
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sponsors"
                      className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]"
                    >
                      <span>Sponsor Us</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.5 rounded font-mono">
                        PARTNER
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/2026"
                      className="text-slate-300 hover:text-white transition-colors drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]"
                    >
                      Archive (HackCC 2026)
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/apply"
                      className="text-amber-300 hover:text-amber-200 font-bold transition-colors inline-flex items-center gap-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
                    >
                      <span>Participant Application</span>
                      <span>→</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar: Copyright & Caltrans Roadtrip Badge */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
            &copy; 2026 HackCC. Built with pride for California community college students.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 font-mono text-[11px]">CALIFORNIA ROAD TRIP</span>
            <span className="text-white/20">•</span>
            <a
              href="/zone-hero"
              onClick={(e) => navigateToZone(e, "zone-hero", "/")}
              className="hover:text-amber-300 transition-colors font-medium flex items-center gap-1"
            >
              <span>Back to top</span>
              <span>↑</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
