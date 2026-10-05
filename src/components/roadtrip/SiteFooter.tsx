import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { EVENT } from "@/lib/event";
import type { ApplicationStatus } from "@/lib/applicationStatus";
import { HighwaySign } from "./HighwaySign";

const linkClass =
  "inline-flex min-h-10 items-center text-cream/90 hover:text-action underline-offset-4 hover:underline transition-colors duration-150";

export function SiteFooter({ status }: { status: Pick<ApplicationStatus, "canApply" | "href"> }) {
  return (
    <footer className="relative z-10 border-t border-line bg-night-deep text-cream">
      <div className="mx-auto w-full max-w-page px-5 py-14 md:px-8 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-heading text-3xl">{EVENT.edition}</p>
            <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-mist">
              A free, one-day hackathon run by community college students at {EVENT.venue.name}, {EVENT.venue.city}.{" "}
              {EVENT.dateStatus}.
            </p>
            <ul className="mt-5 flex items-center gap-6">
              <li>
                <a href={EVENT.social.discord} target="_blank" rel="noopener noreferrer" className={`${linkClass} gap-2`}>
                  <FontAwesomeIcon icon={faDiscord} className="size-5" aria-hidden />
                  Discord
                </a>
              </li>
              <li>
                <a href={EVENT.social.instagram} target="_blank" rel="noopener noreferrer" className={`${linkClass} gap-2`}>
                  <FontAwesomeIcon icon={faInstagram} className="size-5" aria-hidden />
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Footer" className="md:col-span-4">
            <h2 className="text-[13px] font-bold uppercase tracking-[0.14em] text-mist">On this site</h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 text-[15px]">
              <li><Link href="/#about" className={linkClass}>About</Link></li>
              <li><Link href="/#details" className={linkClass}>Event details</Link></li>
              <li><Link href="/#projects" className={linkClass}>Projects</Link></li>
              <li><Link href="/#sponsors" className={linkClass}>Sponsors</Link></li>
              <li><Link href="/#faq" className={linkClass}>FAQ</Link></li>
              <li><Link href="/organizers" className={linkClass}>Team</Link></li>
              {status.canApply && status.href && (
                <li><Link href={status.href} className={linkClass}>Apply</Link></li>
              )}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="text-[13px] font-bold uppercase tracking-[0.14em] text-mist">Get involved</h2>
            <ul className="mt-3 text-[15px]">
              <li><Link href="/apply/organizer" className={linkClass}>Join the organizing team</Link></li>
              <li><a href={`mailto:${EVENT.contactEmail}`} className={linkClass}>{EVENT.contactEmail}</a></li>
              <li><Link href="/2026" className={linkClass}>Spring 2026 site (archive)</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-mist">© {EVENT.year} HackCC. Student-run in Southern California.</p>
          <HighwaySign>{EVENT.edition} · Costa Mesa</HighwaySign>
        </div>
      </div>
    </footer>
  );
}
