"use client";

// Comment

import Image from "next/image";
import { Award, Building2, Coffee, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const OC_BOBA_ART = "/assets/roadtrip/zone4-sponsors/oc-spectrum-boba.svg";

export default function Zone4Sponsors() {
  return (
    <section id="zone-sponsors" className="relative min-h-screen w-full py-24 bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950 overflow-hidden flex flex-col justify-between font-body">
      {/* Zone Header / OC Core Tagline */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 w-full">
        <div className="flex items-center justify-between border-b border-[#FBFA74]/30 pb-6 mb-12">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#FBFA74]">Road Trip Stop 04</span>
            <h2 className="text-3xl sm:text-5xl font-heading text-white mt-1">Orange County Core & Irvine Spectrum</h2>
            <p className="text-slate-300 mt-2 text-base sm:text-lg">Entering OC! Giant wheels, boba shops, and partner billboards.</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#FBFA74]/10 border border-[#FBFA74]/30 text-[#FBFA74] text-sm font-semibold">
            <Building2 className="w-4 h-4 text-[#FBFA74]" />
            <span>MP 72 • OC Core</span>
          </div>
        </div>

        {/* Sponsor Billboard Grid Containers */}
        <div className="space-y-10 mb-16">
          {/* Platinum / Presenting Sponsors Tier */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[#FBFA74]" />
              <h3 className="text-xl font-heading text-[#FBFA74]">Marquee Partners</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card variant="sunset" className="p-8 flex flex-col items-center justify-center text-center">
                <div className="text-2xl font-heading text-white tracking-wider uppercase mb-2">Orange Coast College</div>
                <p className="text-xs text-[#FBFA74] font-medium">Host Venue & Institutional Sponsor</p>
              </Card>
              <Card variant="sunset" className="p-8 flex flex-col items-center justify-center text-center">
                <div className="text-2xl font-heading text-white tracking-wider uppercase mb-2">SoCal Tech Alliance</div>
                <p className="text-xs text-[#FBFA74] font-medium">Regional Ecosystem Partner</p>
              </Card>
            </div>
          </div>

          {/* Gold / Community Sponsors Tier */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-purple-400" />
              <h3 className="text-xl font-heading text-purple-300">Community & Industry Sponsors</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {["Sponsor Spot 01", "Sponsor Spot 02", "Sponsor Spot 03", "Sponsor Spot 04"].map((name, i) => (
                <Card
                  key={i}
                  variant="roadtrip"
                  className="p-6 flex items-center justify-center text-center"
                >
                  <span className="text-sm font-semibold text-slate-300">{name}</span>
                </Card>
              ))}
            </div>
          </div>

          {/* Sponsor Callout Banner (Boba & Perks) */}
          <Card variant="sunset" className="p-6 flex flex-col sm:flex-row items-center justify-between gap-6" hoverEffect={false}>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-[#FBFA74]/20 text-[#FBFA74]">
                <Coffee className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-heading text-white">Interested in Sponsoring HackCC?</h4>
                <p className="text-sm text-slate-300">Support 500+ aspiring tech leaders, host workshops, and recruit top community college talent.</p>
              </div>
            </div>
            <Button variant="primary" href="mailto:sponsor@hackcc.net" className="whitespace-nowrap">
              Sponsor Prospectus
            </Button>
          </Card>
        </div>
      </div>

      {/* Irvine Spectrum & Boba Vector Artwork Layer */}
      <div className="relative z-10 w-full pointer-events-none opacity-90">
        <Image
          src={OC_BOBA_ART}
          alt="OC Spectrum Giant Wheel and Boba Artwork"
          width={1200}
          height={500}
          className="w-full h-auto object-cover max-h-[280px]"
        />
      </div>
    </section>
  );
}
