import { axe, toHaveNoViolations } from "jest-axe";
import { render } from "../../../../Helper/test-utils";
import DTEButton from "./DTEButton";

expect.extend(toHaveNoViolations);

describe("DTEButton", () => {
  it("should be accessible", async () => {
    const { container } = render(<DTEButton>Button text</DTEButton>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
