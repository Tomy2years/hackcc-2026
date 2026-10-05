import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { EVENT } from "@/lib/event";

interface RoadTripFooterProps {
  /** True once registration is open; decided on the server per request. */
  applyOpen: boolean;
}

export default function RoadTripFooter({ applyOpen }: RoadTripFooterProps) {
  return (
    <footer className="relative z-30 w-full bg-night-deep border-t border-white/10 text-mist">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12">
          {/* Who we are */}
          <div className="md:col-span-5 space-y-4">
            <p className="font-heading text-2xl sm:text-3xl text-white tracking-wide">{EVENT.edition}</p>
            <p className="text-sm leading-relaxed max-w-sm text-mist/80">
              A hackathon run by and for California community college students. {EVENT.dateLabel} at{" "}
              {EVENT.venue.name}, {EVENT.venue.city}. Free to attend, beginners welcome.
            </p>
            <div className="flex items-center gap-5 pt-1">
              <a
                href={EVENT.social.discord}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="HackCC on Discord"
                className="text-mist/70 hover:text-action transition-colors"
              >
                <FontAwesomeIcon icon={faDiscord} className="w-6 h-6" />
              </a>
              <a
                href={EVENT.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="HackCC on Instagram"
                className="text-mist/70 hover:text-action transition-colors"
              >
                <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />
              </a>
              <a href={`mailto:${EVENT.contactEmail}`} className="text-sm font-semibold text-mist/70 hover:text-action transition-colors">
                {EVENT.contactEmail}
              </a>
            </div>
          </div>

          {/* On this page */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-sm font-bold text-white">On this page</h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#zone-about" className="text-mist/80 hover:text-white transition-colors">About HackCC</a></li>
              <li><a href="#zone-details" className="text-mist/80 hover:text-white transition-colors">Event details</a></li>
              <li><a href="#zone-sponsors" className="text-mist/80 hover:text-white transition-colors">Sponsors</a></li>
              <li><a href="#zone-faq" className="text-mist/80 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Elsewhere */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-sm font-bold text-white">More</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/organizers" className="text-mist/80 hover:text-white transition-colors">Meet the organizers</Link></li>
              <li><Link href="/apply/organizer" className="text-mist/80 hover:text-white transition-colors">Join the organizing team</Link></li>
              <li><Link href="/2026" className="text-mist/80 hover:text-white transition-colors">Spring 2026 archive</Link></li>
              <li>
                {applyOpen ? (
                  <Link href="/apply" className="text-action hover:text-action-hover font-bold transition-colors inline-flex items-center gap-1">
                    <span>Apply to HackCC {EVENT.year}</span>
                    <span aria-hidden>→</span>
                  </Link>
                ) : (
                  <span className="text-mist/60">Applications open soon</span>
                )}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-mist/60">
          <p>© {EVENT.year} HackCC. Student-run, Southern California.</p>
          <a href="#top" className="hover:text-action transition-colors font-medium">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
