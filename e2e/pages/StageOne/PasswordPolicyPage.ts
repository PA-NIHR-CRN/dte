import { Locator, Page, expect } from "@playwright/test";
import { assertComponentsVisible } from "../../utils/visibilityUtils";
import { assertErrorUtil, assertErrorsHidden } from "../../utils/errorUtils";

export default class PasswordPolicyPage {
  readonly page: Page;
  // text
  readonly passwordPolicyHeading: Locator;
  readonly backButton: Locator;
  readonly continueButton: Locator;
  readonly progressDisplay: Locator;
  readonly passwordText1: Locator;
  readonly passwordText2: Locator;
  readonly passwordText3: Locator;
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
    this.passwordPolicyHeading = page.getByRole("heading", {
      name: "Create a password for your Be Part of Research account",
    });
    this.backButton = page.getByTitle("Return to previous page");
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.progressDisplay = page.getByText("23% complete");
    this.passwordText1 = page.getByText(
      "Your password must be 12 or more characters. You can use a mix of letters, numbers or symbols which must include at least 1 capital letter, 1 lowercase letter, 1 number and 1 symbol."
    );
    this.passwordText2 = page.getByText(
      "We recommend using three random words to generate your password, e.g. 'applenemobiro' as these are easy for you to remember and hard for others to guess."
    );
    this.passwordText3 = page.getByText(
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

  // LOAD METHODS
  async waitForPageLoad() {
    await this.page.waitForSelector(
      'h1:text("Create a password for your Be Part of Research account")',
      {
        state: "visible",
      }
    );
  }

  // --- ON LOAD METHODS --- //

  async assertButtonsVisible() {
    assertComponentsVisible([this.backButton, this.continueButton]);
  }

  async assertTextVisible() {
    assertComponentsVisible([
      this.passwordPolicyHeading,
      this.passwordText1,
      this.passwordText2,
      this.passwordText3,
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

  async assertErrorsHidden() {
    await assertErrorsHidden(this.createPasswordError);
    await assertErrorsHidden(this.confirmPasswordError);
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

  // --- ERRORS LOGIC --- //
  async assertCreatePasswordError(message: string) {
    await assertErrorUtil(this.createPasswordError, message);
  }

  async assertConfirmPasswordError(message: string) {
    await assertErrorUtil(this.confirmPasswordError, message);
  }
}
