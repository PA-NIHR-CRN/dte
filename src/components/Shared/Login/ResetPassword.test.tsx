import { axe, toHaveNoViolations } from "jest-axe";
import { createServer, Server } from "miragejs";
import ReactGA from "react-ga";
import {
  render,
  screen,
  fireEvent,
  userEvent,
  waitFor,
} from "../../../Helper/test-utils";
import "@testing-library/jest-dom";
import ResetPassword from "./ResetPassword";

expect.extend(toHaveNoViolations);

let server: Server;
beforeAll(() => {
  ReactGA.initialize("UA-XXXXX-Y", { testMode: true });
  expect(ReactGA.testModeAPI.calls).toEqual([["create", "UA-XXXXX-Y", "auto"]]);
  server = createServer({
    routes() {
      this.get(`${process.env.REACT_APP_BASE_API}/users/passwordpolicy`, () => {
        return {
          minimumLength: 12,
          requireLowercase: true,
          requireNumbers: true,
          requireSymbols: true,
          requireUppercase: true,
          allowedPasswordSymbols:
            "^ $ * . , [ ] { } ( ) ? \" ! @ # % & / \\ , > < ' : ; | _ ~ `",
        };
      });
    },
  });
});

beforeEach(() => {
  ReactGA.testModeAPI.resetCalls();
});

afterAll(() => {
  server.shutdown();
});

describe("Accessibility test", () => {
  it("should not fail any accessibility tests", async () => {
    const { container } = render(<ResetPassword />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("Reset Password Form", () => {
  it("must render the form", () => {
    render(<ResetPassword />);
  });
});

describe("Password must have correct attributes", () => {
  it("must have a required attribute", async () => {
    render(<ResetPassword />);
    const passwordInput = await screen.findByLabelText("Create your password");
    expect(passwordInput).toHaveAttribute("required");
  });

  it("must have a aria-required attribute of true", async () => {
    render(<ResetPassword />);
    const passwordInput = await screen.findByLabelText("Create your password");
    const ariaRequiredValue = passwordInput.getAttribute("aria-required");
    expect(passwordInput).toHaveAttribute("aria-required");
    expect(ariaRequiredValue).toBe("true");
  });

  it("must have a type attribute of password", async () => {
    render(<ResetPassword />);
    const passwordInput = await screen.findByLabelText("Create your password");
    const typeValue = passwordInput.getAttribute("type");
    expect(passwordInput).toHaveAttribute("type");
    expect(typeValue).toBe("password");
  });

  it("must have an autocomplete attribute of given-name", async () => {
    render(<ResetPassword />);
    const passwordInput = await screen.findByLabelText("Create your password");
    const autoCompleteValue = passwordInput.getAttribute("autocomplete");
    expect(passwordInput).toHaveAttribute("autocomplete");
    expect(autoCompleteValue).toBe("new-password");
  });

  it("must have a spellcheck attribute set to false", async () => {
    render(<ResetPassword />);
    const passwordInput = await screen.findByLabelText("Create your password");
    const spellCheckValue = passwordInput.getAttribute("spellcheck");
    expect(passwordInput).toHaveAttribute("spellcheck");
    expect(spellCheckValue).toBe("false");
  });
});

describe("Confirm Password must have correct attributes", () => {
  it("must have a required attribute", async () => {
    render(<ResetPassword />);
    const passwordConfInput = await screen.findByLabelText(
      "Confirm your password",
    );
    expect(passwordConfInput).toHaveAttribute("required");
  });

  it("must have a aria-required attribute of true", async () => {
    render(<ResetPassword />);
    const passwordConfInput = await screen.findByLabelText(
      "Confirm your password",
    );
    const ariaRequiredValue = passwordConfInput.getAttribute("aria-required");
    expect(passwordConfInput).toHaveAttribute("aria-required");
    expect(ariaRequiredValue).toBe("true");
  });

  it("must have a type attribute of password", async () => {
    render(<ResetPassword />);
    const passwordConfInput = await screen.findByLabelText(
      "Confirm your password",
    );
    const typeValue = passwordConfInput.getAttribute("type");
    expect(passwordConfInput).toHaveAttribute("type");
    expect(typeValue).toBe("password");
  });

  it("must have a spellcheck attribute set to false", async () => {
    render(<ResetPassword />);
    const passwordConfInput = await screen.findByLabelText(
      "Confirm your password",
    );
    const spellCheckValue = passwordConfInput.getAttribute("spellcheck");
    expect(passwordConfInput).toHaveAttribute("spellcheck");
    expect(spellCheckValue).toBe("false");
  });
});

describe("Validation must fail if both fields are empty", () => {
  it("Both require error messages must show when both fields are empty", async () => {
    render(<ResetPassword />);
    const continueButton = await screen.findByText("Save");
    fireEvent.click(continueButton);
    const errors = await screen.findAllByRole("presentation");
    expect(errors).toHaveLength(2);
    expect(errors[0].textContent).toBe("Error: Enter a password");
    expect(errors[1].textContent).toBe("Error: Confirm the password");
  });
});

describe.each([
  [
    "1",
    "Enter a password that is at least 12 characters long and includes at least 1 capital letter, 1 lowercase letter and 1 symbol",
  ],
  [
    "a",
    "Enter a password that is at least 12 characters long and includes at least 1 capital letter, 1 number and 1 symbol",
  ],
  [
    "A",
    "Enter a password that is at least 12 characters long and includes at least 1 lowercase letter, 1 number and 1 symbol",
  ],
  [
    "!",
    "Enter a password that is at least 12 characters long and includes at least 1 capital letter, 1 lowercase letter and 1 number",
  ],
  [
    " ",
    "Enter a password that is at least 12 characters long and includes at least 1 capital letter, 1 lowercase letter, 1 number, 1 symbol and does not include spaces",
  ],
  [
    "1a",
    "Enter a password that is at least 12 characters long and includes at least 1 capital letter and 1 symbol",
  ],
  [
    "1A",
    "Enter a password that is at least 12 characters long and includes at least 1 lowercase letter and 1 symbol",
  ],
  [
    "1!",
    "Enter a password that is at least 12 characters long and includes at least 1 capital letter and 1 lowercase letter",
  ],
  [
    "1 ",
    "Enter a password that is at least 12 characters long and includes at least 1 capital letter, 1 lowercase letter, 1 symbol and does not include spaces",
  ],
  [
    "aA",
    "Enter a password that is at least 12 characters long and includes at least 1 number and 1 symbol",
  ],
  [
    "a!",
    "Enter a password that is at least 12 characters long and includes at least 1 capital letter and 1 number",
  ],
  [
    "l ",
    "Enter a password that is at least 12 characters long and includes at least 1 capital letter, 1 number, 1 symbol and does not include spaces",
  ],
  [
    "A!",
    "Enter a password that is at least 12 characters long and includes at least 1 lowercase letter and 1 number",
  ],
  [
    "A ",
    "Enter a password that is at least 12 characters long and includes at least 1 lowercase letter, 1 number, 1 symbol and does not include spaces",
  ],
  [
    "! ",
    "Enter a password that is at least 12 characters long and includes at least 1 capital letter, 1 lowercase letter, 1 number and does not include spaces",
  ],
  [
    "1aB",
    "Enter a password that is at least 12 characters long and includes at least 1 symbol",
  ],
  [
    "1A!",
    "Enter a password that is at least 12 characters long and includes at least 1 lowercase letter",
  ],
  [
    "1! ",
    "Enter a password that is at least 12 characters long and includes at least 1 capital letter, 1 lowercase letter and does not include spaces",
  ],
  [
    "1a!",
    "Enter a password that is at least 12 characters long and includes at least 1 capital letter",
  ],
  [
    "1a ",
    "Enter a password that is at least 12 characters long and includes at least 1 capital letter, 1 symbol and does not include spaces",
  ],
  [
    "1A ",
    "Enter a password that is at least 12 characters long and includes at least 1 lowercase letter, 1 symbol and does not include spaces",
  ],
  [
    "fG!",
    "Enter a password that is at least 12 characters long and includes at least 1 number",
  ],
  [
    "f! ",
    "Enter a password that is at least 12 characters long and includes at least 1 capital letter, 1 number and does not include spaces",
  ],
  [
    "C! ",
    "Enter a password that is at least 12 characters long and includes at least 1 lowercase letter, 1 number and does not include spaces",
  ],
  ["1aB!", "Enter a password that is at least 12 characters long"],
  [
    "1A! ",
    "Enter a password that is at least 12 characters long and includes at least 1 lowercase letter and does not include spaces",
  ],
  [
    "1a! ",
    "Enter a password that is at least 12 characters long and includes at least 1 capital letter and does not include spaces",
  ],
  [
    "1aG ",
    "Enter a password that is at least 12 characters long and includes at least 1 symbol and does not include spaces",
  ],
  [
    "aV! ",
    "Enter a password that is at least 12 characters long and includes at least 1 number and does not include spaces",
  ],
  [
    "1aS! ",
    "Enter a password that is at least 12 characters long and does not include spaces",
  ],
  ["passwordElephant!", "Enter a password that includes at least 1 number"],
  [
    "password Elephant!",
    "Enter a password that includes at least 1 number and does not include spaces",
  ],
  [
    "PASSWORDELEPHANT1!",
    "Enter a password that includes at least 1 lowercase letter",
  ],
  [
    "PASSWORD ELEPHANT1!",
    "Enter a password that includes at least 1 lowercase letter and does not include spaces",
  ],
  [
    "passwordelephant1!",
    "Enter a password that includes at least 1 capital letter",
  ],
  [
    "password elephant1!",
    "Enter a password that includes at least 1 capital letter and does not include spaces",
  ],
  ["passwordElephant1", "Enter a password that includes at least 1 symbol"],
  [
    "password Elephant1",
    "Enter a password that includes at least 1 symbol and does not include spaces",
  ],
  [
    "PASSWORDELEPHANT!",
    "Enter a password that includes at least 1 lowercase letter and 1 number",
  ],
  [
    "PASSWORD ELEPHANT!",
    "Enter a password that includes at least 1 lowercase letter, 1 number and does not include spaces",
  ],
  [
    "1234567890!!",
    "Enter a password that includes at least 1 capital letter and 1 lowercase letter",
  ],
  [
    "12345 67890!!",
    "Enter a password that includes at least 1 capital letter, 1 lowercase letter and does not include spaces",
  ],
  [
    "ELEPHANTPASSWORD1",
    "Enter a password that includes at least 1 lowercase letter and 1 symbol",
  ],
  [
    "ELEPHANT PASSWORD1",
    "Enter a password that includes at least 1 lowercase letter, 1 symbol and does not include spaces",
  ],
  [
    "elephantpassword!",
    "Enter a password that includes at least 1 capital letter and 1 number",
  ],
  [
    "elephant password!",
    "Enter a password that includes at least 1 capital letter, 1 number and does not include spaces",
  ],
  [
    "elephantpassword1",
    "Enter a password that includes at least 1 capital letter and 1 symbol",
  ],
  [
    "elephant password1",
    "Enter a password that includes at least 1 capital letter, 1 symbol and does not include spaces",
  ],
  ["elephantPassword!", "Enter a password that includes at least 1 number"],
  [
    "elephant Password!",
    "Enter a password that includes at least 1 number and does not include spaces",
  ],
  [
    "ELEPHANTPASSWORD1!",
    "Enter a password that includes at least 1 lowercase letter",
  ],
  [
    "ELEPHANT PASSWORD1!",
    "Enter a password that includes at least 1 lowercase letter and does not include spaces",
  ],
  [
    "elephantpassword1!",
    "Enter a password that includes at least 1 capital letter",
  ],
  [
    "elephant password1!",
    "Enter a password that includes at least 1 capital letter and does not include spaces",
  ],
  ["elephantPassword1", "Enter a password that includes at least 1 symbol"],
  [
    "elephant Password1",
    "Enter a password that includes at least 1 symbol and does not include spaces",
  ],
  ["elephantPassword1! ", "Enter a password that does not include spaces"],
  [
    "Pass1!£",
    "Enter a password that is at least 12 characters long and only includes symbols from this list ^$*.,[]{}()?\"!@#%&/\\,><':;|_~`",
  ],
  [
    "ElephantPassword!£",
    "Enter a password that includes at least 1 number and only includes symbols from this list ^$*.,[]{}()?\"!@#%&/\\,><':;|_~`",
  ],
  [
    "ELEPHANTPASSWORD1!£",
    "Enter a password that includes at least 1 lowercase letter and only includes symbols from this list ^$*.,[]{}()?\"!@#%&/\\,><':;|_~`",
  ],
  [
    "elephantpassword1!£",
    "Enter a password that includes at least 1 capital letter and only includes symbols from this list ^$*.,[]{}()?\"!@#%&/\\,><':;|_~`",
  ],
  [
    "ElephantPassword1£",
    "Enter a password that includes at least 1 symbol and only includes symbols from this list ^$*.,[]{}()?\"!@#%&/\\,><':;|_~`",
  ],
  [
    "elephantPassword1!£",
    "Enter a password that only includes symbols from this list ^$*.,[]{}()?\"!@#%&/\\,><':;|_~`",
  ],
  [
    "elephantPassword1!£ ",
    "Enter a password that does not include spaces and only includes symbols from this list ^$*.,[]{}()?\"!@#%&/\\,><':;|_~`",
  ],
])("Validation must show correct error message", (password, expectedError) => {
  test(`for ${password}, returns ${expectedError}`, async () => {
    render(<ResetPassword />);
    const continueButton = await screen.findByText("Save");
    const passwordInputBox = await screen.findByLabelText(
      "Create your password",
    );
    const passwordConfInputBox = await screen.findByLabelText(
      "Confirm your password",
    );
    fireEvent.change(passwordInputBox, { target: { value: password } });
    fireEvent.change(passwordConfInputBox, { target: { value: password } });
    fireEvent.click(continueButton);
    const errors = await screen.findAllByRole("presentation");
    expect(errors).toHaveLength(1);
    expect(errors[0].textContent).toBe(`Error: ${expectedError}`);
  });
});

describe("Validation must fail for non matching entries", () => {
  it("Invalid Password and Invalid Match must show for invalid password and non match", async () => {
    render(<ResetPassword />);
    const continueButton = await screen.findByText("Save");
    const passwordInputBox = await screen.findByLabelText(
      "Create your password",
    );
    const passwordConfInputBox = await screen.findByLabelText(
      "Confirm your password",
    );
    fireEvent.change(passwordInputBox, { target: { value: "1" } });
    fireEvent.change(passwordConfInputBox, { target: { value: "2" } });
    fireEvent.click(continueButton);
    const errors = await screen.findAllByRole("presentation");
    expect(errors).toHaveLength(2);
    expect(errors[0].textContent).toBe(
      "Error: Enter a password that is at least 12 characters long and includes at least 1 capital letter, 1 lowercase letter and 1 symbol",
    );
    expect(errors[1].textContent).toBe(
      "Error: Enter the same password as above",
    );
  });

  it("Invalid Match must show for valid password and non match", async () => {
    render(<ResetPassword />);
    const continueButton = await screen.findByText("Save");
    const passwordInputBox = await screen.findByLabelText(
      "Create your password",
    );
    const passwordConfInputBox = await screen.findByLabelText(
      "Confirm your password",
    );
    fireEvent.change(passwordInputBox, {
      target: { value: "passwordElephant123!" },
    });
    fireEvent.change(passwordConfInputBox, { target: { value: "1" } });
    fireEvent.click(continueButton);
    const errors = await screen.findAllByRole("presentation");
    expect(errors).toHaveLength(1);
    expect(errors[0].textContent).toBe(
      "Error: Enter the same password as above",
    );
  });
});

describe("Validation must pass for matching valid entries", () => {
  it("Valid Password and Valid Match must pass", async () => {
    render(<ResetPassword />);
    const continueButton = await screen.findByText("Save");
    const passwordInputBox = await screen.findByLabelText(
      "Create your password",
    );
    const passwordConfInputBox = await screen.findByLabelText(
      "Confirm your password",
    );
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

describe("Reset Password must display error summary header on invalid submission", () => {
  it("renders correctly", async () => {
    render(<ResetPassword />);
    const continueButton = await screen.findByText("Save");
    userEvent.click(continueButton);

    const errors = await screen.findAllByRole("alert");
    const summary = errors[0];
    expect(summary).toHaveAttribute("id", "error-message");
  });
});

describe("Password reset analytics", () => {
  it("must send the correct data", async () => {
    render(<ResetPassword />);

    await waitFor(
      () => {
        expect(ReactGA.testModeAPI.calls).toEqual([
          ["send", { hitType: "pageview", page: "/ResetPassword/choose" }],
        ]);
      },
      { timeout: 1000 },
    );
  });
});
