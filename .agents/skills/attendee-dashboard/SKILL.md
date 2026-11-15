---
name: attendee-dashboard
description: Complete architecture, feature requirements, data schemas, UI/UX guidelines, real-time protocols, threat modeling, and end-to-end user journeys for the HackCC 2026 Day-of Attendee Dashboard.
---

# HackCC 2026 Attendee Dashboard ("Hacker Mission Control") Specification

The **Attendee Dashboard** is the central digital hub used by hackers, mentors, volunteers, and organizers during the day of HackCC 2026 (November 21–22, 2026 at Orange Coast College). It acts as each hacker's personal cockpit throughout the 14-hour weekend journey.

---

## 1. Core Vision & Experience Philosophy

1. **The HackCC Pokédex ("Hack-Dex") as the Core Engagement Engine**:
   - Hackers are actively incentivized to explore workshops, meet sponsors, attend social activities, and try new tech through a nostalgic **Retro Game Boy / Pokédex-style badge collection system**.
   - Badges display locked mystery silhouettes (`???`), rarity tiers (`Common`, `Rare`, `Epic`, `Legendary`), retro sound chimes, and flavor lore.
   - A **live, competitive leaderboard** tracks top badge collectors in real time, competing for grand physical prizes (1st, 2nd, and 3rd place) awarded on stage at the closing ceremony.
2. **Mobile-First & One-Handed Usability**:
   - Over 75% of interactions on event day occur from smartphones while hackers walk between workshops, food lines, the hardware lab, and sponsor tables.
   - Key actions (displaying the check-in QR code, scanning a station badge, checking the schedule, pinging a mentor) must be reachable with a single thumb.
3. **Hybrid Badge Unlocking (Flexible & Fast)**:
   - **Hacker Scanner**: Hackers use their phone camera directly in the dashboard to scan short-window rotating QR codes placed at workshop rooms, sponsor booths, and social events (or enter a secret code).
   - **Organizer Scanner**: Event hosts and food volunteers scan the hacker's personal badge QR code for meal lines and exclusive milestones.
4. **Zero-Trust Security & Anti-Cheat**:
   - Hackathons are filled with smart engineering students who inspect network traffic, script API requests, and reverse-engineer code.
   - All critical validations (badge unlocking, rate limiting, meal duplication checks, role authorization) happen strictly on the server or in PostgreSQL RLS.
5. **Offline Resilience (Wi-Fi Dropout Proof)**:
   - Hackathon venue Wi-Fi networks will inevitably experience momentary congestion or drops.
   - The digital **Hacker Pass / QR Code**, **Wi-Fi credentials**, **unlocked Pokédex badges**, and **cached schedule** MUST render instantly from `localStorage` even if offline.
6. **California Road Trip Aesthetic**:
   - Retain the authentic HackCC theme: California twilight tones (`#020617`, `#0B0F19`), Golden Hour amber highlights (`#F59E0B`, `#FBBF24`), Freeway green badge accents (`#15803D`), and bold, unboxed `Bagel Fat One` typography for stats and timers.
   - Avoid generic AI-vibecoded floating glass boxes. Clean, high-contrast, human-crafted layout.

---

## 2. Threat Modeling & Vulnerability Analysis (Anti-Cheat & Security)

Because the Pokédex leaderboard offers high-value physical prizes and handles sensitive hacker logistics, the system enforces a strict threat model:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                THREAT MODEL MATRIX                                     │
├───────────────────────────────┬───────────────────────────────┬────────────────────────┤
│ Attack Vector                 │ Potential Exploitation        │ Engineering Mitigation │
├───────────────────────────────┼───────────────────────────────┼────────────────────────┤
│ 1. Station QR Screenshot Leak │ Hacker photos workshop QR &   │ Short-Window TOTP (20s)│
│                               │ texts it to absent friends.   │ + Camera stream only   │
│                               │                               │ + Active schedule check│
├───────────────────────────────┼───────────────────────────────┼────────────────────────┤
│ 2. Secret Code Brute-Forcing  │ Script loops 4-letter codes or│ Private Secret Vault   │
│    & Database Extraction      │ queries Supabase client table.│ (private schema hash)  │
│                               │                               │ + Atomic RPC claim func│
│                               │                               │ + Upstash rate limiting│
├───────────────────────────────┼───────────────────────────────┼────────────────────────┤
│ 3. Concurrent Replay Spams    │ Burst of 50 curl requests to  │ Postgres UNIQUE rules  │
│                               │ claim duplicate badges/food.  │ + Atomic DB procedures.│
├───────────────────────────────┼───────────────────────────────┼────────────────────────┤
│ 4. Client Cache Tampering     │ Hacker edits localStorage to  │ DB is source of truth; │
│                               │ inject fake unlocked badges.  │ Leaderboard ignores LS.│
├───────────────────────────────┼───────────────────────────────┼────────────────────────┤
│ 5. Privilege Escalation &     │ Hacker calls volunteer scanner│ Supabase RBAC / claims │
│    Search Path Hijacking      │ or modifies schema objects.   │ + SET search_path pinned│
│                               │                               │ + Scoped RPC functions.│
├───────────────────────────────┼───────────────────────────────┼────────────────────────┤
│ 6. QR Pass Sharing &          │ Pass screenshot shared or     │ High-entropy UUID pass │
│    Offline Paradox            │ pass breaks when Wi-Fi drops. │ + Animated SVG ticker  │
│                               │                               │ + Physical wristband.  │
├───────────────────────────────┼───────────────────────────────┼────────────────────────┤
│ 7. Demographic Takeover       │ Attacker guesses Name + DOB   │ Verified OAuth email   │
│    & Account Hijacking        │ to hijack attendee account.   │ binding + OTP fallback.│
│                               │                               │ Zero-phone policy.     │
├───────────────────────────────┼───────────────────────────────┼────────────────────────┤
│ 8. Mentorship Flooding &      │ Hacker spams 500 tickets;     │ Single-active-ticket   │
│    Claim Race Conditions      │ mentors overwrite claims.     │ partial index + atomic │
│                               │                               │ claim_ticket() RPC.    │
├───────────────────────────────┼───────────────────────────────┼────────────────────────┤
│ 9. Team Hijack & Tampering    │ Teammate alters Devpost link; │ Leader-only edit rules │
│                               │ RLS blocks invite code join.  │ + max 4 members check  │
│                               │                               │ + atomic join_team().  │
└───────────────────────────────┴───────────────────────────────┴────────────────────────┘
```

### Deep-Dive Defense Details:

1. **Short-Window Station QR Codes (20–30s TOTP) & Camera Stream Binding**:
   - Workshop projectors display a dynamic QR code generated using HMAC-SHA256 (`station_id + timestamp_bucket + secret_salt`). The code rotates every 20–30 seconds.
   - The dashboard scanner binds directly to `navigator.mediaDevices.getUserMedia` and disables `<input type="file">`, preventing hackers from scanning gallery screenshots sent via Discord or AirDrop.
2. **Server-Side Time Window Gating**:
   - Badge unlock requests for workshops are rejected if received outside the active workshop schedule window (e.g., Saturday 2:00 PM – 3:15 PM) with a grace buffer of 5 minutes.
3. **Private Secret Vault (Isolated from Client RLS)**:
   - Secret codes are stored in `private.pokedex_badge_secrets` (outside the `public` schema accessible via Supabase client libraries).
   - Codes are stored as salted cryptographic hashes (`crypt(code, gen_salt('bf'))` or HMAC-SHA256).
   - Hackers querying `supabase.from('pokedex_badges').select('*')` receive badge metadata and clues, but zero secret codes.
4. **Hardened RBAC & Search Path Pinning**:
   - All `SECURITY DEFINER` helper functions (`is_organizer`, `is_volunteer`, `is_mentor`) explicitly set `SET search_path = public, pg_temp;` to prevent search-path hijacking attacks.
   - The `user_roles` table has RLS enabled with `REVOKE ALL ON user_roles FROM anon, authenticated;`, ensuring role modification occurs strictly via backend administrative credentials.
5. **Physical Wristband Binding + Animated Live Ticker (Resolving the Offline Paradox)**:
   - Hackathon Wi-Fi will inevitably stutter in crowded auditoriums. To make the digital pass 100% offline-resilient without leaking private signing keys in client bundles:
     - The pass embeds a high-entropy static UUID token (`qr_token`) cached in `localStorage`.
     - An active CSS/Canvas animated ticker renders the real-time device clock and dynamic color gradient to deter static screenshots.
     - At morning registration, volunteers verify physical student ID, scan the pass via `check_in_attendee()`, and attach a tamper-evident wristband.
     - For subsequent meals, volunteers inspect the wristband and scan the pass. Database-level `UNIQUE(attendee_id, meal_type)` prevents duplicate meal claims.
6. **Strict Verified Email Binding (Eliminating Name + DOB Guessing)**:
   - Hackers bind to their accepted application strictly through their **verified OAuth email** (`auth.users.email = applications.email`).
   - If an attendee logged in using an alternate email, they must verify a 6-digit one-time code sent to their registered application email.
   - Eliminates all demographic enumeration and brute-force takeover attacks.
   - Persistent DB stores solely `full_name`, `college`, `tshirt_size`, `dietary_restrictions`, and `qr_token`. Blast radius is zero.
7. **Mentorship Queue Rate Limiting & Atomic Claiming**:
   - A unique partial index enforces that a hacker can have at most **1 active ticket** in `queued` or `in_progress` status.
   - An atomic procedure `claim_mentor_ticket` verifies `status = 'queued'` and updates `claimed_by = auth.uid()` in a single transaction, preventing race conditions between mentors.
8. **Team Submission Integrity & Max Size Enforcement**:
   - Team size is capped at 4 hackers via database constraints.
   - Updates to `devpost_url` and `github_url` are restricted to the team `leader`.
   - A dedicated `join_team(p_invite_code)` RPC avoids RLS SELECT deadlocks when non-members join.

---

## 3. End-to-End User Journeys

### Journey 1: The Hacker / Attendee Flow
1. **Morning Arrival & Check-In**:
   - Hacker opens `hackcc.org/dashboard` on their phone.
   - Taps **"Pass"** tab: A high-contrast digital card displays their name, college, T-shirt size, dietary notes, and dynamic QR code.
   - Volunteer checks student ID, scans QR pass via `check_in_attendee()`, attaches a physical wristband, and awards the swag bag.
   - Badge `#001: Checked In` unlocks automatically (+10 XP).
   - Hacker pass caches locally in `localStorage` so it functions even if Wi-Fi cuts out in the crowd.
2. **Opening Ceremony & The Hacking Sprint**:
   - Dashboard radar activates: **"HACKING ENDS IN: 13:58:20"**.
   - Hacker navigates to **"Dex"** (Pokédex): Sees badge `#001: Checked In` unlocked!
   - Other badges are dark mystery silhouettes (`???`) with cryptic hints.
3. **Workshop & Sponsor Badge Hunting (The Pokédex Loop)**:
   - Hacker attends the 2:00 PM *Intro to Next.js & AI* workshop in Room 101.
   - At the end of the workshop, the presenter puts up the rotating 20-second QR slide.
   - Hacker taps **"Scan Station"** in `/dashboard/dex`, points camera at screen:
     - 🔊 Retro 8-bit chime sounds!
     - 🌟 Screen pops with colorful pixel art: *"Badge #012: Neural Navigator Unlocked (+25 XP)!"*
   - Hacker checks `/dashboard/leaderboard`: They jumped from 48th to 14th place!
4. **Lunch & Boba Breaks**:
   - Pinned alert banner broadcasts: *"🍕 Lunch is served in the Student Center!"*
   - In the food line, volunteer verifies wristband and scans hacker pass:
     - Badge `#004: Pit Stop Refuel` unlocks automatically.
     - Second attempt to get in line results in a friendly rejection on the volunteer's scanner.
5. **Calling a Roadside Mentor**:
   - At 8:30 PM, hacker encounters a nasty Docker deployment bug.
   - Taps **"Mentors"** ➔ Submits ticket: *"Docker container crashing on AWS ECS (Table 24)"*. System allows max 1 active ticket per team.
   - Ticket enters real-time queue. Within 4 minutes: *"Mentor Alex has claimed your ticket and is walking to Table 24."*
   - Alex arrives, helps fix the issue, and marks ticket resolved. Hacker awards 5 stars.
6. **Sunday Morning Final Countdown & Project Submission**:
   - Top banner warns: *"⏰ 1 Hour until Devpost Soft Deadline!"*
   - Team leader opens **"Team"** tab: Verifies pre-submission checklist (Project Name, GitHub URL, Devpost URL). Non-leaders have view-only access to prevent accidental tampering.
   - Team leader clicks submit: Badge `#028: Crossed the Finish Line (+50 XP)` unlocks!
7. **Sunday Expo & Closing Ceremony**:
   - Team tab reveals their assigned judging table: *"Expo Table 34 (Section B, 1:15 PM)"*.
   - Closing ceremony: Hackathon leads project the live `/dashboard/leaderboard` on the auditorium screen.
   - Hacker ranks #2 on the podium and walks up on stage to win the mechanical keyboard & monitor grand prize!

---

### Journey 2: The Volunteer Flow
1. **Login & Role Setup**:
   - Volunteer logs in via `/volunteer/scan`. Server confirms `role = 'volunteer'`.
2. **Fast Camera Scanner Interface**:
   - Large, high-speed camera viewfinder.
   - Mode selector buttons: `Check-in`, `Lunch D1`, `Dinner D1`, `Midnight Boba`, `Breakfast D2`, `Lunch D2`, `Swag Bag`.
3. **Scan Execution**:
   - Points phone at attendee's QR pass:
     - **Success**: Flashes bright green screen, sounds positive beep, displays: *"John Doe (Orange Coast College) - Adult M - Vegetarian - APPROVED"*.
     - **Duplicate / Already Claimed**: Flashes bright red screen, vibrates phone, displays: *"ALREADY CLAIMED at 12:34 PM by Volunteer Sarah"*.
     - **Invalid Token**: Flashes warning: *"Unrecognized or expired QR code"*.
   - All scan actions call atomic procedures (`check_in_attendee` or `record_meal_scan`).

---

### Journey 3: The Mentor Flow
1. **Lounge Dashboard**:
   - Mentors open `/dashboard/mentors`.
   - Mentors see an active queue sorted by wait time and filtered by category (`Frontend`, `AI/ML`, `Cloud`, `Hardware`).
2. **Claiming Tickets**:
   - Mentor clicks *"Claim Ticket #14"* (AI/ML question at Table 18).
   - Atomic RPC `claim_mentor_ticket` transitions status to `in_progress`; hacker immediately receives a push alert with the mentor's name.
3. **Resolution**:
   - Mentor walks to Table 18, assists the team, and taps *"Resolve Ticket"*.

---

### Journey 4: The Lead Organizer Flow
1. **Live Situation Control**:
   - Admin panel at `/organizers/hub`.
   - Controls schedule changes (modifying room assignments updates all attendees' screens within 500ms via Supabase Realtime).
2. **Urgent Broadcasts**:
   - One-click broadcast: Type message, select tag (`Urgent`, `Food`, `Workshop`), and hit send. Triggers top-banner alert across all active attendee devices.
3. **Leaderboard Audit**:
   - Before closing ceremony, organizers view the audit log to confirm all top 3 leaderboard scores originated from authentic scans before announcing winners on stage.

---

## 4. Complete Database Schema & Supabase Architecture

All tables must enforce strict Row Level Security (RLS) as mandated by `secure-application-system`.

```sql
-- 1. Role-Based Access Control (RBAC) & Hardened Security Functions
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'organizer', 'volunteer', 'mentor', 'hacker')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

-- Restrict mutations to service_role only
REVOKE INSERT, UPDATE, DELETE ON public.user_roles FROM anon, authenticated;

CREATE OR REPLACE FUNCTION public.is_organizer(uid UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = uid AND role IN ('organizer', 'admin')
  );
$$ LANGUAGE sql SECURITY DEFINER SET search_path = public, pg_temp;

CREATE OR REPLACE FUNCTION public.is_volunteer(uid UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = uid AND role IN ('volunteer', 'organizer', 'admin')
  );
$$ LANGUAGE sql SECURITY DEFINER SET search_path = public, pg_temp;

CREATE OR REPLACE FUNCTION public.is_mentor(uid UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = uid AND role IN ('mentor', 'organizer', 'admin')
  );
$$ LANGUAGE sql SECURITY DEFINER SET search_path = public, pg_temp;

-- 2. Pokédex Badges Master Catalog & Private Secret Vault
CREATE TABLE public.pokedex_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  badge_number INT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('workshop', 'food', 'social', 'sponsor', 'milestone', 'secret')),
  rarity TEXT NOT NULL CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  xp_points INT NOT NULL DEFAULT 10,
  description TEXT NOT NULL,
  hint TEXT NOT NULL,
  icon_url TEXT NOT NULL,
  valid_from TIMESTAMPTZ, -- Active time window start
  valid_until TIMESTAMPTZ, -- Active time window end
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.pokedex_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authenticated can view active badges"
  ON public.pokedex_badges FOR SELECT
  TO authenticated USING (is_active = TRUE);

CREATE POLICY "Only organizers can manage badges"
  ON public.pokedex_badges FOR ALL
  TO authenticated USING (public.is_organizer(auth.uid()));

-- Private secret vault: isolates secrets completely from public client queries
CREATE TABLE IF NOT EXISTS private.pokedex_badge_secrets (
  badge_id UUID PRIMARY KEY REFERENCES public.pokedex_badges(id) ON DELETE CASCADE,
  secret_code_hash TEXT NOT NULL, -- Salted hash of secret promo code
  totp_salt TEXT NOT NULL,        -- Salt for rotating HMAC workshop codes
  created_at TIMESTAMPTZ DEFAULT NOW()
);

REVOKE ALL ON private.pokedex_badge_secrets FROM anon, authenticated;

-- 3. Attendee Check-In & Profiles
CREATE TABLE public.attendee_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  application_id UUID REFERENCES public.applications(id),
  full_name TEXT NOT NULL,
  college TEXT NOT NULL,
  tshirt_size TEXT NOT NULL,
  dietary_restrictions TEXT,
  qr_token TEXT UNIQUE NOT NULL,
  total_xp INT NOT NULL DEFAULT 0,
  total_badges INT NOT NULL DEFAULT 0,
  checked_in_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.attendee_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Attendees can view their own profile"
  ON public.attendee_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Volunteers and organizers can view attendee profiles"
  ON public.attendee_profiles FOR SELECT
  USING (public.is_volunteer(auth.uid()));

-- Scoped access: Prevent arbitrary client profile updates; check-in handled via check_in_attendee RPC
REVOKE UPDATE, INSERT, DELETE ON public.attendee_profiles FROM anon, authenticated;

-- 4. Attendee Badge Collection (Pokédex Unlocks)
CREATE TABLE public.attendee_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES public.pokedex_badges(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  unlocked_via TEXT CHECK (unlocked_via IN ('camera_scan', 'secret_code', 'organizer_scan', 'system_event')),
  UNIQUE(user_id, badge_id) -- Database idempotency: strictly prevents duplicate unlocks
);

ALTER TABLE public.attendee_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Attendees can view their own unlocked badges"
  ON public.attendee_badges FOR SELECT
  USING (auth.uid() = user_id);

-- Block direct client INSERT; badges must be claimed through verified procedures
REVOKE INSERT, UPDATE, DELETE ON public.attendee_badges FROM anon, authenticated;

-- Trigger to increment profile total_xp and total_badges cache atomically
CREATE OR REPLACE FUNCTION public.on_badge_unlocked()
RETURNS TRIGGER AS $$
DECLARE
  v_xp INT;
BEGIN
  SELECT xp_points INTO v_xp FROM public.pokedex_badges WHERE id = NEW.badge_id;
  UPDATE public.attendee_profiles
  SET total_xp = total_xp + COALESCE(v_xp, 0),
      total_badges = total_badges + 1
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

CREATE TRIGGER trg_badge_unlocked
  AFTER INSERT ON public.attendee_badges
  FOR EACH ROW EXECUTE FUNCTION public.on_badge_unlocked();

-- 5. Atomic Badge Unlocking Procedures (Anti-Cheat & Rate Gated)
CREATE OR REPLACE FUNCTION public.claim_badge_by_code(p_badge_id UUID, p_code TEXT)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp AS $$
DECLARE
  v_badge RECORD;
  v_secret RECORD;
  v_already_unlocked BOOLEAN;
BEGIN
  -- 1. Verify caller is checked in at venue
  IF NOT EXISTS (SELECT 1 FROM public.attendee_profiles WHERE id = auth.uid() AND checked_in_at IS NOT NULL) THEN
    RAISE EXCEPTION 'Hacker must be checked in at OCC to claim badges';
  END IF;

  -- 2. Verify badge exists and is active
  SELECT * INTO v_badge FROM public.pokedex_badges WHERE id = p_badge_id AND is_active = TRUE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Badge not found or inactive'; END IF;

  -- 3. Verify schedule time window
  IF v_badge.valid_from IS NOT NULL AND NOW() < v_badge.valid_from THEN
    RAISE EXCEPTION 'Badge is not active yet';
  END IF;
  IF v_badge.valid_until IS NOT NULL AND NOW() > v_badge.valid_until THEN
    RAISE EXCEPTION 'Badge unlock window has expired';
  END IF;

  -- 4. Check if already unlocked
  SELECT EXISTS (
    SELECT 1 FROM public.attendee_badges WHERE user_id = auth.uid() AND badge_id = p_badge_id
  ) INTO v_already_unlocked;
  IF v_already_unlocked THEN
    RETURN jsonb_build_object('status', 'already_unlocked', 'xp', v_badge.xp_points);
  END IF;

  -- 5. Verify secret code hash
  SELECT * INTO v_secret FROM private.pokedex_badge_secrets WHERE badge_id = p_badge_id;
  IF NOT FOUND OR v_secret.secret_code_hash != crypt(UPPER(TRIM(p_code)), v_secret.secret_code_hash) THEN
    RAISE EXCEPTION 'Invalid secret code';
  END IF;

  -- 6. Insert badge atomically
  INSERT INTO public.attendee_badges (user_id, badge_id, unlocked_via)
  VALUES (auth.uid(), p_badge_id, 'secret_code');

  RETURN jsonb_build_object('status', 'success', 'name', v_badge.name, 'xp', v_badge.xp_points);
END;
$$;

-- 6. Check-In & Scanner Procedures (Scoped Volunteer Authorization)
CREATE OR REPLACE FUNCTION public.check_in_attendee(p_qr_token TEXT)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp AS $$
DECLARE
  v_attendee RECORD;
  v_badge_id UUID;
BEGIN
  IF NOT public.is_volunteer(auth.uid()) THEN
    RAISE EXCEPTION 'Unauthorized: Volunteer role required';
  END IF;

  SELECT * INTO v_attendee FROM public.attendee_profiles WHERE qr_token = p_qr_token;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Invalid attendee QR pass';
  END IF;

  IF v_attendee.checked_in_at IS NOT NULL THEN
    RETURN jsonb_build_object('status', 'already_checked_in', 'name', v_attendee.full_name, 'time', v_attendee.checked_in_at);
  END IF;

  UPDATE public.attendee_profiles
  SET checked_in_at = NOW()
  WHERE id = v_attendee.id;

  -- Automatically award Badge #001: Checked In
  SELECT id INTO v_badge_id FROM public.pokedex_badges WHERE badge_number = 1;
  IF v_badge_id IS NOT NULL THEN
    INSERT INTO public.attendee_badges (user_id, badge_id, unlocked_via)
    VALUES (v_attendee.id, v_badge_id, 'organizer_scan')
    ON CONFLICT (user_id, badge_id) DO NOTHING;
  END IF;

  RETURN jsonb_build_object('status', 'success', 'name', v_attendee.full_name, 'college', v_attendee.college, 'tshirt', v_attendee.tshirt_size, 'diet', v_attendee.dietary_restrictions);
END;
$$;

-- 7. High-Performance Live Leaderboard View
CREATE OR REPLACE VIEW public.pokedex_leaderboard AS
SELECT 
  p.id AS user_id,
  p.full_name,
  p.college,
  p.total_badges,
  p.total_xp,
  RANK() OVER (ORDER BY p.total_xp DESC, p.total_badges DESC) AS rank
FROM public.attendee_profiles p
WHERE p.checked_in_at IS NOT NULL;

-- 8. Teams & Project Submissions (Leader-Only Edits & Max 4 Members)
CREATE TABLE public.teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  invite_code VARCHAR(8) UNIQUE NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  project_name TEXT,
  project_description TEXT,
  github_url TEXT,
  devpost_url TEXT,
  table_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' CHECK (role IN ('leader', 'member')),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id) -- A hacker belongs to exactly 1 team
);

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team members can view their own team"
  ON public.teams FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE team_members.team_id = teams.id AND team_members.user_id = auth.uid()
    )
  );

-- Only team LEADER can update project submission URLs
CREATE POLICY "Team leader can update project submission"
  ON public.teams FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE team_members.team_id = teams.id 
        AND team_members.user_id = auth.uid() 
        AND team_members.role = 'leader'
    )
  );

-- Atomic Join Team RPC to avoid RLS lookup deadlock and enforce 4-member limit
CREATE OR REPLACE FUNCTION public.join_team(p_invite_code TEXT)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp AS $$
DECLARE
  v_team RECORD;
  v_member_count INT;
BEGIN
  IF EXISTS (SELECT 1 FROM public.team_members WHERE user_id = auth.uid()) THEN
    RAISE EXCEPTION 'You are already in a team. Leave your current team first.';
  END IF;

  SELECT * INTO v_team FROM public.teams WHERE invite_code = UPPER(TRIM(p_invite_code));
  IF NOT FOUND THEN RAISE EXCEPTION 'Invalid team invite code'; END IF;

  SELECT COUNT(*) INTO v_member_count FROM public.team_members WHERE team_id = v_team.id;
  IF v_member_count >= 4 THEN
    RAISE EXCEPTION 'Team is full (maximum 4 hackers per team)';
  END IF;

  INSERT INTO public.team_members (team_id, user_id, role)
  VALUES (v_team.id, auth.uid(), 'member');

  RETURN jsonb_build_object('status', 'success', 'team_name', v_team.name);
END;
$$;

-- 9. Mentorship Help Queue (Single Active Ticket Constraint)
CREATE TABLE public.mentor_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hacker_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  table_location TEXT NOT NULL,
  topic TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'queued' CHECK (status IN ('queued', 'claimed', 'in_progress', 'resolved', 'cancelled')),
  claimed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  claimed_at TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ
);

ALTER TABLE public.mentor_tickets ENABLE ROW LEVEL SECURITY;

-- Anti-Spam: A hacker can have at most ONE active ticket
CREATE UNIQUE INDEX idx_single_active_ticket 
  ON public.mentor_tickets (hacker_id) 
  WHERE status IN ('queued', 'in_progress');

CREATE POLICY "Hackers view own tickets"
  ON public.mentor_tickets FOR SELECT
  USING (auth.uid() = hacker_id);

CREATE POLICY "Hackers insert own tickets"
  ON public.mentor_tickets FOR INSERT
  WITH CHECK (auth.uid() = hacker_id);

CREATE POLICY "Hackers cancel own pending tickets"
  ON public.mentor_tickets FOR UPDATE
  USING (auth.uid() = hacker_id AND status = 'queued')
  WITH CHECK (auth.uid() = hacker_id AND status = 'cancelled');

CREATE POLICY "Mentors and organizers can view all tickets"
  ON public.mentor_tickets FOR SELECT
  USING (public.is_mentor(auth.uid()));

-- Atomic mentor claim procedure (prevents race condition & claim collisions)
CREATE OR REPLACE FUNCTION public.claim_mentor_ticket(p_ticket_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp AS $$
BEGIN
  IF NOT public.is_mentor(auth.uid()) THEN RAISE EXCEPTION 'Unauthorized'; END IF;

  UPDATE public.mentor_tickets
  SET status = 'in_progress', claimed_by = auth.uid(), claimed_at = NOW()
  WHERE id = p_ticket_id AND status = 'queued';

  RETURN FOUND;
END;
$$;

-- 10. Meal & Swag Scans (Double Claim Prevention)
CREATE TABLE public.meal_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attendee_id UUID REFERENCES public.attendee_profiles(id),
  meal_type TEXT NOT NULL CHECK (meal_type IN ('lunch_d1', 'dinner_d1', 'midnight_snack', 'breakfast_d2', 'lunch_d2', 'swag_bag')),
  scanned_by UUID REFERENCES auth.users(id),
  scanned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(attendee_id, meal_type) -- DB-level double claim prevention
);

ALTER TABLE public.meal_scans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Attendees view their own meal scans"
  ON public.meal_scans FOR SELECT
  USING (auth.uid() = attendee_id);

CREATE POLICY "Volunteers can record meal scans"
  ON public.meal_scans FOR INSERT
  WITH CHECK (public.is_volunteer(auth.uid()) AND scanned_by = auth.uid());

-- 11. Live Announcements
CREATE TABLE public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('urgent', 'food', 'workshop', 'general', 'deadline')),
  is_pinned BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authenticated can view announcements"
  ON public.announcements FOR SELECT
  TO authenticated USING (TRUE);

CREATE POLICY "Only organizers can manage announcements"
  ON public.announcements FOR ALL
  TO authenticated USING (public.is_organizer(auth.uid()));
```

---

## 5. UI Layout & Navigation Structure

### Route Structure
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

### Mobile Bottom Navigation Bar (Persistent)
```tsx
// Persistent bottom navigation on mobile with thumb-friendly touch targets
<nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md border-t border-white/10 sm:hidden">
  <div className="grid grid-cols-5 h-16">
    <NavLink href="/dashboard" icon={Home} label="Hub" />
    <NavLink href="/dashboard/dex" icon={Gamepad2} label="Dex" />
    <NavLink href="/dashboard/leaderboard" icon={Trophy} label="Rank" />
    <NavLink href="/dashboard/pass" icon={QrCode} label="Pass" />
    <NavLink href="/dashboard/schedule" icon={Calendar} label="Timeline" />
  </div>
</nav>
```

---

## 6. Offline & Reliability Best Practices

1. **Pokédex & Pass Offline Caching**:
   - Save the user's `unlocked_badge_ids`, `qr_token`, `full_name`, `college`, and `cached_schedule` in `localStorage` under `hackcc_cached_dex`.
   - If the network drops, the Pokédex still displays all collected badges, silhouette placeholders, and the QR pass without waiting for network revalidation.
2. **Offline Pass & Physical Wristband Binding**:
   - The digital QR pass encodes the static high-entropy `qr_token` alongside an active, client-side SVG animated clock to deter static screenshots.
   - Wristbands distributed at registration verify physical identity and attendance.
3. **Scan Queueing & Schedule Window Sync**:
   - If a hacker scans a badge while offline, queue the unlock payload in IndexedDB/localStorage.
   - When connection is restored, `claim_badge_by_code` verifies the payload against active workshop schedule boundaries.
4. **Graceful Realtime Reconnection**:
   - Listen for Supabase Realtime channel status (`SUBSCRIBED`, `CLOSED`, `CHANNEL_ERROR`).
   - If disconnected, poll leaderboard and announcements every 45 seconds as a fallback.
