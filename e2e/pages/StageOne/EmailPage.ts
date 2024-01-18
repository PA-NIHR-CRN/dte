import { Locator, Page, expect } from "@playwright/test";

export default class EmailPage {
  // variables
  readonly page: Page;
  readonly backButton: Locator;
  readonly progressDisplay: Locator;
  readonly emailPageHeading: Locator;
  readonly emailLabel: Locator;
  readonly emailInput: Locator;
  readonly emptyFieldError: Locator;
  readonly invalidEmailError: Locator;
  readonly summaryTextPreview: Locator;
  readonly summaryText: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // --- TEXT --- //
    this.progressDisplay = page.getByText("15% complete");
    this.emailPageHeading = page.getByText("What is your email address?");
    this.summaryTextPreview = page.getByText("Why we are asking this question");
    this.summaryText = page.getByText(
      "We need your email address so we can contact you when we find a suitable study"
    );

    // --- FORM --- //
    this.emailLabel = page.getByText("Email address");
    this.emailInput = page.getByLabel("Email address");
    // form errors
    this.invalidEmailError = page.getByRole("alert", {
      name: "Enter an email address in the correct format, like name@example.com",
    });
    this.emptyFieldError = page.getByRole("alert", {
      name: "Enter your email address",
    });
    // --- BUTTONS --- //
    this.backButton = page.getByRole("link", { name: "Back" });
    this.continueButton = page.getByRole("button", { name: "continue" });
  }

  // --- LOAD PAGE METHODS --- //
  async goTo() {
    await this.page.goto("Participants/Register/Questions");
  }

  // --- ON LOAD METHODS --- //
  async assertButtonsVisible() {
    await expect(this.backButton).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }

  async assertTextVisible() {
    await expect(this.progressDisplay).toBeVisible();
    await expect(this.emailPageHeading).toBeVisible();
    await expect(this.summaryTextPreview).toBeVisible();
    await expect(this.summaryText).toBeVisible();
  }

  async assertFormVisible() {
    await expect(this.emailLabel).toBeVisible();
    await expect(this.emailInput).toBeVisible();
  }

  async assertErrorsHidden() {
    await expect(this.invalidEmailError).toBeHidden();
    await expect(this.emptyFieldError).toBeHidden();
  }

  // --- CLICK METHODS --- //
  async clickBack() {
    await this.backButton.click();
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  // --- FILLING IN FORM METHODS --- //
  async assertFillEmailField(email: string) {
    await this.emailInput.click();
    await expect(this.emailInput).toBeFocused();
    await this.emailInput.fill(email);
  }

  // --- ERROR CHECKING METHODS --- //
  async checkEmptyEmailError(email: string) {
    const isEmailInputEmpty = email.trim() === "";

    if (isEmailInputEmpty) {
      await expect(this.emptyFieldError).toHaveText("Enter your email address");
    } else {
      expect(this.emptyFieldError).toBeHidden();
    }
  }

  async checkInvalidEmailError(email: string) {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const validEmail = regex.test(email);
    //   const validEmail = email.includes("@");

    if (validEmail) {
      await expect(this.invalidEmailError).toHaveText(
        "Enter an email address in the correct format, like name@example.com"
      );
    } else {
      await expect(this.invalidEmailError).toBeHidden();
    }
  }
}
