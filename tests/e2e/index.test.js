const { test, expect } = require('@playwright/test')

test.beforeEach(async ({ page }) => {
  const status = await page.goto('http://localhost:3000')
  expect(status.status()).toBe(200)
  await page.waitForTimeout(500)
})
test.describe('Check page title', () => {
  test('Page title should be "Portfolio"', async ({ page }) => {
    await expect(page.title()).resolves.toMatch('Portfolio')
  })
})

test.describe('should render <Title />', () => {
  test('should contain \nReact \nThree \nFiber', async ({ page, browserName }) => {
    const screenshot = await page.screenshot({ fullPage: true })
    expect(screenshot).toMatchSnapshot(`test-${browserName}.png`, { threshold: 0.2 })
  })
})
