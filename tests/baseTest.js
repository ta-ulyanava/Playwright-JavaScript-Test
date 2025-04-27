import { test as base, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import SalaryInsightsPage from "../pages/SalaryInsightsPage";

export const test = base.extend({
  salaryInsightsPage: async ({ page }, use) => {
    const salaryInsightsPage = new SalaryInsightsPage(page);
    await use(salaryInsightsPage);
  },
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    const screenshot = await page.screenshot();
    allure.attach('Failure Screenshot', {
      content: screenshot,
      type: 'image/png',
    });
  }
});

export { expect };
