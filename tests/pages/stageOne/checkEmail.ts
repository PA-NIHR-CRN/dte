import { expect, Page } from "@playwright/test";
import {
  buttonCheck,
  headingCheck,
  linkCheck,
  textCheck,
} from "../../../src/Helper/e2e-test-utils";

const checkEmailCheck = async (page: Page, email: string) => {
  await expect(page).toHaveURL(/.*\/Participants\/Register\/Questions/);
  await headingCheck(page, "Check your email");
  await textCheck(page, `We've sent an email to ${email}`);
  await textCheck(
    page,
    "You'll need to click on the link to validate it within 24 hours."
  );
  await textCheck(
    page,
    "Once you've verified the email, you will be able to continue registration by signing in."
  );
  await textCheck(page, "Unable to find it? Check your spam folder.");
  await textCheck(page, "Still unable to find the email?");
  await buttonCheck(page, "Resend verification email");
};

export default checkEmailCheck;
