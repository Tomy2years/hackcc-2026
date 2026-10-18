"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { navigateToZone } from "@/components/roadtrip/zoneScroll";

export default function RoadTripNav() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close menu on Escape key press or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent py-4 sm:py-6 pointer-events-none">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between pointer-events-auto relative">
        {/* Mobile Left Brand Emblem (Tap to scroll to top) */}
        <div className="md:hidden flex items-center">
          <Link
            href="/"
            onClick={(e) => {
              if (window.location.pathname === "/" || window.location.pathname.startsWith("/zone-")) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            aria-label="HackCC Home"
            className="flex items-center gap-2 group p-1.5 -ml-1.5 rounded-xl hover:bg-white/10 active:scale-95 transition-all"
          >
            <div className="w-8 h-8 relative shrink-0">
              <Image
                src="/images/hackcc-icon.png"
                alt="HackCC Logo"
                width={32}
                height={32}
                className="w-full h-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform"
              />
            </div>
            <span className="font-heading text-base tracking-wider text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] group-hover:text-amber-300 transition-colors">
              HACKCC
            </span>
          </Link>
        </div>

        {/* Main Center Navigation Links (Hidden on mobile to prevent overlapping top-right menu) */}
        <div className="hidden md:flex flex-1 justify-center">
          <nav className="flex items-center justify-center gap-6 lg:gap-10 text-lg md:text-xl lg:text-2xl font-black tracking-wider text-white font-[var(--font-mont)]">
            <a
              href="/zone-about"
              onClick={(e) => navigateToZone(e, "zone-about", "/zone-about")}
              className="hover:text-amber-300 hover:scale-105 transition-all duration-200 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
            >
              About
            </a>
            <a
              href="/zone-sponsors"
              onClick={(e) => navigateToZone(e, "zone-sponsors", "/zone-sponsors")}
              className="hover:text-amber-300 hover:scale-105 transition-all duration-200 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
            >
              Sponsors
            </a>
            <a
              href="/zone-faq"
              onClick={(e) => navigateToZone(e, "zone-faq", "/zone-faq")}
              className="hover:text-amber-300 hover:scale-105 transition-all duration-200 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
            >
              FAQ
            </a>
            <a
              href="/zone-apply"
              onClick={(e) => navigateToZone(e, "zone-apply", "/zone-apply")}
              className="hover:text-amber-300 hover:scale-105 transition-all duration-200 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
            >
              Get Involved
            </a>
          </nav>
        </div>

        {/* Far Top-Right Minimalist 3-Lines Icon Button & Unboxed Menu */}
        <div ref={containerRef} className="relative md:absolute md:right-6 lg:right-8 flex items-center">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 flex flex-col justify-center gap-1.5 cursor-pointer hover:scale-110 active:scale-95 transition-all duration-200"
          >
            {/* 3 Horizontal white lines with drop shadow */}
            <span
              className={`w-6 h-0.5 rounded-full bg-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-2 bg-amber-400" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 rounded-full bg-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 rounded-full bg-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2 bg-amber-400" : ""
              }`}
            />
          </button>

          {/* Far Top-Right Translucent Frosted Menu with Logo & Highway Road Sign Badges */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -4 }}
                style={{ transformOrigin: "top right" }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 300,
                  duration: 0.25,
                }}
                className="absolute right-0 top-full mt-2 w-64 sm:w-72 rounded-2xl backdrop-blur-xl p-3.5 shadow-2xl z-50 pointer-events-auto space-y-2.5 bg-slate-900/95 border border-white/20 shadow-black/60 max-h-[calc(100vh-5rem)] overflow-y-auto"
              >
                {/* Header: Bigger Borderless HackCC Emblem on left & Bold 2026 ROAD TRIP title aligned to right */}
                <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-white/15">
                  <div className="w-11 h-11 flex items-center justify-center shrink-0">
                    <Image
                      src="/images/hackcc-icon.png"
                      alt="HackCC Logo"
                      width={44}
                      height={44}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col justify-center text-right ml-auto">
                    <span className="text-xs sm:text-[13px] font-black tracking-wider uppercase font-[var(--font-mont)] text-amber-400">
                      2026 ROAD TRIP
                    </span>
                  </div>
                </div>

                {/* Mobile-Only Road Trip Zone Navigation */}
                <div className="md:hidden space-y-1 pb-2 border-b border-white/15">
                  <div className="px-2.5 py-1 text-[10px] font-mono font-black uppercase tracking-wider text-amber-400">
                    Road Trip Stops
                  </div>
                  <a
                    href="/zone-about"
                    onClick={(e) => {
                      setIsOpen(false);
                      navigateToZone(e, "zone-about", "/zone-about");
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl transition-all duration-150 group hover:bg-white/10"
                  >
                    <span className="font-bold text-sm transition-colors font-[var(--font-mont)] text-white group-hover:text-amber-300">
                      About
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 transition-all text-slate-400 group-hover:translate-x-0.5 group-hover:text-amber-300" />
                  </a>

                  <a
                    href="/zone-sponsors"
                    onClick={(e) => {
                      setIsOpen(false);
                      navigateToZone(e, "zone-sponsors", "/zone-sponsors");
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl transition-all duration-150 group hover:bg-white/10"
                  >
                    <span className="font-bold text-sm transition-colors font-[var(--font-mont)] text-white group-hover:text-amber-300">
                      Sponsors
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 transition-all text-slate-400 group-hover:translate-x-0.5 group-hover:text-amber-300" />
                  </a>

                  <a
                    href="/zone-faq"
                    onClick={(e) => {
                      setIsOpen(false);
                      navigateToZone(e, "zone-faq", "/zone-faq");
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl transition-all duration-150 group hover:bg-white/10"
                  >
                    <span className="font-bold text-sm transition-colors font-[var(--font-mont)] text-white group-hover:text-amber-300">
                      FAQ
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 transition-all text-slate-400 group-hover:translate-x-0.5 group-hover:text-amber-300" />
                  </a>

                  <a
                    href="/zone-apply"
                    onClick={(e) => {
                      setIsOpen(false);
                      navigateToZone(e, "zone-apply", "/zone-apply");
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl transition-all duration-150 group hover:bg-white/10"
                  >
                    <span className="font-bold text-sm transition-colors font-[var(--font-mont)] text-amber-400 group-hover:text-amber-300">
                      Get Involved
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 transition-all text-amber-400 group-hover:translate-x-0.5 group-hover:text-amber-300" />
                  </a>
                </div>

                {/* Road Sign Numbered Links */}
                <div className="space-y-1 pt-1 md:pt-0">
                  <div className="md:hidden px-2.5 py-1 text-[10px] font-mono font-black uppercase tracking-wider text-slate-400">
                    Directory
                  </div>
                  <Link
                    href="/organizers"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-2 rounded-xl transition-all duration-150 group hover:bg-white/10"
                  >
                    <div className="flex items-center gap-2.5">
                      {/* Green Caltrans Highway Road Sign */}
                      <span className="shrink-0 bg-[#15803D] text-white border border-white font-mono font-black text-xs px-2 py-0.5 rounded shadow-sm group-hover:scale-105 transition-transform">
                        1
                      </span>
                      <span className="font-bold text-sm transition-colors font-[var(--font-mont)] text-white group-hover:text-amber-300">
                        Organizers
                      </span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 transition-all text-slate-400 group-hover:translate-x-0.5 group-hover:text-amber-300" />
                  </Link>

                  <Link
                    href="/2026"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-2 rounded-xl transition-all duration-150 group hover:bg-white/10"
                  >
                    <div className="flex items-center gap-2.5">
                      {/* Green Caltrans Highway Road Sign */}
                      <span className="shrink-0 bg-[#15803D] text-white border border-white font-mono font-black text-xs px-2 py-0.5 rounded shadow-sm group-hover:scale-105 transition-transform">
                        2
                      </span>
                      <span className="font-bold text-sm transition-colors font-[var(--font-mont)] text-white group-hover:text-amber-300">
                        Archive
                      </span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 transition-all text-slate-400 group-hover:translate-x-0.5 group-hover:text-amber-300" />
                  </Link>

                  <Link
                    href="/sponsors"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-2 rounded-xl transition-all duration-150 group hover:bg-white/10"
                  >
                    <div className="flex items-center gap-2.5">
                      {/* Green Caltrans Highway Road Sign */}
                      <span className="shrink-0 bg-[#15803D] text-white border border-white font-mono font-black text-xs px-2 py-0.5 rounded shadow-sm group-hover:scale-105 transition-transform">
                        3
                      </span>
                      <span className="font-bold text-sm transition-colors font-[var(--font-mont)] text-white group-hover:text-amber-300">
                        Sponsor Us
                      </span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 transition-all text-slate-400 group-hover:translate-x-0.5 group-hover:text-amber-300" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}






