---
name: frontend-guidelines
description: Enforces a world-class, human-crafted California Road Trip aesthetic inspired by Cal Hacks and HackMIT. Eliminates generic 'vibecoded' UI templates, mandates unboxed scenic typography, authentic road-trip artifacts, and strict route discipline.
---

# HackCC 2026 Frontend Design System & Vibe Guidelines

When building or updating frontend components in this repository, strictly adhere to these guidelines to ensure the website maintains an authentic, human-crafted, cinematic California Road Trip experience inspired by premier hackathons like **Cal Hacks** and **HackMIT**.

---

## 1. The Anti-Vibecoded Design Philosophy (Cal Hacks & HackMIT Lessons)

Websites look "vibecoded" (AI-generated or template-like) when generic dark-glass cards with glowing borders and random pill tags are pasted over photos. HackCC avoids this through 4 core principles:

1. **Zero Boxes Around Text (Text Must Breathe)**:
   - **Never wrap headings, body text, stats, or descriptions in boxes, cards, or glass panels.**
   - Putting boxes around text makes the site look generic, boxed-in, and "vibecoded".
   - Let typography breathe directly inside the scenic California landscape. High contrast is achieved through bold vector weights and natural negative space—never through artificial containers.

2. **Highway Signs & Billboards: STRICTLY for Zone 4 (Sponsors) — Subtle Accent, Not the Main Attraction**:
   - 🛣️ **Overhead Freeway Signs & Roadside Billboards must ONLY be used in Zone 4 (Sponsors)**.
   - **Subtle Character Accent Only**: The road sign must **never** be the dominant, full-screen centerpiece of the scene. It is strictly a tasteful, modest roadside marker (e.g. a small wayside sign or compact overhead highway marker) meant to inject authentic California road-trip personality without overpowering the sponsor logos or scenery.
   - **Every other zone (Heroes, About, Tracks, Schedule, FAQ, CTA) must remain 100% unboxed.** Do NOT put signs, cards, or boxes around text in zones 1, 2, 3, 5, or 6.

3. **Monumental, Borderless Key Numbers**:
   - Core hackathon stats (**14 HRS**, **250+ HACKERS**, **$10,000+ PRIZES**) are primary selling points and must **never** be locked into a small 3-box widget or generic table.
   - Render them as **monumental, proud typographic figures** (`text-5xl` to `text-8xl font-black`) floating freely in the scenery, separated only by delicate hairline rules (`border-l border-white/20`).

4. **Luminous California Scenery: Keep Backgrounds Close to Normal (No Heavy Dimming)**:
   - **Do NOT blanket backgrounds in heavy darkening scrims** across any zone (avoid `bg-slate-950/40`, `50%+` dark overlays, or artificial dark washes).
   - Backgrounds must remain **close to normal, vibrant, and clearly visible** so attendees can actually appreciate the scenic California photography (Hollywood hills, Inglewood twilight, Santa Monica pier, PCH coastal roads, San Diego beaches).
   - Zone 1 (Hollywood Hills) remains 100% pure daytime visual majesty without text or scrims.
   - Edge transitions between zones should use soft, localized fading only at section seams (e.g. top/bottom vignette) solely to blend adjacent scenes smoothly into one another—never dim the core scenic landscape.
   - Contrast is achieved through bold, crisp vector typography (`Bagel Fat One`, `font-black text-white`, `text-amber-400`), not by turning sunny skies or cityscapes murky.

---

## 2. Typography & Typographic Rhythm
HackCC pairs the unique, playful personality of `Bagel Fat One` with clean modern sans-serif:

| Role | Typeface / Style | Tailwind Classes | Example Usage & Rules |
| :--- | :--- | :--- | :--- |
| **Display (wordmark, giant dates, stop names ONLY)** | `Bagel Fat One` | `font-heading text-white leading-[1.05]` | Flat and crisp, **zero** cartoon drop shadows or colored borders. Never on paragraphs, FAQ questions or buttons. |
| **Hook line (one per view)** | `Fraunces` italic | `font-serif italic text-action/90` | *"Your road trip starts here"*. Also for postcards and pull quotes. Not an eyebrow on every section. |
| **Body & Descriptions** | `Montserrat` | `font-sans text-mist text-base sm:text-lg leading-relaxed` | Everything you read. High contrast against dark scenic artwork. |
| **Key Stats Numbers** | `Bagel Fat One` | `font-heading text-5xl sm:text-7xl text-action` | `14 HRS`, `250+`, `$10K+`. Bold, proud, borderless. Real numbers only, the same everywhere. |
| **Interactive Buttons** | `Montserrat` bold | `<Button>` from `@/components/ui/Button` | Solid amber pill (`primary`), underlined link (`secondary`), translucent pill on photos (`outline`). |

Fonts are loaded once in `src/app/layout.tsx` and exposed as the Tailwind tokens `--font-heading`, `--font-sans`, `--font-serif` (see `src/app/globals.css`). Do not add fonts elsewhere.

---

## 3. Scenic Road Trip Color Palette

Draw directly from natural California golden hour, coastal twilight, and open-road scenery rather than synthetic neon. Every colour has **one job**; use the token, not a hue (tokens live in `src/app/globals.css`, examples at `/design-system`):

- **`action` / `action-hover`** (`#FBBF24` / `#FCD34D`, golden-hour amber): the primary button, key stat numbers, the one accent on a scene. Nothing else.
- **`sign` / `sign-deep`** (`#006B3F` / `#00522F`, real Caltrans green): wayfinding only (route markers, mile markers, section labels). Never a decorative badge on buttons or nav.
- **`pacific` / `pacific-soft`** (`#38BDF8` / `#BAE6FD`): links and water.
- **`night` / `night-deep`** (`#0B0F19` / `#020617`): page and section backgrounds, text on amber.
- **`mist`** (`#E2E8F0`): body copy on dark scenes. **White** for titles and stat numbers.
- **`paper` / `ink`** (`#FAF6EE` / `#1C1917`): postcards, receipts, anything that looks printed.
- The purple/yellow tokens still in `globals.css` under "LEGACY" belong to the archived `/2026` site only.

> [!CAUTION]
> **Strictly Banned Colors & "Vibecoded" Styles:**
> - ❌ **No colored neon glow halos** (`drop-shadow-[..._rgba(colored)]` or `box-shadow: colored glow aura`). Typography and stats must be flat, crisp, solid vector text with natural contrast or subtle black ambient occlusion only.
> - ❌ No electric highlighter lemon yellow (`#FBFA74`). Use warm golden sunset amber (`#FBBF24`).
> - ❌ No comic-book colored drop shadows (`text-shadow: 0 4px 0 #2D18A8`).
> - ❌ No floating rectangular dark-glass boxes in open scenic heroes.

---

## 4. Interactive Controls & Buttons

- **Primary Action (High Impact)**:
  - Solid Warm Sunset Amber button: `bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-8 py-4 rounded-full shadow-lg shadow-black/30 transition-all transform hover:scale-105`.
  - Always pair with an energetic arrow: `<span>Hit the Road (Apply)</span> <span className="text-xl">→</span>`.
- **Secondary Action (Subtle & Open)**:
  - Clean underlined editorial link: `text-white hover:text-amber-300 font-bold underline underline-offset-8 decoration-white/30 hover:decoration-amber-400 transition-colors`.
  - Keeps the interface uncluttered and lets the primary button shine.

---

## 5. STRICT RULE: Explicit Href / Route Discipline for Buttons & Links

> [!IMPORTANT]
> **No Dummy Placeholder Links (`#`, `#example`, `www.website.com/#example`)**
> Whenever you add or edit a `<Button>`, `<Link>`, or `<a>` element:
> 1. Ask the user or verify the exact destination route (e.g. `href="/2026"`, `href="/organizers"`, `href="https://discord.gg/..."`, `href="#zone-details"`).
> 2. NEVER output generic placeholder hrefs like `href="#"` or `href="www.website.com/#example"`.
> 3. If the destination route is unknown, ask for clarification before generating code.

---

## 6. Asset & Image Management (Top-Level Imports Only)

- **Storage Location**: Place image assets in `public/images/` or `public/assets/roadtrip/`.
- **STRICT IMPORT RULE**: All image assets and graphics MUST be imported at the very top of the file before component definitions (e.g. `import hackccIcon from "../../../public/images/hackcc-icon.png"`, or a `const SCENE = "/assets/roadtrip/..."` string at module level). Note `@/*` maps to `src/*`, so `@/public/...` does **not** resolve. DO NOT inline `require()` calls or import images inside function bodies / render returns.
- **Event facts** (name, date, venue, contact, socials) come from `src/lib/event.ts`. Never hard-code them in a page.
- **Path Resolution**: Reference static images from `public/` using clean root-relative paths like `/images/filename.svg` or `/assets/roadtrip/...`.

---

## 7. Fluid Layouts, Flexbox/Grid Discipline & Zero Hardcoded Positions

To ensure that the layout stays visually consistent, proportional, and robust across all screen types (phones, tablets, laptops, and ultrawide displays), follow these strict layout rules:

### A. Strictly Banned Positioning Patterns
- ❌ **NO Hardcoded Pixel Coordinates**: NEVER use `top-[320px]`, `left-[480px]`, or manual pixel offsets to place elements on the page. On ultrawide displays or mobile devices, hardcoded coordinates drift completely off target or clip out of view.
- ❌ **NO Fixed-Width Content Wrappers**: NEVER write `w-[700px]` or `w-[900px]` on content containers. It causes severe horizontal scroll blowouts on mobile screens.
- ❌ **NO Margin-Left/Top Layout Hacking**: NEVER push elements into place using `ml-[160px]` or `mt-[120px]`. Always use semantic flow, Flexbox alignment, and Grid gaps.

### B. Mandated Fluid Flow Architecture (Flexbox & CSS Grid)
1. **Centering & Bounded Max-Width Shell**:
   - Every section must wrap its content in a centered container with responsive padding:
     ```tsx
     <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
     ```
2. **CSS Grid for Multi-Column Data & Stats**:
   - Always structure multi-item rows with CSS Grid that adapts from 1 column on mobile to 2 or 3 columns on desktop:
     ```tsx
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
     ```
3. **Flexbox for Flow, Navbars, and Button Groups**:
   - Use Flexbox with gap tokens for natural wrapping:
     ```tsx
     <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
     ```
4. **The "Relative Anchor" Rule for Pinned Accents**:
   - If an element requires absolute positioning (e.g. an exit tab on a Zone 4 sponsor sign, or a decorative route shield pin), it **must be anchored inside a direct `relative` parent container**, never floating freely across the full viewport canvas:
     ```tsx
     {/* Correct: Anchored directly to parent */}
     <div className="relative">
       <div className="sign-content">...</div>
       <span className="absolute -top-3.5 right-6">EXIT 2026</span>
     </div>
     ```
5. **Scenic Hero Centering Pattern**:
   - When centering monumental typography over scenic backgrounds, use inset flex centering:
     ```tsx
     <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-8">
       <div className="w-full max-w-4xl text-center">...</div>
     </div>
     ```

---

## 8. Preview & Testing

- Access `/compare` on `http://localhost:3000/compare` to preview the Cal Hacks-inspired open layout across all scenic California backgrounds.
- Access `/design-system` on `http://localhost:3000/design-system` to inspect design tokens and reusable components.
