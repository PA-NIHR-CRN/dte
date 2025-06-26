import { axe, toHaveNoViolations } from "jest-axe";
import { createServer, Server } from "miragejs";
import { render, screen, userEvent, waitFor } from "../../../Helper/test-utils";
import "@testing-library/jest-dom";
import UserLogin from "./UserLogin";

expect.extend(toHaveNoViolations);

let server: Server;
beforeEach(() => {
  server = createServer({
    routes() {
      this.get(`${process.env.REACT_APP_BASE_API}/users/login`, () => {
        return {
          content: {
            idToken: "this is a token",
            accessToken: "this is a token",
            expiresIn: 86400,
            tokenType: "Bearer",
            errorMessage: null,
          },
          isSuccess: true,
          errors: [],
          conversationId: null,
          version: 1,
        };
      });
      this.post(`${process.env.REACT_APP_BASE_API}/users/resendverificationemail`, () => {
        return {
          content: null,
          isSuccess: true,
          errors: [],
          conversationId: null,
          version: 1,
        };
      });
    },
  });
});

afterEach(() => {
  server.shutdown();
});

describe("User Login must render correctly", () => {
  it("should not fail any accessibility tests", async () => {
    const { container } = render(<UserLogin />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it("renders correctly", async () => {
    render(<UserLogin />);

    const loginButton = screen.getAllByRole("button")[1];
    const links = screen.getAllByRole("link");
    expect(screen.getByText("Sign in to Be Part of Research")).toBeInTheDocument();
    const email = screen.getByLabelText("Email address");
    expect(email).toBeInTheDocument();
    expect(email).toHaveValue("");
    const password = screen.getByLabelText("Password");
    expect(password).toBeInTheDocument();
    expect(password).toHaveValue("");

    expect(loginButton).toBeInTheDocument();
    expect(loginButton.textContent).toBe("Sign in");
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute("href", "/Participants/Options");
    expect(links[0]).toHaveTextContent("Back");
    expect(links[1]).toHaveAttribute("href", "/ForgottenPassword");
    expect(links[1].textContent).toContain("reset your password");
    expect(links[2]).toHaveAttribute("href", "/participants/register");
    expect(links[2]).toHaveTextContent("Register here");
  });
});

describe("Email input must have correct attributes", () => {
  it("must have a required attribute", async () => {
    render(<UserLogin />);

    const emailInput = await screen.findByLabelText("Email address");
    expect(emailInput).toHaveAttribute("required");
  });
  it("must have a aria-required attribute of true", async () => {
    render(<UserLogin />);

    const emailInput = await screen.findByLabelText("Email address");
    const ariaRequiredValue = emailInput.getAttribute("aria-required");
    expect(emailInput).toHaveAttribute("aria-required");
    expect(ariaRequiredValue).toBe("true");
  });
  it("must have a type attribute of email", async () => {
    render(<UserLogin />);

    const emailInput = await screen.findByLabelText("Email address");
    const typeValue = emailInput.getAttribute("type");
    expect(emailInput).toHaveAttribute("type");
    expect(typeValue).toBe("email");
  });
  it("must have a autocomplete attribute of email", async () => {
    render(<UserLogin />);

    const emailInput = await screen.findByLabelText("Email address");
    const autocompleteValue = emailInput.getAttribute("autocomplete");
    expect(emailInput).toHaveAttribute("autocomplete");
    expect(autocompleteValue).toBe("username");
  });
  it("must have a spellcheck attribute set to false", async () => {
    render(<UserLogin />);

    const emailInput = await screen.findByLabelText("Email address");
    const spellcheckValue = emailInput.getAttribute("spellcheck");
    expect(emailInput).toHaveAttribute("spellcheck");
    expect(spellcheckValue).toBe("false");
  });
});

describe("Password input must have correct attributes", () => {
  it("must have a required attribute", async () => {
    render(<UserLogin />);

    const passwordInput = await screen.findByLabelText("Password");
    expect(passwordInput).toHaveAttribute("required");
  });
  it("must have a aria-required attribute of true", async () => {
    render(<UserLogin />);

    const passwordInput = await screen.findByLabelText("Password");
    const ariaRequiredValue = passwordInput.getAttribute("aria-required");
    expect(passwordInput).toHaveAttribute("aria-required");
    expect(ariaRequiredValue).toBe("true");
  });
  it("must have a type attribute of email", async () => {
    render(<UserLogin />);

    const passwordInput = await screen.findByLabelText("Password");
    const typeValue = passwordInput.getAttribute("type");
    expect(passwordInput).toHaveAttribute("type");
    expect(typeValue).toBe("password");
  });
  it("must have a autocomplete attribute of password", async () => {
    render(<UserLogin />);

    const passwordInput = await screen.findByLabelText("Password");
    const autocompleteValue = passwordInput.getAttribute("autocomplete");
    expect(passwordInput).toHaveAttribute("autocomplete");
    expect(autocompleteValue).toBe("current-password");
  });
  it("must have a spellcheck attribute set to false", async () => {
    render(<UserLogin />);

    const passwordInput = await screen.findByLabelText("Password");
    const spellcheckValue = passwordInput.getAttribute("spellcheck");
    expect(passwordInput).toHaveAttribute("spellcheck");
    expect(spellcheckValue).toBe("false");
  });
});

describe.each([
  ["", "Enter an email address"],
  ["     ", "Enter an email address"],
  ["firstname.o\\'lastname@domain.com", "Enter an email address in the correct format, like name@example.com"],
  [
    "info@german-financial-services.vermögensberatung",
    "Enter an email address in the correct format, like name@example.com",
  ],
  ["japanese-info@例え.テスト", "Enter an email address in the correct format, like name@example.com"],
  ["technically..valid@domain.com", "Enter an email address in the correct format, like name@example.com"],
  ["email@123.123.123.123", "Enter an email address in the correct format, like name@example.com"],
  ["plainaddress", "Enter an email address in the correct format, like name@example.com"],
  ["@no-local-part.com", "Enter an email address in the correct format, like name@example.com"],
  [
    "Outlook Contact <outlook-contact@domain.com>",
    "Enter an email address in the correct format, like name@example.com",
  ],
  ["no-at.domain.com", "Enter an email address in the correct format, like name@example.com"],
  ["no-tld@domain", "Enter an email address in the correct format, like name@example.com"],
  [";beginning-semicolon@domain.co.uk", "Enter an email address in the correct format, like name@example.com"],
  ["middle-semicolon@domain.co;uk", "Enter an email address in the correct format, like name@example.com"],
  ["trailing-semicolon@domain.com;", "Enter an email address in the correct format, like name@example.com"],
  ['"email+leading-quotes@domain.com', "Enter an email address in the correct format, like name@example.com"],
  ['email+middle"-quotes@domain.com', "Enter an email address in the correct format, like name@example.com"],
  ['"quoted@domain.com"', "Enter an email address in the correct format, like name@example.com"],
  ["lots-of-dots@domain..gov..uk", "Enter an email address in the correct format, like name@example.com"],
  ["multiple@domains@domain.com", "Enter an email address in the correct format, like name@example.com"],
  ["underscores-in-domain@dom_ain.com", "Enter an email address in the correct format, like name@example.com"],
  ["pipe-in-domain@example.com|gov.uk", "Enter an email address in the correct format, like name@example.com"],
  ["comma,in-local@gov.uk", "Enter an email address in the correct format, like name@example.com"],
  ["comma-in-domain@domain,gov.uk", "Enter an email address in the correct format, like name@example.com"],
  ["domain-starts-with-a-dot@.domain.com", "Enter an email address in the correct format, like name@example.com"],
])("Email validation must be correct for invalid email addresses", (emailAddress, validationError) => {
  test(`validates ${emailAddress} correctly`, async () => {
    render(<UserLogin />);

    const emailInput = screen.getByLabelText("Email address");
    userEvent.type(emailInput, emailAddress);
    userEvent.click(screen.getByText("Sign in"));
    await waitFor(async () => {
      expect(await screen.findByText(validationError)).toBeInTheDocument();
    });
  });
});

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
  ["info@german-financial-services.reallylongarbitrarytldthatiswaytoohugejustincase"],
  ["email@[123.123.123.123]"],
  ['"quoted-local-part"@domain.com'],
  ["pound-sign-in-local£@domain.com"],
  ["local-with-'-apostrophe@domain.com"],
  ['local-with-"-quotes@domain.com'],
])("Email validation must be correct for valid email addresses", (emailAddress) => {
  test(`validates ${emailAddress} correctly`, async () => {
    render(<UserLogin />);

    const emailInput = screen.getByLabelText("Email address");
    userEvent.type(emailInput, emailAddress);
    userEvent.click(screen.getByText("Sign in"));
    await waitFor(async () => {
      expect(screen.queryByText("Enter your email address")).not.toBeInTheDocument();
      expect(
        screen.queryByText("Enter an email address in the correct format, like name@example.com")
      ).not.toBeInTheDocument();
    });
  });
});

describe("User Login functions correctly", () => {
  it("validates required fields when both are blank", async () => {
    render(<UserLogin />);

    userEvent.click(screen.getByText("Sign in"));
    expect(await screen.findByText("Enter an email address")).toBeInTheDocument();
    expect(await screen.findByText("Enter a password")).toBeInTheDocument();
  });

  it("send a login request for a valididated request", async () => {
    render(<UserLogin />);

    const emailInput = screen.getByLabelText("Email address");
    userEvent.type(emailInput, "valid@example.com");
    const passwordInput = screen.getByLabelText("Password");
    userEvent.type(passwordInput, "password");
    userEvent.click(screen.getByText("Sign in"));
    server.pretender.handledRequest = async (verb, path, request) => {
      const { responseText } = request;
      expect(verb).toBe("POST");
      expect(path).toContain(`${process.env.REACT_APP_BASE_API}/users/login`);
      expect(responseText).toBe(
        JSON.stringify({
          content: null,
          isSuccess: true,
          errors: [],
          conversationId: null,
          version: 1,
        })
      );
    };
  });
});

describe("Non Validated Account processes correctly", () => {
  it("must display resend link option for non-verified email", async () => {
    server.post(`${process.env.REACT_APP_BASE_API}/users/login`, () => {
      return {
        content: null,
        isSuccess: false,
        errors: [
          {
            service: "StudyAPi",
            component: "UserService",
            exceptionName: "",
            httpStatusName: "",
            httpStatusCode: 500,
            httpResponseString: null,
            customCode: "Authentication_Not_Authorized",
            detail: "",
          },
        ],
        conversationId: null,
        version: 1,
      };
    });
    render(<UserLogin />);

    const emailInput = screen.getByLabelText("Email address");
    userEvent.type(emailInput, "valid@example.com");
    const passwordInput = screen.getByLabelText("Password");
    userEvent.type(passwordInput, "Password123!");
    userEvent.click(screen.getByText("Sign in"));

    expect(await screen.findByText("There is a problem")).toBeInTheDocument();
    expect(
      await screen.findByText(/Enter the email address and password for a registered user account./)
    ).toBeInTheDocument();
    const buttons = await screen.findAllByRole("button");
    expect(buttons).toHaveLength(2);
    expect(buttons[1]).toHaveTextContent("Sign in");
  });
});

describe("User Login must display error summary header on invalid submission", () => {
  it("renders correctly", async () => {
    render(<UserLogin />);

    userEvent.click(screen.getByText("Sign in"));

    const errors = await screen.findAllByRole("alert");
    const summary = errors[0];
    expect(summary).toHaveAttribute("id", "error-message");
  });
});

describe("Unknown Account processes correctly", () => {
  it("must display correct message for unknown email", async () => {
    server.post(`${process.env.REACT_APP_BASE_API}/users/login`, () => {
      return {
        content: null,
        isSuccess: false,
        errors: [
          {
            service: "StudyAPi",
            component: "UserService",
            exceptionName: "",
            httpStatusName: "",
            httpStatusCode: 500,
            httpResponseString: null,
            customCode: "Authentication_Not_Authorized",
            detail: "",
          },
        ],
        conversationId: null,
        version: 1,
      };
    });
    render(<UserLogin />);

    const emailInput = screen.getByLabelText("Email address");
    userEvent.type(emailInput, "valid@example.com");
    const passwordInput = screen.getByLabelText("Password");
    userEvent.type(passwordInput, "Password123!");
    userEvent.click(screen.getByText("Sign in"));

    expect(await screen.findByText("There is a problem")).toBeInTheDocument();
    expect(
      await screen.findByText(/Enter the email address and password for a registered user account./)
    ).toBeInTheDocument();
    const buttons = await screen.findAllByRole("button");
    const links = screen.getAllByRole("link");
    expect(buttons).toHaveLength(2);
    expect(buttons[1]).toHaveTextContent("Sign in");
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute("href", "/Participants/Options");
    expect(links[0]).toHaveTextContent("Back");
    expect(links[1]).toHaveAttribute("href", "/ForgottenPassword");
    expect(links[1]).toHaveTextContent("reset your password");
    expect(links[2]).toHaveAttribute("href", "/participants/register");
    expect(links[2]).toHaveTextContent("Register here");
  });
});
