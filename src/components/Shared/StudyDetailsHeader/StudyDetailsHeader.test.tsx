import { axe, toHaveNoViolations } from "jest-axe";
import { createServer, Server } from "miragejs";
import { render, screen } from "../../../Helper/test-utils";
import StudyDetailsHeader from "./StudyDetailsHeader";

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
    },
  });
});

afterEach(() => {
  server.shutdown();
});

afterEach(() => {
  server.shutdown();
});

describe("StudyDetailsHeader accessibility tests", () => {
  it("is accessible", async () => {
    const { container } = render(
      <StudyDetailsHeader title="Hello world" studyid="123" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("StudyDetailsHeader tests", () => {
  it("renders without error", async () => {
    render(<StudyDetailsHeader title="Hello world" studyid="123" />);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
    expect(screen.getByText("IRAS ID:")).toBeInTheDocument();
    expect(screen.getByText("123")).toBeInTheDocument();
  });
  it("fetches the title if none is supplied", async () => {
    render(<StudyDetailsHeader studyid="12343" />);
    expect(
      await screen.findByText(
        "Characterising new-onset type 1 diabetes and supporting type 1 diabetes research"
      )
    ).toBeInTheDocument();
  });
});
