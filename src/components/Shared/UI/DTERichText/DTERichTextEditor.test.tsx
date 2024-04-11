import { axe, toHaveNoViolations } from "jest-axe";
import { render } from "../../../../Helper/test-utils";
import DTERichTextEditor from "./DTERichTextEditor";

expect.extend(toHaveNoViolations);

describe("DTERichTextEditor accessibility", () => {
  it("must be accessible when rendered with empty string", async () => {
    const mockOnValueChange = jest.fn();
    const { container } = render(<DTERichTextEditor id="test" onValueChange={mockOnValueChange} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("must be accessible when rendered with valid accessible html string", async () => {
    const mockOnValueChange = jest.fn();
    const { container } = render(
      <DTERichTextEditor id="test" onValueChange={mockOnValueChange} value="<p>Valid html to render</p>" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
