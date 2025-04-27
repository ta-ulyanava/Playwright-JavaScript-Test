import { test, expect } from "./baseTest";
import countryList from "../data/salaryInsightsTestData";

test.describe("Salary Insights Tests", () => {
  for (const data of countryList) {
    test(`Displays salary for role ${data.role} in ${data.country}`, async ({
      salaryInsightsPage,
    }) => {
      await salaryInsightsPage.open();
      await salaryInsightsPage.fillFormAndSearch(data.role, data.country);

      await salaryInsightsPage.checkFilterBar(
        data.role,
        data.country,
        data.currency.code
      );
      await salaryInsightsPage.checkSalaryTable(
        data.role,
        data.country,
        data.currency.symbol
      );
      await salaryInsightsPage.checkPromoSection(
        data.role,
        data.country,
        data.currency.symbol
      );
    });
  }
});

test.describe("Salary Insights Negative Tests", () => {
  test("Shows error when country is not selected", async ({
    salaryInsightsPage,
  }) => {
    await salaryInsightsPage.open();
    await salaryInsightsPage.chooseRole("QA Engineer");
    await salaryInsightsPage.clickSearch();

    await salaryInsightsPage.checkMainErrorMessage("Country is required");
    await expect(salaryInsightsPage.result.filterBar).toBeHidden();
  });
});
