import { axe, toHaveNoViolations } from "jest-axe";
import { render } from "../../../../../Helper/test-utils";
import DTEContent from "./DTEContent";

expect.extend(toHaveNoViolations);

describe("DTEContent", () => {
  it("is accessible", async () => {
    const { container } = render(<DTEContent />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
