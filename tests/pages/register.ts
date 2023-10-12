import { expect, Page } from "@playwright/test";
import {
  headingCheck,
  linkCheck,
  textCheck,
} from "../../src/Helper/e2e-test-utils";

const registerCheck = async (page: Page) => {
  await expect(page).toHaveURL(/.*\/participants\/register/);
  await headingCheck(page, "Register with Be Part of Research");
  await textCheck(
    page,
    "A simple registration process will capture your basic information, including contact details."
  );
  await textCheck(
    page,
    "You'll need to verify your email address to ensure it is correct if you are not using NHS login."
  );
  await textCheck(
    page,
    "Once you're fully registered, and have agreed to be contacted, we'll have the information we need to keep in touch with you about health conditions you're interested in."
  );
  await textCheck(page, "You can sign up if you:");
  await textCheck(page, "have an email address");
  await textCheck(page, "are 18 or over");
  await textCheck(page, "live in the UK");
  await textCheck(
    page,
    "(Please note that unless otherwise stated, all registration questions are mandatory)"
  );
  await textCheck(
    page,
    "You can only use NHS login if you live in England or Wales. If you use NHS login you will need to use this option on each occasion to access your account and update your details."
  );

  await linkCheck(page, "Continue to NHS login");
  await linkCheck(page, "Register with email address");
  await textCheck(page, "Already have an account?");
  await linkCheck(page, "Sign in");
};

export default registerCheck;
