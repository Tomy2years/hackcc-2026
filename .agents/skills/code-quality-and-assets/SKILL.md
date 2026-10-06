---
name: code-quality-and-assets
description: Enforces HackCC pre-flight code validation (TypeScript typecheck, linting, zero dummy/placeholder links), asset management (public/ organization, WebP/SVG optimization), and top-level image import rules.
---

# HackCC 2026 Code Quality & Asset Management Guidelines

This skill guides agents and contributors in maintaining clean code, rock-solid TypeScript types, pristine asset hygiene, and zero broken links across the HackCC 2026 codebase.

---

## 1. Pre-Flight Verification Workflow

Before committing code or requesting PR reviews, run these automated verification steps:

### Step 1: TypeScript Compilation (`typecheck`)
```bash
npm run typecheck
```
- **Rule**: Must pass with **0 errors**.
- Never bypass TypeScript errors using `// @ts-ignore` or `any` without explicit justification.

### Step 2: Code Linting (`lint`)
```bash
npm run lint
```
- For files you created or edited, resolve all new ESLint errors.
- Common issues:
  - Unused imports or variables (`@typescript-eslint/no-unused-vars`).
  - Unescaped HTML entities in JSX (`react/no-unescaped-entities`): If you type text with apostrophes or quotes like `It's free`, wrap the text in curly braces `{"It's free"}` or use `&apos;` / `&quot;`.
  - Prefer `<Link href="...">` from `next/link` over raw `<a href="...">` for internal routes (`@next/next/no-html-link-for-pages`).

### Step 3: Production Build Test (Recommended)
```bash
npm run build
```
- Confirms Next.js can compile and bundle all static/server routes without runtime errors.

---

## 2. STRICT Route & Link Discipline (Zero Dummy Links)

> [!IMPORTANT]
> **No Dummy Placeholder Links Allowed!**
> Never output placeholder hrefs like:
> - ❌ `href="#"`
> - ❌ `href="#example"`
> - ❌ `href="www.website.com/#example"`
> - ❌ `href="javascript:void(0)"`

### Link Rules:
1. **Always use explicit, working destinations**:
   - Internal routes: `href="/2026"`, `href="/organizers"`, `href="/design-system"`, `href="#zone-details"` (real in-page anchors).
   - External links: `href="https://discord.gg/..."`, `href="https://github.com/..."` (with `target="_blank"` and `rel="noopener noreferrer"`).
2. **If the destination route is unknown**:
   - **Ask the user or team lead!** Do not guess or insert dummy URLs.
   - If an element is purely meant to trigger interactive state (modal, drawer, tab switch), use `<button onClick={...}>` instead of an anchor tag `<Link>` or `<a>`.

---

## 3. Asset & Image Management Guidelines

### 1. Storage Locations in `public/`
All static assets must be organized within the `public/` directory:
- **`public/images/`**: Global logos, icons, mascots, badges, and partner marks.
- **`public/assets/roadtrip/`**: Road trip scenic photos, zone backgrounds (Hollywood, Inglewood, Santa Monica, PCH, San Diego), highway signs, and map markers.

### 2. STRICT Top-Level Import Rule
> [!CAUTION]
> **All images and graphics must be imported at the very top of the file before component definitions.**
> - ✅ **Correct**:
>   ```tsx
>   import Image from 'next/image';
>   import hackccLogo from '@/public/images/logo.png';
>
>   export default function Header() {
>     return <Image src={hackccLogo} alt="HackCC Logo" width={140} height={40} />;
>   }
>   ```
> - ❌ **Forbidden**:
>   ```tsx
>   export default function Header() {
>     const logo = require('@/public/images/logo.png'); // NO! Never inline require
>     return <img src={logo} />;
>   }
>   ```
> - For public string paths (e.g. scenic backgrounds), define exported constants at module scope:
>   ```tsx
>   const ZONE1_BG = '/assets/roadtrip/zone1-hollywood.webp';
>   ```

### 3. File Formats & Optimization Standards
To ensure fast page load times and responsive mobile performance:
- **Photographic Backgrounds**: Use modern compressed formats (`.webp` or `.avif`).
  - Target file size: Under 250 KB per scenic background.
  - Avoid raw 10MB PNG or JPEG uploads.
- **Logos & Vector Art**: Use `.svg`. SVGs scale infinitely without blurring and have near-zero file weight.
- **Icons**: Use `@fortawesome/react-fontawesome` or `lucide-react` (both already installed in package.json) rather than raster image files for generic UI icons.

### 4. Next.js `<Image>` Component Best Practices
- **Accessible Alt Text**: Always provide meaningful `alt` descriptions (e.g. `alt="HackCC 2026 logo with California surfboard"`), not `alt="image"` or `alt=""`.
- **Scenic Hero Backgrounds (Full Cover)**:
  ```tsx
  <div className="relative w-full min-h-screen">
    <Image
      src="/assets/roadtrip/zone1-hollywood.webp"
      alt="Scenic Hollywood hills golden hour"
      fill
      priority // Add priority to the above-the-fold hero image
      sizes="100vw"
      className="object-cover object-center -z-10"
    />
    <div className="relative z-10">{/* Content */}</div>
  </div>
  ```
- **Proportional UI Elements**: Explicitly set `width` and `height` to prevent Cumulative Layout Shift (CLS).

---

## 4. Security & Environment Variable Hygiene

1. **Never commit `.env.local` or private secrets**:
   - Redis tokens, email API credentials, and secret keys must stay in `.env.local` (which is in `.gitignore`).
   - If adding a new environment variable, document only the key name and dummy example in `.env.example`.
2. **Server vs. Client Separation**:
   - Sensitive logic (database queries, email dispatch) belongs in Server Components, API routes (`src/app/api/...`), or server actions (`'use server'`).
   - Client components (`'use client'`) must never expose secret keys.

---

## 5. Quick Pre-Flight Command: `npm run typecheck`

Before staging your code or asking Tom to merge:

```bash
npm run typecheck
```

This verifies that:
1. All TypeScript types compile with **0 errors**.
2. No broken imports or missing properties exist.
3. Your component is safe to merge into `main`!
