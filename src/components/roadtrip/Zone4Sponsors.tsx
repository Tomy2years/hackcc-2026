import { EVENT } from "@/lib/event";
import { PAST_SPONSORS, PAST_WINNERS } from "@/lib/content";
import { Scene, StopMarker, StopTitle } from "./Scene";

const OC_ANAHEIM = "/assets/roadtrip/zone4-sponsors/orange-county.jpg";

const sponsorMail = `mailto:${EVENT.contactEmail}?subject=${encodeURIComponent(`Sponsoring HackCC ${EVENT.year}`)}`;

export default function Zone4Sponsors() {
  return (
    <Scene id="zone-sponsors" image={OC_ANAHEIM} alt="Orange groves and a freeway at night, Anaheim lit in the distance under a full moon">
      <StopMarker number={4} place="Orange County" />
      <StopTitle hook="Proof it works" title="What people built last time" />

      {/* Winners: named projects with links, not vague claims */}
      <ol className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 max-w-4xl">
        {PAST_WINNERS.map(project => (
          <li key={project.name} className="border-l border-white/20 pl-5">
            <p className="text-xs font-bold uppercase tracking-wider text-action">{project.award}</p>
            <h3 className="font-heading text-2xl sm:text-3xl text-white mt-1">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-action transition-colors"
              >
                {project.name}
              </a>
            </h3>
            <p className="mt-1.5 text-mist/85 leading-relaxed">{project.blurb}</p>
          </li>
        ))}
      </ol>

      {/* Sponsors */}
      <div className="mt-20 sm:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7">
          <h3 className="font-heading text-3xl sm:text-5xl text-white leading-tight">Sponsors</h3>
          <p className="mt-4 text-lg text-mist/90 leading-relaxed max-w-xl">
            Last year, {PAST_SPONSORS[0]} and {PAST_SPONSORS[1]} put ${"7,200+"} in prizes into students&apos; hands and
            gave every participant a coding pass to keep learning after the event. {EVENT.year} sponsors will be
            announced here as they sign on.
          </p>
          <p className="mt-6 text-xs font-bold uppercase tracking-wider text-mist/70">Past sponsors</p>
          <ul className="mt-3 flex flex-wrap gap-x-10 gap-y-3">
            {PAST_SPONSORS.map(name => (
              <li key={name} className="font-heading text-2xl sm:text-3xl text-white/90">
                {name}
              </li>
            ))}
          </ul>
        </div>

        {/* The one roadside sign on the whole trip */}
        <div className="lg:col-span-5 flex lg:justify-end">
          <a
            href={sponsorMail}
            className="group relative block w-full max-w-sm bg-sign text-white border-[3px] border-white/90 rounded-md px-6 py-6 shadow-2xl shadow-black/50 transition-transform hover:-translate-y-1"
          >
            <span className="absolute -top-3.5 right-6 bg-sign-deep border-2 border-white/90 rounded-sm px-2 py-0.5 text-[11px] font-bold tracking-[0.18em] uppercase">
              Exit {EVENT.year}
            </span>
            <span className="block text-xs font-bold uppercase tracking-[0.2em] text-white/80">Companies &amp; colleges</span>
            <span className="block font-heading text-3xl sm:text-4xl mt-1 leading-tight">Sponsor HackCC</span>
            <span className="mt-3 block text-sm text-white/90 leading-relaxed">
              Reach a few hundred students who are about to transfer, with a day of real projects to show for it.
              Email us for the prospectus.
            </span>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold group-hover:gap-3 transition-all">
              {EVENT.contactEmail} <span aria-hidden>→</span>
            </span>
          </a>
        </div>
      </div>
    </Scene>
  );
}
