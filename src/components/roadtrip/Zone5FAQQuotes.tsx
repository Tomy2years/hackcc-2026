"use client";

import Image from "next/image";
import { useState } from "react";

const DOUBLE_DOME_BG = "/assets/roadtrip/zone5-faq/Double-Dome.jpg";

const faqs = [
  {
    question: "When can I apply?",
    answer: "Applications open soon and will be announced across our channels. Check back here for updates and keep an eye on the official HackCC social pages for the exact timeline.",
  },
  {
    question: "What is a hackathon?",
    answer: "A hackathon is a collaborative event where students come together to build projects, experiment with ideas, learn new tools, and present what they created in a supportive, creative environment.",
  },
  {
    question: "Can I compete in a team?",
    answer: "Yes — teams are encouraged. You can usually compete solo or with a team, depending on the event format and final rules. Placeholder details can be updated once the rules are finalized.",
  },
  {
    question: "How much does it cost to attend?",
    answer: "Attendance is free for participants. Placeholder copy here can later be replaced with the official cost breakdown, travel support details, and any eligibility requirements.",
  },
];

export default function Zone5FAQQuotes() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="zone-faq" className="relative min-h-screen w-full overflow-hidden">
      {/* Full-Screen Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={DOUBLE_DOME_BG}
          alt="PCH San Onofre Double Domes Background"
          fill
          className="object-cover object-center"
        />
        {/* Daytime Contrast Scrim Layer (Darkens bright sky for text legibility) */}
        <div className="absolute inset-0 bg-slate-950/45" />
      </div>

      {/* Top & Bottom Gradient Edge Transitions */}
      <div className="absolute inset-x-0 top-0 h-48 sm:h-72 bg-gradient-to-b from-slate-950 via-slate-950/80 via-30% to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-48 sm:h-72 bg-gradient-to-t from-slate-950 via-slate-950/80 via-30% to-transparent z-10 pointer-events-none" />

      <div className="relative z-20 mx-auto flex min-h-screen max-w-5xl items-center px-6 py-20 sm:px-10">
        <div className="w-full">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-amber-300/90">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-white/10 bg-slate-950/50 backdrop-blur-sm shadow-[0_16px_32px_rgba(2,6,23,0.35)]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-semibold text-white sm:text-lg">
                      {faq.question}
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-amber-300">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-white/10 px-5 py-4 text-sm leading-7 text-slate-200 sm:px-6 sm:text-base">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

