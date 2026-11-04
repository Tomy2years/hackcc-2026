'use client';

import React, { useState } from 'react';
import { mockBadges, mockCurrentUser } from '@/lib/dashboardMockData';
import { PokedexBadge } from '@/types/dashboard';
import {
  Gamepad2,
  Camera,
  KeyRound,
  X,
  Volume2,
  VolumeX,
  CheckCircle2,
  Lock,
  Search,
  Trophy,
} from 'lucide-react';
import { BadgeIcon } from '@/components/dashboard/BadgeIcon';

export default function PokedexPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [scanTab, setScanTab] = useState<'camera' | 'pin'>('camera');
  const [unlockedStateBadges, setUnlockedStateBadges] = useState<PokedexBadge[]>(mockBadges);
  const [unlockSuccess, setUnlockSuccess] = useState<string | null>(null);

  const categories: { key: string; label: string; icon: string }[] = [
    { key: 'all', label: 'All Badges', icon: '⭐' },
    { key: 'workshop', label: 'Workshops', icon: '💻' },
    { key: 'food', label: 'Food & Pit Stops', icon: '🌮' },
    { key: 'social', label: 'Social & Games', icon: '🎮' },
    { key: 'sponsor', label: 'Sponsors', icon: '💼' },
    { key: 'milestone', label: 'Milestones', icon: '🏁' },
    { key: 'secret', label: 'Secrets', icon: '🕵️' },
  ];

  const filteredBadges = unlockedStateBadges.filter((b) => {
    const matchesCategory = selectedCategory === 'all' || b.category === selectedCategory;
    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.hint.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const unlockedCount = unlockedStateBadges.filter((b) => b.unlocked).length;
  const totalXp = unlockedStateBadges
    .filter((b) => b.unlocked)
    .reduce((acc, curr) => acc + curr.xpPoints, 0);

  // Simulated Unlock Handler for Team Testing
  const handleClaimCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinCode.trim()) return;

    // Simulate claiming Badge #008 (Cloud Climber) if testing
    const targetBadge = unlockedStateBadges.find((b) => !b.unlocked);
    if (targetBadge) {
      const updated = unlockedStateBadges.map((b) =>
        b.id === targetBadge.id
          ? {
              ...b,
              unlocked: true,
              unlockedAt: new Date().toISOString(),
              unlockedVia: 'secret_code' as const,
            }
          : b
      );
      setUnlockedStateBadges(updated);
      setUnlockSuccess(`Unlocked #${targetBadge.badgeNumber}: ${targetBadge.name} (+${targetBadge.xpPoints} XP)!`);
      setPinCode('');
      setTimeout(() => {
        setUnlockSuccess(null);
        setIsScanModalOpen(false);
      }, 2000);
    }
  };

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'border-amber-400/80 bg-amber-400/20 text-amber-300';
      case 'epic':
        return 'border-sky-400/80 bg-sky-500/20 text-sky-300';
      case 'rare':
        return 'border-blue-400/80 bg-blue-500/20 text-blue-300';
      default:
        return 'border-emerald-400/60 bg-emerald-500/15 text-emerald-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Retro Game Boy / Dex Deck Header */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900/85 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-semibold">
              <Gamepad2 className="w-4 h-4" />
              <span>HackCC Pokédex v2.6</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-heading text-white tracking-wide">
              The Hack-Dex Collector
            </h1>
            <p className="text-sm text-white/70 max-w-xl">
              Hunt down workshop QRs, meet sponsor mentors, and attend midnight fuel stops. Top 3 badge collectors win grand hardware prizes on stage!
            </p>
          </div>

          {/* Action Hub & Live Stats */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-black/50 border border-white/10 text-center">
              <div className="text-[10px] text-white/50 uppercase tracking-widest">Total XP</div>
              <div className="font-heading text-2xl text-amber-300">{totalXp}</div>
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-black/50 border border-white/10 text-center">
              <div className="text-[10px] text-white/50 uppercase tracking-widest">Badges</div>
              <div className="font-heading text-2xl text-amber-300">
                {unlockedCount} / {unlockedStateBadges.length}
              </div>
            </div>

            <button
              onClick={() => setIsScanModalOpen(true)}
              className="py-3 px-5 rounded-2xl bg-linear-to-r from-amber-400 to-amber-300 text-slate-950 font-bold text-sm flex items-center gap-2 hover:brightness-110 active:scale-95 shadow-lg shadow-amber-400/20 transition-all cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>Scan Station Code</span>
            </button>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Chiptune Sound Enabled' : 'Muted'}
              aria-label={soundEnabled ? 'Disable retro sound effects' : 'Enable retro sound effects'}
              className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              {soundEnabled ? <Volume2 className="w-5 h-5 text-amber-400" /> : <VolumeX className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Level Progress */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-white/60">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Currently Ranked <strong className="text-amber-300 font-bold">#{mockCurrentUser.rank}</strong> on the live leaderboard</span>
          </div>
          <span>{Math.round((unlockedCount / unlockedStateBadges.length) * 100)}% Pokédex Completion</span>
        </div>
      </section>

      {/* 2. Filters & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setSelectedCategory(c.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedCategory === c.key
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                  : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              <span>{c.icon}</span>
              <span>{c.label}</span>
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative sm:w-64 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search badges or clues..."
            className="w-full bg-slate-900/80 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-white/40 focus:outline-hidden focus:border-amber-400/50"
          />
        </div>
      </div>

      {/* 3. Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBadges.map((badge) => {
          return (
            <div
              key={badge.id}
              className={`rounded-2xl p-4.5 border transition-all flex flex-col justify-between relative overflow-hidden ${
                badge.unlocked
                  ? 'bg-slate-900/90 border-white/15 hover:border-amber-400/50 shadow-md hover:-translate-y-1'
                  : 'bg-black/40 border-white/5 opacity-75 hover:opacity-100'
              }`}
            >
              <div>
                {/* Header: Number & Rarity */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold text-white/40">
                    #{String(badge.badgeNumber).padStart(3, '0')}
                  </span>
                  <span
                    className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border ${getRarityBadge(
                      badge.rarity
                    )}`}
                  >
                    {badge.rarity}
                  </span>
                </div>

                {/* Badge Centerpiece */}
                <div className="flex items-center gap-3.5 mb-3">
                  <BadgeIcon
                    badgeNumber={badge.badgeNumber}
                    category={badge.category}
                    unlocked={badge.unlocked}
                    size="md"
                  />

                  <div className="overflow-hidden">
                    <h2 className="text-sm font-bold text-white truncate">
                      {badge.unlocked ? badge.name : '???'}
                    </h2>
                    <div className="text-xs font-semibold text-amber-300 mt-0.5">
                      +{badge.xpPoints} XP
                    </div>
                  </div>
                </div>

                {/* Description or Cryptic Clue */}
                <p className="text-xs text-white/70 leading-relaxed min-h-[3rem]">
                  {badge.unlocked ? badge.description : badge.hint}
                </p>
              </div>

              {/* Status Footer */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
                {badge.unlocked ? (
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Unlocked</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-white/40">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Locked</span>
                  </span>
                )}

                <span className="text-white/40 capitalize">{badge.category}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Scan Station / Enter Code Modal */}
      {isScanModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Unlock Station Badge"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            className="w-full max-w-md bg-slate-900 border border-white/15 rounded-3xl p-6 relative shadow-2xl animate-in zoom-in-95 duration-200"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsScanModalOpen(false)}
              aria-label="Close modal"
              className="absolute top-5 right-5 p-1.5 text-white/60 hover:text-white rounded-full bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1 mb-5">
              <h2 className="font-heading text-xl text-white">Unlock Station Badge</h2>
              <p className="text-xs text-white/60">
                Point at the presenter projector or enter the dynamic 4-digit TOTP PIN
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="grid grid-cols-2 p-1 bg-black/40 rounded-xl mb-5 border border-white/10">
              <button
                onClick={() => setScanTab('camera')}
                className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  scanTab === 'camera'
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Camera Scan</span>
              </button>
              <button
                onClick={() => setScanTab('pin')}
                className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  scanTab === 'pin'
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Enter 4-Digit PIN</span>
              </button>
            </div>

            {/* Success Toast Preview */}
            {unlockSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-bold text-center animate-in fade-in">
                🎉 {unlockSuccess}
              </div>
            )}

            {scanTab === 'camera' ? (
              <div className="space-y-4">
                {/* Simulated Camera Viewfinder */}
                <div className="relative aspect-square w-full bg-black rounded-2xl overflow-hidden border border-white/20 flex flex-col items-center justify-center text-center p-6">
                  {/* Viewfinder crosshairs */}
                  <div className="absolute inset-8 border-2 border-dashed border-amber-400/50 rounded-xl pointer-events-none" />
                  <div className="w-12 h-12 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center mb-3 animate-pulse">
                    <Camera className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-semibold text-white">Align Station QR in box</p>
                  <p className="text-[11px] text-white/50 max-w-xs mt-1">
                    Binds directly to live camera stream (photo uploads are blocked to prevent screenshot sharing).
                  </p>

                  {/* Dev / Test Trigger Button */}
                  <button
                    type="button"
                    onClick={(e) => handleClaimCode(e)}
                    className="mt-4 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-amber-300 text-[11px] font-semibold border border-white/10"
                  >
                    [Simulate Station QR Scan]
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleClaimCode} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="station-pin-input" className="text-xs font-semibold text-white/80">
                    Workshop Projector PIN or Secret Code
                  </label>
                  <input
                    id="station-pin-input"
                    type="text"
                    maxLength={8}
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value.toUpperCase())}
                    placeholder="e.g. 7482 or PROMPT26"
                    className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-center text-xl font-mono tracking-widest text-amber-300 uppercase placeholder-white/20 focus:outline-hidden focus:border-amber-400"
                  />
                  <p className="text-[11px] text-white/50 text-center">
                    Projector PINs rotate every 20 seconds. Enter before the timer resets.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-linear-to-r from-amber-400 to-amber-300 text-slate-950 font-bold text-sm shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                >
                  Unlock Badge (+XP)
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
