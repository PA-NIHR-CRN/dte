import { axe, toHaveNoViolations } from "jest-axe";
import {
  render,
  fireEvent,
  screen,
  waitFor,
} from "../../../../Helper/test-utils";
import "@testing-library/jest-dom";
import ManualEntry from "./ManualEntry";

expect.extend(toHaveNoViolations);

const testData = {
  addressLine1: "1, Test Street",
  addressLine2: "Borough",
  addressLine3: "",
  addressLine4: "",
  town: "Greater London",
  postcode: "SE1 0UG",
};

const emptyData = {
  addressLine1: "",
  addressLine2: "",
  addressLine3: "",
  addressLine4: "",
  town: "",
  postcode: "",
};

const whitespaceData = {
  addressLine1: "     ",
  addressLine2: "",
  addressLine3: "",
  addressLine4: "    ",
  town: "",
  postcode: "",
};

describe("ManualEntry", () => {
  it("renders", () => {
    const mockOnDataChange = jest.fn();
    render(
      <ManualEntry
        initialStateData={testData}
        onDataChange={mockOnDataChange}
      />
    );
  });

  it("must render all of the input fields", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <ManualEntry
        initialStateData={testData}
        onDataChange={mockOnDataChange}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("Address line 1")).toBeInTheDocument();
      expect(screen.getByText("Address line 2 (optional)")).toBeInTheDocument();
      expect(screen.getByText("Address line 3 (optional)")).toBeInTheDocument();
      expect(screen.getByText("Address line 4 (optional)")).toBeInTheDocument();
      expect(screen.getByText("Town")).toBeInTheDocument();
      expect(screen.getByText("Postcode (optional)")).toBeInTheDocument();
    });
  });

  it("must allow submit after required fields are entered", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <ManualEntry
        initialStateData={emptyData}
        onDataChange={mockOnDataChange}
      />
    );

    await waitFor(() => {
      fireEvent.input(screen.getByLabelText("Address line 1"), {
        target: { value: "test address 1" },
      });

      fireEvent.input(screen.getByLabelText("Town"), {
        target: { value: "test town" },
      });

      expect(screen.getByDisplayValue("test address 1")).toBeInTheDocument();
      expect(screen.getByDisplayValue("test town")).toBeInTheDocument();

      fireEvent.click(screen.getByText("Continue"));
      expect(mockOnDataChange).toHaveBeenCalled();
    });
  });

  it("must show an error message if required fields are not entered", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <ManualEntry
        initialStateData={emptyData}
        onDataChange={mockOnDataChange}
      />
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("Continue"));
      expect(mockOnDataChange).not.toHaveBeenCalled();

      expect(
        screen.getByText("Enter the first line of your address")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Enter the town of your address")
      ).toBeInTheDocument();
    });
  });

  it("must show an error message if required fields contain only whitespace", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <ManualEntry
        initialStateData={whitespaceData}
        onDataChange={mockOnDataChange}
      />
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("Continue"));
      expect(mockOnDataChange).not.toHaveBeenCalled();

      expect(
        screen.getByText("Enter the first line of your address")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Enter the town of your address")
      ).toBeInTheDocument();
    });
  });
});

describe("Accessibility test", () => {
  it("should not fail any accessibility tests", async () => {
    const mockOnDataChange = jest.fn();
    const { container } = render(
      <ManualEntry
        initialStateData={testData}
        onDataChange={mockOnDataChange}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("Manual Entry must display error summary header on invalid submission", () => {
  it("renders correctly", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <ManualEntry
        initialStateData={emptyData}
        onDataChange={mockOnDataChange}
      />
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("Continue"));
      expect(mockOnDataChange).not.toHaveBeenCalled();
    });

    const errors = await screen.findAllByRole("alert");
    const summary = errors[0];
    expect(summary).toHaveAttribute("id", "error-message");
  });
});
