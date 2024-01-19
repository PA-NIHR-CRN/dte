import { axe, toHaveNoViolations } from "jest-axe";
import { render, screen, fireEvent, waitFor } from "../../../../../../Helper/test-utils";
import "@testing-library/jest-dom";
import ConsentForm from "./ConsentForm";

expect.extend(toHaveNoViolations);

describe("ConsentForm", () => {
  it("loads and displays consent page", async () => {
    const mockOnSubmit = jest.fn();
    const mockHandleNoConsent = jest.fn();
    render(
      <ConsentForm
        onDataChange={mockOnSubmit}
        initialStateData={{ consent: false, consentContact: false }}
        handleNoConsent={mockHandleNoConsent}
      />
    );

    expect(screen.getByText("Yes, I consent and wish to register now")).toBeInTheDocument();
    expect(screen.getByText("No, I do not consent and wish to cancel this registration")).toBeInTheDocument();
  });

  it("continues when the user clicks I consent", async () => {
    const mockOnSubmit = jest.fn();
    const mockHandleNoConsent = jest.fn();
    render(
      <ConsentForm
        onDataChange={mockOnSubmit}
        initialStateData={{ consent: false, consentContact: false }}
        handleNoConsent={mockHandleNoConsent}
      />
    );

    fireEvent.click(screen.getByDisplayValue("consentContact"));
    fireEvent.click(screen.getByText("Yes, I consent and wish to register now"));
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it("prevents the user continuing without consenting", async () => {
    const mockOnSubmit = jest.fn();
    const mockHandleNoConsent = jest.fn();
    render(
      <ConsentForm
        onDataChange={mockOnSubmit}
        initialStateData={{ consent: false, consentContact: false }}
        handleNoConsent={mockHandleNoConsent}
      />
    );

    fireEvent.click(screen.getByText("Yes, I consent and wish to register now"));
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(0);
    });
    expect(
      await screen.findByText(
        "Confirm that the Privacy and Data Sharing Policy has been read and understood before giving consent"
      )
    ).toBeInTheDocument();
  });

  it("shows the user a different page when they decline", async () => {
    const mockOnSubmit = jest.fn();
    const mockHandleNoConsent = jest.fn();
    render(
      <ConsentForm
        onDataChange={mockOnSubmit}
        initialStateData={{ consent: false, consentContact: false }}
        handleNoConsent={mockHandleNoConsent}
      />
    );

    fireEvent.click(screen.getByText("No, I do not consent and wish to cancel this registration"));
    await waitFor(() => {
      expect(mockHandleNoConsent).toHaveBeenCalledTimes(1);
    });
  });
});

describe("Accessibility test", () => {
  it("should not fail any accessibility tests", async () => {
    const mockOnSubmit = jest.fn();
    const mockHandleNoConsent = jest.fn();
    const { container } = render(
      <ConsentForm
        onDataChange={mockOnSubmit}
        initialStateData={{ consent: false, consentContact: false }}
        handleNoConsent={mockHandleNoConsent}
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
