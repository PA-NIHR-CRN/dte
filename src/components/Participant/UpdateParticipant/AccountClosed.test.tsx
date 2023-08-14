import { axe, toHaveNoViolations } from "jest-axe";
import { render, screen, waitFor } from "../../../Helper/test-utils";
import AccountClosed from "./AccountClosed";

expect.extend(toHaveNoViolations);

describe("Account Closed display tests", () => {
  it("must not have accessibility violations", async () => {
    const { container } = render(<AccountClosed />);
    await waitFor(() => {
      expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("must render without crashing", async () => {
    const { container } = render(<AccountClosed />);
    await waitFor(() => {
      expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
    });
    expect(container).toBeInTheDocument();
  });

  it("must render the correct title", async () => {
    render(<AccountClosed />);
    await waitFor(() => {
      expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
    });
    const header = await screen.findByRole("heading", { level: 1 });
    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe("Your account has been closed");
  });

  it("must display the data retrieved from the server correctly", async () => {
    render(<AccountClosed />);
    await waitFor(() => {
      expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
    });
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
