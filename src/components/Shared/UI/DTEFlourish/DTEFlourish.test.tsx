import { axe, toHaveNoViolations } from "jest-axe";
import { render } from "../../../../Helper/test-utils";
import DTEFlourish from "./DTEFlourish";

expect.extend(toHaveNoViolations);

describe("DTEFlourish", () => {
  it("should be accessible", async () => {
    const { container } = render(<DTEFlourish />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
