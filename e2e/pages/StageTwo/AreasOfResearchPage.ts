import { Locator, Page } from "@playwright/test";
import {
  assertComponentsVisible,
  assertErrorUtil,
  assertComponentsHidden,
} from "../../utils/visibilityUtils";

export default class AreasOfResearchPage {
  readonly page: Page;

  // --- text --- //
  readonly progressDisplay: Locator;
  readonly areasOfResearchPageHeading: Locator;
  readonly textFirst: Locator;
  readonly textSecond: Locator;
  readonly textThird: Locator;
  readonly summaryTextPreview: Locator;
  readonly summarytextFirst: Locator;
  readonly summaryTextSecond: Locator;
  // --- link --- //
  readonly healthyVolunteersLink: Locator;
  // --- form --- //
  readonly areasOfResearchInput: Locator;
  readonly areasOfResearchLabel: Locator;
  readonly clearInputButton: Locator;
  // --- buttons --- //
  readonly continueButton: Locator;
  readonly backButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // --- text --- //
    this.progressDisplay = page.getByText("92% complete");
    this.areasOfResearchPageHeading = page.getByRole("heading", {
      name: "Which areas of research are you interested in?",
    });
    this.textFirst = page.locator(
      `span:text("Start entering details below to see different areas of research. You can select as many options as you like.")`
    );
    this.textSecond = page.locator(
      `span:text("For example, you can enter a health condition like 'diabetes', 'heart disease' or 'COVID-19'. You can take part whether you have a health condition or not by entering 'healthy volunteers'.")`
    );
    this.textThird = page.locator(
      `span:text("If you are using a keyboard to navigate, you will need to use the tab key to move through the options in the drop-down list.")`
    );
    this.summaryTextPreview = page.locator(
      `span:text("Why are we asking this question")`
    );
    this.summarytextFirst = page.locator(
      `span:text("We will use this information to contact you about studies you may be interested in based on the areas of research you select here.")`
    );
    this.summaryTextSecond = page.locator(
      `span:text("If you do not select any areas of research we will only be able to let you know about a limited number of studies based on the other information you have given during your account creation.")`
    );
    // --- link --- //
    this.healthyVolunteersLink = page.locator(
      `span:text("healthy volunteers")`
    );
    // --- form --- //
    this.areasOfResearchInput = page.locator("input#healthConditions");
    this.areasOfResearchLabel = page.locator("label#healthConditions--label");
    this.clearInputButton = page.locator(
      `button[aria-label="Clear your search"]`
    );
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.backButton = page.getByTitle("Return to previous page");
  }

  // -- on load methods
  async assertButtonsVisible() {
    await assertComponentsVisible([this.continueButton, this.backButton]);
  }

  async assertFormVisible() {
    await assertComponentsVisible([
      this.areasOfResearchInput,
      this.areasOfResearchLabel,
      this.clearInputButton,
    ]);
  }

  async assertTextVisible() {
    await assertComponentsVisible([
      this.progressDisplay,
      this.areasOfResearchPageHeading,
      this.textFirst,
      this.textSecond,
      this.textThird,
      this.summaryTextPreview,
    ]);
  }

  async assertLinkVisible() {
    await assertComponentsVisible([this.healthyVolunteersLink]);
  }
}
