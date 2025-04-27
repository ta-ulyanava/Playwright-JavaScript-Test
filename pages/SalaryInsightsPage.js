import { expect } from "@playwright/test";
import BasePage from "./BasePage";

export default class SalaryInsightsPage extends BasePage {
  constructor(page) {
    super(page);
    this.form = {
      roleDropdown: page.getByTestId("role-field"),
      countryDropdown: page.getByTestId("country-field"),
      searchButton: page.getByRole("button", { name: "Search" }),
    };
    this.result = {
      filterBar: page.getByTestId("filter-bar"),
      salaryTable: page.getByTestId("salary-table"),
      promoSection: page.locator("#promo-section-container"),
      promoSectionDescription: page
        .locator("#promo-section-container")
        .locator(".MuiGrid-root.MuiGrid-item.css-tc4co3"),
    };
  }

  async open() {
    await this.openPath("/dev/salary-insights");
    await this.page.waitForTimeout(1000);
  }

  async chooseRole(role) {
    await this.form.roleDropdown.click();
    await this.clickByText(role);
  }

  async chooseCountry(country) {
    await this.form.countryDropdown.click();
    await this.page
      .getByRole("listbox")
      .locator("div")
      .filter({ hasText: country })
      .nth(1)
      .click();
  }

  async clickSearch() {
    await this.form.searchButton.click();
  }

  async checkFilterBar(role, country, currencyCode) {
    await this.verifyTextInElement(this.result.filterBar, role);
    await this.verifyTextInElement(this.result.filterBar, country);
    await this.verifyTextInElement(this.result.filterBar, currencyCode);
  }

  async checkSalaryTable(role, country, currencySymbol) {
    await expect(this.result.salaryTable).toContainText(
      `Senior ${role} compensation in ${country}`
    );
    await expect(this.result.salaryTable).toContainText(currencySymbol);
  }

  async checkPromoSection(role, country, currencySymbol) {
    const promo = this.result.promoSection;
    await expect(promo).toContainText(
      `How much does a Senior ${role} make in ${country}?`
    );

    const promoDescription = await this.getCleanedText(
      this.result.promoSectionDescription
    );

    expect(promoDescription).toContain(
      `The median salary is ${currencySymbol}`
    );
    expect(promoDescription).toContain(
      `per year for a Senior ${role} in ${country}`
    );
    expect(promoDescription).toContain(
      `Salary estimates are based on anonymous submissions to Deel by ${role} employees in ${country}`
    );

    const countryFlag = promo.locator(`img[alt="${country.toLowerCase()}"]`);
    await expect(countryFlag).toHaveAttribute("alt", country.toLowerCase());
  }
}
