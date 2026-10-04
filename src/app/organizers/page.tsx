"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

// Top-level background & headshot static references
import organizersData from "../../../public/data/organizers.json";
import hackccIcon from "../../../public/images/hackcc-icon.png";

const SCENIC_BG = "/assets/roadtrip/organizers/coastal-overlook.jpeg";

export interface OrganizerMember {
  id: string;
  name: string;
  role: string;
  category?: string | string[];
  categories?: string[];
  college?: string;
  image: string;
  linkedin?: string;
  socials?: {
    linkedin?: string;
  };
  objectPosition?: string;
  imageScale?: string;
}

// Custom focal-point calibration per headshot
const HEADSHOT_CALIBRATION: Record<string, { objectPosition?: string; imageScale?: string }> = {
  // Customized ones
  "paul-pham": { objectPosition: "center 20%", imageScale: "scale-100" },
  "kareem-tadros": { objectPosition: "center 18%", imageScale: "scale-100" },
  "hillary-nguyen": { objectPosition: "center 22%", imageScale: "scale-115" },
  "jessie-joyce": { objectPosition: "center 48%", imageScale: "scale-135" },
  "yuval-perel": { objectPosition: "center 25%", imageScale: "scale-110" },
  // Tom, Anjani, Dasha, Jacob use original defaults (centered, standard zoom)
};

const ORGANIZERS = (organizersData as OrganizerMember[]).map((org) => ({
  ...org,
  objectPosition: org.objectPosition || HEADSHOT_CALIBRATION[org.id]?.objectPosition || "center center",
  imageScale: org.imageScale || HEADSHOT_CALIBRATION[org.id]?.imageScale || "scale-100",
}));

const uniqueCampusesCount = new Set(
  ORGANIZERS.map((m) => m.college?.trim()).filter(Boolean)
).size;

const CATEGORIES = [
  { id: "all", label: "All Crew" },
  { id: "leadership", label: "Leadership" },
  { id: "website", label: "Website" },
  { id: "engineering", label: "Engineering" },
  { id: "marketing", label: "Marketing" },
  { id: "logistics", label: "Logistics" },
  { id: "sponsorships", label: "Sponsorships" },
] as const;

export default function OrganizersPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on Escape key or outside click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Helper function to rank members hierarchically
  const getSortScore = (member: OrganizerMember) => {
    const nameLower = member.name.toLowerCase();

    // 1. First row priority order:
    // Paul Pham (0), Kareem Tadros (1), Tom Perel (2)
    if (nameLower.includes("paul pham") || member.id === "paul-pham") return 0;
    if (nameLower.includes("kareem tadros") || member.id === "kareem-tadros") return 1;
    if (nameLower.includes("tom perel") || member.id === "tom-perel") return 2;

    // 2. Leads for other areas starting in the second row (e.g. Ethan Wu - Engineering Lead, etc.)
    const isLead =
      member.role.toLowerCase().includes("lead") ||
      member.role.toLowerCase().includes("director") ||
      member.role.toLowerCase().includes("head");
    if (isLead) return 3;

    // 3. All other team members
    return 4;
  };

  const filteredMembers = (
    activeCategory === "all"
      ? [...ORGANIZERS]
      : ORGANIZERS.filter((m) => {
          const list: string[] = Array.isArray(m.categories)
            ? m.categories
            : Array.isArray(m.category)
            ? m.category
            : [m.categories || m.category || ""];
          return list.includes(activeCategory);
        })
  ).sort((a, b) => {
    const scoreA = getSortScore(a);
    const scoreB = getSortScore(b);
    if (scoreA !== scoreB) {
      return scoreA - scoreB;
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <main className="relative min-h-screen text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950 overflow-x-hidden">
      {/* Scenic Background with subtle luminous blend */}
      <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden">
        <Image
          src={SCENIC_BG}
          alt="California Coastal Overlook at Twilight"
          fill
          priority
          className="object-cover object-center scale-105"
        />
        {/* Soft edge gradients so background stays vivid while text remains razor-sharp */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-slate-950/85 pointer-events-none" />
      </div>

      {/* Top Floating Roadtrip Navigation Bar - Full Width */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/40 border-b border-white/10 px-4 sm:px-6 lg:px-8 py-3.5 transition-colors">
        <div className="w-full flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400 transition-transform group-hover:-translate-x-1" />
            <span>Back to main site</span>
          </Link>

          {/* Caltrans Highway Route Marker Badge (Top-Right Interactive Menu) */}
          <div ref={menuRef} className="relative">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Toggle Highway Navigation Directory"
              className="inline-flex items-center gap-2 bg-[#15803D] hover:bg-[#166534] text-white border border-white/40 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-mono font-black tracking-wide shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>ROUTE 1</span>
              <span className="text-white/60">•</span>
              <span className="text-amber-300">MENU</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isMenuOpen ? "rotate-180 text-amber-300" : "text-white"
                }`}
              />
            </button>

            {/* Frosted Highway Directory Dropdown */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -4 }}
                  style={{ transformOrigin: "top right" }}
                  transition={{
                    type: "spring",
                    damping: 25,
                    stiffness: 300,
                    duration: 0.22,
                  }}
                  className="absolute right-0 top-full mt-2 w-64 sm:w-72 rounded-2xl backdrop-blur-xl p-3.5 shadow-2xl z-50 pointer-events-auto space-y-2.5 bg-slate-900/90 border border-white/20 shadow-black/80"
                >
                  {/* Dropdown Header */}
                  <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-white/15">
                    <div className="w-10 h-10 flex items-center justify-center shrink-0">
                      <Image
                        src="/images/hackcc-icon.png"
                        alt="HackCC Logo"
                        width={40}
                        height={40}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex flex-col justify-center text-right ml-auto">
                      <span className="text-xs font-black tracking-wider uppercase font-[var(--font-mont)] text-amber-400">
                        HACKCC 2026
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">HIGHWAY DIRECTORY</span>
                    </div>
                  </div>

                  {/* Highway Exit Links */}
                  <div className="space-y-1">
                    <Link
                      href="/"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between p-2 rounded-xl transition-all duration-150 group hover:bg-white/10"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="shrink-0 bg-[#15803D] text-white border border-white font-mono font-black text-xs px-2 py-0.5 rounded shadow-sm group-hover:scale-105 transition-transform">
                          1
                        </span>
                        <span className="font-bold text-sm transition-colors font-[var(--font-mont)] text-white group-hover:text-amber-300">
                          Main Site
                        </span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-300 transition-all group-hover:translate-x-0.5" />
                    </Link>

                    <Link
                      href="/2026"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between p-2 rounded-xl transition-all duration-150 group hover:bg-white/10"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="shrink-0 bg-[#15803D] text-white border border-white font-mono font-black text-xs px-2 py-0.5 rounded shadow-sm group-hover:scale-105 transition-transform">
                          2
                        </span>
                        <span className="font-bold text-sm transition-colors font-[var(--font-mont)] text-white group-hover:text-amber-300">
                          Archive
                        </span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-300 transition-all group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Page Content Shell */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        {/* Hero Section: Unboxed Typography */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl text-white leading-[1.08] tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] mb-4">
            MEET THE TEAM
          </h1>

          <p className="font-serif italic text-amber-200/95 text-lg sm:text-2xl md:text-[1.75rem] leading-relaxed font-light tracking-wide mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] sm:whitespace-nowrap">
            California community college students building an unforgettable journey
          </p>

          {/* Monumental borderless key stats */}
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mt-10 pt-8 border-t border-white/15">
            <div>
              <div className="font-heading text-3xl sm:text-5xl text-amber-400 font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                {ORGANIZERS.length}
              </div>
              <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 mt-1">
                Organizers
              </div>
            </div>
            <div className="border-x border-white/15">
              <div className="font-heading text-3xl sm:text-5xl text-white font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                100%
              </div>
              <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 mt-1">
                Student-Run
              </div>
            </div>
            <div>
              <div className="font-heading text-3xl sm:text-5xl text-amber-400 font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                {uniqueCampusesCount}
              </div>
              <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 mt-1">
                Campuses
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-14">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 sm:px-6 py-2.5 rounded-full text-sm sm:text-base font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/25 scale-105"
                    : "bg-slate-900/60 text-slate-200 hover:text-white hover:bg-slate-800/80 border border-white/15"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Organizer Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mb-20">
          {filteredMembers.map((member) => {
            const linkedinUrl = member.linkedin || member.socials?.linkedin;

            return (
              <div
                key={member.id}
                className="group relative flex flex-col justify-between bg-slate-900/85 backdrop-blur-md border border-white/15 hover:border-amber-400/60 rounded-3xl p-6 sm:p-7 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/70"
              >
                {/* Card Top: Headshot */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-5 bg-slate-800 border border-white/10 group-hover:border-amber-400/40 transition-colors">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectPosition: member.objectPosition || "center center" }}
                    className={`object-cover ${member.imageScale || "scale-100"} group-hover:scale-110 transition-transform duration-500`}
                  />
                </div>

                {/* Card Bottom: Name, Role, College on left, LinkedIn on bottom-right */}
                <div className="flex items-end justify-between gap-4 pt-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-wide truncate group-hover:text-amber-300 transition-colors">
                      {member.name}
                    </h3>
                    <div className="text-sm sm:text-base font-bold uppercase tracking-wider text-amber-400 mt-1.5 truncate">
                      {member.role}
                    </div>
                    {member.college && (
                      <div className="text-sm sm:text-base font-medium text-white mt-1 truncate">
                        {member.college}
                      </div>
                    )}
                  </div>

                  {linkedinUrl && (
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="shrink-0 p-3 rounded-2xl bg-[#0A66C2] hover:bg-[#004182] text-white border border-sky-300/40 shadow-md shadow-sky-900/40 transition-all hover:scale-110 active:scale-95 cursor-pointer"
                    >
                      <LinkedInIcon className="w-5 h-5 text-white fill-white" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Join the Crew Callout: Unboxed & Authentic */}
        <div className="pt-16 mt-12 border-t border-white/15 text-center max-w-2xl mx-auto">
          <div className="w-26 h-26 sm:w-28 sm:h-28 mx-auto mb-6 relative">
            <Image
              src={hackccIcon}
              alt="HackCC Logo"
              width={280}
              height={280}
              className="w-full h-full object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
            />
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl text-white tracking-wide mb-3 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            RIDE SHOTGUN WITH THE CREW
          </h2>
          <p className="font-serif italic text-amber-200/95 text-lg sm:text-2xl font-light mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            Help pave the road for California community college hackers
          </p>
          <p className="text-slate-200 text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            Interested in mentoring, leading technical workshops, or joining the organizing team for HackCC 2026?
          </p>
          <div className="flex items-center justify-center">
            <Link
              href="/apply/organizer"
              className="inline-flex items-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-8 py-3.5 rounded-full text-base shadow-xl shadow-black/40 transition-all hover:scale-105 active:scale-95"
            >
              <span>Get in Touch</span>
              <span className="text-lg">→</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
