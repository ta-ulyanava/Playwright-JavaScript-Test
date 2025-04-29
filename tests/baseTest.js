import { test as base, expect } from "@playwright/test";
import SalaryInsightsPage from "../pages/SalaryInsightsPage.js";

export const test = base.extend({
  salaryInsightsPage: async ({ page }, use, testInfo) => {
    const salaryInsightsPage = new SalaryInsightsPage(page, testInfo?.step?.bind(testInfo));
    await use(salaryInsightsPage);
  }
  
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    const screenshot = await page.screenshot();
    await testInfo.attach('Failure Screenshot', {
      body: screenshot,
      contentType: 'image/png',
    });
  }
});

export { expect };
