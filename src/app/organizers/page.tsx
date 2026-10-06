import type { Metadata } from "next";
import Image from "next/image";
import { getPublicApplicationStatus } from "@/lib/publicStatus";
import { SiteHeader } from "@/components/roadtrip/SiteHeader";
import { SiteFooter } from "@/components/roadtrip/SiteFooter";
import { HighwaySign } from "@/components/roadtrip/HighwaySign";
import { SCENE_QUALITY, SCENE_SIZES } from "@/components/roadtrip/Scene";
import { Button } from "@/components/ui/Button";
import { OrganizerDirectory, type Organizer, type TeamFilter } from "@/components/team/OrganizerDirectory";
import organizersData from "../../../public/data/organizers.json";

export const metadata: Metadata = {
  title: "Team",
  description: "The California community college students organizing HackCC 2026.",
};

// The drive starts at the Golden Gate: crew pages open with the bridge at blue hour.
const GOLDEN_GATE = "/assets/roadtrip/organizers/golden-gate.jpg";

type RawOrganizer = {
  id: string;
  name: string;
  role: string;
  college?: string;
  image: string;
  linkedin?: string;
  socials?: { linkedin?: string };
  category?: string | string[];
  categories?: string[];
};

// The studio portraits share one backdrop and similar framing, so one focal point fits all.
// Add an entry here only if a new photo needs its face nudged up or down in the 4:5 frame.
const FRAMING: Record<string, { position: string; scale: number }> = {
  // Seated, full-length shot: zoom in so her face sits at the same height as everyone else's
  "hillary-nguyen": { position: "center 12%", scale: 1.25 },
};

const TEAM_LABELS: Record<string, string> = {
  leadership: "Leadership",
  website: "Website",
  engineering: "Engineering",
  logistics: "Logistics",
  sponsorships: "Sponsorships",
  marketing: "Marketing",
};

// First row is fixed (Paul, Kareem, Tom), then the other leads, then everyone else alphabetically.
const FIRST_ROW = ["paul-pham", "kareem-tadros", "tom-perel"];
const rank = (o: Organizer) => {
  const pinned = FIRST_ROW.indexOf(o.id);
  if (pinned !== -1) return pinned;
  return /lead|head|director/i.test(o.role) ? FIRST_ROW.length : FIRST_ROW.length + 1;
};

const ORGANIZERS: Organizer[] = (organizersData as RawOrganizer[])
  .map(o => ({
    id: o.id,
    name: o.name,
    role: o.role,
    college: o.college,
    image: o.image,
    linkedin: o.linkedin || o.socials?.linkedin,
    categories: o.categories ?? (Array.isArray(o.category) ? o.category : o.category ? [o.category] : []),
    objectPosition: FRAMING[o.id]?.position ?? "center 22%",
    scale: FRAMING[o.id]?.scale ?? 1,
  }))
  .sort((a, b) => rank(a) - rank(b) || a.name.localeCompare(b.name));

// Built from the data, so a team with nobody on it never gets a filter.
const FILTERS: TeamFilter[] = [
  { id: "all", label: "Everyone", count: ORGANIZERS.length },
  ...Object.entries(TEAM_LABELS)
    .map(([id, label]) => ({ id, label, count: ORGANIZERS.filter(o => o.categories.includes(id)).length }))
    .filter(f => f.count > 0),
];

const CAMPUSES = new Set(ORGANIZERS.map(o => o.college?.trim()).filter(Boolean)).size;

export default async function OrganizersPage() {
  const status = await getPublicApplicationStatus();

  return (
    <>
      <SiteHeader status={status} />
      <main id="main" className="flex-1 bg-night text-cream">
        <section aria-labelledby="team-title" className="relative isolate overflow-hidden">
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
            <HighwaySign>Pull-off · The crew</HighwaySign>
            <h1 id="team-title" className="mt-4 font-heading text-[clamp(2.5rem,6vw,4rem)] leading-none">
              The team
            </h1>
            <p className="mt-4 max-w-[34rem] text-lg leading-relaxed">
              HackCC is organized by California community college students: {ORGANIZERS.length} of us from {CAMPUSES}{" "}
              campuses, all volunteers.
            </p>
          </div>
        </section>

        <section aria-label="Organizers" className="mx-auto w-full max-w-page px-5 pb-20 md:px-8">
          <OrganizerDirectory organizers={ORGANIZERS} filters={FILTERS} />
        </section>

        <section aria-labelledby="join-title" className="border-t border-line bg-surface">
          <div className="mx-auto flex w-full max-w-page flex-col gap-6 px-5 py-14 md:flex-row md:items-end md:justify-between md:px-8">
            <div>
              <h2 id="join-title" className="text-2xl font-bold">
                Want to help run the next one?
              </h2>
              <p className="mt-2 max-w-[48ch] text-mist">
                We&apos;re looking for community college students to join the website, engineering, logistics and
                sponsorship teams.
              </p>
            </div>
            <Button href="/apply/organizer" arrow>
              Join the organizing team
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter status={status} />
    </>
  );
}
