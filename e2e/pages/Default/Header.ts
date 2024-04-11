import { expect, Locator, Page } from "@playwright/test";

export default class Header {
  readonly page: Page;
  readonly bePartOfResearchLogoLink: Locator;
  readonly nhsLogoLink: Locator;
  readonly banner: Locator;
  readonly betaText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bePartOfResearchLogoLink = page.locator(
      'a[role="link"][name="Be Part Of Research Logo"]'
    );
    this.nhsLogoLink = page.locator('a[role="link"][name="NHS Logo"]');
    this.banner = page.locator('div[role="banner"]');
    this.betaText = page.locator("text=BETA");
  }

  async goto() {
    await this.page.goto("Participants/Options");
  }
  async assertBePartOfResearchLogoVisible() {
    await expect(this.bePartOfResearchLogoLink).toBeVisible();
  }

  async assertNHSLogoVisible() {
    await expect(this.nhsLogoLink).toBeVisible();
  }

  async assertBannerContainsText(text: string) {
    await expect(this.banner).toContainText(text);
  }

  async assertBetaVisible() {
    await expect(this.betaText).toBeVisible();
  }

  async assertHeaderRendered() {
    await this.assertBePartOfResearchLogoVisible();
    await this.assertNHSLogoVisible();
    await this.assertBannerContainsText("Cookies on Be Part of Research");
    await this.assertBetaVisible();
  }
}
