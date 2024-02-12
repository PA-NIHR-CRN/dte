import { Locator, Page } from "@playwright/test";
import {
  assertComponentsVisible,
  assertErrorUtil,
  assertComponentsHidden,
} from "../../utils/visibilityUtils";

export default class PhoneNumberOptionalPage {
  readonly page: Page;
  // --- text --- //
  readonly PhoneNumberOptionalPageHeading: Locator;
  readonly progressDisplay: Locator;
  readonly phoneNumberHintText: Locator;
  readonly summaryTextPreview: Locator;
  readonly summaryText: Locator;
  // --- links --- //
  // --- form --- //
  readonly mobileInput: Locator;
  readonly mobileLabel: Locator;
  readonly landlineInput: Locator;
  readonly landlineLabel: Locator;
  // --- buttons --- //
  readonly backButton: Locator;
  readonly continueButton: Locator;
  // --- errors --- //
  readonly mobileErrorMessage: Locator;
  readonly landlineErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // --- text --- //
    this.PhoneNumberOptionalPageHeading = page.getByRole("heading", {
      name: "What is your phone number? (optional)",
    });
    this.progressDisplay = page.getByText("46% complete");
    this.phoneNumberHintText = page.locator(
      `span:text("You may provide either a mobile or a landline number if you choose.")`
    );
    this.summaryTextPreview = page.locator(
      `span:text("Why we are asking this question")`
    );
    this.summaryText = page.locator(
      `span:text('Study teams may need to have a contact phone number for volunteers. Some studies will offer text messages as a way to contact volunteers, they will need your mobile number if you choose for them to contact you in this way.')`
    );
    // --- form --- //
    this.mobileInput = page.locator("input#mobileNumber");
    this.mobileLabel = page.locator("label#mobileNumber--label");
    this.landlineInput = page.locator("input#landlineNumber");
    this.landlineLabel = page.locator("label#landlineNumber--label");
    // --- buttons --- //
    this.backButton = page.getByTitle("Return to previous page");
    this.continueButton = page.getByRole("button", { name: "Continue" });
    // --- errors --- //
    this.mobileErrorMessage = page.locator("span#mobileNumber--error-message");
    this.landlineErrorMessage = page.locator(
      "span#landlineNumber--error-message"
    );
  }

  // -- on load methods
  async assertButtonsVisible() {
    await assertComponentsVisible([this.backButton, this.continueButton]);
  }

  async assertFormVisible() {
    await assertComponentsVisible([
      this.mobileInput,
      this.mobileLabel,
      this.landlineInput,
      this.landlineLabel,
    ]);
  }

  async assertTextVisible() {
    await assertComponentsVisible([
      this.PhoneNumberOptionalPageHeading,
      this.progressDisplay,
      this.phoneNumberHintText,
      this.summaryTextPreview,
    ]);
  }
}
