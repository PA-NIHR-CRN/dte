import { expect, Locator, Page } from "@playwright/test";
import { assertComponentsVisible } from "../../utils/visibilityUtils";

export default class ChangeOptionalPhoneNumberPage {
  readonly page: Page;
  // text
  readonly changeOptionalPhoneNumberPageHeading: Locator;
  readonly phoneNumberHintText: Locator;
  readonly summaryTextPreview: Locator;
  readonly summaryText: Locator;
  // form
  readonly mobileNumberInput: Locator;
  readonly mobileNumberLabel: Locator;
  readonly landlineNumberInput: Locator;
  readonly landlineNumberLabel: Locator;
  // buttons
  readonly saveButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // text
    this.changeOptionalPhoneNumberPageHeading = page.getByRole("heading", {
      name: "What is your phone number? (optional)",
      exact: true,
    });
    this.phoneNumberHintText = page.locator(
      `span:text("You may provide either a mobile or a landline number if you choose.")`
    );
    this.summaryTextPreview = page.locator(
      `span:text("Why we are asking this question")`
    );
    this.summaryText = page.locator(
      `span:text("Study teams may need to have a contact phone number for volunteers. Some studies will offer text messages as a way to contact volunteers, they will need your mobile number if you choose for them to contact you in this way.")`
    );
    // form
    this.mobileNumberInput = page.getByLabel("Mobile number");
    this.mobileNumberLabel = page.locator(`label#mobileNumber--label`);
    this.landlineNumberInput = page.getByLabel("Landline number");
    this.landlineNumberLabel = page.locator(`label#landlineNumber--label`);
    // buttons
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.cancelButton = page.getByRole("link", { name: "Cancel", exact: true });
  }

  // -- on load methods
  async assertButtonsVisible() {
    await assertComponentsVisible([this.saveButton, this.cancelButton]);
  }

  async assertFormVisible() {
    await assertComponentsVisible([
      this.mobileNumberInput,
      this.mobileNumberLabel,
      this.landlineNumberInput,
      this.landlineNumberLabel,
    ]);
  }

  async assertTextVisible() {
    await assertComponentsVisible([
      this.changeOptionalPhoneNumberPageHeading,
      this.phoneNumberHintText,
      this.summaryTextPreview,
    ]);
  }
}
