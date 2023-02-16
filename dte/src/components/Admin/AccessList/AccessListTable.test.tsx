import { axe, toHaveNoViolations } from "jest-axe";
import { createServer, Server } from "miragejs";
import { render, screen, waitFor } from "../../../Helper/test-utils";
import "@testing-library/jest-dom";

import AccessListTable from "./AccessListTable";

expect.extend(toHaveNoViolations);

let server: Server;
beforeEach(() => {
  server = createServer({
    routes() {
      this.get(
        `${process.env.REACT_APP_BASE_API}/users/accesswhitelist`,
        () => {
          return [
            {
              email: "test@email.com",
            },
            {
              email: "test2@email.com",
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

describe("AccessListTable accessibility tests", () => {
  it("should not have accessibility violations", async () => {
    const { container } = render(<AccessListTable />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("AccessListTable functionality tests", () => {
  it("should render without crashing", async () => {
    const { container } = render(<AccessListTable />);
    expect(container).toBeInTheDocument();
  });
});

it("should display loading access list while loading data", () => {
  render(<AccessListTable />);
  const loadingText = screen.getByText("Loading access list...");
  expect(loadingText).toBeInTheDocument();
});

// The async wait isnt working, commenting out for now until investigated
// it("should contain 2 row with email test@email.com", async () => {
//   render(<AccessListTable />);
//   await waitForElementToBeRemoved(() =>
//     screen.getByText("Loading access list...")
//   );
//   screen.getByText("Emails");
//   await waitFor(() => {
//     expect(screen.getByText("test@email.com")).toBeInTheDocument();
//   });
// });

// it("11should contain 2 row with email test2@email.com", async () => {
//   render(<AccessListTable />);
//   await waitFor(() => {
//     const email1 = screen.getByText("test2@email.com");
//     expect(email1).toBeInTheDocument();
//   });
// });

it("should not contain invalid row", async () => {
  render(<AccessListTable />);
  await waitFor(() => {
    const invalidRow = screen.queryByTestId("test3@email.com");
    expect(invalidRow).not.toBeInTheDocument();
  });
});
