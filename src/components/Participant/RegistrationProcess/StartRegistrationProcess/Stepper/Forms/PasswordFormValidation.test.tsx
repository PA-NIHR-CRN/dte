import { axe, toHaveNoViolations } from "jest-axe";
import { createServer, Server } from "miragejs";
import { render, screen, fireEvent, userEvent } from "../../../../../../Helper/test-utils";
import "@testing-library/jest-dom";
import PasswordForm from "./PasswordForm";
import weakPasswords from "../../../../../../data/weakPassword";

expect.extend(toHaveNoViolations);

let server: Server;
beforeAll(() => {
  server = createServer({
    routes() {
      this.get(`${process.env.REACT_APP_BASE_API}/users/passwordpolicy`, () => {
        return {
          minimumLength: 12,
          requireLowercase: true,
          requireNumbers: true,
          requireSymbols: true,
          requireUppercase: true,
          allowedPasswordSymbols: "^ $ * . , [ ] { } ( ) ? \" ! @ # % & / \\ , > < ' : ; | _ ~ `",
          weakPasswords,
        };
      });
    },
  });
});

afterAll(() => {
  server.shutdown();
});

const data = {
  password: "",
  password2: "",
};

const mockSetLoading = jest.fn();
const mockSetLoadingText = jest.fn();

describe("Password Form", () => {
  it("must render the form", () => {
    const mockOnDataChange = jest.fn();
    render(
      <PasswordForm
        onDataChange={mockOnDataChange}
        initialStateData={data}
        setLoading={mockSetLoading}
        setLoadingText={mockSetLoadingText}
      />
    );
  });
});

describe("Accessibility test", () => {
  it("must not fail any accessibility tests", async () => {
    const mockOnDataChange = jest.fn();
    const { container } = render(
      <PasswordForm
        initialStateData={data}
        onDataChange={mockOnDataChange}
        setLoading={mockSetLoading}
        setLoadingText={mockSetLoadingText}
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("Password must have correct attributes", () => {
  it("must have a required attribute", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <PasswordForm
        initialStateData={data}
        onDataChange={mockOnDataChange}
        setLoading={mockSetLoading}
        setLoadingText={mockSetLoadingText}
      />
    );

    const passwordInput = await screen.findByLabelText("Create your password");
    expect(passwordInput).toHaveAttribute("required");
  });

  it("must have a aria-required attribute of true", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <PasswordForm
        initialStateData={data}
        onDataChange={mockOnDataChange}
        setLoading={mockSetLoading}
        setLoadingText={mockSetLoadingText}
      />
    );

    const passwordInput = await screen.findByLabelText("Create your password");
    const ariaRequiredValue = passwordInput.getAttribute("aria-required");
    expect(passwordInput).toHaveAttribute("aria-required");
    expect(ariaRequiredValue).toBe("true");
  });

  it("must have a type attribute of password", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <PasswordForm
        initialStateData={data}
        onDataChange={mockOnDataChange}
        setLoading={mockSetLoading}
        setLoadingText={mockSetLoadingText}
      />
    );

    const passwordInput = await screen.findByLabelText("Create your password");
    const typeValue = passwordInput.getAttribute("type");
    expect(passwordInput).toHaveAttribute("type");
    expect(typeValue).toBe("password");
  });

  it("must have an autocomplete attribute of given-name", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <PasswordForm
        initialStateData={data}
        onDataChange={mockOnDataChange}
        setLoading={mockSetLoading}
        setLoadingText={mockSetLoadingText}
      />
    );

    const passwordInput = await screen.findByLabelText("Create your password");
    const autoCompleteValue = passwordInput.getAttribute("autocomplete");
    expect(passwordInput).toHaveAttribute("autocomplete");
    expect(autoCompleteValue).toBe("new-password");
  });

  it("must have a spellcheck attribute set to false", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <PasswordForm
        initialStateData={data}
        onDataChange={mockOnDataChange}
        setLoading={mockSetLoading}
        setLoadingText={mockSetLoadingText}
      />
    );

    const passwordInput = await screen.findByLabelText("Create your password");
    const spellCheckValue = passwordInput.getAttribute("spellcheck");
    expect(passwordInput).toHaveAttribute("spellcheck");
    expect(spellCheckValue).toBe("false");
  });
});

describe("Confirm Password must have correct attributes", () => {
  it("must have a required attribute", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <PasswordForm
        initialStateData={data}
        onDataChange={mockOnDataChange}
        setLoading={mockSetLoading}
        setLoadingText={mockSetLoadingText}
      />
    );

    const passwordConfInput = await screen.findByLabelText("Confirm your password");
    expect(passwordConfInput).toHaveAttribute("required");
  });

  it("must have a aria-required attribute of true", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <PasswordForm
        initialStateData={data}
        onDataChange={mockOnDataChange}
        setLoading={mockSetLoading}
        setLoadingText={mockSetLoadingText}
      />
    );

    const passwordConfInput = await screen.findByLabelText("Confirm your password");
    const ariaRequiredValue = passwordConfInput.getAttribute("aria-required");
    expect(passwordConfInput).toHaveAttribute("aria-required");
    expect(ariaRequiredValue).toBe("true");
  });

  it("must have a type attribute of password", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <PasswordForm
        initialStateData={data}
        onDataChange={mockOnDataChange}
        setLoading={mockSetLoading}
        setLoadingText={mockSetLoadingText}
      />
    );

    const passwordConfInput = await screen.findByLabelText("Confirm your password");
    const typeValue = passwordConfInput.getAttribute("type");
    expect(passwordConfInput).toHaveAttribute("type");
    expect(typeValue).toBe("password");
  });

  it("must have a spellcheck attribute set to false", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <PasswordForm
        initialStateData={data}
        onDataChange={mockOnDataChange}
        setLoading={mockSetLoading}
        setLoadingText={mockSetLoadingText}
      />
    );

    const passwordConfInput = await screen.findByLabelText("Confirm your password");
    const spellCheckValue = passwordConfInput.getAttribute("spellcheck");
    expect(passwordConfInput).toHaveAttribute("spellcheck");
    expect(spellCheckValue).toBe("false");
  });
});

describe("Validation must fail if both fields are empty", () => {
  it("Both require error messages must show when both fields are empty", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <PasswordForm
        initialStateData={data}
        onDataChange={mockOnDataChange}
        setLoading={mockSetLoading}
        setLoadingText={mockSetLoadingText}
      />
    );

    const buttons = await screen.findAllByRole("button");
    const continueButton = buttons[2];
    fireEvent.click(continueButton);
    const errors = await screen.findAllByRole("presentation");
    expect(errors).toHaveLength(2);
    expect(errors[0].textContent).toBe("Error: Enter a password");
    expect(errors[1].textContent).toBe("Error: Confirm the password");
  });
});

describe("Validation must fail for non matching entries", () => {
  it("Invalid Password and Invalid Match must show for invalid password and non match", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <PasswordForm
        initialStateData={data}
        onDataChange={mockOnDataChange}
        setLoading={mockSetLoading}
        setLoadingText={mockSetLoadingText}
      />
    );

    const buttons = await screen.findAllByRole("button");
    const continueButton = buttons[2];
    const passwordInputBox = await screen.findByLabelText("Create your password");
    const passwordConfInputBox = await screen.findByLabelText("Confirm your password");
    fireEvent.change(passwordInputBox, { target: { value: "1" } });
    fireEvent.change(passwordConfInputBox, { target: { value: "2" } });
    fireEvent.click(continueButton);
    const errors = await screen.findAllByRole("presentation");
    expect(errors).toHaveLength(2);
    expect(errors[0].textContent).toBe(
      "Error: Enter a password that:\n" +
        "• is at least 12 characters long\n" +
        "• includes 1 lowercase letter\n" +
        "• includes 1 capital letter\n" +
        "• includes 1 symbol"
    );
    expect(errors[1].textContent).toBe("Error: Enter the same password as above");
  });

  it("Invalid Match must show for valid password and non match", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <PasswordForm
        initialStateData={data}
        onDataChange={mockOnDataChange}
        setLoading={mockSetLoading}
        setLoadingText={mockSetLoadingText}
      />
    );

    const buttons = await screen.findAllByRole("button");
    const continueButton = buttons[2];
    const passwordInputBox = await screen.findByLabelText("Create your password");
    const passwordConfInputBox = await screen.findByLabelText("Confirm your password");
    fireEvent.change(passwordInputBox, {
      target: { value: "passwordElephant123!" },
    });
    fireEvent.change(passwordConfInputBox, { target: { value: "1" } });
    fireEvent.click(continueButton);
    const errors = await screen.findAllByRole("presentation");
    expect(errors).toHaveLength(1);
    expect(errors[0].textContent).toBe("Error: Enter the same password as above");
  });
});

describe("Validation must pass for matching valid entries", () => {
  it("Valid Password and Valid Match must pass", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <PasswordForm
        initialStateData={data}
        onDataChange={mockOnDataChange}
        setLoading={mockSetLoading}
        setLoadingText={mockSetLoadingText}
      />
    );

    const buttons = await screen.findAllByRole("button");
    const continueButton = buttons[2];
    const passwordInputBox = await screen.findByLabelText("Create your password");
    const passwordConfInputBox = await screen.findByLabelText("Confirm your password");
    fireEvent.change(passwordInputBox, {
      target: { value: "passwordElephant123!" },
    });
    fireEvent.change(passwordConfInputBox, {
      target: { value: "passwordElephant123!" },
    });
    fireEvent.click(continueButton);
    const errors = await screen.queryAllByRole("presentation");
    expect(errors).toHaveLength(0);
  });
});

describe("Password Form must display error summary header on invalid submission", () => {
  it("renders correctly", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <PasswordForm
        initialStateData={data}
        onDataChange={mockOnDataChange}
        setLoading={mockSetLoading}
        setLoadingText={mockSetLoadingText}
      />
    );

    const buttons = await screen.findAllByRole("button");
    const continueButton = buttons[2];
    userEvent.click(continueButton);

    const errors = await screen.findAllByRole("alert");
    const summary = errors[0];
    expect(summary).toHaveAttribute("id", "error-message");
  });
});
