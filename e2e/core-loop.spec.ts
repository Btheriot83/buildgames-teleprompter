import { expect, test } from '@playwright/test'

test('library → open prompt → play scrolls', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'MileCue' })).toBeVisible()
  await expect(page.getByTestId('script-body')).toBeVisible({ timeout: 10_000 })
  await page.getByTestId('open-prompt').click()
  await expect(page.getByTestId('prompt-stage')).toBeVisible()

  const prompt = page.getByTestId('prompt-text')
  const readY = () =>
    prompt.evaluate((el) => {
      const m = getComputedStyle(el).transform
      // matrix(a,b,c,d,tx,ty) or matrix3d(..., ty)
      if (m.startsWith('matrix3d(')) {
        const parts = m.slice(9, -1).split(',').map((n) => Number(n.trim()))
        return parts[13] ?? 0
      }
      if (m.startsWith('matrix(')) {
        const parts = m.slice(7, -1).split(',').map((n) => Number(n.trim()))
        return parts[5] ?? 0
      }
      return el.getBoundingClientRect().y
    })

  const before = await readY()
  await page.getByTestId('play-toggle').click()
  await expect(page.getByTestId('play-toggle')).toContainText(/Pause/i)
  await page.waitForTimeout(900)
  const after = await readY()
  // Continuous scroll moves prompt up (more negative translateY)
  expect(after).toBeLessThan(before - 20)
})
