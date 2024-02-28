import { expect, Locator, Page } from "@playwright/test";
import { assertComponentsVisible } from "../../utils/visibilityUtils";

export default class ChangeEmailPage {
  readonly page: Page;
  // text
  readonly changeEmailPageHeading: Locator;
  readonly summaryTextPreview: Locator;
  readonly summaryText: Locator;
  // form
  readonly newEmailInput: Locator;
  readonly newEmailLabel: Locator;
  readonly confirmEmailInput: Locator;
  readonly confirmEmailLabel: Locator;
  // buttons
  readonly saveButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // text
    this.changeEmailPageHeading = page.getByRole("heading", {
      name: "What is your new email address?",
    });
    this.summaryTextPreview = page.locator(
      `span:text("Why we are asking this question")`
    );
    this.summaryText = page.locator(
      `span:text("We need your email address so we can contact you when we find a suitable study")`
    );
    // form
    this.newEmailInput = page.getByLabel("New email address");
    this.newEmailLabel = page.locator("label#emailAddress--label");
    this.confirmEmailInput = page.getByLabel("Confirm your new email address");
    this.confirmEmailLabel = page.locator("label#confirmEmailAddress--label");
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
      this.newEmailInput,
      this.newEmailLabel,
      this.confirmEmailInput,
      this.confirmEmailLabel,
    ]);
  }

  async assertTextVisible() {
    await assertComponentsVisible([
      this.changeEmailPageHeading,
      this.summaryTextPreview,
    ]);
  }
}
