import { EVENT } from "@/lib/event";
import { LAST_EVENT, PAST_SPONSORS } from "@/lib/content";
import { Button } from "@/components/ui/Button";

const sponsorMail = `mailto:${EVENT.contactEmail}?subject=${encodeURIComponent(`Sponsoring ${EVENT.edition}`)}`;

/**
 * Sponsors, set in the open dawn sky at the top of the San Onofre scene. Its own section and
 * anchor (#sponsors) so the nav link lands on the heading. No boxes: type straight on the art.
 */
export function Sponsors() {
  return (
    <section
      id="sponsors"
      aria-labelledby="sponsors-title"
      className="relative grid scroll-mt-24 gap-10 [text-shadow:0_1px_3px_rgb(0_0_0/0.9),0_2px_14px_rgb(0_0_0/0.8)] lg:grid-cols-12"
    >
      <span id="zone-sponsors" aria-hidden className="absolute -top-24" />
      <div className="lg:col-span-6">
        <h2 id="sponsors-title" className="font-heading text-[clamp(2.25rem,5vw,3.5rem)] leading-none text-cream">
          Sponsors
        </h2>
        <h3 className="mt-7 text-[13px] font-bold uppercase tracking-[0.14em] text-action">{EVENT.year} sponsors</h3>
        <p className="mt-2 text-lg text-cream">None announced yet.</p>
        <h3 className="mt-7 text-[13px] font-bold uppercase tracking-[0.14em] text-action">Past sponsors · {LAST_EVENT.name}</h3>
        <ul className="mt-2 flex flex-col gap-1 text-2xl font-bold text-cream sm:flex-row sm:items-center sm:gap-5">
          {PAST_SPONSORS.map((name, i) => (
            <li key={name} className="flex items-center gap-5">
              {i > 0 && <span aria-hidden className="hidden h-6 w-px bg-cream/40 sm:block" />}
              {name}
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-6 lg:flex lg:justify-end">
        <div className="w-full max-w-md border-l-2 border-action/70 pl-6">
          <p className="text-[13px] font-bold uppercase tracking-[0.16em] text-action">Exit {EVENT.year} · Sponsorship</p>
          <h3 className="mt-2 font-heading text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight text-cream">Sponsor HackCC</h3>
          <p className="mt-3 text-base leading-relaxed text-cream">
            Sponsorship pays for prizes, food and the venue at a free event. Email us and we&apos;ll send the details.
          </p>
          <Button href={sponsorMail} className="mt-5 [text-shadow:none]" arrow>
            Email {EVENT.contactEmail}
          </Button>
        </div>
      </div>
    </section>
  );
}
