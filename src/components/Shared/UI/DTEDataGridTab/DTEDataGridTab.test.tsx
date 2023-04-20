import { axe, toHaveNoViolations } from "jest-axe";
import { render } from "../../../../Helper/test-utils";
import DTEDataGridTab from "./DTEDataGridTab";

expect.extend(toHaveNoViolations);

describe("DTEDataGridTab", () => {
  it("should be accessible", async () => {
    const { container } = render(<DTEDataGridTab>Button text</DTEDataGridTab>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
