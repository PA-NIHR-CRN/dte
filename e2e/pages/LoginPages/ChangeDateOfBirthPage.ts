import { Locator, Page, expect } from "@playwright/test";
import { assertComponentsVisible } from "../../utils/visibilityUtils";

export default class ChangeDateOfBirthPage {
  readonly page: Page;
  // text
  readonly changeDateOfBirthPageHeading: Locator;
  readonly exampleText: Locator;
  readonly ageRequirementText: Locator;
  readonly summaryTextPreview: Locator;
  readonly summaryTextFirst: Locator;
  readonly summaryTextSecond: Locator;
  // form
  readonly dayInput: Locator;
  readonly dayLabel: Locator;
  readonly monthInput: Locator;
  readonly monthLabel: Locator;
  readonly yearInput: Locator;
  readonly yearLabel: Locator;
  // buttons
  readonly saveButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // text
    this.changeDateOfBirthPageHeading = page.getByRole("heading", {
      name: "What is your date of birth?",
      exact: true,
    });
    this.exampleText = page.locator(`span:text("For example, 31 3 1980")`);
    this.ageRequirementText = page.locator(
      `span:text("You must be 18 or over to use this service")`
    );
    this.summaryTextPreview = page.locator(
      `span:text("Why we are asking this question")`
    );
    this.summaryTextFirst = page.locator(
      `span:text("Many studies want to make sure they have people of different ages taking part in research studies, and some are looking for specific age groups only.")`
    );
    this.summaryTextSecond = page.locator(
      `span:text("You have to be 18 or over to sign up for an account with Be Part of Research.")`
    );
    // form
    this.dayInput = page.getByLabel("Day");
    this.dayLabel = page.locator("label#date-of-birth-day--label");
    this.monthInput = page.getByLabel("Month");
    this.monthLabel = page.locator(`label#date-of-birth-month--label`);
    this.yearInput = page.getByLabel("Year");
    this.yearLabel = page.locator(`label#date-of-birth-year--label`);
    // buttons
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.cancelButton = page.getByRole("link", { name: "Cancel", exact: true });
  }

  // -- on load methods
  async assertButtonsVisible() {
    assertComponentsVisible([this.saveButton, this.cancelButton]);
  }

  async assertFormVisible() {
    assertComponentsVisible([
      this.dayInput,
      this.dayLabel,
      this.monthInput,
      this.monthLabel,
      this.yearInput,
      this.yearLabel,
    ]);
  }

  async assertTextVisible() {
    assertComponentsVisible([
      this.changeDateOfBirthPageHeading,
      this.exampleText,
      this.ageRequirementText,
      this.summaryTextPreview,
    ]);
  }
}
