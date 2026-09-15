import { chromium } from '@playwright/test'
import fs from 'fs'
const base = process.env.ELEVATE_URL || 'http://127.0.0.1:5191'
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
await page.goto(base + '/', { waitUntil: 'domcontentloaded' })
await page.getByTestId('open-prompt').click()
await page.waitForSelector('[data-testid=prompt-text]')
const readY = () => page.getByTestId('prompt-text').evaluate((el) => {
  const m = getComputedStyle(el).transform
  if (m.startsWith('matrix(')) return Number(m.slice(7,-1).split(',')[5])
  return 0
})
const beforeY = await readY()
await page.getByTestId('play-toggle').click()
await page.getByTestId('play-toggle').filter({ hasText: /Pause/i }).waitFor({ timeout: 5000 })
await page.waitForTimeout(1000)
const afterY = await readY()
const css = await page.evaluate(() => {
  const el = document.querySelector('[data-testid=prompt-text]')
  const cs = getComputedStyle(el)
  return { transform: cs.transform, animationName: cs.animationName, promptY: el.style.getPropertyValue('--prompt-y') }
})
await page.screenshot({ path: 'gauntlet/shots-elevate/play-smoke-y.png', type: 'png' })
const result = { beforeY, afterY, scrolled: afterY < beforeY - 20, css, at: new Date().toISOString() }
fs.writeFileSync('gauntlet/shots-elevate/play-smoke-y.json', JSON.stringify(result, null, 2))
console.log(JSON.stringify(result, null, 2))
await browser.close()
if (!result.scrolled) process.exit(2)
