import { axe, toHaveNoViolations } from "jest-axe";
import { render } from "../../../../Helper/test-utils";
import DTECheckList from "./DTECheckList";

expect.extend(toHaveNoViolations);

describe("DTECheckList", () => {
  it("should be accessible", async () => {
    const { container } = render(
      <DTECheckList
        id="test"
        name="test"
        label="test"
        values={[
          {
            value: "test",
            text: "test",
            checked: false,
            disabled: false,
          },
        ]}
        onValueChange={jest.fn()}
        escKeyPressed={jest.fn()}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
