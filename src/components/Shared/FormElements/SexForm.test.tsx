import { axe, toHaveNoViolations } from "jest-axe";
import { render, fireEvent, screen, waitFor } from "../../../Helper/test-utils";
import "@testing-library/jest-dom";
import SexForm from "./SexForm";

expect.extend(toHaveNoViolations);

const data = {
  sexAtBirth: "",
};

describe("SexForm", () => {
  it("should render the form", () => {
    const mockOnDataChange = jest.fn();
    render(<SexForm initialStateData={data} onDataChange={mockOnDataChange} />);
  });
  test("that the female radio button works", async () => {
    const mockOnDataChange = jest.fn();
    render(<SexForm initialStateData={data} onDataChange={mockOnDataChange} />);
    fireEvent.click(screen.getByDisplayValue("female"));
    fireEvent.click(screen.getByText(/Continue/i));
    await waitFor(() => {
      expect(mockOnDataChange).toBeCalledTimes(1);
    });
  });
  test("that the male radio button works", async () => {
    const mockOnDataChange = jest.fn();
    render(<SexForm initialStateData={data} onDataChange={mockOnDataChange} />);
    fireEvent.click(screen.getByDisplayValue("male"));
    fireEvent.click(screen.getByText(/Continue/i));
    await waitFor(() => {
      expect(mockOnDataChange).toBeCalledTimes(1);
    });
  });
});

describe("Accessibility test", () => {
  it("should not fail any accessibility tests", async () => {
    const mockOnDataChange = jest.fn();
    const { container } = render(
      <SexForm initialStateData={data} onDataChange={mockOnDataChange} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
