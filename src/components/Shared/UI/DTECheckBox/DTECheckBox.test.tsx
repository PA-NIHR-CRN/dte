import { axe, toHaveNoViolations } from "jest-axe";
import { render } from "../../../../Helper/test-utils";
import DTECheckBox from "./DTECheckBox";

expect.extend(toHaveNoViolations);

describe("DTECheckBox", () => {
  it("should be accessible", async () => {
    const { container } = render(
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      <label>
        <DTECheckBox value="This is text" />
      </label>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
