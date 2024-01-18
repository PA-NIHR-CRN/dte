import { axe, toHaveNoViolations } from "jest-axe";
import { createServer, Server } from "miragejs";
import ReactGA from "react-ga";
import { render, screen, waitFor } from "../../../Helper/test-utils";
import AccountSettings from "./AccountSettings";

expect.extend(toHaveNoViolations);

let server: Server;

beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  ReactGA.initialize("UA-XXXXX-Y", { testMode: true });
  expect(ReactGA.testModeAPI.calls).toEqual([["create", "UA-XXXXX-Y", "auto"]]);
});

beforeEach(() => {
  server = createServer({
    routes() {
      this.get(`${process.env.REACT_APP_BASE_API}/participants/details`, () => {
        return {
          content: {
            firstname: "firstname",
            lastname: "lastname",
            email: "first.last@domain.com",
            consentRegistration: false,
            consentRegistrationAtUtc: null,
            hasDemographics: true,
          },
          isSuccess: true,
          errors: [],
          conversationId: null,
          version: 1,
        };
      });
    },
  });
  ReactGA.testModeAPI.resetCalls();
});

afterEach(() => {
  server.shutdown();
});

describe("Account Settings display tests", () => {
  it("must not have accessibility violations", async () => {
    const { container } = render(<AccountSettings />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("must render without crashing", async () => {
    const { container } = render(<AccountSettings />);

    expect(container).toBeInTheDocument();
  });

  it("must render the correct title", async () => {
    render(<AccountSettings />);

    const header = await screen.findByRole("heading", { level: 1 });
    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe("Account settings");
  });

  it("must display the data retrieved from the server correctly", async () => {
    render(<AccountSettings />);

    expect(await screen.findByText("Email address")).toBeInTheDocument();
    expect(await screen.findByText("first.last@domain.com")).toBeInTheDocument();
    expect(await screen.findByText("Password")).toBeInTheDocument();

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute("href", "/");
    expect(links[0]).toHaveTextContent("Back");

    const editorButtons = await screen.findAllByRole("button");
    expect(editorButtons).toHaveLength(2);
    expect(editorButtons[0]).toHaveTextContent("Change");
    expect(editorButtons[1]).toHaveTextContent("Change");
  });
});

describe("Account Settings analytics", () => {
  it("must send the correct data", async () => {
    render(<AccountSettings />);
    await waitFor(
      () => {
        expect(ReactGA.testModeAPI.calls).toEqual([["send", { hitType: "pageview", page: "/AccountSettings" }]]);
      },
      { timeout: 1000 }
    );
  });
});
