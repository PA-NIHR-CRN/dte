import { Locator, Page, expect } from "@playwright/test";
import { assertErrorsHidden, assertErrorUtil } from "../../utils/errorUtils";
import { assertComponentsVisible } from "../../utils/visibilityUtils";

export default class DateOfBirthPage {
  readonly page: Page;
  // Text
  readonly progressDisplay: Locator;
  readonly DoBPageHeading: Locator;
  readonly exampleText: Locator;
  readonly summaryTextPreview: Locator;
  readonly ageRestrictionText: Locator;
  readonly summaryText: Locator;
  // Form
  readonly dayLabel: Locator;
  readonly monthLabel: Locator;
  readonly yearLabel: Locator;
  readonly dayInput: Locator;
  readonly monthInput: Locator;
  readonly yearInput: Locator;
  // --- Form Errors --- //
  readonly errorMessage: Locator;
  // invalid inputs into fields errors
  // Buttons
  readonly backButton: Locator;
  readonly continueButton: Locator;

  // constructor
  constructor(page: Page) {
    this.page = page;
    // Text
    this.progressDisplay = page.getByText("8% complete");
    this.DoBPageHeading = page.getByRole("heading", {
      name: "What is your date of birth?",
    });
    this.exampleText = page.getByText("For example, 31 3 1980");
    this.ageRestrictionText = page.getByText(
      "You must be 18 or over to use this service"
    );
    this.summaryTextPreview = page.getByText("Why we are asking this question");
    this.summaryText = page.locator("div#details-5 > *");
    // --- FORM COMPONENTS --- //
    this.dayLabel = page.getByText("Day");
    this.monthLabel = page.getByText("Month");
    this.yearLabel = page.getByText("Year");
    this.dayInput = page.getByLabel("Day");
    this.monthInput = page.getByLabel("Month");
    this.yearInput = page.getByLabel("Year");
    // Form invalid input errors
    this.errorMessage = page.locator("span#dob--error-message");
    // Buttons
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.backButton = page.getByTitle("Return to previous page");
  }

  // --- LOAD PAGE METHODS --- //
  async waitForPageLoad() {
    await expect(this.DoBPageHeading).toBeVisible();
  }

  // --- ON LOAD METHODS --- //
  // check button components are visible on load
  async assertButtonsVisible() {
    await assertComponentsVisible([this.backButton, this.continueButton]);
  }

  // check all text components are visible on load
  async assertTextVisible() {
    await expect(this.summaryText).toBeHidden();
    await assertComponentsVisible([
      this.progressDisplay,
      this.DoBPageHeading,
      this.exampleText,
      this.ageRestrictionText,
      this.summaryTextPreview,
    ]);
  }

  // check form components are visible on load
  async assertFormVisible() {
    await assertComponentsVisible([
      this.dayLabel,
      this.dayInput,
      this.monthLabel,
      this.monthInput,
      this.yearLabel,
      this.yearInput,
    ]);
  }

  // --- ERROR CHECKING METHODS --- //
  async assertError(message: string) {
    await assertErrorUtil(this.errorMessage, message);
  }

  // Check no error messages visible before continue button pressed
  async assertErrorsHidden() {
    await assertErrorsHidden(this.errorMessage);
  }
}
