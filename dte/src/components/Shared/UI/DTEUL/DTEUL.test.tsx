import { axe, toHaveNoViolations } from "jest-axe";
import { render } from "../../../../Helper/test-utils";
import DTEUL from "./DTEUL";

expect.extend(toHaveNoViolations);

describe("DTEUL", () => {
  it("should be accessible", async () => {
    const { container } = render(<DTEUL />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
