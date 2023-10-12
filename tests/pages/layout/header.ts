import { Page } from "@playwright/test";
import { linkCheck, textCheck } from "../../../src/Helper/e2e-test-utils";

const headerCheck = async (page: Page) => {
  await linkCheck(page, "Be Part Of Research Logo");
  await linkCheck(page, "NHS Logo");
  await linkCheck(page, "feedback");
  await textCheck(page, "BETA");
  await textCheck(
    page,
    "This is a new service – your feedback will help us to improve it."
  );
};

export default headerCheck;
