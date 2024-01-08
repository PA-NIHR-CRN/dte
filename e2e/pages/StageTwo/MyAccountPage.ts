import { expect, Locator, Page } from "@playwright/test";

export default class MyAccountPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly links: Record<string, Locator>;
  readonly mainContent: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: "My account" });
    this.links = {
      accountSettings: page.getByRole("link", { name: "Account settings" }),
      areasOfResearch: page.getByRole("link", { name: "Areas of research" }),
      personalDetails: page.getByRole("link", { name: "Personal details" }),
      searchForStudies: page.getByRole("link", {
        name: "Search for studies on Be Part",
      }),
      newsletter: page.getByRole("link", {
        name: "Be Part of Research Newsletter",
      }),
      closeAccount: page.getByRole("link", { name: "Close your account" }),
      signOut: page.getByRole("link", { name: "Sign out" }),
    };
    this.mainContent = page.locator("#main");
  }

  async assertLinkVisible(linkKey: string) {
    if (this.links[linkKey]) {
      await expect(this.links[linkKey]).toBeVisible();
    } else {
      throw new Error(`Link with key "${linkKey}" not found`);
    }
  }

  async assertAllLinksVisible() {
    for (const key of Object.keys(this.links)) {
      await this.assertLinkVisible(key);
    }
  }

  async assertMainContentText() {
    await expect(this.mainContent).toContainText(
      "You can make changes to your account settings on NHS login."
    );
    await expect(this.mainContent).toContainText(
      "Add, edit or remove areas of research that you are interested in. Remember - you do not need a diagnosis of a disease or condition to take part, lots of studies need healthy volunteers too."
    );
    await expect(this.mainContent).toContainText(
      "Change any information that you've provided about yourself, such as your home address."
    );
    await expect(this.mainContent).toContainText(
      "By clicking this link, you can search for trials and studies taking place for health conditions you are interested in, at locations that are easy for you to get to"
    );
    await expect(this.mainContent).toContainText(
      "By signing up to our monthly newsletter, you'll receive all our latest news and hear of more opportunities to take part in research from across the UK."
    );
    await expect(this.mainContent).toContainText(
      "If you have changed your mind and wish to withdraw your consent to be contacted."
    );
  }

  async clickLink(linkKey: string) {
    if (this.links[linkKey]) {
      await this.links[linkKey].click();
    } else {
      throw new Error(`Link with key "${linkKey}" not found`);
    }
  }

  async assertPageElementsVisible() {
    await expect(this.heading).toBeVisible();
    await this.assertAllLinksVisible();
    await this.assertMainContentText();
  }
}
