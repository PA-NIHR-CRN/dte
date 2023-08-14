import { axe, toHaveNoViolations } from "jest-axe";
import { render, screen, waitFor } from "../../../../Helper/test-utils";
import UpdatePasswordSuccess from "./UpdatePasswordSuccess";

expect.extend(toHaveNoViolations);

describe("Update Password Success display tests", () => {
  it("must not have accessibility violations", async () => {
    const { container } = render(<UpdatePasswordSuccess />);
    await waitFor(() => {
      expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("must render without crashing", async () => {
    const { container } = render(<UpdatePasswordSuccess />);
    await waitFor(() => {
      expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
    });
    expect(container).toBeInTheDocument();
  });

  it("must display the page content correctly", async () => {
    render(<UpdatePasswordSuccess />);
    await waitFor(() => {
      expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
    });
    const header = await screen.findByRole("heading", { level: 1 });
    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe("Your password has been updated");

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute("href", "/");
    expect(links[0]).toHaveTextContent("Go back to my account");
  });
});
