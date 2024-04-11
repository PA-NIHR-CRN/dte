import { expect, Locator, Page } from "@playwright/test";

export default class PersonalDetailsPage {
  readonly page: Page;
  readonly elements: Record<string, Locator>;
  readonly mainContent: Locator;

  constructor(page: Page) {
    this.page = page;
    this.elements = {
      backButton: page.getByRole("link", { name: "Back", exact: true }),
      heading: page.getByRole("heading", { name: "Personal details" }),
      nameText: page.getByText("Name", { exact: true }),
      nameValue: page.getByText("Mona MILLAR"),
      dobText: page.getByText("Date of birth", { exact: true }),
      dobValue: page.getByText("February 1968"),
      homeAddressText: page.getByText("Home address", { exact: true }),
      changeHomeAddressButton: page.getByRole("button", {
        name: "Change home address",
      }),
      phoneNumberText: page.getByText("Phone number", { exact: true }),
      phoneNumberValue: page.getByText("Not provided"),
      changePhoneNumberButton: page.getByRole("button", {
        name: "Change phone number",
      }),
      sexAtBirthText: page.getByText("Sex registered at birth", {
        exact: true,
      }),
      sexAtBirthValue: page.getByText("Male"),
      changeSexAtBirthButton: page.getByRole("button", {
        name: "Change sex registered at birth",
      }),
      genderIdentityText: page.getByText(
        "Gender identity same as sex registered at birth",
        { exact: true }
      ),
      genderIdentityValue: page.getByText("Yes"),
      changeGenderIdentityButton: page.getByRole("button", {
        name: "Change gender identity same",
      }),
      ethnicGroupText: page.getByText("Ethnic group", { exact: true }),
      ethnicGroupValue: page.getByText("White"),
      changeEthnicGroupButton: page.getByRole("button", {
        name: "Change ethnic group",
      }),
      ethnicBackgroundValue: page.getByText("Irish"),
      changeEthnicBackgroundButton: page.getByRole("button", {
        name: "Change ethnic background",
      }),
      longTermConditionText: page.getByText("Long-term conditions or illness", {
        exact: true,
      }),
      longTermConditionValue: page.getByText("No", { exact: true }),
      changeLongTermConditionsButton: page.getByRole("button", {
        name: "Change long-term conditions",
      }),
    };
    this.mainContent = page.locator("#main");
  }

  async assertElementVisible(elementKey: string) {
    if (this.elements[elementKey]) {
      await expect(this.elements[elementKey]).toBeVisible();
    } else {
      throw new Error(`Element with key "${elementKey}" not found`);
    }
  }

  async assertAllElementsVisible() {
    for (const key of Object.keys(this.elements)) {
      await this.assertElementVisible(key);
    }
  }

  async assertMainContentText(text: string) {
    await expect(this.mainContent).toContainText(text);
  }

  async assertPageElementsVisible() {
    await expect(this.elements.heading).toBeVisible();
    await this.assertAllElementsVisible();
    await this.assertMainContentText(
      "This information is used to help us find studies that you may be interested in."
    );
    await this.assertMainContentText(
      "You can update your personal details at any time."
    );
  }
}
