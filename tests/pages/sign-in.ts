import { expect, Page } from "@playwright/test";
import {
  buttonCheck,
  headingCheck,
  linkCheck,
  textCheck,
} from "../../src/Helper/e2e-test-utils";

const signInCheck = async (page: Page) => {
  await expect(page).toHaveURL(/.*\/UserLogin/);
  await headingCheck(page, "Sign in to Be Part of Research");
  await textCheck(page, "Email address");
  await expect(page.getByText("Password", { exact: true })).toBeVisible();
  await textCheck(
    page,
    "If you cannot remember your password, you can reset it here."
  );
  await buttonCheck(page, "Sign in");
  await linkCheck(page, "Register with Be Part of Research");
};

export default signInCheck;
