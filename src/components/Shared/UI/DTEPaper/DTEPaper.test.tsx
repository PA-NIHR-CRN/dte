import { axe, toHaveNoViolations } from "jest-axe";
import { render } from "../../../../Helper/test-utils";
import DTEPaper from "./DTEPaper";

expect.extend(toHaveNoViolations);

describe("DTEPaper", () => {
  it("should be accessible", async () => {
    const { container } = render(<DTEPaper>Paper content</DTEPaper>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should be accessible with close button shown", async () => {
    const mockOnClickClose = jest.fn();
    const { container } = render(
      <DTEPaper onClickClose={mockOnClickClose} $buttonLabel="Close Form">
        Paper content
      </DTEPaper>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
