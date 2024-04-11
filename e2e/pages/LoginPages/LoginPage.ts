import { Locator, Page } from "@playwright/test";
import { assertComponentsVisible } from "../../utils/visibilityUtils";

export default class LoginPage {
  readonly page: Page;
  // text
  readonly loginHeading: Locator;
  // form
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  // buttons
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // text
    this.loginButton = page.getByRole("heading", {
      name: "Sign in to Be Part of Research",
    });
    // form
    this.emailInput = page.locator(`input#email`);
    this.passwordInput = page.locator(`input#password`);
    // button
    this.loginButton = page.getByRole("button", { name: "Sign in" });
  }

  async assertPage() {
    await this.page.goto(
      "https://test.volunteer.bepartofresearch.nihr.ac.uk/UserLogin"
    );
  }
  async assertFormVisible() {
    await assertComponentsVisible([this.emailInput, this.passwordInput]);
  }
}
