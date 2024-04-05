import { Locator, Page } from "@playwright/test";
import { assertComponentsVisible } from "../../utils/visibilityUtils";

export default class VerifyMobilePage {
  readonly page: Page;
  // text
  readonly pageHeading: Locator;
  // form
  readonly mobileInput: Locator;
  // buttons
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // text
    this.pageHeading = page.locator(`h1:text("Check your mobile phone")`);
    // form
    this.mobileInput = page.locator("input#mfaCode");
    // buttons
    this.continueButton = page.getByRole("button", {
      name: "Continue",
      exact: true,
    });
  }

  // --- VISIBILITY METHODS --- //
  async assertButtonsVisible() {
    await assertComponentsVisible([this.continueButton]);
  }
  async assertFormVisible() {
    await assertComponentsVisible([this.mobileInput]);
  }
  async assertTextVisible() {
    await assertComponentsVisible([this.pageHeading]);
  }
}
