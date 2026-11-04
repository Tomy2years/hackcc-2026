'use client';

import React, { useState } from 'react';
import { mockAnnouncements } from '@/lib/dashboardMockData';
import { AlertCircle, Utensils, Sparkles, X, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false);
  const activeAnnouncement = mockAnnouncements.find((a) => a.isPinned) || mockAnnouncements[0];

  if (!activeAnnouncement || dismissed) return null;

  const getIcon = () => {
    switch (activeAnnouncement.category) {
      case 'food':
        return <Utensils className="w-4 h-4 text-amber-300 shrink-0" />;
      case 'urgent':
        return <AlertCircle className="w-4 h-4 text-red-300 shrink-0" />;
      default:
        return <Sparkles className="w-4 h-4 text-sky-300 shrink-0" />;
    }
  };

  const getBadgeColor = () => {
    switch (activeAnnouncement.category) {
      case 'food':
        return 'bg-amber-500/20 text-amber-200 border-amber-500/30';
      case 'urgent':
        return 'bg-red-500/20 text-red-200 border-red-500/30';
      default:
        return 'bg-sky-500/20 text-sky-200 border-sky-500/30';
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-amber-500/15 via-slate-900/40 to-sky-500/15 border-b border-amber-400/20 text-white backdrop-blur-md px-4 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <span className={`px-2 py-0.5 rounded-full border text-[11px] font-bold uppercase tracking-wider ${getBadgeColor()}`}>
            {activeAnnouncement.category}
          </span>
          <div className="flex items-center gap-1.5 truncate">
            {getIcon()}
            <span className="font-semibold text-white truncate">{activeAnnouncement.title}</span>
            <span className="hidden md:inline text-white/70 truncate">— {activeAnnouncement.content}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/dashboard/schedule"
            className="hidden sm:inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 font-semibold text-xs transition-colors"
          >
            <span>Timeline</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss banner"
            className="p-1 text-white/60 hover:text-white rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
