import { axe, toHaveNoViolations } from "jest-axe";
import { render, screen, waitFor } from "../../../../Helper/test-utils";
import UpdateEmailSuccess from "./UpdateEmailSuccess";

expect.extend(toHaveNoViolations);

describe("Update Email Success display tests", () => {
  it("must not have accessibility violations", async () => {
    const { container } = render(<UpdateEmailSuccess />);
    await waitFor(() => {
      expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("must render without crashing", async () => {
    const { container } = render(<UpdateEmailSuccess />);
    await waitFor(() => {
      expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
    });
    expect(container).toBeInTheDocument();
  });

  it("must display the page content correctly", async () => {
    render(<UpdateEmailSuccess />);
    await waitFor(() => {
      expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
    });
    const header = await screen.findByRole("heading", { level: 1 });
    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe("Your email address has been updated");

    expect(
      await screen.findByText("You need to sign back in to your account.")
    ).toBeInTheDocument();

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute("href", "/");
    expect(links[0]).toHaveTextContent("Sign in");
  });
});
