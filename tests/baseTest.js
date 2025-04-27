import { test as base, expect } from "@playwright/test";
import SalaryInsightsPage from "../pages/SalaryInsightsPage";

export const test = base.extend({
  salaryInsightsPage: async ({ page }, use) => {
    const salaryInsightsPage = new SalaryInsightsPage(page);
    await use(salaryInsightsPage);
  },
});

export { expect };
