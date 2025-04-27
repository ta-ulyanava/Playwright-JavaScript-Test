import { expect } from "@playwright/test";
import BasePage from "./BasePage";

export default class SalaryInsightsPage extends BasePage {
  constructor(page) {
    super(page);

    this.selectRole = page.getByTestId("role-field");
    this.selectCountry = page.getByTestId("country-field");
    this.searchButton = page.getByRole("button", { name: "Search" });

    this.filterBar = page.getByTestId("filter-bar");
    this.salaryTable = page.getByTestId("salary-table");
    this.promoSection = page.locator("#promo-section-container");
    this.promoSectionDescription = this.promoSection.locator(
      ".MuiGrid-root.MuiGrid-item.css-tc4co3"
    );
  }

  async open() {
    await this.navigate("https://growth.deel.training/dev/salary-insights");
    await this.page.waitForTimeout(1000);
  }

  async selectRoleOptionFromDropdown(role) {
    await this.selectRole.click();
    await this.clickByText(role);
  }

  async selectCountryOptionFromDropdown(country) {
    await this.selectCountry.click();
    await this.page
      .getByRole("listbox")
      .locator("div")
      .filter({ hasText: country })
      .nth(1)
      .click();
  }

  async verifyFilterBarForRoleCountryAndCurrencyCode(
    role,
    country,
    currencyCode
  ) {
    await this.verifyTextInElement(this.filterBar, role);
    await this.verifyTextInElement(this.filterBar, country);
    await this.verifyTextInElement(this.filterBar, currencyCode);
  }

  async verifySalaryTableForRoleCountryAndCurrencySymbol(
    role,
    country,
    currencySymbol
  ) {
    await expect(this.salaryTable).toContainText(
      `Senior ${role} compensation in ${country}`
    );
    await expect(this.salaryTable).toContainText(currencySymbol);
  }

  async verifyPromoSectionForRoleCountryAndCurrencySymbol(
    role,
    country,
    currencySymbol
  ) {
    await expect(this.promoSection).toContainText(
      `How much does a Senior ${role} make in ${country}?`
    );

    const promoDescriptionText = await this.getCleanedText(
      this.promoSectionDescription
    );

    expect(promoDescriptionText).toContain(
      `The median salary is ${currencySymbol}`
    );
    expect(promoDescriptionText).toContain(
      `per year for a Senior ${role} in ${country}`
    );
    expect(promoDescriptionText).toContain(
      `Salary estimates are based on anonymous submissions to Deel by ${role} employees in ${country}`
    );

    const countryFlag = this.promoSection.locator(
      `img[alt="${country.toLowerCase()}"]`
    );
    await expect(countryFlag).toHaveAttribute("alt", country.toLowerCase());
  }
}
