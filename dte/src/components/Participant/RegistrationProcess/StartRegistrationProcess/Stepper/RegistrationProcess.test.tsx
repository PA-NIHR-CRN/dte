import ReactGA from "react-ga";
import { render, screen, waitFor } from "../../../../../Helper/test-utils";
import "@testing-library/jest-dom";
import RegistrationProcess from "./RegistrationProcess";

beforeAll(() => {
  window.scrollTo = jest.fn();
  ReactGA.initialize("UA-XXXXX-Y", { testMode: true });
  expect(ReactGA.testModeAPI.calls).toEqual([["create", "UA-XXXXX-Y", "auto"]]);
});

beforeEach(() => {
  ReactGA.testModeAPI.resetCalls();
});

describe("RegistrationProcess", () => {
  it("loads and displays the registration stepper page", async () => {
    render(<RegistrationProcess />);
    expect(screen.getByText("Back")).toBeInTheDocument();
  });

  it("sends the correct analytics data when the page loads", async () => {
    render(<RegistrationProcess />);
    await waitFor(
      () => {
        expect(ReactGA.testModeAPI.calls).toEqual([
          ["send", { hitType: "pageview", page: "/registration/name" }],
        ]);
      },
      { timeout: 1000 }
    );
  });
});
