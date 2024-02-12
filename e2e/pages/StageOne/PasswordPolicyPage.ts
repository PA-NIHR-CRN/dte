import { Locator, Page, expect } from "@playwright/test";
import { assertComponentsVisible } from "../../utils/visibilityUtils";
import { assertErrorUtil } from "../../utils/visibilityUtils";

export default class PasswordPolicyPage {
  readonly page: Page;
  // text
  readonly passwordPolicyHeading: Locator;
  readonly backButton: Locator;
  readonly continueButton: Locator;
  readonly progressDisplay: Locator;
  readonly passwordTextFirst: Locator;
  readonly passwordTextSecond: Locator;
  readonly passwordTextThird: Locator;
  readonly createPasswordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly createPasswordLabel: Locator;
  readonly confirmPasswordLabel: Locator;
  readonly createPasswordShowButton: Locator;
  readonly confirmPasswordShowButton: Locator;
  readonly createPasswordError: Locator;
  readonly confirmPasswordError: Locator;

  constructor(page: Page) {
    this.page = page;
    // text
    this.passwordPolicyHeading = page.locator(
      `h1:text("Create a password for your Be Part of Research account")`
    );
    this.backButton = page.getByTitle("Return to previous page");
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.progressDisplay = page.getByText("23% complete");
    this.passwordTextFirst = page.getByText(
      "Your password must be 12 or more characters. You can use a mix of letters, numbers or symbols which must include at least 1 capital letter, 1 lowercase letter, 1 number and 1 symbol."
    );
    this.passwordTextSecond = page.getByText(
      "We recommend using three random words to generate your password, e.g. 'applenemobiro' as these are easy for you to remember and hard for others to guess."
    );
    this.passwordTextThird = page.getByText(
      "You should avoid family and pet names, your favourite sports team, and dates and locations related to you."
    );
    this.createPasswordInput = page.locator("input#password");
    this.confirmPasswordInput = page.locator("input#password2");
    this.createPasswordLabel = page.locator("label#password--label");
    this.confirmPasswordLabel = page.locator("label#password2--label");
    // this.createPasswordShowButton = page.
    // this.confirmPasswordShowButton = page.
    this.createPasswordError = page.locator("span#password--error-message");
    this.confirmPasswordError = page.locator("span#password2--error-message");
  }

  // --- ON LOAD METHODS --- //
  async waitForLoad() {
    await this.page.waitForSelector("h1");
  }

  async assertButtonsVisible() {
    assertComponentsVisible([this.backButton, this.continueButton]);
  }

  async assertTextVisible() {
    assertComponentsVisible([
      this.passwordPolicyHeading,
      this.passwordTextFirst,
      this.passwordTextSecond,
      this.passwordTextThird,
    ]);
  }

  async assertFormVisible() {
    assertComponentsVisible([
      this.createPasswordInput,
      this.confirmPasswordInput,
      this.createPasswordLabel,
      this.confirmPasswordLabel,
    ]);
  }

  // --- FILLING IN FORM METHODS --- //
  async assertFillCreatePasswordField(password1: string) {
    await this.createPasswordInput.click();
    await this.createPasswordInput.fill(password1);
  }

  async assertFillConfirmPasswordField(password2: string) {
    await this.confirmPasswordInput.click();
    await this.confirmPasswordInput.fill(password2);
  }
}
