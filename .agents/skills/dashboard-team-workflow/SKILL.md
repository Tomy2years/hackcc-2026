---
name: dashboard-team-workflow
description: Standardized workflow and development guide for HackCC team members developing the Attendee Dashboard on the dedicated 'feature/attendee-dashboard' branch. Covers quickstart, route responsibilities, mock data engine, and pre-flight validation.
---

# HackCC 2026 Attendee Dashboard: Development & Workflow Standard

> **The Golden Production Rule:**  
> The live website (`hackcc.org`) deploys **strictly and exclusively** from the `main` branch.  
> The Attendee Dashboard is an unreleased day-of event feature currently under active development.  
> **All dashboard development takes place on the dedicated branch: `feature/attendee-dashboard`.**  
> **NO dashboard code is EVER pushed directly to `main`.**

---

## 🚀 Quickstart: Getting Up & Running

Follow these steps to pull the latest dashboard code and start developing:

```bash
# 1. Fetch latest branches from GitHub
git fetch origin

# 2. Switch to the dedicated dashboard branch
git checkout feature/attendee-dashboard
git pull origin feature/attendee-dashboard

# 3. Install dependencies and start the dev server
npm install
npm run dev
```

Open your browser to: **`http://localhost:3000/dashboard`**

---

## 🗺️ Route Directory & Responsibilities

All dashboard pages inherit the California Road Trip twilight aesthetic, announcement ticker, header with live stats, and thumb-friendly persistent mobile bottom navigation bar defined in `src/app/dashboard/layout.tsx`.

| Dashboard Route | File Location | Key Features & Responsibilities |
| :--- | :--- | :--- |
| **Mission Control Hub** | `src/app/dashboard/page.tsx` | Live 14-hour countdown radar, digital pass quick card, Pokédex progress bar, happening now/next agenda card, quick actions deck. |
| **Hack-Dex Collector** | `src/app/dashboard/dex/page.tsx` | Game Boy retro collection grid with mystery silhouettes (`???`), category tabs, rarity tiers, Station Camera QR scanner simulator & 4-digit TOTP PIN fallback. |
| **Digital Hacker Pass** | `src/app/dashboard/pass/page.tsx` | Fullscreen verifiable ID card, live animated anti-screenshot ticker, high-contrast QR display, dietary restriction callouts, brightness booster. |
| **Live Leaderboard** | `src/app/dashboard/leaderboard/page.tsx` | Top 3 podium (1st, 2nd, 3rd) with grand prize tags, user sticky rank card, deterministic tie-breaker note, searchable rankings by community college. |
| **Event Timeline** | `src/app/dashboard/schedule/page.tsx` | Saturday & Sunday day switcher, category filters (Workshops, Food, Deadlines), room numbers, happening now indicators. |
| **Team Hub** | `src/app/dashboard/team/page.tsx` | Team details, 1-click invite code copy, leader-only Devpost/GitHub links, solo hacker matchmaking directory for CCC attendees. |
| **Roadside Mentors** | `src/app/dashboard/mentors/page.tsx` | Single active ticket help queue, category select (Frontend, AI/ML, Cloud), live en-route tracker ("Mentor Alex walking to Table 24"), ticket history. |
| **Venue Map & Wi-Fi** | `src/app/dashboard/map/page.tsx` | OCC Student Center zone cards, 1-click Wi-Fi password copy, emergency OCC Campus Safety dispatch & Discord helpdesk links. |

---

## 📦 Shared Assets, Components & Mock Data

- **Background Art:** `public/assets/roadtrip/dashboard/`
- **Reusable UI Components:** `src/components/dashboard/` (Header, Nav, AnnouncementBanner, BadgeIcon)
- **TypeScript Schemas:** `src/types/dashboard.ts`
- **Mock Data Engine:** `src/lib/dashboardMockData.ts`

### Connecting to Backend / Supabase RPCs (Future):
1. **User Profile & XP:** Connect `mockCurrentUser` to `public.attendee_profiles`.
2. **Pokédex Badges & Claims:** Connect `mockBadges` to `public.pokedex_badges` and `public.attendee_badges`. When unlocking, call atomic RPC `claim_badge_by_code`.
3. **Leaderboard:** Subscribe to `public.pokedex_leaderboard` via Supabase Realtime WebSockets.
4. **Mentor Queue:** Call `claim_mentor_ticket` RPC for mentors and write to `public.mentor_tickets`.

---

## 💾 Saving & Pushing Routine

When you or your pairing AI agent finish changes or want to back up work:

### 1. Run Pre-Flight Validation
Ensure there are zero TypeScript compiler errors or ESLint warnings:
```powershell
npm run lint; npm run typecheck
```

### 2. Commit and Push to the Feature Branch
```bash
git add .
git commit -m "feat(dashboard): describe your changes here"
git push origin feature/attendee-dashboard
```

> **Safety Assurance:** Pushing to `feature/attendee-dashboard` safely backs up your progress to GitHub without affecting the live website at `hackcc.org`.

---

## 🤖 Strict Instructions for AI Agents Pairing with Teammates

When an AI agent assists any contributor on this repo:
1. **Always verify the active branch:**
   Ensure you are on `feature/attendee-dashboard`. Never make or push commits on `main`.
2. **Never push broken code:**
   Always run `npm run lint` and `npm run typecheck` before pushing.
3. **Preserve theme & aesthetic:**
   Use the California Road Trip twilight palette tokens from `src/app/globals.css`. Keep layouts mobile-friendly and thumb-reachable.
4. **Zero secrets in client code:**
   Never commit `.env.local` or expose private API keys in client components.
