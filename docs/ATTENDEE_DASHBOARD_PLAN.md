# HackCC 2026 Day-of Attendee Dashboard: Blueprint, Threat Model & End-to-End Journeys

> **Target Release:** HackCC 2026 (November 14–15, 2026 at Orange Coast College)  
> **Audience:** Admitted Hackers, Mentors, Volunteers, and Organizers  
> **Core Engagement Feature:** The HackCC Pokédex ("Hack-Dex") & Live Competitive Leaderboard  
> **Security Baseline:** Zero-trust client, PostgreSQL Row-Level Security, Private Secret Vault, Atomic RPC procedures, Verified Email Binding, Physical Wristband Binding, Upstash rate limits  
> **Skill Reference:** [attendee-dashboard](../.agents/skills/attendee-dashboard/SKILL.md)

---

## 1. Executive Summary & Vision

During the 14-hour weekend of HackCC 2026, over 250 hackers from California community colleges will build, learn, and compete at Orange Coast College. The **Attendee Dashboard** acts as each hacker's personal cockpit. 

A central problem at many hackathons is that attendees often sit at their tables and miss out on workshops, sponsor interactions, social games, and special activities. To solve this, the HackCC dashboard centers around the **HackCC Pokédex ("Hack-Dex")**: a retro Game Boy-inspired badge collection system with mystery silhouettes, rarity tiers, and sound effects.

A **live competitive leaderboard** ranks hackers by badges and XP earned. The top 3 collectors (1st, 2nd, and 3rd place) win grand physical prizes on stage at the closing ceremony, giving hackers an immediate, gamified incentive to fully experience everything HackCC offers.

---

## 2. Threat Modeling & Vulnerability Analysis

Hackathons attract clever CS students who will actively inspect Network requests, decompile client bundles, and attempt exploits. The system is engineered to mitigate all top attack vectors:

| Attack Vector | Potential Exploit | Engineering Mitigation |
| :--- | :--- | :--- |
| **1. Station QR Screenshot Leaks** | A hacker takes a photo of a workshop QR and texts it to remote/sleeping friends. | **Short-Window TOTP (20–30s)**: Projector QRs rotate rapidly via HMAC-SHA256 (`station_id + timestamp_bucket + secret_salt`).<br>**Live Camera Feed Enforcement**: In-app scanner binds directly to `navigator.mediaDevices.getUserMedia`; photo uploads are blocked.<br>**Schedule Window Gating**: Badge can only be unlocked while that workshop is in session. |
| **2. Secret Code Brute-Forcing & Database Extraction** | A hacker loops 4-letter codes or queries the Supabase client to dump secret codes from tables. | **Private Secret Vault**: Codes are stored as salted cryptographic hashes in `private.pokedex_badge_secrets` with `REVOKE ALL` from client roles. Client cannot query them.<br>**Atomic RPC Procedures**: Badges unlock exclusively through `claim_badge_by_code`.<br>**Upstash Redis Rate Limiting**: Max 5 attempts/min per user/IP + 10-minute backoff after 3 fails. |
| **3. Concurrent Race Conditions & Double Claims** | Burst of 50 concurrent curl requests to claim double badges or double food portions. | **Postgres UNIQUE Constraints**: `UNIQUE(user_id, badge_id)` on `attendee_badges` and `UNIQUE(attendee_id, meal_type)` on `meal_scans`. Duplicate INSERTs throw Postgres constraint error `23505` at the DB engine level.<br>**Row-Locking RPCs**: Atomic check-in and claiming routines prevent race conditions. |
| **4. Client Cache Tampering** | Hacker edits `localStorage` to inject fake unlocked badges into their UI. | **Database Source of Truth**: `localStorage` is purely an offline presentation cache. The leaderboard, total XP, and prize eligibility are calculated strictly on the Postgres server. |
| **5. Privilege Escalation & Function Hijacking** | Hacker attempts to invoke volunteer scanner, overwrite attendee profiles, or alter search paths. | **Hardened SECURITY DEFINER**: All security functions explicitly set `SET search_path = public, pg_temp;`.<br>**Role-Based Access Control (RBAC)**: Checks `user_roles` table (write-protected).<br>**Scoped Volunteer Procedures**: Volunteers invoke `check_in_attendee()` rather than having arbitrary `UPDATE` access over `attendee_profiles`. |
| **6. QR Pass Sharing & The Offline Paradox** | Hacker shares screenshot of pass with friend, or pass fails to render during venue Wi-Fi dropout. | **Static Cryptographic Token + Offline Cache**: Pass embeds a high-entropy UUID stored in `localStorage`, guaranteeing instant offline rendering.<br>**Live Animated Ticker**: Active seconds counter and color-shifting SVG badge prevent static screenshot sharing.<br>**Physical Wristband Binding**: At morning check-in, volunteers verify ID, scan the digital pass, and affix a tamper-evident wristband. Meal scans enforce wristband presence + DB single-meal uniqueness. |
| **7. Account Hijacking & Demographic Brute-Force** | Attacker brute-forces Name + DOB to claim another student's pass and meals. | **Strict Verified Email Binding**: Account binds strictly to the **verified OAuth email** (`auth.users.email = applications.email`) with 6-digit email OTP fallback for alternate emails. Guessable demographic handshakes (Name + DOB) are completely eliminated.<br>**Zero-Phone Policy**: No phone numbers or home addresses collected or stored. Blast radius is zero. |
| **8. Mentorship Queue Flooding & Claim Collision** | Hacker scripts 500 help tickets, or two mentors race to claim the same ticket. | **Single-Active-Ticket Index**: `CREATE UNIQUE INDEX idx_single_active_ticket ON mentor_tickets(hacker_id) WHERE status IN ('queued', 'in_progress')`.<br>**Atomic Claim RPC**: `claim_mentor_ticket()` atomically transitions status from `queued` to `in_progress` matching `auth.uid()`. |
| **9. Team Hijacking & Submission Tampering** | Teammate alters Devpost link right before deadline, or non-members cannot join due to RLS. | **Leader-Only Submission Edits**: Only team `leader` can update `devpost_url` and `github_url`.<br>**Atomic `join_team` Procedure**: Enforces maximum team size of 4 members and resolves RLS join deadlock. |

---

## 3. End-to-End User Journeys

### Journey 1: The Hacker / Attendee Experience
1. **Morning Check-In**: Hacker arrives at OCC, opens `hackcc.org/dashboard`, taps **"Pass"**, shows QR to volunteer. Volunteer checks student ID, scans QR via `check_in_attendee()`, affixes a tamper-evident wristband, awards swag bag, and automatically unlocks Badge `#001: Checked In`.
2. **Opening Ceremony & The Hacking Sprint**: Countdown timer begins: **"HACKING ENDS IN: 13:58:20"**. Hacker visits `/dashboard/dex` and browses mystery silhouettes (`???`) with cryptic hints.
3. **Workshop & Sponsor Badge Hunting**: Hacker attends the 2:00 PM AI Workshop. Presenter shows the rotating 20s QR slide at the end. Hacker taps **"Scan Station"**, points phone camera at the screen: retro 8-bit chime sounds, colorful badge pops up: *"Badge #012: Neural Navigator Unlocked (+25 XP)!"* Leaderboard updates live.
4. **Meal Breaks**: Pinned banner broadcasts: *"🍕 Lunch is served in the Student Center!"* Volunteer checks wristband and scans hacker pass at the food line. Second attempts trigger a friendly red rejection screen.
5. **Calling a Roadside Mentor**: Hacker hits a deployment bug at 8:30 PM. Taps **"Mentors"**, submits a ticket with table number (system limits to 1 active ticket). In 4 minutes, Mentor Alex atomically claims the ticket, arrives at the table, and helps resolve it.
6. **Project Submission**: Top banner warns: *"⏰ 1 Hour until Devpost Soft Deadline!"* Team leader opens **"Team"** tab, verifies checklist, submits Devpost & GitHub links (non-leaders have view-only access to submissions), and unlocks Badge `#028: Crossed the Finish Line (+50 XP)`.
7. **Judging Expo & Awards**: Team tab displays assigned judging table (*"Table 34, Wave 1"*). At closing ceremony, the live leaderboard podium projects on the main stage. The hacker places 2nd and wins a grand prize!

### Journey 2: The Volunteer Experience
1. **Login**: Logs in at `/volunteer/scan`; system verifies `role = 'volunteer'`.
2. **Scanner View**: Selects mode (`Check-in`, `Lunch`, `Dinner`, `Midnight Boba`, `Breakfast`).
3. **Instant Validation**: Scans hacker QR pass. Green screen for valid/first-time; bright red screen with timestamp warning for duplicates; invokes atomic DB procedures.

### Journey 3: The Mentor Experience
1. **Lounge Dashboard**: Opens `/dashboard/mentors` to view live tickets filtered by specialty (`AI/ML`, `Frontend`, `Cloud`, `Hardware`).
2. **Claim & Assist**: Taps *"Claim Ticket #14"*; hacker is notified in real time that their mentor is on the way. Mentor walks to the hacker's table, resolves the issue, and marks it complete.

### Journey 4: The Lead Organizer Experience
1. **Real-Time Situation Room**: Controls live schedule adjustments and monitors venue flow.
2. **Urgent Broadcasts**: Pushes priority alerts (food announcements, room changes) to all attendee devices in <500ms via Supabase Realtime WebSockets.
3. **Leaderboard Audit**: Inspects scan logs and audit trail before calling the top 3 badge winners to the stage.

---

## 4. UI Layout & Navigation Structure

```
/dashboard                -> Main Hacker Hub Overview
/dashboard/dex            -> Retro Game Boy / Pokédex Collector & Camera Scanner
/dashboard/leaderboard    -> Live Competitive Leaderboard (1st, 2nd, 3rd Podium)
/dashboard/pass           -> Fullscreen Digital QR Pass & Badges
/dashboard/schedule       -> Detailed Event Timeline & Add-to-Calendar
/dashboard/team           -> Team Roster, Invites & Devpost Checklist
/dashboard/mentors        -> Mentor Request Queue & Active Tickets
/dashboard/map            -> Venue Floor Plan & Wi-Fi Details
/dashboard/perks          -> Sponsor API Keys, Hardware & Resources
/volunteer/scan           -> Fast camera-based QR scanner for check-in & meals
```

---

## 5. Verification & Pre-Flight Status

- TypeScript Compilation: `npm run typecheck` passed (0 errors)
- Linting: `npm run lint` passed (0 errors)
- Strict RLS & RBAC: Enforced in Postgres schema
