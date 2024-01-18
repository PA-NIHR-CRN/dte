import { Locator, Page, expect } from "@playwright/test";

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
    this.backButton = page.getByRole("link", { name: "Back" });
    this.progressDisplay = page.getByText("0% complete");
    this.namePageHeading = page.getByRole("heading", {
      name: "What is your name?",
    });
    this.firstNameLabel = page.getByText("First name");
    this.firstNameInput = page.getByLabel("First name");
    this.firstNameError = page.getByText("Enter your first name");
    this.lastNameLabel = page.getByText("Last name");
    this.lastNameInput = page.getByLabel("Last name");
    this.lastNameError = page.getByText("Enter your last name");
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
    await expect(this.backButton).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }

  // check all text components are visible on load
  async assertTextVisible() {
    await expect(this.progressDisplay).toBeVisible();
    await expect(this.namePageHeading).toBeVisible();
  }

  // check form components are visible on load
  async assertFormVisible() {
    await expect(this.firstNameLabel).toBeVisible();
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameLabel).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
  }

  // Check no error messages visible before continue button pressed
  async assertErrorsHidden() {
    await expect(this.firstNameError).toBeHidden();
    await expect(this.lastNameError).toBeHidden();
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

  // --- CLICK METHODS --- //
  // check for back button click
  async clickBack() {
    await this.backButton.click();
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  // --- FILLING IN FORM METHODS --- //
  // filling the first name input field
  async fillFirstName(firstName: string) {
    await this.firstNameInput.click();
    await expect(this.firstNameInput).toBeFocused();
    await this.firstNameInput.fill(firstName);
  }

  // filling the last name input field
  async fillLastName(lastName: string) {
    await this.lastNameInput.click();
    await expect(this.lastNameInput).toBeFocused();
    await this.lastNameInput.fill(lastName);
  }

  // --- ERROR CHECKING FORM --- //
  async checkInputsFilled(firstName: string, lastName: string) {
    const isFirstNameEmpty = firstName === "";
    const isLastNameEmpty = lastName === "";

    await expect(this.firstNameError).toHaveText(
      isFirstNameEmpty ? "Enter your first name" : ""
    );
    await expect(this.lastNameError).toHaveText(
      isLastNameEmpty ? "Enter your last name" : ""
    );

    await this.firstNameInput.clear();
    await this.lastNameInput.clear();
  }

  async checkInputsValid(firstName: string, lastName: string) {
    const isFirstNameValid = typeof firstName === "number";
    const isLastNameValid = typeof lastName === "number";
  }
}
