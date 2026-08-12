---
name: frontend-guidelines
description: Ensures consistent SoCal Road Trip vibe, color tokens, typography, and button route discipline across all components in HackCC 2026.
---

# HackCC 2026 Frontend Design System & Vibe Guidelines

When building or updating frontend components in this repository, strictly adhere to the following rules so the entire website maintains a cohesive, cartoony, high-energy SoCal Road Trip vibe.

## 1. Typography Discipline

- **Headings & Titles**: Use `Bagel Fat One` (`var(--font-bagel)` or CSS classes `.font-heading`, `.cartoony-title`).
- **Body & Subtext**: Use `Montserrat Alternates` (`var(--font-mont)` or CSS class `.font-body`).
- **Cartoony Title Effect**: Use `.cartoony-title` for hero titles and major section headings for playful drop shadows.

## 2. Color Palette Tokens

Use predefined CSS color variables instead of hardcoded hex values:

- `--color-royalpurple` (`#2D18A8`) - Main theme background & navbar glass tint.
- `--color-vibrantyellow` (`#FBFA74`) - Primary buttons, highlight text, active indicators.
- `--color-warmpink` (`#A649E2`) - Accent CTA buttons, gradient highlights.
- `--color-lightpurple` (`#6950D5`) - Hover states and subtle backgrounds.
- `--color-navyblue` (`#021442`) - Deep dark contrast text on yellow badges/buttons.
- `--color-glass` (`rgba(46, 24, 138, 0.50)`) - Glassmorphism containers.

## 3. Pre-built UI Components & Utility Classes

Prefer using pre-styled starter components from `@/components/ui/` or global utility classes:

- **`<Button />` / `.btn-primary`, `.btn-secondary`, `.btn-accent`**: Use built-in button styles.
- **`<Card />` / `.card-roadtrip`, `.glass-panel`, `.sunset-card`**: Standard card wrappers with backdrop blur.
- **`<Badge />` / `.badge-vibrant`, `.badge-glass`**: Pill tags and status labels.

## 4. STRICT RULE: Explicit Href / Route Discipline for Buttons & Links

> [!IMPORTANT]
> **No Dummy Placeholder Links (`#`, `#example`, `www.website.com/#example`)**
> Whenever you add or edit a `<Button>`, `<Link>`, or `<a>` element:
> 1. Ask the user or verify the exact destination route (e.g. `href="/2026"`, `href="/organizers"`, `href="https://discord.gg/..."`, `href="#zone-about"`).
> 2. NEVER output generic placeholder hrefs like `href="#"` or `href="www.website.com/#example"`.
> 3. If the destination route is unknown, ask for clarification before generating code.

## 5. Asset & Image Management (Top-Level Imports Only)

- **Storage Location**: Place image assets in `public/images/` or `public/` subdirectories.
- **STRICT IMPORT RULE**: All image assets and graphics MUST be imported at the very top of the file before component definitions (e.g. `import logoImage from '@/public/images/logo.png'` or static path constants at top module level). DO NOT inline `require()` calls or import images inside function bodies / render returns.
- **Path Resolution**: Reference static images from `public/` using clean root-relative paths like `/images/filename.svg`.

## 6. Mobile-First & Responsive Layouts

- Always construct component layouts mobile-first using Tailwind responsive breakpoints (`sm:`, `md:`, `lg:`).
- Test layouts across both mobile devices (375px) and desktop displays (1440px+).

## 7. Component & File Organization

- **Page Routes**: Place in `@/app/` (e.g. `src/app/about/page.tsx`).
- **Starter UI Components**: Place reusable generic controls in `@/components/ui/` (`Button.tsx`, `Card.tsx`, `Badge.tsx`).
- **Feature & Zone Components**: Place homepage road trip sections in `@/components/roadtrip/`.
- **Static Assets**: Place in `public/images/`.

## 8. Preview & Testing

- Access `/design-system` on `http://localhost:3000/design-system` to inspect interactive UI elements and copy code snippets.

