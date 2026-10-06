import type { Metadata } from "next";
import Image from "next/image";
import { EVENT } from "@/lib/event";
import { getPublicApplicationStatus } from "@/lib/publicStatus";
import { SiteHeader } from "@/components/roadtrip/SiteHeader";
import { SiteFooter } from "@/components/roadtrip/SiteFooter";
import { HighwaySign } from "@/components/roadtrip/HighwaySign";
import { SCENE_QUALITY, SCENE_SIZES } from "@/components/roadtrip/Scene";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Join the organizing team",
  description: "Help California community college students organize HackCC 2026.",
};

// The drive starts at the Golden Gate: crew pages open with the bridge at blue hour.
const GOLDEN_GATE = "/assets/roadtrip/organizers/golden-gate.jpg";

// The teams that exist today (see /organizers). Keep in step with public/data/organizers.json.
const TEAMS = [
  { title: "Website", work: "Build and maintain hackcc.net, including the application form." },
  { title: "Engineering", work: "The technical side of the day: tools, check-in and judging support." },
  { title: "Logistics", work: "Venue layout, food, the schedule, volunteers and the day-of flow." },
  { title: "Sponsorships", work: "Reach out to companies and colleges, and look after sponsors and prizes." },
];

const MAILTO = `mailto:${EVENT.contactEmail}?subject=${encodeURIComponent(`${EVENT.edition} organizer interest`)}`;

export default async function OrganizerApplyPage() {
  const status = await getPublicApplicationStatus();

  return (
    <>
      <SiteHeader status={status} />
      <main id="main" className="flex-1 bg-night text-cream">
        <section aria-labelledby="organize-title" className="relative isolate overflow-hidden">
          <Image
            src={GOLDEN_GATE}
            alt=""
            fill
            priority
            quality={SCENE_QUALITY}
            sizes={SCENE_SIZES}
            className="-z-10 object-cover object-[64%_52%] md:object-[60%_48%]"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(15_17_20/0.85)_0%,rgb(15_17_20/0.55)_45%,rgb(15_17_20/0)_75%),linear-gradient(180deg,rgb(15_17_20/0)_60%,rgb(15_17_20)_100%)]"
          />
          <div className="mx-auto w-full max-w-page px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24">
            <HighwaySign>Crew wanted</HighwaySign>
            <h1 id="organize-title" className="mt-4 max-w-[14ch] font-heading text-[clamp(2.5rem,6vw,4rem)] leading-none">
              Join the organizing team
            </h1>
            <p className="mt-4 max-w-[36rem] text-lg leading-relaxed">
              {EVENT.name} is run by community college students who volunteer their time. If you&apos;re a California
              community college student and want to help put on {EVENT.edition}, we&apos;d like to hear from you.
            </p>
          </div>
        </section>

        <div className="mx-auto grid w-full max-w-page gap-12 px-5 pb-24 md:px-8 lg:grid-cols-12">
          <section aria-labelledby="teams-title" className="lg:col-span-7">
            <h2 id="teams-title" className="text-2xl font-bold">
              The teams
            </h2>
            <dl className="mt-4 divide-y divide-line border-y border-line">
              {TEAMS.map(team => (
                <div key={team.title} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="font-bold text-action">{team.title}</dt>
                  <dd className="text-mist">{team.work}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="how-title" className="rounded-2xl border border-line bg-surface p-6 md:p-8 lg:col-span-5">
            <h2 id="how-title" className="text-2xl font-bold">
              How to get involved
            </h2>
            <p className="mt-3 text-mist">Email us with:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-cream">
              <li>your name and college</li>
              <li>which team interests you</li>
              <li>anything you&apos;ve built or organized before (optional)</li>
            </ul>
            <div className="mt-6">
              <Button href={MAILTO} arrow>
                Email the team
              </Button>
            </div>
            <p className="mt-4 text-sm text-mist">
              Or write to <span className="font-bold text-cream">{EVENT.contactEmail}</span> directly. Want to mentor,
              judge or volunteer on the day instead? Use the same address and say so in the subject.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter status={status} />
    </>
  );
}
