'use client';

import React, { useState } from 'react';
import { mockLeaderboard, mockCurrentUser } from '@/lib/dashboardMockData';
import { Trophy, Search, HelpCircle } from 'lucide-react';

export default function LeaderboardPage() {
  const [filterCollege, setFilterCollege] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const colleges = ['all', ...Array.from(new Set(mockLeaderboard.map((e) => e.college)))];

  const filteredEntries = mockLeaderboard.filter((entry) => {
    const matchesCollege = filterCollege === 'all' || entry.college === filterCollege;
    const matchesSearch =
      entry.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.college.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCollege && matchesSearch;
  });

  const top3 = mockLeaderboard.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* 1. Leaderboard Podium Header */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900/85 border border-amber-400/30 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-semibold">
            <Trophy className="w-4 h-4" />
            <span>Grand Closing Prizes</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-heading text-white tracking-wide">
            Live Pokédex Leaderboard
          </h1>
          <p className="text-xs sm:text-sm text-white/70">
            Ranked by total XP, badges unlocked, and earliest unlock timestamp. Top 3 collectors win grand hardware prizes on stage!
          </p>
        </div>

        {/* Podium Display (2nd, 1st, 3rd) */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto items-end pt-4">
          {/* 2nd Place */}
          {top3[1] && (
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-slate-300/20 border-2 border-slate-300 flex items-center justify-center text-xl sm:text-2xl mb-2 shadow-lg">
                🥈
              </div>
              <div className="w-full bg-slate-800/80 border border-slate-400/30 rounded-2xl p-3 text-center space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                  2nd Place
                </span>
                <div className="text-xs sm:text-sm font-bold text-white truncate">
                  {top3[1].fullName}
                </div>
                <div className="text-[10px] text-white/50 truncate">{top3[1].college}</div>
                <div className="font-heading text-sm sm:text-base text-amber-300">
                  {top3[1].totalXp} XP
                </div>
              </div>
            </div>
          )}

          {/* 1st Place (Monumental) */}
          {top3[0] && (
            <div className="flex flex-col items-center -mt-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-amber-400/30 border-2 border-amber-400 flex items-center justify-center text-2xl sm:text-4xl mb-2 shadow-xl shadow-amber-400/20">
                👑
              </div>
              <div className="w-full bg-amber-500/15 border-2 border-amber-400/50 rounded-2xl p-3.5 sm:p-4 text-center space-y-1 shadow-lg">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  Grand Champion
                </span>
                <div className="text-sm sm:text-base font-bold text-white truncate">
                  {top3[0].fullName}
                </div>
                <div className="text-[11px] text-white/70 truncate">{top3[0].college}</div>
                <div className="font-heading text-lg sm:text-xl text-amber-300">
                  {top3[0].totalXp} XP
                </div>
                <div className="text-[10px] text-emerald-400 font-semibold">
                  {top3[0].totalBadges} Badges
                </div>
              </div>
            </div>
          )}

          {/* 3rd Place */}
          {top3[2] && (
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-amber-700/20 border-2 border-amber-700 flex items-center justify-center text-xl sm:text-2xl mb-2 shadow-lg">
                🥉
              </div>
              <div className="w-full bg-slate-800/80 border border-amber-700/30 rounded-2xl p-3 text-center space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
                  3rd Place
                </span>
                <div className="text-xs sm:text-sm font-bold text-white truncate">
                  {top3[2].fullName}
                </div>
                <div className="text-[10px] text-white/50 truncate">{top3[2].college}</div>
                <div className="font-heading text-sm sm:text-base text-amber-300">
                  {top3[2].totalXp} XP
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 2. User's Sticky Rank Card */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border-2 border-amber-400/40 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-heading font-bold text-base">
            #{mockCurrentUser.rank}
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
              <span>{mockCurrentUser.fullName}</span>
              <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 text-[10px]">
                You
              </span>
            </div>
            <div className="text-[11px] text-white/60">{mockCurrentUser.college}</div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-right">
          <div>
            <div className="text-[10px] text-white/50 uppercase">Badges</div>
            <div className="text-xs sm:text-sm font-bold text-white">{mockCurrentUser.totalBadges}</div>
          </div>
          <div>
            <div className="text-[10px] text-white/50 uppercase">Total XP</div>
            <div className="font-heading text-base sm:text-lg text-amber-300 leading-none">
              {mockCurrentUser.totalXp}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Search & College Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-semibold text-white/50 shrink-0">Filter:</span>
          {colleges.map((c) => (
            <button
              key={c}
              onClick={() => setFilterCollege(c)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterCollege === c
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'bg-white/5 text-white/70 hover:text-white border border-white/10'
              }`}
            >
              {c === 'all' ? 'All Colleges' : c}
            </button>
          ))}
        </div>

        <div className="relative sm:w-64 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search hackers..."
            className="w-full bg-slate-900/80 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-white/40 focus:outline-hidden focus:border-amber-400/50"
          />
        </div>
      </div>

      {/* 4. Complete Rankings Table */}
      <div className="rounded-3xl bg-slate-900/70 border border-white/10 overflow-hidden backdrop-blur-md shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-black/40 border-b border-white/10 text-white/50 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4 sm:px-6">Rank</th>
                <th className="py-3 px-4">Hacker</th>
                <th className="py-3 px-4 hidden sm:table-cell">College</th>
                <th className="py-3 px-4 text-center">Badges</th>
                <th className="py-3 px-4 sm:px-6 text-right">Total XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredEntries.map((entry) => {
                const isUser = entry.isCurrentUser;
                return (
                  <tr
                    key={entry.userId}
                    className={`hover:bg-white/5 transition-colors ${
                      isUser ? 'bg-amber-400/10 font-bold' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 sm:px-6 font-mono text-xs">
                      {entry.rank === 1 && '🥇 #1'}
                      {entry.rank === 2 && '🥈 #2'}
                      {entry.rank === 3 && '🥉 #3'}
                      {entry.rank > 3 && `#${entry.rank}`}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white flex items-center gap-1.5">
                        <span>{entry.fullName}</span>
                        {isUser && (
                          <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 text-[9px] font-bold">
                            YOU
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-white/50 sm:hidden">{entry.college}</div>
                    </td>

                    <td className="py-3.5 px-4 hidden sm:table-cell text-white/70">
                      {entry.college}
                    </td>

                    <td className="py-3.5 px-4 text-center text-white/90">
                      <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                        {entry.totalBadges}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <span className="font-heading text-sm text-amber-300">{entry.totalXp} XP</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Tie-Breaker Informational Notice */}
        <div className="p-4 bg-black/30 border-t border-white/10 flex items-center gap-2 text-[11px] text-white/50">
          <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Deterministic Tie-Breaker:</strong> If hackers share equal XP and badge counts, the podium rank is awarded to the hacker who unlocked their latest badge earliest.
          </span>
        </div>
      </div>
    </div>
  );
}
