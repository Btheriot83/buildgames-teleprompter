import { chromium } from "@playwright/test";
import fs from "fs";
import path from "path";

const base = process.env.DEMO_URL || "https://buildgames-teleprompter.vercel.app";
const out = path.resolve("docs");
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const log = [];

async function shot(name) {
  const p = path.join(out, name);
  await page.screenshot({ path: p, fullPage: false });
  log.push(`shot ${name}`);
}

const res = await page.goto(base + "/", { waitUntil: "networkidle", timeout: 60000 });
log.push(`home status=${res?.status()} title=${await page.title()}`);
await page.waitForTimeout(600);
await shot("live-library.png");

await page.getByTestId("open-prompt").click();
await page.waitForSelector('[data-testid="prompt-stage"]', { timeout: 10000 });
log.push("opened prompt");
await shot("live-prompt.png");

const before = await page.getByTestId("prompt-text").evaluate((el) => el.style.transform);
await page.getByTestId("play-toggle").click();
await page.waitForTimeout(1000);
const after = await page.getByTestId("prompt-text").evaluate((el) => el.style.transform);
const scrolled = after !== before && /translateY\(/.test(after);
log.push(`before=${before} after=${after} scrolled=${scrolled}`);
await shot("live-playing.png");

await page.getByTestId("mirror-toggle").click();
await page.waitForTimeout(200);
log.push("mirrored");
await shot("live-mirror.png");

await page.goto("https://www.teleprompter.com/", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(1500);
await shot("original-teleprompter-home.png");
log.push(`original title=${await page.title()}`);

await browser.close();
const result = { base, ok: scrolled && (res?.status() === 200), scrolled, status: res?.status(), log, at: new Date().toISOString() };
fs.writeFileSync(path.join(out, "live-smoke-log.json"), JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
if (!result.ok) process.exit(2);
