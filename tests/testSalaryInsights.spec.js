import { test, page } from "@playwright/test";
import SalaryInsights from "../pages/salaryInsights";
import countryList from "../utils/salaryInsightsTestData";
//const salaryInsites = new SalaryInsights(page);

test.describe("Salary Insights Tests", () => {
  for (const data of countryList) {
    test(`Displays salary for selected role ${data.role} in ${data.country}`, async ({
      page,
    }) => {
      const salaryInsites = new SalaryInsights(page);

      // Submit form
      await salaryInsites.navigate();
      await salaryInsites.selectRoleOptionFromDropdown(data.role);
      await salaryInsites.selectCountryOptionFromDropdown(data.country);
      await salaryInsites.searchButton.click();

      // Assertions
      await salaryInsites.verifyFilterBarForRoleCountryAndCurrencyCode(
        data.role,
        data.country,
        data.currency.code
      );
      await salaryInsites.verifySalaryTableForRoleCountryAndCurrencySymbol(
        data.role,
        data.country,
        data.currency.symbol
      );
      await salaryInsites.verifyPromoSectionForRoleCountryAndCurrencySymbol(
        data.role,
        data.country,
        data.currency.symbol
      );
    });
  }
});
test("negative test", async ({ page }) => {
  const salaryInsites = new SalaryInsights(page);
  await salaryInsites.navigate();
  await salaryInsites.selectRoleOptionFromDropdown(countryList.data.role);
  await salaryInsites.searchButton.click();

  await expect("#main").toContainText("Country is required");
  await expect(salaryInsites.filterBar).toBeHidden();
});
