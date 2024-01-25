import { axe, toHaveNoViolations } from "jest-axe";
import { render, screen, waitFor } from "../../../../Helper/test-utils";
import CheckYourEmail from "./CheckYourEmail";

expect.extend(toHaveNoViolations);

describe("Check Your Email Accessibility test", () => {
  it("must not fail any accessibility tests for empty data", async () => {
    const { container } = render(<CheckYourEmail emailAddress="" />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("must not fail any accessibility tests for populated data", async () => {
    const { container } = render(<CheckYourEmail emailAddress="email@domain.com" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("Check Your Email Displays Data Correctly", () => {
  it("must display the correct header", async () => {
    render(<CheckYourEmail emailAddress="" />);

    const header = screen.getByRole("heading", { level: 1 });
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Check your email");
  });

  it("must display the correct content", async () => {
    render(<CheckYourEmail emailAddress="email@domain.com" />);

    expect(screen.getByText("We've sent an email to email@domain.com")).toBeInTheDocument();
    expect(screen.getByText("You'll need to click on the link to validate it within 24 hours.")).toBeInTheDocument();
    expect(
      screen.getByText("Once you've verified the email, you will be able to continue registration by signing in.")
    ).toBeInTheDocument();
    expect(screen.getByText("Unable to find it? Check your spam folder.")).toBeInTheDocument();
    expect(screen.getByText("Still unable to find the email?")).toBeInTheDocument();
    expect(screen.getByText("Resend verification email")).toBeInTheDocument();
  });
});
