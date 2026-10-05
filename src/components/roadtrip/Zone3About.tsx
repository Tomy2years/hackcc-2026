import Image, { type StaticImageData } from "next/image";
import { LAST_EVENT, TESTIMONIALS } from "@/lib/content";
import { Scene, StopMarker, StopTitle } from "./Scene";

import remiel from "@2026-public/remiel.webp";
import yinghao from "@2026-public/2026-images/Yinghao.jpg";
import cameron from "@2026-public/2026-images/Cameron.jpg";
import photoCrew from "@2026-public/2026-images/image5.png";
import photoWinners from "@2026-public/2026-images/image7.png";
import photoAiml from "@2026-public/2026-images/image9.png";
import photoTrio from "@2026-public/2026-images/image3.png";

const SANTA_MONICA_PIER = "/assets/roadtrip/zone3-about/santa-monica.jpg";

const PORTRAITS: Record<(typeof TESTIMONIALS)[number]["image"], StaticImageData> = {
  remiel,
  yinghao,
  cameron,
};

const PHOTOS = [
  { src: photoCrew, alt: "Eight hackers posing in a hallway at HackCC 2025", caption: "Morning check-in, MiraCosta", rotate: "-rotate-2" },
  { src: photoWinners, alt: "Three students holding Overall Winner certificates", caption: "Overall winners, AssistAI", rotate: "rotate-1" },
  { src: photoAiml, alt: "Four students holding Best AI/ML certificates", caption: "Best AI/ML, Realibuddy", rotate: "-rotate-1" },
  { src: photoTrio, alt: "Three hackers smiling for the camera", caption: "Somewhere around hour nine", rotate: "rotate-2" },
];

export default function Zone3About() {
  return (
    <Scene id="zone-about" image={SANTA_MONICA_PIER} alt="Santa Monica Pier at blue hour, the Ferris wheel lit, reflections on the water">
      <StopMarker number={3} place="Santa Monica" />
      <StopTitle hook="You belong here, even if you've never been to one" title="What HackCC is" />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-7 space-y-5 text-lg leading-relaxed text-mist/90 max-w-2xl">
          <p>
            HackCC is a one-day hackathon built for community college students, by community college students. You
            show up in the morning, find a team, pick a problem you care about, and by evening you&apos;re demoing
            something real to a room full of people who get it.
          </p>
          <p>
            Most hackathons in California are at universities. Ours isn&apos;t. Transfer students, first-generation
            students, people working two jobs, people who&apos;ve never written a line of code: this one is for you.
            There are workshops that start from zero, mentors in the room all day, and prizes for first-timers as well
            as veterans.
          </p>
        </div>

        {/* Last time, as monumental numbers */}
        <div className="lg:col-span-5">
          <p className="text-xs font-bold uppercase tracking-wider text-mist/70">
            Last time: {LAST_EVENT.label}, {LAST_EVENT.venue}
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-6">
            {LAST_EVENT.stats.map(stat => (
              <div key={stat.label} className="border-l border-white/20 pl-4">
                <dd className="font-heading text-4xl sm:text-5xl text-action leading-none">{stat.value}</dd>
                <dt className="mt-1.5 text-sm font-semibold text-mist/80">{stat.label}</dt>
              </div>
            ))}
          </dl>
          <a
            href={LAST_EVENT.devpostUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 text-sm font-bold text-white hover:text-action underline underline-offset-8 decoration-white/40 hover:decoration-action transition-colors"
          >
            See all 29 projects on Devpost
          </a>
        </div>
      </div>

      {/* Photo strip: real pictures from last year, taped up like a dorm wall */}
      <ul className="mt-16 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {PHOTOS.map(photo => (
          <li key={photo.caption} className={`${photo.rotate} transition-transform duration-300 hover:rotate-0`}>
            <figure className="bg-paper p-2 pb-3 sm:p-3 sm:pb-4 shadow-xl shadow-black/40">
              <Image
                src={photo.src}
                alt={photo.alt}
                sizes="(max-width: 1024px) 50vw, 25vw"
                placeholder="blur"
                className="w-full aspect-[4/3] object-cover"
              />
              <figcaption className="mt-2 font-serif italic text-ink/80 text-xs sm:text-sm text-center">{photo.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {/* Postcards: real quotes from people who were there */}
      <ul className="mt-14 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, i) => (
          <li key={t.name} className={i === 1 ? "md:translate-y-6" : ""}>
            <figure className="relative h-full bg-paper text-ink p-6 sm:p-7 shadow-xl shadow-black/40">
              <div aria-hidden className="absolute top-4 right-4 w-10 h-12 border border-ink/30 bg-paper rotate-3 flex items-center justify-center">
                <span className="text-[9px] font-bold uppercase tracking-wider text-ink/60 text-center leading-tight">2025<br />Oceanside</span>
              </div>
              <blockquote className="font-serif italic text-lg leading-relaxed pr-10">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-ink/15 pt-4">
                <Image
                  src={PORTRAITS[t.image]}
                  alt=""
                  width={44}
                  height={44}
                  className="w-11 h-11 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-sm">{t.name}</p>
                  <p className="text-xs text-ink/70">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Scene>
  );
}
