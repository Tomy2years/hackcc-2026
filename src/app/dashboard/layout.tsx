import React from 'react';
import type { Metadata } from 'next';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { AnnouncementBanner } from '@/components/dashboard/AnnouncementBanner';

export const metadata: Metadata = {
  title: 'Hacker Mission Control | HackCC 2026',
  description: 'Your day-of command center for HackCC 2026.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative selection:bg-amber-400 selection:text-slate-950 font-sans">
      {/* Authentic California road trip deep slate-to-navy atmosphere (matches current HackCC 2026 site) */}
      <div
        className="fixed inset-0 z-0 pointer-events-none select-none"
        style={{
          background: 'radial-gradient(ellipse 100% 70% at 50% 0%, #081638 0%, #050B1B 50%, #020617 100%)',
        }}
      />
      {/* Subtle golden-hour road trip warm ambient glow */}
      <div
        className="fixed inset-0 z-0 pointer-events-none select-none opacity-30"
        style={{
          background: 'radial-gradient(circle at 85% 15%, rgba(251, 250, 116, 0.08) 0%, transparent 45%)',
        }}
      />

      {/* Top Header & Priority Alert Banner */}
      <div className="relative z-40">
        <AnnouncementBanner />
        <DashboardHeader />
      </div>

      {/* Main Content Viewport (Clean 5xl max-width, no horizontal sprawl) */}
      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-6 pb-20 md:pb-12">
        {children}
      </main>
    </div>
  );
}
