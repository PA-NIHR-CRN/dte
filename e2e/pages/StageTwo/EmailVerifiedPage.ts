import { Locator, Page } from "@playwright/test";
import {
  assertComponentsVisible,
  assertErrorUtil,
  assertComponentsHidden,
} from "../../utils/visibilityUtils";

export default class EmailVerifiedPage {
  readonly page: Page;
  // text
  readonly emailVerifiedPageHeading: Locator;
  readonly emailVerifiedText1: Locator;
  readonly emailVerifiedText2: Locator;
  // links
  readonly resetPasswordLink: Locator;
  // form
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly emailLabel: Locator;
  readonly passwordLabel: Locator;
  readonly showPasswordButton: Locator;
  // buttons
  readonly signInButton: Locator;
  // errors
  readonly emailError: Locator;
  readonly passwordError: Locator;

  constructor(page: Page) {
    this.page = page;
    // text
    this.emailVerifiedPageHeading = page.getByRole("heading", {
      name: "Your email address has been verified",
    });
    this.emailVerifiedText1 = page.getByText(
      "Please sign in to continue registration."
    );
    this.emailVerifiedText2 = page.getByText(
      "If you cannot remember your password, you can reset it here."
    );
    // links
    this.resetPasswordLink = page.locator(`a:text("reset it here")`);
    // form
    this.emailInput = page.locator("input#email");
    this.passwordInput = page.locator("input#password");
    this.emailLabel = page.locator("label#email--label");
    this.passwordLabel = page.locator("label#password--label");
    this.showPasswordButton = page.getByRole("button", { name: "Show" });
    // buttons
    this.signInButton = page.getByRole("button", { name: "Sign in" });
    // errors
    this.emailError = page.locator("span#email--error-message");
    this.passwordError = page.locator("span#password--error-message");
  }

  async goTo() {
    await this.page.goto(
      "https://volunteer.bepartofresearch.nihr.ac.uk/verify?code=705065&userId=2216162d-24c0-465a-8ca6-a4de81459ac5"
    );
  }

  async signIn() {
    await this.page.route(
      "/verify?code=705065&userId=2216162d-24c0-465a-8ca6-a4de81459ac5",
      (route) =>
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ token: "fake_token", user: "fake_user" }),
        })
    );
  }

  // --- ON LOAD METHODS --- //
  async assertTextVisible() {
    await assertComponentsVisible([
      this.emailVerifiedPageHeading,
      this.emailVerifiedText1,
      this.emailVerifiedText2,
    ]);
  }

  async assertLinksVisible() {
    await assertComponentsVisible([this.resetPasswordLink]);
  }

  async assertFormVisible() {
    await assertComponentsVisible([
      this.emailInput,
      this.passwordInput,
      this.emailLabel,
      this.passwordLabel,
      this.showPasswordButton,
    ]);
  }

  async assertButtonsVisible() {
    await assertComponentsVisible([this.signInButton]);
  }
}
