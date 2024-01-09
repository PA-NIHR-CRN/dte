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
  async goTo() {
    await this.page.goto("Participants/Register/Questions");
  }

  async componentsVisible() {
    await expect(this.backButton).toBeVisible();
    await expect(this.progressDisplay).toBeVisible();
    await expect(this.namePageHeading).toBeVisible();
    await expect(this.firstNameLabel).toBeVisible();
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.firstNameError).toBeHidden();
    await expect(this.lastNameLabel).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.lastNameError).toBeHidden();
    await expect(this.continueButton).toBeVisible();
  }

  async correctContent() {
    await expect(this.backButton).toHaveText("Back");
    await expect(this.progressDisplay).toHaveText("0% complete");
    await expect(this.namePageHeading).toHaveText("What is your name?");
    await expect(this.firstNameLabel).toHaveText("First name");
    await expect(this.lastNameLabel).toHaveText("Last name");
    await expect(this.continueButton).toHaveText("Continue");
  }

  async clickBack() {
    await this.backButton.click();
  }

  async fillFirstName(firstName: string) {
    await this.firstNameInput.click();
    await expect(this.firstNameInput).toBeFocused();
    await this.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.lastNameInput.click();
    await expect(this.lastNameInput).toBeFocused();
    await this.lastNameInput.fill(lastName);
  }

  async validateInputs() {
    const firstNameEmpty =
      (await this.firstNameInput.inputValue()).trim() === "";
    const lastNameEmpty = (await this.lastNameInput.inputValue()).trim() === "";

    if (firstNameEmpty && lastNameEmpty) {
      await expect(this.firstNameError).toHaveText("Enter your first name");
      await expect(this.lastNameError).toHaveText("Enter your last name");
    } else if (firstNameEmpty && !lastNameEmpty) {
      await expect(this.firstNameError).toHaveText("Enter your first name");
    } else if (!firstNameEmpty && lastNameEmpty) {
      await expect(this.lastNameError).toHaveText("Enter your last name");
    } else {
      await expect(this.firstNameError).toBeHidden();
      await expect(this.lastNameError).toBeHidden();
    }
  }

  async clickContinue() {
    await this.continueButton.click();
    await this.validateInputs();
    // Go to next page if no errors found
  }
}
