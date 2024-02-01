import { axe, toHaveNoViolations } from "jest-axe";
import { render, fireEvent, screen, waitFor } from "../../../../Helper/test-utils";
import "@testing-library/jest-dom";
import SelectAddress from "./SelectAddress";

expect.extend(toHaveNoViolations);

const testData = {
  addresses: [
    {
      addressLine1: "9,",
      addressLine2: "TRAPS LANE",
      addressLine3: "NEW MALDEN",
      addressLine4: "",
      town: "KINGSTON UPON THAMES",
      postcode: "KT3 4RS",
      fullAddress: "9, TRAPS LANE, NEW MALDEN, KT3 4RS",
    },
    {
      addressLine1: "FIVE STONES",
      addressLine2: "TRAPS LANE",
      addressLine3: "",
      addressLine4: "NEW MALDEN",
      town: "KINGSTON UPON THAMES",
      postcode: "KT3 4RS",
      fullAddress: "FIVE STONES, TRAPS LANE, NEW MALDEN, KT3 4RS",
    },
    {
      addressLine1: "MALDEN GOLF CLUB",
      addressLine2: "",
      addressLine3: "TRAPS LANE",
      addressLine4: "NEW MALDEN",
      town: "KINGSTON UPON THAMES",
      postcode: "KT3 4RS",
      fullAddress: "MALDEN GOLF CLUB, TRAPS LANE, NEW MALDEN, KT3 4RS",
    },
  ],
  postcode: "KT34RS",
};

describe("SelectAddress", () => {
  it("renders", () => {
    const mockOnDataChange = jest.fn();
    render(
      <SelectAddress addresses={testData.addresses} postcode={testData.postcode} onDataChange={mockOnDataChange} />
    );
  });

  it("renders a dropdown containing addresses", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <SelectAddress addresses={testData.addresses} postcode={testData.postcode} onDataChange={mockOnDataChange} />
    );

    await waitFor(() => {
      const addressSelect = screen.getByLabelText("Select your address");
      expect(addressSelect).toBeInTheDocument();
      fireEvent.click(addressSelect);
      expect(screen.getByText("9, Traps Lane, New Malden, KT3 4RS")).toBeInTheDocument();
      expect(screen.getByText("Five Stones, Traps Lane, New Malden, KT3 4RS")).toBeInTheDocument();
      expect(screen.getByText("Malden Golf Club, Traps Lane, New Malden, KT3 4RS")).toBeInTheDocument();
    });
  });

  it("allows a user to select an address and submit", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <SelectAddress addresses={testData.addresses} postcode={testData.postcode} onDataChange={mockOnDataChange} />
    );

    await waitFor(() => {
      const addressSelect = screen.getByLabelText("Select your address");
      expect(addressSelect).toBeInTheDocument();
      fireEvent.change(addressSelect, {
        target: { value: 1 },
      });
      fireEvent.click(screen.getByText("Continue"));
      expect(mockOnDataChange).toHaveBeenCalled();
    });
  });

  it("prevents user from proceeding without selecting an address", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <SelectAddress addresses={testData.addresses} postcode={testData.postcode} onDataChange={mockOnDataChange} />
    );

    await waitFor(() => {
      const addressSelect = screen.getByLabelText("Select your address");
      expect(addressSelect).toBeInTheDocument();
      fireEvent.click(screen.getByText("Continue"));
      expect(mockOnDataChange).not.toHaveBeenCalled();
    });
  });
});

describe("Accessibility test", () => {
  it("should not fail any accessibility tests", async () => {
    const mockOnDataChange = jest.fn();
    const { container } = render(
      <SelectAddress addresses={testData.addresses} postcode={testData.postcode} onDataChange={mockOnDataChange} />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
