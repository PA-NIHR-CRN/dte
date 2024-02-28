import { expect, Locator, Page } from "@playwright/test";
import { assertComponentsVisible } from "../../utils/visibilityUtils";

export default class ChangeEmailPage {
  readonly page: Page;
  // text
  readonly changeNamePageHeading: Locator;
  // form
  readonly changeFirstNameInput: Locator;
  readonly changeFirstNameLabel: Locator;
  readonly changeLastNameInput: Locator;
  readonly changeLastNameLabel: Locator;
  // buttons
  readonly saveButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // text
    this.changeNamePageHeading = page.getByRole("heading", {
      name: "What is your name?",
    });
    // form
    this.changeFirstNameInput = page.getByLabel("First name");
    this.changeFirstNameLabel = page.locator("label#firstName--label");
    this.changeLastNameInput = page.getByLabel("Last name");
    this.changeLastNameLabel = page.locator("label#lastName--label");
    // buttons
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.cancelButton = page.getByRole("link", { name: "Cancel", exact: true });
  }

  // -- on load methods
  async assertButtonsVisible() {
    await assertComponentsVisible([this.saveButton, this.cancelButton]);
  }

  async assertFormVisible() {
    await assertComponentsVisible([
      this.changeFirstNameInput,
      this.changeFirstNameLabel,
      this.changeLastNameInput,
      this.changeLastNameLabel,
    ]);
  }

  async assertTextVisible() {
    await assertComponentsVisible([this.changeNamePageHeading]);
  }
}
