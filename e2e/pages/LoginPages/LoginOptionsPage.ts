import { Locator, Page } from "@playwright/test";
import { assertComponentsVisible } from "../../utils/visibilityUtils";

export default class LoginOptionsPage {
  readonly page: Page;
  // text
  readonly pageHeading: Locator;
  // form
  // buttons
  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // text
    this.pageHeading = page.locator(`h1`);
    // buttons
    this.signInButton = page.locator(`a[href="/UserLogin"]`);
  }

  async assertPage() {
    this.page.on("pageerror", (response) => console.log(response));
    await this.page.goto(
      "https://test.volunteer.bepartofresearch.nihr.ac.uk/Participants/Options",
      { timeout: 100000 }
    );
  }

  async assertButtonsVisible() {
    await assertComponentsVisible([this.signInButton]);
  }

  async assertTextVisible() {
    await assertComponentsVisible([this.pageHeading]);
  }
}
