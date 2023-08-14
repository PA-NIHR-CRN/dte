import { axe, toHaveNoViolations } from "jest-axe";
import { render, screen, waitFor } from "../../../Helper/test-utils";
import Newsletter from "./Newsletter";

expect.extend(toHaveNoViolations);

beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
});

describe("Areas Of Research display tests", () => {
  it("must not have accessibility violations", async () => {
    const { container } = render(<Newsletter />);
    await waitFor(() => {
      expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("must render without crashing", async () => {
    const { container } = render(<Newsletter />);
    await waitFor(() => {
      expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
    });
    expect(container).toBeInTheDocument();
  });

  it("must render the correct title", async () => {
    render(<Newsletter />);
    const header = await screen.findByRole("heading", { level: 1 });
    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe("Be Part of Research Newsletter");
  });

  it("must display the correct text", async () => {
    render(<Newsletter />);
    await waitFor(() => {
      expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
    });
    const text = await screen.findByText(
      "As the Be Part of Research Volunteer Service is in 'private beta', it may take some time to hear about studies you can take part in. By signing up to our monthly newsletter, you'll receive all our latest news and hear of more opportunities to take part in research from across the UK."
    );
    expect(text).toBeInTheDocument();
  });

  it("must display the correct links", async () => {
    render(<Newsletter />);
    await waitFor(() => {
      expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
    });
    const links = await screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0].textContent).toBe("Back");
    expect(links[0]).toHaveAttribute("href", "/");
    expect(links[1].textContent).toBe(
      "Sign up to the Be Part of Research newsletter"
    );
    expect(links[1]).toHaveAttribute(
      "href",
      "https://nihr.us14.list-manage.com/subscribe?u=299dc02111e8a68172029095f&id=3b030a1027&utm_source=bpor-vs-website&utm_medium=referral&utm_campaign=bpor-newsletter"
    );
    expect(links[1]).toHaveAttribute("target", "_blank");
  });
});
