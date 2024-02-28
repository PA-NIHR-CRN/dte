import { expect, Locator, Page } from "@playwright/test";
import { assertComponentsVisible } from "../../utils/visibilityUtils";

export default class CloseAccountPage {
  readonly page: Page;
  // text
  readonly closeAccountPageHeading: Locator;
  readonly textFirst: Locator;
  readonly textSecond: Locator;
  readonly textThird: Locator;
  readonly textFourth: Locator;
  readonly confirmCloseAccountText: Locator;
  // link
  readonly researchPrivacyPolicyLink: Locator;
  // buttons
  readonly backButton: Locator;
  readonly closeAccountButton: Locator;
  readonly confirmCloseAccountButton: Locator;
  readonly cancelCloseAccountButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // text
    this.closeAccountPageHeading = page.getByRole("heading", {
      name: "Close your account",
      exact: true,
    });
    this.textFirst = page.locator(
      `span:text("If you have changed your mind and wish to close your account, you are withdrawing your consent for Be Part of Research to process and store your personal information.")`
    );
    this.textSecond = page.locator(
      `span:text("Be Part of Research will no longer contact you about areas of research you have expressed an interest in.")`
    );
    this.textThird = page.locator(
      `span:text("When closing your account Be Part of Research will keep some anonymous data to help improve the service. To find out more please read the Be Part of Research Privacy Policy.")`
    );
    this.textFourth = page.locator(
      `span:text("To take part in the future you can register again.")`
    );
    this.confirmCloseAccountText = page.locator(
      `b:text("Confirm if you want to close your account")`
    );
    // link
    this.researchPrivacyPolicyLink = page.getByRole("link", {
      name: "Be Part of Research Privacy Policy",
      exact: true,
    });
    // buttons
    this.backButton = page.getByRole("link", { name: "Back", exact: true });
    this.closeAccountButton = page.getByRole("button", {
      name: "Close your account",
    });
    this.confirmCloseAccountButton = page.getByRole("button", {
      name: "Confirm",
      exact: true,
    });
    this.cancelCloseAccountButton = page.getByRole("button", {
      name: "Cancel",
    });
  }

  // -- on load methods
  async assertTextVisible() {
    await assertComponentsVisible([
      this.closeAccountPageHeading,
      this.textFirst,
      this.textSecond,
      this.textThird,
      this.textFourth,
      this.confirmCloseAccountText,
    ]);
  }

  async assertLinksVisible() {
    await assertComponentsVisible([this.researchPrivacyPolicyLink]);
  }

  async assertButtonsVisible() {
    await assertComponentsVisible([
      this.backButton,
      this.closeAccountButton,
      this.confirmCloseAccountButton,
      this.cancelCloseAccountButton,
    ]);
  }
}
