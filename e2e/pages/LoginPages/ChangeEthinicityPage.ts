import { Locator, Page } from "@playwright/test";
import { assertComponentsVisible } from "../../utils/visibilityUtils";

export default class EthinicityPage {
  readonly page: Page;

  // --- text --- //
  readonly changeEthinicityPageHeading: Locator;
  readonly changeEthinicityTextFirst: Locator;
  readonly changeEthinicityTextSecond: Locator;
  readonly summaryTextPreview: Locator;
  readonly summaryText1: Locator;
  readonly summaryText2: Locator;

  // --- form --- //
  readonly asianInput: Locator;
  readonly asianLabel: Locator;
  readonly blackInput: Locator;
  readonly blackLabel: Locator;
  readonly mixedInput: Locator;
  readonly mixedLabel: Locator;
  readonly whiteInput: Locator;
  readonly whiteLabel: Locator;
  readonly otherInput: Locator;
  readonly otherLabel: Locator;

  // --- buttons --- //
  readonly cancelButton: Locator;
  readonly continueButton: Locator;

  // --- error --- //
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // --- text --- //
    this.changeEthinicityPageHeading = page.getByRole("heading", {
      name: "What is your ethnic group?",
    });
    this.changeEthinicityTextFirst = page.locator(
      `span:text("If you change your ethnic group you will also need to change your ethnic background in the next question.")`
    );
    this.changeEthinicityTextSecond = page.locator(
      `span:text("Once both questions have been answered the changes can be saved.")`
    );
    this.summaryTextPreview = page.locator(
      `span:text("Why we are asking this question")`
    );
    this.summaryText1 = page.locator(
      `span:text('Many studies want to make sure they have a representative sample of the population taking part in research studies, and some may be looking for people from specific ethnic groups.")`
    );
    this.summaryText2 = page.locator(
      `span:text("If we find that some ethnic groups are under represented when people are signing up to be contacted about research we will look at how to improve this.")`
    );

    // --- form --- //
    this.asianInput = page.locator("input#ethnicityRadio-1");
    this.asianLabel = page.locator("label#ethnicityRadio-1--label");
    this.blackInput = page.locator("input#ethnicityRadio-2");
    this.blackLabel = page.locator("label#ethnicityRadio-2--label");
    this.mixedInput = page.locator("input#ethnicityRadio-3");
    this.mixedLabel = page.locator("label#ethnicityRadio-3--label");
    this.whiteInput = page.locator("input#ethnicityRadio-4");
    this.whiteLabel = page.locator("label#ethnicityRadio-4--label");
    this.otherInput = page.locator("input#ethnicityRadio-5");
    this.otherLabel = page.locator("label#ethnicityRadio-5--label");

    // --- buttons --- //
    this.cancelButton = page.getByRole("link", { name: "Cancel" });
    this.continueButton = page.getByRole("button", { name: "Continue" });

    // --- error --- //
    this.errorMessage = page.locator("span#ethnicityRadio--error-message");
  }

  // -- on load methods
  async assertButtonsVisible() {
    await assertComponentsVisible([this.cancelButton, this.continueButton]);
  }

  async assertFormVisible() {
    await assertComponentsVisible([
      this.asianInput,
      this.asianLabel,
      this.blackInput,
      this.blackLabel,
      this.mixedInput,
      this.mixedLabel,
      this.whiteInput,
      this.whiteLabel,
      this.otherInput,
      this.otherLabel,
    ]);
  }

  async assertTextVisible() {
    await assertComponentsVisible([
      this.changeEthinicityPageHeading,
      this.changeEthinicityTextFirst,
      this.changeEthinicityTextSecond,
      this.summaryTextPreview,
    ]);
  }
}
