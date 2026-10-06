import Link from "next/link";
import { EVENT } from "@/lib/event";
import type { ApplicationStatus } from "@/lib/applicationStatus";
import { Scene, StopMarker } from "./Scene";
import { TONE } from "./tones";

const SAN_DIEGO = "/assets/roadtrip/zone6-cta-footer/san-diego.jpg";

const volunteerMail = `mailto:${EVENT.contactEmail}?subject=${encodeURIComponent(`Mentoring, judging or volunteering at ${EVENT.edition}`)}`;
const sponsorMail = `mailto:${EVENT.contactEmail}?subject=${encodeURIComponent(`Sponsoring ${EVENT.edition}`)}`;

const linkClass =
  "font-bold text-cream underline decoration-2 decoration-cream/45 underline-offset-4 hover:text-action hover:decoration-action";

/**
 * Stop 6, the arrival. The sunrise band is bright and open, so the invitation is set
 * directly on it in midnight type (9:1+ contrast) with no overlay.
 */
export default function Zone6FooterCTA({ status }: { status: ApplicationStatus }) {
  return (
    <Scene
      edgeAbove={TONE.faq}
      blendAbove
      tone={TONE.apply}
      id="apply"
      aliases={["zone-apply"]}
      labelledBy="invite-title"
      image={SAN_DIEGO}
      alt="Illustration of San Diego Bay at sunrise: a lifeguard tower, the Coronado bridge and the downtown skyline across the water"
      position="object-[62%_50%] md:object-[50%_50%]"
      overlayClassName="items-start justify-center pt-[2vh] text-center"
      overlay={
        <div className="flex max-w-[40rem] flex-col items-center">
          <StopMarker number={6} place="San Diego" tone="dark" />
          <h2 id="invite-title" className="font-heading text-[clamp(2.5rem,7vw,4.75rem)] leading-[0.98] text-night text-balance">
            See you in Costa Mesa
          </h2>
          <p className="mt-4 max-w-[40rem] text-xl font-bold leading-relaxed text-night">
            {status.canApply
              ? "Applications are open. No experience or team needed."
              : status.state === "closed"
                ? "Applications are closed for this year."
                : "Applications open soon. No experience or team needed."}
          </p>
          <div className="mt-6">
            {status.canApply && status.href ? (
              <Link
                href={status.href}
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-night px-7 text-base font-bold text-cream transition-colors duration-150 hover:bg-surface"
              >
                {status.actionLabel}
                <span aria-hidden>→</span>
              </Link>
            ) : (
              <a
                href={EVENT.social.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-night px-7 text-base font-bold text-cream transition-colors duration-150 hover:bg-surface"
              >
                Join the Discord for updates
              </a>
            )}
          </div>
        </div>
      }
    >
      <h3 className="text-[13px] font-bold uppercase tracking-[0.14em] text-mist">Other ways to be part of it</h3>
      <dl className="mt-4 grid gap-8 border-t border-line pt-6 md:grid-cols-3">
        <div>
          <dt className="text-lg font-bold text-cream">Mentor, judge or volunteer</dt>
          <dd className="mt-2 leading-relaxed text-mist">
            Help students with their projects on the day.{" "}
            <a href={volunteerMail} className={linkClass}>
              Email us
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-lg font-bold text-cream">Organize</dt>
          <dd className="mt-2 leading-relaxed text-mist">
            Join the student team that plans HackCC.{" "}
            <Link href="/apply/organizer" className={linkClass}>
              Join the organizing team
            </Link>
          </dd>
        </div>
        <div>
          <dt className="text-lg font-bold text-cream">Sponsor</dt>
          <dd className="mt-2 leading-relaxed text-mist">
            Fund prizes, food and the venue.{" "}
            <a href={sponsorMail} className={linkClass}>
              Ask for details
            </a>
          </dd>
        </div>
      </dl>
    </Scene>
  );
}
