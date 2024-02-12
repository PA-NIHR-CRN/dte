import { Locator, Page } from "@playwright/test";
import {
  assertComponentsVisible,
  assertErrorUtil,
  assertComponentsHidden,
} from "../../utils/visibilityUtils";

export default class EthnicBackgroundPage {
  readonly page: Page;

  // --- text --- //
  readonly progressDisplay: Locator;
  readonly ethnicBackgroundPageHeading: Locator;
  readonly summaryTextPreview: Locator;
  readonly summaryText1: Locator;
  readonly summaryText2: Locator;

  // --- form --- //
  readonly inputFirst: Locator;
  readonly labelFirst: Locator;
  readonly inputSecond: Locator;
  readonly labelSecond: Locator;
  readonly inputThird: Locator;
  readonly labelThird: Locator;
  readonly inputFourth: Locator;
  readonly labelFourth: Locator;
  readonly inputFifth: Locator;
  readonly labelFifth: Locator;

  // --- buttons --- //
  readonly backButton: Locator;
  readonly continueButton: Locator;

  // --- error --- //
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // --- text --- //
    this.progressDisplay = page.getByText("69% complete");
    this.ethnicBackgroundPageHeading = page.getByRole("heading", {
      name: "Which of the following best describes your White background?",
    });
    this.summaryTextPreview = page.locator(
      `span:text("Why we are asking this question")`
    );
    this.summaryText1 = page.locator(
      `span:text('Many studies want to make sure they have a representative sample of the population taking part in research studies, and some may be looking for people from specific ethnic backgrounds.")`
    );
    this.summaryText2 = page.locator(
      `span:text("If we find that some ethnic backgrounds are under represented when people are signing up to be contacted about research we will look at how to improve this.")`
    );

    // --- form --- //
    this.inputFirst = page.locator("input#backgroundRadio-1");
    this.labelFirst = page.locator("label#backgroundRadio-1--label");
    this.inputSecond = page.locator("input#backgroundRadio-2");
    this.labelSecond = page.locator("label#backgroundRadio-2--label");
    this.inputThird = page.locator("input#backgroundRadio-3");
    this.labelThird = page.locator("label#backgroundRadio-3--label");
    this.inputFourth = page.locator("input#backgroundRadio-4");
    this.labelFourth = page.locator("label#backgroundRadio-4--label");
    this.inputFifth = page.locator("input#backgroundRadio-5");
    this.labelFifth = page.locator("label#backgroundRadio-5--label");

    // --- buttons --- //
    this.backButton = page.getByTitle("Return to previous page");
    this.continueButton = page.getByRole("button", { name: "Continue" });

    // --- error --- //
    this.errorMessage = page.locator("span#backgroundRadio--error-message");
  }

  // -- on load page
  async assertButtonsVisible() {
    await assertComponentsVisible([this.backButton, this.continueButton]);
  }

  async assertFormVisible() {
    await assertComponentsVisible([
      this.inputFirst,
      this.labelFirst,
      this.inputSecond,
      this.labelSecond,
      this.inputThird,
      this.labelThird,
      this.inputFourth,
      this.labelFourth,
      this.inputFifth,
      this.labelFifth,
    ]);
  }

  async assertTextVisible() {
    await assertComponentsVisible([
      this.progressDisplay,
      this.ethnicBackgroundPageHeading,
      this.summaryTextPreview,
    ]);
  }
  // async assert
}
