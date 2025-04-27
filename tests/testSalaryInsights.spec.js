import { test, expect } from "./baseTest";
import countryList from "../data/salaryInsightsTestData";

test.describe("Salary Insights Tests", () => {
  for (const data of countryList) {
    test(`Displays salary for selected role ${data.role} in ${data.country}`, async ({
      salaryInsightsPage,
    }) => {
      await salaryInsightsPage.navigate();
      await salaryInsightsPage.selectRoleOptionFromDropdown(data.role);
      await salaryInsightsPage.selectCountryOptionFromDropdown(data.country);
      await salaryInsightsPage.searchButton.click();

      await salaryInsightsPage.verifyFilterBarForRoleCountryAndCurrencyCode(
        data.role,
        data.country,
        data.currency.code
      );
      await salaryInsightsPage.verifySalaryTableForRoleCountryAndCurrencySymbol(
        data.role,
        data.country,
        data.currency.symbol
      );
      await salaryInsightsPage.verifyPromoSectionForRoleCountryAndCurrencySymbol(
        data.role,
        data.country,
        data.currency.symbol
      );
    });
  }
});

test.describe("Salary Insights Negative Tests", () => {
  test("Should show error when country is not selected", async ({
    salaryInsightsPage,
  }) => {
    await salaryInsightsPage.navigate();
    await salaryInsightsPage.selectRoleOptionFromDropdown("QA Engineer");
    await salaryInsightsPage.searchButton.click();

    await expect(salaryInsightsPage.page.locator("#main")).toContainText(
      "Country is required"
    );
    await expect(salaryInsightsPage.filterBar).toBeHidden();
  });
});
