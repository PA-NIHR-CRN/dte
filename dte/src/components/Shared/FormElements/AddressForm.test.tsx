import { axe, toHaveNoViolations } from "jest-axe";
import { render, fireEvent, screen, waitFor } from "../../../Helper/test-utils";
import "@testing-library/jest-dom";
import AddressForm from "./AddressForm";

expect.extend(toHaveNoViolations);

const testData = {
  address: {
    addressLine1: "ROYAL MAIL SWANSEA MAIL CENTRE",
    addressLine2: "SIEMENS WAY",
    addressLine3: "ABERTAWE",
    addressLine4: "",
    town: "SWANSEA",
    postcode: "SA1 1AA",
  },
  postcode: "NW1 6XE",
};

describe("AddressForm", () => {
  it("renders", () => {
    const mockOnDataChange = jest.fn();
    render(
      <AddressForm
        initialStateData={testData}
        onDataChange={mockOnDataChange}
      />
    );
  });

  test("that the user has to enter a valid postcode", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <AddressForm
        initialStateData={testData}
        onDataChange={mockOnDataChange}
      />
    );
    fireEvent.change(screen.getByLabelText("Postcode"), {
      target: { value: "Not a valid postcode" },
    });

    fireEvent.click(screen.getByText(/Find address/i));

    await waitFor(() => {
      expect(screen.getByText("Enter a real postcode")).toBeInTheDocument();
    });
  });

  // TODO - Add tests that require a valid postcode
});

describe("Accessibility test", () => {
  it("should not fail any accessibility tests", async () => {
    const mockOnDataChange = jest.fn();
    const { container } = render(
      <AddressForm
        initialStateData={testData}
        onDataChange={mockOnDataChange}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
