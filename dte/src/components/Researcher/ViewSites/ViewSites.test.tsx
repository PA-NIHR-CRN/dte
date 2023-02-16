import { axe, toHaveNoViolations } from "jest-axe";
import { createServer, Server } from "miragejs";
import { render, screen, waitFor } from "../../../Helper/test-utils";
import "@testing-library/jest-dom";

import ViewSites from "./ViewSites";

expect.extend(toHaveNoViolations);

let server: Server;
beforeEach(() => {
  server = createServer({
    routes() {
      this.get(`${process.env.REACT_APP_BASE_API}/studies/:studyid`, () => {
        return {
          content: {
            role: "StudyTeamAdmin",
            item: {
              studyId: 12343,
              cpmsId: 454545,
              isrctnId: "345343",
              title:
                "Characterising new-onset type 1 diabetes and supporting type 1 diabetes research",
              shortName: null,
              whatImportant:
                '<p>What\'s important about this study</p>\n<ul>\n<li>This is</li>\n<li>So is <a href="https://google.com" target="_blank">this</a>&nbsp;</li>\n<li><strong>This is in bold !!</strong></li>\n</ul>\n',
              healthConditions: ["Face", "Heart", "Lungs"],
              studyQuestionnaireLink: null,
              status: "InSetup",
              createdAtUtc: "2022-01-26T11:05:32.509Z",
              createdById: "e445b246-014c-11eb-8154-060c27787e25",
              updatedAtUtc: "2022-02-16T15:02:55.132Z",
              updatedById: null,
            },
          },
          isSuccess: true,
          errors: [],
          conversationId: null,
          version: 1,
        };
      });
      this.get(
        `${process.env.REACT_APP_BASE_API}/studies/:studyid/sites`,
        () => {
          return {
            content: {
              paginationToken: null,
              items: [
                {
                  studyId: 12343,
                  studySiteStatus: "InSetup",
                  name: "KINGS COLLEGE HOSPITAL",
                  identifier: "NV178@2.16.840.1.113883.2.1.3.2.4.18.48",
                  type: "ISHPSITE@2.16.840.1.113883.2.1.3.8.5.11.1.106",
                  parentOrganisation: null,
                  status: "Active",
                  effectiveStartDate: "2008-08-10T23:00:00Z",
                  effectiveEndDate: null,
                  createdDate: "2016-04-30T05:20:32Z",
                  modifiedDate: "2021-06-30T17:30:15Z",
                  addressLine1: "MAPOTHER HOUSE",
                  addressLine2: "DE CRESPIGNY PARK",
                  addressLine3: "DENMARK HILL",
                  addressLine4: "LONDON",
                  addressLine5: "GREATER LONDON",
                  postcode: "SE5 8AB",
                  ukCountryIdentifier: null,
                  ukCountryName: null,
                },
                {
                  studyId: 12343,
                  studySiteStatus: "InSetup",
                  name: "Nottingham University Hospitals NHS Trust - Queen's Medical Centre Campus",
                  identifier: "RX1RA@2.16.840.1.113883.2.1.3.2.4.18.48",
                  type: "TRUSTSITE@2.16.840.1.113883.2.1.3.8.5.11.1.106",
                  parentOrganisation: "RX1@2.16.840.1.113883.2.1.3.2.4.18.48",
                  status: "Active",
                  effectiveStartDate: "2006-03-31T23:00:00Z",
                  effectiveEndDate: null,
                  createdDate: "2016-04-30T05:20:32Z",
                  modifiedDate: "2021-06-30T17:30:15Z",
                  addressLine1: "NOTTINGHAM UNIVERSITY HOSPITAL",
                  addressLine2: "DERBY ROAD",
                  addressLine3: null,
                  addressLine4: "NOTTINGHAM",
                  addressLine5: "NOTTINGHAMSHIRE",
                  postcode: "NG7 2UH",
                  ukCountryIdentifier: null,
                  ukCountryName: null,
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
    },
  });
});

afterEach(() => {
  server.shutdown();
});

describe("ViewSites accessibility tests", () => {
  it("is accessible", async () => {
    const { container } = render(<ViewSites />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("ViewSites Tests", () => {
  it("renders without crashing", async () => {
    render(<ViewSites />);
    expect(await screen.findByText("Study sites")).toBeInTheDocument();
  });

  it("displays the sites", async () => {
    render(<ViewSites />);
    await waitFor(() => {
      expect(screen.getByText("KINGS COLLEGE HOSPITAL")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Nottingham University Hospitals NHS Trust - Queen's Medical Centre Campus"
        )
      ).toBeInTheDocument();
      const statuses = screen.getAllByText("In setup");
      expect(statuses).toHaveLength(2);
      expect(screen.getByText("NV178")).toBeInTheDocument();
      expect(screen.getByText("RX1RA")).toBeInTheDocument();
    });
  });
});
