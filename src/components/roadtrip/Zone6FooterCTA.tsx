import Link from "next/link";
import { EVENT } from "@/lib/event";
import { Scene, StopMarker, StopTitle } from "./Scene";

const SAN_DIEGO_BEACH = "/assets/roadtrip/zone6-cta-footer/san-diego.jpg";

interface Zone6FooterCTAProps {
  applyOpen: boolean;
}

const linkClass =
  "font-bold text-white hover:text-action underline underline-offset-8 decoration-white/40 hover:decoration-action transition-colors";

export default function Zone6FooterCTA({ applyOpen }: Zone6FooterCTAProps) {
  const volunteerMail = `mailto:${EVENT.contactEmail}?subject=${encodeURIComponent(`Volunteering, mentoring or judging at HackCC ${EVENT.year}`)}`;

  return (
    <Scene id="zone-apply" image={SAN_DIEGO_BEACH} alt="San Diego Bay at sunrise: a lifeguard tower, the Coronado bridge and the skyline across the water" tone="day">
      <StopMarker number={6} place="San Diego" />
      <StopTitle hook="Last stop" title="Come build with us" />

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* A short, signed note. Human words, no slogans. */}
        <div className="lg:col-span-7 font-serif text-xl sm:text-2xl leading-relaxed text-mist/95 max-w-2xl">
          <p className="italic">Dear hacker,</p>
          <p className="mt-5">
            Most of us organizing this went to our first hackathon unsure we belonged there. Some of us didn&apos;t have a
            team, a laptop charger, or any idea what an API was. We left with a project, a few friends and a different
            picture of what we could do in a day.
          </p>
          <p className="mt-5">
            That&apos;s the whole point of HackCC. You don&apos;t need experience, a team or money. You need a Saturday and
            some curiosity. We&apos;ll handle the rest.
          </p>
          <p className="mt-5 italic">See you on the road,</p>
          <p className="font-sans text-base font-bold text-white mt-1">The HackCC {EVENT.year} organizers</p>
        </div>

        {/* Ways in */}
        <div className="lg:col-span-5 lg:pt-2">
          <div className="pb-8 border-b border-white/15">
            <p className="text-xs font-bold uppercase tracking-wider text-mist/70">Hackers</p>
            {applyOpen ? (
              <Link
                href="/apply"
                className="mt-4 inline-flex items-center gap-2.5 rounded-full bg-action hover:bg-action-hover text-night font-bold text-lg px-8 py-4 shadow-lg shadow-black/30 transition-all hover:scale-105 active:scale-95"
              >
                <span>Apply to HackCC {EVENT.year}</span>
                <span aria-hidden className="text-xl leading-none">→</span>
              </Link>
            ) : (
              <p className="mt-3 text-lg text-mist/90 leading-relaxed">
                Applications open soon. The button will appear right here, and the{" "}
                <a href={EVENT.social.discord} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Discord
                </a>{" "}
                hears first.
              </p>
            )}
          </div>

          <dl className="mt-8 space-y-7">
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-mist/70">Mentors, judges, volunteers</dt>
              <dd className="mt-2 text-mist/90 leading-relaxed">
                Spend a Saturday helping students ship their first project.{" "}
                <a href={volunteerMail} className={linkClass}>
                  Email us
                </a>
                .
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-mist/70">Organizers</dt>
              <dd className="mt-2 text-mist/90 leading-relaxed">
                We&apos;re students across Southern California, and we have room on the team.{" "}
                <Link href="/apply/organizer" className={linkClass}>
                  Join the organizing team
                </Link>{" "}
                or{" "}
                <Link href="/organizers" className={linkClass}>
                  meet who&apos;s already on it
                </Link>
                .
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-mist/70">Sponsors</dt>
              <dd className="mt-2 text-mist/90 leading-relaxed">
                Fund prizes, meals and swag for a few hundred future transfers.{" "}
                <a href={`mailto:${EVENT.contactEmail}?subject=${encodeURIComponent(`Sponsoring HackCC ${EVENT.year}`)}`} className={linkClass}>
                  Ask for the prospectus
                </a>
                .
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </Scene>
  );
}
