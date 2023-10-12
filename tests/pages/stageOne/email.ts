import { expect, Page } from "@playwright/test";
import {
  buttonCheck,
  headingCheck,
  invisibleTextCheck,
  linkCheck,
  textCheck,
} from "../../../src/Helper/e2e-test-utils";

const emailCheck = async (page: Page) => {
  await expect(page).toHaveURL(/.*\/Participants\/Register\/Questions/);
  await linkCheck(page, "Return to previous page");
  await textCheck(page, "14% complete");
  await headingCheck(page, "What is your email address?");
  await expect(page.getByText("Email address", { exact: true })).toBeVisible();
  await textCheck(page, "Why we are asking this question");
  await invisibleTextCheck(
    page,
    "We need your email address so we can contact you when we find a suitable study"
  );
  await page.getByText("Why we are asking this question").click();
  await textCheck(
    page,
    "We need your email address so we can contact you when we find a suitable study"
  );

  await buttonCheck(page, "Continue");
};

export default emailCheck;
