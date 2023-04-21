// import { notDeepEqual } from "assert";
import { axe, toHaveNoViolations } from "jest-axe";
import { render, screen } from "../../../../Helper/test-utils";
import DTEInput from "./DTEInput";

expect.extend(toHaveNoViolations);

describe("Test suite for DTEInput component", () => {
  it("should fail any accessibility tests without minimum configuration - label", async () => {
    const { container } = render(<DTEInput />);
    const results = await axe(container);
    expect(results).not.toHaveNoViolations();
  });

  it("should not fail any accessibility tests with only label configured", async () => {
    const { container } = render(<DTEInput label="label" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should not fail any accessibility tests with only label & error configured", async () => {
    const { container } = render(
      <DTEInput label="label" error="Error message" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should not fail any accessibility tests with id and label configured", async () => {
    const { container } = render(<DTEInput label="label" id="inputName" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should not fail any accessibility tests with id, name and label configured", async () => {
    const { container } = render(
      <DTEInput label="label" id="inputName" name="inputName" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should not fail any accessibility tests with all configured", async () => {
    const { container } = render(
      <DTEInput
        label="label"
        id="inputName"
        name="inputName"
        required
        error="This is an error"
        hint="hint"
        type="password"
        value="this is a value"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("aria-disabled must be configured as true when disabled is set to true", async () => {
    render(<DTEInput label="label" id="inputName" name="inputName" disabled />);
    const input = await screen.findByRole("textbox");
    expect(input).toBeDisabled();
  });

  it("aria-disabled must not be configured when disabled is not set", async () => {
    render(<DTEInput label="label" id="inputName" name="inputName" />);
    const input = await screen.findByRole("textbox");
    expect(input).toBeEnabled();
  });
});
