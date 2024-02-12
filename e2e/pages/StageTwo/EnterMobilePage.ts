import { Locator, Page } from "@playwright/test";
import {
  assertComponentsVisible,
  assertErrorUtil,
  assertComponentsHidden,
} from "../../utils/visibilityUtils";

export default class EnterMobilePage {
  readonly page: Page;
  // text
  readonly enterMobilePageHeading: Locator;
  readonly enterMobilePageText: Locator;
  readonly summaryTextPreview: Locator;
  readonly summaryText: Locator;
  // links
  readonly authenticatorLink: Locator;
  // form
  readonly mobileInput: Locator;
  readonly mobileLabel: Locator;
  // buttons
  readonly continueButton: Locator;
  // errors
  readonly mobileError: Locator;

  constructor(page: Page) {
    this.page = page;
    // text
    this.enterMobilePageHeading = page.getByRole("heading", {
      name: "Enter your mobile phone number",
    });
    this.enterMobilePageText = page.getByText(
      "We will send you a 6 digit security code to your phone to confirm your mobile number."
    );
    this.summaryTextPreview = page.getByText(
      "Use another way to secure my account"
    );
    this.summaryText = page.getByText(
      "If you do not have a UK mobile phone number or do not want to use this method, you can use an authenticator app to secure your account."
    );
    // links
    this.authenticatorLink = page.locator(
      `span:text("use an authenticator app to secure your account")`
    );
    // form
    this.mobileInput = page.getByLabel("UK mobile phone number");
    this.mobileLabel = page.locator("label#mobilePhoneNumber--label");
    // buttons
    this.continueButton = page.getByRole("button", { name: "Continue" });
    // errors
    this.mobileError = page.locator("span#mobilePhoneNumber--error-message");
  }

  // --- LOAD METHODS --- //
  async goTo() {
    await this.page.goto(
      "https://volunteer.bepartofresearch.nihr.ac.uk/MfaSmsSetup"
    );
  }

  // --- VISIBILITY METHODS --- //
  async assertButtonsVisible() {
    await assertComponentsVisible([this.continueButton]);
  }
  async assertFormVisible() {
    await assertComponentsVisible([this.mobileInput, this.mobileLabel]);
  }
  async assertTextVisible() {
    await assertComponentsVisible([
      this.enterMobilePageHeading,
      this.enterMobilePageText,
      this.summaryTextPreview,
    ]);
  }
  async assertErrorsHidden() {
    await expect(this.mobileError).toBeHidden();
  }
}
