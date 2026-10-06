# Beginner Developer Setup & Contribution Guide 🚀

Welcome to **HackCC 2026**! This guide is designed to set you up for success, whether you're building your very first web page or contributing a new feature to the hackathon website.

---

## 🛠️ Quick Start Setup (3 Steps)

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher) installed on your computer. You can check by running in your terminal:
```bash
node -v
```

### 2. Install Dependencies
Open your terminal inside this project directory and run:
```bash
npm install
```

### 3. Start Development Server
Run the local dev server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser!

---

## 🌿 Git Workflow: Personal Dev Branches (`dev-<name>`)

To prevent merge conflicts and keep our team synchronized:

### 1. Dedicated Dev Branch
Every contributor works on their personal development branch: `dev-<yourname>` (e.g., `dev-tom`, `dev-rohan`, `dev-kaden`, `dev-dasha`).
- If you don't have one yet:
  ```bash
  git checkout main
  git pull origin main
  git checkout -b dev-<yourname>
  git push -u origin dev-<yourname>
  ```

### 2. The Golden Rule: Always Pull `main` Before Coding
Other team members merge PRs into `main` continuously. Pulling before you code ensures your branch never drifts far behind:
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

### 3. Pre-Flight Checks Before Committing
Before creating a commit or opening a PR, always verify:
```bash
npm run lint
npm run typecheck
```

### 4. Commits & Pull Requests
- Follow conventional commit style: `feat:`, `fix:`, `style:`, `refactor:`, `docs:`.
- **Never commit `.env.local` or secrets.**
- Push to your branch: `git push origin dev-<yourname>`.
- **Open a Pull Request into `main`** on GitHub (click the green "Compare & pull request" button).
- **DM Tom (@Tomy2years)** on Discord with your PR link so he can review and merge your changes!

### 5. What If You Hit a Merge Conflict?
Resolving merge conflicts on `main` is Tom's job! If `git pull origin main` ever shows a conflict:
```bash
git merge --abort
```
Then DM Tom on Discord and let him know which files had conflicts. He'll help merge it cleanly.

---

## 📂 Repository Tour (Where Everything Goes)

Understanding the distinction between folders makes editing super easy:

```text
hackcc-2026/
├── public/                <-- STATIC ASSETS (served directly at http://localhost:3000/)
│   ├── images/            <-- Logos, illustrations, banners, SVGs, downloaded assets
│   └── favicon.ico
│
├── src/                   <-- ALL APPLICATION SOURCE CODE
│   ├── app/               <-- NEXT.JS PAGES & ROUTES (App Router)
│   │   ├── page.tsx       <-- Main homepage (SoCal Road Trip website)
│   │   ├── 2026/page.tsx  <-- Archived Spring 2026 website route
│   │   ├── design-system/ <-- Live visual style guide & UI component showcase
│   │   └── globals.css    <-- Tailwind CSS tokens, typography, and utility classes
│   │
│   ├── components/        <-- REACT UI COMPONENTS
│   │   ├── ui/            <-- Pre-built starter components (<Button />, <Card />, <Badge />)
│   │   └── roadtrip/      <-- Zone components for the homepage map (Zone1Hero, Zone2EventInfo...)
│   │
│   └── archive/           <-- PAST HACKATHON WEBSITES
│       └── 2026/          <-- Archived components and features from Spring 2026
```

### 🔑 Key Takeaways:
- **`public/`**: Put static images/assets here. You reference them in code as `/images/logo.png`.
- **`src/app/`**: Create new folders here to add new URL routes (e.g. `src/app/about/page.tsx` creates `http://localhost:3000/about`).
- **`src/components/`**: Put reusable React UI components here.

---

## 🎨 Design System & "Vibe" Guidelines

We want all pages on the site to share the same **cartoony, playful SoCal Road Trip vibe**.

### 1. Pre-built Utility Classes
Instead of writing complex CSS from scratch, use our built-in CSS classes:
- **Heading Font**: `.font-heading` or `.cartoony-title` (`Bagel Fat One`)
- **Body Font**: `.font-body` (`Montserrat Alternates`)
- **Buttons**: `.btn-primary`, `.btn-secondary`, `.btn-accent`
- **Cards**: `.card-roadtrip`, `.glass-panel`, `.sunset-card`
- **Badges**: `.badge-vibrant`, `.badge-glass`

### 2. Interactive Showcase Page
Visit **`http://localhost:3000/design-system`** in your browser while `npm run dev` is running!
You can visually inspect all color swatches, button styles, card designs, and copy-paste ready-to-use code snippets directly.

### 3. Button & Link Rule ⚠️
> **Always provide an explicit destination path for buttons and links** (e.g. `href="/2026"` or `href="https://discord.gg/..."`).
> **Avoid generic placeholder links** like `href="#"` or `href="www.website.com/#example"`.

---

## ⚙️ Useful Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the local dev server at `http://localhost:3000` |
| `npm run build` | Tests building the project for production (verifies no TypeScript/syntax errors) |
| `npm run lint` | Runs code checks for syntax and formatting consistency |

Happy coding! If you have any questions, reach out to the HackCC team! 🎉
