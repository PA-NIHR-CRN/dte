import { expect, Page } from "@playwright/test";
import {
  buttonCheck,
  headingCheck,
  linkCheck,
  textCheck,
} from "../../../src/Helper/e2e-test-utils";

const nameCheck = async (page: Page) => {
  await expect(page).toHaveURL(/.*\/Participants\/Register\/Questions/);
  await linkCheck(page, "Return to previous page");
  await textCheck(page, "0% complete");
  await headingCheck(page, "What is your name?");
  await textCheck(page, "First name");
  await textCheck(page, "Last name");
  await buttonCheck(page, "Continue");
};

export default nameCheck;
