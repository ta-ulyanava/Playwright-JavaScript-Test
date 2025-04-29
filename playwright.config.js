// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
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
