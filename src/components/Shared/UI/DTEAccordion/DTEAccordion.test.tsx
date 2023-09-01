import { axe, toHaveNoViolations } from "jest-axe";
import { render } from "../../../../Helper/test-utils";
import DTEAccordion from "./DTEAccordion";

expect.extend(toHaveNoViolations);

describe("Test suite for DTEAccordion component", () => {
  it("should not fail any accessibility tests with empty sections", async () => {
    const { container } = render(
      <DTEAccordion sections={[]} id="test" name="test" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should not fail any accessibility tests with single sections", async () => {
    const { container } = render(
      <DTEAccordion
        sections={[
          {
            isDefault: true,
            title: "Section One",
            contentElements: [
              {
                text: "Content for first element",
              },
            ],
          },
          {
            isDefault: false,
            title: "Section Two",
            contentElements: [
              {
                text: "Content for first paragraph",
              },
              {
                text: "Content for second paragraph",
              },
            ],
          },
        ]}
        id="test"
        name="test"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
