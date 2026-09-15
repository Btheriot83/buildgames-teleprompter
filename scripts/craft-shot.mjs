import { chromium } from '@playwright/test'
import { copyFileSync, mkdirSync } from 'fs'
import { dirname, resolve } from 'path'

const name = process.argv[2]
const view = process.argv[3] || 'stage'
if (!name) {
  console.error('usage: node scripts/craft-shot.mjs <name> [home|desk|stage|playing|onboard]')
  process.exit(1)
}
const outLocal = resolve('gauntlet/shots-craft', `${name}.png`)
const outNarrow = resolve('/workspace/build-games/narrow/shots/milecue-craft', `${name}.png`)
mkdirSync(dirname(outLocal), { recursive: true })
mkdirSync(dirname(outNarrow), { recursive: true })
const base = process.env.CRAFT_URL || 'http://127.0.0.1:4173'
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })

async function dismissOnboard() {
  const skip = page.locator('.onboard-actions .skip')
  if (await skip.count()) {
    await skip.first().click({ timeout: 2000 }).catch(() => {})
    await page.waitForTimeout(200)
  }
}

if (view === 'home') {
  await page.goto(`${base}/?t=${Date.now()}`, { waitUntil: 'networkidle', timeout: 45000 })
  await page.waitForSelector('.mkt-preview', { timeout: 15000 })
  await page.waitForTimeout(900)
} else if (view === 'onboard') {
  await page.goto(`${base}/app?onboard=1&t=${Date.now()}`, { waitUntil: 'networkidle', timeout: 45000 })
  await page.waitForSelector('.onboard-card', { timeout: 15000 })
  await page.waitForTimeout(400)
} else {
  await page.goto(`${base}/app?t=${Date.now()}`, { waitUntil: 'networkidle', timeout: 45000 })
  await page.waitForSelector('.topbar', { timeout: 15000 })
  await dismissOnboard()
  await page.waitForTimeout(400)
  if (view === 'stage' || view === 'playing') {
    await page.locator('[data-testid="open-prompt"]').click({ timeout: 10000 })
    await page.waitForSelector('[data-testid="prompt-stage"]', { timeout: 10000 })
    await page.waitForTimeout(500)
    if (view === 'playing') {
      await page.getByTestId('play-toggle').click()
      await page.getByTestId('play-toggle').filter({ hasText: /Pause/i }).waitFor({ timeout: 5000 })
      await page.waitForTimeout(1000)
    }
  }
}

await page.screenshot({ path: outLocal, type: 'png' })
copyFileSync(outLocal, outNarrow)
await browser.close()
console.log(outNarrow)
