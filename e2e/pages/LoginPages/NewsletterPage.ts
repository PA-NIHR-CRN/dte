import { expect, Locator, Page } from "@playwright/test";
import { assertComponentsVisible } from "../../utils/visibilityUtils";

export default class NewsletterPage {
  readonly page: Page;
  // text
  readonly newsletterPageHeading: Locator;
  readonly text: Locator;
  // buttons
  readonly backButton: Locator;
  readonly signupButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // text
    this.newsletterPageHeading = page.getByRole("heading", {
      name: "Be Part of Research Newsletter",
      exact: true,
    });
    this.text = page.locator(
      `span:text("As the Be Part of Research Volunteer Service is in 'private beta', it may take some time to hear about studies you can take part in. By signing up to our monthly newsletter, you'll receive all our latest news and hear of more opportunities to take part in research from across the UK.")`
    );
    // buttons
    this.backButton = page.getByRole("link", { name: "Back", exact: true });
    this.signupButton = page.getByRole("button", { name: "Continue" });
  }

  // -- on load methods
  async assertTextVisible() {
    await assertComponentsVisible([this.newsletterPageHeading, this.text]);
  }

  async assertButtonsVisible() {
    await assertComponentsVisible([this.backButton, this.signupButton]);
  }
}
