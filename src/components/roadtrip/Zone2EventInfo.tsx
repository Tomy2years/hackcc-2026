import { EVENT } from "@/lib/event";
import { TIMELINE } from "@/lib/content";
import { Scene, StopMarker, StopTitle } from "./Scene";

const INGLEWOOD_ART = "/assets/roadtrip/zone2-details/inglewood.jpg";

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${EVENT.venue.name}, ${EVENT.venue.address}`
)}`;

export default function Zone2EventInfo() {
  return (
    <Scene id="zone-details" image={INGLEWOOD_ART} alt="Inglewood at dusk: the stadium canopy lit, palms and the LA skyline, a crescent moon rising">
      <StopMarker number={2} place="Inglewood" />
      <StopTitle hook="The essentials" title="When, where, who" />

      {/* Monumental facts, separated by hairlines, no boxes */}
      <dl className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/15">
        <div className="py-5 sm:py-0 sm:pr-8">
          <dt className="text-xs font-bold uppercase tracking-wider text-mist/70">When</dt>
          <dd className="font-heading text-5xl sm:text-6xl text-action mt-2 leading-none">{EVENT.dateLabel}</dd>
          <dd className="mt-3 text-mist/85 leading-relaxed">
            One day, about 14 hours, roughly 8 AM to 10 PM. No overnight. The exact date is being finalized with the
            campus; the Discord hears first.
          </dd>
        </div>
        <div className="py-5 sm:py-0 sm:px-8">
          <dt className="text-xs font-bold uppercase tracking-wider text-mist/70">Where</dt>
          <dd className="font-heading text-3xl sm:text-4xl text-white mt-2 leading-tight">{EVENT.venue.name}</dd>
          <dd className="mt-3 text-mist/85 leading-relaxed">
            {EVENT.venue.address}.{" "}
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-white hover:text-action underline underline-offset-4 decoration-white/40 hover:decoration-action transition-colors"
            >
              Get directions
            </a>
            . Building, room and parking details to follow.
          </dd>
        </div>
        <div className="py-5 sm:py-0 sm:pl-8">
          <dt className="text-xs font-bold uppercase tracking-wider text-mist/70">Who</dt>
          <dd className="font-heading text-5xl sm:text-6xl text-action mt-2 leading-none">Free</dd>
          <dd className="mt-3 text-mist/85 leading-relaxed">
            For California community college students, 18 and up, any major, any experience level. Meals included.
          </dd>
        </div>
      </dl>

      {/* Application timeline drawn as the road */}
      <div className="mt-16 sm:mt-20">
        <h3 className="text-sm font-bold uppercase tracking-wider text-mist/70 mb-6">The road to event day</h3>
        <ol className="relative grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
          {/* the road */}
          <div aria-hidden className="hidden md:block absolute top-[9px] left-[12.5%] right-[12.5%] h-0.5 bg-white/25" />
          <div aria-hidden className="hidden md:block absolute top-[8px] left-[12.5%] right-[12.5%] h-[3px] border-t-2 border-dashed border-action/70" />
          {TIMELINE.map((stop, i) => (
            <li key={stop.label} className="relative md:text-center">
              <span
                aria-hidden
                className={`block w-5 h-5 rounded-full border-2 md:mx-auto ${
                  stop.date ? "bg-action border-action" : "bg-night border-white/50"
                }`}
              />
              <p className="mt-3 text-sm font-bold text-white">
                {i + 1}. {stop.label}
              </p>
              <p className={`text-sm mt-0.5 ${stop.date ? "text-action font-bold" : "text-mist/60"}`}>
                {stop.date ?? "Date coming soon"}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Scene>
  );
}
