import { expect, Page } from "@playwright/test";
import {
  headingCheck,
  linkCheck,
  textCheck,
} from "../../src/Helper/e2e-test-utils";

const signInOptionsCheck = async (page: Page) => {
  await expect(page).toHaveURL(/.*\/Participants\/Options/);
  await headingCheck(page, "Sign in to Be Part of Research");
  await textCheck(
    page,
    "You can only use NHS login if you live in England or Wales. If you use NHS login"
  );
  await linkCheck(page, "Continue to NHS login");
  await linkCheck(page, "Sign in with email address");
  await textCheck(page, "Need an account?");
  await linkCheck(page, "Register");
};

export default signInOptionsCheck;
