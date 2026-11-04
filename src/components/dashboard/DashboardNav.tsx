'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Gamepad2,
  Trophy,
  QrCode,
  Calendar,
  Users,
  LifeBuoy,
  MapPin,
  MoreHorizontal,
  X,
  ExternalLink,
} from 'lucide-react';

const mainNavItems = [
  { href: '/dashboard', label: 'Hub', icon: LayoutDashboard },
  { href: '/dashboard/dex', label: 'Hack-Dex', icon: Gamepad2 },
  { href: '/dashboard/leaderboard', label: 'Rankings', icon: Trophy },
  { href: '/dashboard/pass', label: 'Pass', icon: QrCode },
  { href: '/dashboard/schedule', label: 'Timeline', icon: Calendar },
  { href: '/dashboard/team', label: 'Team', icon: Users },
  { href: '/dashboard/mentors', label: 'Mentors', icon: LifeBuoy },
  { href: '/dashboard/map', label: 'Venue Map', icon: MapPin },
];

const mobilePrimaryItems = [
  { href: '/dashboard', label: 'Hub', icon: LayoutDashboard },
  { href: '/dashboard/dex', label: 'Dex', icon: Gamepad2 },
  { href: '/dashboard/leaderboard', label: 'Rank', icon: Trophy },
  { href: '/dashboard/pass', label: 'Pass', icon: QrCode },
];

export function DashboardNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname?.startsWith(href);
  };

  return (
    <>
      {/* Desktop Horizontal Navigation Bar */}
      <nav aria-label="Desktop Dashboard Navigation" className="hidden lg:block w-full bg-slate-900/60 border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-1 py-2 overflow-x-auto scrollbar-none">
            {mainNavItems.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                    active
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-slate-950' : 'text-white/60'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <Link
            href="/2026"
            className="flex items-center gap-1.5 text-xs text-white/50 hover:text-amber-300 transition-colors py-2"
          >
            <span>Back to HackCC</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* Mobile Persistent Bottom Navigation Bar (Thumb Friendly) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-t border-white/15 pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-5 h-16 max-w-md mx-auto items-center px-1">
          {mobilePrimaryItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 h-full py-1 text-[11px] font-semibold transition-all ${
                  active
                    ? 'text-amber-300 font-bold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <div
                  className={`p-1 rounded-xl transition-all ${
                    active ? 'bg-amber-400/20 text-amber-300 scale-110' : ''
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="leading-none">{item.label}</span>
              </Link>
            );
          })}

          {/* More Drawer Trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open more navigation options"
            className={`flex flex-col items-center justify-center gap-1 h-full py-1 text-[11px] font-semibold transition-all ${
              mobileMenuOpen ? 'text-amber-300' : 'text-white/60 hover:text-white'
            }`}
          >
            <div className="p-1 rounded-xl">
              <MoreHorizontal className="w-5 h-5" />
            </div>
            <span className="leading-none">More</span>
          </button>
        </div>
      </div>

      {/* Mobile "More" Drawer Modal */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Additional navigation options"
          className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-end"
        >
          <div
            className="w-full bg-slate-900 border-t border-white/15 rounded-t-3xl p-6 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] animate-in slide-in-from-bottom-5 duration-200"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <span className="font-heading text-lg text-white">More Navigation</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="p-1.5 text-white/60 hover:text-white rounded-full bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <Link
                href="/dashboard/schedule"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 text-white"
              >
                <Calendar className="w-5 h-5 text-amber-300" />
                <div className="text-left">
                  <div className="text-xs font-bold">Timeline</div>
                  <div className="text-[10px] text-white/50">Schedule & Rooms</div>
                </div>
              </Link>

              <Link
                href="/dashboard/team"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 text-white"
              >
                <Users className="w-5 h-5 text-amber-300" />
                <div className="text-left">
                  <div className="text-xs font-bold">Team Hub</div>
                  <div className="text-[10px] text-white/50">Roster & Devpost</div>
                </div>
              </Link>

              <Link
                href="/dashboard/mentors"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 text-white"
              >
                <LifeBuoy className="w-5 h-5 text-emerald-300" />
                <div className="text-left">
                  <div className="text-xs font-bold">Call Mentor</div>
                  <div className="text-[10px] text-white/50">Roadside Help</div>
                </div>
              </Link>

              <Link
                href="/dashboard/map"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 text-white"
              >
                <MapPin className="w-5 h-5 text-blue-300" />
                <div className="text-left">
                  <div className="text-xs font-bold">Venue Map</div>
                  <div className="text-[10px] text-white/50">OCC & Wi-Fi</div>
                </div>
              </Link>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
              <Link href="/2026" className="text-amber-300 font-semibold flex items-center gap-1">
                <span>HackCC 2026 Homepage</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <span>Orange Coast College</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
