"use client";

import Image from "next/image";
import Link from "next/link";

const SANTA_MONICA_PIER_DAY_BG = "/assets/roadtrip/zone3-about/santa-monica-pier-bg-daytime.jpeg";
const SANTA_MONICA_PIER_DAY_BG_MOBILE = "/assets/roadtrip/zone3-about/santa-monica-pier-bg-daytime-mobile.jpeg";
const AWS_WHITE_LOGO = "/aws-white.svg";
const GOOGLE_LOGO = "/google.svg";
const BOOTDEV_LOGO = "/bootdev.png";
const ELEVENLABS_LOGO = "/elevenlabs-logo-white.png";

const sponsors = [
  {
    name: "AWS",
    src: AWS_WHITE_LOGO,
    width: 220,
    height: 120,
    className: "max-h-12 sm:max-h-16 w-auto",
  },
  {
    name: "Google",
    src: GOOGLE_LOGO,
    width: 220,
    height: 120,
    className: "max-h-10 sm:max-h-14 w-auto",
  },
  {
    name: "Boot.dev",
    src: BOOTDEV_LOGO,
    width: 200,
    height: 120,
    className: "max-h-12 sm:max-h-16 w-auto",
  },
  {
    name: "ElevenLabs",
    src: ELEVENLABS_LOGO,
    width: 240,
    height: 60,
    className: "max-h-9 sm:max-h-12 w-auto",
  },
];

export default function Zone3Sponsors() {
  return (
    <section
      className="relative min-h-screen py-16 sm:py-24 lg:py-24 w-full overflow-hidden flex items-center justify-center select-none"
    >
      {/* Full-Screen Background Image Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {/* Desktop 16:9 Widescreen */}
        <Image
          src={SANTA_MONICA_PIER_DAY_BG}
          alt="Santa Monica Pier Daytime Background"
          fill
          className="hidden sm:block object-cover object-center pointer-events-none select-none"
          priority
          draggable={false}
        />
        {/* Mobile 9:16 Portrait */}
        <Image
          src={SANTA_MONICA_PIER_DAY_BG_MOBILE}
          alt="Santa Monica Pier Daytime Background Mobile"
          fill
          className="block sm:hidden object-cover object-top pointer-events-none select-none"
          priority
          draggable={false}
        />
        {/* Daytime Contrast Scrim Layer */}
        <div className="absolute inset-0 bg-slate-950/25 pointer-events-none" />
      </div>

      <div className="relative z-20 mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-6 sm:px-10 text-center select-none">
        {/* Section Header: Bold, Monumental Unboxed Typography */}
        <div className="mb-8 sm:mb-12 text-center max-w-4xl select-none">
          <p className="font-serif italic text-amber-400 text-xl sm:text-2xl md:text-3xl font-medium tracking-wide [text-shadow:_0_2px_14px_rgba(0,0,0,1),_0_4px_24px_rgba(0,0,0,0.85)]">
            Powered by our road trip partners
          </p>
          <h2 className="mt-2 text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal uppercase tracking-tight text-white font-heading leading-none [text-shadow:_0_4px_28px_rgba(0,0,0,1),_0_8px_36px_rgba(0,0,0,0.8)]">
            OUR SPONSORS
          </h2>
        </div>

        {/* Cal Hacks / HackMIT Style: Single Unified Frosted-Glass Sponsor Pavilion */}
        <div className="w-full max-w-5xl rounded-3xl border border-white/15 bg-slate-950/65 p-6 sm:p-10 lg:p-12 shadow-[0_24px_60px_rgba(0,0,0,0.55)] backdrop-blur-md select-none">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 items-center justify-items-center">
            {sponsors.map((sponsor) => (
              <div
                key={sponsor.name}
                className="flex h-20 sm:h-24 w-full items-center justify-center p-2 sm:p-3 select-none"
              >
                <Image
                  src={sponsor.src}
                  alt={sponsor.name}
                  width={sponsor.width}
                  height={sponsor.height}
                  draggable={false}
                  className={`${sponsor.className} object-contain transition-all duration-300 hover:scale-105 drop-shadow-[0_4px_14px_rgba(0,0,0,0.4)] pointer-events-none select-none`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Cal Hacks style Sponsor Us Invitation */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/sponsors"
            className="inline-flex items-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-8 py-3.5 sm:px-10 sm:py-4 rounded-full text-base sm:text-lg shadow-2xl shadow-amber-400/30 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Partner With Us (Sponsor Info)</span>
            <span className="text-xl">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}


