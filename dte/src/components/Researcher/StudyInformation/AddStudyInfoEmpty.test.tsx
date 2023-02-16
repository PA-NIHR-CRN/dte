import { axe, toHaveNoViolations } from "jest-axe";
import { createServer, Server } from "miragejs";
import { render, screen, fireEvent } from "../../../Helper/test-utils";
import "@testing-library/jest-dom";
import AddStudyInfo from "./AddStudyInfo";

expect.extend(toHaveNoViolations);

let server: Server;
beforeEach(() => {
  server = createServer({
    routes() {
      this.get(
        `${process.env.REACT_APP_BASE_API}/referencedata/health/healthconditions`,
        () => {
          return {
            content: [
              "Acanthosis nigricans",
              "Achalasia",
              "Acid and chemical burns",
              "Acoustic neuroma (vestibular schwannoma)",
              "Acromegaly",
              "Urine albumin to creatinine ratio (ACR)",
              "Actinic keratoses (solar keratoses)",
            ],
            isSuccess: true,
            errors: [],
            conversationId: null,
            version: 1,
          };
        }
      );
      this.get(
        `${process.env.REACT_APP_BASE_API}/studies/:studyid`,
        (_schema, request) => {
          return {
            content: {
              role: "StudyTeamAdmin",
              item: {
                studyId: request.params.studyid,
                cpmsId: 454545,
                isrctnId: "345343",
                title:
                  "Art party gastropub drinking vinegar ethical, pinterest williamsburg vaporware pickled pop-up roof party",
                shortName: null,
                whatImportant: "",
                healthConditions: [],
                studyQuestionnaireLink: null,
                sites: null,
                status: "InSetup",
                createdAtUtc: "2022-01-26T11:05:32.509Z",
                createdById: "e445b246-014c-11eb-8154-060c27787e25",
                updatedAtUtc: "2022-01-31T11:38:22.622Z",
                updatedById: null,
              },
            },
            isSuccess: true,
            errors: [],
            conversationId: null,
            version: 1,
          };
        }
      );
      this.put(`${process.env.REACT_APP_BASE_API}/studies/:studyid`, () => {
        return {
          content: null,
          isSuccess: true,
          errors: [],
          conversationId: null,
          version: 1,
        };
      });
    },
  });
});

afterEach(() => {
  server.shutdown();
});

describe("AddStudyInfo tests", () => {
  it("should render without error", async () => {
    render(<AddStudyInfo />);
    expect(
      await screen.findByText("Add study information")
    ).toBeInTheDocument();
  });
  it("should save not the study information", async () => {
    render(<AddStudyInfo />);
    fireEvent.click(await screen.findByText("Save my progress"));
    expect(
      await screen.findByText("Important information required")
    ).toBeInTheDocument();
    expect(screen.queryByText("Saving...")).toBeNull();
  });
});

describe("UpdateParticipant accessibility tests", () => {
  it("should not have any axe accessibility errors", async () => {
    const { container } = render(<AddStudyInfo />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
