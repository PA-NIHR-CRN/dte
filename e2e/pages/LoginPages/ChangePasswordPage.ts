import { expect, Locator, Page } from "@playwright/test";
import { assertComponentsVisible } from "../../utils/visibilityUtils";

export default class ChangeEmailPage {
  readonly page: Page;
  // text
  readonly changePasswordPageHeading: Locator;
  readonly textFirst: Locator;
  readonly textSecond: Locator;
  readonly textThird: Locator;
  // form
  readonly currentPasswordInput: Locator;
  readonly currentPasswordLabel: Locator;
  readonly currentPasswordShowButton: Locator;
  readonly createPasswordInput: Locator;
  readonly createPasswordLabel: Locator;
  readonly createPasswordShowButton: Locator;
  readonly confirmPasswordInput: Locator;
  readonly confirmPasswordLabel: Locator;
  readonly confirmPasswordShowButton: Locator;
  // buttons
  readonly saveButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // text
    this.changePasswordPageHeading = page.getByRole("heading", {
      name: "Change your password",
    });
    this.textFirst = page.locator(
      `span:text("Your password must be 12 or more characters. You can use a mix of letters, numbers or symbols which must include at least 1 capital letter, 1 lowercase letter, 1 number and 1 symbol.")`
    );
    this.textSecond = page.locator(
      `span:text("We recommend using three random words to generate your password, e.g. 'applenemobiro' as these are easy for you to remember and hard for others to guess.")`
    );
    this.textThird = page.locator(
      `span:text("You should avoid family and pet names, your favourite sports team, and dates and locations related to you.")`
    );
    // form
    this.currentPasswordInput = page.getByLabel("Current password");
    this.currentPasswordLabel = page.locator("label#currentPassword--label");
    this.createPasswordInput = page.getByLabel("Create new password");
    this.createPasswordLabel = page.locator("label#newPassword--label");
    this.confirmPasswordInput = page.getByLabel("Confirm new password");
    this.confirmPasswordLabel = page.locator("label#confirmNewPassword--label");
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
      this.currentPasswordInput,
      this.currentPasswordLabel,
      this.createPasswordInput,
      this.createPasswordLabel,
      this.confirmPasswordInput,
      this.confirmPasswordLabel,
    ]);
  }

  async assertTextVisible() {
    await assertComponentsVisible([
      this.changePasswordPageHeading,
      this.textFirst,
      this.textSecond,
      this.textThird,
    ]);
  }
}
