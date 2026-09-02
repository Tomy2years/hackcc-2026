// Idea: Start with the Hollywood sign during the day. As the user scrolls down, the sun sets 
// and becomes a night sky which leads into the transition for the Inglewood scene,

import Link from "next/link";

export default function RoadTripNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent py-4 sm:py-6 pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center pointer-events-auto">
        <nav className="flex items-center justify-center gap-5 sm:gap-8 md:gap-10 text-sm sm:text-base font-semibold tracking-wide text-white/90 font-[var(--font-mont)]">
          <a
            href="#zone-apply"
            className="hover:text-amber-300 hover:scale-105 transition-all duration-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
          >
            Get Involved
          </a>
          <a
            href="#zone-about"
            className="hover:text-amber-300 hover:scale-105 transition-all duration-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
          >
            About
          </a>
          <a
            href="#zone-faq"
            className="hover:text-amber-300 hover:scale-105 transition-all duration-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
          >
            FAQ
          </a>
          <a
            href="#zone-details"
            className="hover:text-amber-300 hover:scale-105 transition-all duration-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
          >
            Schedule
          </a>
          <a
            href="#zone-sponsors"
            className="hover:text-amber-300 hover:scale-105 transition-all duration-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
          >
            Sponsor us
          </a>
          <Link
            href="/organizers"
            className="hover:text-amber-300 hover:scale-105 transition-all duration-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
          >
            Organizers
          </Link>
          <Link
            href="/2026"
            className="hover:text-amber-300 hover:scale-105 transition-all duration-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
          >
            Archive
          </Link>
        </nav>
      </div>
    </header>
  );
}
