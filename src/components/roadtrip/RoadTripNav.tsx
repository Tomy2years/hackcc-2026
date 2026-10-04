"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function RoadTripNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkScene, setIsDarkScene] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position to transition menu background from daytime/light to dark scenes
  useEffect(() => {
    const handleScroll = () => {
      // In Zone1Hero, night mode latches when scroll reaches 0.38 * window.innerHeight
      // Once night-time is reached, it stays night unless page is reloaded.
      const nightThreshold = window.innerHeight * 0.38;

      if (window.scrollY >= nightThreshold) {
        setIsDarkScene(true);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        {/* Main Center Navigation Links */}
        <div className="flex-1 flex justify-center">
          <nav className="flex items-center justify-center gap-6 sm:gap-10 text-lg sm:text-xl md:text-2xl font-black tracking-wider text-white font-[var(--font-mont)]">
            <a
              href="#zone-about"
              className="hover:text-amber-300 hover:scale-105 transition-all duration-200 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
            >
              About
            </a>
            <a
              href="#zone-sponsors"
              className="hover:text-amber-300 hover:scale-105 transition-all duration-200 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
            >
              Sponsors
            </a>
            <a
              href="#zone-faq"
              className="hover:text-amber-300 hover:scale-105 transition-all duration-200 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
            >
              FAQ
            </a>
            <a
              href="#zone-apply"
              className="hover:text-amber-300 hover:scale-105 transition-all duration-200 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
            >
              Get Involved
            </a>
          </nav>
        </div>

        {/* Far Top-Right Minimalist 3-Lines Icon Button & Unboxed Menu */}
        <div ref={containerRef} className="absolute right-4 sm:right-6 lg:right-8 top-0">
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
                className={`absolute right-0 top-full mt-2 w-64 sm:w-72 rounded-2xl backdrop-blur-xl p-3.5 shadow-2xl z-50 pointer-events-auto space-y-2.5 transition-colors duration-300 ${
                  isDarkScene
                    ? "bg-slate-900/80 border border-white/20 shadow-black/60"
                    : "bg-slate-200/85 border border-white/60 shadow-slate-900/20"
                }`}
              >
                {/* Header: Bigger Borderless HackCC Emblem on left & Bold 2026 ROAD TRIP title aligned to right */}
                <div
                  className={`flex items-center justify-between gap-3 pb-2.5 border-b transition-colors duration-300 ${
                    isDarkScene ? "border-white/15" : "border-slate-300/70"
                  }`}
                >
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
                    <span
                      className={`text-xs sm:text-[13px] font-black tracking-wider uppercase font-[var(--font-mont)] transition-colors duration-300 ${
                        isDarkScene ? "text-amber-400" : "text-amber-700"
                      }`}
                    >
                      2026 ROAD TRIP
                    </span>
                  </div>
                </div>

                {/* Road Sign Numbered Links */}
                <div className="space-y-1">
                  <Link
                    href="/organizers"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between p-2 rounded-xl transition-all duration-150 group ${
                      isDarkScene ? "hover:bg-white/10" : "hover:bg-slate-300/50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {/* Green Caltrans Highway Road Sign */}
                      <span className="shrink-0 bg-[#15803D] text-white border border-white font-mono font-black text-xs px-2 py-0.5 rounded shadow-sm group-hover:scale-105 transition-transform">
                        1
                      </span>
                      <span
                        className={`font-bold text-sm transition-colors font-[var(--font-mont)] ${
                          isDarkScene
                            ? "text-white group-hover:text-amber-300"
                            : "text-slate-800 group-hover:text-amber-700"
                        }`}
                      >
                        Organizers
                      </span>
                    </div>
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-all group-hover:translate-x-0.5 ${
                        isDarkScene
                          ? "text-slate-400 group-hover:text-amber-300"
                          : "text-slate-500 group-hover:text-amber-700"
                      }`}
                    />
                  </Link>

                  <Link
                    href="/2026"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between p-2 rounded-xl transition-all duration-150 group ${
                      isDarkScene ? "hover:bg-white/10" : "hover:bg-slate-300/50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {/* Green Caltrans Highway Road Sign */}
                      <span className="shrink-0 bg-[#15803D] text-white border border-white font-mono font-black text-xs px-2 py-0.5 rounded shadow-sm group-hover:scale-105 transition-transform">
                        2
                      </span>
                      <span
                        className={`font-bold text-sm transition-colors font-[var(--font-mont)] ${
                          isDarkScene
                            ? "text-white group-hover:text-amber-300"
                            : "text-slate-800 group-hover:text-amber-700"
                        }`}
                      >
                        Archive
                      </span>
                    </div>
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-all group-hover:translate-x-0.5 ${
                        isDarkScene
                          ? "text-slate-400 group-hover:text-amber-300"
                          : "text-slate-500 group-hover:text-amber-700"
                      }`}
                    />
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






