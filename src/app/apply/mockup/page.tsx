"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  Layers, 
  FileSpreadsheet,
  CheckCircle,
  HelpCircle,
  Car
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

// Visual Road Trip Assets from Archive
import cloudL from "@2026-public/Purple Cloud Cluster 2.webp";
import cloudR from "@2026-public/Pink Cloud Cluster 4.webp";
import moon from "@2026-public/Moon.webp";
import hotAirBalloon from "@2026-public/Hot Air Balloon.webp";
import balloonCat from "@2026-public/Balloon Cat.webp";

export default function FormMockupComparisonPage() {
  const [activeTab, setActiveTab] = useState<"overlay" | "headless">("overlay");
  const [sampleCollege, setSampleCollege] = useState("Orange Coast College");

  return (
    <main className="min-h-screen bg-[#070b1e] text-white relative overflow-hidden font-[var(--font-mont)] pt-20 pb-24 px-4 sm:px-6 lg:px-8">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-72 sm:w-96 opacity-40 pointer-events-none -translate-x-12 -translate-y-8">
        <Image src={cloudL} alt="Purple Cloud" priority />
      </div>
      <div className="absolute top-10 right-0 w-80 sm:w-[420px] opacity-40 pointer-events-none translate-x-12">
        <Image src={cloudR} alt="Pink Cloud" priority />
      </div>
      <div className="absolute top-6 right-[15%] w-20 sm:w-28 opacity-60 pointer-events-none">
        <Image src={moon} alt="Cartoon Moon" />
      </div>
      <div className="absolute bottom-16 left-6 w-24 sm:w-32 opacity-40 pointer-events-none">
        <Image src={hotAirBalloon} alt="Hot Air Balloon" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 space-y-8">
        {/* Navigation & Title */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Button variant="secondary" href="/apply" size="sm" className="inline-flex items-center gap-2 border-white/20">
            <ArrowLeft className="w-4 h-4 text-[#FBFA74]" />
            <span>Back to Live Apply Page</span>
          </Button>
          <div className="flex items-center gap-2">
            <Badge variant="vibrant">Interactive Design Prototype</Badge>
          </div>
        </div>

        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-[#FBFA74] to-orange-300 font-[var(--font-bagel)]">
            Google Form Integration Mockups
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-medium">
            Comparing how a <span className="text-[#FBFA74] font-semibold">Themed Google Form Iframe Overlay</span> actually looks versus a <span className="text-amber-300 font-semibold">Headless Google Sheets</span> integration.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center">
          <div className="bg-slate-900/90 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md inline-flex gap-2 shadow-xl">
            <button
              onClick={() => setActiveTab("overlay")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === "overlay"
                  ? "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-lg scale-[1.02]"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Option 1: Themed Overlay on Google Form</span>
            </button>
            <button
              onClick={() => setActiveTab("headless")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === "headless"
                  ? "bg-gradient-to-r from-teal-400 to-emerald-500 text-slate-950 shadow-lg scale-[1.02]"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Option 2: Custom UI + Google Sheets</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: THEMED OVERLAY ON GOOGLE FORM IFRAME */}
        {/* ========================================================================= */}
        {activeTab === "overlay" && (
          <div className="space-y-6">
            {/* Visual Callout Guide */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 text-xs space-y-1">
                <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" /> What the Custom Overlay Controls (Outside the Frame):
                </span>
                <p className="text-slate-300">
                  Custom SoCal highway billboard border, cartoon neon header, floating stickers (Balloon Cat), retro Route 66 signs, and disclaimer footers.
                </p>
              </div>
              <div className="bg-amber-950/40 border border-amber-500/30 rounded-2xl p-4 text-xs space-y-1">
                <span className="font-bold text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> What CANNOT be Changed (Inside the Form):
                </span>
                <p className="text-slate-300">
                  Google’s purple header, standard Roboto font, text inputs, radio buttons, and the purple "Submit" button cannot be restyled due to browser security.
                </p>
              </div>
            </div>

            {/* The Overlay Mockup Container */}
            <div className="relative max-w-3xl mx-auto">
              {/* Cute Floating Sticker on Corner (Overlay Element) */}
              <div className="absolute -top-6 -right-4 sm:-right-8 w-24 sm:w-28 z-30 pointer-events-none drop-shadow-2xl animate-bobbing">
                <Image src={balloonCat} alt="Balloon Cat Sticker" />
              </div>

              {/* Highway Sign Overlay Badge */}
              <div className="absolute -top-4 -left-3 sm:-left-6 z-30 bg-amber-400 text-slate-950 px-4 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-xl rotate-[-4deg] border-2 border-slate-950 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                <span>Road Trip Entry Gate</span>
              </div>

              {/* Themed Road Trip Billboard Frame */}
              <div className="bg-gradient-to-b from-[#1b1f4a] via-[#101438] to-[#0a0d26] rounded-3xl p-4 sm:p-7 border-4 border-[#FBFA74]/40 shadow-[0_0_50px_rgba(251,250,116,0.15)] relative overflow-hidden">
                {/* Decorative Neon Header Strip */}
                <div className="bg-slate-950/90 rounded-2xl p-4 border border-white/10 mb-5 text-center relative overflow-hidden">
                  <div className="text-[11px] uppercase tracking-widest text-[#FBFA74] font-bold">
                    Official HackCC 2026 Passenger Log
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-[var(--font-bagel)] text-white mt-1">
                    Orange Coast College Pitstop
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Fill out the form below. Powered by Google Forms with direct-to-sheet encryption.
                  </p>
                </div>

                {/* THE GOOGLE FORM SIMULATION VIEWPORT */}
                <div className="bg-white rounded-2xl shadow-inner border border-slate-300 text-slate-800 overflow-hidden relative">
                  {/* Google Forms Simulated Top Color Banner */}
                  <div className="h-28 bg-[#673AB7] text-white p-5 flex flex-col justify-end relative">
                    <span className="text-[10px] tracking-widest uppercase opacity-80 font-mono">Google Forms Embed</span>
                    <h3 className="text-xl font-bold font-sans">HackCC 2026 Application</h3>
                  </div>

                  {/* Google Forms Content Mockup */}
                  <div className="p-6 space-y-6 bg-[#ede7f6]/40 text-left font-sans text-sm">
                    {/* Notice Callout */}
                    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm text-xs text-slate-600">
                      Sign in to Google to save your progress. <span className="text-purple-600 cursor-pointer underline">Learn more</span>
                    </div>

                    {/* Question 1 */}
                    <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-2">
                      <label className="block font-medium text-slate-900">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        placeholder="Your answer" 
                        readOnly 
                        defaultValue="Alex Chen"
                        className="w-full border-b border-slate-300 py-1.5 focus:outline-none text-slate-700 bg-transparent"
                      />
                    </div>

                    {/* Question 2 */}
                    <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-2">
                      <label className="block font-medium text-slate-900">
                        California Community College <span className="text-red-500">*</span>
                      </label>
                      <div className="text-xs text-slate-500 mb-1">
                        *(Note: Google Forms uses standard dropdown; does not support custom acronym search)*
                      </div>
                      <select 
                        value={sampleCollege} 
                        onChange={(e) => setSampleCollege(e.target.value)}
                        className="w-full border border-slate-300 rounded p-2 text-slate-700 bg-white"
                      >
                        <option>Orange Coast College</option>
                        <option>Santa Monica College</option>
                        <option>De Anza College</option>
                        <option>Irvine Valley College</option>
                        <option>Other / Not Listed</option>
                      </select>
                    </div>

                    {/* Question 3 */}
                    <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-2">
                      <label className="block font-medium text-slate-900">
                        T-Shirt Size <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-2 pt-1">
                        {["S", "M", "L", "XL"].map((size, idx) => (
                          <label key={size} className="flex items-center gap-3 cursor-pointer">
                            <input type="radio" name="size" defaultChecked={idx === 1} className="accent-[#673AB7]" />
                            <span className="text-slate-800 text-sm">{size}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Google Submit Button */}
                    <div className="flex justify-between items-center pt-2">
                      <button 
                        type="button" 
                        className="bg-[#673AB7] hover:bg-[#5E35B1] text-white px-6 py-2 rounded text-sm font-medium shadow"
                      >
                        Submit
                      </button>
                      <span className="text-xs text-slate-400">Never submit passwords through Google Forms.</span>
                    </div>
                  </div>
                </div>

                {/* Road Trip Footer Overlay */}
                <div className="mt-4 flex items-center justify-between text-xs text-slate-400 px-2">
                  <div className="flex items-center gap-1.5 text-amber-300">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Responses saved directly to HackCC Private Drive</span>
                  </div>
                  <span className="font-mono text-[10px]">OCC Pitstop • Fall 2026</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: CUSTOM UI + HEADLESS GOOGLE SHEETS */}
        {/* ========================================================================= */}
        {activeTab === "headless" && (
          <div className="space-y-6">
            <div className="bg-teal-950/40 border border-teal-500/30 rounded-2xl p-4 text-xs space-y-2 max-w-3xl mx-auto">
              <span className="font-bold text-teal-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> How Headless Google Sheets Works:
              </span>
              <p className="text-slate-300 leading-relaxed">
                You keep 100% of our custom 4-step Road Trip form (animations, college acronym search, custom fonts). When the user clicks "Submit Application", Next.js securely forwards the data to a private <strong>Google Apps Script Webhook</strong>, appending the row straight into your team’s Google Sheet.
              </p>
            </div>

            {/* Custom UI Mini-Preview */}
            <div className="max-w-2xl mx-auto">
              <Card variant="roadtrip" className="p-6 sm:p-8 space-y-6 border-2 border-[#FBFA74]/30 shadow-2xl relative overflow-hidden bg-slate-900/90 backdrop-blur-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[11px] font-bold text-[#FBFA74] uppercase tracking-wider">Step 1 of 4</span>
                    <h3 className="text-xl sm:text-2xl font-[var(--font-bagel)] text-white">Passenger Pass</h3>
                  </div>
                  <Badge variant="vibrant">100% Custom Vibe</Badge>
                </div>

                <div className="space-y-4 text-left">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      defaultValue="Taylor Ramirez" 
                      readOnly 
                      className="w-full bg-slate-950/80 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
                      California Community College (With Acronym Search)
                    </label>
                    <div className="w-full bg-slate-950/80 border border-amber-300/40 rounded-xl px-4 py-2.5 text-sm text-[#FBFA74] font-medium flex items-center justify-between">
                      <span>Orange Coast College (OCC)</span>
                      <span className="text-xs bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded font-mono">Found via "occ"</span>
                    </div>
                  </div>

                  <div className="bg-emerald-950/50 border border-emerald-500/30 rounded-xl p-3 text-xs text-emerald-300 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>On submit, data routes directly to: <code>HackCC_2026_Applications (Google Sheet)</code></span>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      className="btn-accent text-xs sm:text-sm py-2.5 px-6 rounded-xl font-bold cursor-pointer inline-flex items-center gap-2 bg-[#FBFA74] text-slate-950 hover:bg-amber-300 transition"
                    >
                      <span>Submit to Google Sheet</span>
                      <Car className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Comparison Verdict Card */}
        <div className="max-w-3xl mx-auto bg-slate-900/60 border border-white/10 rounded-2xl p-6 text-sm text-slate-300 space-y-3">
          <h4 className="font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#FBFA74]" />
            Summary Verdict
          </h4>
          <p className="text-xs leading-relaxed">
            • <strong>If you use the Iframe Overlay (Option 1):</strong> You get the road trip billboard frame around it, but the inside will always look like standard purple Google Forms, with no acronym search.
            <br />
            • <strong>If you use Headless Google Sheets (Option 2):</strong> You keep 100% of your cartoon road trip aesthetic, college acronym search, and animations, while the submissions still quietly save to your private Google Sheet with zero database maintenance!
          </p>
        </div>
      </div>
    </main>
  );
}
