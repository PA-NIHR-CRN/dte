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

    expect(screen.getByText(/email@domain.com/)).toBeInTheDocument();
  });
});
