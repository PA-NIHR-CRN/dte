import { axe, toHaveNoViolations } from "jest-axe";
import { render, screen } from "../../../Helper/test-utils";
import YourStudies from "./YourStudies";

expect.extend(toHaveNoViolations);

describe("YourStudies", () => {
  it("should render", async () => {
    render(<YourStudies />);
    expect(screen.getByText("Studies")).toBeInTheDocument();
  });
});

describe("YourStudies accessibility", () => {
  it("should be accessible", async () => {
    const { container } = render(<YourStudies />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
