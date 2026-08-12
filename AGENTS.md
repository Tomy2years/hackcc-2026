<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# HackCC 2026 Developer & Agent Guidelines

- **Vibe & Aesthetic**: Maintain the SoCal Road Trip theme with cartoony fonts (`Bagel Fat One` for titles, `Montserrat Alternates` for body) and color palette tokens from `src/app/globals.css`.
- **UI Components**: Prefer using starter components in `@/components/ui/` (`<Button>`, `<Card>`, `<Badge>`).
- **Explicit Routes Only**: Whenever generating or editing buttons/links, always specify real destination routes (`/2026`, `/organizers`, `https://...`). DO NOT output placeholder hrefs like `#` or `www.website.com/#example`. If the route is unknown, ask the user!
- **Top-Level Image Imports**: Import all image assets and graphics at the top of the file before component definitions (e.g. `import logo from '@/public/images/logo.png'`). Never inline `require()` inside render blocks.
- **File & Asset Locations**: Put static assets in `public/images/`, page routes in `@/app/`, reusable UI in `@/components/ui/`, and roadtrip zone sections in `@/components/roadtrip/`.
- **Design System Showcase**: Reference `/design-system` (`src/app/design-system/page.tsx`) for visual examples and copyable code snippets.


