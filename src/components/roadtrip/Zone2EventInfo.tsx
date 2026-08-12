"use client";

import Image from "next/image";
import { Clock, MapPin, Navigation, ShieldCheck, Ticket } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const SOFI_METRO_ART = "/assets/roadtrip/zone2-details/sofi-metro-vector.svg";

export default function Zone2EventInfo() {
  return (
    <section id="zone-details" className="relative min-h-screen w-full py-24 bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 overflow-hidden flex flex-col justify-between font-body">
      {/* Zone Header / Road Sign Badge */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 w-full">
        <div className="flex items-center justify-between border-b border-indigo-800/40 pb-6 mb-12">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#FBFA74]">Road Trip Stop 02</span>
            <h2 className="text-3xl sm:text-5xl font-heading text-white mt-1">Inglewood & LA Metro Hub</h2>
            <p className="text-slate-300 mt-2 text-base sm:text-lg">Framing the core event details in the heart of the LA basin.</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#FBFA74]/10 border border-[#FBFA74]/30 text-[#FBFA74] text-sm font-semibold">
            <Navigation className="w-4 h-4 text-[#FBFA74]" />
            <span>MP 24 • LA Basin</span>
          </div>
        </div>

        {/* Event Details Content Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1: Schedule & Dates */}
          <Card variant="roadtrip" className="p-6">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center mb-6">
              <Clock className="w-6 h-6 text-indigo-300" />
            </div>
            <h3 className="text-xl font-heading text-white mb-2">Dates & Schedule</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              A 36-hour hackathon filled with workshops, keynotes, free food, gaming tournaments, and late-night boba runs!
            </p>
            <div className="inline-block text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-200">
              Weekend Event • Fall 2026
            </div>
          </Card>

          {/* Card 2: OCC Venue & Location */}
          <Card variant="roadtrip" className="p-6">
            <div className="w-12 h-12 rounded-2xl bg-rose-600/30 border border-rose-400/30 flex items-center justify-center mb-6">
              <MapPin className="w-6 h-6 text-rose-300" />
            </div>
            <h3 className="text-xl font-heading text-white mb-2">OCC Campus Venue</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Hosted in-person at Orange Coast College in Costa Mesa, California with dedicated hacking labs, hardware room, and quiet zones.
            </p>
            <div className="inline-block text-xs font-semibold px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-200">
              In-Person • Costa Mesa, CA
            </div>
          </Card>

          {/* Card 3: Free Admission & Perks */}
          <Card variant="roadtrip" className="p-6">
            <div className="w-12 h-12 rounded-2xl bg-[#FBFA74]/20 border border-[#FBFA74]/30 flex items-center justify-center mb-6">
              <Ticket className="w-6 h-6 text-[#FBFA74]" />
            </div>
            <h3 className="text-xl font-heading text-white mb-2">100% Free Entry</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Free swag, meals, snacks, hardware rentals, mentor support, and prizes for all accepted student hackers.
            </p>
            <div className="inline-block text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#FBFA74]/20 text-[#FBFA74]">
              All Students Welcome
            </div>
          </Card>
        </div>

        {/* Highlight Banner */}
        <Card variant="sunset" className="p-6 flex flex-col sm:flex-row items-center justify-between gap-6" hoverEffect={false}>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-400/30">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-lg font-heading text-white">First Time Hacking?</h4>
              <p className="text-sm text-slate-300">We run beginner-friendly workshops, starter kits, and dedicated mentor desks!</p>
            </div>
          </div>
          <Button variant="primary" size="sm" href="#zone-faq" className="whitespace-nowrap">
            Read FAQs
          </Button>
        </Card>
      </div>

      {/* SoFi Stadium & LA Metro Bottom Vector Art Layer */}
      <div className="relative z-10 w-full mt-12 pointer-events-none opacity-90">
        <Image
          src={SOFI_METRO_ART}
          alt="SoFi Stadium and Metro Vector Artwork"
          width={1200}
          height={500}
          className="w-full h-auto object-cover max-h-[280px]"
        />
      </div>
    </section>
  );
}
