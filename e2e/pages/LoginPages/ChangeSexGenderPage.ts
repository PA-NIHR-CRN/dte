import { Locator, Page } from "@playwright/test";
import { assertComponentsVisible } from "../../utils/visibilityUtils";

export default class ChangeSexGenderPage {
  readonly page: Page;
  // text
  readonly changeSexGenderPageHeading: Locator;
  readonly sexFormHeading: Locator;
  readonly genderFormHeading: Locator;
  readonly sexGenderHintText: Locator;
  readonly summaryTextPreview: Locator;
  readonly summaryText1: Locator;
  readonly summaryText2: Locator;
  // sex form
  readonly sexRadioFemaleInput: Locator;
  readonly sexRadioFemaleLabel: Locator;
  readonly sexRadioMaleInput: Locator;
  readonly sexRadioMaleLabel: Locator;
  // gender form
  readonly genderRadioYesInput: Locator;
  readonly genderRadioYesLabel: Locator;
  readonly genderRadioNoInput: Locator;
  readonly genderRadioNoLabel: Locator;
  readonly genderRadioPreferNotInput: Locator;
  readonly genderRadioPreferNotLabel: Locator;
  // buttons
  readonly saveButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // text
    this.changeSexGenderPageHeading = page.getByRole("heading", {
      name: "Sex and gender identity",
      exact: true,
    });
    this.sexFormHeading = page.getByRole("heading", {
      name: "What is your sex?",
    });
    this.genderFormHeading = page.getByRole("heading", {
      name: "Is the gender you identify with the same as your sex registered at birth?",
    });
    this.sexGenderHintText = page.locator(
      `p:text("This question is about your sex registered at birth.")`
    );
    this.summaryTextPreview = page.locator(
      `span:text("Why we are asking this question")`
    );
    this.summaryText1 = page.locator(
      `span:text("Some studies can only include people of a specific sex, or may be focused on people whose gender differs from their assigned sex at birth. We may use this information when contacting you about studies you may be interested in.")`
    );
    this.summaryText2 = page.locator(
      `span:text("We're also asking this so we can make sure there is a mix of different people taking part in research. We want to make sure everyone 18 and over in the UK feels able to take part in research if they wish to and look to improve our service where our data shows this may not be the case.")`
    );
    // sex form
    this.sexRadioFemaleInput = page.locator("input#sexRadio-1");
    this.sexRadioFemaleLabel = page.locator("label#sexRadio-1--label");
    this.sexRadioMaleInput = page.locator("label#sexRadio-2");
    this.sexRadioMaleLabel = page.locator("label#sexRadio-2--label");
    // gender form
    this.genderRadioYesInput = page.locator("genderRadio-1");
    this.genderRadioYesLabel = page.locator("genderRadio-1--label");
    this.genderRadioNoInput = page.locator("genderRadio-2");
    this.genderRadioNoLabel = page.locator("genderRadio-2--label");
    this.genderRadioPreferNotInput = page.locator("genderRadio-3");
    this.genderRadioPreferNotLabel = page.locator("genderRadio-3--label");
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
      this.sexRadioFemaleInput,
      this.sexRadioFemaleInput,
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
      this.changeSexGenderPageHeading,
      this.sexFormHeading,
      this.genderFormHeading,
      this.sexGenderHintText,
      this.summaryTextPreview,
    ]);
  }
}
