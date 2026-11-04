'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  mockCurrentUser,
  mockBadges,
  mockSchedule,
  mockTeam,
  mockMentorTickets,
  mockVenueInfo,
} from '@/lib/dashboardMockData';
import {
  Clock,
  QrCode,
  Calendar,
  Gamepad2,
  LifeBuoy,
  MapPin,
  ArrowRight,
  Wifi,
  Users,
} from 'lucide-react';

export default function DashboardHubPage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 13,
    minutes: 42,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59 };
        }
        return prev;
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const unlockedCount = mockBadges.filter((b) => b.unlocked).length;
  const currentEvent = mockSchedule.find((s) => s.isCurrent) || mockSchedule[6];
  const nextEvent = mockSchedule.find((s) => s.isNext) || mockSchedule[7];
  const activeTicket = mockMentorTickets.find((t) => t.status === 'claimed' || t.status === 'queued');

  return (
    <div className="space-y-5">
      {/* 1. Compact Status Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/75 border border-white/10 backdrop-blur-md shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-white">{mockCurrentUser.fullName}</h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold">
              Checked In
            </span>
          </div>
          <p className="text-xs text-white/70">
            {mockTeam.tableNumber} • {mockTeam.name}
          </p>
        </div>

        {/* Clean, compact countdown badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs">
          <Clock className="w-3.5 h-3.5 text-amber-300" />
          <span className="text-white/60">Hacking Ends in:</span>
          <span className="font-mono font-bold text-amber-300">
            {timeLeft.hours}h {timeLeft.minutes}m
          </span>
        </div>
      </div>

      {/* 2. Core 2-Column Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Your Digital Pass */}
        <Link
          href="/dashboard/pass"
          className="p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-900/90 border border-white/10 hover:border-amber-400/40 transition-all flex flex-col justify-between group shadow-lg"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <QrCode className="w-4 h-4" />
                <span>Your Hacker Pass</span>
              </span>
              <span className="text-[10px] text-white/60">Tap to show</span>
            </div>

            <div className="flex items-center gap-3.5 bg-black/40 p-3 rounded-xl border border-white/5">
              <div className="w-14 h-14 bg-white rounded-lg p-1.5 shrink-0 flex items-center justify-center">
                <QrCode className="w-full h-full text-slate-950" />
              </div>
              <div className="overflow-hidden space-y-0.5">
                <div className="text-sm font-bold text-white truncate">{mockCurrentUser.fullName}</div>
                <div className="text-xs text-white/60 truncate">{mockCurrentUser.college}</div>
                <div className="text-[11px] text-amber-300 font-semibold">
                  Dietary: {mockCurrentUser.dietaryRestrictions || 'Standard'}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-white/80 group-hover:text-amber-300">
            <span>Show at Meals & Swag lines</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

        {/* Card 2: Happening Now */}
        <Link
          href="/dashboard/schedule"
          className="p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-900/90 border border-white/10 hover:border-amber-400/40 transition-all flex flex-col justify-between group shadow-lg"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>Happening Now</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[10px] font-bold animate-pulse">
                Live
              </span>
            </div>

            <div className="space-y-1 bg-black/40 p-3 rounded-xl border border-white/5">
              <div className="text-[11px] font-bold text-amber-300">{currentEvent.time}</div>
              <div className="text-sm font-bold text-white line-clamp-1">{currentEvent.title}</div>
              <div className="text-xs text-white/60 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentEvent.location}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-white/80 group-hover:text-amber-300">
            <span>Next: {nextEvent.title}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      </div>

      {/* 3. Essential Hacker Shortcuts (Clean 3-pill row) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Pokédex Shortcut */}
        <Link
          href="/dashboard/dex"
          className="p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 hover:border-amber-400/30 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-400/15 text-amber-300 border border-amber-400/20">
              <Gamepad2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Pokédex Badges</div>
              <div className="text-[11px] text-white/50">{unlockedCount} / {mockBadges.length} Collected</div>
            </div>
          </div>
          <span className="text-xs font-bold text-amber-300 font-mono">#{mockCurrentUser.rank}</span>
        </Link>

        {/* Mentor Help Shortcut */}
        <Link
          href="/dashboard/mentors"
          className="p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 hover:border-emerald-400/30 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">
              <LifeBuoy className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Roadside Mentors</div>
              <div className="text-[11px] text-white/50">
                {activeTicket ? 'Mentor on the way' : 'Request assistance'}
              </div>
            </div>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-white/40" />
        </Link>

        {/* Venue & Wi-Fi Shortcut */}
        <Link
          href="/dashboard/map"
          className="p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 hover:border-sky-400/30 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-sky-500/15 text-sky-300 border border-sky-500/20">
              <Wifi className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Wi-Fi & Map</div>
              <div className="text-[11px] text-white/50">{mockVenueInfo.wifiSSID}</div>
            </div>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-white/40" />
        </Link>
      </div>

      {/* 4. Team & Devpost Pre-Flight (Clean & Compact) */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <Users className="w-4 h-4 text-amber-300 shrink-0" />
          <span>
            Project: <strong className="text-white font-semibold">{mockTeam.projectName}</strong> ({mockTeam.members.length}/4 members)
          </span>
        </div>
        <Link
          href="/dashboard/team"
          className="text-amber-300 hover:text-amber-200 font-semibold inline-flex items-center gap-1 self-start sm:self-auto"
        >
          <span>Manage Team & Devpost Submission</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
