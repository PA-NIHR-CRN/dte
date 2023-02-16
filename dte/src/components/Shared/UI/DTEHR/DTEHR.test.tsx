import { axe, toHaveNoViolations } from "jest-axe";
import { render } from "../../../../Helper/test-utils";
import DTEHR from "./DTEHR";

expect.extend(toHaveNoViolations);

describe("DTEHR", () => {
  it("should be accessible", async () => {
    const { container } = render(<DTEHR />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
