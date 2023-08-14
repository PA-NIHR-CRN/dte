import { axe, toHaveNoViolations } from "jest-axe";
import { render, screen, waitFor } from "../../../../Helper/test-utils";
import ResendEmail from "./ResendEmail";

expect.extend(toHaveNoViolations);

describe("ResendEmail Accessibility test", () => {
  it("must not fail any accessibility tests for null data", async () => {
    const { container } = render(<ResendEmail />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("must not fail any accessibility tests for empty data", async () => {
    const { container } = render(<ResendEmail userId="" />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("must not fail any accessibility tests for populated data", async () => {
    const { container } = render(<ResendEmail userId="email@domain.com" />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
