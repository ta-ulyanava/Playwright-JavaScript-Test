import { expect } from "@playwright/test";
import { runStep } from "../helpers/stepHelper.js";

export default class BasePage {
  constructor(page, step) {
    this.page = page;
    this.step = step;
  }

  async openPath(path) {
    await runStep(`Open path: ${path}`, async () => {
      await this.page.goto(path, { waitUntil: "load" });
      await this.page.waitForLoadState("networkidle");
    }, this.step);
  }

  async verifyTextInElement(element, expectedText) {
    await runStep(`Verify text "${expectedText}" in element`, async () => {
      const elementText = element.getByText(expectedText);
      await expect(elementText).toContainText(expectedText);
    }, this.step);
  }

  async getCleanedText(element) {
    return await runStep("Get and clean text from element", async () => {
      const text = await element.textContent();
      return text.trim().replace(/\s+/g, " ");
    }, this.step);
  }

  async clickByText(text) {
    await runStep(`Click on element with text: "${text}"`, async () => {
      const element = this.page.getByText(text, { exact: true });
      await expect(element).toBeVisible();
      await element.click();
    }, this.step);
  }
}
