// @ts-check
const { defineConfig, devices, test } = require("@playwright/test");
const { allure } = require("allure-playwright");

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    process.env.CI ? ["dot"] : ["list"],
    ["html"],
    ["allure-playwright", {
      outputFolder: "allure-results",
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false
    }]
  ],
  use: {
    baseURL: "https://growth.deel.training",
    testIdAttribute: "data-qa",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
  ],
});

module.exports = config;

/**
 * Attach screenshot to Allure if test fails
 */
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    const screenshot = await page.screenshot();
    allure.attach('Failure Screenshot', {
      content: screenshot,
      type: 'image/png',
    });
  }
});
