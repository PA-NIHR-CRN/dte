import { Page } from "@playwright/test";
import {
  headingCheck,
  linkCheck,
  textCheck,
} from "../../../src/Helper/e2e-test-utils";

const footerCheck = async (page: Page) => {
  // social media links
  await textCheck(page, "Follow us");
  await linkCheck(page, "Facebook");
  await linkCheck(page, "Twitter");
  await linkCheck(page, "You Tube");
  await linkCheck(page, "Linked In");

  // Services
  await headingCheck(page, "Services pages on this website");
  await linkCheck(page, "Find a study");
  await linkCheck(page, "Add my study");
  await linkCheck(page, "A-Z conditions");
  await linkCheck(page, "Glossary");
  await linkCheck(page, "FAQs");

  // Learn
  await headingCheck(page, "Learn pages on this website");
  await linkCheck(page, "What is research?");
  await linkCheck(page, "Why take part?");
  await linkCheck(page, "What happens next?");
  await linkCheck(page, "Consenting to a study");

  // Site policies
  await headingCheck(page, "Site policy pages on this website");
  await linkCheck(page, "Accessibility");
  await linkCheck(page, "Complaints");
  await linkCheck(page, "Cookie policy");
  await linkCheck(page, "Freedom of information");
  await linkCheck(page, "Privacy policy");
  await linkCheck(page, "Terms and conditions");

  // Stay connected
  await headingCheck(page, "Stay Connected pages on this website");
  await linkCheck(page, "Blogs");
  await linkCheck(page, "Contact us");
  await linkCheck(page, "Newsletter");

  await linkCheck(page, "Be Part Of Research footer Logo");

  // Logos
  await linkCheck(page, "National Institute for Health and Care Research");
  await linkCheck(page, "Public Health Agency Northern Ireland");
  await linkCheck(page, "NHS Scotland");
  await linkCheck(page, "Health and Care Research Wales");
};

export default footerCheck;
