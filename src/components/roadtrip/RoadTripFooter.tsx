import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function RoadTripFooter() {
  return (
    <footer className="relative z-30 w-full bg-[#020617] border-t border-white/10 text-slate-100 font-sans">
      {/* Top subtle golden hour edge highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

      {/* Main Footer Container */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12">
          {/* Col 1: Branding & Mission (Span 5) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="font-heading text-2xl sm:text-3xl text-white tracking-wide">
                HackCC
              </span>
              <span className="bg-[#15803D] text-white border border-white/60 font-mono font-black text-[11px] px-2 py-0.5 rounded shadow-sm">
                ROUTE 2026
              </span>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              California&apos;s premier hackathon dedicated entirely to empowering, connecting, and celebrating community college students across the state.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-3">
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
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400">
              Roadmap &amp; Zones
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#zone-about"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  About HackCC
                </a>
              </li>
              <li>
                <a
                  href="#zone-details"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Event Details
                </a>
              </li>
              <li>
                <a
                  href="#zone-sponsors"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Sponsors &amp; Partners
                </a>
              </li>
              <li>
                <a
                  href="#zone-faq"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  FAQ &amp; Testimonials
                </a>
              </li>
              <li>
                <a
                  href="#zone-apply"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Apply &amp; Get Involved
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & Directory (Span 4) */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400">
              Community &amp; Directory
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/organizers"
                  className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Organizing Team</span>
                  <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-amber-300 font-mono">
                    MEET THE CREW
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/2026"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Archive (HackCC 2026)
                </Link>
              </li>
              <li>
                <Link
                  href="/apply"
                  className="text-amber-300 hover:text-amber-200 font-bold transition-colors inline-flex items-center gap-1"
                >
                  <span>Participant Application</span>
                  <span>→</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-bar: Copyright & Caltrans Roadtrip Badge */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; 2026 HackCC. Built with pride for California community college students.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-slate-500 font-mono">CALIFORNIA ROAD TRIP</span>
            <span className="text-white/20">•</span>
            <a
              href="#zone-hero"
              className="hover:text-amber-300 transition-colors font-medium"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
