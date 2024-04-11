import { Locator, Page } from "@playwright/test";

export default class NhsLogin {
  readonly page: Page;
  readonly emailAddressInput: Locator;
  readonly passwordInput: Locator;
  readonly securityCodeInput: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailAddressInput = page.getByLabel("Email address");
    this.passwordInput = page.getByLabel("Password", { exact: true });
    this.securityCodeInput = page.getByLabel("Security code", { exact: true });
    this.continueButton = page.getByRole("button", { name: "Continue" });
  }

  async fillEmail(email: string) {
    await this.emailAddressInput.click();
    await this.emailAddressInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
  }

  async fillSecurityCode(code: string) {
    await this.securityCodeInput.click();
    await this.securityCodeInput.fill(code);
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async login(email: string, password: string, code: string) {
    await this.fillEmail(email);
    await this.clickContinue();
    await this.fillPassword(password);
    await this.clickContinue();
    await this.fillSecurityCode(code);
    await this.clickContinue();
  }
}
