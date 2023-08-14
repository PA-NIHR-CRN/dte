import { axe, toHaveNoViolations } from "jest-axe";
import { createServer, Server } from "miragejs";
import ReactGA from "react-ga";
import {
  render,
  screen,
  userEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "../../../Helper/test-utils";
import CloseAccount from "./CloseAccount";

expect.extend(toHaveNoViolations);

let server: Server;
const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
    listen: jest.fn(),
  }),
}));

beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  ReactGA.initialize("UA-XXXXX-Y", { testMode: true });
  expect(ReactGA.testModeAPI.calls).toEqual([["create", "UA-XXXXX-Y", "auto"]]);
});

beforeEach(() => {
  ReactGA.testModeAPI.resetCalls();
  server = createServer({
    routes() {
      this.delete(
        `${process.env.REACT_APP_BASE_API}/users/deleteparticipantaccount`,
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
    },
  });
});

afterEach(() => {
  server.shutdown();
});

describe("Close Account display tests", () => {
  it("must not have accessibility violations", async () => {
    const { container } = render(<CloseAccount />);
    await waitFor(() => {
      expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("must render without crashing", async () => {
    const { container } = render(<CloseAccount />);
    await waitFor(() => {
      expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
    });
    expect(container).toBeInTheDocument();
  });

  it("must render the correct title", async () => {
    render(<CloseAccount />);
    await waitFor(() => {
      expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
    });
    const header = await screen.findByRole("heading", { level: 1 });
    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe("Close your account");
  });

  it("must display the data retrieved from the server correctly", async () => {
    render(<CloseAccount />);
    await waitFor(() => {
      expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
    });
    expect(
      await screen.findByText(
        "If you have changed your mind and wish to close your account, you are withdrawing your consent for Be Part of Research to process and store your personal information."
      )
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        "Be Part of Research will no longer contact you about areas of research you have expressed an interest in."
      )
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        /When closing your account Be Part of Research will keep some anonymous data to help improve the service. To find out more please read the/
      )
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        "To take part in the future you can register again."
      )
    ).toBeInTheDocument();

    const links = await screen.findAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", "/");
    expect(links[0]).toHaveTextContent("Back");
    expect(links[1]).toHaveAttribute(
      "href",
      "https://bepartofresearch.nihr.ac.uk/site-policies/privacy-policy/"
    );
    expect(links[1]).toHaveAttribute("target", "_blank");
    expect(links[1]).toHaveTextContent("Be Part of Research Privacy Policy");

    const buttons = await screen.findAllByRole("button");
    expect(buttons).toHaveLength(1);
    expect(buttons[0]).toHaveTextContent("Close your account");
  });
});

describe("Close Account functional tests", () => {
  it("must display warning dialogue on Close your account", async () => {
    render(<CloseAccount />);
    await waitFor(() => {
      expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
    });
    const buttons = await screen.findAllByRole("button");
    userEvent.click(buttons[0]);
    const confirmButtons = await screen.findAllByRole("button");
    expect(confirmButtons).toHaveLength(2);
    expect(
      await screen.findByText("Confirm if you want to close your account")
    ).toBeInTheDocument();
    expect(confirmButtons[0]).toHaveTextContent("Confirm");
    expect(confirmButtons[1]).toHaveTextContent("Cancel");
  });

  it("must handle cancel close account correctly", async () => {
    render(<CloseAccount />);
    await waitFor(() => {
      expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
    });
    const buttons = await screen.findAllByRole("button");
    userEvent.click(buttons[0]);
    const confirmButtons = await screen.findAllByRole("button");
    userEvent.click(confirmButtons[1]);
    expect(
      screen.queryByText("Confirm if you want to close your account")
    ).not.toBeInTheDocument();
    const postCancelButtons = await screen.findAllByRole("button");
    expect(postCancelButtons).toHaveLength(1);
    expect(postCancelButtons[0]).toHaveTextContent("Close your account");
  });

  it("must call the api to close the account only on confirm button", async () => {
    render(<CloseAccount />);
    await waitFor(() => {
      expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
    });
    const buttons = await screen.findAllByRole("button");
    userEvent.click(buttons[0]);
    const confirmButtons = await screen.findAllByRole("button");
    userEvent.click(confirmButtons[0]);
    server.pretender.handledRequest = (verb, path) => {
      expect(verb).toBe("DELETE");
      expect(path).toBe(
        `${process.env.REACT_APP_BASE_API}/users/deleteparticipantaccount`
      );
    };
  });

  it("must not call the api to close the account on cancel button", async () => {
    render(<CloseAccount />);
    await waitFor(() => {
      expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
    });
    const buttons = await screen.findAllByRole("button");
    userEvent.click(buttons[0]);
    const confirmButtons = await screen.findAllByRole("button");
    userEvent.click(confirmButtons[1]);
    server.pretender.handledRequest = (verb, path) => {
      expect(verb).toBe("DELETE");
      expect(path).toBe(
        `${process.env.REACT_APP_BASE_API}/users/deleteparticipantaccount`
      );
      expect(path).not.toHaveBeenCalled();
    };
  });

  it("must redirect to the confirmation page following a successful delete", async () => {
    render(<CloseAccount />, undefined, [
      { pathname: "/Participants/CloseAccount" },
      { pathname: "/Participants/AccountClosed" },
    ]);
    await waitFor(() => {
      expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
    });
    const buttons = await screen.findAllByRole("button");
    userEvent.click(buttons[0]);
    const confirmButtons = await screen.findAllByRole("button");
    userEvent.click(confirmButtons[0]);
    await waitForElementToBeRemoved(
      await screen.findByText(/Closing your account.../)
    );
    expect(mockHistoryPush).toHaveBeenCalledTimes(1);
    expect(mockHistoryPush).toHaveBeenCalledWith("/Participants/accountclosed");
  });
});

describe("Account closed analytics", () => {
  it("must send the correct data", async () => {
    render(<CloseAccount />);
    await waitFor(
      () => {
        expect(ReactGA.testModeAPI.calls).toEqual([
          ["send", { hitType: "pageview", page: "/MyAccount/CloseAccount" }],
        ]);
      },
      { timeout: 1000 }
    );
  });
});
