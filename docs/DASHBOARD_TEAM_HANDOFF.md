# HackCC 2026 Attendee Dashboard: Team Hand-Off Guide

> **Target Release:** HackCC 2026 (November 14–15, 2026 at Orange Coast College)  
> **Route Entry Point:** `/dashboard` (`src/app/dashboard/page.tsx`)  
> **Architecture Spec:** [ATTENDEE_DASHBOARD_PLAN.md](./ATTENDEE_DASHBOARD_PLAN.md)  
> **Skill Reference:** [attendee-dashboard](../.agents/skills/attendee-dashboard/SKILL.md)  

---

## 1. Overview & Setup

The basic UI shell, route structure, design tokens, and typed mock data system for the **HackCC 2026 Attendee Dashboard** are fully scaffolded, mobile-optimized, and passing all pre-flight checks (`npm run lint` and `npm run typecheck`).

To preview the dashboard locally:
```bash
npm run dev
# Open in browser: http://127.0.0.1:3000/dashboard
```

---

## 2. Route Directory & Architecture

All pages inherit the California Road Trip twilight aesthetic, announcement ticker, header with live stats, and thumb-friendly persistent mobile bottom navigation bar defined in `src/app/dashboard/layout.tsx`.

| Route | File Path | Key Features & Responsibilities |
| :--- | :--- | :--- |
| **Mission Control Hub** | `/dashboard` | Live 14-hour countdown radar, digital pass quick card, Pokédex progress bar, happening now/next agenda card, quick actions deck. |
| **Hack-Dex Collector** | `/dashboard/dex` | Game Boy retro collection grid with mystery silhouettes (`???`), category tabs, rarity tiers, Station Camera QR scanner simulator & 4-digit TOTP PIN fallback. |
| **Digital Hacker Pass** | `/dashboard/pass` | Fullscreen verifiable ID card, live animated anti-screenshot ticker, high-contrast QR display, dietary restriction callouts, brightness booster. |
| **Live Leaderboard** | `/dashboard/leaderboard` | Top 3 podium (1st, 2nd, 3rd) with grand prize tags, user sticky rank card, deterministic tie-breaker note, searchable rankings by community college. |
| **Timeline & Agenda** | `/dashboard/schedule` | Saturday & Sunday day switcher, category filters (Workshops, Food, Deadlines), room numbers, happening now indicators. |
| **Team Workspace** | `/dashboard/team` | Team details, 1-click invite code copy, leader-only Devpost/GitHub links, solo hacker matchmaking directory for CCC attendees. |
| **Roadside Mentors** | `/dashboard/mentors` | Single active ticket help queue, category select (Frontend, AI/ML, Cloud), live en-route tracker ("Mentor Alex walking to Table 24"), ticket history. |
| **Venue Map & Wi-Fi** | `/dashboard/map` | OCC Student Center zone cards, 1-click Wi-Fi password copy, emergency OCC Campus Safety dispatch & Discord helpdesk links. |

---

## 3. Data Flow & Where to Plug in Backend APIs

All UI components consume typed data defined in:
- **TypeScript Schemas:** `src/types/dashboard.ts`
- **Mock Data Engine:** `src/lib/dashboardMockData.ts`

### Connecting to Supabase Client / RPCs:
1. **User Profile & XP:** Replace `mockCurrentUser` with query on `public.attendee_profiles`.
2. **Pokédex Badges & Claims:** Replace `mockBadges` with query on `public.pokedex_badges` joined with `public.attendee_badges`. When unlocking, invoke the atomic PostgreSQL procedure:
   ```ts
   const { data, error } = await supabase.rpc('claim_badge_by_code', {
     p_badge_id: badgeId,
     p_code: codeOrPin,
   });
   ```
3. **Leaderboard:** Subscribe to `public.pokedex_leaderboard` via Supabase Realtime WebSockets:
   ```ts
   const channel = supabase
     .channel('leaderboard-changes')
     .on('postgres_changes', { event: '*', schema: 'public', table: 'attendee_profiles' }, fetchLeaderboard)
     .subscribe();
   ```
4. **Mentor Queue:** Call `claim_mentor_ticket` RPC for mentors and write to `public.mentor_tickets`.

---

## 4. Suggested Team Next Steps

1. **Camera Scanner Integration:** Wire up `html5-qrcode` or `jsqr` to `navigator.mediaDevices.getUserMedia` in `/dashboard/dex` (`src/app/dashboard/dex/page.tsx`) for instant station QR detection.
2. **Web Audio Chimes:** Add a lightweight 8-bit chiptune sound file (`public/sounds/badge-chime.mp3`) triggered via the Web Audio API when a badge is claimed.
3. **Offline Service Worker Caching:** Add a Serwist / Workbox service worker caching `/dashboard/pass` so the ticket pass works 100% offline even during airplane mode.
4. **Apple / Google Wallet Export:** Generate signed `.pkpass` files for the "Add to Apple Wallet" CTA.
