import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { EVENT } from "@/lib/event";

export const metadata: Metadata = {
  title: "Design reference",
  description: "Tokens, type and buttons for HackCC 2026 contributors.",
  robots: { index: false, follow: false },
};

const COLORS = [
  { token: "action", hex: "#FBBF24", job: "Buttons, key stats, the one accent on a scene. Nothing else." },
  { token: "action-hover", hex: "#FCD34D", job: "Hover state for action." },
  { token: "sign", hex: "#006B3F", job: "Wayfinding only: route markers, section labels. Caltrans green." },
  { token: "pacific", hex: "#38BDF8", job: "Links and water." },
  { token: "night", hex: "#0B0F19", job: "Page and section backgrounds; text on amber." },
  { token: "night-deep", hex: "#020617", job: "Footer, deepest shadows." },
  { token: "mist", hex: "#E2E8F0", job: "Body copy on dark scenes." },
  { token: "paper", hex: "#FAF6EE", job: "Postcards, receipts, anything printed." },
  { token: "ink", hex: "#1C1917", job: "Text on paper." },
];

const RULES: { do: string; dont: string }[] = [
  { do: "Set type directly on the scene; group with spacing and size.", dont: "Cards, glass panels or boxes around text." },
  { do: "Keep scenery bright; fade only at the seams between stops.", dont: "Dark overlays (bg-slate-950/40 and the like)." },
  { do: "Bagel Fat One for the wordmark, giant dates and stop names.", dont: "Bagel on paragraphs, FAQ questions or buttons." },
  { do: "Fraunces italic for one hook line, postcards and quotes.", dont: "A serif eyebrow on every section." },
  { do: "One amber primary button per view; underlined link for the second choice.", dont: "Yellow #FBFA74, neon glows, coloured drop shadows." },
  { do: "A single highway sign as an accent in the sponsors stop.", dont: "Signs, badges or route numbers on every button." },
  { do: "Real numbers, exact times, real hrefs.", dont: "Placeholder links, 'unforgettable journey', count-up stats." },
  { do: "One scroll set piece per stop; honour prefers-reduced-motion.", dont: "Fade-up on everything, pulsing glows, several loops at once." },
];

export default function DesignReferencePage() {
  return (
    <main className="min-h-screen bg-night text-mist">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        <header className="space-y-5">
          <Link href="/" className="text-sm font-semibold text-mist/70 hover:text-action transition-colors">
            ← Back to the site
          </Link>
          <p className="font-serif italic text-action/90 text-xl">For contributors</p>
          <h1 className="font-heading text-4xl sm:text-6xl text-white leading-[1.05]">{EVENT.edition} design reference</h1>
          <p className="text-lg max-w-2xl leading-relaxed text-mist/85">
            The tokens, type and controls the site is built from. Full rules live in{" "}
            <code className="text-sm bg-white/10 px-1.5 py-0.5 rounded">.agents/skills/frontend-guidelines/SKILL.md</code>.
            If something here disagrees with that file, the file wins; tell us so we can fix this page.
          </p>
        </header>

        {/* Colour */}
        <section className="space-y-6">
          <h2 className="font-heading text-2xl sm:text-3xl text-white">Colour: one job each</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {COLORS.map(color => (
              <li key={color.token} className="flex items-start gap-4">
                <span className="w-12 h-12 rounded-full shrink-0 border border-white/15" style={{ backgroundColor: color.hex }} />
                <div>
                  <p className="font-bold text-white">
                    <code>{color.token}</code> <span className="text-mist/60 font-normal text-sm">{color.hex}</span>
                  </p>
                  <p className="text-sm text-mist/80 leading-snug">{color.job}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-sm text-mist/70">
            Use them as <code className="bg-white/10 px-1 rounded">bg-action</code>, <code className="bg-white/10 px-1 rounded">text-mist</code>,{" "}
            <code className="bg-white/10 px-1 rounded">border-sign</code>. The purple tokens still in <code>globals.css</code> belong to the
            archived /2026 site only.
          </p>
        </section>

        {/* Type */}
        <section className="space-y-8">
          <h2 className="font-heading text-2xl sm:text-3xl text-white">Type</h2>
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-mist/60">font-heading · Bagel Fat One · wordmark, dates, stop names</p>
            <p className="font-heading text-5xl sm:text-7xl text-white leading-none">SANTA MONICA</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-mist/60">font-serif italic · Fraunces · one hook line, postcards, quotes</p>
            <p className="font-serif italic text-2xl sm:text-3xl text-action/90">Your road trip starts here</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-mist/60">font-sans · Montserrat · everything you read</p>
            <p className="text-lg leading-relaxed max-w-2xl">
              Hacking all night is fun, but you can also get some rest. Bring your laptop, charger, student ID and a
              hoodie; the building gets cold around 2 a.m. We cover breakfast, lunch, dinner and the midnight snack run.
            </p>
          </div>
        </section>

        {/* Buttons */}
        <section className="space-y-6">
          <h2 className="font-heading text-2xl sm:text-3xl text-white">Buttons</h2>
          <div className="flex flex-wrap items-center gap-6">
            <Button href="/organizers">
              <span>Primary action</span>
              <span aria-hidden>→</span>
            </Button>
            <Button href="/organizers" variant="secondary">
              Secondary link
            </Button>
            <Button href="/organizers" variant="outline">
              Outline, for photography
            </Button>
          </div>
          <pre className="text-sm bg-white/5 border border-white/10 rounded-xl p-4 overflow-x-auto text-mist/90">
{`import { Button } from "@/components/ui/Button";

<Button href="/apply">Apply by Oct 31 <span aria-hidden>→</span></Button>
<Button href="/organizers" variant="secondary">Meet the team</Button>`}
          </pre>
        </section>

        {/* Rules */}
        <section className="space-y-6">
          <h2 className="font-heading text-2xl sm:text-3xl text-white">Do / don&apos;t</h2>
          <ul className="divide-y divide-white/10">
            {RULES.map(rule => (
              <li key={rule.do} className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-8 py-4 text-sm leading-relaxed">
                <p>
                  <span className="font-bold text-action">Do </span>
                  {rule.do}
                </p>
                <p className="text-mist/70">
                  <span className="font-bold text-white">Don&apos;t </span>
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
