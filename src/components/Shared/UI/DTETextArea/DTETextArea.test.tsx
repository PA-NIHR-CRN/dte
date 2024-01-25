import { axe, toHaveNoViolations } from "jest-axe";
import { render } from "../../../../Helper/test-utils";
import DTETextArea from "./DTETextArea";

expect.extend(toHaveNoViolations);

describe("Test suite for DTEInput component", () => {
  it("should fail any accessibility tests without minimum configuration - label", async () => {
    const { container } = render(<DTETextArea />);
    const results = await axe(container);
    expect(results).not.toHaveNoViolations();
  });

  it("should not fail any accessibility tests with only label configured", async () => {
    const { container } = render(<DTETextArea label="label" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should not fail any accessibility tests with only label & error configured", async () => {
    const { container } = render(<DTETextArea label="label" error="Error message" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should not fail any accessibility tests with id and label configured", async () => {
    const { container } = render(<DTETextArea label="label" id="inputName" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should not fail any accessibility tests with id, name and label configured", async () => {
    const { container } = render(<DTETextArea label="label" id="inputName" name="inputName" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should not fail any accessibility tests with all configured", async () => {
    const { container } = render(
      <DTETextArea
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
});
