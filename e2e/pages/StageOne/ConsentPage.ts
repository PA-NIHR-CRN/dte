import { Locator, Page } from "@playwright/test";
import { assertComponentsVisible } from "../../utils/visibilityUtils";
import { assertErrorUtil, assertErrorsHidden } from "../../utils/errorUtils";

export default class ConsentPage {
  readonly page: Page;
  // text
  readonly progressDisplay: Locator;
  readonly consentPageHeading: Locator;
  readonly consentParagraph1: Locator;
  readonly consentParagraph2: Locator;
  readonly consentParagraph3: Locator;
  readonly consentParagraph4: Locator;
  readonly consentParagraph5: Locator;
  // links
  readonly bePartOfResearchLink1: Locator;
  readonly bePartOfResearchLink2: Locator;
  readonly bePartOfResearchLink3: Locator;
  // form
  readonly confirmCheckbox: Locator;
  readonly confirmMessage: Locator;
  // buttons
  readonly registerButton: Locator;
  readonly cancelButton: Locator;
  readonly backButton: Locator;
  // errors
  readonly checkboxErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // text
    this.progressDisplay = page.getByText("31% complete");
    this.consentPageHeading = page.getByRole("heading", {
      name: "Consent to process your data and be contacted by Be Part of Research",
    });
    this.consentParagraph1 = page.getByText(
      "By consenting and registering for the service, you are giving permission for any information you share to be processed by Be Part of Research, a service that is managed and operated by the National Institute for Health and Care Research Clinical Research Network Coordinating Centre (NIHR CRNCC). This will allow Be Part of Research to contact you with information about areas of research you have expressed an interest in, as well as research opportunities of national interest."
    );
    this.consentParagraph2 = page.getByText(
      "To find out more about how the NIHR CRNCC will process and store your information and your rights as a data subject, please read the Be Part of Research Privacy Policy. The Data Controller for this service is the Department of Health and Social Care (DHSC)."
    );
    this.consentParagraph3 = page.getByText(
      "You can withdraw your consent at any time - to do this please see the Be Part of Research Privacy Policy."
    );
    this.consentParagraph4 = page.getByText(
      "If you do not consent to sharing your information, you will not be able to use this service to register your interest and be contacted about research opportunities."
    );
    this.consentParagraph5 = page.getByText(
      "Do you give consent for your information to be processed by the Be Part of Research service provided by NIHR CRNCC on behalf of the DHSC for the purposes outlined above?"
    );
    // links
    this.bePartOfResearchLink1 = page
      .locator('a:text("Be Part of Research Privacy Policy")')
      .nth(0);
    this.bePartOfResearchLink2 = page
      .locator('a:text("Be Part of Research Privacy Policy")')
      .nth(1);
    this.bePartOfResearchLink3 = page
      .locator('a:text("Be Part of Research Privacy Policy")')
      .nth(2);

    // form
    this.confirmCheckbox = page.locator("input#checkbox-1");
    this.confirmMessage = page.getByText(
      "I confirm that I have read and understood the Be Part of Research Privacy Policy."
    );
    //buttons
    this.registerButton = page.getByRole("button", {
      name: "Yes, I consent and wish to register now",
    });
    this.cancelButton = page.getByText(
      "No, I do not consent and wish to cancel this registration"
    );
    this.backButton = page.getByTitle("Return to previous page");
    // errors
    this.checkboxErrorMessage = page.locator("span#checkbox--error-message");
  }

  // LOAD METHODS
  async waitForPageLoad() {
    await this.page.waitForSelector(
      'h1:text("Consent to process your data and be contacted by Be Part of Research")',
      {
        state: "visible",
      }
    );
  }

  // --- ON LOAD METHODS --- //

  async assertButtonsVisible() {
    assertComponentsVisible([
      this.backButton,
      this.registerButton,
      this.cancelButton,
    ]);
  }

  async assertTextVisible() {
    assertComponentsVisible([
      this.consentPageHeading,
      this.consentParagraph1,
      this.consentParagraph2,
      this.consentParagraph3,
      this.consentParagraph4,
      this.consentParagraph5,
    ]);
  }

  async assertFormVisible() {
    assertComponentsVisible([this.confirmCheckbox, this.confirmMessage]);
  }

  async assertErrorsHidden() {
    await assertErrorsHidden(this.checkboxErrorMessage);
  }

  // --- CLICK METHODS --- //

  async clickBack() {
    await this.backButton.click();
  }

  async clickRegister() {
    await this.registerButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }

  async clickBePartOfResearchLink1() {
    await this.bePartOfResearchLink1.click();
  }
  async clickBePartOfResearchLink2() {
    await this.bePartOfResearchLink2.click();
  }
  async clickBePartOfResearchLink3() {
    await this.bePartOfResearchLink3.click();
  }

  // --- FILLING IN FORM METHODS --- //
  async assertClickCheckbox() {
    await this.confirmCheckbox.click();
  }

  // --- ERROR LOGIC --- //
  async assertCheckboxError() {
    await assertErrorUtil(
      this.checkboxErrorMessage,
      "Confirm that the Privacy and Data Sharing Policy has been read and understood before giving consent"
    );
  }
}
