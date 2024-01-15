import { render, screen } from "../../Helper/test-utils";
import MaintenancePage from "./MaintenancePage";

describe("MaintenancePage", () => {
  it("renders the maintenance message", () => {
    render(<MaintenancePage />);
    const headerElement = screen.getByRole("heading", {
      name: /Sorry, the service is unavailable/i,
    });
    const contentElement1 = screen.getByText(
      /You will be able to use the service from 9am on Tuesday 16th January 2024./i
    );
    const contentElement2 = screen.getByText(
      /If you need to contact the Be Part of Research team please email/i
    );
    const linkElement = screen.getByRole("link", {
      name: /bepartofresearch@nihr.ac.uk/i,
    });

    expect(headerElement).toBeInTheDocument();
    expect(contentElement1).toBeInTheDocument();
    expect(contentElement2).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute(
      "href",
      "mailto:bepartofresearch@nihr.ac.uk"
    );
  });
});
