import { Locator, Page } from "@playwright/test";
import {
  assertComponentsVisible,
  assertErrorUtil,
  assertComponentsHidden,
} from "../../utils/visibilityUtils";

export default class ThankYouPage {
  readonly page: Page;
  // text
  readonly thankYouPageHeading: Locator;
  readonly textFirst: Locator;
  readonly textSecond: Locator;
  readonly listTitle: Locator;
  readonly listItemFirst: Locator;
  readonly listItemSecond: Locator;
  readonly textThird: Locator;
  readonly textFourth: Locator;
  readonly textFifth: Locator;
  // links
  readonly moreInfoLink: Locator;
  readonly researchOpportunitiesLink: Locator;
  // form
  // buttons
  readonly goToMyAccountButton: Locator;
  readonly signUpNewsletterButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // text
    this.thankYouPageHeading = page.getByRole("heading", {
      name: "Thank you for registering for Be Part of Research",
    });
    this.textFirst = page.locator(
      `span:text("We'll keep in touch with you about opportunities to take part in studies based on the information you have provided.")`
    );
    this.textSecond = page.locator(
      `span:text("You may hear from us in weeks or months or it may be longer depending on the areas of research you've chosen.")`
    );
    this.listTitle = page.locator(
      `span:text("From your account page you can:")`
    );
    this.listItemFirst = page.locator(`span:text("update your details")`);
    this.listItemSecond = page.locator(`span:text('delete your account')`);
    this.textThird = page.locator(
      `span:text("Our newsletter covers a range of interesting news and opportunities about research from around the UK, stay up to date by signing up today!")`
    );
    this.textFourth = page.locator(
      `p:text("You can find more information about taking part in research by visiting our main website.")`
    );
    this.textFifth = page.locator(
      `p:text("You can also search for research opportunities near you, hear about the latest health and care discoveries and much more on Be Part of Research.")`
    );
    // links
    this.moreInfoLink = page.locator(
      `a[href="https://bepartofresearch.nihr.ac.uk/taking-part/How-to-take-part/?utm_source=vs-website&utm_medium=referral&utm_campaign=vs-registration-complete"]`
    );
    this.researchOpportunitiesLink = page.locator(
      `a[href="https://bepartofresearch.nihr.ac.uk/?utm_source=vs-website&utm_medium=referral&utm_campaign=vs-registration-complete"]`
    );
    // buttons
    this.goToMyAccountButton = page.getByRole("button", {
      name: "Go to my account",
    });
    this.signUpNewsletterButton = page.getByRole("button", {
      name: "Sign up now",
    });
  }

  // -- on load methods
  async assertButtonsVisible() {
    await assertComponentsVisible([
      this.goToMyAccountButton,
      this.signUpNewsletterButton,
    ]);
  }

  async assertTextVisible() {
    await assertComponentsVisible([
      this.thankYouPageHeading,
      this.textFirst,
      this.textSecond,
      this.listTitle,
      this.listItemFirst,
      this.listItemSecond,
      this.textThird,
      this.textFourth,
      this.textFifth,
    ]);
  }

  async assertLinksVisible() {
    await assertComponentsVisible([
      this.moreInfoLink,
      this.researchOpportunitiesLink,
    ]);
  }
}
