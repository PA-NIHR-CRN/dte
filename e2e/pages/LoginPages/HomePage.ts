import { Locator, Page } from "@playwright/test";
import { assertComponentsVisible } from "../../utils/visibilityUtils";

export default class HomePage {
  readonly page: Page;
  // text
  readonly pageHeading: Locator;
  // buttons
  readonly registerOrLoginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // text
    this.pageHeading = page.locator("h1");
    // buttons
    this.registerOrLoginButton = page.locator(
      `a[href="https://volunteer.bepartofresearch.nihr.ac.uk/participants/introduction"]`
    );
  }

  async assertPage() {
    await this.page.goto("https://bepartofresearch.nihr.ac.uk/", {
      timeout: 30000,
    }); // Timeout set to 30 seconds
  }

  async assertButtonsVisible() {
    await assertComponentsVisible([this.registerOrLoginButton]);
  }

  async assertTextVisible() {
    await assertComponentsVisible([this.pageHeading]);
  }
}
