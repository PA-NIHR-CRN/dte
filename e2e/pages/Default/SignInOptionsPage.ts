import { expect, Locator, Page } from "@playwright/test";

export default class SignInOptionsPage {
  readonly page: Page;
  readonly mainContent: Locator;
  readonly continueToNHSLoginLink: Locator;
  readonly signInWithEmailAddressLink: Locator;
  readonly needAccountText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainContent = page.locator("#main");
    this.continueToNHSLoginLink = page.getByRole("link", {
      name: "Continue to NHS login",
    });
    this.signInWithEmailAddressLink = page.getByRole("link", {
      name: "Sign in with email address",
    });
    this.needAccountText = page.locator("text=Need an account? Register here.");
  }

  async goto() {
    await this.page.goto("Participants/Options");
  }

  async assertMainContentContainsText() {
    await expect(this.mainContent).toContainText(
      "Choose an option below to sign in. You can only use NHS login if you live in England or Wales."
    );
    await expect(this.needAccountText).toBeVisible();
  }

  async assertSignInOptionsVisible() {
    await expect(this.continueToNHSLoginLink).toBeVisible();
    await expect(this.signInWithEmailAddressLink).toBeVisible();
  }

  async signInOptionsRendered() {
    await this.assertMainContentContainsText();
    await this.assertSignInOptionsVisible();
  }

  async clickSignInWithEmailAddress() {
    await this.signInWithEmailAddressLink.click();
  }

  async clickContinueToNHSLogin() {
    await this.continueToNHSLoginLink.click();
  }
}
