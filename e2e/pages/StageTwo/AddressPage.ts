import { Locator, Page } from "@playwright/test";
import {
  assertComponentsVisible,
  assertErrorUtil,
  assertComponentsHidden,
} from "../../utils/visibilityUtils";

export default class AddressPage {
  readonly page: Page;

  // --- --- --- TEXT --- --- --- //
  readonly progressDisplay: Locator;
  readonly addressPageHeading: Locator;
  readonly summaryTextPreview: Locator;
  readonly summaryText1: Locator;
  readonly summaryText2: Locator;
  readonly hiddenPostcodeTitle: Locator;

  // --- --- --- LINKS --- --- --- //

  // --- --- --- FORM --- --- --- //
  readonly postcodeInput: Locator;
  readonly postcodeLabel: Locator;
  readonly addressSelectorDropdown: Locator;
  readonly addressSelectorDropdownLabel: Locator;

  readonly addressLine1InputManualEntry: Locator;
  readonly addressLine1LabelManualEntry: Locator;
  readonly addressLine2InputManualEntry: Locator;
  readonly addressLine2LabelManualEntry: Locator;
  readonly addressLine3InputManualEntry: Locator;
  readonly addressLine3LabelManualEntry: Locator;
  readonly addressLine4InputManualEntry: Locator;
  readonly addressLine4LabelManualEntry: Locator;
  readonly townInputManualEntry: Locator;
  readonly townLabelManualEntry: Locator;

  // --- --- --- BUTTONS --- --- --- //
  readonly findAddressButton: Locator;
  readonly manualEntryButton: Locator;
  readonly findByPostcodeButton: Locator;
  readonly continueButton: Locator;

  // --- --- --- ERROR --- --- --- //
  readonly postcodeErrorMessage: Locator;
  readonly addressLine1ErrorMessage: Locator;
  readonly townErrorMessage: Locator;
  readonly changePostcodeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // --- --- --- TEXT --- --- --- //
    this.progressDisplay = page.getByText("38% complete");
    this.addressPageHeading = page.getByRole("heading", {
      name: "What is your home address?",
    });
    this.summaryTextPreview = page.locator(
      `span:text("Why we are asking this question")`
    );
    this.summaryText1 = page.locator(
      `span:text("Study teams need a postal address to send you communications by post, if you choose for them to contact you this way.")`
    );
    this.summaryText2 = page.locator(
      `span:text("Some studies only recruit from specific locations, we may use this information when contacting you about studies you may be interested in.")`
    );
    this.hiddenPostcodeTitle = page.locator(
      `p.sc-kAyceB bddXxE:text("Postcode")`
    );
    // --- --- --- LINKS --- --- --- //

    // --- --- --- FORM --- --- --- //
    this.postcodeInput = page.locator("input#postcode");
    this.postcodeLabel = page.locator("label#postcode--label");
    this.addressSelectorDropdown = page.locator("select#select-address");
    this.addressSelectorDropdownLabel = page.locator(
      "label#select-address--label"
    );

    this.addressLine1InputManualEntry = page.locator("input#addressLine1");
    this.addressLine1LabelManualEntry = page.locator(
      "label#addressLine1--label"
    );
    this.addressLine2InputManualEntry = page.locator("input#addressLine2");
    this.addressLine2LabelManualEntry = page.locator(
      "label#addressLine2--label"
    );
    this.addressLine3InputManualEntry = page.locator("input#addressLine3");
    this.addressLine3LabelManualEntry = page.locator(
      "label#addressLine3--label"
    );
    this.addressLine4InputManualEntry = page.locator("input#addressLine4");
    this.addressLine4LabelManualEntry = page.locator(
      "label#addressLine4--label"
    );
    this.townInputManualEntry = page.locator("input#town");
    this.townLabelManualEntry = page.locator("label#town--label");

    // --- --- --- BUTTONS --- --- --- //
    this.findAddressButton = page.getByRole("button", { name: "Find address" });
    this.manualEntryButton = page.locator(
      `span:text("Enter your address manually")`
    );
    this.findByPostcodeButton = page.locator(
      `span.MuiButton-label:text('Find your address by postcode')`
    );
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.changePostcodeButton = page.getByRole("button", { name: "Change" });

    // --- --- --- ERRORS --- --- --- //
    this.postcodeErrorMessage = page.locator("span#postcode--error-message");
    this.addressLine1ErrorMessage = page.locator(
      "span#addressLine1--error-message"
    );
    this.townErrorMessage = page.locator("span#town--error-message");
  }

  // --- --- --- METHODS --- --- --- //

  // --- On load methods
  async goTo() {
    await this.page.goto(
      "https://volunteer.bepartofresearch.nihr.ac.uk/Participants/register/continue/questions"
    );
  }

  async assertButtonsVisible() {
    await assertComponentsVisible([
      this.manualEntryButton,
      this.findAddressButton,
    ]);
  }
  async assertTextVisible() {
    await assertComponentsVisible([
      this.addressPageHeading,
      this.progressDisplay,
      this.summaryTextPreview,
    ]);
  }
  async assertFormVisible() {
    await assertComponentsVisible([this.postcodeInput, this.postcodeLabel]);
  }

  // NEED TO INCLUDE DIFFERENT POSSIBLE USER JOURNEYS. E.G. WHEN USER PRESSES FIND ADDRESS BUT THEN SWITCHES TO MANUAL ENTRY
}
