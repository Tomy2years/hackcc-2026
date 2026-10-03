"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail, Users, Terminal, Megaphone, Handshake, HeartHandshake } from "lucide-react";
import hackccIcon from "../../../../public/images/hackcc-icon.png";

const SCENIC_BG = "/assets/roadtrip/organizers/coastal-overlook.jpeg";

const TEAMS = [
  {
    icon: Terminal,
    title: "Engineering & Tech",
    description: "Build web apps, check-in software, Discord integrations, and hacker portals for hundreds of hackers.",
  },
  {
    icon: Users,
    title: "Logistics & Operations",
    description: "Coordinate venue layout, hardware, scheduling, catering, day-of flow, and hacker hospitality.",
  },
  {
    icon: Handshake,
    title: "Sponsorship & Industry",
    description: "Partner with top tech companies, secure funding, organize company workshops, and coordinate prizes.",
  },
  {
    icon: Megaphone,
    title: "Design & Marketing",
    description: "Craft visual identity, road-trip swag, merchandise, flyers, social media campaigns, and web graphics.",
  },
  {
    icon: HeartHandshake,
    title: "Hacker Experience",
    description: "Plan mini-events, workshops, mentor matching, beginner-friendly tracks, and community engagement.",
  },
];

export default function OrganizerApplyPage() {
  return (
    <main className="relative min-h-screen w-full bg-slate-950 text-white overflow-x-hidden selection:bg-amber-400 selection:text-slate-950">
      {/* Background Image Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image
          src={SCENIC_BG}
          alt="California Coastal Overlook"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Deep atmospheric scrim */}
        <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[2px]" />
        {/* Soft edge gradients */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-950 via-slate-950/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
      </div>

      {/* Top Header Navigation */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 flex items-center justify-between">
        <Link
          href="/organizers"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/15 text-sm font-bold shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400" />
          <span>Back to Organizers</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 relative">
            <Image
              src={hackccIcon}
              alt="HackCC Logo"
              width={36}
              height={36}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-heading text-lg tracking-wider text-amber-400 hidden sm:inline-block">
            HACKCC 2026
          </span>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 text-center">
        {/* Unboxed Header */}
        <div className="mb-14">
          <h1 className="font-heading text-4xl sm:text-6xl text-white leading-tight mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            JOIN THE ORGANIZING TEAM
          </h1>
          <p className="font-serif italic text-amber-200/95 text-xl sm:text-2xl font-light mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            Build California&apos;s premier community college hackathon
          </p>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            We are looking for motivated students across California community colleges who want to shape the 2026 road trip, gain real-world leadership experience, and make a massive impact.
          </p>
        </div>

        {/* Organizer Roles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14 text-left">
          {TEAMS.map((team, idx) => {
            const Icon = team.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/85 border border-white/15 rounded-2xl p-6 backdrop-blur-md shadow-xl hover:border-amber-400/50 transition-all hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-xl text-white mb-2">
                  {team.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {team.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Call to Action Unboxed Section */}
        <div className="pt-10 border-t border-white/15 max-w-xl mx-auto">
          <h2 className="font-heading text-2xl sm:text-3xl text-white mb-3">
            READY TO RIDE SHOTGUN?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mb-6 leading-relaxed">
            Send us a message with your background, college, and areas you&apos;d love to help lead. We review rolling inquiries weekly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:team@hackcc.net?subject=HackCC%202026%20Organizer%20Application"
              className="inline-flex items-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-8 py-3.5 rounded-full text-base shadow-xl shadow-black/40 transition-all hover:scale-105 active:scale-95"
            >
              <Mail className="w-5 h-5" />
              <span>Email team@hackcc.net</span>
              <span className="text-lg">→</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
