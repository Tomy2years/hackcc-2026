"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown, HelpCircle, Navigation, Quote } from "lucide-react";
import { Card } from "@/components/ui/Card";

const PCH_SAN_ONOFRE_ART = "/assets/roadtrip/zone5-faq/pch-san-onofre.svg";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is HackCC?",
    answer: "HackCC is Southern California's premier community college hackathon hosted at Orange Coast College. Hackers get 36 hours to build tech projects, attend workshops, eat free meals, and win prizes!"
  },
  {
    question: "Who can attend HackCC?",
    answer: "All community college, university, and high school students aged 18+ (or enrolled community college students) are eligible to apply!"
  },
  {
    question: "Do I need prior coding experience?",
    answer: "Not at all! We have dedicated beginner tracks, introductory workshops (Git, Python, Web Dev, AI), and active mentors to help you every step of the way."
  },
  {
    question: "How much does it cost?",
    answer: "HackCC is 100% free! Admission, meals, drinks, swag, and hardware rentals are all provided at zero cost thanks to our generous sponsors."
  },
  {
    question: "How do teams work?",
    answer: "You can hack solo or form teams up to 4 people. We host team formation mixers before and at the start of the event if you're looking for teammates!"
  }
];

const quoteData = [
  {
    quote: "HackCC was the first hackathon where I felt completely supported as a community college student. I built my portfolio project and made lifelong friends!",
    author: "Alex Chen",
    role: "Spring 2026 Hacker • OCC CS Major"
  },
  {
    quote: "The mentors, late night boba, and supportive vibe made building our hardware hack unforgettable. Can't wait for the next road trip!",
    author: "Maya Rodriguez",
    role: "Past Attendee • Transfer Student"
  }
];

export default function Zone5FAQQuotes() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="zone-faq" className="relative min-h-screen w-full py-24 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 overflow-hidden flex flex-col justify-between font-body">
      {/* Zone Header / PCH Highway Sign Tagline */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 w-full">
        <div className="flex items-center justify-between border-b border-sky-500/30 pb-6 mb-12">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-sky-400">Road Trip Stop 05</span>
            <h2 className="text-3xl sm:text-5xl font-heading text-white mt-1">Pacific Coast Highway (PCH)</h2>
            <p className="text-slate-300 mt-2 text-base sm:text-lg">Highway sign FAQs and past attendee rest stop stories.</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-300 text-sm font-semibold">
            <Navigation className="w-4 h-4 text-sky-400" />
            <span>MP 105 • PCH Drive</span>
          </div>
        </div>

        {/* Content Layout: FAQ Highway Accordions & Attendee Quote Signs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* FAQ Column (Styled like green Highway Signboards) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle className="w-5 h-5 text-emerald-400" />
              <h3 className="text-xl font-heading text-white">Highway Info Signboards (FAQ)</h3>
            </div>

            {faqData.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-emerald-950/40 border-2 border-emerald-600/50 overflow-hidden transition-all shadow-md"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left font-bold text-white flex items-center justify-between gap-4 hover:bg-emerald-900/30 transition-colors"
                  >
                    <span className="text-base sm:text-lg">{item.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-emerald-400 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm sm:text-base text-emerald-100/90 leading-relaxed border-t border-emerald-700/30 pt-3">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Past Attendee Quotes Column (Beach Rest Stop Cards) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Quote className="w-5 h-5 text-[#FBFA74]" />
              <h3 className="text-xl font-heading text-white">Rest Stop Stories</h3>
            </div>

            {quoteData.map((q, i) => (
              <Card
                key={i}
                variant="sunset"
                className="p-6 relative overflow-hidden"
                hoverEffect={false}
              >
                <div className="text-white/10 absolute -right-2 -bottom-2 font-serif text-8xl pointer-events-none">
                  “
                </div>
                <p className="text-slate-100 text-base leading-relaxed italic mb-4 relative z-10">
                  "{q.quote}"
                </p>
                <div className="relative z-10">
                  <div className="font-heading text-white text-sm">{q.author}</div>
                  <div className="text-xs font-semibold text-[#FBFA74]">{q.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* PCH Road & San Onofre Double Domes Vector Artwork */}
      <div className="relative z-10 w-full pointer-events-none opacity-90">
        <Image
          src={PCH_SAN_ONOFRE_ART}
          alt="PCH Highway and San Onofre Domes Artwork"
          width={1200}
          height={500}
          className="w-full h-auto object-cover max-h-[260px]"
        />
      </div>
    </section>
  );
}
