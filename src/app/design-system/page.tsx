import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata = {
  title: "HackCC Design System & Beginner Showcase",
  description: "Style guide, color palette, buttons, cards, typography, and code snippets for HackCC contributors.",
};

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-[#2D18A8] text-white font-body p-6 md:p-12 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#A649E2]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FBFA74]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-12">
        {/* Header Header */}
        <header className="space-y-4 text-center md:text-left border-b border-white/20 pb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Badge variant="vibrant">Developer Reference</Badge>
              <h1 className="text-4xl md:text-5xl cartoony-title mt-2">
                HackCC 2026 Design System & Vibe Guide
              </h1>
              <p className="text-white/80 text-lg max-w-2xl mt-2">
                Welcome to the HackCC frontend style guide! Use these pre-built components and CSS utilities to ensure all features share the exact same SoCal Road Trip vibe.
              </p>
            </div>
            <Link href="/" className="btn-secondary">
              ← Back to Main Site
            </Link>
          </div>
        </header>

        {/* Section 1: Color Palette */}
        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-heading text-[#FBFA74]">
            1. Color Palette Tokens
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <ColorSwatch name="Royal Purple" hex="#2D18A8" variable="--color-royalpurple" />
            <ColorSwatch name="Vibrant Yellow" hex="#FBFA74" variable="--color-vibrantyellow" textColor="#021442" />
            <ColorSwatch name="Warm Pink" hex="#A649E2" variable="--color-warmpink" />
            <ColorSwatch name="Light Purple" hex="#6950D5" variable="--color-lightpurple" />
            <ColorSwatch name="Navy Blue" hex="#021442" variable="--color-navyblue" />
            <ColorSwatch name="Dull Purple" hex="#7F3ED0" variable="--color-dullpurple" />
          </div>
        </section>

        {/* Section 2: Typography */}
        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-heading text-[#FBFA74]">
            2. Typography & Text Styles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="glass" hoverEffect={false}>
              <Badge variant="glass" className="mb-4">Heading Font: Bagel Fat One</Badge>
              <p className="cartoony-title text-3xl mb-2">Cartoony Title (.cartoony-title)</p>
              <p className="font-heading text-xl text-[#FBFA74]">Section Subtitle (.font-heading)</p>
              <code className="block mt-4 bg-black/40 p-3 rounded text-xs text-yellow-200">
                className="cartoony-title text-3xl"
              </code>
            </Card>
            <Card variant="glass" hoverEffect={false}>
              <Badge variant="glass" className="mb-4">Body Font: Montserrat Alternates</Badge>
              <p className="font-body text-base text-white/90 mb-2">
                Standard body paragraph text. Legible, clean, friendly, and matches our cartoony theme seamlessly across all screen sizes.
              </p>
              <p className="font-body font-semibold text-sm text-white/70">
                Subtext / Helper text (.font-body font-semibold)
              </p>
              <code className="block mt-4 bg-black/40 p-3 rounded text-xs text-yellow-200">
                className="font-body text-base text-white/90"
              </code>
            </Card>
          </div>
        </section>

        {/* Section 3: Reusable Buttons */}
        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-heading text-[#FBFA74]">
            3. Buttons & Interactive Links
          </h2>
          <p className="text-white/80">
            Always use real destination paths (e.g. <code className="bg-black/40 px-2 py-0.5 rounded">href="/2026"</code> or <code className="bg-black/40 px-2 py-0.5 rounded">href="https://discord.gg/..."</code>). Avoid placeholder <code className="bg-black/40 px-2 py-0.5 rounded">#</code> links!
          </p>

          <div className="flex flex-wrap items-center gap-6 p-6 bg-white/5 rounded-2xl border border-white/10">
            <Button variant="primary" href="/">
              Primary Button
            </Button>
            <Button variant="secondary" href="/2026">
              Secondary Button
            </Button>
            <Button variant="accent" href="/">
              Accent Button
            </Button>
            <Button variant="glass" href="/2026">
              Glass Button
            </Button>
          </div>

          <Card variant="glass" hoverEffect={false} className="space-y-2">
            <p className="font-semibold text-sm text-[#FBFA74]">Code Snippet:</p>
            <pre className="bg-black/50 p-4 rounded-lg text-sm text-green-300 overflow-x-auto">
{`import { Button } from "@/components/ui/Button";

// Primary Call To Action
<Button variant="primary" href="/apply">Register Now</Button>

// Secondary Navigation
<Button variant="secondary" href="/2026">View 2026 Archive</Button>`}
            </pre>
          </Card>
        </section>

        {/* Section 4: Card Variants */}
        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-heading text-[#FBFA74]">
            4. Container & Card Styles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="roadtrip">
              <Badge variant="vibrant">Roadtrip Card</Badge>
              <h3 className="font-heading text-xl mt-3 text-white">Default Zone Card</h3>
              <p className="text-white/80 text-sm mt-2">
                Features purple glass background with yellow accent borders and floating hover physics.
              </p>
            </Card>

            <Card variant="glass">
              <Badge variant="glass">Glass Panel</Badge>
              <h3 className="font-heading text-xl mt-3 text-white">Glass Container</h3>
              <p className="text-white/80 text-sm mt-2">
                Clean translucent glass panel for secondary sections and information blocks.
              </p>
            </Card>

            <Card variant="sunset">
              <Badge variant="vibrant">Sunset Gradient</Badge>
              <h3 className="font-heading text-xl mt-3 text-white">Sunset Card</h3>
              <p className="text-white/80 text-sm mt-2">
                Vibrant pink-purple gradient background perfect for high-impact CTA cards and highlights.
              </p>
            </Card>
          </div>
        </section>

        {/* Section 5: Badges & Tags */}
        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-heading text-[#FBFA74]">
            5. Badges & Tags
          </h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Badge variant="vibrant">Vibrant Badge</Badge>
            <Badge variant="vibrant">October 24-26, 2026</Badge>
            <Badge variant="glass">Glass Badge</Badge>
            <Badge variant="glass">Zone 1: LA Hills</Badge>
          </div>
        </section>
      </div>
    </div>
  );
}

function ColorSwatch({
  name,
  hex,
  variable,
  textColor = "#ffffff",
}: {
  name: string;
  hex: string;
  variable: string;
  textColor?: string;
}) {
  return (
    <div className="space-y-2 text-center">
      <div
        className="w-full h-20 rounded-xl border border-white/20 shadow-lg flex items-center justify-center font-bold text-sm"
        style={{ backgroundColor: hex, color: textColor }}
      >
        {hex}
      </div>
      <div>
        <p className="font-semibold text-sm">{name}</p>
        <p className="text-xs text-white/60 font-mono">{variable}</p>
      </div>
    </div>
  );
}
