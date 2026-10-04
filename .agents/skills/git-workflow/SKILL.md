---
name: git-workflow
description: Enforces HackCC team Git collaboration guidelines, personal dev-<name> branch conventions, daily main-sync protocol, pre-flight validation (lint & typecheck), commit hygiene, CODEOWNERS PR workflows, and merge conflict resolution.
---

# HackCC 2026 Git Collaboration & Branching Workflow

This skill guides agents and team contributors on the standard Git workflow for HackCC 2026. Adhering to these conventions prevents merge conflicts, protects production stability, and keeps collaboration smooth across all team members.

---

## 🌟 The Simple 3-Step Daily Mental Model (Beginner-Friendly)

If you are non-technical or new to Git, don't worry! You only need to know 3 simple steps:

1. **When you start working**: Pull changes so your branch has everyone else's latest work (`git pull origin main`).
2. **While working**: Edit your assigned zone in `src/components/roadtrip/` (or ask your AI agent to help you style it).
3. **When you finish**: Push your changes to GitHub, click the green "Compare & pull request" button, and DM Tom!

> [!TIP]
> **Can you accidentally break the live website? NO!**
> You are working safely in your own personal `dev-<yourname>` sandbox branch. Nothing touches the live website until Tom checks your work and merges your Pull Request.

---

## 🗺️ Where is My Zone File?

Each team member is assigned a specific roadtrip zone component:

| Zone | Section Name | File Location |
| :--- | :--- | :--- |
| **Zone 1** | Hero (Hollywood Hills) | `src/components/roadtrip/Zone1Hero.tsx` |
| **Zone 2** | Event Info / Schedule (Inglewood Twilight) | `src/components/roadtrip/Zone2EventInfo.tsx` |
| **Zone 3** | About & Tracks (Santa Monica Pier) | `src/components/roadtrip/Zone3About.tsx` |
| **Zone 4** | Sponsors & Highway Overhead Sign | `src/components/roadtrip/Zone4Sponsors.tsx` |
| **Zone 5** | FAQ & Testimonials (PCH Coastal Drive) | `src/components/roadtrip/Zone5FAQQuotes.tsx` |
| **Zone 6** | Footer CTA (San Diego Sunset) | `src/components/roadtrip/Zone6FooterCTA.tsx` |

---

## 🤖 Instructions for AI Agents Working with Non-Technical Teammates

- **Be warm, clear, and avoid technical jargon**: Explain what you are doing in plain English.
- **Run the terminal commands for them**: Don't force non-technical contributors to type long terminal flags. Run the commands and report the result clearly.
- **When they say "I'm done" or "Save my work"**:
  1. Automatically run `npm run typecheck` to verify no errors.
  2. Stage their modified zone file (`git add src/components/roadtrip/...`).
  3. Create a clean commit with a descriptive message.
  4. Push to their `dev-<theirname>` branch.
  5. Give them the clear 5-step GitHub link and reminder to DM Tom.

---

## 1. Branch Naming Standard (`dev-<name>`)

Every developer working on HackCC 2026 has their own dedicated development branch:

```text
dev-<yourname>
```

### Examples:
- `dev-tom`
- `dev-rohan`
- `dev-dasha`
- `dev-kaden`
- `dev-jessy`
- `dev-valance`

### Branch Rules:
1. **Never commit directly to `main`**: All work must be developed on your personal `dev-<name>` branch.
2. **First-Time Setup (Agent Instruction)**:
   > If a team member asks for initial Git setup or does not yet have a personal branch, **ALWAYS ask for their first name first**:
   > *"What is your first name?"*
   > Once they respond, create and check out `dev-<firstname>` (lowercase, no spaces):
   > ```bash
   > git checkout main
   > git pull origin main
   > git checkout -b dev-<theirname>
   > git push -u origin dev-<theirname>
   > ```
3. **Sub-Branch Rule (Attendee Dashboard Only)**:
   > Sub-branches are **NOT** used for current website work or zones.
   > Sub-branches are **strictly reserved for the attendee dashboard** (`dev-<yourname>/attendee-dashboard`) when development on that feature begins.
   > For all current website work, everyone works and commits directly on their personal `dev-<yourname>` branch.

---

## 2. The Golden Rule: Sync from `main` Before Starting Work

> [!IMPORTANT]
> **ALWAYS pull the latest changes from `main` into your `dev-<name>` branch before starting any new coding session.**
> Other team members merge PRs into `main` continuously. Pulling before you code ensures your branch never drifts far behind, dramatically reducing merge conflicts later.

### Standard Morning / Session-Start Routine:
```bash
# 1. Ensure your working directory is clean
git status

# 2. Switch to your personal branch
git checkout dev-<yourname>

# 3. Fetch all remote changes
git fetch origin

# 4. Merge main into your branch
git pull origin main
```

---

## 3. Pre-Flight Check (Before Committing)

Before staging and committing your code, make sure TypeScript compiles with zero errors:

```bash
npm run typecheck
```

> [!CAUTION]
> If `npm run typecheck` fails, fix the type errors locally before committing. Never push code that breaks compilation!

---

## 4. Safe Staging & Commit Hygiene

### 1. Stage only relevant files:
Never use indiscriminate `git add .` without checking `git status`.
- ✅ **Stage specific files**: `git add src/components/roadtrip/Zone2EventInfo.tsx`
- ❌ Avoid committing untracked temporary files, scratch scripts, or local logs.
- 🚫 **NEVER commit secrets or `.env.local`**: `.env.local` contains sensitive credentials and is ignored in `.gitignore`. Always verify with `git status` that `.env.local` is not being tracked.

### 2. Commit Message Convention:
Write clear, descriptive commit messages following the Conventional Commits format:

| Prefix | Usage | Example |
| :--- | :--- | :--- |
| `feat:` | New component, page, or feature | `feat: add Zone 4 sponsor overhead highway sign` |
| `fix:` | Bug fix or styling fix | `fix: resolve mobile overflow on organizers grid` |
| `style:` | Pure visual polish, typography, CSS adjustments | `style: update hero typography to Bagel Fat One` |
| `refactor:` | Code restructuring without feature changes | `refactor: extract countdown timer into reusable hook` |
| `docs:` | Documentation updates (README, CONTRIBUTING, skills) | `docs: add git collaboration workflow guide` |
| `chore:` | Dependency bumps, configs, build scripts | `chore: update next.config.ts images domains` |

```bash
git commit -m "feat(zone2): update event info typography and responsive layout"
```

---

## 5. Pushing Changes & Next Steps (What to Tell the Contributor)

### Step 1: Push your branch to GitHub
```bash
git push origin dev-<yourname>
```

### Step 2: Next Steps Message for the Contributor
> [!IMPORTANT]
> **Agent Instruction**: Whenever a team member pushes their changes, always provide them with these clear next steps:
>
> 1. Go to the GitHub repository: **https://github.com/Tomy2years/hackcc-2026**
> 2. You will see a yellow banner at the top — click the green **"Compare & pull request"** button (or go to **Pull requests** > **New pull request** with base `main` ← compare `dev-<yourname>`).
> 3. Add a quick title and short summary of what you finished/updated in your zone.
> 4. Click **Create pull request**.
> 5. **DM Tom (@Tomy2years) on Discord or Slack** with your PR link so he can check your work and merge it into `main`!

---

## 6. What If You Hit a Merge Conflict?

> [!NOTE]
> **Resolving merge conflicts on `main` is Tom's job!**
> You don't need to stress about manually editing conflict markers or resolving git clashes.
>
> If `git pull origin main` ever says there is a merge conflict:
> 1. Cancel the merge cleanly and return your branch to safe state:
>    ```bash
>    git merge --abort
>    ```
> 2. **DM Tom (@Tomy2years) on Discord/Slack** and let him know which files had conflicts. He will help sync and merge your work cleanly.

---

## 7. Quick Git Cheatsheet

| Task | Command | Plain English Note |
| :--- | :--- | :--- |
| Check current branch & changed files | `git status` | Shows modified files |
| View what branch you are on | `git branch --show-current` | Quick sanity check |
| Review unstaged changes in detail | `git diff` | See exact line changes |
| Review changes already staged for commit | `git diff --staged` | Review what's about to be saved |
| Stage a specific file | `git add <file>` | Prepare file for saving |
| Unstage a file (keep changes) | `git restore --staged <file>` | Remove file from staging area |
| **Discard local changes in a file** | `git restore <file>` | ⚠️ **Reverts back to last saved/pushed commit!** |
| Switch to your dev branch | `git checkout dev-<yourname>` | Jump to your workspace |
| Pull latest main into your branch | `git pull origin main` | Daily start-of-day sync |
| Abort a conflict / stuck merge | `git merge --abort` | Safely cancel a merge |
| Temporarily park work in progress | `git stash` | Shelve edits to pull main cleanly |
| Restore parked work | `git stash pop` | Bring your edits back |
| View last 3 commits | `git log --oneline -n 3` | View recent saves |
| Verify TypeScript before push | `npm run typecheck` | Catch bugs before PR |

---

## 🆘 Beginner FAQ & Panic Button ("What do I do if...?")

### Q1: "Git says: 'Your local changes would be overwritten by merge' when I try to pull main"
- **Why this happens**: You have unsaved changes in your zone file from earlier, and Git wants to keep them safe before updating.
- **The 3-step fix**:
  ```bash
  git stash          # 1. Safely tucks your work away in a temporary pocket
  git pull origin main # 2. Grabs the latest updates from main
  git stash pop      # 3. Pulls your work back out of the pocket
  ```
  *(Or tell your AI agent: "Help me stash, pull main, and restore my work!")*

### Q2: "I made a big mess in my code and want to start over from my last save!"
> [!WARNING]
> **What `git restore` does**: Running `git restore <file>` will completely erase all your current uncommitted changes and return that file back to whatever your **last saved/pushed commit was**. Make sure you really want to throw away your recent unsaved edits before running this!
```bash
git restore src/components/roadtrip/Zone2EventInfo.tsx
```
*(Replace with your zone file name. Or tell your AI agent: "Undo my unsaved changes to Zone 2")*

### Q3: "How do I see my changes in my browser?"
- In your terminal, run:
  ```bash
  npm run dev
  ```
  Then open **http://localhost:3000** in Chrome/Safari/Edge. The site updates automatically whenever you save!

### Q4: "Can I accidentally break the live website or delete other people's work?"
- **NO!** You are working in your own isolated sandbox branch (`dev-<yourname>`). Nothing you do can affect anyone else's work or the live website until Tom reviews and approves your Pull Request. So feel free to experiment and have fun!


