"use client";

import React from "react";
import { Calendar, Car, Check, Mail, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface RegistrationReceivedCardProps {
  email: string;
}

export function RegistrationReceivedCard({ email }: RegistrationReceivedCardProps) {
  return (
    <Card variant="sunset" className="relative p-6 sm:p-10 text-center overflow-hidden border-2 border-[#FBFA74]/30 shadow-2xl" hoverEffect={false}>
      {/* Visual Stamp */}
      <div className="absolute top-6 right-6 w-20 h-24 border-2 border-dashed border-white/40 rounded bg-white/10 hidden sm:flex flex-col items-center justify-center text-xs p-1 font-mono tracking-tight select-none">
        <div className="text-[10px] uppercase text-[#FBFA74] font-bold">Fall 2026</div>
        <Sparkles className="w-5 h-5 text-[#FBFA74] my-1" />
        <div className="text-[8px] text-white/60">SO-CAL</div>
      </div>

      <div className="max-w-md mx-auto space-y-6 pt-6">
        <div className="w-20 h-20 rounded-full bg-[#FBFA74] text-[#021442] flex items-center justify-center mx-auto shadow-lg">
          <Check className="w-10 h-10 stroke-[3]" />
        </div>
        <h1 className="text-4xl sm:text-5xl cartoony-title mt-4">You&apos;re on the Road!</h1>
        <p className="text-lg text-slate-100 leading-relaxed font-medium">
          Your registration is in. We&apos;ll email you when decisions go out.
        </p>

        <div className="bg-[#2D18A8]/60 backdrop-blur-md rounded-2xl p-5 border border-white/10 text-left space-y-3">
          <div className="flex items-center gap-3 text-sm text-slate-200">
            <Mail className="w-4 h-4 text-[#FBFA74] shrink-0" />
            <span>We&apos;ll reach you at <span className="font-semibold break-all">{email}</span></span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-200">
            <Calendar className="w-4 h-4 text-[#FBFA74] shrink-0" />
            <span>Fall 2026 • Orange Coast College</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-200">
            <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
            <span>2701 Fairview Rd, Costa Mesa, CA 92626</span>
          </div>
        </div>

        <div className="pt-2 flex justify-center">
          <Button variant="primary" href="/" className="inline-flex items-center justify-center gap-2">
            <span>Return to Map</span>
            <Car className="w-5 h-5" />
          </Button>
        </div>
        <p className="text-xs text-slate-300">Need to change something? Submit again with the same email and we&apos;ll use your latest answers.</p>
      </div>
    </Card>
  );
}
