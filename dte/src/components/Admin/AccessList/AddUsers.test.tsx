import { axe, toHaveNoViolations } from "jest-axe";
import { createServer, Server } from "miragejs";
import { render, screen, fireEvent } from "../../../Helper/test-utils";
import "@testing-library/jest-dom";

import AddUsers from "./AddUsers";

expect.extend(toHaveNoViolations);

let server: Server;
beforeEach(() => {
  server = createServer({
    trackRequests: true,
    routes() {
      this.post(
        `${process.env.REACT_APP_BASE_API}/users/accesswhitelist`,
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

describe("AddUsers accessibility tests", () => {
  it("should not have accessibility violations", async () => {
    const { container } = render(<AddUsers />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("AddUsers functionality tests", () => {
  it("should render without crashing", async () => {
    const { container } = render(<AddUsers />);
    expect(container).toBeInTheDocument();
  });

  it("should contain text input", async () => {
    render(<AddUsers />);
    const emailsInput = await screen.findByLabelText(/Emails/i);
    expect(emailsInput).toBeInTheDocument();
  });

  it("should contain approve and decline request buttons", async () => {
    render(<AddUsers />);
    const submitButton = await screen.findByText("Submit");
    expect(submitButton).toBeInTheDocument();
  });

  it("should send a post request on accept", async () => {
    render(<AddUsers />);
    const submitButton = await screen.findByText("Submit");
    fireEvent.click(submitButton);
    server.pretender.handledRequest = (path) => {
      expect(path).toBe(
        `${process.env.REACT_APP_BASE_API}/users/accesswhitelist`
      );
    };
  });
});
