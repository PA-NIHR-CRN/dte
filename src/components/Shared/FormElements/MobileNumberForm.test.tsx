import { axe, toHaveNoViolations } from "jest-axe";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  userEvent,
} from "../../../Helper/test-utils";
import "@testing-library/jest-dom";
import MobileNumberForm from "./MobileNumberForm";

expect.extend(toHaveNoViolations);

const data = {
  mobileNumber: "",
  landlineNumber: "",
};

describe("MobileNumberForm", () => {
  it("renders the form", () => {
    const mockOnDataChange = jest.fn();
    render(
      <MobileNumberForm
        initialStateData={data}
        onDataChange={mockOnDataChange}
      />
    );
  });

  it("displays an errror when an invalid number is entered in the mobile field", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <MobileNumberForm
        initialStateData={data}
        onDataChange={mockOnDataChange}
      />
    );
    fireEvent.change(screen.getByLabelText("Mobile number"), {
      target: { value: "123456789" },
    });
    fireEvent.click(screen.getByText("Continue"));
    expect(
      await screen.findByText(
        "Enter a valid mobile number, like 07700 900 982 or +44 7700 900 982"
      )
    ).toBeInTheDocument();
  });

  it("displays an errror when an invalid number is entered in the landline field", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <MobileNumberForm
        initialStateData={data}
        onDataChange={mockOnDataChange}
      />
    );
    fireEvent.change(screen.getByLabelText("Landline number"), {
      target: { value: "123456789" },
    });
    fireEvent.click(screen.getByText("Continue"));
    expect(
      await screen.findByText(
        "Enter a valid landline number, like 01632 960 001 or +44 1632 960 001"
      )
    ).toBeInTheDocument();
  });

  it("is able to submit with no values", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <MobileNumberForm
        initialStateData={data}
        onDataChange={mockOnDataChange}
      />
    );
    fireEvent.click(screen.getByText("Continue"));
    await waitFor(() => {
      expect(mockOnDataChange).toHaveBeenCalledWith({
        mobileNumber: "",
        landlineNumber: "",
      });
    });
  });

  it("is able to submit with just a landline number", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <MobileNumberForm
        initialStateData={data}
        onDataChange={mockOnDataChange}
      />
    );
    fireEvent.change(screen.getByLabelText("Landline number"), {
      target: { value: "01234567890" },
    });
    fireEvent.click(screen.getByText("Continue"));
    await waitFor(() => {
      expect(mockOnDataChange).toHaveBeenCalledWith({
        mobileNumber: "",
        landlineNumber: "01234567890",
      });
    });
  });

  it("is able to submit with just a mobile number", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <MobileNumberForm
        initialStateData={data}
        onDataChange={mockOnDataChange}
      />
    );
    fireEvent.change(screen.getByLabelText("Mobile number"), {
      target: { value: "+441111111111" },
    });
    fireEvent.click(screen.getByText("Continue"));
    await waitFor(() => {
      expect(mockOnDataChange).toHaveBeenCalledWith({
        mobileNumber: "+441111111111",
        landlineNumber: "",
      });
    });
  });

  it("is able to submit with both a mobile number and a landline number", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <MobileNumberForm
        initialStateData={data}
        onDataChange={mockOnDataChange}
      />
    );
    fireEvent.change(screen.getByLabelText("Mobile number"), {
      target: { value: "+441111111111" },
    });
    fireEvent.change(screen.getByLabelText("Landline number"), {
      target: { value: "+442111111111" },
    });
    fireEvent.click(screen.getByText("Continue"));
    await waitFor(() => {
      expect(mockOnDataChange).toHaveBeenCalledWith({
        mobileNumber: "+441111111111",
        landlineNumber: "+442111111111",
      });
    });
  });
});

describe("Accessibility test", () => {
  it("should not fail any accessibility tests", async () => {
    const mockOnDataChange = jest.fn();
    const { container } = render(
      <MobileNumberForm
        initialStateData={data}
        onDataChange={mockOnDataChange}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("Mobile Number Form must display error summary header on invalid submission", () => {
  it("renders correctly", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <MobileNumberForm
        initialStateData={data}
        onDataChange={mockOnDataChange}
      />
    );
    userEvent.type(screen.getByLabelText("Landline number"), "123456789");
    userEvent.click(screen.getByText("Continue"));

    const errors = await screen.findAllByRole("alert");
    const summary = errors[0];
    expect(summary).toHaveAttribute("id", "error-message");
  });
});
