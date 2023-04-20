import { axe, toHaveNoViolations } from "jest-axe";
import { render } from "../../../Helper/test-utils";
import "@testing-library/jest-dom";
import GenderForm from "./GenderForm";

expect.extend(toHaveNoViolations);

const data = {
  genderAtBirth: "",
};

describe("GenderForm", () => {
  it("should render the form", () => {
    const mockOnDataChange = jest.fn();
    render(
      <GenderForm onDataChange={mockOnDataChange} initialStateData={data} />
    );
  });
});

describe("Accessibility test", () => {
  it("should not fail any accessibility tests", async () => {
    const mockOnDataChange = jest.fn();
    const { container } = render(
      <GenderForm
        initialStateData={{
          genderAtBirth: "",
        }}
        onDataChange={mockOnDataChange}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
