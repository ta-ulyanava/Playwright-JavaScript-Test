import { expect } from "@playwright/test";
import { allure } from "allure-playwright/runtime";

export default class BasePage {
  constructor(page) {
    this.page = page;
  }

  async openPath(path) {
    await allure.step(`Open path: ${path}`, async () => {
      await this.page.goto(path, { waitUntil: "load" });
      await this.page.waitForLoadState("networkidle");
    });
  }

  async verifyTextInElement(element, expectedText) {
    await allure.step(`Verify text "${expectedText}" in element`, async () => {
      const elementText = element.getByText(expectedText);
      await expect(elementText).toContainText(expectedText);
    });
  }

  async getCleanedText(element) {
    return await allure.step(`Get and clean text from element`, async () => {
      const text = await element.textContent();
      return text.trim().replace(/\s+/g, " ");
    });
  }

  async clickByText(text) {
    await allure.step(`Click on element with text: "${text}"`, async () => {
      const element = this.page.getByText(text, { exact: true });
      await expect(element).toBeVisible();
      await element.click();
    });
  }
}
