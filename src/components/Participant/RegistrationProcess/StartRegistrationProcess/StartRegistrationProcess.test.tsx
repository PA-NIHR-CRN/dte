import { axe, toHaveNoViolations } from "jest-axe";
import { render, screen, waitFor } from "../../../../Helper/test-utils";
import "@testing-library/jest-dom";

import StartRegistrationProcess from "./StartRegistrationProcess";

expect.extend(toHaveNoViolations);

describe("StartRegistrationProcess accessibility tests", () => {
  it("is accessible", async () => {
    const { container } = render(<StartRegistrationProcess />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("StartRegistrationProcess functionality tests", () => {
  it("should render without crashing", async () => {
    render(<StartRegistrationProcess />);

    expect(
      screen.getByText("Register with Be Part of Research"),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "A simple registration process will capture your basic information, including contact details.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("You can sign up if you:")).toBeInTheDocument();
    expect(screen.getByText("have an email address")).toBeInTheDocument();
    expect(screen.getByText("are 18 or over")).toBeInTheDocument();
    expect(screen.getByText("live in the UK")).toBeInTheDocument();
    expect(screen.getByText("Continue to NHS login")).toBeInTheDocument();
    expect(screen.getByText("Register with email address")).toBeInTheDocument();
    expect(screen.getByText("Sign in")).toBeInTheDocument();
    expect(screen.getByText("Already have an account?")).toBeInTheDocument();
  });
});
