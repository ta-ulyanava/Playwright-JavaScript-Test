import { expect } from "@playwright/test";

export default class BasePage {
  constructor(page) {
    this.page = page;
  }

  async verifyTextInElement(element, expectedText) {
    const elementText = element.getByText(expectedText);
    await expect(elementText).toContainText(expectedText);
  }

  async getCleanedText(element) {
    const text = await element.textContent();
    return text.trim().replace(/\s+/g, " ");
  }

  async navigate(url) {
    await this.page.goto(url, { waitUntil: "load" });
    await this.page.waitForLoadState("networkidle");
  }
  async clickByText(text) {
    const element = this.page.getByText(text, { exact: true });
    await expect(element).toBeVisible();
    await element.click();
  }
}
