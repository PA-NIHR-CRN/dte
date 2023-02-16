import { render } from "../../../../../Helper/test-utils";
import "@testing-library/jest-dom";
import ThanksForApplying from "./ThanksForApplying";

test("renders", async () => {
  render(
    <ThanksForApplying
      studyId="12345"
      studyTitle="Test Title"
      data={{
        questionnaireData: "",
        consentData: {
          consent: true,
        },
        selectedSiteData: {
          addressSummary: "",
          id: "",
          name: "",
        },
      }}
      questionnaireLink="https://example.com"
    />
  );
});
