import { EVENT } from "@/lib/event";
import { Scene, StopHeading, StopMarker } from "./Scene";
import { SEAM } from "./tones";

// The moon was patched out of this copy: it showed through the crossfade under the hero
const INGLEWOOD = "/assets/roadtrip/zone2-details/inglewood-nomoon.jpg";

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${EVENT.venue.name}, ${EVENT.venue.address}`
)}`;

/** Stop 2. The stadium holds the right of the frame; the facts sit on the dark hillside to its left. */
export default function Zone2EventInfo() {
  return (
    <Scene
      edgeAbove={SEAM.heroToDetails}
      blendAbove
      blendBelow
      edgeBelow={SEAM.detailsToAbout}
      id="details"
      aliases={["zone-details"]}
      labelledBy="details-title"
      image={INGLEWOOD}
      alt="Illustration of Inglewood at dusk: the stadium canopy lit up, palm trees and the Los Angeles skyline"
      position="object-[74%_50%] md:object-[60%_55%]"
      backing="bg-[linear-gradient(90deg,rgb(15_17_20/0.94)_0%,rgb(15_17_20/0.86)_44%,rgb(15_17_20/0.5)_60%,rgb(15_17_20/0)_80%)] max-md:bg-[linear-gradient(180deg,rgb(15_17_20/0.62)_0%,rgb(15_17_20/0.58)_35%,rgb(15_17_20/0.82)_65%,rgb(15_17_20/0.94)_100%)]"
      overlayClassName="items-end"
      overlay={
        <div className="w-full max-w-[38rem]">
          <StopMarker number={2} place="Inglewood" />
          <StopHeading id="details-title">The essentials</StopHeading>

          <dl className="mt-7 grid gap-x-8 gap-y-5 [text-shadow:0_1px_10px_rgb(0_0_0/0.8)] sm:grid-cols-2">
            <div>
              <dt className="text-[13px] font-bold uppercase tracking-[0.14em] text-action">When</dt>
              <dd className="mt-1 text-lg font-bold text-cream">{EVENT.dateLabel}</dd>
              <dd className="text-[15px] text-cream/90">{EVENT.dateStatus}. One day, not overnight.</dd>
            </div>
            <div>
              <dt className="text-[13px] font-bold uppercase tracking-[0.14em] text-action">Where</dt>
              <dd className="mt-1 text-lg font-bold text-cream">{EVENT.venue.name}</dd>
              <dd className="text-[15px] text-cream/90">
                {EVENT.venue.address}.{" "}
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-cream underline decoration-2 decoration-cream/45 underline-offset-4 hover:text-action hover:decoration-action"
                >
                  Directions
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[13px] font-bold uppercase tracking-[0.14em] text-action">Who can apply</dt>
              <dd className="mt-1 text-lg font-bold text-cream">{EVENT.eligibility}</dd>
              <dd className="text-[15px] text-cream/90">Any major, any experience level.</dd>
            </div>
            <div>
              <dt className="text-[13px] font-bold uppercase tracking-[0.14em] text-action">Cost</dt>
              <dd className="mt-1 text-lg font-bold text-cream">Free</dd>
              <dd className="text-[15px] text-cream/90">Breakfast, lunch, dinner and snacks provided.</dd>
            </div>
          </dl>

          {/* Unboxed: a sunflower rule down the side marks it as a note */}
          <div className="mt-8 max-w-[34rem] border-l-2 border-action pl-5">
            <p className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-cream">Still being planned</p>
            <p className="mt-1 text-[15px] leading-relaxed text-cream/90">
              The date, start and end times, application deadlines, and parking and transit details. We&apos;ll post them
              here and on Discord.
            </p>
          </div>
        </div>
      }
    />
  );
}
