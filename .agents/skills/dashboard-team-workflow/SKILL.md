---
name: dashboard-team-workflow
description: Standardized, safe Git workflow for HackCC team members developing the Attendee Dashboard. Guarantees the live website is never accidentally updated, enables fearless cloud backups, enforces dev-<name>/dashboard branch naming, route file isolation, and pre-flight validation before lead review.
---

# HackCC 2026 Attendee Dashboard: Contributor Workflow & Branching Standard

> **The Golden Production Rule:**  
> The live website (`hackcc.org`) is deployed **strictly and exclusively** when the Team Lead (Tom) syncs changes into `main`.  
> The Attendee Dashboard is a day-of event feature currently under development. To keep it completely isolated from the live website while allowing your team to build fearlessly:  
> **NO dashboard code is EVER pushed directly to `main` by team contributors.**

---

## 🌟 The Simple 3-Step Teammate Routine

If you are non-technical or pairing with an AI agent, you don't need to memorize complex Git syntax. Follow these 3 simple steps:

1. **Start your session**: Your AI checks out your dedicated branch: `dev-<yourname>/dashboard`.
2. **Work and save fearlessly**: You and your AI build your assigned dashboard page. You can save and push your branch to GitHub anytime for safe cloud backup. **It will NOT affect the live website!**
3. **When you finish your page**: Your AI runs validation checks (`lint` and `typecheck`), pushes your branch, and generates a review link for Tom.

---

## 🗺️ Route Ownership (Zero Merge Conflicts)

To make sure nobody collides or overwrites someone else's work, each team member owns a dedicated route file:

| Dashboard Route | File Location | What it Does |
| :--- | :--- | :--- |
| **Hack-Dex Collector** | `src/app/dashboard/dex/page.tsx` | Pokédex badge collection, camera QR scanner, 4-digit PIN fallback |
| **Digital Hacker Pass** | `src/app/dashboard/pass/page.tsx` | Verifiable pass card, live animated ticker, Apple/Google Wallet cards |
| **Live Leaderboard** | `src/app/dashboard/leaderboard/page.tsx` | Top 3 podium, tie-breaker display, searchable college rankings |
| **Event Timeline** | `src/app/dashboard/schedule/page.tsx` | Saturday/Sunday timeline, category filters, room numbers |
| **Team Hub** | `src/app/dashboard/team/page.tsx` | Team roster, invite code copy, Devpost/GitHub links, solo matchmaker |
| **Roadside Mentors** | `src/app/dashboard/mentors/page.tsx` | Mentor help ticket queue, Discord webhook trigger, status tracking |
| **Venue Map & Wi-Fi** | `src/app/dashboard/map/page.tsx` | OCC Student Center floor plan, 1-click Wi-Fi copy, campus safety |

Shared assets and mock data live in:
- Background Art: `public/assets/roadtrip/dashboard/`
- Mock Data Engine: `src/lib/dashboardMockData.ts`
- Data Types: `src/types/dashboard.ts`

---

## 🌿 Branch Naming Standard: `dev-<name>/dashboard`

Every contributor working on the dashboard operates on their personal sub-branch:

```text
dev-<firstname>/dashboard
```

### Examples:
- `dev-rohan/dashboard`
- `dev-dasha/dashboard`
- `dev-kaden/dashboard`
- `dev-jessy/dashboard`
- `dev-valance/dashboard`

---

## 🤖 Strict Instructions for AI Agents Pairing with Teammates

When an AI agent assists any team member in this repository, the agent MUST follow these exact steps:

### 1. Onboarding / Session Start:
Ask the contributor:
> *"What is your first name, and which dashboard route are you working on (e.g. Dex, Pass, Leaderboard, Schedule, Team, Mentors, Map)?"*

Once answered, create and switch to their branch:
```bash
# Ensure we are branching from the latest dashboard baseline
git fetch origin
git checkout dev-tom
git pull origin dev-tom
git checkout -b dev-<theirname>/dashboard
```

### 2. During Work ("Save my work" / "Checkpoint"):
When the contributor asks to save or back up their work:
1. Stage only their assigned files:
   ```bash
   git add src/app/dashboard/<assigned-route>/
   ```
2. Commit with a clear, descriptive message:
   ```bash
   git commit -m "feat(dashboard): update <route> UI and features"
   ```
3. Push to their remote branch for cloud backup:
   ```bash
   git push -u origin dev-<theirname>/dashboard
   ```
4. Reassure the contributor:
   > *"Your work is safely backed up to your personal branch on GitHub (`dev-<theirname>/dashboard`). The live site will remain untouched until Tom reviews and syncs it!"*

### 3. When Finished ("I'm ready for Tom to review"):
Before handing off to the team lead:
1. **Run Pre-Flight Validation:**
   ```powershell
   npm run lint; npm run typecheck
   ```
   If any errors or missing imports occur, fix them immediately.
2. **Push final changes:**
   ```bash
   git push origin dev-<theirname>/dashboard
   ```
3. **Output the Pull Request link targeting `dev-tom`:**
   Provide the contributor with the direct GitHub PR comparison link:
   `https://github.com/Tomy2years/hackcc-2026/compare/dev-tom...dev-<theirname>/dashboard`
   and tell them to DM Tom on Discord with:
   > *"Hey Tom! I just pushed `/dashboard/<route>` to `dev-<theirname>/dashboard` and validated `lint` + `typecheck`. Ready for your review!"*

---

## 🛡️ Anti-Patterns to Prevent

- ❌ **NEVER run `git push origin main` or checkout `main` to merge.**
- ❌ **NEVER delete or overwrite another contributor's route file.**
- ❌ **NEVER push without running `npm run lint` and `npm run typecheck` first.**
- ❌ **NEVER expose confidential API keys or secret codes in client components.**
