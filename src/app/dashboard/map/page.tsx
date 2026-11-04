'use client';

import React, { useState } from 'react';
import { mockVenueInfo, mockTeam } from '@/lib/dashboardMockData';
import {
  Wifi,
  Copy,
  CheckCircle2,
  PhoneCall,
  ShieldAlert,
  Coffee,
  ExternalLink,
  Compass,
} from 'lucide-react';

export default function VenueMapPage() {
  const [copiedPass, setCopiedPass] = useState(false);

  const handleCopyWifi = () => {
    navigator.clipboard.writeText(mockVenueInfo.wifiPassword);
    setCopiedPass(true);
    setTimeout(() => setCopiedPass(false), 2000);
  };

  const zones = [
    {
      name: 'Main Hacking Hall (Floor 1)',
      desc: 'HackCC hacker tables (Tables 1–40), power strips, high-speed Ethernet ports.',
      highlight: `Your team: ${mockTeam.tableNumber}`,
      icon: '💻',
      color: 'border-amber-400/50 bg-amber-400/10 text-amber-300',
    },
    {
      name: 'Main Auditorium',
      desc: 'Opening Ceremony, Keynotes, Closing Awards & Pokédex Trophy Showcase.',
      highlight: 'Seating for 350+ hackers',
      icon: '🎙️',
      color: 'border-sky-400/40 bg-sky-500/10 text-sky-300',
    },
    {
      name: 'Workshop Rooms 101 & 102',
      desc: 'Interactive tech workshops, sponsor masterclasses, and rotating QR stations.',
      highlight: 'Second Floor East Wing',
      icon: '⚡',
      color: 'border-blue-400/40 bg-blue-500/10 text-blue-300',
    },
    {
      name: 'Mentor Lounge (Room 104)',
      desc: 'Walk-up debugging desk with engineers from Google, AWS, and local tech startups.',
      highlight: 'Second Floor West Wing',
      icon: '🛠️',
      color: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-300',
    },
    {
      name: 'Game Lounge & Quiet Zone (Room 105)',
      desc: 'Nintendo Switch tournaments, beanbags, dim lighting for resting.',
      highlight: 'No loud phone calls',
      icon: '🎮',
      color: 'border-pink-400/40 bg-pink-500/10 text-pink-300',
    },
    {
      name: 'Dining Courtyard & Patio',
      desc: 'Breakfast burritos, taco bar lunch, golden hour dinner, and midnight boba line.',
      highlight: 'Outdoor Courtyard Area',
      icon: '🌮',
      color: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header & Wi-Fi Deck */}
      <div className="rounded-3xl bg-slate-900/85 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-1">
              <Compass className="w-3.5 h-3.5" />
              <span>Campus Navigation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading text-white">{mockVenueInfo.venueName}</h1>
            <p className="text-xs sm:text-sm text-white/60">{mockVenueInfo.address}</p>
          </div>

          {/* Wi-Fi Credential Card */}
          <div className="p-4 rounded-2xl bg-black/60 border border-white/15 flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center">
                <Wifi className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-white/50 uppercase tracking-wider">Wi-Fi Network</div>
                <div className="font-mono text-xs font-bold text-white">{mockVenueInfo.wifiSSID}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 pl-0 sm:pl-4 border-t sm:border-t-0 sm:border-l border-white/10 pt-2 sm:pt-0 w-full sm:w-auto justify-between">
              <div>
                <div className="text-[10px] text-white/50 uppercase tracking-wider">Password</div>
                <div className="font-mono text-xs font-bold text-amber-300">
                  {mockVenueInfo.wifiPassword}
                </div>
              </div>
              <button
                onClick={handleCopyWifi}
                aria-label="Copy Wi-Fi password"
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                {copiedPass ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Floor Plan Zones (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Venue Zones & Key Locations
            </h2>
            <span className="text-xs text-white/50">2 Floors Active</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {zones.map((zone) => (
              <div
                key={zone.name}
                className="p-5 rounded-3xl bg-slate-900/70 border border-white/10 backdrop-blur-md space-y-3 flex flex-col justify-between hover:border-white/25 transition-all"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{zone.icon}</span>
                    <h3 className="text-sm font-bold text-white leading-tight">{zone.name}</h3>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed">{zone.desc}</p>
                </div>

                <div className="pt-2 border-t border-white/5">
                  <span
                    className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${zone.color}`}
                  >
                    {zone.highlight}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency & Quick Facilities (1 Col) */}
        <div className="space-y-6">
          {/* Emergency Safety Card */}
          <div className="rounded-3xl bg-linear-to-b from-red-950/40 to-slate-900 border border-red-500/30 p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-red-300 font-bold text-xs uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>Campus Safety & Support</span>
            </div>

            <p className="text-xs text-white/70 leading-relaxed">
              If you experience a medical emergency, facility issue, or safety concern, call OCC Campus Safety or find a volunteer wearing a green lanyard.
            </p>

            <a
              href="tel:7144325017"
              className="w-full py-2.5 px-4 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/40 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Campus Safety</span>
            </a>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50">
              <span>Code of Conduct Hotline</span>
              <a
                href={mockVenueInfo.organizerHelpDiscord}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 hover:underline flex items-center gap-1"
              >
                <span>Discord Helpdesk</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Restrooms & Water Stations */}
          <div className="rounded-3xl bg-slate-900/50 border border-white/10 p-6 space-y-3 text-xs text-white/70">
            <div className="font-bold text-white flex items-center gap-1.5">
              <Coffee className="w-4 h-4 text-amber-400" />
              <span>Hydration & Amenities</span>
            </div>
            <ul className="space-y-2 text-[11px] list-disc list-inside text-white/60 leading-relaxed">
              <li>Water bottle refill stations located near Room 101 and the Main Hall lobby.</li>
              <li>All-gender restrooms available on the 1st floor adjacent to the Courtyard.</li>
              <li>Free drip coffee and tea restocked hourly at the Snack Bar.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
