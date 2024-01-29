import { Locator, Page, expect } from "@playwright/test";
import { assertErrorUtil } from "../../utils/errorUtils";
import { assertComponentsVisible } from "../../utils/visibilityUtils";
export default class NamePage {
  // variables
  readonly page: Page;
  readonly backButton: Locator;
  readonly progressDisplay: Locator;
  readonly namePageHeading: Locator;
  readonly firstNameLabel: Locator;
  readonly firstNameInput: Locator;
  readonly firstNameError: Locator;
  readonly lastNameLabel: Locator;
  readonly lastNameInput: Locator;
  readonly lastNameError: Locator;
  readonly continueButton: Locator;

  // constructor
  constructor(page: Page) {
    this.page = page;
    this.backButton = page.getByTitle("Return to previous page");

    this.progressDisplay = page.getByText("0% complete");
    this.namePageHeading = page.getByRole("heading", {
      name: "What is your name?",
    });
    this.firstNameLabel = page.getByText("First name");
    this.firstNameInput = page.getByLabel("First name");
    this.firstNameError = page.locator("span#firstName--error-message");
    this.lastNameLabel = page.getByText("Last name");
    this.lastNameInput = page.getByLabel("Last name");
    this.lastNameError = page.locator("span#lastName--error-message");
    this.continueButton = page.getByRole("button", { name: "Continue" });
  }

  // methods
  // --- LOAD PAGE METHODS --- //
  async goTo() {
    await this.page.goto("Participants/Register/Questions");
  }

  // --- ON LOAD METHODS --- //
  // check button components are visible on load
  async assertButtonsVisible() {
    await assertComponentsVisible([this.backButton, this.continueButton]);
  }

  // check all text components are visible on load
  async assertTextVisible() {
    await assertComponentsVisible([this.progressDisplay, this.namePageHeading]);
  }

  // check form components are visible on load
  async assertFormVisible() {
    await assertComponentsVisible([
      this.firstNameLabel,
      this.firstNameInput,
      this.lastNameLabel,
      this.lastNameInput,
    ]);
  }

  // --- CORRECT CONTENT METHODS --- //
  // check components have the correct text content
  async assertCorrectContent() {
    await expect(this.backButton).toContainText("Back");
    await expect(this.progressDisplay).toHaveText("0% complete");
    await expect(this.namePageHeading).toHaveText("What is your name?");
    await expect(this.firstNameLabel).toHaveText("First name");
    await expect(this.lastNameLabel).toHaveText("Last name");
    await expect(this.continueButton).toHaveText("Continue");
  }

  // Check no error messages visible before continue button pressed
  async assertErrorsHidden() {
    await expect(this.firstNameError).toBeHidden();
    await expect(this.lastNameError).toBeHidden();
  }
}
