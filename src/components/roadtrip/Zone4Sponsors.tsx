import Image, { type StaticImageData } from "next/image";
import { FEATURED_PROJECT, LAST_EVENT, MORE_PROJECTS, type Project } from "@/lib/content";
import { Scene, StopHeading, StopMarker } from "./Scene";
import { TONE } from "./tones";

import photoOverall from "@2026-public/2026-images/image7.png";
import photoAiml from "@2026-public/2026-images/image9.png";
import photoSocialGood from "@2026-public/2026-images/image8.png";

const ORANGE_COUNTY = "/assets/roadtrip/zone4-sponsors/orange-county.jpg";

const PHOTOS: Record<NonNullable<Project["photo"]>, { src: StaticImageData; alt: string }> = {
  overall: { src: photoOverall, alt: "Three students holding Overall Winner certificates in front of lit marquee letters" },
  aiml: { src: photoAiml, alt: "Four students holding Best AI/ML certificates" },
  socialGood: { src: photoSocialGood, alt: "Four students holding Best Social Good/Impact certificates" },
};

const linkClass =
  "inline-flex min-h-11 items-center font-bold text-cream underline decoration-2 decoration-cream/45 underline-offset-[6px] hover:text-action hover:decoration-action";

/** Stop 4. The night sky is open across the top; the heading sits right, clear of the moon. */
export default function Zone4Sponsors() {

  return (
    <Scene
      edgeAbove={TONE.about}
      blendAbove
      tone={TONE.projects}
      // Desktop shows every project on the art, so nothing stacks below it there
      contentClassName="lg:hidden"
      id="projects"
      labelledBy="projects-title"
      image={ORANGE_COUNTY}
      alt="Illustration of Orange County at night: orange groves, a freeway with headlights and the lit stadium under a full moon"
      position="object-[70%_50%] md:object-[50%_50%]"
      backing="bg-[linear-gradient(255deg,rgb(15_17_20/0.88)_0%,rgb(15_17_20/0.7)_30%,rgb(15_17_20/0)_55%)] lg:bg-[radial-gradient(ellipse_55%_60%_at_12%_92%,rgb(15_17_20/0.85)_0%,rgb(15_17_20/0.6)_45%,rgb(15_17_20/0)_78%),radial-gradient(ellipse_50%_55%_at_80%_80%,rgb(15_17_20/0.88)_0%,rgb(15_17_20/0.72)_50%,rgb(15_17_20/0)_85%),linear-gradient(255deg,rgb(15_17_20/0.88)_0%,rgb(15_17_20/0.65)_35%,rgb(15_17_20/0)_60%)] max-md:bg-[linear-gradient(180deg,rgb(15_17_20/0.85)_0%,rgb(15_17_20/0.6)_50%,rgb(15_17_20/0)_75%)]"
      overlayClassName="items-start justify-end pt-28 md:pt-32"
      overlay={
        <div className="w-full lg:grid lg:grid-cols-12 lg:gap-10">
          {/* Desktop: the featured winner sits on the orange groves, left of the heading */}
          <div className="hidden lg:col-span-6 lg:block lg:pt-24">
            <FeaturedProject compact />
          </div>
          <div className="lg:col-span-6">
            <div className="ml-auto max-w-[32rem] md:text-right">
              <StopMarker number={4} place="Orange County" />
              <StopHeading id="projects-title">What people built last year</StopHeading>
              <p className="mt-4 text-lg leading-relaxed text-cream">
                Four award winners from {LAST_EVENT.name}. Each was started and finished on the day.
              </p>
            </div>
            {/* Desktop: the other winners ride along the freeway, under the heading */}
            <ul className="mt-8 hidden lg:block">
              {MORE_PROJECTS.map(project => (
                <li key={project.name}>
                  <ProjectRow project={project} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      }
    >
      {/* Below desktop width the projects stack under the artwork instead */}
      <div>
        <FeaturedProject />
        <ul className="mt-8 grid gap-8 md:grid-cols-3">
          {MORE_PROJECTS.map(project => {
            const photo = project.photo ? PHOTOS[project.photo] : null;
            return (
              <li key={project.name} className="flex flex-col border-t-2 border-action/70 pt-5">
                <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-action">{project.award}</p>
                <h3 className="mt-1 text-2xl font-bold text-cream">{project.name}</h3>
                <p className="mt-2 leading-relaxed text-mist">{project.summary}</p>
                {project.team && <p className="mt-2 text-sm text-mist">Built by {project.team}.</p>}
                {photo && (
                  <Image src={photo.src} alt={photo.alt} sizes="(min-width: 768px) 360px, 100vw" placeholder="blur" className="print-grade mt-4 h-auto w-full rounded-lg" />
                )}
                <a href={project.url} target="_blank" rel="noopener noreferrer" className={`${linkClass} mt-2`}>
                  View on Devpost<span className="sr-only">: {project.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

    </Scene>
  );
}

/** The overall winner. Compact is the version set on the artwork at desktop width: a print, then text, no box. */
function FeaturedProject({ compact = false }: { compact?: boolean }) {
  const photo = FEATURED_PROJECT.photo ? PHOTOS[FEATURED_PROJECT.photo] : null;
  return (
    <article className={compact ? "[text-shadow:0_1px_3px_rgb(0_0_0/0.9),0_2px_14px_rgb(0_0_0/0.85)]" : "grid gap-8 md:grid-cols-12"}>
      {photo && (
        <div className={compact ? "max-w-[30rem] md:-rotate-1" : "md:col-span-5"}>
          {compact ? (
            <figure className="rounded-[3px] bg-paper p-2.5 shadow-[0_4px_14px_rgb(0_0_0/0.35)]">
              <Image src={photo.src} alt={photo.alt} sizes="480px" placeholder="blur" className="print-grade aspect-[16/9] w-full rounded-[2px] object-cover object-[50%_35%]" />
            </figure>
          ) : (
            <Image src={photo.src} alt={photo.alt} sizes="(min-width: 768px) 440px, 100vw" placeholder="blur" className="print-grade h-auto w-full rounded-lg" />
          )}
        </div>
      )}
      <div className={compact ? "mt-6 max-w-[36rem]" : "md:col-span-7"}>
        <p className="inline-flex rounded-md bg-action px-2.5 py-1 text-[13px] font-bold uppercase tracking-[0.1em] text-night [text-shadow:none]">
          {FEATURED_PROJECT.award}
        </p>
        <h3 className={`mt-3 font-heading leading-none text-cream ${compact ? "text-[3.5rem]" : "text-[clamp(2rem,4vw,3rem)]"}`}>
          {FEATURED_PROJECT.name}
        </h3>
        <p className={`mt-3 max-w-[58ch] leading-relaxed ${compact ? "text-xl font-medium text-cream" : "text-lg text-mist"}`}>{FEATURED_PROJECT.summary}</p>
        {FEATURED_PROJECT.team && <p className={`mt-2 text-cream ${compact ? "text-[17px]" : "text-[15px]"}`}>Built by {FEATURED_PROJECT.team}.</p>}
        <a href={FEATURED_PROJECT.url} target="_blank" rel="noopener noreferrer" className={`${linkClass} mt-2`}>
          See {FEATURED_PROJECT.name} on Devpost
        </a>
      </div>
    </article>
  );
}

/** One supporting winner as a slim row set on the artwork at desktop width. */
function ProjectRow({ project }: { project: Project }) {
  const photo = project.photo ? PHOTOS[project.photo] : null;
  return (
    <article className="flex items-center gap-5 border-t border-cream/25 py-5 text-left [text-shadow:0_1px_3px_rgb(0_0_0/0.9),0_2px_14px_rgb(0_0_0/0.85)]">
      {/* Winners with a photo get a large print; the rest are text only, with no placeholder tile */}
      {photo && (
        <Image src={photo.src} alt={photo.alt} sizes="224px" placeholder="blur" className="print-grade aspect-[4/3] w-56 shrink-0 rounded-md object-cover object-[50%_30%]" />
      )}
      <div className="min-w-0">
        <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-action">{project.award}</p>
        <h3 className="text-xl font-bold leading-tight text-cream">{project.name}</h3>
        <p className="mt-1 text-base font-medium leading-snug text-cream">{project.summary}</p>
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm font-bold text-cream underline decoration-cream/45 decoration-2 underline-offset-4 hover:text-action hover:decoration-action">
          View on Devpost<span className="sr-only">: {project.name}</span>
        </a>
      </div>
    </article>
  );
}
