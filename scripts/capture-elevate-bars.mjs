import { chromium } from '@playwright/test'
import { mkdirSync } from 'fs'
import { resolve } from 'path'

const outDir = resolve('gauntlet/shots-elevate')
mkdirSync(outDir, { recursive: true })
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

const targets = [
  ['bar-promptsmart.png', 'https://promptsmart.com/index.php/products/promptsmart-pro.html'],
  ['bar-bigvu.png', 'https://bigvu.tv/teleprompter/teleprompter-app'],
  ['bar-teleprompter-com.png', 'https://www.teleprompter.com/'],
  ['live-before-library.png', 'https://buildgames-teleprompter.vercel.app/'],
]

for (const [name, url] of targets) {
  try {
    const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 })
    await page.waitForTimeout(2500)
    await page.screenshot({ path: resolve(outDir, name), fullPage: false, type: 'png' })
    console.log('ok', name, res?.status())
  } catch (e) {
    console.log('fail', name, String(e).slice(0, 200))
  }
}

try {
  await page.goto('https://buildgames-teleprompter.vercel.app/', { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(800)
  await page.getByTestId('open-prompt').click({ timeout: 10000 })
  await page.waitForSelector('[data-testid="prompt-stage"]', { timeout: 10000 })
  await page.waitForTimeout(700)
  await page.screenshot({ path: resolve(outDir, 'live-before-stage.png'), type: 'png' })
  console.log('ok live-before-stage')
} catch (e) {
  console.log('fail live stage', String(e).slice(0, 200))
}

await browser.close()
