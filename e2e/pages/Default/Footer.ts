import { expect, Locator, Page } from "@playwright/test";

export default class FooterPage {
  readonly page: Page;
  readonly followUsText: Locator;
  readonly socialMediaLinks: Record<string, Locator>;
  readonly servicesLabel: Locator;
  readonly learnLabel: Locator;
  readonly sitePolicyLabel: Locator;
  readonly stayConnectedLabel: Locator;
  readonly partnersLabel: Locator;
  readonly footerLinks: Record<string, Locator>;

  constructor(page: Page) {
    this.page = page;
    this.followUsText = page.getByText("Follow us");
    this.socialMediaLinks = {
      Facebook: page.getByRole("link", { name: "Facebook" }),
      Twitter: page.getByRole("link", { name: "Twitter" }),
      YouTube: page.getByRole("link", { name: "You Tube" }),
      LinkedIn: page.getByRole("link", { name: "Linked In" }),
    };
    this.servicesLabel = page.getByLabel("Services pages on this website");
    this.learnLabel = page.getByLabel("Learn pages on this website");
    this.sitePolicyLabel = page.getByLabel("Site policy pages on this");
    this.stayConnectedLabel = page.getByLabel("Stay Connected pages on this");
    this.partnersLabel = page.locator(
      "text=National Institute for Health, Public Health Agency Northern, NHS Scotland, Health and Care Research Wales"
    );
    this.footerLinks = {
      FindAStudy: page.getByRole("link", { name: "Find a study" }),
      AddMyStudy: page.getByRole("link", { name: "Add my study" }),
      AzConditions: page.getByRole("link", { name: "A-Z of conditions" }),
      Glossary: page.getByRole("link", { name: "Glossary" }),
      FAQs: page.getByRole("link", { name: "FAQs" }),
      WhatIsHeathAndCareResearch: page.getByRole("link", {
        name: "What is Health and Care Research?",
      }),
      WhyTakePart: page.getByRole("link", {
        name: "Why take part?",
      }),
      WhatHappensOnAStudy: page.getByRole("link", {
        name: "What happens on a study?",
      }),
      ConsentingToAStudy: page.getByRole("link", {
        name: "Consenting to a study",
      }),
      Accessibility: page.getByRole("link", {
        name: "Accessibility",
      }),
      Complaints: page.getByRole("link", {
        name: "Complaints",
      }),
      CookiePolicy: page.getByRole("link", {
        name: "Cookie policy",
      }),
      FreedomOfInformation: page.getByRole("link", {
        name: "Freedom of information",
      }),
      PrivacyPolicy: page.getByRole("link", {
        name: "Privacy policy",
      }),
      TermsAndConditions: page.getByRole("link", {
        name: "Terms and conditions",
      }),
      Blogs: page.getByRole("link", {
        name: "Blogs",
      }),
      ContactUs: page.getByRole("link", {
        name: "Contact us",
      }),
      Newsletter: page.getByRole("link", {
        name: "Newsletter",
      }),
    };
  }

  async assertSocialMediaLinksVisible() {
    await expect(this.followUsText).toBeVisible();
    for (const link in this.socialMediaLinks) {
      await expect(this.socialMediaLinks[link]).toBeVisible();
    }
  }

  async assertFooterSectionsVisible() {
    await expect(this.servicesLabel).toBeVisible();
    await expect(this.learnLabel).toBeVisible();
    await expect(this.sitePolicyLabel).toBeVisible();
    await expect(this.stayConnectedLabel).toBeVisible();
    await expect(this.partnersLabel).toBeVisible();
  }

  async assertFooterLinksVisible() {
    for (const link in this.footerLinks) {
      await expect(this.footerLinks[link]).toBeVisible();
    }
  }

  async assertFooterRendered() {
    await this.assertSocialMediaLinksVisible();
    await this.assertFooterSectionsVisible();
    await this.assertFooterLinksVisible();
  }
}
