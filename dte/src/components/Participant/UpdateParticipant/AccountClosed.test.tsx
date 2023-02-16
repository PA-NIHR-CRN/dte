import { axe, toHaveNoViolations } from "jest-axe";
import { render, screen } from "../../../Helper/test-utils";
import AccountClosed from "./AccountClosed";

expect.extend(toHaveNoViolations);

describe("Account Closed display tests", () => {
  it("must not have accessibility violations", async () => {
    const { container } = render(<AccountClosed />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("must render without crashing", async () => {
    const { container } = render(<AccountClosed />);
    expect(container).toBeInTheDocument();
  });

  it("must render the correct title", async () => {
    render(<AccountClosed />);
    const header = await screen.findByRole("heading", { level: 1 });
    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe("Your account has been closed");
  });

  it("must display the data retrieved from the server correctly", async () => {
    render(<AccountClosed />);
    expect(
      await screen.findByText("Your personal data has been deleted.")
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        "Thank you for your interest in Be Part of Research."
      )
    ).toBeInTheDocument();
  });
});
