import { expect } from "@playwright/test";

export default class BasePage {
  constructor(page, test) {
    this.page = page;
    this.test = test;
  }

  async openPath(path) {
    await this.test.step(`Open path: ${path}`, async () => {
      await this.page.goto(path, { waitUntil: "load" });
      await this.page.waitForLoadState("networkidle");
    });
  }

  async verifyTextInElement(element, expectedText) {
    await this.test.step(`Verify text "${expectedText}" in element`, async () => {
      const elementText = element.getByText(expectedText);
      await expect(elementText).toContainText(expectedText);
    });
  }

  async getCleanedText(element) {
    return await this.test.step(`Get and clean text from element`, async () => {
      const text = await element.textContent();
      return text.trim().replace(/\s+/g, " ");
    });
  }

  async clickByText(text) {
    await this.test.step(`Click on element with text: "${text}"`, async () => {
      const element = this.page.getByText(text, { exact: true });
      await expect(element).toBeVisible();
      await element.click();
    });
  }
}
