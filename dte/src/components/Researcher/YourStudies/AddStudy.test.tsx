import { axe, toHaveNoViolations } from "jest-axe";
import { render } from "../../../Helper/test-utils";
import AddStudy from "./AddStudy";

expect.extend(toHaveNoViolations);

describe("AddStudy tests", () => {
  it("should render", async () => {
    render(<AddStudy />);
    expect(true).toBe(true);
  });
});

describe("AddStudy accessiblity tests", () => {
  it("should be accessible", async () => {
    const { container } = render(<AddStudy />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
