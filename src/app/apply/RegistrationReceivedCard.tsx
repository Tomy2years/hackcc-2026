"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Check, Mail, MapPin } from "lucide-react";

interface RegistrationReceivedCardProps {
  email: string;
}

/** Unboxed confirmation shown after a successful registration. */
export function RegistrationReceivedCard({ email }: RegistrationReceivedCardProps) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="w-20 h-20 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-black/40">
        <Check className="w-10 h-10 stroke-[3]" />
      </div>

      <p className="font-serif italic text-amber-200/95 text-lg sm:text-2xl font-light tracking-wide mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
        Your seat is saved
      </p>
      <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl text-white leading-[1.08] tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
        YOU&apos;RE ON THE ROAD
      </h1>
      <p className="text-slate-200 text-base sm:text-lg max-w-lg mx-auto mt-5 leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
        Your registration is in. We&apos;ll email you when decisions go out.
      </p>

      <ul className="max-w-md mx-auto mt-10 pt-8 border-t border-white/15 space-y-3 text-left text-sm sm:text-base text-slate-200 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
        <li className="flex items-center gap-3">
          <Mail className="w-4 h-4 text-amber-400 shrink-0" />
          <span>We&apos;ll reach you at <span className="font-bold text-white break-all">{email}</span></span>
        </li>
        <li className="flex items-center gap-3">
          <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Fall 2026 • Orange Coast College</span>
        </li>
        <li className="flex items-center gap-3">
          <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
          <span>2701 Fairview Rd, Costa Mesa, CA 92626</span>
        </li>
      </ul>

      <div className="mt-10 flex justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-8 py-3.5 rounded-full text-base shadow-xl shadow-black/40 transition-all hover:scale-105 active:scale-95"
        >
          <span>Back to main site</span>
          <span className="text-lg">→</span>
        </Link>
      </div>
      <p className="text-xs sm:text-sm text-slate-300 mt-6">
        Need to change something? Submit again with the same email. Organizers go by your most recent submission.
      </p>
    </div>
  );
}
