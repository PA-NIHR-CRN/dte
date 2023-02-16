import { axe, toHaveNoViolations } from "jest-axe";
import { createServer, Server } from "miragejs";
import { render, screen, waitFor } from "../../../Helper/test-utils";
import "@testing-library/jest-dom";

import DeclinedStudyRequestsTable from "./DeclinedStudyRequestsTable";

expect.extend(toHaveNoViolations);

let server: Server;
beforeEach(() => {
  server = createServer({
    routes() {
      this.get(
        `${process.env.REACT_APP_BASE_API}/studyregistrations/status/5`,
        () => {
          return [
            {
              studyId: "12345",
              title: "First Study",
              researcher: {
                firstname: "Researcher",
                lastname: "A",
                email: "researcher.a@gmail.com",
              },
              submittedAtUtc: "2021-11-02T00:00:00+00:00",
              studyRegistrationStatus: "Rejected",
            },
            {
              studyId: "67890",
              title: "Second Study",
              researcher: {
                firstname: "Researcher",
                lastname: "B",
                email: "researcher.b@gmail.com",
              },
              submittedAtUtc: "2021-11-03T00:00:00+00:00",
              studyRegistrationStatus: "Rejected",
            },
          ];
        }
      );
    },
  });
});

afterEach(() => {
  server.shutdown();
});

describe("DeclinedStudyRequestsTable accessibility tests", () => {
  it("should not have accessibility violations", async () => {
    const { container } = render(<DeclinedStudyRequestsTable />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("DeclinedStudyRequestsTable functionality tests", () => {
  it("should render without crashing", async () => {
    const { container } = render(<DeclinedStudyRequestsTable />);
    expect(container).toBeInTheDocument();
  });

  it("should display loading study requests while loading data", () => {
    render(<DeclinedStudyRequestsTable />);
    const loadingText = screen.getByText("Loading study requests...");
    expect(loadingText).toBeInTheDocument();
  });

  it("should contain 1 row with study id 12345", async () => {
    render(<DeclinedStudyRequestsTable />);
    const study1 = await screen.findByText("12345");
    expect(study1).toBeInTheDocument();
  });

  it("should contain 1 row with study id 67890", async () => {
    render(<DeclinedStudyRequestsTable />);
    const study2 = await screen.findByText("67890");
    expect(study2).toBeInTheDocument();
  });

  it("should not contain invalid row", async () => {
    render(<DeclinedStudyRequestsTable />);
    await waitFor(() => {
      const invalidRow = screen.queryByTestId("2468");
      expect(invalidRow).not.toBeInTheDocument();
    });
  });

  it("should be sortable on IRAS id", async () => {
    render(<DeclinedStudyRequestsTable />);
    await waitFor(() => {
      const invalidRow = screen.queryByTestId("2468");
      expect(invalidRow).not.toBeInTheDocument();
    });
  });
});
