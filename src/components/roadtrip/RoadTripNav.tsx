import Link from "next/link";

export default function RoadTripNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent py-4 sm:py-6 pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center pointer-events-auto">
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
    </header>
  );
}


