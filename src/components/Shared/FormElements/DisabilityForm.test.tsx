import { axe, toHaveNoViolations } from "jest-axe";
import { render, fireEvent, screen, waitFor } from "../../../Helper/test-utils";
import "@testing-library/jest-dom";
import DisabilityForm from "./DisabilityForm";

expect.extend(toHaveNoViolations);

describe("DisabilityForm", () => {
  it("renders", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <DisabilityForm
        initialStateData={{
          disability: "",
        }}
        onDataChange={mockOnDataChange}
      />,
    );
    expect(
      screen.getByText(
        "Do you have any health conditions that have lasted, or are expected to last, for 12 months or more?",
      ),
    ).toBeInTheDocument();
  });

  it("allows for a default value to be loaded", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <DisabilityForm
        initialStateData={{
          disability: "yes",
        }}
        onDataChange={mockOnDataChange}
      />,
    );

    expect(screen.getByDisplayValue("yes")).toBeInTheDocument();
  });

  it("allows the user to choose an option", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <DisabilityForm
        initialStateData={{
          disability: "",
        }}
        onDataChange={mockOnDataChange}
      />,
    );

    expect(screen.getByDisplayValue("yes")).not.toBeChecked();
    fireEvent.click(screen.getByDisplayValue("yes"));
    expect(screen.getByDisplayValue("yes")).toBeChecked();
  });

  it("submits when the user enters no", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <DisabilityForm
        initialStateData={{
          disability: "",
        }}
        onDataChange={mockOnDataChange}
      />,
    );

    expect(screen.getByDisplayValue("no")).not.toBeChecked();
    fireEvent.click(screen.getByDisplayValue("no"));
    expect(screen.getByDisplayValue("no")).toBeChecked();
    fireEvent.click(screen.getByText("Continue"));
    await waitFor(() => {
      expect(mockOnDataChange).toHaveBeenCalledTimes(1);
    });
  });

  it("does not submit when the user enters yes and no description", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <DisabilityForm
        initialStateData={{
          disability: "",
        }}
        onDataChange={mockOnDataChange}
      />,
    );

    expect(screen.getByDisplayValue("yes")).not.toBeChecked();
    fireEvent.click(screen.getByDisplayValue("yes"));
    expect(screen.getByDisplayValue("yes")).toBeChecked();
    await waitFor(() => {
      expect(mockOnDataChange).not.toHaveBeenCalled();
    });
  });
});

describe("Accessibility test", () => {
  it("should not fail any accessibility tests", async () => {
    const mockOnDataChange = jest.fn();
    const { container } = render(
      <DisabilityForm
        initialStateData={{
          disability: "",
        }}
        onDataChange={mockOnDataChange}
      />,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
