import { axe, toHaveNoViolations } from "jest-axe";
import { createBrowserHistory } from "history";
import { MemoryRouter, Route, BrowserRouter as Router } from "react-router-dom";
import {
  render,
  screen,
  userEvent,
  waitFor,
} from "../../../../Helper/test-utils";
import "@testing-library/jest-dom";
import MfaNoUkMobileOptions from "./MfaNoUkMobileOptions";

const mockHistoryPush = jest.fn();
const mockHistoryListen = jest.fn();
const mockHistoryGoBack = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
    listen: mockHistoryListen,
    goBack: mockHistoryGoBack,
  }),
}));

expect.extend(toHaveNoViolations);

const history = createBrowserHistory();

describe("Accessibility test", () => {
  it("should not fail any accessibility tests", async () => {
    const { container } = render(
      <Router>
        <MfaNoUkMobileOptions />
      </Router>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("MfaNoUkMobileOptions renders correctly", () => {
  it("should render the component", () => {
    render(
      <Router>
        <MfaNoUkMobileOptions />
      </Router>,
    );
    expect(
      screen.getByRole("heading", { name: "Please select an option" }),
    ).toBeInTheDocument();
  });

  it("renders the form", () => {
    render(
      <Router>
        <MfaNoUkMobileOptions />
      </Router>,
    );
    expect(screen.getByTestId("ukLandlineRadio-fieldset")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Continue" }),
    ).toBeInTheDocument();
  });

  it("handles user navigation back", () => {
    render(
      <Router>
        <MfaNoUkMobileOptions />
      </Router>,
    );
    const backLink = screen.getByRole("link", { name: "Back" });
    userEvent.click(backLink);
    expect(history.location.pathname).toBe("/");
  });

  describe("MfaNoUkMobileOptions renders correctly", () => {
    // your tests ...

    it("redirects to the MfaLandlineSetup route when the UK Landline option is selected", async () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <Route path="/">
            <MfaNoUkMobileOptions />
          </Route>
        </MemoryRouter>,
      );

      const option = screen.getByLabelText(
        "Provide a UK landline number. Our automated service will call you and read out a 6 digit code, so please have a pen and paper handy",
      );
      userEvent.click(option);
      const continueButton = screen.getByRole("button", { name: "Continue" });
      userEvent.click(continueButton);

      await waitFor(() => {
        expect(mockHistoryPush).toHaveBeenCalledWith("/MfaLandlineSetup");
      });
    });

    it("redirects to the MfaTokenSetup route when the authenticator app option is selected", async () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <Route path="/">
            <MfaNoUkMobileOptions />
          </Route>
        </MemoryRouter>,
      );

      const option = screen.getByLabelText(
        "Use an online authenticator application: We also have the option to use (TBC or TBC) in order to authenticate your account.",
      );
      userEvent.click(option);
      const continueButton = screen.getByRole("button", { name: "Continue" });
      userEvent.click(continueButton);

      await waitFor(() => {
        expect(mockHistoryPush).toHaveBeenCalledWith("/MfaTokenSetup");
      });
    });
  });
});
