import { axe, toHaveNoViolations } from "jest-axe";
import {
  render,
  screen,
  fireEvent,
  userEvent,
} from "../../../Helper/test-utils";
import DOBForm from "./DOBForm";

expect.extend(toHaveNoViolations);

const testData = {
  day: "11",
  month: "12",
  year: "2000",
};

describe("DOB Renders correctly", () => {
  it("renders content correctly", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <DOBForm
        onDataChange={mockOnDataChange}
        initialStateData={{
          day: "",
          month: "",
          year: "",
        }}
      />,
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(1);
    expect(buttons[0]).toHaveTextContent("Continue");
  });

  it("renders update content correctly", async () => {
    const mockOnDataChange = jest.fn();
    const mockOnCancel = jest.fn();
    render(
      <DOBForm
        onDataChange={mockOnDataChange}
        onCancel={mockOnCancel}
        nextButtonText="Save"
        showCancelButton
        initialStateData={{
          day: "",
          month: "",
          year: "",
        }}
      />,
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveTextContent("Save");
    expect(buttons[1]).toHaveTextContent("Cancel");
  });

  it("renders with blank data", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <DOBForm
        onDataChange={mockOnDataChange}
        initialStateData={{
          day: "",
          month: "",
          year: "",
        }}
      />,
    );
  });

  it("renders with populated data", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <DOBForm onDataChange={mockOnDataChange} initialStateData={testData} />,
    );
  });

  it("correctly populates state data", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <DOBForm onDataChange={mockOnDataChange} initialStateData={testData} />,
    );
    expect(screen.getByDisplayValue("11")).toBeInTheDocument();
    expect(screen.getByDisplayValue("12")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2000")).toBeInTheDocument();
  });

  it("must not fail any accessibility tests for empty data", async () => {
    const mockOnDataChange = jest.fn();
    const { container } = render(
      <DOBForm
        onDataChange={mockOnDataChange}
        initialStateData={{
          day: "",
          month: "",
          year: "",
        }}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("must not fail any accessibility tests for populated data", async () => {
    const mockOnDataChange = jest.fn();
    const { container } = render(
      <DOBForm onDataChange={mockOnDataChange} initialStateData={testData} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("DOB Form Functional tests", () => {
  it("allows for day value to be changed", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <DOBForm onDataChange={mockOnDataChange} initialStateData={testData} />,
    );
    fireEvent.change(screen.getByLabelText(/Day/, { selector: "input" }), {
      target: { value: "8" },
    });
    expect(screen.getByDisplayValue("8")).toBeInTheDocument();
    expect(screen.getByDisplayValue("12")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2000")).toBeInTheDocument();
  });

  it("allows for month value to be changed", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <DOBForm onDataChange={mockOnDataChange} initialStateData={testData} />,
    );
    fireEvent.change(screen.getByLabelText(/Month/, { selector: "input" }), {
      target: { value: "7" },
    });
    expect(screen.getByDisplayValue("11")).toBeInTheDocument();
    expect(screen.getByDisplayValue("7")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2000")).toBeInTheDocument();
  });

  it("allows for year value to be changed", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <DOBForm onDataChange={mockOnDataChange} initialStateData={testData} />,
    );
    fireEvent.change(screen.getByLabelText(/Year/, { selector: "input" }), {
      target: { value: "1980" },
    });
    expect(screen.getByDisplayValue("11")).toBeInTheDocument();
    expect(screen.getByDisplayValue("12")).toBeInTheDocument();
    expect(screen.getByDisplayValue("1980")).toBeInTheDocument();
  });

  it("should only allow 2 characters for the day field", () => {
    const mockOnDataChange = jest.fn();
    render(
      <DOBForm onDataChange={mockOnDataChange} initialStateData={testData} />,
    );
    fireEvent.change(screen.getByLabelText(/Day/, { selector: "input" }), {
      target: { value: "888" },
    });
    expect(screen.getByDisplayValue("11")).toBeInTheDocument();
  });

  it("should only allow 2 characters for the month field", () => {
    const mockOnDataChange = jest.fn();
    render(
      <DOBForm onDataChange={mockOnDataChange} initialStateData={testData} />,
    );
    fireEvent.change(screen.getByLabelText(/Month/, { selector: "input" }), {
      target: { value: "999" },
    });
    expect(screen.getByDisplayValue("12")).toBeInTheDocument();
  });

  it("should only allow 4 characters for the year field", () => {
    const mockOnDataChange = jest.fn();
    render(
      <DOBForm onDataChange={mockOnDataChange} initialStateData={testData} />,
    );
    fireEvent.change(screen.getByLabelText(/Year/, { selector: "input" }), {
      target: { value: "12345" },
    });
    expect(screen.getByDisplayValue("2000")).toBeInTheDocument();
  });

  test("that the date must be longer that 18 years ago", async () => {
    const mockOnDataChange = jest.fn();
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    render(
      <DOBForm onDataChange={mockOnDataChange} initialStateData={testData} />,
    );
    fireEvent.change(screen.getByLabelText(/Day/), {
      target: { value: yesterday.getDay() },
    });
    fireEvent.change(screen.getByLabelText(/Month/), {
      target: { value: yesterday.getMonth() },
    });
    fireEvent.change(screen.getByLabelText(/Year/), {
      target: { value: yesterday.getFullYear() },
    });
    fireEvent.click(screen.getByRole("button"));
    expect(
      await screen.findByText("You must be 18 or over to use this service"),
    ).toBeInTheDocument();
  });

  test("that the date must be less than today", async () => {
    const mockOnDataChange = jest.fn();
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    render(
      <DOBForm onDataChange={mockOnDataChange} initialStateData={testData} />,
    );
    fireEvent.change(screen.getByLabelText(/Day/), {
      target: { value: tomorrow.getDay() },
    });
    fireEvent.change(screen.getByLabelText(/Month/), {
      target: { value: tomorrow.getMonth() },
    });
    fireEvent.change(screen.getByLabelText(/Year/), {
      target: { value: tomorrow.getFullYear() },
    });
    fireEvent.click(screen.getByRole("button"));
    expect(
      await screen.findByText("You must be 18 or over to use this service"),
    ).toBeInTheDocument();
  });

  it("valid data allows for the form to be submitted", async () => {
    const mockOnDataChange = jest.fn();
    const today = new Date();
    const validDate = new Date(today);
    validDate.setFullYear(validDate.getDate() - 20);

    render(
      <DOBForm onDataChange={mockOnDataChange} initialStateData={testData} />,
    );
    fireEvent.change(screen.getByLabelText(/Day/), {
      target: { value: validDate.getDay() },
    });
    fireEvent.change(screen.getByLabelText(/Month/), {
      target: { value: validDate.getMonth() },
    });
    fireEvent.change(screen.getByLabelText(/Year/), {
      target: { value: validDate.getFullYear() },
    });
    fireEvent.click(screen.getByRole("button"));
  });

  it("doesn't allow for the form to be submitted with invalid data", async () => {
    const mockOnDataChange = jest.fn();
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    render(
      <DOBForm onDataChange={mockOnDataChange} initialStateData={testData} />,
    );
    fireEvent.change(screen.getByLabelText(/Day/), {
      target: { value: "x" },
    });
    fireEvent.change(screen.getByLabelText(/Month/), {
      target: { value: "y" },
    });
    fireEvent.change(screen.getByLabelText(/Year/), {
      target: { value: "z" },
    });
    fireEvent.click(screen.getByRole("button"));
    expect(
      await screen.findByText("Date of birth must be a real date"),
    ).toBeInTheDocument();
  });
});

describe("User Login must display error summary header on invalid submission", () => {
  it("renders correctly", async () => {
    const mockOnDataChange = jest.fn();
    const mockOnCancel = jest.fn();
    render(
      <DOBForm
        onDataChange={mockOnDataChange}
        onCancel={mockOnCancel}
        nextButtonText="Save"
        showCancelButton
        initialStateData={{
          day: "",
          month: "",
          year: "",
        }}
      />,
    );
    const buttons = screen.getAllByRole("button");
    userEvent.click(buttons[0]);

    const errors = await screen.findAllByRole("alert");
    const summary = errors[0];
    expect(summary).toHaveAttribute("id", "error-message");
  });
});
