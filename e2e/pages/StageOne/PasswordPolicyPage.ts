import { Locator, Page, expect } from "@playwright/test";

export default class PasswordPolicyPage {
  readonly page: Page;
  // text
  readonly passwordPolicyHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    // text
    this.passwordPolicyHeading = page.getByRole("heading", {
      name: "Create a password for your Be Part of Research account",
    });
  }

  // LOAD METHODS
  async waitForPageLoad() {
    await this.page.waitForSelector(
      'h1:text("Create a password for your Be Part of Research account")',
      {
        state: "visible",
      }
    );
  }
}
