import { createServer, Server } from "miragejs";
import { axe, toHaveNoViolations } from "jest-axe";
import { render, screen, waitFor } from "../../../../Helper/test-utils";
import "@testing-library/jest-dom";
import ContinueSelfReferral from "./ContinueSelfReferral";

expect.extend(toHaveNoViolations);

let server: Server;
beforeEach(() => {
  server = createServer({
    routes() {
      this.get(
        `${process.env.REACT_APP_BASE_API}/studies/:studyid/sites/info`,
        () => {
          return {
            content: {
              paginationToken: null,
              items: [
                {
                  studyId: 12343,
                  identifier: "NV178@2.16.840.1.113883.2.1.3.2.4.18.48",
                  name: "KINGS COLLEGE HOSPITAL",
                  studySiteStatus: "InSetup",
                  addressLine1: "MAPOTHER HOUSE",
                  addressLine2: "DE CRESPIGNY PARK",
                  addressLine3: "DENMARK HILL",
                  addressLine4: "LONDON",
                  addressLine5: "GREATER LONDON",
                  postcode: "SE5 8AB",
                },
                {
                  studyId: 12343,
                  identifier: "RX1RA@2.16.840.1.113883.2.1.3.2.4.18.48",
                  name: "Nottingham University Hospitals NHS Trust - Queen's Medical Centre Campus",
                  studySiteStatus: "InSetup",
                  addressLine1: "NOTTINGHAM UNIVERSITY HOSPITAL",
                  addressLine2: "DERBY ROAD",
                  addressLine3: null,
                  addressLine4: "NOTTINGHAM",
                  addressLine5: "NOTTINGHAMSHIRE",
                  postcode: "NG7 2UH",
                },
              ],
            },
            isSuccess: true,
            errors: [],
            conversationId: null,
            version: 1,
          };
        }
      );
      this.get(
        `${process.env.REACT_APP_BASE_API}/studies/:studyid/info`,
        () => {
          return {
            content: {
              title:
                "Characterising new-onset type 1 diabetes and supporting type 1 diabetes research",
              shortName: null,
              whatImportant:
                '<p>What\'s important about this study</p>\n<ul>\n<li>This is</li>\n<li>So is <a href="https://google.com" target="_blank">this</a>&nbsp;</li>\n<li><strong>This is in bold !!</strong></li>\n</ul>\n',
              healthConditions: ["Face", "Heart", "Lungs"],
              studyQuestionnaireLink: null,
            },
            isSuccess: true,
            errors: [],
            conversationId: null,
            version: 1,
          };
        }
      );
    },
  });
});

afterEach(() => {
  server.shutdown();
});

describe("ContinueSelfReferral", () => {
  test("gets data and renders", async () => {
    render(<ContinueSelfReferral />);
    await waitFor(() => {
      expect(
        screen.getByDisplayValue("NV178@2.16.840.1.113883.2.1.3.2.4.18.48")
      ).toBeInTheDocument();
      expect(
        screen.getByDisplayValue("RX1RA@2.16.840.1.113883.2.1.3.2.4.18.48")
      ).toBeInTheDocument();
    });
  });
});

describe("ContinueSelfReferral Accessibility Tests", () => {
  test("it is accessible", async () => {
    const { container } = render(<ContinueSelfReferral />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  test("progress bar marked as aria hidden", async () => {
    render(<ContinueSelfReferral />);
    const progressText = await screen.findByText("0% complete");
    expect(progressText).toBeInTheDocument();
    expect(progressText).toHaveAttribute("aria-hidden", "true");
  });
});
