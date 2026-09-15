#!/usr/bin/env node
import { chromium } from '@playwright/test'
import { mkdirSync } from 'fs'
import { dirname, resolve } from 'path'

const name = process.argv[2]
const view = process.argv[3] || 'library'
if (!name) {
  console.error('usage: node scripts/r5-shot.mjs <name> [library|stage|playing]')
  process.exit(1)
}
const out = resolve('gauntlet/shots-r5', `${name}.png`)
mkdirSync(dirname(out), { recursive: true })
const base = process.env.R5_URL || 'http://127.0.0.1:5188'
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
await page.goto(`${base}/?shot=${encodeURIComponent(name)}&t=${Date.now()}`, {
  waitUntil: 'domcontentloaded',
  timeout: 45000,
})
await page.waitForSelector('.topbar, [data-testid="prompt-stage"]', { timeout: 15000 })
await page.waitForTimeout(700)
if (view === 'stage' || view === 'playing') {
  await page.locator('[data-testid="open-prompt"]').click({ timeout: 10000 })
  await page.waitForSelector('[data-testid="prompt-stage"]', { timeout: 10000 })
  await page.waitForTimeout(600)
  if (view === 'playing') {
    await page.getByTestId('play-toggle').click()
    await page.waitForTimeout(900)
  }
}
await page.screenshot({ path: out, type: 'png' })
await browser.close()
console.log(out)
