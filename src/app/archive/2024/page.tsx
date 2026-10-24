"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faDiscord,
  faXTwitter,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPaperPlane, faCheck } from "@fortawesome/free-solid-svg-icons";
import ArchiveHeaderBanner from "@/components/archive/ArchiveHeaderBanner";

// Top-level 2024 asset paths
const LOGO_2024 = "/archive/2024/hackcc.png";
const MLH_BANNER = "/archive/2024/mlh.svg";
const MOON_2024 = "/archive/2024/yellow-moon.png";
const MOUNTAINS_2024 = "/archive/2024/Mountains.png";

// Deterministic static stars for starry night sky
const STATIC_STARS = Array.from({ length: 90 }, (_, i) => ({
  id: i,
  top: ((i * 17) % 90),
  left: ((i * 23) % 98),
  size: ((i % 3) + 1),
  duration: (((i % 4) + 2)),
  delay: ((i % 3) * 0.7),
}));

export default function Archive2024Page() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden text-[#f2eedd] font-sans selection:bg-[#FEE45C] selection:text-[#2b1055]">
      {/* Universal Archive Navigation Header */}
      <ArchiveHeaderBanner currentYear="2024" />

      {/* 2024 Night Sky Radial Gradient Canvas */}
      <div
        className="relative min-h-[calc(100vh-3.5rem)] w-full flex flex-col justify-between overflow-hidden"
        style={{
          background: "radial-gradient(ellipse at 68% 70%, #D39141 0%, #351b60 60%, #1a0933 100%)",
        }}
      >
        {/* Starry Sky Particle Simulation */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          {STATIC_STARS.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-[#E8DDB5] animate-pulse"
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDuration: `${star.duration}s`,
                animationDelay: `${star.delay}s`,
                opacity: 0.75,
              }}
            />
          ))}
        </div>

        {/* 2024 Vintage Navigation Bar */}
        <header className="relative z-30 w-full px-4 sm:px-8 py-3 flex items-center justify-between border-b border-[#e8ddb5]/20 bg-black/20 backdrop-blur-sm">
          {/* Left: HackCC Logo & Social Icons */}
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="w-24 sm:w-28 h-10 sm:h-12 relative shrink-0">
              <Image
                src={LOGO_2024}
                alt="HackCC 2024 Logo"
                fill
                priority
                className="object-contain object-left"
              />
            </div>

            <div className="flex items-center gap-2 sm:gap-3 text-[#e8ddb5]/70">
              <a
                href="https://www.instagram.com/realhackcc/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="HackCC Instagram"
                className="hover:text-[#FEE45C] hover:scale-110 transition-all text-base sm:text-lg"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="https://discord.gg/X7ktb9224J"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="HackCC Discord"
                className="hover:text-[#FEE45C] hover:scale-110 transition-all text-base sm:text-lg"
              >
                <FontAwesomeIcon icon={faDiscord} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="HackCC X Twitter"
                className="hover:text-[#FEE45C] hover:scale-110 transition-all text-base sm:text-lg hidden xs:inline"
              >
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="HackCC TikTok"
                className="hover:text-[#FEE45C] hover:scale-110 transition-all text-base sm:text-lg hidden xs:inline"
              >
                <FontAwesomeIcon icon={faTiktok} />
              </a>
            </div>
          </div>

          {/* Right: MLH Banner & Retro Nav Options */}
          <div className="flex items-center gap-3 sm:gap-5">
            <span className="hidden md:inline font-mono text-xs uppercase tracking-widest text-[#E8DDB5]/80">
              Nov 8 – 10, 2024
            </span>
            <Link
              href="/sponsors"
              className="px-3.5 py-1.5 rounded-lg bg-[#E8DDB5] hover:bg-[#ede5c9] text-[#2b1055] font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              SPONSOR US
            </Link>
            <div className="w-14 sm:w-16 h-12 relative shrink-0 -mt-2">
              <Image
                src={MLH_BANNER}
                alt="Major League Hacking Official Partner"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </header>

        {/* Center: Moon + Main Headline Container */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12 max-w-5xl mx-auto w-full">
          <div className="relative flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 w-full text-center lg:text-left">
            {/* The Rotating Golden Crescent Moon */}
            <div className="relative w-44 h-44 sm:w-64 sm:h-64 lg:w-80 lg:h-80 shrink-0">
              <Image
                src={MOON_2024}
                alt="2024 Golden Crescent Moon"
                fill
                priority
                className="object-contain drop-shadow-[0_0_40px_#f4ebcb] animate-[spin_60s_linear_infinite]"
              />
            </div>

            {/* Retro 2024 NameDrop Typography */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-2">
              <div className="font-mono text-sm sm:text-base tracking-[0.25em] text-[#E8DDB5] uppercase font-bold drop-shadow-[2px_1px_0px_rgba(0,0,0,0.6)]">
                Nov 8 - Nov 10, 2024
              </div>

              <h1 className="font-sans font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#f2eedd] drop-shadow-[4px_2px_0px_rgba(0,0,0,0.7)]">
                HACK<span className="text-[#FEE45C]">CC</span>
              </h1>

              <div className="font-mono text-base sm:text-xl font-bold tracking-[0.2em] text-[#E8DDB5]/90 uppercase drop-shadow-[2px_1px_0px_rgba(0,0,0,0.6)]">
                HACK YOUR LIFE
              </div>

              <p className="mt-2 text-xs sm:text-sm text-[#e8ddb5]/80 max-w-md font-sans">
                California&apos;s very first statewide hackathon built exclusively by and for community college students.
              </p>

              {/* Countdown / Historic Milestone Boxes */}
              <div className="pt-4 grid grid-cols-4 gap-2 sm:gap-3 max-w-md w-full">
                {[
                  { value: "300+", label: "HACKERS" },
                  { value: "116", label: "COLLEGES" },
                  { value: "3", label: "DAYS" },
                  { value: "1ST", label: "EDITION" },
                ].map((box, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl border border-[#E8DDB5]/60 bg-[#2b1055]/75 shadow-[0_0_15px_#f4ebcb33] backdrop-blur-sm"
                  >
                    <span className="font-sans font-black text-xl sm:text-2xl text-[#FEE45C]">
                      {box.value}
                    </span>
                    <span className="font-mono text-[9px] sm:text-[11px] text-[#e8ddb5] tracking-wider uppercase">
                      {box.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Retro 2024 Interest Box */}
          <div className="relative z-20 mt-10 w-full max-w-md mx-auto text-center">
            <p className="text-xs sm:text-sm text-white/90 font-medium">
              Join 300+ makers, innovators, and dreamers.
              <br />
              <span className="text-[#FEE45C] font-semibold">The foundational class of HackCC!</span>
            </p>

            <form
              onSubmit={handleSubscribe}
              className="mt-3 flex items-center justify-center gap-2 max-w-sm mx-auto"
            >
              <div className="flex-1 flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-[#E8DDB5]/60 bg-[#2b1055]/80 backdrop-blur-md shadow-md">
                <FontAwesomeIcon icon={faEnvelope} className="text-[#E8DDB5] text-sm" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL"
                  className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-[#E8DDB5]/60 font-mono focus:outline-none"
                  disabled={subscribed}
                />
              </div>

              <button
                type="submit"
                aria-label="Submit Email"
                disabled={subscribed}
                className="px-4 py-2.5 rounded-xl bg-[#E8DDB5] hover:bg-[#ede5c9] text-[#2b1055] font-bold text-sm transition-all shadow-md active:scale-95 disabled:opacity-80"
              >
                {subscribed ? (
                  <FontAwesomeIcon icon={faCheck} className="text-green-800" />
                ) : (
                  <FontAwesomeIcon icon={faPaperPlane} />
                )}
              </button>
            </form>

            {subscribed && (
              <p className="mt-2 text-xs text-[#FEE45C] font-mono">
                ✓ Recorded! Welcome to the HackCC alumni archive.
              </p>
            )}
          </div>
        </div>

        {/* Pinned Mountain Silhouette Background */}
        <div className="relative z-10 w-full h-32 sm:h-48 md:h-64 pointer-events-none select-none">
          <Image
            src={MOUNTAINS_2024}
            alt="Majestic Mountain Silhouette"
            fill
            priority
            className="object-cover object-top opacity-90 drop-shadow-[0_-8px_16px_rgba(0,0,0,0.5)]"
          />
        </div>
      </div>
    </div>
  );
}
