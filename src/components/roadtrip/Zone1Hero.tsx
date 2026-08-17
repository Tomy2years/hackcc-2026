"use client";

import Image from "next/image";
import { ArrowDown, Calendar, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// Top-level Image Asset paths
const SKY_BG = "/assets/roadtrip/zone1-hero/sky-background.svg";
const CLOUDS_IMG = "/assets/roadtrip/zone1-hero/clouds.svg";
const HOLLYWOOD_SIGN = "/assets/roadtrip/zone1-hero/hackcc-hollywood-sign.svg";

export default function Zone1Hero() {
  return (
    <section id="zone-hero" className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden pt-24 bg-slate-950">
      {/* Background Vector Art Layer (Sky & Sunset Gradient) */}
      <div className="absolute inset-0 z-0">
        <Image
          src={SKY_BG}
          alt="Sky & Hills Background"
          fill
          className="object-cover opacity-90"
          priority
        />
      </div>

      {/* Floating Cloud Vectors Layer */}
      <div className="absolute top-10 inset-x-0 z-10 pointer-events-none opacity-80 animate-pulse">
        <Image
          src={CLOUDS_IMG}
          alt="Clouds Layer"
          width={1400}
          height={350}
          className="w-full h-auto object-contain mx-auto"
        />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 text-center mt-12 sm:mt-20">
        <div className="mb-6">
          <Badge variant="glass" className="inline-flex items-center gap-2 py-2 px-4 text-sm font-semibold bg-purple-900/60 border-purple-400/40 text-purple-200">
            <Sparkles className="w-4 h-4 text-[#FBFA74] animate-spin" />
            <span>SoCal's Premier Community College Hackathon</span>
          </Badge>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl cartoony-title mb-6 tracking-tight">
          HACK<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FBFA74] via-rose-300 to-[#A649E2]">CC</span> 2026
        </h1>

        <p className="max-w-2xl mx-auto text-lg sm:text-2xl text-slate-100 font-body font-medium leading-relaxed drop-shadow-md mb-8">
          Join us on a coastal road trip down Southern California. Learn, hack, build, and connect at Orange Coast College.
        </p>

        {/* Quick Meta Details Pills */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-body font-semibold text-white mb-10">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 backdrop-blur-sm">
            <Calendar className="w-4 h-4 text-[#FBFA74]" />
            <span>Fall 2026 • Dates TBA</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 backdrop-blur-sm">
            <MapPin className="w-4 h-4 text-rose-400" />
            <span>Orange Coast College • Costa Mesa, CA</span>
          </div>
        </div>

        {/* Hero Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" size="lg" href="/apply" className="w-full sm:w-auto">
            Apply to Hack
          </Button>
          <Button variant="secondary" size="lg" href="#zone-details" className="w-full sm:w-auto flex items-center justify-center gap-2">
            <span>Start Road Trip</span>
            <ArrowDown className="w-5 h-5 text-[#FBFA74] animate-bounce" />
          </Button>
        </div>
      </div>

      {/* Layer 2 Vector Art: HackCC Hollywood Hills Sign at Bottom */}
      <div className="relative z-10 w-full mt-12 pointer-events-none">
        <Image
          src={HOLLYWOOD_SIGN}
          alt="HackCC Hollywood Sign Vector"
          width={1200}
          height={400}
          className="w-full h-auto object-cover max-h-[340px]"
        />
      </div>
    </section>
  );
}
