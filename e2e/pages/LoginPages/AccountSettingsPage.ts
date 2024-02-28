import { Locator, Page } from "@playwright/test";
import {
  assertComponentsVisible,
  assertErrorUtil,
  assertComponentsHidden,
} from "../../utils/visibilityUtils";

export default class AccountSettingsPage {
  readonly page: Page;
  // text
  readonly accountSettingsHeading: Locator;
  readonly emailText: Locator;
  readonly passwordText: Locator;
  // buttons
  readonly backButton: Locator;
  readonly changeEmailButton: Locator;
  readonly changePasswordButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // text
    this.accountSettingsHeading = page.getByRole("heading", {
      name: "Account settings",
    });
    this.emailText = page.locator(`p:text("Email address")`);
    this.passwordText = page.locator(`p:text("Password")`);
    // buttons
    this.backButton = page.getByTitle("Return to previous page");
    this.changeEmailButton = page.locator(`button:text("Change"):nth-child(1)`);
    this.changePasswordButton = page.locator(
      `button:text("Change"):nth-child(2)`
    );
  }

  // -- on load methods
  async assertButtonsVisible() {
    await assertComponentsVisible([
      this.backButton,
      this.changeEmailButton,
      this.changePasswordButton,
    ]);
  }

  async assertTextVisible() {
    await assertComponentsVisible([
      this.accountSettingsHeading,
      this.emailText,
      this.passwordText,
    ]);
  }
}
