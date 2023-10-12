import { expect, Page } from "@playwright/test";
import {
  buttonCheck,
  headingCheck,
  invisibleTextCheck,
  linkCheck,
  textCheck,
} from "../../../src/Helper/e2e-test-utils";

const dateOfBirthCheck = async (page: Page) => {
  await expect(page).toHaveURL(/.*\/Participants\/Register\/Questions/);
  await linkCheck(page, "Return to previous page");
  await textCheck(page, "7% complete");
  await headingCheck(page, "What is your date of birth?");
  await textCheck(page, "For example, 31 3 1980");
  await textCheck(page, "You must be 18 or over to use this service");
  await textCheck(page, "Day");
  await textCheck(page, "Month");
  await textCheck(page, "Year");
  await textCheck(page, "Why we are asking this question");
  await invisibleTextCheck(
    page,
    "Many studies want to make sure they have people of different ages taking part in research studies, and some are looking for specific age groups only."
  );
  await invisibleTextCheck(
    page,
    "You have to be 18 or over to sign up for an account with Be Part of Research."
  );
  await page.getByText("Why we are asking this question").click();
  await textCheck(
    page,
    "Many studies want to make sure they have people of different ages taking part in research studies, and some are looking for specific age groups only."
  );
  await textCheck(
    page,
    "You have to be 18 or over to sign up for an account with Be Part of Research."
  );
  await buttonCheck(page, "Continue");
};

export default dateOfBirthCheck;
