import { chromium } from '@playwright/test'
import { mkdirSync } from 'fs'
import { dirname, resolve } from 'path'

const name = process.argv[2]
const view = process.argv[3] || 'library'
if (!name) {
  console.error('usage: node scripts/elevate-shot.mjs <name> [library|stage|playing|countdown]')
  process.exit(1)
}
const out = resolve('gauntlet/shots-elevate', `${name}.png`)
mkdirSync(dirname(out), { recursive: true })
const base = process.env.ELEVATE_URL || 'http://127.0.0.1:5191'
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
await page.goto(`${base}/?shot=${encodeURIComponent(name)}&t=${Date.now()}`, {
  waitUntil: 'domcontentloaded',
  timeout: 45000,
})
await page.waitForSelector('.topbar, [data-testid="prompt-stage"]', { timeout: 15000 })
await page.waitForTimeout(500)
if (view !== 'library') {
  await page.locator('[data-testid="open-prompt"]').click({ timeout: 10000 })
  await page.waitForSelector('[data-testid="prompt-stage"]', { timeout: 10000 })
  await page.waitForTimeout(500)
  if (view === 'countdown') {
    await page.getByTestId('play-toggle').click()
    await page.waitForSelector('[data-testid="stage-countdown"]', { timeout: 3000 })
    await page.waitForTimeout(200)
  } else if (view === 'playing') {
    await page.getByTestId('play-toggle').click()
    await page.getByTestId('play-toggle').filter({ hasText: /Pause/i }).waitFor({ timeout: 5000 })
    await page.waitForTimeout(900)
  }
}
await page.screenshot({ path: out, type: 'png' })
await browser.close()
console.log(out)
