// Browser checks for the public site and the application form.
//
// Run against a dev server in dry-run mode so nothing reaches the sheet:
//   REGISTRATION_DRY_RUN=ok NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA npx next dev -p 3100
//   BASE_URL=http://localhost:3100 node tests/e2e/site.mjs
// (1x00000000000000000000AA is Cloudflare's published always-pass test key.)
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const BASE = process.env.BASE_URL ?? "http://localhost:3100";
const SHOTS = process.env.SHOTS_DIR ?? "";
const WIDTHS = [375, 768, 1024, 1440];

let failures = 0;
const check = (ok, label) => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
  if (!ok) failures++;
};

const browser = await chromium.launch();
if (SHOTS) await mkdir(SHOTS, { recursive: true });

// ── Layout at every width ──────────────────────────────────────────────────
for (const path of ["/", "/organizers", "/apply/organizer", "/apply"]) {
  for (const width of WIDTHS) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const res = await page.goto(BASE + path, { waitUntil: "networkidle" });
    check(res.ok(), `${path} @${width} loads (${res.status()})`);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    check(overflow <= 0, `${path} @${width} no horizontal scroll (${overflow}px)`);
    check((await page.locator("h1").count()) === 1, `${path} @${width} has one h1`);
    check((await page.locator("main#main").count()) === 1, `${path} @${width} has main#main`);
    const small = await page.evaluate(() =>
      [...document.querySelectorAll("main a[href], main button, header a[href], header button")]
        .filter(el => {
          const r = el.getBoundingClientRect();
          const style = getComputedStyle(el);
          return r.width > 0 && style.visibility !== "hidden" && !el.classList.contains("sr-only") && r.height < 44 && !el.closest("p, dd, li p");
        })
        .map(el => `${el.tagName} "${el.textContent.trim().slice(0, 30)}" ${Math.round(el.getBoundingClientRect().height)}px`)
    );
    check(small.length === 0, `${path} @${width} targets ≥44px${small.length ? `: ${small.slice(0, 4).join("; ")}` : ""}`);
    if (SHOTS && (width === 375 || width === 1440)) {
      await page.screenshot({ path: `${SHOTS}/${path.replace(/\//g, "_") || "_home"}-${width}.png`, fullPage: true });
    }
    await page.close();
  }
}

// ── Skip link, anchors, mobile menu, FAQ ───────────────────────────────────
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  check((await page.evaluate(() => document.activeElement?.textContent)) === "Skip to main content", "skip link is first in tab order");

  for (const id of ["about", "projects", "sponsors", "faq", "details", "apply"]) {
    check((await page.locator(`#${id}`).count()) === 1, `anchor #${id} exists once`);
  }
  await page.locator('header a[href="/#sponsors"]').first().click().catch(() => page.goto(BASE + "/#sponsors"));
  await page.waitForTimeout(1500); // smooth scroll
  const top = await page.evaluate(() => document.getElementById("sponsors-title").getBoundingClientRect().top);
  check(top >= 0 && top < 300, `/#sponsors lands at the sponsors heading (top ${Math.round(top)}px)`);

  const firstQ = page.locator("#faq button[aria-expanded]").first();
  await firstQ.click();
  check((await firstQ.getAttribute("aria-expanded")) === "true", "FAQ question opens");
  await page.close();
}
{
  const page = await browser.newPage({ viewport: { width: 375, height: 800 } });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const menuButton = page.locator("header button[aria-expanded]");
  await menuButton.click();
  check((await menuButton.getAttribute("aria-expanded")) === "true", "mobile menu opens");
  const focusedInMenu = await page.evaluate(() => !!document.activeElement?.closest("header nav, header [id]"));
  check(focusedInMenu, "focus moves into the mobile menu");
  await page.keyboard.press("Escape");
  check((await menuButton.getAttribute("aria-expanded")) === "false", "Escape closes the mobile menu");
  check(await menuButton.evaluate(el => el === document.activeElement), "focus returns to the menu button");
  await page.close();
}

// ── Team filters ───────────────────────────────────────────────────────────
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE + "/organizers", { waitUntil: "networkidle" });
  const filters = page.locator('[role="group"][aria-label="Filter by team"] button');
  const labels = await filters.allTextContents();
  check(!labels.some(l => /marketing/i.test(l)), `no empty team filters (${labels.join(", ")})`);
  for (let i = 1; i < (await filters.count()); i++) {
    await filters.nth(i).click();
    const n = await page.locator("main ul > li h3").count();
    check(n > 0, `filter "${labels[i]}" shows ${n} people`);
  }
  await page.close();
}

// ── Application form ───────────────────────────────────────────────────────
async function fillToReview(page) {
  await page.goto(BASE + "/apply", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  check(
    await page
      .waitForFunction(() => document.activeElement?.id === "apply-name", null, { timeout: 3000 })
      .then(() => true, () => false),
    "empty Continue focuses the first invalid field"
  );
  check((await page.locator("#apply-name-error").count()) === 1, "inline error is shown and linked");
  check((await page.locator("#apply-name").getAttribute("aria-describedby"))?.includes("apply-name-error"), "error is tied with aria-describedby");

  await page.fill("#apply-name", "Test Applicant");
  await page.fill("#apply-email", "test@example.com");
  await page.fill("#apply-phone", "714-555-0199");
  await page.click("#apply-college");
  await page.keyboard.type("orange coast");
  await page.keyboard.press("Enter");
  await page.check("#apply-age");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  check((await page.locator("h2", { hasText: "Interests" }).count()) === 1, "step 2 reached");

  await page.check("#apply-interest-0");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.check("#apply-size-M");
  await page.fill("#apply-dietary", "None");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  check((await page.locator("h2", { hasText: "Review and submit" }).count()) === 1, "review step reached");

  // Values survive going back and forth.
  await page.getByRole("button", { name: "Back", exact: true }).click();
  check((await page.inputValue("#apply-dietary")) === "None", "answers are kept after Back");
  await page.getByRole("button", { name: "Continue", exact: true }).click();

  await page.check("#apply-coc");
  // Wait for the Turnstile test key to issue a token.
  await page.waitForFunction(() => document.querySelector('input[name="cf-turnstile-response"]')?.value, null, { timeout: 20000 }).catch(() => {});
  await page.waitForTimeout(500);
}

{
  const page = await browser.newPage({ viewport: { width: 375, height: 800 } });
  await fillToReview(page);
  // A network failure keeps the answers and explains what happened.
  await page.route("**/apply", route => (route.request().method() === "POST" ? route.abort() : route.continue()));
  await page.getByRole("button", { name: "Submit application" }).click();
  await page.locator('[role="alert"]', { hasText: "Not submitted" }).waitFor({ timeout: 10000 }).catch(() => {});
  check((await page.locator('[role="alert"]', { hasText: "couldn't reach the server" }).count()) === 1, "network failure shows an error");
  check((await page.locator("#apply-coc").isChecked()), "answers are still there after a network failure");
  await page.unroute("**/apply");
  await page.close();
}
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await fillToReview(page);
  let posts = 0;
  page.on("request", r => r.method() === "POST" && r.url().includes("/apply") && posts++);
  const submit = page.getByRole("button", { name: "Submit application" });
  await submit.dblclick();
  await page.locator("h2", { hasText: "You're on the list" }).waitFor({ timeout: 15000 }).catch(() => {});
  check((await page.locator("h2", { hasText: "You're on the list" }).count()) === 1, "dry-run submit shows the success state");
  check(posts === 1, `double click sends one submission (${posts})`);
  if (SHOTS) await page.screenshot({ path: `${SHOTS}/_apply-success-1440.png`, fullPage: true });
  await page.close();
}

await browser.close();
console.log(failures ? `\n${failures} check(s) failed` : "\nAll checks passed");
process.exit(failures ? 1 : 0);
