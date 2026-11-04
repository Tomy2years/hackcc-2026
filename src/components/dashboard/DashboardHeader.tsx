'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  QrCode,
  Calendar,
  Gamepad2,
  Trophy,
  LifeBuoy,
  LayoutDashboard,
} from 'lucide-react';

const navLinks = [
  { href: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { href: '/dashboard/pass', label: 'Pass', icon: QrCode },
  { href: '/dashboard/schedule', label: 'Schedule', icon: Calendar },
  { href: '/dashboard/dex', label: 'Pokédex', icon: Gamepad2 },
  { href: '/dashboard/leaderboard', label: 'Leaderboard', icon: Trophy },
];

export function DashboardHeader() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname?.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-md border-b border-white/10 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand */}
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-heading font-bold text-sm flex items-center justify-center shadow-xs">
              CC
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-heading text-lg tracking-wide text-white">HackCC</span>
              <span className="text-[11px] font-bold text-amber-300">2026</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav aria-label="Dashboard Navigation" className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    active
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Request Mentor / Help Button */}
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/mentors"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-white/15 text-white text-xs font-semibold transition-colors"
            >
              <LifeBuoy className="w-3.5 h-3.5 text-amber-400" />
              <span>Need Help?</span>
            </Link>

            <Link
              href="/dashboard/pass"
              className="md:hidden p-2 rounded-lg bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors"
              title="My Pass"
            >
              <QrCode className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Persistent Bottom Bar (Clean 4-icon dock) */}
      <nav aria-label="Mobile Bottom Navigation" className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-4 h-14 max-w-sm mx-auto items-center">
          {navLinks.slice(0, 4).map((link) => {
            const active = isActive(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center justify-center gap-0.5 h-full text-[10px] font-semibold transition-colors ${
                  active ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
