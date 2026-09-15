import { expect, test } from '@playwright/test'

test('library → open prompt → play scrolls', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'MileCue' })).toBeVisible()
  await expect(page.getByTestId('script-body')).toBeVisible({ timeout: 10_000 })
  await page.getByTestId('open-prompt').click()
  await expect(page.getByTestId('prompt-stage')).toBeVisible()
  const before = await page.getByTestId('prompt-text').evaluate((el) => el.style.transform)
  await page.getByTestId('play-toggle').click()
  await page.waitForTimeout(800)
  const after = await page.getByTestId('prompt-text').evaluate((el) => el.style.transform)
  expect(after).not.toBe(before)
  expect(after).toMatch(/translateY/)
})
