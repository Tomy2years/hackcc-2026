'use client';

import React, { useState, useEffect } from 'react';
import { mockCurrentUser } from '@/lib/dashboardMockData';
import {
  ShieldCheck,
  Sun,
  Smartphone,
  WifiOff,
  CheckCircle2,
} from 'lucide-react';

export default function HackerPassPage() {
  const [deviceTime, setDeviceTime] = useState<string>('');
  const [brightnessBoost, setBrightnessBoost] = useState(false);
  const [walletAdded, setWalletAdded] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setDeviceTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`max-w-lg mx-auto space-y-6 transition-colors duration-300 ${
        brightnessBoost ? 'bg-white text-slate-950 p-4 sm:p-6 rounded-3xl' : ''
      }`}
    >
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className={`text-2xl font-heading ${
              brightnessBoost ? 'text-slate-950' : 'text-white'
            }`}
          >
            Digital Hacker Pass
          </h1>
          <p
            className={`text-xs ${
              brightnessBoost ? 'text-slate-600' : 'text-white/60'
            }`}
          >
            Show at Morning Check-in, Meal Lines, and Swag Pickup
          </p>
        </div>

        {/* Brightness Booster Button */}
        <button
          onClick={() => setBrightnessBoost(!brightnessBoost)}
          aria-label={brightnessBoost ? 'Revert normal screen contrast' : 'Maximize screen contrast for scanner'}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
            brightnessBoost
              ? 'bg-amber-400 text-slate-950 border-amber-500 font-bold'
              : 'bg-white/10 text-white/80 border-white/10 hover:text-white'
          }`}
        >
          <Sun className="w-3.5 h-3.5" />
          <span>{brightnessBoost ? 'Normal Contrast' : 'Scanner Boost'}</span>
        </button>
      </div>

      {/* Main Ticket Pass Card */}
      <div className="relative rounded-3xl bg-slate-900/90 border-2 border-amber-400/50 p-6 sm:p-8 shadow-2xl overflow-hidden text-white">
        {/* Top Road Trip Header Bar */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-heading font-bold text-sm">
              CC
            </div>
            <div>
              <div className="text-xs font-heading tracking-wider text-amber-300">HACKCC 2026</div>
              <div className="text-[10px] text-white/50">Orange Coast College</div>
            </div>
          </div>

          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>VERIFIED ADMIT</span>
          </div>
        </div>

        {/* Live Animated Anti-Screenshot Ticker */}
        <div className="my-5 p-3 rounded-2xl bg-black/60 border border-amber-400/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Animated SVG Gradient Ticker */}
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-400 via-sky-400 to-emerald-400 animate-spin" />
            <span className="text-[11px] font-mono tracking-widest text-white/70 uppercase">
              Live Ticker
            </span>
          </div>
          <div className="font-mono text-sm font-bold text-amber-300 tracking-wider">
            {deviceTime || '12:00:00'}
          </div>
        </div>

        {/* High-Entropy Static QR Code */}
        <div className="my-6 flex flex-col items-center justify-center">
          <div className="p-4 bg-white rounded-2xl shadow-xl border-4 border-amber-400 flex items-center justify-center">
            {/* High fidelity SVG QR Code Representation */}
            <svg
              className="w-48 h-48 sm:w-56 sm:h-56"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Corner position locators */}
              <rect x="5" y="5" width="25" height="25" rx="3" fill="#070B14" />
              <rect x="9" y="9" width="17" height="17" rx="2" fill="#FFFFFF" />
              <rect x="13" y="13" width="9" height="9" fill="#070B14" />

              <rect x="70" y="5" width="25" height="25" rx="3" fill="#070B14" />
              <rect x="74" y="9" width="17" height="17" rx="2" fill="#FFFFFF" />
              <rect x="78" y="13" width="9" height="9" fill="#070B14" />

              <rect x="5" y="70" width="25" height="25" rx="3" fill="#070B14" />
              <rect x="9" y="74" width="17" height="17" rx="2" fill="#FFFFFF" />
              <rect x="13" y="78" width="9" height="9" fill="#070B14" />

              {/* Data matrix pattern */}
              <rect x="35" y="8" width="6" height="6" fill="#070B14" />
              <rect x="45" y="14" width="8" height="6" fill="#070B14" />
              <rect x="57" y="8" width="6" height="8" fill="#070B14" />

              <rect x="35" y="22" width="10" height="6" fill="#070B14" />
              <rect x="50" y="24" width="6" height="6" fill="#070B14" />

              <rect x="8" y="35" width="8" height="8" fill="#070B14" />
              <rect x="20" y="38" width="12" height="6" fill="#070B14" />
              <rect x="36" y="35" width="6" height="6" fill="#070B14" />
              <rect x="46" y="36" width="10" height="10" fill="#070B14" />
              <rect x="62" y="35" width="8" height="6" fill="#070B14" />
              <rect x="75" y="38" width="16" height="6" fill="#070B14" />

              <rect x="12" y="48" width="6" height="12" fill="#070B14" />
              <rect x="24" y="50" width="8" height="6" fill="#070B14" />
              <rect x="38" y="48" width="10" height="8" fill="#070B14" />
              <rect x="54" y="52" width="6" height="10" fill="#070B14" />
              <rect x="66" y="48" width="12" height="6" fill="#070B14" />
              <rect x="84" y="50" width="8" height="8" fill="#070B14" />

              <rect x="35" y="65" width="8" height="8" fill="#070B14" />
              <rect x="48" y="68" width="14" height="6" fill="#070B14" />
              <rect x="68" y="65" width="6" height="12" fill="#070B14" />
              <rect x="80" y="66" width="12" height="8" fill="#070B14" />

              <rect x="36" y="80" width="12" height="6" fill="#070B14" />
              <rect x="52" y="78" width="8" height="12" fill="#070B14" />
              <rect x="65" y="82" width="10" height="6" fill="#070B14" />
              <rect x="80" y="80" width="10" height="10" fill="#070B14" />

              {/* Center Logo Embellishment */}
              <circle cx="50" cy="50" r="10" fill="#FBFA74" />
              <path
                d="M47 46L53 50L47 54V46Z"
                fill="#021442"
              />
            </svg>
          </div>
          <span className="font-mono text-[10px] text-white/40 mt-2">
            TOKEN: {mockCurrentUser.qrToken.slice(0, 20)}...
          </span>
        </div>

        {/* Hacker Details */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <div className="text-center">
            <h2 className="text-xl font-heading text-white">{mockCurrentUser.fullName}</h2>
            <p className="text-xs text-amber-300 font-semibold">{mockCurrentUser.college}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 text-center">
              <div className="text-[10px] text-white/50 uppercase">T-Shirt Size</div>
              <div className="text-xs font-bold text-white">{mockCurrentUser.tshirtSize}</div>
            </div>

            <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 text-center">
              <div className="text-[10px] text-white/50 uppercase">Dietary</div>
              <div className="text-xs font-bold text-emerald-300">
                {mockCurrentUser.dietaryRestrictions || 'None'}
              </div>
            </div>
          </div>
        </div>

        {/* Offline Security Footer */}
        <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Cached Offline</span>
          </div>
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Wristband Required</span>
          </div>
        </div>
      </div>

      {/* Wallet Export Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => setWalletAdded(true)}
          className={`flex-1 py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border transition-all cursor-pointer ${
            walletAdded
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
              : 'bg-white/10 hover:bg-white/15 text-white border-white/10'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>{walletAdded ? 'Added to Apple / Google Wallet ✓' : 'Add to Apple / Google Wallet'}</span>
        </button>

        <button
          onClick={() => alert('Pass is cached in localStorage & PWA Cache. It renders without Wi-Fi!')}
          className="py-3 px-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white/80 text-xs sm:text-sm font-semibold border border-white/10 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <WifiOff className="w-4 h-4 text-amber-400" />
          <span>Offline Info</span>
        </button>
      </div>
    </div>
  );
}
