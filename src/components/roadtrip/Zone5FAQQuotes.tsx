import { EVENT } from "@/lib/event";
import { ARCHIVED_SCHEDULE, buildFaq } from "@/lib/content";
import { FaqAccordion } from "./FaqAccordion";
import { Scene, StopHeading, StopMarker } from "./Scene";
import { TONE } from "./tones";
import { Sponsors } from "./Sponsors";

// One tall painting: the coast and domes at the top, the road running on down under the questions
// Upscaled 2x (Lanczos + light sharpen) from the 887px source; replace with a native 2000px+ export when there is one
const SAN_ONOFRE = "/assets/roadtrip/zone5-faq/san-onofre-tall-2x.jpg";

const linkClass =
  "font-bold text-cream underline decoration-2 decoration-cream/45 underline-offset-4 hover:text-action hover:decoration-action";

/** Stop 5. Sponsors sit in the dawn sky; the coast road and domes stay in view; the questions start on the shore and run on into the coastal blue. */
export default function Zone5FAQQuotes({ applyAnswer }: { applyAnswer: string }) {
  return (
    <Scene
      edgeAbove={TONE.projects}
      blendAbove
      tone={TONE.faq}
      tall
      contentBacking="bg-[linear-gradient(180deg,rgb(15_17_20/0.7)_0%,rgb(15_17_20/0.7)_88%,rgb(15_17_20/0.3)_100%)]"
      id="faq"
      aliases={["zone-faq"]}
      labelledBy="faq-title"
      image={SAN_ONOFRE}
      alt="Illustration of the Pacific Coast Highway at San Onofre before dawn: a surf van at a turnout and two domes on the shore"
      position="object-[40%_60%] md:object-[50%_60%]"
      backing="bg-[linear-gradient(180deg,rgb(15_17_20/0.88)_0%,rgb(15_17_20/0.84)_40%,rgb(15_17_20/0.55)_56%,rgb(15_17_20/0)_72%),linear-gradient(0deg,rgb(15_17_20/0.7)_0%,rgb(15_17_20/0.4)_18%,rgb(15_17_20/0)_36%)]"
      overlayClassName="items-start pt-28 md:pt-32"
      overlay={
        <div className="w-full">
          <StopMarker number={5} place="San Onofre" />
          {/* Sponsors ride in the open dawn sky, then the questions start */}
          <Sponsors />
          <div className="mt-20 max-w-[36rem] md:mt-28">
            <StopHeading id="faq-title">Questions</StopHeading>
            <p className="mt-4 text-lg leading-relaxed text-cream">Food, teams, eligibility and how the day runs.</p>
          </div>
        </div>
      }
    >
      {/* No panel: the questions sit on the scene as it fades into the coastal blue */}
      <div className="-mt-12 grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <FaqAccordion groups={buildFaq(applyAnswer)} />
          <p className="mt-10 text-[17px] text-cream/90">
            Something missing? Email{" "}
            <a href={`mailto:${EVENT.contactEmail}`} className={linkClass}>
              {EVENT.contactEmail}
            </a>{" "}
            or ask on{" "}
            <a href={EVENT.social.discord} target="_blank" rel="noopener noreferrer" className={linkClass}>
              Discord
            </a>
            .
          </p>
        </div>

        {/* A past event's itinerary, unboxed like the questions beside it. Clearly not this year's. */}
        <aside aria-labelledby="schedule-title" className="lg:col-span-5">
          <div className="flex items-baseline justify-between gap-4">
            <h3 id="schedule-title" className="text-[13px] font-bold uppercase tracking-[0.16em] text-action">
              Itinerary · a past HackCC
            </h3>
          </div>
          <p className="mt-3 border-l-2 border-action pl-4 text-[15px] leading-relaxed text-cream/90">
            From our archived site. <strong className="text-cream">Not the {EVENT.year} schedule</strong>, which will be
            posted with the date.
          </p>
          <ol className="mt-4 border-t border-cream/20">
            {ARCHIVED_SCHEDULE.map(slot => (
              <li key={slot.time} className="grid grid-cols-[5.5rem_1fr] gap-3 border-b border-cream/20 py-3 text-base">
                <span className="font-bold tabular-nums text-action">{slot.time}</span>
                <span className="text-cream">{slot.item}</span>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </Scene>
  );
}
