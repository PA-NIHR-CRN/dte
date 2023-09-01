import { axe, toHaveNoViolations } from "jest-axe";
import { render, screen } from "../../../../../../Helper/test-utils";
import "@testing-library/jest-dom";
import NoConsent from "./NoConsent";

expect.extend(toHaveNoViolations);

describe("NoConsent accessiblity tests", () => {
  it("is accessible", async () => {
    const { container } = render(<NoConsent />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("NoConsent tests", () => {
  it("renders without error", async () => {
    render(<NoConsent />);
  });
  it("displays the correct content", async () => {
    render(<NoConsent />);
    expect(
      screen.getByText("Your registration has been cancelled"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Your data has not been stored."),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Thank you for your interest in Be Part of Research. We hope to see you back again soon.",
      ),
    ).toBeInTheDocument();
  });
});
