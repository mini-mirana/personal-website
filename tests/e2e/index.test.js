const { test, expect } = require('@playwright/test')

test.beforeEach(async ({ page }) => {
  const status = await page.goto('/')
  expect(status.status()).toBe(200)
  await page.waitForTimeout(10000)
})

test.describe('Check page title', () => {
  test('Page title contain "Portfolio"', async ({ page }) => {
    await expect(page.title()).resolves.toMatch(/Portfolio*/gm)
  })
})

test.describe('should render <TextMesh />', () => {
  test('should contain Three', async ({ page, browserName }, testInfo) => {
    const screenshot = await page.screenshot({
      fullPage: true
    })
    expect(screenshot).toMatchSnapshot(`test-${browserName}-${testInfo.title}.png`, {
      threshold: 0.2
    })
  })
})

test.describe('Navigation', () => {
  test('should move to intro', async ({ page, browserName }, testInfo) => {
    // Click text=Intro
    await page.locator('text=Intro').click()
    await page.waitForTimeout(3000)
    const screenshot = await page.screenshot({
      fullPage: true
    })
    expect(screenshot).toMatchSnapshot(`test-${browserName}-${testInfo.title}.png`, {
      threshold: 0.2
    })
  })
  test('should move to skills', async ({ page, browserName }, testInfo) => {
    // Click text=skills
    await page.locator('text=skills').click()
    await page.waitForTimeout(3000)
    const screenshot = await page.screenshot({
      fullPage: true
    })
    expect(screenshot).toMatchSnapshot(`test-${browserName}-${testInfo.title}.png`, {
      threshold: 0.2
    })
  })
  test('should move to experience', async ({ page, browserName }, testInfo) => {
    // Click text=Experience
    await page.locator('text=Experience').click()
    await page.waitForTimeout(3000)
    const screenshot = await page.screenshot({
      fullPage: true
    })
    expect(screenshot).toMatchSnapshot(`test-${browserName}-${testInfo.title}.png`, {
      threshold: 0.2
    })
  })
})

test.describe('Test Stack title glow', () => {
  test('should move to experience', async ({ page, browserName }, testInfo) => {
    // Click text=Experience
    await page.locator('text=Experience').click()
    await page.waitForTimeout(3000)
    // Click canvas
    await page.locator('canvas').click({
      position: {
        x: 656,
        y: 198
      }
    })
    await page.waitForTimeout(3000)
    const screenshot = await page.screenshot({
      fullPage: true
    })
    expect(screenshot).toMatchSnapshot(`test-${browserName}-${testInfo.title}.png`, {
      threshold: 0.2
    })
  })
})

test.describe('Test Grid Hover', () => {
  test('Test Grid center', async ({ page, browserName }, testInfo) => {
    // Click text=skills
    await page.locator('text=skills').click()
    await page.waitForTimeout(3000)
    // Click canvas
    await page.locator('canvas').click({
      position: {
        x: 639,
        y: 363
      }
    })
    await page.waitForTimeout(3000)
    const screenshot = await page.screenshot({
      fullPage: true
    })
    expect(screenshot).toMatchSnapshot(`test-${browserName}-${testInfo.title}.png`, {
      threshold: 0.2
    })
  })
  test('Test Grid left', async ({ page, browserName }, testInfo) => {
    // Click text=skills
    await page.locator('text=skills').click()
    await page.waitForTimeout(3000)
    // Click canvas
    await page.locator('canvas').click({
      position: {
        x: 639,
        y: 363
      }
    })
    await page.waitForTimeout(3000)
    const screenshot = await page.screenshot({
      fullPage: true
    })
    expect(screenshot).toMatchSnapshot(`test-${browserName}-${testInfo.title}.png`, {
      threshold: 0.2
    })
  })
})
