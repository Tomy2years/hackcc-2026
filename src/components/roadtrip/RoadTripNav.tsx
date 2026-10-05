"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { EVENT } from "@/lib/event";
import hackccIcon from "../../../public/images/hackcc-icon.png";

const LINKS = [
  { label: "About", href: "#zone-about" },
  { label: "Sponsors", href: "#zone-sponsors" },
  { label: "FAQ", href: "#zone-faq" },
  { label: "Team", href: "/organizers" },
];

const MENU_ONLY_LINKS = [
  { label: "Spring 2026 archive", href: "/2026" },
  { label: "Discord", href: EVENT.social.discord },
  { label: "Instagram", href: EVENT.social.instagram },
];

interface RoadTripNavProps {
  /** True once registration is open; the page decides this on the server per request. */
  applyOpen: boolean;
}

export default function RoadTripNav({ applyOpen }: RoadTripNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();

  // Transparent over the hero; solid night once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the menu; so does resizing up to desktop.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const onResize = () => window.innerWidth >= 768 && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-night/95 border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Wordmark */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label={`${EVENT.edition} home`}>
          <Image src={hackccIcon} alt="" width={36} height={36} className="w-9 h-9 object-contain" priority />
          <span className="font-heading text-xl text-white tracking-wide [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
            {EVENT.edition}
          </span>
        </Link>

        {/* Desktop links */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
          {LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-semibold text-white/90 hover:text-action transition-colors [text-shadow:0_1px_6px_rgba(0,0,0,0.6)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Apply (desktop) */}
        <div className="hidden md:flex items-center shrink-0">
          {applyOpen ? (
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 rounded-full bg-action hover:bg-action-hover text-night font-bold text-sm px-5 py-2.5 shadow-lg shadow-black/30 transition-all hover:scale-105 active:scale-95"
            >
              <span>Apply</span>
              <span aria-hidden>→</span>
            </Link>
          ) : (
            <span className="text-sm font-semibold text-white/80 [text-shadow:0_1px_6px_rgba(0,0,0,0.6)]">
              Applications open soon
            </span>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen(open => !open)}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="md:hidden relative w-11 h-11 -mr-2 flex items-center justify-center cursor-pointer"
        >
          <span className="sr-only">Menu</span>
          <span
            className={`absolute w-6 h-0.5 rounded-full bg-white transition-all duration-300 ${
              menuOpen ? "rotate-45" : "-translate-y-2"
            }`}
          />
          <span
            className={`absolute w-6 h-0.5 rounded-full bg-white transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`absolute w-6 h-0.5 rounded-full bg-white transition-all duration-300 ${
              menuOpen ? "-rotate-45" : "translate-y-2"
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id={menuId}
        hidden={!menuOpen}
        className="md:hidden border-t border-white/10 bg-night/95"
      >
        <nav aria-label="Mobile" className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col">
          {LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 text-lg font-semibold text-white hover:text-action transition-colors border-b border-white/10"
            >
              {link.label}
            </Link>
          ))}
          {MENU_ONLY_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="py-3 text-base font-medium text-mist/80 hover:text-action transition-colors border-b border-white/10 last:border-0"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4">
            {applyOpen ? (
              <Link
                href="/apply"
                onClick={() => setMenuOpen(false)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-action hover:bg-action-hover text-night font-bold text-base px-6 py-3 transition-all active:scale-95"
              >
                <span>Apply</span>
                <span aria-hidden>→</span>
              </Link>
            ) : (
              <p className="text-sm font-semibold text-white/70">Applications open soon.</p>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
