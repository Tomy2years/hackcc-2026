"use client";

import Image from "next/image";
import { Compass, Lightbulb, Rocket, Users2 } from "lucide-react";
import { Card } from "@/components/ui/Card";

const SANTA_MONICA_PIER_ART = "/assets/roadtrip/zone3-about/santa-monica-pier.svg";

export default function Zone3About() {
  return (
    <section id="zone-about" className="relative min-h-screen w-full py-24 bg-gradient-to-b from-slate-900 via-sky-950 to-indigo-950 overflow-hidden flex flex-col justify-between font-body">
      {/* Zone Header / Santa Monica Pier Tagline */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 w-full">
        <div className="flex items-center justify-between border-b border-sky-800/40 pb-6 mb-12">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-sky-400">Road Trip Stop 03</span>
            <h2 className="text-3xl sm:text-5xl font-heading text-white mt-1">Santa Monica Pier & Boardwalk</h2>
            <p className="text-slate-300 mt-2 text-base sm:text-lg">Where coastal energy meets student innovation and community.</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-300 text-sm font-semibold">
            <Compass className="w-4 h-4 text-sky-400" />
            <span>MP 48 • Coastal Boardwalk</span>
          </div>
        </div>

        {/* Mission Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-4xl font-heading text-white leading-tight">
              Empowering Community College Innovators Across California
            </h3>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              HackCC was born out of a desire to give community college students a world-class platform to build software, showcase hardware inventions, and meet industry leaders.
            </p>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Whether you're writing your first line of code or deploying complex full-stack apps, HackCC provides the mentorship, tools, and community to accelerate your tech journey.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <Card variant="glass" className="p-4" hoverEffect={false}>
                <div className="text-3xl font-heading text-[#FBFA74] mb-1">500+</div>
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Expected Hackers</div>
              </Card>
              <Card variant="glass" className="p-4" hoverEffect={false}>
                <div className="text-3xl font-heading text-rose-400 mb-1">$10,000+</div>
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">In Prizes & Swag</div>
              </Card>
            </div>
          </div>

          {/* Pillars List */}
          <div className="space-y-4">
            <Card variant="roadtrip" className="p-6 flex items-start gap-4" hoverEffect={false}>
              <div className="p-3 rounded-2xl bg-sky-500/20 text-sky-300">
                <Rocket className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-heading text-white mb-1">Build Portfolio Projects</h4>
                <p className="text-sm text-slate-300">Turn your ideas into real working prototypes over the weekend with team collaboration.</p>
              </div>
            </Card>

            <Card variant="roadtrip" className="p-6 flex items-start gap-4" hoverEffect={false}>
              <div className="p-3 rounded-2xl bg-[#FBFA74]/20 text-[#FBFA74]">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-heading text-white mb-1">Learn from Industry Mentors</h4>
                <p className="text-sm text-slate-300">Connect with software engineers, designers, and founders from top SoCal tech hubs.</p>
              </div>
            </Card>

            <Card variant="roadtrip" className="p-6 flex items-start gap-4" hoverEffect={false}>
              <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-300">
                <Users2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-heading text-white mb-1">Inclusive & Welcoming</h4>
                <p className="text-sm text-slate-300">No prior hackathon experience required. Beginners are enthusiastically celebrated!</p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Santa Monica Pier Bottom Vector Art Layer */}
      <div className="relative z-10 w-full mt-8 pointer-events-none opacity-90">
        <Image
          src={SANTA_MONICA_PIER_ART}
          alt="Santa Monica Pier Ferris Wheel Artwork"
          width={1200}
          height={500}
          className="w-full h-auto object-cover max-h-[300px]"
        />
      </div>
    </section>
  );
}
