"use client";

import Image from "next/image";

const SANTA_MONICA_PIER_BG_NIGHTTIME = "/assets/roadtrip/zone3-about/santa-monica-pier-bg-nighttime.jpeg";

const stats = [
  { value: "400+", label: "participants" },
  { value: "$5K+", label: "in prizes" },
  { value: "18", label: "institutions represented" },
  { value: "23", label: "colleges across applications" },
];

const workshops = [
  "Intro to Vibe Coding",
  "Intro to Git/GitHub",
  "Hands-on product building",
];

const partners = ["Boot.dev", "Irvine Underground", "Nuicco", "MiraCosta College"];

export default function Zone3About() {
  return (
    <section id="zone-about" className="relative min-h-screen w-full overflow-hidden">
      {/* Full-Screen Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={SANTA_MONICA_PIER_BG_NIGHTTIME}
          alt="Santa Monica Pier Nighttime Background"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-950/58" />
      </div>

      {/* Top & Bottom Gradient Edge Transitions */}
      <div className="absolute inset-x-0 top-0 h-48 sm:h-72 bg-gradient-to-b from-slate-950 via-slate-950/80 via-30% to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-48 sm:h-72 bg-gradient-to-t from-slate-950 via-slate-950/80 via-30% to-transparent z-10 pointer-events-none" />

      <div className="relative z-20 mx-auto flex min-h-screen max-w-6xl items-center px-6 py-20 sm:px-10">
        <div className="w-full">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-amber-300/90">
              About HackCC
            </p>
            <h2 className="mt-4 text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">
              California&apos;s community-powered hackathon journey
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/50 p-6 shadow-[0_18px_50px_rgba(2,6,23,0.5)] backdrop-blur-sm sm:p-8">
              <p className="text-base leading-7 text-slate-200 sm:text-lg">
                HackCC is built for students who want to build something real, learn fast, and connect with a stronger network across California. From beginner-friendly workshops to intense build sessions, we create a high-energy environment where community college students can turn ideas into projects, friendships, and career momentum.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-amber-300/20 bg-white/5 p-4"
                  >
                    <div className="text-3xl font-black text-amber-300 sm:text-4xl">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-sm uppercase tracking-[0.18em] text-slate-200/80">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-6 shadow-[0_18px_50px_rgba(2,6,23,0.5)] backdrop-blur-sm sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-300/90">
                  Past event highlights
                </p>
                <div className="mt-4 text-2xl font-black text-white sm:text-3xl">
                  The largest community college hackathon in California
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-200">
                  Built to celebrate creativity, technical growth, and community impact with a fast-moving, founder-style energy that keeps students engaged from check-in to final demos.
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-6 shadow-[0_18px_50px_rgba(2,6,23,0.5)] backdrop-blur-sm sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-300/90">
                  Past Workshops
                </p>
                <ul className="mt-4 space-y-3 text-sm text-slate-100 sm:text-base">
                  {workshops.map((workshop) => (
                    <li key={workshop} className="flex items-center gap-3">
                      <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      {workshop}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-6 shadow-[0_18px_50px_rgba(2,6,23,0.5)] backdrop-blur-sm sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-fuchsia-300/90">
                Community support
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {partners.map((partner) => (
                  <span
                    key={partner}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-100"
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-6 shadow-[0_18px_50px_rgba(2,6,23,0.5)] backdrop-blur-sm sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-300/90">
                Why it matters
              </p>
              <p className="mt-4 text-base leading-7 text-slate-200 sm:text-lg">
                Students aren&apos;t just attending—they&apos;re learning by shipping, networking with peers and sponsors, and discovering where they fit in the next generation of technical builders. HackCC blends momentum, mentorship, and real-world opportunities into one unforgettable student experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

