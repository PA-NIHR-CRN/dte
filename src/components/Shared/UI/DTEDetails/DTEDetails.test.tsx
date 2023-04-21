import { axe, toHaveNoViolations } from "jest-axe";
import { render } from "../../../../Helper/test-utils";
import DTEDetails from "./DTEDetails";

expect.extend(toHaveNoViolations);

describe("DTEDetails Accessibility tests", () => {
  it("must be accessible", async () => {
    const { container } = render(
      <DTEDetails summary="summary text">
        <p>Content</p>
      </DTEDetails>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
