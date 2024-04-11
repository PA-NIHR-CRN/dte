import { expect, Locator, Page } from "@playwright/test";

export default class CookieBanner {
  readonly page: Page;
  readonly cookieHeading: Locator;
  readonly cookieMessage: Locator;
  readonly acceptCookiesButton: Locator;
  readonly rejectCookiesButton: Locator;
  readonly viewCookiesLink: Locator;
  readonly hideCookieMessageButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cookieHeading = page.getByRole("heading", {
      name: "Cookies on Be Part of Research",
    });
    this.cookieMessage = page.getByLabel("Cookies on Be Part of Research");
    this.acceptCookiesButton = page.getByRole("button", {
      name: "Accept additional cookies",
    });
    this.rejectCookiesButton = page.getByRole("button", {
      name: "Reject additional cookies",
    });
    this.viewCookiesLink = page.getByRole("link", { name: "View cookies" });
    this.hideCookieMessageButton = page.getByRole("button", {
      name: "Hide cookie message",
    });
  }

  async goto() {
    await this.page.goto("Participants/Options");
  }

  async assertCookiePolicyVisible() {
    await expect(this.cookieHeading).toBeVisible();
    await expect(this.cookieMessage).toContainText(
      "We use some essential cookies to make this service work.We would like to use additional cookies to remember your settings, understand how you use Be Part of Research and improve the service.We also use cookies set by other sites to help us deliver content via their services."
    );
    await expect(this.acceptCookiesButton).toBeVisible();
    await expect(this.rejectCookiesButton).toBeVisible();
    await expect(this.viewCookiesLink).toBeVisible();
  }

  async acceptCookies() {
    await this.acceptCookiesButton.click();
    await expect(this.cookieMessage).toContainText(
      "You’ve accepted additional cookies. You can view our cookie policy for more information at any time."
    );
  }

  async hideCookieMessage() {
    await this.hideCookieMessageButton.click();
    await expect(this.cookieMessage).toBeHidden();
  }
}
