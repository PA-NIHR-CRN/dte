import { expect, Page } from "@playwright/test";
import {
  buttonCheck,
  headingCheck,
  linkCheck,
  textCheck,
} from "../../../src/Helper/e2e-test-utils";

const passwordCheck = async (page: Page) => {
  await expect(page).toHaveURL(/.*\/Participants\/Register\/Questions/);
  await linkCheck(page, "Return to previous page");
  await textCheck(page, "21% complete");
  await headingCheck(
    page,
    "Create a password for your Be Part of Research account"
  );

  await textCheck(
    page,
    "We recommend using three random words to generate your password, e.g. 'applenemobiro' as these are easy for you to remember and hard for others to guess."
  );
  await textCheck(
    page,
    "You should avoid family and pet names, your favourite sports team, and dates and locations related to you."
  );
  await textCheck(page, "Create your password");
  await textCheck(page, "Confirm your password");
  await buttonCheck(page, "Continue");
};

export default passwordCheck;
