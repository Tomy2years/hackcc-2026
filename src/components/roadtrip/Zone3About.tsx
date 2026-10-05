import Image, { type StaticImageData } from "next/image";
import { LAST_EVENT, TESTIMONIALS } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Scene, StopHeading, StopMarker } from "./Scene";
import { PrintGallery, type Print } from "./PrintGallery";
import { SEAM, TONE } from "./tones";

import photoHacking from "@2026-public/2026-images/image1.png";
import photoRoom from "@2026-public/2026-images/image6.png";
import photoStage from "@2026-public/2026-images/image4.png";
import photoHallway from "@2026-public/2026-images/image5.png";
import remiel from "@2026-public/remiel.webp";
import yinghao from "@2026-public/2026-images/Yinghao.jpg";
import cameron from "@2026-public/2026-images/Cameron.jpg";

const SANTA_MONICA = "/assets/roadtrip/zone3-about/santa-monica.jpg";

const PORTRAITS: Record<(typeof TESTIMONIALS)[number]["image"], StaticImageData> = { remiel, yinghao, cameron };

// Real photos from HackCC Fall 2025, captioned by what they show. Small, alternating tilts only.
const PRINTS: Print[] = [
  { src: photoHacking, alt: "Students working on laptops around a table, with lit marquee letters behind them", caption: "Teams at work", tilt: "md:-rotate-1" },
  { src: photoRoom, alt: "A room of students coding at long tables, with purple balloons and marquee letters", caption: "The hacking room", tilt: "md:rotate-[0.75deg]" },
  { src: photoHallway, alt: "Eight participants with event lanyards smiling in a hallway", caption: "Between sessions", tilt: "md:-rotate-[0.5deg]" },
  { src: photoStage, alt: "About fifteen participants posing together on stage at the end of the event", caption: "Closing ceremony", tilt: "md:rotate-1" },
];

/** Stop 3. The pier and Ferris wheel own the right; the story sits in the open sky to the left. */
export default function Zone3About() {
  return (
    <Scene
      edgeAbove={SEAM.detailsToAbout}
      blendAbove
      tone={TONE.about}
      // Inglewood ends on dark hillside and this plate starts on bright sky, so the blend runs a little longer
      edgeTopHeight="h-16 md:h-32"
      contentClassName="xl:hidden"
      id="about"
      aliases={["zone-about"]}
      labelledBy="about-title"
      image={SANTA_MONICA}
      alt="Illustration of Santa Monica Pier at blue hour, the Ferris wheel lit and the beach in front"
      position="object-[80%_50%] md:object-[50%_50%] lg:object-[80%_40%]"
      backing="bg-[linear-gradient(100deg,rgb(15_17_20/0.88)_0%,rgb(15_17_20/0.72)_40%,rgb(15_17_20/0)_62%)] lg:bg-[linear-gradient(100deg,rgb(15_17_20/0.85)_0%,rgb(15_17_20/0.65)_36%,rgb(15_17_20/0)_55%),linear-gradient(0deg,#10202D_0%,rgb(16_32_45/0.9)_28%,rgb(16_32_45/0.7)_40%,rgb(16_32_45/0)_56%)] max-md:bg-[linear-gradient(180deg,rgb(15_17_20/0.85)_0%,rgb(15_17_20/0.55)_55%,rgb(15_17_20/0.2)_100%)]"
      overlayClassName="items-start md:items-center lg:items-start lg:pt-32"
      overlay={
        <div className="w-full">
          <div className="max-w-[34rem]">
            <StopMarker number={3} place="Santa Monica" />
            <StopHeading id="about-title">What HackCC is</StopHeading>
            <p className="mt-5 text-lg leading-relaxed text-cream">
              HackCC is a hackathon built for community college students, by community college students. You show up in
              the morning, find a team, pick a problem you care about, and by evening you demo something real.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-cream">
              Most California hackathons are at universities. This one is for transfer students, first-timers and anyone
              who has never written a line of code.
            </p>
          </div>
          {/* Desktop: prints on the waterline, then the numbers and the quotes down the beach; the Ferris wheel stays clear */}
          <div className="mt-16 hidden lg:block">
            <Prints columns="grid-cols-4" sizes="300px" />
            <div className="mt-10">
              <LastTime />
              <Stats columns="grid-cols-4" compact />
            </div>
            {/* Quotes join them on the beach only from 1280px; any narrower and the scene gets so tall the wheel drops out of frame */}
            <div className="mt-12 hidden [text-shadow:0_1px_3px_rgb(0_0_0/0.9),0_2px_14px_rgb(0_0_0/0.85)] xl:block">
              <Testimonials />
            </div>
          </div>
        </div>
      }
    >
      {/* Narrower screens: whatever isn't on the art stacks under it (everything below 1024px, the quotes up to 1279px) */}
      <div className="lg:hidden">
        <LastTime />
        <Stats columns="grid-cols-2 md:grid-cols-4" />
        <div className="mt-14">
          <Prints columns="grid-cols-1 sm:grid-cols-2" sizes="(min-width: 640px) 50vw, 100vw" />
        </div>
      </div>
      <div className="mt-16 lg:mt-0">
        <Testimonials />
      </div>
    </Scene>
  );
}

/** Verbatim quotes from people who were there, set straight on the scene or its tone. */
function Testimonials() {
  return (
    <>
      <h3 className="font-heading text-[clamp(1.75rem,3.5vw,2.5rem)] text-cream">In their words</h3>
      <ul className="mt-6 grid items-start gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map(t => (
          <li key={t.name} className="border-t border-cream/25 pt-6">
            <figure className="max-w-[36rem]">
              <span aria-hidden className="block h-9 font-serif text-6xl leading-none text-action">&ldquo;</span>
              <blockquote className="font-serif text-xl font-medium italic leading-relaxed text-cream">{t.quote}</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <Image src={PORTRAITS[t.image]} alt="" width={48} height={48} className="size-12 shrink-0 rounded-full object-cover ring-2 ring-cream/30" />
                <span>
                  <span className="block text-base font-bold text-cream">{t.name}</span>
                  <span className="block text-[15px] text-cream/85">{t.context}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </>
  );
}

function LastTime() {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-4 border-b border-line pb-3">
      <h3 className="text-[13px] font-bold uppercase tracking-[0.14em] text-mist">
        Last time · {LAST_EVENT.name} · {LAST_EVENT.venue}
      </h3>
      <Button href={LAST_EVENT.devpostUrl} variant="tertiary">
        All 29 projects on Devpost
      </Button>
    </div>
  );
}

function Stats({ columns, compact = false }: { columns: string; compact?: boolean }) {
  return (
    <dl className={`grid gap-y-8 ${compact ? "mt-4" : "mt-6"} ${columns}`}>
      {LAST_EVENT.stats.map(stat => (
        <div key={stat.label} className="border-l-2 border-action/70 pl-4">
          <dt className="sr-only">{stat.label}</dt>
          <dd className={`font-heading leading-none text-action ${compact ? "text-[2.5rem]" : "text-[clamp(2.25rem,5vw,3.5rem)]"}`}>{stat.value}</dd>
          <dd className="mt-2 text-base text-cream/90">{stat.label}</dd>
        </div>
      ))}
    </dl>
  );
}

function Prints({ columns, sizes }: { columns: string; sizes: string }) {
  return (
    <>
      <PrintGallery prints={PRINTS} columns={columns} sizes={sizes} />
      <p className="mt-4 text-sm text-mist [text-shadow:0_1px_8px_rgb(0_0_0/0.8)]">Photos from {LAST_EVENT.name}. Select a photo to see it larger.</p>
    </>
  );
}
