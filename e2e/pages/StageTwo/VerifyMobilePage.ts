import { Locator, Page } from "@playwright/test";
import {
  assertComponentsVisible,
  assertErrorUtil,
  assertComponentsHidden,
} from "../../utils/visibilityUtils";

export default class VerifyMobilePage {
  readonly page: Page;
  // text
  readonly verifyMobilePageHeading: Locator;
  readonly verifyMobilePageText1: Locator;
  readonly verifyMobilePageText2: Locator;
  readonly mfaCodeHintText: Locator;
  readonly notRecievedCodePreviewText: Locator;
  readonly notRecievedCodeText1: Locator;
  readonly notRecievedCodeText2: Locator;
  // links
  readonly authenticatorLink: Locator;
  readonly notRecievedCodeLink1: Locator;
  readonly notRecievedCodeLink2: Locator;
  // form
  readonly mfaCodeInput: Locator;
  readonly mfaCodeLabel: Locator;
  // buttons
  readonly continueButton: Locator;
  readonly backButton: Locator;
  // errors
  readonly verifyMobileError: Locator;

  constructor(page: Page) {
    this.page = page;
    // text
    this.verifyMobilePageHeading = page.getByRole("heading", {
      name: "Check your mobile phone",
    });
    this.verifyMobilePageText1 = page.getByText(
      "Enter the 6 digit security code we've sent to 07966302250 to confirm this is your mobile phone number."
    );
    this.verifyMobilePageText2 = page.getByText(
      "You need to use this code within 5 minutes or it will expire."
    );
    this.mfaCodeHintText = page.locator("div#mfaCode--hint");
    this.notRecievedCodePreviewText = page.getByText(
      "Not received your security code?"
    );
    this.notRecievedCodeText1 = page.locator(
      `span:text("When we are really busy, it may take a bit longer for your code to arrive.")`
    );
    this.notRecievedCodeText2 = page.getByText(
      "If you still did not get a security code:"
    );
    // links
    this.notRecievedCodeLink1 = page.locator(
      `span:text("Send your security code again")`
    );
    this.notRecievedCodeLink2 = page.locator(
      `span:text("enter your mobile phone number again")`
    );
    // form
    this.mfaCodeInput = page.locator("input#mfaCode");
    this.mfaCodeLabel = page.locator("label#mfaCode--label");
    // buttons
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.backButton = page.getByTitle("Return to previous page");
    // errors
    this.verifyMobileError = page.locator("span#mfaCode--error-message");
  }

  // --- LOAD METHODS --- //

  async goTo() {
    await this.page.goto(
      "https://volunteer.bepartofresearch.nihr.ac.uk/MfaSmsChallenge"
    );
  }

  // --- VISIBILITY METHODS --- //
  async assertButtonsVisible() {
    await assertComponentsVisible([this.continueButton, this.backButton]);
  }
  async assertFormVisible() {
    await assertComponentsVisible([this.mfaCodeInput, this.mfaCodeLabel]);
  }
  async assertTextVisible() {
    await assertComponentsVisible([
      this.verifyMobilePageHeading,
      this.verifyMobilePageText1,
      this.verifyMobilePageText2,
      this.mfaCodeHintText,
      this.notRecievedCodePreviewText,
    ]);
  }
  async assertErrorsHidden() {
    await expect(this.verifyMobileError).toBeHidden();
  }
}
