import { axe, toHaveNoViolations } from "jest-axe";
import { render } from "../../../../Helper/test-utils";
import DTEDateInput from "./DTEDateInput";

expect.extend(toHaveNoViolations);

describe("Test suite for DTEDateInput component", () => {
  it("should not fail any accessibility tests with no configuration", async () => {
    const { container } = render(<DTEDateInput />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should not fail any accessibility tests with only error configured", async () => {
    const { container } = render(
      <DTEDateInput label="label" error="Error message" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should not fail any accessibility tests with id and label configured", async () => {
    const { container } = render(<DTEDateInput label="label" id="inputName" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should not fail any accessibility tests with id, name and label configured", async () => {
    const { container } = render(
      <DTEDateInput label="label" id="inputDOB" name="inputDateOfBirth" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should not fail any accessibility tests with all configured", async () => {
    const { container } = render(
      <DTEDateInput
        label="label"
        id="inputDOB"
        name="inputDateOfBirth"
        required
        error="This is an error"
        hint="hint"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
