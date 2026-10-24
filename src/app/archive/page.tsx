"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  ArrowRight,
} from "lucide-react";
import RoadTripFooter from "@/components/roadtrip/RoadTripFooter";

// Top-level scenic and graphic imports
const SCENIC_BG = "/assets/roadtrip/organizers/coastal-overlook.jpeg";
const HACKCC_ICON = "/images/hackcc-icon.png";
const MOON_2024 = "/archive/2024/yellow-moon.png";
const MOUNTAINS_2024 = "/archive/2024/Mountains.png";
const BALLOON_2025 = "/archive/2025/Hot Air Balloon.webp";
const MIRACOSTA_2025 = "/archive/2025/miracosta-college.jpg";
const BALLOON_2026 = "/archive/2026/Hot Air Balloon.webp";

interface ArchiveEdition {
  id: string;
  year: string;
  routeNumber: string;
  tag: string;
  tagColor: string;
  title: string;
  subtitle: string;
  dates: string;
  location: string;
  attendees: string;
  theme: string;
  description: string;
  highlights: string[];
  href: string;
  previewImage: string;
  badgeText: string;
  accentGradient: string;
}

const ARCHIVE_EDITIONS: ArchiveEdition[] = [
  {
    id: "2024",
    year: "2024",
    routeNumber: "24",
    tag: "INAUGURAL · FALL 2024",
    tagColor: "border-amber-400/40 text-amber-300 bg-amber-400/10",
    title: "HackCC 2024: The Inception",
    subtitle: "Midnight Mountain & Celestial Sky",
    dates: "November 8 – 10, 2024",
    location: "Statewide Virtual & Regional Hubs",
    attendees: "300+ Registered Hackers",
    theme: "Retro Starry Night Sky & Mountain Peaks",
    description:
      "The foundational hackathon that started the statewide movement. Built from scratch by passionate community college students to give California CC hackers their very own dedicated hackathon stage.",
    highlights: [
      "California's first statewide community college hackathon",
      "300+ community college dreamers & builders",
      "Signature celestial moon & midnight mountain identity",
      "Foundational student organizing coalition formed",
    ],
    href: "/archive/2024",
    previewImage: MOON_2024,
    badgeText: "MILEPOST 0 · THE BEGINNING",
    accentGradient: "from-indigo-950/80 via-slate-900/90 to-purple-950/80",
  },
  {
    id: "2025",
    year: "2025",
    routeNumber: "25",
    tag: "SAN DIEGO COASTAL · FALL 2025",
    tagColor: "border-sky-400/40 text-sky-300 bg-sky-400/10",
    title: "HackCC 2025: Oceanside Coastal",
    subtitle: "Pastel Skies & Seaside Dunes",
    dates: "November 8, 2025",
    location: "Oceanside, CA · MiraCosta College",
    attendees: "250+ In-Person Hackers",
    theme: "Whimsical Hot Air Balloons & Pacific Coast",
    description:
      "California CC hackers traveled to the Pacific shore in Oceanside for an exhilarating in-person hackathon hosted at MiraCosta College, featuring workshops, mentor pods, live collage walls, and top sponsor challenges.",
    highlights: [
      "Hosted on-campus at beautiful MiraCosta College",
      "250+ hackers from Northern & Southern California",
      "Live communal attendee photo collage & mentor circles",
      "Over $10,000 in project awards & industry mentorship",
    ],
    href: "/archive/2025",
    previewImage: BALLOON_2025,
    badgeText: "EXIT 25 · PACIFIC SHORE",
    accentGradient: "from-purple-950/80 via-slate-900/90 to-sky-950/80",
  },
  {
    id: "2026-original",
    year: "2026",
    routeNumber: "26",
    tag: "DUAL-CAMPUS · SPRING 2026",
    tagColor: "border-emerald-400/40 text-emerald-300 bg-emerald-400/10",
    title: "HackCC 2026: Dual-Campus Frontier",
    subtitle: "NorCal & SoCal Statewide Bridge",
    dates: "May 2026",
    location: "Torrance (El Camino) & San Mateo (CSM)",
    attendees: "350+ Hackers Across Both Regions",
    theme: "Dual-Hub Synchronous Hackathon",
    description:
      "The ambitious statewide model bringing Northern and Southern California community college students together simultaneously across El Camino College and College of San Mateo with connected judging.",
    highlights: [
      "Dual synchronized host campuses: El Camino & CSM",
      "Statewide bus & carpool transportation grid",
      "Interactive campus maps & unified judge portal",
      "Original pre-roadtrip pastel visual identity",
    ],
    href: "/archive/2026",
    previewImage: BALLOON_2026,
    badgeText: "EXIT 26 · STATEWIDE LINK",
    accentGradient: "from-violet-950/80 via-slate-900/90 to-amber-950/80",
  },
];

export default function ArchiveCentralHubPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filteredEditions =
    selectedFilter === "all"
      ? ARCHIVE_EDITIONS
      : ARCHIVE_EDITIONS.filter((edition) => edition.year === selectedFilter);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950 overflow-x-hidden">
      {/* Background Scenic Landscape (Coastal Overlook) */}
      <div className="fixed inset-0 z-0 pointer-events-none select-none">
        <Image
          src={SCENIC_BG}
          alt="California Scenic Coastline"
          fill
          priority
          className="object-cover object-center filter brightness-[0.4] saturate-[1.1]"
        />
        {/* Soft atmospheric gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/95" />
      </div>

      {/* Top Header Navigation */}
      <header className="relative z-30 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 group text-white hover:text-amber-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-amber-400" />
            <span className="font-heading text-sm sm:text-base tracking-wide">
              Return to 2026 Road Trip
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="bg-[#15803D] text-white border border-white font-mono font-black text-xs px-2.5 py-1 rounded shadow-sm">
              ROUTE ARCHIVE
            </span>
            <div className="w-8 h-8 relative shrink-0">
              <Image
                src={HACKCC_ICON}
                alt="HackCC Emblem"
                width={32}
                height={32}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-20">
        {/* Section Masthead: Pure bold title + elegant serif tagline */}
        <div className="max-w-4xl text-left sm:text-center sm:mx-auto space-y-3">
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl text-white tracking-normal leading-[1.08] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            The HackCC Archive
          </h1>

          <p className="font-serif italic text-amber-200/90 text-lg sm:text-2xl font-light">
            Every chapter of California&apos;s premier community college hackathon.
          </p>
        </div>

        {/* Year Filter Switcher Bar */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-white/15 backdrop-blur-md">
            {[
              { id: "all", label: "All Years" },
              { id: "2024", label: "2024" },
              { id: "2025", label: "2025" },
              { id: "2026", label: "2026" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-mono font-bold transition-all ${
                  selectedFilter === tab.id
                    ? "bg-amber-400 text-slate-950 shadow-md scale-105"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Edition Showcase Cards */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredEditions.map((edition) => (
            <div
              key={edition.id}
              className={`relative flex flex-col rounded-3xl border border-white/20 bg-gradient-to-b ${edition.accentGradient} backdrop-blur-xl p-6 sm:p-8 shadow-2xl hover:border-amber-400/50 transition-all duration-300 group`}
            >
              {/* Caltrans Highway Badge Header */}
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/15">
                <div className="flex items-center gap-2">
                  <span className="bg-[#15803D] text-white border border-white font-mono font-black text-xs px-2.5 py-0.5 rounded shadow-sm">
                    ROUTE {edition.routeNumber}
                  </span>
                  <span className="text-[11px] font-mono tracking-wider text-slate-300">
                    {edition.badgeText}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${edition.tagColor}`}
                >
                  {edition.year}
                </span>
              </div>

              {/* Visual Preview Motif / Graphic */}
              <div className="relative w-full h-44 my-5 rounded-2xl overflow-hidden bg-slate-950/60 border border-white/10 flex items-center justify-center p-4">
                {edition.id === "2024" && (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={MOUNTAINS_2024}
                      alt="2024 Mountains"
                      fill
                      className="object-cover object-bottom opacity-40"
                    />
                    <div className="relative z-10 w-24 h-24">
                      <Image
                        src={edition.previewImage}
                        alt="2024 Yellow Moon"
                        fill
                        className="object-contain drop-shadow-[0_0_20px_#f4ebcb]"
                      />
                    </div>
                  </div>
                )}

                {edition.id === "2025" && (
                  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                    <Image
                      src={MIRACOSTA_2025}
                      alt="MiraCosta College"
                      fill
                      className="object-cover opacity-30"
                    />
                    <div className="relative z-10 w-24 h-24 animate-pulse">
                      <Image
                        src={edition.previewImage}
                        alt="2025 Hot Air Balloon"
                        fill
                        className="object-contain drop-shadow-lg"
                      />
                    </div>
                  </div>
                )}

                {edition.id === "2026-original" && (
                  <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-tr from-purple-900/40 to-amber-900/40">
                    <div className="relative z-10 w-24 h-24">
                      <Image
                        src={edition.previewImage}
                        alt="2026 Hot Air Balloon"
                        fill
                        className="object-contain drop-shadow-md"
                      />
                    </div>
                    <div className="absolute bottom-2 text-center text-[10px] font-mono font-bold text-amber-300 bg-slate-950/80 px-2 py-0.5 rounded border border-white/10">
                      TORRANCE · SAN MATEO
                    </div>
                  </div>
                )}
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-1">
                <h3 className="font-heading text-2xl sm:text-3xl text-white group-hover:text-amber-300 transition-colors">
                  {edition.title}
                </h3>
                <p className="font-serif italic text-amber-300/90 text-sm">
                  {edition.subtitle}
                </p>
              </div>

              {/* Date & Location Badges */}
              <div className="mt-4 space-y-2 text-xs text-slate-300 font-sans">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{edition.dates}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{edition.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{edition.attendees}</span>
                </div>
              </div>

              {/* Narrative description */}
              <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans flex-1">
                {edition.description}
              </p>

              {/* Highlights List */}
              <div className="mt-4 pt-4 border-t border-white/10 space-y-1.5">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                  Key Milestones
                </div>
                <ul className="space-y-1 text-xs text-slate-300 font-sans">
                  {edition.highlights.slice(0, 3).map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button: Explicit Href Rule */}
              <div className="mt-6 pt-2">
                <Link
                  href={edition.href}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm transition-all shadow-md active:scale-95 group/btn"
                >
                  <span>Launch {edition.year} Archive</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Global Road Trip Footer */}
      <RoadTripFooter />
    </div>
  );
}
