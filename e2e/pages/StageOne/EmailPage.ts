import { Locator, Page, expect } from "@playwright/test";
import { assertErrorUtil, assertErrorsHidden } from "../../utils/errorUtils";
import { assertComponentsVisible } from "../../utils/visibilityUtils";

export default class EmailPage {
  readonly page: Page;
  // variables
  readonly backButton: Locator;
  readonly progressDisplay: Locator;
  readonly emailPageHeading: Locator;
  readonly errorMessage: Locator;
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
    this.emailPageHeading = page.getByRole("heading", {
      name: "What is your email address?",
    });
    this.summaryTextPreview = page.getByText("Why we are asking this question");
    this.summaryText = page.getByText(
      "We need your email address so we can contact you when we find a suitable study"
    );

    // --- FORM --- //
    this.emailLabel = page.locator("label#emailAddress--label");
    this.emailInput = page.locator("input#emailAddress");
    // form errors
    this.errorMessage = page.locator("span#emailAddress--error-message");
    // --- BUTTONS --- //
    this.backButton = page.getByTitle("Return to previous page");
    this.continueButton = page.getByRole("button", { name: "continue" });
  }

  // --- LOAD PAGE METHODS --- //
  async waitForPageLoad() {
    await this.page.waitForSelector('h1:text("What is your email address?")', {
      state: "visible",
    });
  }

  // --- ON LOAD METHODS --- //
  async assertButtonsVisible() {
    assertComponentsVisible([this.backButton, this.continueButton]);
  }

  async assertTextVisible() {
    await expect(this.summaryText).toBeHidden();
    assertComponentsVisible([
      this.progressDisplay,
      this.emailPageHeading,
      this.summaryTextPreview,
    ]);
  }

  async assertFormVisible() {
    assertComponentsVisible([this.emailLabel, this.emailInput]);
  }

  // --- ERRORS LOGIC --- //
  async assertError(message: string) {
    await assertErrorUtil(this.errorMessage, message);
  }

  async assertErrorsHidden() {
    await assertErrorsHidden(this.errorMessage);
  }
}
