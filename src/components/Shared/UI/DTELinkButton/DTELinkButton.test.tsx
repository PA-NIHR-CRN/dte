import { axe, toHaveNoViolations } from "jest-axe";
import { render } from "../../../../Helper/test-utils";
import DTELinkButton from "./DTELinkButton";

expect.extend(toHaveNoViolations);

describe("DTELinkButton", () => {
  it("should be accessible", async () => {
    const { container } = render(<DTELinkButton>Button text</DTELinkButton>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
