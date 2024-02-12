import { Locator, Page } from "@playwright/test";
import { assertComponentsVisible } from "../../utils/visibilityUtils";
import { assertErrorUtil, assertErrorsHidden } from "../../utils/errorUtils";

export default class EmailVerificationPage {
  readonly page: Page;
  // text
  readonly checkEmailHeading: Locator;
  readonly emailSentMessage: Locator;
  readonly text1: Locator;
  readonly text2: Locator;
  readonly text3: Locator;
  readonly text4: Locator;
  readonly emailResentMessage: Locator;
  // button
  readonly resendVerificationEmailButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // text
    this.checkEmailHeading = page.getByRole("heading", {
      name: "Check your email",
    });
    this.emailSentMessage = page.locator(
      `b:text("We've sent an email to example@gmail.com")`
    );

    this.text1 = page.getByText(
      "You'll need to click on the link to validate it within 24 hours."
    );
    this.text2 = page.getByText(
      "Once you've verified the email, you will be able to continue registration by signing in."
    );
    this.text3 = page.getByText("Unable to find it? Check your spam folder.");
    this.text4 = page.getByText("Still unable to find the email?");
    this.emailResentMessage = page.getByText(
      "We've resent the email. If you need help, please contact bepartofresearch@nihr.ac.uk"
    );
    // button
    this.resendVerificationEmailButton = page.getByRole("button", {
      name: "Resend verification email",
    });
  }

  // ON LOAD
  async assertTextVisible() {
    await assertComponentsVisible([
      this.checkEmailHeading,
      this.text1,
      this.text2,
      this.text3,
      this.text4,
    ]);
  }

  async assertButtonsVisible() {
    await assertComponentsVisible([this.assertButtonsVisible]);
  }

  async clickResendVerificationButton() {
    await this.resendVerificationEmailButton.click();
  }

  async assertResentMessageVisible() {
    await expect(this.emailResentMessage).toBeVisible();
  }
}
