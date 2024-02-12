import { Locator, Page } from "@playwright/test";
import {
  assertComponentsVisible,
  assertErrorUtil,
  assertComponentsHidden,
} from "../../utils/visibilityUtils";

export default class CompleteRegistrationPage {
  readonly page: Page;
  // text
  readonly progressDisplay: Locator;
  readonly completeRegistrationPageHeading: Locator;
  readonly completeRegistrationHintText: Locator;
  // link
  // form
  readonly detailsGrid: Locator;
  // buttons
  readonly completeRegistrationButton: Locator;
  readonly changeButtonFirst: Locator;
  readonly changeButtonSecond: Locator;
  readonly changeButtonThird: Locator;
  readonly changeButtonFourth: Locator;
  readonly changeButtonFifth: Locator;
  readonly changeButtonSixth: Locator;
  readonly changeButtonSeventh: Locator;
  readonly changeButtonEighth: Locator;

  constructor(page: Page) {
    this.page = page;
    // text
    this.progressDisplay = page.getByText("100% complete");
    this.completeRegistrationPageHeading = page.getByRole("heading", {
      name: "Check your answers before completing your registration",
    });
    this.completeRegistrationHintText = page.locator(
      `span:text("If you need to change any of your answers later, you can do this in your Be Part of Research account.")`
    );
    // form
    this.detailsGrid = page.locator("dl.govuk-summary-list");
    // buttons
    this.changeButtonFirst = page.locator(`button:text("Change"):nth-child(1)`);
    this.changeButtonSecond = page.locator(
      `button:text("Change"):nth-child(2)`
    );
    this.changeButtonThird = page.locator(`button:text("Change"):nth-child(3)`);
    this.changeButtonFourth = page.locator(
      `button:text("Change"):nth-child(4)`
    );
    this.changeButtonFifth = page.locator(`button:text("Change"):nth-child(5)`);
    this.changeButtonSixth = page.locator(`button:text("Change"):nth-child(6)`);
    this.changeButtonSeventh = page.locator(
      `button:text("Change"):nth-child(7)`
    );
    this.changeButtonEighth = page.locator(
      `button:text("Change"):nth-child(8)`
    );
  }

  // -- on load methods
  async assertButtonsVisible() {
    await assertComponentsVisible([
      this.completeRegistrationHintText,
      this.changeButtonFirst,
      this.changeButtonSecond,
      this.changeButtonThird,
      this.changeButtonFourth,
      this.changeButtonFifth,
      this.changeButtonSixth,
      this.changeButtonSeventh,
      this.changeButtonEighth,
    ]);
  }

  async assertTextVisible() {
    await assertComponentsVisible([
      this.progressDisplay,
      this.completeRegistrationPageHeading,
      this.completeRegistrationHintText,
    ]);
  }

  async assertDetailsGridVisible() {
    await assertComponentsVisible([this.detailsGrid]);
  }
}
