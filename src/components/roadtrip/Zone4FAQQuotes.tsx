"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DOUBLE_DOME_BG = "/assets/roadtrip/zone5-faq/Double-Dome.jpg";
const DOUBLE_DOME_BG_MOBILE = "/assets/roadtrip/zone5-faq/Double-Dome-mobile.jpg";
const LOLLIPOP_MASCOT = "/assets/mascots/lollipop-mascot.png";

import { FAQS } from "@/data/faq";

function renderFormattedSegment(content: string, keyPrefix: string) {
  const boldParts = content.split(/(\*\*[^*]+\*\*)/g);
  return boldParts.map((bPart, bIdx) => {
    const boldMatch = bPart.match(/^\*\*([^*]+)\*\*$/);
    if (boldMatch) {
      return (
        <strong key={`${keyPrefix}-b-${bIdx}`} className="font-bold text-slate-900">
          {boldMatch[1]}
        </strong>
      );
    }
    return bPart;
  });
}

function FormattedAnswer({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, index) => {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (match) {
          const [, label, href] = match;
          const isExternal = href.startsWith("http://") || href.startsWith("https://");
          if (isExternal) {
            return (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-amber-900 underline decoration-amber-600/60 underline-offset-2 hover:text-amber-950 hover:decoration-amber-900 transition-colors"
              >
                {label}
              </a>
            );
          }
          return (
            <Link
              key={index}
              href={href}
              className="font-semibold text-amber-900 underline decoration-amber-600/60 underline-offset-2 hover:text-amber-950 hover:decoration-amber-900 transition-colors"
            >
              {label}
            </Link>
          );
        }
        return renderFormattedSegment(part, `p-${index}`);
      })}
    </>
  );
}

export default function Zone4FAQQuotes() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const mid = Math.ceil(FAQS.length / 2);
  const col1 = FAQS.slice(0, mid);
  const col2 = FAQS.slice(mid);

  return (
    <section
      className="relative min-h-screen py-20 sm:py-24 lg:py-20 w-full flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Full-Screen Background Image Layer: Anchored with inset-0 so it seamlessly covers the section on all viewports */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* Desktop 16:9 Widescreen */}
        <Image
          src={DOUBLE_DOME_BG}
          alt="California Coastal Cove Daytime Background"
          fill
          className="hidden sm:block object-cover object-center pointer-events-none select-none"
          priority
          draggable={false}
        />
        {/* Mobile 9:16 Portrait */}
        <Image
          src={DOUBLE_DOME_BG_MOBILE}
          alt="California Coastal Cove Daytime Background Mobile"
          fill
          className="block sm:hidden object-cover object-top pointer-events-none select-none"
          priority
          draggable={false}
        />
        {/* Natural Coastal Scrim Layer */}
        <div className="absolute inset-0 bg-slate-950/20 pointer-events-none" />
      </div>

      {/* Main Container: Perfectly Centered */}
      <div className="relative z-20 mx-auto w-full max-w-5xl lg:max-w-6xl px-4 sm:px-8 py-4 sm:py-6 lg:py-0 flex flex-col items-center justify-center">
        {/* Section Header: Monumental, Clean & Unboxed */}
        <div className="mb-4 sm:mb-5 lg:mb-6 text-center max-w-4xl">
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-normal uppercase tracking-tight text-white font-heading leading-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
            ROAD TRIP FAQ
          </h2>
        </div>

        {/* California Road Trip Travel Postcard Outer Container */}
        <div className="relative w-full -rotate-[0.6deg] hover:rotate-0 transition-transform duration-300">
          {/* Realistic Amber Cellophane / Scotch Tape Strip */}
          <div className="absolute -top-3.5 sm:-top-5 left-1/2 -translate-x-1/2 z-30 pointer-events-none select-none">
            <div className="relative w-36 sm:w-48 h-7 sm:h-9 bg-amber-200/70 backdrop-blur-[2px] border-t-2 border-white/95 border-b border-amber-900/35 shadow-[0_6px_16px_rgba(0,0,0,0.28),_0_2px_4px_rgba(0,0,0,0.18)] rotate-[1.2deg] flex items-center justify-center [clip-path:polygon(0%_0%,_98.5%_0%,_100%_12.5%,_98.5%_25%,_100%_37.5%,_98.5%_50%,_100%_62.5%,_98.5%_75%,_100%_87.5%,_98.5%_100%,_0%_100%,_1.5%_87.5%,_0%_75%,_1.5%_62.5%,_0%_50%,_1.5%_37.5%,_0%_25%,_1.5%_12.5%)]">
              {/* Tape specular reflection line down the center */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-white/80 shadow-[0_0_2px_rgba(255,255,255,0.8)]" />
              {/* Warm golden-hour cellophane gradient sheen */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-300/40 via-white/50 to-amber-300/40" />
              {/* Subtle adhesive texture line */}
              <div className="absolute inset-x-3 inset-y-1 border-t border-dashed border-amber-900/15 pointer-events-none" />
            </div>
          </div>

          {/* Postcard Shell with Warm Rose-Tan Border (Subtle Blend of Vintage Cardstock & Soft Terracotta) */}
          <div
            className="relative w-full rounded-2xl p-1.5 sm:p-2 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.4),_0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #E8D3C4 0%, #DDBFB0 100%)",
            }}
          >
            {/* Inner Postcard Paper Body */}
            <div className="relative w-full rounded-xl bg-[#FAF7EE] border border-amber-900/10 p-4 sm:p-6 lg:p-6 text-slate-800">
              {/* Delicate Inset Postal Hairline Frame Rule (as on authentic travel postcards) */}
              <div className="absolute inset-2 sm:inset-3 rounded-lg border border-amber-900/15 pointer-events-none" />

              {/* Top Header Bar inside the Postcard */}
              <div className="flex flex-row items-center justify-between gap-3 pb-3 sm:pb-3.5 mb-3 sm:mb-3.5 border-b border-amber-900/15">
                {/* Taped Polaroid Snapshot of Sammy the Seal + Route Metadata */}
                <div className="relative flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                  <div className="relative shrink-0 bg-white p-1 sm:p-1.5 pb-1.5 sm:pb-2 rounded-md shadow-md border border-slate-200/90 -rotate-2 hover:rotate-0 transition-transform select-none">
                    {/* Washi Tape Strip */}
                    <div className="absolute -top-1.5 sm:-top-2 left-1/2 -translate-x-1/2 w-8 sm:w-10 h-2 sm:h-3 bg-amber-300/85 border-t border-b border-amber-400/70 rotate-1 shadow-xs pointer-events-none" />
                    <div className="relative w-10 h-10 sm:w-13 sm:h-13 bg-gradient-to-b from-sky-100 to-amber-50 rounded overflow-hidden flex items-center justify-center">
                      <Image
                        src={LOLLIPOP_MASCOT}
                        alt="HackCC Mascot"
                        fill
                        className="object-contain p-0.5 pointer-events-none select-none"
                        priority
                        draggable={false}
                      />
                    </div>
                    <div className="mt-0.5 text-center font-serif italic text-[8px] sm:text-[10px] font-semibold text-slate-700 leading-tight">
                      Route Guide
                    </div>
                  </div>

                  <div className="min-w-0">
                    <span className="font-mono text-[9px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-amber-900/90 font-bold truncate block mb-0.5">
                      POST CARD · ROUTE 1
                    </span>
                    <h3 className="text-sm sm:text-base font-bold font-sans text-slate-900 leading-tight sm:leading-snug truncate">
                      Orange Coast College · Costa Mesa
                    </h3>
                    <p className="text-[10px] sm:text-xs text-slate-600 font-sans mt-0.5 hidden xs:block">
                      Field notes for your Nov 14–15 weekend hackathon
                    </p>
                  </div>
                </div>

                {/* Authentic Perforated California Postage Stamp & Postmark Cancellation */}
                <div className="relative shrink-0 inline-flex items-center select-none">
                  {/* Wavy Ink Postmark Cancellation Lines & Stamped Circular Postmark (Layered over Stamp) */}
                  <div className="hidden sm:flex items-center absolute -left-20 sm:-left-24 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                    {/* Wavy Postal Cancellation "Killer Bars" */}
                    <svg className="w-16 sm:w-20 h-10 text-red-700/80 -rotate-3" viewBox="0 0 80 40" fill="none">
                      <path d="M 0 8 Q 15 2 30 8 T 60 8 T 80 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M 5 16 Q 20 10 35 16 T 65 16 T 80 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M 0 24 Q 15 18 30 24 T 60 24 T 80 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M 8 32 Q 23 26 38 32 T 68 32 T 80 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>

                    {/* Circular Rubber Ink Cancellation Stamp */}
                    <div className="relative -ml-3 w-16 h-16 sm:w-[68px] sm:h-[68px] rounded-full border-2 border-dashed border-red-700/80 flex flex-col items-center justify-center text-red-800 -rotate-12 bg-red-600/[0.04] shadow-xs">
                      <span className="font-mono font-black text-[8px] sm:text-[9px] tracking-widest uppercase text-center leading-none text-red-800">
                        PCH · CA
                      </span>
                      <span className="font-mono font-bold text-[7px] sm:text-[8px] uppercase tracking-wider text-red-700 my-0.5">
                        NOV 14 2026
                      </span>
                      <span className="font-mono text-[7px] tracking-tight uppercase text-red-600/80">
                        ORANGE COAST
                      </span>
                    </div>
                  </div>

                  {/* Authentic Perforated Postage Stamp Card */}
                  <div className="relative z-10 w-[54px] sm:w-[72px] h-[68px] sm:h-[90px] drop-shadow-[0_4px_10px_rgba(0,0,0,0.2)] rotate-2 hover:rotate-0 transition-transform">
                    <svg width="100%" height="100%" viewBox="0 0 88 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <mask id="faq-stamp-perfs">
                          <rect width="88" height="110" fill="white" />
                          {/* Top Edge Perforations */}
                          <circle cx="11" cy="0" r="3.2" fill="black" />
                          <circle cx="22" cy="0" r="3.2" fill="black" />
                          <circle cx="33" cy="0" r="3.2" fill="black" />
                          <circle cx="44" cy="0" r="3.2" fill="black" />
                          <circle cx="55" cy="0" r="3.2" fill="black" />
                          <circle cx="66" cy="0" r="3.2" fill="black" />
                          <circle cx="77" cy="0" r="3.2" fill="black" />
                          {/* Bottom Edge Perforations */}
                          <circle cx="11" cy="110" r="3.2" fill="black" />
                          <circle cx="22" cy="110" r="3.2" fill="black" />
                          <circle cx="33" cy="110" r="3.2" fill="black" />
                          <circle cx="44" cy="110" r="3.2" fill="black" />
                          <circle cx="55" cy="110" r="3.2" fill="black" />
                          <circle cx="66" cy="110" r="3.2" fill="black" />
                          <circle cx="77" cy="110" r="3.2" fill="black" />
                          {/* Left Edge Perforations */}
                          <circle cx="0" cy="11" r="3.2" fill="black" />
                          <circle cx="0" cy="22" r="3.2" fill="black" />
                          <circle cx="0" cy="33" r="3.2" fill="black" />
                          <circle cx="0" cy="44" r="3.2" fill="black" />
                          <circle cx="0" cy="55" r="3.2" fill="black" />
                          <circle cx="0" cy="66" r="3.2" fill="black" />
                          <circle cx="0" cy="77" r="3.2" fill="black" />
                          <circle cx="0" cy="88" r="3.2" fill="black" />
                          <circle cx="0" cy="99" r="3.2" fill="black" />
                          {/* Right Edge Perforations */}
                          <circle cx="88" cy="11" r="3.2" fill="black" />
                          <circle cx="88" cy="22" r="3.2" fill="black" />
                          <circle cx="88" cy="33" r="3.2" fill="black" />
                          <circle cx="88" cy="44" r="3.2" fill="black" />
                          <circle cx="88" cy="55" r="3.2" fill="black" />
                          <circle cx="88" cy="66" r="3.2" fill="black" />
                          <circle cx="88" cy="77" r="3.2" fill="black" />
                          <circle cx="88" cy="88" r="3.2" fill="black" />
                          <circle cx="88" cy="99" r="3.2" fill="black" />
                        </mask>
                      </defs>

                      {/* Stamp Body Masked by Perforations */}
                      <g mask="url(#faq-stamp-perfs)">
                        {/* Crisp Stamp Paper */}
                        <rect width="88" height="110" fill="#FFFDF8" />
                        {/* Outer Fine Blue Engraved Frame */}
                        <rect x="5.5" y="5.5" width="77" height="99" fill="#F0F9FF" stroke="#0284C7" strokeWidth="1.5" />
                        <rect x="8" y="8" width="72" height="94" fill="none" stroke="#0284C7" strokeWidth="0.75" strokeDasharray="2 1.5" />

                        {/* Top Header Label */}
                        <text x="44" y="17" fontFamily="monospace" fontSize="6.5" fontWeight="900" fill="#0369A1" textAnchor="middle" letterSpacing="1.2">
                          USA · 2026
                        </text>

                        {/* Center Scenic Vignette: Ocean Sunset + Highway 1 Shield */}
                        <g transform="translate(19, 23)">
                          {/* Sky background */}
                          <rect width="50" height="54" rx="3" fill="#E0F2FE" />
                          {/* Radiant Sun */}
                          <circle cx="25" cy="22" r="13" fill="#FBBF24" />
                          <circle cx="25" cy="22" r="8" fill="#FDE68A" />
                          {/* Pacific Waves */}
                          <path d="M 0 34 Q 12 30 25 34 T 50 34 L 50 54 L 0 54 Z" fill="#0284C7" />
                          <path d="M 0 40 Q 12 37 25 40 T 50 40 L 50 54 L 0 54 Z" fill="#0369A1" />
                          <path d="M 0 46 Q 12 43 25 46 T 50 46 L 50 54 L 0 54 Z" fill="#075985" />
                          {/* California Route 1 Shield */}
                          <g transform="translate(14, 8)">
                            <path d="M 11 0 L 22 4 L 20 18 Q 11 26 11 26 Q 11 26 2 18 L 0 4 Z" fill="#15803D" stroke="#FFFFFF" strokeWidth="1.2" />
                            <text x="11" y="8" fontFamily="sans-serif" fontSize="3.8" fontWeight="900" fill="#FFFFFF" textAnchor="middle">CALIFORNIA</text>
                            <text x="11" y="19" fontFamily="sans-serif" fontSize="10" fontWeight="900" fill="#FFFFFF" textAnchor="middle">1</text>
                          </g>
                        </g>

                        {/* Denomination and HackCC Branding */}
                        <text x="13" y="97" fontFamily="sans-serif" fontSize="8" fontWeight="900" fill="#0369A1" textAnchor="start">
                          FREE
                        </text>
                        <text x="75" y="97" fontFamily="monospace" fontSize="6.5" fontWeight="bold" fill="#0284C7" textAnchor="end">
                          HACKCC
                        </text>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>

          {/* Accordion Grid inside Postcard with Classic Center Divider */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-0 md:gap-x-8 lg:gap-x-12 items-start">
            {/* Column 1 with Subtle Postcard Divider on Desktop */}
            <div className="divide-y divide-amber-900/10 md:pr-6 lg:pr-8 md:border-r md:border-dashed md:border-amber-900/20">
              {col1.map((faq) => {
                const isOpen = openId === faq.id;
                return (
                  <div key={faq.id} className="py-1.5 sm:py-2.5 first:pt-0">
                    <button
                      type="button"
                      onClick={() => toggle(faq.id)}
                      className="w-full flex items-start justify-between text-left group cursor-pointer focus:outline-none select-none gap-2.5"
                      aria-expanded={isOpen}
                    >
                      <div className="space-y-0.5 pr-1.5">
                        <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-amber-800/80 block">
                          {faq.badge}
                        </span>
                        <h3 className={`font-sans font-bold text-xs sm:text-sm lg:text-[15px] block transition-colors leading-snug ${isOpen ? "text-amber-800" : "text-slate-900 group-hover:text-amber-800"}`}>
                          {faq.question}
                        </h3>
                      </div>
                      <span
                        className={`flex-shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-200 ${isOpen
                            ? "bg-amber-400 text-slate-950 rotate-45 shadow-sm"
                            : "bg-amber-100 text-amber-800 border border-amber-300 group-hover:bg-amber-200"
                          }`}
                      >
                        +
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <p className="pt-1 text-slate-700 font-sans text-xs sm:text-[13px] leading-relaxed">
                            <FormattedAnswer text={faq.spokenAnswer} />
                          </p>
                          {faq.link && (
                            <div className="pt-2">
                              {faq.link.href.startsWith("http") ? (
                                <a
                                  href={faq.link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 px-3 py-1 rounded-full shadow-xs hover:shadow transition-all group"
                                >
                                  <span>{faq.link.text}</span>
                                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                                </a>
                              ) : (
                                <Link
                                  href={faq.link.href}
                                  className="inline-flex items-center gap-1.5 text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 px-3 py-1 rounded-full shadow-xs hover:shadow transition-all group"
                                >
                                  <span>{faq.link.text}</span>
                                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                                </Link>
                              )}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Column 2 */}
            <div className="divide-y divide-amber-900/10 md:pl-2">
              {col2.map((faq) => {
                const isOpen = openId === faq.id;
                return (
                  <div key={faq.id} className="py-1.5 sm:py-2.5 first:pt-0">
                    <button
                      type="button"
                      onClick={() => toggle(faq.id)}
                      className="w-full flex items-start justify-between text-left group cursor-pointer focus:outline-none select-none gap-2.5"
                      aria-expanded={isOpen}
                    >
                      <div className="space-y-0.5 pr-1.5">
                        <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-amber-800/80 block">
                          {faq.badge}
                        </span>
                        <h3 className={`font-sans font-bold text-xs sm:text-sm lg:text-[15px] block transition-colors leading-snug ${isOpen ? "text-amber-800" : "text-slate-900 group-hover:text-amber-800"}`}>
                          {faq.question}
                        </h3>
                      </div>
                      <span
                        className={`flex-shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-200 ${isOpen
                            ? "bg-amber-400 text-slate-950 rotate-45 shadow-sm"
                            : "bg-amber-100 text-amber-800 border border-amber-300 group-hover:bg-amber-200"
                          }`}
                      >
                        +
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <p className="pt-1 text-slate-700 font-sans text-xs sm:text-[13px] leading-relaxed">
                            <FormattedAnswer text={faq.spokenAnswer} />
                          </p>
                          {faq.link && (
                            <div className="pt-2">
                              {faq.link.href.startsWith("http") ? (
                                <a
                                  href={faq.link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 px-3 py-1 rounded-full shadow-xs hover:shadow transition-all group"
                                >
                                  <span>{faq.link.text}</span>
                                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                                </a>
                              ) : (
                                <Link
                                  href={faq.link.href}
                                  className="inline-flex items-center gap-1.5 text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 px-3 py-1 rounded-full shadow-xs hover:shadow transition-all group"
                                >
                                  <span>{faq.link.text}</span>
                                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                                </Link>
                              )}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Card Footer */}
          <div className="mt-4 pt-3 border-t border-amber-900/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span className="font-serif italic text-amber-900 font-medium">Postmaster&apos;s Note:</span>
              <span>Still have questions about the route?</span>
            </div>
            <a
              href="https://discord.gg/X7ktb9224J"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-3.5 py-1.5 rounded-full shadow-sm hover:shadow transition-all inline-flex items-center gap-1.5 group text-xs"
            >
              <span>Ask our organizers on Discord</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
);
}
