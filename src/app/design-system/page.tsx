import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { HighwaySign } from "@/components/roadtrip/HighwaySign";
import { EVENT } from "@/lib/event";

export const metadata: Metadata = {
  title: "Design reference",
  description: "Tokens, type and buttons for HackCC 2026 contributors.",
  robots: { index: false, follow: false },
};

const COLORS = [
  { token: "night", hex: "#0F1114", job: "Page background; text on sunflower." },
  { token: "surface", hex: "#191C20", job: "Solid panels: FAQ, forms, featured project." },
  { token: "cream", hex: "#FFF8EB", job: "Headings and body text on dark." },
  { token: "mist", hex: "#C9CCD0", job: "Secondary text, hints, captions." },
  { token: "action", hex: "#FFD044", job: "Primary buttons, key stats, focus rings. One per view." },
  { token: "action-hover", hex: "#F2BD28", job: "Hover state for action." },
  { token: "line", hex: "rgba(255,248,235,0.16)", job: "Dividers and panel borders." },
  { token: "error", hex: "#FF8A80", job: "Form errors, on surface or error-bg." },
  { token: "paper", hex: "#FAF6EE", job: "Photo prints and postcards." },
];

const RULES: { do: string; dont: string }[] = [
  { do: "Back text with a local gradient where it sits on art.", dont: "A uniform dark overlay over a whole scene." },
  { do: "Put long reading (FAQ, forms) on a solid surface panel.", dont: "Dimmed or translucent text over busy artwork." },
  { do: "Bagel Fat One for the wordmark and section headings.", dont: "Bagel on paragraphs, questions or buttons." },
  { do: "Fraunces italic for one hook line or a quote.", dont: "A serif eyebrow on every section." },
  { do: "One sunflower primary per view; secondary or text link for the rest.", dont: "Two yellow buttons side by side, glows, coloured shadows." },
  { do: "Verified numbers and real hrefs. Say \"to be announced\" when unknown.", dont: "Placeholder links, invented dates, \"journey\" or \"premier\"." },
  { do: "Motion that works without JS and respects reduced motion.", dont: "Scroll-jacking, pinned sections, content hidden until animated." },
];

const code = "rounded bg-cream/10 px-1.5 py-0.5 text-sm";

export default function DesignReferencePage() {
  return (
    <main id="main" className="min-h-screen bg-night text-cream">
      <div className="mx-auto w-full max-w-5xl space-y-20 px-5 py-16 md:px-8">
        <header className="space-y-5">
          <Button href="/" variant="tertiary">
            ← Back to the site
          </Button>
          <p className="font-serif text-xl italic text-action">For contributors</p>
          <h1 className="font-heading text-4xl leading-[1.05] sm:text-6xl">{EVENT.edition} design reference</h1>
          <p className="max-w-2xl text-lg leading-relaxed text-mist">
            The tokens, type and controls the site is built from. Full rules live in{" "}
            <code className={code}>.agents/skills/frontend-guidelines/SKILL.md</code>. If this page and that file
            disagree, the file wins.
          </p>
        </header>

        <section aria-labelledby="ds-colour" className="space-y-6">
          <h2 id="ds-colour" className="font-heading text-2xl sm:text-3xl">
            Colour: one job each
          </h2>
          <ul className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {COLORS.map(color => (
              <li key={color.token} className="flex items-start gap-4">
                <span className="size-12 shrink-0 rounded-full border border-line" style={{ backgroundColor: color.hex }} />
                <div>
                  <p className="font-bold">
                    <code>{color.token}</code> <span className="text-sm font-normal text-mist">{color.hex}</span>
                  </p>
                  <p className="text-sm leading-snug text-mist">{color.job}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-sm text-mist">
            Use them as <code className={code}>bg-surface</code>, <code className={code}>text-mist</code>,{" "}
            <code className={code}>border-line</code>. The purple tokens in <code>globals.css</code> belong to the
            archived /2026 site only.
          </p>
        </section>

        <section aria-labelledby="ds-type" className="space-y-8">
          <h2 id="ds-type" className="font-heading text-2xl sm:text-3xl">
            Type
          </h2>
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-mist">font-heading · Bagel Fat One · wordmark, section headings</p>
            <p className="font-heading text-5xl leading-none sm:text-7xl">Santa Monica</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-mist">font-serif italic · Fraunces · one hook line, quotes</p>
            <p className="font-serif text-2xl italic text-action sm:text-3xl">{EVENT.tagline}</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-mist">font-sans · Montserrat · everything you read</p>
            <p className="max-w-2xl text-lg leading-relaxed">
              Body copy sits at 17–18px with a line length under 65 characters. Secondary text uses mist, never a lower
              opacity of cream.
            </p>
          </div>
        </section>

        <section aria-labelledby="ds-buttons" className="space-y-6">
          <h2 id="ds-buttons" className="font-heading text-2xl sm:text-3xl">
            Buttons and signs
          </h2>
          <div className="flex flex-wrap items-center gap-6">
            <Button href="/organizers" arrow>
              Primary action
            </Button>
            <Button href="/organizers" variant="secondary">
              Secondary
            </Button>
            <Button href="/organizers" variant="tertiary">
              Text link
            </Button>
            <HighwaySign>Next exit · Costa Mesa</HighwaySign>
          </div>
          <pre className="overflow-x-auto rounded-xl border border-line bg-surface p-4 text-sm text-mist">
{`import { Button } from "@/components/ui/Button";
import { HighwaySign } from "@/components/roadtrip/HighwaySign";

<Button href="/apply" arrow>Apply now</Button>
<Button href="/organizers" variant="secondary">Meet the team</Button>
<Button href="/apply/organizer" variant="tertiary">Join the organizing team</Button>
<HighwaySign>Mile 3 | Santa Monica</HighwaySign>`}
          </pre>
        </section>

        <section aria-labelledby="ds-rules" className="space-y-6">
          <h2 id="ds-rules" className="font-heading text-2xl sm:text-3xl">
            Do / don&apos;t
          </h2>
          <ul className="divide-y divide-line">
            {RULES.map(rule => (
              <li key={rule.do} className="grid grid-cols-1 gap-2 py-4 text-sm leading-relaxed sm:grid-cols-2 sm:gap-8">
                <p>
                  <span className="font-bold text-action">Do </span>
                  {rule.do}
                </p>
                <p className="text-mist">
                  <span className="font-bold text-cream">Don&apos;t </span>
                  {rule.dont}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
