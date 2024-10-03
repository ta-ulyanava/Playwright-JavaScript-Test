import { expect } from "@playwright/test";

export default class SalaryInsights {
  constructor(page) {
    this.page = page;

    // Form fields
    this.selectRole = page.getByTestId("role-field");
    this.selectCountry = page.getByTestId("country-field");
    this.searchButton = page.getByRole("button", { name: "Search" });

    // Result fields
    this.filterBar = page.getByTestId("filter-bar");
    this.salaryTable = page.getByTestId("salary-table");
    this.promoSection = page.locator("#promo-section-container");
    this.promoSectionDescription = this.promoSection.locator(
      ".MuiGrid-root.MuiGrid-item.css-tc4co3"
    );
  }

  async navigate() {
    await this.page.goto("https://growth.deel.training/dev/salary-insights", {
      waitUntil: "load",
    });
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(1000);
  }

  async selectRoleOptionFromDropdown(role) {
    await this.selectRole.click();
    await this.page.getByText(role).click();
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

    // Assert all parts of the promo section description
    expect(promoDescriptionText).toContain(
      `The median salary is ${currencySymbol}`
    );
    expect(promoDescriptionText).toContain(
      `per year for a Senior ${role} in ${country}`
    );
    expect(promoDescriptionText).toContain(
      `Salary estimates are based on anonymous submissions to Deel by ${role} employees in ${country}`
    );

    // Assert country flag
    const countryFlag = this.promoSection.locator(
      `img[alt="${country.toLowerCase()}"]`
    );
    await expect(countryFlag).toHaveAttribute("alt", country.toLowerCase());
  }

  // Helper method to verify text within an element
  async verifyTextInElement(element, expectedText) {
    const elementText = element.getByText(expectedText);
    await expect(elementText).toContainText(expectedText);
  }

  // Helper method to clean and normalize text content
  async getCleanedText(element) {
    const text = await element.textContent();
    return text.trim().replace(/\s+/g, " ");
  }
}
