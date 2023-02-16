import { axe, toHaveNoViolations } from "jest-axe";
import { createServer, Server } from "miragejs";
import { render, screen, fireEvent } from "../../../Helper/test-utils";
import "@testing-library/jest-dom";

import UpdateStudyRequest from "./UpdateStudyRequest";

expect.extend(toHaveNoViolations);

let server: Server;
beforeEach(() => {
  server = createServer({
    trackRequests: true,
    routes() {
      this.get(
        `${process.env.REACT_APP_BASE_API}/studyregistrations/:studyid`,
        () => {
          return {
            content: {
              studyId: 12345,
              title: "First Study",
              researcher: {
                id: "1bc36eb8-0042-4c67-bd55-892db4b44158",
                firstname: "Researcher",
                lastname: "Two",
                email: "researcher2@yopmail.com",
              },
              studyRegistrationStatus: "WaitingForApproval",
              approvedAtUtc: null,
              submittedAtUtc: "2022-01-10T12:38:28.88Z",
            },
            isSuccess: true,
            errors: [],
            version: 1,
          };
        }
      );
      this.post(
        `${process.env.REACT_APP_BASE_API}/studyregistrations/:studyid/startreview`,
        () => {
          return {};
        }
      );
      this.post(
        `${process.env.REACT_APP_BASE_API}/studyregistrations/:studyid/approve`,
        () => {
          return {};
        }
      );
      this.post(
        `${process.env.REACT_APP_BASE_API}/studyregistrations/:studyid/reject`,
        () => {
          return {};
        }
      );
    },
  });
});

afterEach(() => {
  server.shutdown();
});

describe("UpdateStudyRequest accessibility tests", () => {
  it("should not have accessibility violations", async () => {
    const { container } = render(<UpdateStudyRequest />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("UpdateStudyRequest functionality tests", () => {
  it("should render without crashing", async () => {
    const { container } = render(<UpdateStudyRequest />);
    expect(container).toBeInTheDocument();
  });

  it("should display loading request while loading data", () => {
    render(<UpdateStudyRequest />);
    const loadingText = screen.getByText("Loading request...");
    expect(loadingText).toBeInTheDocument();
  });

  it("should contain IRAS ID input", async () => {
    render(<UpdateStudyRequest />);
    const irasInput = await screen.findByLabelText(/IRAS ID/i);
    expect(irasInput).toBeInTheDocument();
  });

  it("should contain CPMS ID input", async () => {
    render(<UpdateStudyRequest />);
    const cpmsInput = await screen.findByLabelText(/CPMS ID/i);
    expect(cpmsInput).toBeInTheDocument();
  });

  it("should contain ISRCTN ID input", async () => {
    render(<UpdateStudyRequest />);
    const isrctnInput = await screen.findByLabelText(/ISRCTN ID/i);
    expect(isrctnInput).toBeInTheDocument();
  });

  it("should contain Study title input", async () => {
    render(<UpdateStudyRequest />);
    const studyNameInput = await screen.findByLabelText(/Study title/i);
    expect(studyNameInput).toBeInTheDocument();
  });

  it("should populate IRAS and Study title inputs with data from server", async () => {
    render(<UpdateStudyRequest />);
    const irasInputValue = await screen.findByDisplayValue("12345");
    expect(irasInputValue).toBeInTheDocument();
    const titleInputValue = await screen.findByDisplayValue("First Study");
    expect(titleInputValue).toBeInTheDocument();
  });

  it("should contain approve and decline request buttons", async () => {
    render(<UpdateStudyRequest />);
    const updateButton = await screen.findByText("Update and approve request");
    expect(updateButton).toBeInTheDocument();
    const declineButton = await screen.findByText("Decline request");
    expect(declineButton).toBeInTheDocument();
  });

  it("should send a post request on accept", async () => {
    render(<UpdateStudyRequest />);
    const updateButton = await screen.findByText("Update and approve request");
    fireEvent.click(updateButton);
    server.pretender.handledRequest = (verb, path) => {
      expect(verb).toBe("POST");
      expect(path).toBe(
        `${process.env.REACT_APP_BASE_API}/studyregistrations/12345/approve`
      );
    };
  });

  it("should send a post request on decline", async () => {
    render(<UpdateStudyRequest />);
    const declineButton = await screen.findByText("Decline request");
    fireEvent.click(declineButton);
    server.pretender.handledRequest = (path) => {
      expect(path).toBe(
        `${process.env.REACT_APP_BASE_API}/studyregistrations/12345/reject`
      );
    };
  });

  it("should send a post request on update", async () => {
    render(<UpdateStudyRequest />);
    server.pretender.handledRequest = (path) => {
      expect(path).toBe(
        `${process.env.REACT_APP_BASE_API}/studyregistrations/12345/startreview`
      );
    };
  });
});
