import { Locator, Page } from "@playwright/test";
import {
  assertComponentsVisible,
  assertErrorUtil,
  assertComponentsHidden,
} from "../../utils/visibilityUtils";

export default class SexGenderPage {
  readonly page: Page;
  // --- text --- //
  readonly progressDisplay: Locator;
  readonly sexGenderPageHeading: Locator;
  readonly sexFormHeading: Locator;
  readonly sexGenderHintText: Locator;
  readonly genderFormHeading: Locator;
  readonly summaryTextPreview: Locator;
  readonly summaryText1: Locator;
  readonly summaryText2: Locator;
  // --- links --- //
  // --- forms --- //
  readonly sexRadioFemaleInput: Locator;
  readonly sexRadioFemaleLabel: Locator;
  readonly sexRadioMaleInput: Locator;
  readonly sexRadioMaleLabel: Locator;

  readonly genderRadioYesInput: Locator;
  readonly genderRadioYesLabel: Locator;
  readonly genderRadioNoInput: Locator;
  readonly genderRadioNoLabel: Locator;
  readonly genderRadioPreferNotInput: Locator;
  readonly genderRadioPreferNotLabel: Locator;
  // --- buttons --- //
  readonly backButton: Locator;
  readonly continueButton: Locator;
  // --- errors --- //
  readonly sexError: Locator;
  readonly genderError: Locator;

  constructor(page: Page) {
    this.page = page;
    // --- text --- //
    this.progressDisplay = page.getByText("54% complete");
    this.sexGenderPageHeading = page.getByRole("heading", {
      name: "Sex and gender identity",
    });
    this.sexFormHeading = page.getByRole("heading", {
      name: "What is your sex?",
    });
    this.sexGenderHintText = page.locator(
      `p:text("This question is about your sex registered at birth.")`
    );
    this.genderFormHeading = page.getByRole("heading", {
      name: "Is the gender you identify with the same as your sex registered at birth?",
    });
    this.summaryTextPreview = page.locator(
      `span:text("Why we are asking this question")`
    );
    this.summaryText1 = page.locator(
      `span:text("Some studies can only include people of a specific sex, or may be focused on people whose gender differs from their assigned sex at birth. We may use this information when contacting you about studies you may be interested in.")`
    );
    this.summaryText2 = page.locator(
      `span:text("We're also asking this so we can make sure there is a mix of different people taking part in research. We want to make sure everyone 18 and over in the UK feels able to take part in research if they wish to and look to improve our service where our data shows this may not be the case.")`
    );
    // --- forms --- //
    this.sexRadioFemaleInput = page.locator("input#sexRadio-1");
    this.sexRadioFemaleLabel = page.locator("label#sexRadio-1--label");
    this.sexRadioMaleInput = page.locator("label#sexRadio-2");
    this.sexRadioMaleLabel = page.locator("label#sexRadio-2--label");

    this.genderRadioYesInput = page.locator("genderRadio-1");
    this.genderRadioYesLabel = page.locator("genderRadio-1--label");
    this.genderRadioNoInput = page.locator("genderRadio-2");
    this.genderRadioNoLabel = page.locator("genderRadio-2--label");
    this.genderRadioPreferNotInput = page.locator("genderRadio-3");
    this.genderRadioPreferNotLabel = page.locator("genderRadio-3--label");

    // --- buttons --- //
    this.backButton = page.getByTitle("Return to previous page");
    this.continueButton = page.getByRole("button", { name: "Continue" });

    // --- errors --- //
    this.sexError = page.locator("span#sexRadio--error-message");
    this.genderError = page.locator("span#genderRadio--error-message");
  }

  // -- on load methods
  async assertButtonsVisible() {
    await assertComponentsVisible([this.backButton, this.continueButton]);
  }

  async assertFormVisible() {
    await assertComponentsVisible([
      this.sexRadioFemaleInput,
      this.sexRadioFemaleLabel,
      this.sexRadioMaleInput,
      this.sexRadioMaleLabel,
      this.genderRadioYesInput,
      this.genderRadioYesLabel,
      this.genderRadioNoInput,
      this.genderRadioNoLabel,
      this.genderRadioPreferNotInput,
      this.genderRadioPreferNotLabel,
    ]);
  }

  async assertTextVisible() {
    await assertComponentsVisible([
      this.progressDisplay,
      this.sexGenderPageHeading,
      this.sexFormHeading,
      this.sexGenderHintText,
      this.genderFormHeading,
      this.summaryTextPreview,
    ]);
  }
}
