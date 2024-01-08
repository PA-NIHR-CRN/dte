import { expect, Locator, Page } from "@playwright/test";

export default class HomeAddressPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly postcodeLabel: Locator;
  readonly percentageComplete: Locator;
  readonly findAddressButton: Locator;
  readonly enterAddressManuallyButton: Locator;
  readonly whyAskingText: Locator;
  readonly detailsSection: Locator;
  readonly selectYourAddressDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", {
      name: "What is your home address?",
    });
    this.postcodeLabel = page.getByText("Postcode");
    this.percentageComplete = page.getByText("% complete");
    this.findAddressButton = page.getByRole("button", { name: "Find address" });
    this.enterAddressManuallyButton = page.getByRole("button", {
      name: "Enter your address manually",
    });
    this.whyAskingText = page.getByText("Why we are asking this");
    this.detailsSection = page.locator("#details-0");
    this.selectYourAddressDropdown = page.getByLabel("Select your address");
  }

  async assertPageElementsVisible() {
    await expect(this.heading).toBeVisible();
    await expect(this.postcodeLabel).toBeVisible();
    await expect(this.percentageComplete).toBeVisible();
    await expect(this.findAddressButton).toBeVisible();
    await expect(this.enterAddressManuallyButton).toBeVisible();
    await expect(this.whyAskingText).toBeVisible();
  }

  async fillAndSelectPostcode(postcode: string, addressOption: string) {
    await this.page.getByLabel("Postcode").click();
    await this.page.getByLabel("Postcode").fill(postcode);
    await this.page.getByLabel("Postcode").press("Enter");
    await this.selectYourAddressDropdown.selectOption(addressOption);
    await expect(this.selectYourAddressDropdown).toBeVisible();
  }

  async expandWhyAskingDetails() {
    await this.page.locator("#summary-0").click();
    await expect(this.detailsSection).toContainText(
      "Study teams need a postal address to send you communications by post, if you choose for them to contact you this way.Some studies only recruit from specific locations, we may use this information when contacting you about studies you may be interested in."
    );
  }
}
