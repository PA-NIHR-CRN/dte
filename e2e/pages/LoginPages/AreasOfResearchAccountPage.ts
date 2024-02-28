import { Locator, Page } from "@playwright/test";
import {
  assertComponentsVisible,
  assertErrorUtil,
  assertComponentsHidden,
} from "../../utils/visibilityUtils";

export default class AreasOfResearchAccountPage {
  readonly page: Page;
  // text
  readonly areasOfResearchAccountPageHeading: Locator;
  readonly textFirst: Locator;
  readonly textSecond: Locator;
  readonly textThird: Locator;
  readonly summaryTextPreview: Locator;
  readonly summaryTextFirst: Locator;
  readonly summaryTextSecond: Locator;
  // link
  readonly healthyVolunteersLink: Locator;
  // form
  readonly formInput: Locator;
  readonly formLabel: Locator;
  readonly formClearButton: Locator;
  readonly boneCancerSelect: Locator;
  // buttons
  readonly saveButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // text
    this.areasOfResearchAccountPageHeading = page.getByRole("heading", {
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
      `span:text("Why we are asking this question")`
    );
    this.summaryTextFirst = page.locator(
      `span:text("We will use this information to contact you about studies you may be interested in based on the areas of research you select here.")`
    );
    this.summaryTextSecond = page.locator(
      `span:text("If you do not select any areas of research we will only be able to let you know about a limited number of studies based on the other information you have given during your account creation.")`
    );
    // link
    this.healthyVolunteersLink = page.locator(
      `a[href="https://bepartofresearch.nihr.ac.uk/taking-part/volunteering-without-a-condition/"]`
    );
    // form
    this.formInput = page.getByLabel("Areas of research");
    this.formLabel = page.locator("label#healthConditions--label");
    this.formClearButton = page.locator("button[data-testid='clear-icon'");
    this.boneCancerSelect = page.locator(`input#healthConditionscheckboxes-5`);

    // buttons
    this.saveButton = page.getByRole("button", { name: "Save" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });
  }

  // -- on load methods
  async assertButtonsVisible() {
    await assertComponentsVisible([this.saveButton, this.cancelButton]);
  }

  async assertFormVisible() {
    await assertComponentsVisible([
      this.formClearButton,
      this.formInput,
      this.formLabel,
    ]);
  }

  async assertLinksVisible() {
    await assertComponentsVisible([this.healthyVolunteersLink]);
  }

  async assertTextVisible() {
    await assertComponentsVisible([
      this.areasOfResearchAccountPageHeading,
      this.textFirst,
      this.textSecond,
      this.textThird,
      this.summaryTextPreview,
    ]);
  }
}
