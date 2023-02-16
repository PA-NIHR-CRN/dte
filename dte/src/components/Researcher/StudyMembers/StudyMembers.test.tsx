import { axe, toHaveNoViolations } from "jest-axe";
import { createServer, Server } from "miragejs";
import { render, screen } from "../../../Helper/test-utils";
import "@testing-library/jest-dom";

import StudyMembers from "./StudyMembers";

expect.extend(toHaveNoViolations);

let server: Server;
beforeEach(() => {
  server = createServer({
    routes() {
      this.get(
        `${process.env.REACT_APP_BASE_API}/researcherstudies/studies/:studyid`,
        (_schema, request) => {
          return {
            content: {
              paginationToken: null,
              items: [
                {
                  userId: "1bc36eb8-0042-4c67-bd55-892db4b44158",
                  firstname: "Researcher",
                  lastname: "Two",
                  email: "researcher2@yopmail.com",
                  studyId: parseInt(request.params.studyid, 10),
                  role: "StudyTeamMember",
                },
                {
                  userId: "269deb35-a8a1-4ff9-bd5f-dc1e87b87876",
                  firstname: "Researcher",
                  lastname: "Three",
                  email: "researcher3@yopmail.com",
                  studyId: parseInt(request.params.studyid, 10),
                  role: "StudyTeamMember",
                },
                {
                  userId: "d9e9c9ea-337d-4a63-bb76-3122a342041d",
                  firstname: "Researcher",
                  lastname: "One",
                  email: "researcher1@yopmail.com",
                  studyId: parseInt(request.params.studyid, 10),
                  role: "StudyTeamAdmin",
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
        `${process.env.REACT_APP_BASE_API}/researcherstudies/:studyid`,
        (_schema, request) => {
          return {
            content: {
              userId: "d9e9c9ea-337d-4a63-bb76-3122a342041d",
              firstname: "Researcher",
              lastname: "One",
              email: "researcher1@yopmail.com",
              studyId: parseInt(request.params.studyid, 10),
              role: "StudyTeamAdmin",
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
      this.delete(
        `${process.env.REACT_APP_BASE_API}/researcherstudies/:studyid/researcher/:memberid`,
        () => {
          return {
            content: null,
            isSuccess: true,
            errors: [],
            conversationId: null,
            version: 1,
          };
        }
      );
      this.put(
        `${process.env.REACT_APP_BASE_API}/researcherstudies/:studyid/researcher/:memberid`,
        () => {
          return {
            content: null,
            isSuccess: true,
            errors: [],
            conversationId: null,
            version: 1,
          };
        }
      );
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

describe("StudyMembers accessibility tests", () => {
  it("is accessible", async () => {
    const { container } = render(<StudyMembers />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("StudyMembers Tests", () => {
  it("renders without error", async () => {
    render(<StudyMembers />);
    expect(await screen.findByText("Team members")).toBeInTheDocument();
  });

  it("should display the team members", async () => {
    render(<StudyMembers />);
    expect(await screen.findByText("Researcher One")).toBeInTheDocument();
    expect(await screen.findByText("Researcher Two")).toBeInTheDocument();
    expect(await screen.findByText("Researcher Three")).toBeInTheDocument();
  });

  it("should show the user action buttons for each row", async () => {
    render(<StudyMembers />);
    const actionButtons = await screen.findAllByText("Actions");
    expect(actionButtons).toHaveLength(4);
  });
  // it("should call the update member endpoint when the change role button is clicked", async () => {
  //   render(<StudyMembers />);
  //   const actions = await screen.findAllByText("Actions");
  //   fireEvent.click(actions[1]);
  //   fireEvent.click(await screen.findByText(/Change permission to /i));
  //   const name = await screen.findByText(/Researcher One/i);
  //   expect(name).toBeInTheDocument();
  //   server.pretender.handledRequest = (path) => {
  //     expect(path).toBe(
  //       `${process.env.REACT_APP_BASE_API}/researcherstudies/undefined/researcher/1bc36eb8-0042-4c67-bd55-892db4b44158`
  //     );
  //   };
  // });
  // it("should call the delete member endpoint when the delete button is clicked", async () => {
  //   render(<StudyMembers />);
  //   const actions = await screen.findAllByText("Actions");
  //   fireEvent.click(actions[1]);
  //   fireEvent.click(await screen.findByText(/Remove from study/i));
  //   const deleteButton = await screen.findByText(/Yes, remove this person/i);
  //   expect(deleteButton).toBeInTheDocument();
  //   act(() => {
  //     fireEvent.click(deleteButton);
  //   });
  //   const name = await screen.findByText(/Researcher One/i);
  //   expect(name).toBeInTheDocument();
  //   await waitFor(() => {
  //     server.pretender.handledRequest = (path) => {
  //       expect(path).toBe(
  //         `${process.env.REACT_APP_BASE_API}/researcherstudies/undefined/researcher/1bc36eb8-0042-4c67-bd55-892db4b44158`
  //       );
  //     };
  //   });
  // });
});
