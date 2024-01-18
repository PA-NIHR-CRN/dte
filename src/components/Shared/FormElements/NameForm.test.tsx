import { axe, toHaveNoViolations } from "jest-axe";
import { render, screen, fireEvent, userEvent } from "../../../Helper/test-utils";
import "@testing-library/jest-dom";
import NameForm from "./NameForm";

expect.extend(toHaveNoViolations);

const data = {
  firstName: "",
  lastName: "",
};

describe("NameForm", () => {
  it("should render the form", () => {
    const mockOnDataChange = jest.fn();
    render(<NameForm onDataChange={mockOnDataChange} initialStateData={data} />);
  });
});

describe("Accessibility test", () => {
  it("should not fail any accessibility tests", async () => {
    const mockOnDataChange = jest.fn();
    const { container } = render(<NameForm initialStateData={data} onDataChange={mockOnDataChange} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("First name must have correct attributes", () => {
  it("First name have a required attribute", async () => {
    render(<NameForm onDataChange={jest.fn()} initialStateData={data} />);
    const firstName = await screen.findByLabelText("First name");
    expect(firstName).toHaveAttribute("required");
  });

  it("First name have a aria-required attribute of true", async () => {
    render(<NameForm onDataChange={jest.fn()} initialStateData={data} />);
    const firstName = await screen.findByLabelText("First name");
    const ariaRequiredValue = firstName.getAttribute("aria-required");
    expect(firstName).toHaveAttribute("aria-required");
    expect(ariaRequiredValue).toBe("true");
  });

  it("First name have a type attribute of text", async () => {
    render(<NameForm onDataChange={jest.fn()} initialStateData={data} />);
    const firstName = await screen.findByLabelText("First name");
    const typeValue = firstName.getAttribute("type");
    expect(firstName).toHaveAttribute("type");
    expect(typeValue).toBe("text");
  });

  it("First name have an autocomplete attribute of given-name", async () => {
    render(<NameForm onDataChange={jest.fn()} initialStateData={data} />);
    const firstName = await screen.findByLabelText("First name");
    const autoCompleteValue = firstName.getAttribute("autocomplete");
    expect(firstName).toHaveAttribute("autocomplete");
    expect(autoCompleteValue).toBe("given-name");
  });

  it("First name have a spellcheck attribute set to false", async () => {
    render(<NameForm onDataChange={jest.fn()} initialStateData={data} />);
    const firstName = await screen.findByLabelText("First name");
    const spellCheckValue = firstName.getAttribute("spellcheck");
    expect(firstName).toHaveAttribute("spellcheck");
    expect(spellCheckValue).toBe("false");
  });
});

describe("Last name must have correct attributes", () => {
  it("Last name have a required attribute", async () => {
    render(<NameForm onDataChange={jest.fn()} initialStateData={data} />);
    const firstName = await screen.findByLabelText("Last name");
    expect(firstName).toHaveAttribute("required");
  });

  it("Last name have a aria-required attribute of true", async () => {
    render(<NameForm onDataChange={jest.fn()} initialStateData={data} />);
    const firstName = await screen.findByLabelText("Last name");
    const ariaRequiredValue = firstName.getAttribute("aria-required");
    expect(firstName).toHaveAttribute("aria-required");
    expect(ariaRequiredValue).toBe("true");
  });

  it("Last name have a type attribute of text", async () => {
    render(<NameForm onDataChange={jest.fn()} initialStateData={data} />);
    const firstName = await screen.findByLabelText("Last name");
    const typeValue = firstName.getAttribute("type");
    expect(firstName).toHaveAttribute("type");
    expect(typeValue).toBe("text");
  });

  it("Last name have an autocomplete attribute of given-name", async () => {
    render(<NameForm onDataChange={jest.fn()} initialStateData={data} />);
    const firstName = await screen.findByLabelText("Last name");
    const autoCompleteValue = firstName.getAttribute("autocomplete");
    expect(firstName).toHaveAttribute("autocomplete");
    expect(autoCompleteValue).toBe("family-name");
  });

  it("Last name have a spellcheck attribute set to false", async () => {
    render(<NameForm onDataChange={jest.fn()} initialStateData={data} />);
    const firstName = await screen.findByLabelText("Last name");
    const spellCheckValue = firstName.getAttribute("spellcheck");
    expect(firstName).toHaveAttribute("spellcheck");
    expect(spellCheckValue).toBe("false");
  });
});

describe("Validation must be correct on button click", () => {
  it("Validation must show both error messages when both fields are empty", async () => {
    render(<NameForm onDataChange={jest.fn()} initialStateData={data} />);
    const continueButton = await screen.findByRole("button");
    fireEvent.click(continueButton);
    const errors = await screen.findAllByRole("presentation");
    expect(errors).toHaveLength(2);
    expect(errors[0].textContent).toBe("Error: Enter your first name");
    expect(errors[1].textContent).toBe("Error: Enter your last name");
  });

  it("Validation must show both error messages when both fields contain whitespace", async () => {
    render(<NameForm onDataChange={jest.fn()} initialStateData={data} />);
    const firstNameInputBox = await screen.findByLabelText("First name");
    fireEvent.change(firstNameInputBox, { target: { value: "   " } });
    const lastNameInputBox = await screen.findByLabelText("Last name");
    fireEvent.change(lastNameInputBox, { target: { value: "   " } });
    const continueButton = await screen.findByRole("button");
    fireEvent.click(continueButton);
    const errors = await screen.findAllByRole("presentation");
    expect(errors).toHaveLength(2);
    expect(errors[0].textContent).toBe("Error: Enter your first name");
    expect(errors[1].textContent).toBe("Error: Enter your last name");
  });

  it("Validation must show last name error messages when only last name is empty", async () => {
    render(<NameForm onDataChange={jest.fn()} initialStateData={data} />);
    const continueButton = await screen.findByRole("button");
    const firstNameInputBox = await screen.findByLabelText("First name");
    fireEvent.change(firstNameInputBox, { target: { value: "first" } });
    fireEvent.click(continueButton);
    const errors = await screen.findAllByRole("presentation");
    expect(errors).toHaveLength(1);
    expect(errors[0].textContent).toBe("Error: Enter your last name");
  });

  it("Validation must show first name error messages when only first name is empty", async () => {
    render(<NameForm onDataChange={jest.fn()} initialStateData={data} />);
    const continueButton = await screen.findByRole("button");
    const lastNameInputBox = await screen.findByLabelText("Last name");
    fireEvent.change(lastNameInputBox, { target: { value: "last" } });
    fireEvent.click(continueButton);
    const errors = await screen.findAllByRole("presentation");
    expect(errors).toHaveLength(1);
    expect(errors[0].textContent).toBe("Error: Enter your first name");
  });

  it("Validation must pass when neither fields are empty", async () => {
    render(<NameForm onDataChange={jest.fn()} initialStateData={data} />);
    const continueButton = await screen.findByRole("button");
    const firstNameInputBox = await screen.findByLabelText("First name");
    const lastNameInputBox = await screen.findByLabelText("Last name");
    fireEvent.change(firstNameInputBox, { target: { value: "first" } });
    fireEvent.change(lastNameInputBox, { target: { value: "last" } });
    fireEvent.click(continueButton);
    const errors = screen.queryAllByRole("alert");
    expect(errors).toHaveLength(0);
  });
});

describe("Cancel button visibility must be correct", () => {
  it("when showCancelButton is not set", async () => {
    render(<NameForm onDataChange={jest.fn()} initialStateData={data} />);
    const buttons = await screen.findAllByRole("button");
    expect(buttons).toHaveLength(1);
    expect(buttons[0].textContent).toBe("Continue");
  });

  it("when showCancelButton is set but onCancel is not set", async () => {
    render(<NameForm onDataChange={jest.fn()} initialStateData={data} showCancelButton />);
    const buttons = await screen.findAllByRole("button");
    expect(buttons).toHaveLength(1);
    expect(buttons[0].textContent).toBe("Continue");
  });

  it("when showCancelButton and onCancel are set", async () => {
    render(<NameForm onDataChange={jest.fn()} onCancel={jest.fn()} initialStateData={data} showCancelButton />);
    const buttons = await screen.findAllByRole("button");
    expect(buttons).toHaveLength(2);
    expect(buttons[0].textContent).toBe("Continue");
    expect(buttons[1].textContent).toBe("Cancel");
  });
});

describe("Cancel button must fire correct event", () => {
  it("when visible and is clicked", async () => {
    const cancelEvent = jest.fn();
    render(<NameForm onDataChange={jest.fn()} onCancel={cancelEvent} initialStateData={data} showCancelButton />);
    const buttons = await screen.findAllByRole("button");
    const cancelButton = buttons[1];
    fireEvent.click(cancelButton);
    expect(cancelEvent).toHaveBeenCalled();
  });
});

describe("Name Form must display error summary header on invalid submission", () => {
  it("renders correctly", async () => {
    render(<NameForm onDataChange={jest.fn()} initialStateData={data} />);
    const continueButton = await screen.findByRole("button");
    userEvent.click(continueButton);

    const errors = await screen.findAllByRole("alert");
    const summary = errors[0];
    expect(summary).toHaveAttribute("id", "error-message");
  });
});
