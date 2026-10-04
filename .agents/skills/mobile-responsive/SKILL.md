---
name: mobile-responsive
description: Enforces mobile-first responsive design best practices for HackCC 2026. Teaches agents and contributors how to make roadtrip zones, typography, unboxed stats, touch targets, and scenic backgrounds look stunning on smartphones (iPhone/Android) with zero horizontal overflow.
---

# HackCC 2026 Mobile Responsive Design Guide 📱

Over 60% of hackathon attendees and judges browse the website from their phones. This skill guides agents and contributors in crafting a buttery-smooth, visually breathtaking mobile experience with zero layout bugs or horizontal overflow.

---

## 🌟 The 5 Golden Rules of Mobile Design

### 1. The "Zero Horizontal Overflow" Law
A website should **never** scroll horizontally or shake side-to-side on a mobile device.

- ❌ **Forbidden**:
  - `w-[600px]` or `w-[900px]` (hardcoded pixel widths blow out mobile viewports).
  - `left-[320px]` or `ml-[120px]` (manual offsets push elements off-screen).
- ✅ **Mandated**:
  - `w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8` (fluid width with safe side padding).
  - Let elements flow naturally using Flexbox and CSS Grid.

---

### 2. Responsive Typography (Big Titles That Don't Break)
`Bagel Fat One` is bold and punchy, but on a 375px mobile screen, a fixed `text-7xl` will wrap awkwardly into 6 lines.

| Element | Desktop Size | Mobile Class to Use |
| :--- | :--- | :--- |
| **Zone Headings** | `text-6xl` / `text-7xl` | `text-3xl sm:text-5xl lg:text-7xl leading-[1.1]` |
| **Serif Hooks** | `text-xl` | `text-base sm:text-xl` |
| **Body Descriptions** | `text-lg` | `text-sm sm:text-base lg:text-lg leading-relaxed` |
| **Monumental Stats** | `text-7xl` | `text-4xl sm:text-6xl lg:text-7xl` |

#### Example:
```tsx
<h2 className="font-heading font-normal text-3xl sm:text-5xl lg:text-7xl text-white leading-[1.1] mb-4">
  Explore California
</h2>
```

---

### 3. Stack by Default: 1 Column on Mobile, Multi-Column on Desktop
On mobile screens, human eyes read top-to-bottom. Multi-column layouts must collapse into a clean single vertical stack on mobile:

#### Grid Pattern (Cards, Tracks, FAQs):
```tsx
{/* 1 column on phone -> 2 columns on tablet -> 3 columns on desktop */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
  {items.map(...)}
</div>
```

#### Stats Row Pattern:
```tsx
{/* Stacks vertically on mobile, separates with subtle borders */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 border-y border-white/15 py-8">
  <div className="flex flex-col border-b sm:border-b-0 sm:border-r border-white/10 pb-6 sm:pb-0">
    <span className="font-heading text-4xl sm:text-6xl text-amber-400">14 HRS</span>
    <span className="text-slate-300 text-sm mt-1">Non-stop building & mentoring</span>
  </div>
  {/* next stats */}
</div>
```

---

### 4. Thumb-Friendly Touch Targets & Button Stacking
Human thumbs are much larger than desktop mouse cursors. Buttons must be easy to tap without accidental clicks:

- **Touch Size**: Minimum 44px height (`py-3 px-6` or `py-3.5 px-8`).
- **Button Stacking on Mobile**: Primary CTA and secondary links should stack full-width or wrap naturally:

```tsx
<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
  <Button href="/apply" variant="primary" size="lg" className="w-full sm:w-auto justify-center">
    <span>Hit the Road</span> <span className="ml-1 text-xl">→</span>
  </Button>
  <Button href="#zone-about" variant="glass" size="lg" className="w-full sm:w-auto justify-center">
    Learn More
  </Button>
</div>
```

---

### 5. Mobile Viewport Spacing (Don't Waste Screen Real Estate)
On a phone, the entire vertical screen is only ~700px tall. Massive desktop padding (`py-36`) forces attendees to scroll endlessly through empty air.

- **Section vertical padding**:
  Use `py-16 sm:py-24 lg:py-32` instead of static `py-36`.
- **Side margin / container padding**:
  Always ensure `px-4 sm:px-6 lg:px-8` so text never presses directly against the physical phone bezel.

---

## 🔍 How to Test Mobile View in 5 Seconds (No Phone Needed!)

You don't need a physical phone to test your zone:

1. Open your local site at **`http://localhost:3000`** in Chrome, Edge, or Brave.
2. Press **`F12`** (or right-click anywhere and choose **Inspect**).
3. Press **`Ctrl + Shift + M`** (Windows) or **`Cmd + Shift + M`** (Mac) to toggle the **Device Toolbar**.
4. In the top dropdown, pick **iPhone SE (375px)** or **iPhone 14 (390px)**.
5. Scroll through your zone and check:
   - Does any text wrap awkwardly or get cut off?
   - Can you scroll left/right? (If yes, you have an overflow bug to fix!).
   - Are buttons easy to tap with a thumb?

---

## 🛠️ Common Mobile Bugs & 10-Second Fixes

| Problem | Cause | Quick Fix |
| :--- | :--- | :--- |
| **Site scrolls horizontally / wobbles sideways** | A child has a fixed width like `w-[500px]` or negative margins | Change to `w-full max-w-lg mx-auto` |
| **Huge title wraps into 6 unreadable lines** | Static font size like `text-6xl` | Change to `text-3xl sm:text-5xl lg:text-7xl` |
| **3 cards squeezed into narrow unreadable slivers** | Missing `grid-cols-1` | Use `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` |
| **Buttons look tiny or cramped** | Desktop padding on small screen | Use `w-full sm:w-auto py-3 px-6 text-center` |
| **Text touches the edge of phone screen** | Container missing horizontal padding | Add `px-4 sm:px-6` to outer container |

---

## 🤖 Instructions for AI Agents Optimizing Mobile Zones

When a team member asks to *"make this look good on mobile"* or *"fix mobile layout"*:
1. **Audit Font Sizes**: Ensure all headings have responsive scales (`text-3xl sm:text-5xl`).
2. **Audit Containers**: Ensure max-width containers have `px-4 sm:px-6` side padding.
3. **Audit Grids**: Verify every grid has `grid-cols-1` as its mobile baseline.
4. **Audit Buttons**: Ensure button clusters stack nicely on mobile with `flex flex-col sm:flex-row`.
5. **Verify zero overflow**: Check that no elements use hardcoded fixed pixel widths (`w-[...px]`).
