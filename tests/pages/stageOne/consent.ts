import { expect, Page } from "@playwright/test";
import {
  buttonCheck,
  headingCheck,
  linkCheck,
  textCheck,
} from "../../../src/Helper/e2e-test-utils";

const consentCheck = async (page: Page) => {
  await expect(page).toHaveURL(/.*\/Participants\/Register\/Questions/);
  await linkCheck(page, "Return to previous page");
  await textCheck(page, "29% complete");
  await headingCheck(
    page,
    "Consent to process your data and be contacted by Be Part of Research"
  );
  await textCheck(
    page,
    "By consenting and registering for the service, you are giving permission for any information you share to be processed by Be Part of Research, a service that is managed and operated by the National Institute for Health and Care Research Clinical Research Network Coordinating Centre (NIHR CRNCC). This will allow Be Part of Research to contact you with information about areas of research you have expressed an interest in, as well as research opportunities of national interest."
  );
  await textCheck(
    page,
    "To find out more about how the NIHR CRNCC will process and store your information and your rights as a data subject, please read the Be Part of Research Privacy Policy. The Data Controller for this service is the Department of Health and Social Care (DHSC)."
  );
  await textCheck(
    page,
    "You can withdraw your consent at any time - to do this please see the Be Part of Research Privacy Policy."
  );
  await textCheck(
    page,
    "If you do not consent to sharing your information, you will not be able to use this service to register your interest and be contacted about research opportunities."
  );
  await textCheck(
    page,
    "Do you give consent for your information to be processed by the Be Part of Research service provided by NIHR CRNCC on behalf of the DHSC for the purposes outlined above?"
  );
  await expect(
    page.getByLabel(
      "I confirm that I have read and understood the Be Part of Research Privacy Policy."
    )
  ).not.toBeChecked();

  await buttonCheck(page, "Yes, I consent and wish to register now");
  await buttonCheck(
    page,
    "No, I do not consent and wish to cancel this registration"
  );
};

export default consentCheck;
