import { axe, toHaveNoViolations } from "jest-axe";
import { render } from "../../../../Helper/test-utils";
import DTEBackLink from "./DTEBackLink";

expect.extend(toHaveNoViolations);

describe("Test suite for DTEBackLink component", () => {
  it("should fail any accessibility tests with no configuration", async () => {
    const { container } = render(<DTEBackLink linkText="" />);
    const results = await axe(container);
    expect(results).not.toHaveNoViolations();
  });

  it("should fail any accessibility tests with no title configured", async () => {
    const { container } = render(
      <>
        <DTEBackLink href="/routeone" linkText="text" />
        <DTEBackLink href="/routetwo" linkText="text" />
      </>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
