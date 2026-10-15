"use client";

import Image from "next/image";

const INGLEWOOD_DAY_BG = "/assets/roadtrip/zone2-details/inglewood-daytime.jpg";

const stats = [
  { value: "300+", unit: "", label: "Participants", sublabel: "Across California" },
  { value: "$5K+", unit: "", label: "In Prizes", sublabel: "" },
  { value: "23", unit: "", label: "Colleges", sublabel: "From NorCal to SoCal" },
  { value: "48", unit: "HRS", label: "Sprint", sublabel: "" },
];

const pillars = [
  {
    title: "Hands-On Workshops",
    description: "Beginner-friendly sessions in Git, web dev, and AI tools to get you building fast.",
  },
  {
    title: "1-on-1 Mentorship",
    description: "Direct guidance from software engineers and alumni who walked your exact path.",
  },
  {
    title: "Statewide Network",
    description: "Connect with 300+ ambitious community college students and form lifelong project teams.",
  },
];

export default function Zone2About() {
  return (
    <section id="zone-about" className="relative min-h-screen py-16 sm:py-20 lg:py-0 lg:h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Full-Screen Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={INGLEWOOD_DAY_BG}
          alt="Inglewood Daytime Skyline Background"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Daytime Contrast Scrim Layer: Natural atmospheric gradient preserving daytime sky while boosting contrast over lower cityscape */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/25 via-slate-950/45 to-slate-950/75" />
      </div>

      {/* Unboxed Main Content Container */}
      <div className="relative z-20 mx-auto w-full max-w-6xl px-6 py-6 sm:px-10 lg:px-12 flex flex-col justify-center lg:-translate-y-3">
        {/* Top Header: Unboxed Scenic Typography */}
        <div className="max-w-3xl">
          <p className="font-serif italic text-amber-300 font-semibold text-lg sm:text-2xl tracking-wide mb-1.5 [text-shadow:_0_2px_10px_rgba(0,0,0,1)]">
            California&apos;s Community College Road Trip
          </p>
          <h2 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-normal text-white uppercase tracking-tight leading-[1.05] [text-shadow:_0_3px_16px_rgba(0,0,0,1),_0_6px_32px_rgba(0,0,0,0.85)]">
            ABOUT HACKCC
          </h2>
          <p className="mt-3 text-white text-base sm:text-lg lg:text-xl font-sans font-medium max-w-2xl leading-relaxed [text-shadow:_0_2px_8px_rgba(0,0,0,1),_0_4px_16px_rgba(0,0,0,0.85)]">
            California&apos;s largest community college hackathon. 48 hours to build, learn, and launch alongside mentors, alumni, and top tech partners.
          </p>
        </div>

        {/* Monumental Stats Grid: 100% Unboxed Across Full Width */}
        <div className="mt-6 sm:mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-y border-white/20 py-4 sm:py-5">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`space-y-1 ${
                idx % 2 === 1 ? "border-l border-white/20 pl-4 sm:pl-6" : ""
              } ${
                idx > 0 ? "md:border-l md:border-white/20 md:pl-6 lg:pl-8" : ""
              }`}
            >
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-4xl sm:text-5xl lg:text-6xl text-amber-400 font-normal leading-none [text-shadow:_0_2px_12px_rgba(0,0,0,1),_0_4px_24px_rgba(0,0,0,0.85)]">
                  {stat.value}
                </span>
                {stat.unit && (
                  <span className="font-sans font-black text-lg sm:text-2xl text-amber-300 [text-shadow:_0_2px_8px_rgba(0,0,0,1)]">
                    {stat.unit}
                  </span>
                )}
              </div>
              <p className="font-sans font-extrabold text-xs sm:text-sm uppercase tracking-wider text-white [text-shadow:_0_1px_6px_rgba(0,0,0,1)]">
                {stat.label}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-200 [text-shadow:_0_1px_6px_rgba(0,0,0,1)]">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>

        {/* Unboxed 3-Pillar Experience */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="space-y-1.5">
              <h3 className="font-heading text-xl sm:text-2xl text-white uppercase tracking-wide [text-shadow:_0_2px_10px_rgba(0,0,0,1)]">
                {pillar.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed [text-shadow:_0_1px_6px_rgba(0,0,0,1),_0_2px_12px_rgba(0,0,0,0.85)]">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
