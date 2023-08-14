import { axe, toHaveNoViolations } from "jest-axe";
import { createServer, Server } from "miragejs";
import { render, screen, userEvent, waitFor } from "../../../Helper/test-utils";
import "@testing-library/jest-dom";
import ForgottenPassword from "./ForgottenPassword";

expect.extend(toHaveNoViolations);

let server: Server;
beforeAll(() => {
  server = createServer({
    routes() {
      this.post(
        `${process.env.REACT_APP_BASE_API}/users/forgotpassword`,
        () => {
          return {
            content: null,
            isSuccess: true,
            errors: [],
            conversationId: null,
            version: 1,
          };
        },
      );
    },
  });
});

afterAll(() => {
  server.shutdown();
});

describe("Accessibility test", () => {
  it("should not fail any accessibility tests", async () => {
    const { container } = render(<ForgottenPassword />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("Render Forgotten Password Form", () => {
  it("must render the form", async () => {
    render(<ForgottenPassword />);
  });
});

describe("Email input must have correct attributes", () => {
  it("must have a required attribute", async () => {
    render(<ForgottenPassword />);

    const emailInput = await screen.findByLabelText("Email address");
    expect(emailInput).toHaveAttribute("required");
  });
  it("must have a aria-required attribute of true", async () => {
    render(<ForgottenPassword />);

    const emailInput = await screen.findByLabelText("Email address");
    const ariaRequiredValue = emailInput.getAttribute("aria-required");
    expect(emailInput).toHaveAttribute("aria-required");
    expect(ariaRequiredValue).toBe("true");
  });
  it("must have a type attribute of email", async () => {
    render(<ForgottenPassword />);

    const emailInput = await screen.findByLabelText("Email address");
    const typeValue = emailInput.getAttribute("type");
    expect(emailInput).toHaveAttribute("type");
    expect(typeValue).toBe("email");
  });
  it("must have a autocomplete attribute of email", async () => {
    render(<ForgottenPassword />);

    const emailInput = await screen.findByLabelText("Email address");
    const autocompleteValue = emailInput.getAttribute("autocomplete");
    expect(emailInput).toHaveAttribute("autocomplete");
    expect(autocompleteValue).toBe("email");
  });
  it("must have a spellcheck attribute set to false", async () => {
    render(<ForgottenPassword />);

    const emailInput = await screen.findByLabelText("Email address");
    const spellcheckValue = emailInput.getAttribute("spellcheck");
    expect(emailInput).toHaveAttribute("spellcheck");
    expect(spellcheckValue).toBe("false");
  });
});

describe.each([
  ["", "Enter an email address"],
  ["     ", "Enter an email address"],
  [
    "firstname.o\\'lastname@domain.com",
    "Enter an email address in the correct format, like name@example.com",
  ],
  [
    "info@german-financial-services.vermögensberatung",
    "Enter an email address in the correct format, like name@example.com",
  ],
  [
    "japanese-info@例え.テスト",
    "Enter an email address in the correct format, like name@example.com",
  ],
  [
    "technically..valid@domain.com",
    "Enter an email address in the correct format, like name@example.com",
  ],
  [
    "email@123.123.123.123",
    "Enter an email address in the correct format, like name@example.com",
  ],
  [
    "plainaddress",
    "Enter an email address in the correct format, like name@example.com",
  ],
  [
    "@no-local-part.com",
    "Enter an email address in the correct format, like name@example.com",
  ],
  [
    "Outlook Contact <outlook-contact@domain.com>",
    "Enter an email address in the correct format, like name@example.com",
  ],
  [
    "no-at.domain.com",
    "Enter an email address in the correct format, like name@example.com",
  ],
  [
    "no-tld@domain",
    "Enter an email address in the correct format, like name@example.com",
  ],
  [
    ";beginning-semicolon@domain.co.uk",
    "Enter an email address in the correct format, like name@example.com",
  ],
  [
    "middle-semicolon@domain.co;uk",
    "Enter an email address in the correct format, like name@example.com",
  ],
  [
    "trailing-semicolon@domain.com;",
    "Enter an email address in the correct format, like name@example.com",
  ],
  [
    '"email+leading-quotes@domain.com',
    "Enter an email address in the correct format, like name@example.com",
  ],
  [
    'email+middle"-quotes@domain.com',
    "Enter an email address in the correct format, like name@example.com",
  ],
  [
    '"quoted@domain.com"',
    "Enter an email address in the correct format, like name@example.com",
  ],
  [
    "lots-of-dots@domain..gov..uk",
    "Enter an email address in the correct format, like name@example.com",
  ],
  [
    "multiple@domains@domain.com",
    "Enter an email address in the correct format, like name@example.com",
  ],
  [
    "underscores-in-domain@dom_ain.com",
    "Enter an email address in the correct format, like name@example.com",
  ],
  [
    "pipe-in-domain@example.com|gov.uk",
    "Enter an email address in the correct format, like name@example.com",
  ],
  [
    "comma,in-local@gov.uk",
    "Enter an email address in the correct format, like name@example.com",
  ],
  [
    "comma-in-domain@domain,gov.uk",
    "Enter an email address in the correct format, like name@example.com",
  ],
  [
    "domain-starts-with-a-dot@.domain.com",
    "Enter an email address in the correct format, like name@example.com",
  ],
])(
  "Email validation must be correct for invalid email addresses",
  (emailAddress, validationError) => {
    test(`validates ${emailAddress} correctly`, async () => {
      render(<ForgottenPassword />);
      await waitFor(() => {
        expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
      });
      const emailInput = screen.getByLabelText("Email address");
      userEvent.type(emailInput, emailAddress);
      userEvent.click(screen.getByText("Reset your password"));
      await waitFor(async () => {
        expect(await screen.findByText(validationError)).toBeInTheDocument();
      });
    });
  },
);

describe.each([
  ["email@domain.com"],
  ["email@domain.COM"],
  ["firstname.lastname@domain.com"],
  ["firstname.o'lastname@domain.com"],
  ["email@subdomain.domain.com"],
  ["firstname+lastname@domain.com"],
  ["1234567890@domain.com"],
  ["email@domain-one.com"],
  ["_______@domain.com"],
  ["email@domain.name"],
  ["email@domain.superlongtld"],
  ["email@domain.co.jp"],
  ["firstname-lastname@domain.com"],
  [
    "info@german-financial-services.reallylongarbitrarytldthatiswaytoohugejustincase",
  ],
  ["email@[123.123.123.123]"],
  ['"quoted-local-part"@domain.com'],
  ["pound-sign-in-local£@domain.com"],
  ["local-with-'-apostrophe@domain.com"],
  ['local-with-"-quotes@domain.com'],
])(
  "Email validation must be correct for valid email addresses",
  (emailAddress) => {
    test(`validates ${emailAddress} correctly`, async () => {
      render(<ForgottenPassword />);
      await waitFor(() => {
        expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
      });
      const emailInput = screen.getByLabelText("Email address");
      userEvent.type(emailInput, emailAddress);
      userEvent.click(screen.getByText("Reset your password"));
      await waitFor(async () => {
        expect(
          screen.queryByText("Enter an email address"),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText(
            "Enter an email address in the correct format, like name@example.com",
          ),
        ).not.toBeInTheDocument();
      });
    });
  },
);

describe("Forgotten Password must display error summary header on invalid submission", () => {
  it("renders correctly", async () => {
    render(<ForgottenPassword />);

    const submitButton = await screen.findByText("Reset your password");
    userEvent.click(submitButton);

    const errors = await screen.findAllByRole("alert");
    const summary = errors[0];
    expect(summary).toHaveAttribute("id", "error-message");
  });
});

describe("Functional requirements must be met", () => {
  it("must send a post request when the validation rules are met", async () => {
    render(<ForgottenPassword />);

    const emailInput = await screen.findByLabelText("Email address");
    userEvent.type(emailInput, "name@example.com");
    const submitButton = await screen.findByText("Reset your password");
    userEvent.click(submitButton);
    server.pretender.handledRequest = (path) => {
      expect(path).toBe(
        `${process.env.REACT_APP_BASE_API}/users/forgotpassword`,
      );
    };
  });
});
