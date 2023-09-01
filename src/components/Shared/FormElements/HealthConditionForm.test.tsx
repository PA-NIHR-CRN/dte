import { axe, toHaveNoViolations } from "jest-axe";
import { render } from "../../../Helper/test-utils";
import "@testing-library/jest-dom";
import HealthConditionForm from "./HealthConditionForm";

expect.extend(toHaveNoViolations);

const blankTestData = {
  conditions: [],
};

const populatedTestData = {
  conditions: ["item1"],
};

describe("HealthConditionForm", () => {
  it("must render the form with no selected data", () => {
    const mockOnDataChange = jest.fn();
    render(
      <HealthConditionForm
        initialStateData={blankTestData}
        onDataChange={mockOnDataChange}
      />,
    );
  });

  it("must render the form with selected data", () => {
    const mockOnDataChange = jest.fn();
    render(
      <HealthConditionForm
        initialStateData={populatedTestData}
        onDataChange={mockOnDataChange}
      />,
    );
  });
});

describe("Accessibility test", () => {
  it("must not fail any accessibility tests for no selected data", async () => {
    const mockOnDataChange = jest.fn();
    const { container } = render(
      <HealthConditionForm
        initialStateData={blankTestData}
        onDataChange={mockOnDataChange}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("must not fail any accessibility tests for selected data", async () => {
    const mockOnDataChange = jest.fn();
    const { container } = render(
      <HealthConditionForm
        initialStateData={populatedTestData}
        onDataChange={mockOnDataChange}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
