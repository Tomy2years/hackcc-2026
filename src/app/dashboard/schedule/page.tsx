'use client';

import React, { useState } from 'react';
import { mockSchedule } from '@/lib/dashboardMockData';
import {
  Calendar,
  Clock,
  MapPin,
} from 'lucide-react';
import Link from 'next/link';

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState<'Saturday' | 'Sunday'>('Saturday');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'All Events' },
    { key: 'keynote', label: 'Ceremony / Keynote' },
    { key: 'workshop', label: 'Workshops' },
    { key: 'food', label: 'Food & Meals' },
    { key: 'activity', label: 'Activities & Social' },
    { key: 'deadline', label: 'Deadlines' },
  ];

  const filteredItems = mockSchedule.filter((item) => {
    const matchesDay = item.day === selectedDay;
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesDay && matchesCat;
  });

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'food':
        return 'text-amber-300 bg-amber-400/10 border-amber-400/30';
      case 'workshop':
        return 'text-sky-300 bg-sky-500/10 border-sky-400/30';
      case 'deadline':
        return 'text-red-300 bg-red-500/15 border-red-500/30 font-bold';
      case 'keynote':
        return 'text-blue-300 bg-blue-500/10 border-blue-400/30';
      default:
        return 'text-emerald-300 bg-emerald-500/10 border-emerald-400/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>HackCC 2026 Timeline</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading text-white">Event Schedule</h1>
          <p className="text-xs sm:text-sm text-white/60">
            Orange Coast College • November 14–15, 2026
          </p>
        </div>

        {/* Day Switcher */}
        <div className="flex items-center p-1 bg-slate-900 border border-white/15 rounded-2xl shrink-0">
          <button
            onClick={() => setSelectedDay('Saturday')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedDay === 'Saturday'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Saturday, Nov 14
          </button>
          <button
            onClick={() => setSelectedDay('Sunday')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedDay === 'Sunday'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Sunday, Nov 15
          </button>
        </div>
      </div>

      {/* 2. Category Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setSelectedCategory(c.key)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === c.key
                ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                : 'bg-white/5 text-white/70 hover:text-white border border-white/10'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* 3. Timeline Items */}
      <div className="space-y-4">
        {filteredItems.map((item) => {
          return (
            <div
              key={item.id}
              className={`rounded-3xl p-5 border transition-all backdrop-blur-md ${
                item.isCurrent
                  ? 'bg-linear-to-r from-emerald-950/40 via-slate-900 to-slate-900 border-emerald-400/60 shadow-lg shadow-emerald-500/10'
                  : 'bg-slate-900/70 border-white/10 hover:border-white/25'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full border ${getCategoryColor(
                        item.category
                      )}`}
                    >
                      {item.category}
                    </span>

                    {item.isCurrent && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400 text-[10px] font-bold animate-pulse">
                        ● HAPPENING NOW
                      </span>
                    )}

                    {item.isNext && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-bold">
                        UP NEXT
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white">{item.title}</h3>

                  {item.description && (
                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-2xl">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Right: Time & Location Pill */}
                <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-start gap-1 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{item.time}</span>
                  </div>

                  <Link
                    href="/dashboard/map"
                    className="flex items-center gap-1 text-xs text-white/60 hover:text-white transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{item.location}</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
