"use client";

import Image from "next/image";
import { useState } from "react";

const INGLEWOOD_ART = "/assets/roadtrip/zone2-details/inglewood.jpeg";

const cards = [
  {
    label: "Venue",
    title: "Orange Coast College",
    short: "Campus + event hub",
    detail: "OCC is where HackCC will come to life, with check-ins, workshops, and final presentations all taking place on-site.",
    extra: "Expect a full weekend experience with student teams, workshops, and project demos here.",
  },
  {
    label: "Date",
    title: "November 14–15, 2026",
    short: "Friday to Saturday",
    detail: "A two-day build sprint designed to bring together students, mentors, and teams across California for a focused weekend of creation.",
    extra: "The experience is designed to be immersive, fast-paced, and community-driven from check-in through final judging.",
  },
  {
    label: "Deadlines",
    title: "Applications open soon",
    short: "Final details coming",
    detail: "Stay tuned for application windows, team registration details, and important reminders for participants and organizers.",
    extra: "Once announced, the timeline, track info, and event rules will be shared across the official HackCC channels.",
  },
];

export default function Zone2EventInfo() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pinnedIndex, setPinnedIndex] = useState<number | null>(null);

  return (
    <section id="zone-details" className="relative min-h-screen w-full overflow-hidden">
      {/* Full-Screen Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={INGLEWOOD_ART}
          alt="Inglewood Night Skyline Background"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-950/52" />
      </div>

      {/* Top & Bottom Gradient Edge Transitions */}
      <div className="absolute inset-x-0 top-0 h-48 sm:h-72 bg-gradient-to-b from-slate-950 via-slate-950/80 via-30% to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-48 sm:h-72 bg-gradient-to-t from-slate-950 via-slate-950/80 via-30% to-transparent z-10 pointer-events-none" />

      <div className="relative z-20 mx-auto flex min-h-screen max-w-6xl items-center px-6 py-20 sm:px-10">
        <div className="w-full">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-amber-300/90">
              Event Details
            </p>
            <h2 className="mt-4 text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">
              Logistics and Location
            </h2>
          </div>

          <div className="grid items-start gap-5 md:grid-cols-3">
            {cards.map((card, index) => {
              const isActive = pinnedIndex === index || (pinnedIndex === null && hoveredIndex === index);

              return (
                <button
                  key={card.label}
                  type="button"
                  onMouseEnter={() => {
                    if (pinnedIndex === null) setHoveredIndex(index);
                  }}
                  onFocus={() => {
                    if (pinnedIndex === null) setHoveredIndex(index);
                  }}
                  onMouseLeave={() => {
                    if (pinnedIndex === null) setHoveredIndex(null);
                  }}
                  onBlur={() => {
                    if (pinnedIndex === null) setHoveredIndex(null);
                  }}
                  onClick={() => {
                    setPinnedIndex((current) => (current === index ? null : index));
                  }}
                  className={`relative self-start min-h-[260px] rounded-[1.75rem] border text-left transition-all duration-300 ease-out ${
                    isActive
                      ? "z-10 min-h-[380px] border-amber-300/60 bg-slate-950/80 shadow-[0_25px_60px_rgba(15,23,42,0.6)]"
                      : "border-white/10 bg-slate-950/55 hover:border-amber-300/35 hover:bg-slate-950/70"
                  }`}
                  aria-expanded={isActive}
                >
                  <div className="flex h-full flex-col justify-between p-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-300/90">
                        {card.label}
                      </p>
                      <h3 className="mt-3 text-2xl font-black text-white sm:text-3xl">
                        {card.title}
                      </h3>
                    </div>

                    <div className="mt-6">
                      <div className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300/90">
                        {card.short}
                      </div>

                      <div
                        className={`grid transition-all duration-300 ease-out ${
                          isActive ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="text-sm leading-5 text-slate-200">{card.detail}</p>
                          <p className="mt-3 text-sm leading-5 text-slate-300">{card.extra}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}



