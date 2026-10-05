---
name: frontend-guidelines
description: The HackCC 2026 road-trip design system. Tokens, type, buttons, scene art direction, copy and accessibility rules for any frontend change in this repo.
---

# HackCC 2026 frontend guidelines

The site is a night drive down the Southern California coast: six illustrated plates (Hollywood Hills → Inglewood → Santa Monica → Orange County → San Onofre → San Diego), a dark atmosphere, Bagel Fat One headings and painted-on road labels, with real photos, testimonials and projects from past events. Polish that direction; don't replace it. It is not a cream editorial site and not a startup landing page.

Examples of everything below live at `/design-system` (`src/app/design-system/page.tsx`).

## 1. Tokens (`src/app/globals.css`)

Use the token, never a raw hue. Each colour has one job.

| Token | Value | Job |
| :--- | :--- | :--- |
| `night` / `night-deep` | `#0F1114` / `#0A0B0D` | Page background; text on sunflower |
| `surface` / `surface-raised` | `#191C20` / `#23272C` | Solid panels: FAQ, forms, featured project; hover rows |
| `cream` | `#FFF8EB` | Headings and body text on dark |
| `mist` | `#C9CCD0` | Secondary text, hints, captions |
| `action` / `action-hover` | `#FFD044` / `#F2BD28` | Primary buttons, key stats, focus ring |
| `line` / `line-strong` | `rgb(255 248 235 / .16)` / `#82878E` | Dividers, panel borders / input borders |
| `error`, `error-bg`, `success`, `success-bg` | | Form states |
| `paper` / `ink` | `#FAF6EE` / `#1C1917` | Photo prints, postcards |

Measured contrast: cream on night 17.7:1, mist on surface 9.7:1, night on action 12.8:1. Secondary text is `text-mist`, not a lower opacity of cream. The purple tokens marked LEGACY belong to the archived `/2026` site only.

## 2. Type

| Role | Face | Use |
| :--- | :--- | :--- |
| `font-heading` | Bagel Fat One | Wordmark, section headings (`StopHeading`), big stats. Never paragraphs, questions or buttons. |
| `font-serif italic` | Fraunces | One hook line per view, quotes. Not an eyebrow on every section. |
| `font-sans` | Montserrat | Everything you read. Body 17–18px, under ~65 characters per line. |

Fonts load once in `src/app/layout.tsx`.

## 3. Components

- `<Button>` (`@/components/ui/Button`): `primary` (sunflower pill, one per view), `secondary` (dark pill with cream border), `tertiary` (underlined text link). Props: `href` or `onClick`, `arrow`, `loading`, `size`. All targets are at least 44px.
- `<HighwaySign>` (`@/components/roadtrip/HighwaySign`): unboxed uppercase cream label led by a short sunflower rule, like a mile marker. Wayfinding labels only. Not a badge on every button.
- No glass, tinted or bordered boxes on the art: text sits straight on the scene with a local backing and text shadow. Notes use a sunflower rule down the left side. Only forms keep a solid `surface` panel.
- `<Scene>`, `<StopMarker>`, `<StopHeading>` (`@/components/roadtrip/Scene`): one illustrated plate per stop, with `position` (per-breakpoint object-position for the focal point), `backing` (a local gradient behind the text) and `children` that render on solid night below the plate.
- `<SiteHeader>` / `<SiteFooter>`: used on every page. Pass the application status from `getPublicApplicationStatus()`.

## 4. Scene art direction

- Text that sits on art gets a **local** gradient behind it (`backing`), placed where the text is. Never a uniform dark overlay over a whole plate.
- Long reading (FAQ, forms, featured project) goes on a solid `surface` panel. Never dim or blur text over busy art.
- Vary layouts between stops (left, right, bottom, top, centered). Set a separate mobile focal point with `object-[x_y] md:object-[x_y]`.
- Plates use `quality={SCENE_QUALITY}` and `sizes={SCENE_SIZES}` so they stay sharp; don't stretch a plate taller than about one screen.
- Joins between scenes: short smootherstep edge fades (`.edge-fade-top` / `.edge-fade-bottom`, 48–96px, opaque only at the seam) in colours sampled from the artwork either side. They live in `src/components/roadtrip/tones.ts` (`SEAM` for image-to-image joins, `TONE` for the deep coastal blue under each scene's content). Never stack wide fades into a black band.
- Text backings are separate from edge fades and ease out near a scene's edges (`.backing-from-edge`), so they never draw their own line at a seam.
- Testimonials sit straight on the scene tone (yellow quote mark, cream text, hairline dividers). No cream cards.

## 5. Copy and facts

- Event facts come from `src/lib/event.ts`; past-event facts, projects, testimonials and sponsors from `src/lib/content.ts`. Don't hard-code them in a page, and never invent them. If something isn't decided, say "to be announced".
- Application state comes from `src/lib/applicationStatus.ts`. Every Apply button, the FAQ answer and the footer read from it, so they can't disagree.
- HackCC takes **applications** (reviewed, decisions emailed). Say "apply" and "application", not "register".
- Plain, specific language. No "journey", "premier", "massive impact", "unforgettable".

## 6. Links

Every `href` is a real destination (`/organizers`, `/#faq`, `mailto:team@hackcc.net`, `https://...`). Never `#` or a placeholder. If the destination is unknown, ask.

## 7. Assets

Static assets live in `public/images/` and `public/assets/roadtrip/`. Import images at the top of the file (or declare a module-level path constant). `@/*` maps to `src/*`, so `@/public/...` doesn't resolve.

## 8. Motion

- No scroll-jacking, pinned sections or scroll-driven text.
- Content must be visible without JavaScript and if an animation fails. The CSS `.rise-in` class is the entrance pattern.
- Honour `prefers-reduced-motion`.

## 9. Accessibility

- Every page has the skip link (in the layout), one `h1`, and `<main id="main">`.
- Visible focus (the global `:focus-visible` ring). Don't remove outlines without a replacement.
- Forms: visible labels, hints and errors tied with `aria-describedby`, focus moves to the first invalid field, errors in words (not colour alone).
- Check layouts at 375, 768, 1024 and 1440 px with no horizontal scroll.

## 10. Verify

`npx tsc --noEmit`, `npm run lint`, `npm test`, `npm run build`. Never send a real application while testing: run the dev server with `REGISTRATION_DRY_RUN=ok` (or `fail`) to exercise the form.
