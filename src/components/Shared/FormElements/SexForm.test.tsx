import { axe, toHaveNoViolations } from "jest-axe";
import { render, fireEvent, screen, waitFor } from "../../../Helper/test-utils";
import "@testing-library/jest-dom";
import SexForm from "./SexForm";

expect.extend(toHaveNoViolations);

const data = {
  sexAtBirth: "",
  genderAtBirth: "",
};

describe("SexForm", () => {
  const setup = () => {
    const mockOnDataChange = jest.fn();
    render(<SexForm initialStateData={data} onDataChange={mockOnDataChange} />);
    return mockOnDataChange;
  };

  it("should render the form", () => {
    setup();
    expect(screen.getByText("Sex and gender identity")).toBeInTheDocument();
  });

  test("that the female radio button works", async () => {
    const mockOnDataChange = setup();
    fireEvent.click(screen.getByDisplayValue("female"));
    fireEvent.click(screen.getByLabelText("Yes, the gender I identify with is the same as my registered sex at birth"));
    fireEvent.click(screen.getByText(/Continue/i));
    await waitFor(() => {
      expect(mockOnDataChange).toBeCalledTimes(1);
    });
  });

  test("that the male radio button works", async () => {
    const mockOnDataChange = setup();
    fireEvent.click(screen.getByDisplayValue("male"));
    fireEvent.click(screen.getByLabelText("Yes, the gender I identify with is the same as my registered sex at birth"));
    fireEvent.click(screen.getByText(/Continue/i));
    await waitFor(() => {
      expect(mockOnDataChange).toBeCalledTimes(1);
    });
  });

  test("that error validation works", async () => {
    const mockOnDataChange = setup();
    fireEvent.click(screen.getByText(/Continue/i));
    await waitFor(() => {
      expect(screen.getByText("Select if you are Female or Male")).toBeInTheDocument();
      expect(
        screen.getByText("Select whether the gender you identify with is the same as your sex registered at birth")
      ).toBeInTheDocument();
      expect(mockOnDataChange).not.toBeCalled();
    });
  });
});

describe("Accessibility test", () => {
  it("should not fail any accessibility tests", async () => {
    const mockOnDataChange = jest.fn();
    const { container } = render(<SexForm initialStateData={data} onDataChange={mockOnDataChange} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
