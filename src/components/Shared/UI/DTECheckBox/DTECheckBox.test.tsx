import { axe, toHaveNoViolations } from "jest-axe";
import { render } from "../../../../Helper/test-utils";
import DTECheckBox from "./DTECheckBox";

expect.extend(toHaveNoViolations);

describe("DTECheckBox", () => {
  it("should be accessible", async () => {
    const { container } = render(
      <label>
        <DTECheckBox value="This is text" />
      </label>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
