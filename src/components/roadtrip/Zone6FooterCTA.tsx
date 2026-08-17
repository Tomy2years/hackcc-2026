"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, Navigation, UserPlus, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const SUNSET_BEACH_BG = "/assets/roadtrip/zone6-cta-footer/sunset-beach.svg";

export default function Zone6FooterCTA() {
  return (
    <section id="zone-apply" className="relative min-h-screen w-full pt-24 pb-12 bg-slate-950 overflow-hidden flex flex-col justify-between font-body">
      {/* Golden Sunset Beach Background Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={SUNSET_BEACH_BG}
          alt="SoCal Sunset Beach Background"
          fill
          className="object-cover opacity-90"
        />
      </div>

      {/* Main Call To Action Content Cards */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 text-center mt-8">
        <div className="mb-6">
          <Badge variant="glass" className="inline-flex items-center gap-2 py-2 px-4 text-sm font-semibold bg-rose-900/60 border-rose-400/40 text-rose-200">
            <Navigation className="w-4 h-4 text-[#FBFA74]" />
            <span>Final Destination • SoCal Sunset Beach</span>
          </Badge>
        </div>

        <h2 className="text-4xl sm:text-6xl cartoony-title tracking-tight mb-6">
          Ready to Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FBFA74] via-rose-300 to-[#A649E2]">HackCC Journey?</span>
        </h2>

        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-100 mb-10 leading-relaxed font-medium drop-shadow-md">
          Applications are opening soon! Reserve your spot, join the Discord community, or get involved as a mentor or volunteer.
        </p>

        {/* Primary CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button variant="primary" size="lg" href="/apply" className="w-full sm:w-auto text-xl py-4 px-10">
            <span>Submit Application</span>
            <ArrowRight className="w-6 h-6" />
          </Button>
        </div>

        {/* Secondary Get Involved Cards (Volunteers / Mentors) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left mb-20">
          {/* Card 1: Volunteer / Mentor */}
          <Card variant="roadtrip" className="p-6">
            <div className="w-10 h-10 rounded-xl bg-[#FBFA74]/20 text-[#FBFA74] flex items-center justify-center mb-4">
              <UserPlus className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-heading text-white mb-2">Volunteer or Mentor</h3>
            <p className="text-slate-300 text-sm mb-4 leading-relaxed">
              Share your knowledge with aspiring hackers! We are looking for workshop hosts, tech mentors, and event day volunteers.
            </p>
            <a
              href="mailto:team@hackcc.net?subject=Volunteer%20Interest"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FBFA74] hover:underline uppercase tracking-wider"
            >
              <span>Join Mentorship Team</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </Card>

          {/* Card 2: Organizers Team */}
          <Card variant="roadtrip" className="p-6">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-heading text-white mb-2">Meet the Organizers</h3>
            <p className="text-slate-300 text-sm mb-4 leading-relaxed">
              HackCC is planned and built by dedicated student leaders across Southern California community colleges.
            </p>
            <Link
              href="/organizers"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-300 hover:underline uppercase tracking-wider"
            >
              <span>View Organizers Page</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Card>
        </div>
      </div>

      {/* Footer Navigation & Copyright */}
      <footer className="relative z-20 max-w-7xl mx-auto px-4 w-full border-t border-slate-800/80 pt-8 mt-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FBFA74] to-[#A649E2] flex items-center justify-center font-heading font-black text-slate-950 text-sm">
              H
            </div>
            <span className="text-sm font-semibold text-slate-300">HackCC © 2026 • Orange Coast College</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-300 font-medium">
            <Link href="/organizers" className="hover:text-[#FBFA74] transition-colors">Organizers</Link>
            <Link href="/2026" className="hover:text-[#FBFA74] transition-colors">2026 Archive</Link>
            <a href="mailto:contact@hackcc.net" className="hover:text-[#FBFA74] transition-colors flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              <span>contact@hackcc.net</span>
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
