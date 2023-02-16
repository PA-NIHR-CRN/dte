import { axe, toHaveNoViolations } from "jest-axe";
import { createServer, Response, Server } from "miragejs";
import {
  render,
  screen,
  waitForElementToBeRemoved,
  userEvent,
  waitFor,
} from "../../../../Helper/test-utils";
import AccountSettings from "../AccountSettings";

expect.extend(toHaveNoViolations);

let server: Server;

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
    listen: jest.fn(),
  }),
}));

beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
});

beforeEach(() => {
  server = createServer({
    routes() {
      this.get(
        `${process.env.REACT_APP_BASE_API}/participants/:userID/details`,
        () => {
          return {
            content: {
              firstname: "firstname",
              lastname: "lastname",
              email: "first.last@domain.com",
              consentRegistration: false,
              consentRegistrationAtUtc: null,
              hasDemographics: true,
            },
            isSuccess: true,
            errors: [],
            conversationId: null,
            version: 1,
          };
        }
      );
      this.post(`${process.env.REACT_APP_BASE_API}/users/changeemail`, () => {
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

describe("Update Email display tests", () => {
  it("must not have accessibility violations", async () => {
    const { container } = render(<AccountSettings />);
    const changeButtons = await screen.findAllByText("Change");
    userEvent.click(changeButtons[0]);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("must render without crashing", async () => {
    const { container } = render(<AccountSettings />);
    const changeButtons = await screen.findAllByText("Change");
    userEvent.click(changeButtons[0]);
    expect(container).toBeInTheDocument();
  });

  it("must render the correct title", async () => {
    render(<AccountSettings />);
    const changeButtons = await screen.findAllByText("Change");
    userEvent.click(changeButtons[0]);
    const header = await screen.findByRole("heading", { level: 1 });
    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe("What is your new email address?");
  });

  it("must display the data retrieved from the server correctly", async () => {
    render(<AccountSettings />);
    const changeButtons = await screen.findAllByText("Change");
    userEvent.click(changeButtons[0]);
    const newEmailEditor = await screen.findByLabelText("New email address");
    const confNewEmailEditor = await screen.findByLabelText(
      "Confirm your new email address"
    );
    expect(newEmailEditor).toBeInTheDocument();
    expect(newEmailEditor).toHaveDisplayValue("");
    expect(confNewEmailEditor).toBeInTheDocument();
    expect(confNewEmailEditor).toHaveDisplayValue("");

    const extraInfoDetails = await screen.findByText(
      "Why we are asking this question"
    );
    userEvent.click(extraInfoDetails);
    const explanationText = await screen.findByText(
      "We need your email address so we can contact you when we find a suitable study"
    );
    expect(explanationText).toBeInTheDocument();
    const editorButtons = await screen.findAllByRole("button");
    expect(editorButtons).toHaveLength(2);
    expect(editorButtons[0]).toHaveTextContent("Save");
    expect(editorButtons[1]).toHaveTextContent("Cancel");
  });

  describe("Email input must have correct attributes", () => {
    it("must have a required attribute", async () => {
      render(<AccountSettings />);
      const changeButtons = await screen.findAllByText("Change");
      userEvent.click(changeButtons[0]);
      const emailInput = await screen.findByLabelText("New email address");
      expect(emailInput).toHaveAttribute("required");
    });
    it("must have a aria-required attribute of true", async () => {
      render(<AccountSettings />);
      const changeButtons = await screen.findAllByText("Change");
      userEvent.click(changeButtons[0]);
      const emailInput = await screen.findByLabelText("New email address");
      const ariaRequiredValue = emailInput.getAttribute("aria-required");
      expect(emailInput).toHaveAttribute("aria-required");
      expect(ariaRequiredValue).toBe("true");
    });
    it("must have a type attribute of email", async () => {
      render(<AccountSettings />);
      const changeButtons = await screen.findAllByText("Change");
      userEvent.click(changeButtons[0]);
      const emailInput = await screen.findByLabelText("New email address");
      const typeValue = emailInput.getAttribute("type");
      expect(emailInput).toHaveAttribute("type");
      expect(typeValue).toBe("email");
    });
    it("must have a autocomplete attribute of email", async () => {
      render(<AccountSettings />);
      const changeButtons = await screen.findAllByText("Change");
      userEvent.click(changeButtons[0]);
      const emailInput = await screen.findByLabelText("New email address");
      const autocompleteValue = emailInput.getAttribute("autocomplete");
      expect(emailInput).toHaveAttribute("autocomplete");
      expect(autocompleteValue).toBe("email");
    });
    it("must have a spellcheck attribute set to false", async () => {
      render(<AccountSettings />);
      const changeButtons = await screen.findAllByText("Change");
      userEvent.click(changeButtons[0]);
      const emailInput = await screen.findByLabelText("New email address");
      const spellcheckValue = emailInput.getAttribute("spellcheck");
      expect(emailInput).toHaveAttribute("spellcheck");
      expect(spellcheckValue).toBe("false");
    });
  });

  describe("Email confirm input must have correct attributes", () => {
    it("must have a required attribute", async () => {
      render(<AccountSettings />);
      const changeButtons = await screen.findAllByText("Change");
      userEvent.click(changeButtons[0]);
      const emailInput = await screen.findByLabelText("New email address");
      expect(emailInput).toHaveAttribute("required");
    });
    it("must have a aria-required attribute of true", async () => {
      render(<AccountSettings />);
      const changeButtons = await screen.findAllByText("Change");
      userEvent.click(changeButtons[0]);
      const emailInput = await screen.findByLabelText("New email address");
      const ariaRequiredValue = emailInput.getAttribute("aria-required");
      expect(emailInput).toHaveAttribute("aria-required");
      expect(ariaRequiredValue).toBe("true");
    });
    it("must have a type attribute of email", async () => {
      render(<AccountSettings />);
      const changeButtons = await screen.findAllByText("Change");
      userEvent.click(changeButtons[0]);
      const emailInput = await screen.findByLabelText("New email address");
      const typeValue = emailInput.getAttribute("type");
      expect(emailInput).toHaveAttribute("type");
      expect(typeValue).toBe("email");
    });
    it("must have a autocomplete attribute of email", async () => {
      render(<AccountSettings />);
      const changeButtons = await screen.findAllByText("Change");
      userEvent.click(changeButtons[0]);
      const emailInput = await screen.findByLabelText("New email address");
      const autocompleteValue = emailInput.getAttribute("autocomplete");
      expect(emailInput).toHaveAttribute("autocomplete");
      expect(autocompleteValue).toBe("email");
    });
    it("must have a spellcheck attribute set to false", async () => {
      render(<AccountSettings />);
      const changeButtons = await screen.findAllByText("Change");
      userEvent.click(changeButtons[0]);
      const emailInput = await screen.findByLabelText("New email address");
      const spellcheckValue = emailInput.getAttribute("spellcheck");
      expect(emailInput).toHaveAttribute("spellcheck");
      expect(spellcheckValue).toBe("false");
    });
  });
});

describe.each([
  ["", "Enter your new email address", "Confirm your new email address"],
  ["     ", "Enter your new email address", "Confirm your new email address"],
])(
  "Email validation must be correct for different invalid email addresses",
  (
    emailAddress,
    entryValidationErrorMessage,
    confirmationValidationErrorMessage
  ) => {
    test(`validates ${emailAddress} correctly`, async () => {
      render(<AccountSettings />);
      const changeButtons = await screen.findAllByText("Change");
      userEvent.click(changeButtons[0]);

      const emailInput = screen.getByLabelText("New email address");
      const confNewEmailEditor = await screen.findByLabelText(
        "Confirm your new email address"
      );
      const editorButtons = await screen.findAllByRole("button");
      userEvent.type(emailInput, emailAddress);
      userEvent.type(confNewEmailEditor, emailAddress);
      userEvent.click(editorButtons[0]);
      await waitFor(async () => {
        const errorMessages = await screen.findAllByRole("presentation");
        expect(errorMessages).toHaveLength(2);
        expect(errorMessages[0]).toHaveTextContent(entryValidationErrorMessage);
        expect(errorMessages[1]).toHaveTextContent(
          confirmationValidationErrorMessage
        );
      });
    });
  }
);

describe.each([
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
  "Email validation must be correct for duplicated invalid email addresses",
  (emailAddress, validationErrorMessage) => {
    test(`validates ${emailAddress} correctly`, async () => {
      render(<AccountSettings />);
      const changeButtons = await screen.findAllByText("Change");
      userEvent.click(changeButtons[0]);

      const emailInput = screen.getByLabelText("New email address");
      const confNewEmailEditor = await screen.findByLabelText(
        "Confirm your new email address"
      );
      const editorButtons = await screen.findAllByRole("button");
      userEvent.type(emailInput, emailAddress);
      userEvent.type(confNewEmailEditor, emailAddress);
      userEvent.click(editorButtons[0]);
      await waitFor(async () => {
        const validationErrors = await screen.findAllByText(
          validationErrorMessage
        );
        expect(validationErrors).toHaveLength(2);
      });
    });
  }
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
      render(<AccountSettings />);
      const changeButtons = await screen.findAllByText("Change");
      userEvent.click(changeButtons[0]);

      const emailInput = screen.getByLabelText("New email address");
      const confNewEmailEditor = await screen.findByLabelText(
        "Confirm your new email address"
      );
      const editorButtons = await screen.findAllByRole("button");
      userEvent.type(emailInput, emailAddress);
      userEvent.type(confNewEmailEditor, emailAddress);
      userEvent.click(editorButtons[0]);
      expect(
        screen.queryByText("Enter your email address")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(
          "Enter an email address in the correct format, like name@example.com"
        )
      ).not.toBeInTheDocument();
    });
  }
);

describe("Update Email must show correct error messages", () => {
  it("must show the correct message when a user does not enter their new email address", async () => {
    render(<AccountSettings />);
    const changeButtons = await screen.findAllByText("Change");
    userEvent.click(changeButtons[0]);
    const confNewEmailEditor = await screen.findByLabelText(
      "Confirm your new email address"
    );
    const editorButtons = await screen.findAllByRole("button");
    userEvent.type(confNewEmailEditor, "email@domain.com");
    userEvent.click(editorButtons[0]);
    expect(
      await screen.findByText("Enter your new email address")
    ).toBeInTheDocument();
  });

  it("must show the correct message when a user does not enter a valid new email address", async () => {
    render(<AccountSettings />);
    const changeButtons = await screen.findAllByText("Change");
    userEvent.click(changeButtons[0]);
    const newEmailEditor = await screen.findByLabelText("New email address");
    const confNewEmailEditor = await screen.findByLabelText(
      "Confirm your new email address"
    );
    const editorButtons = await screen.findAllByRole("button");
    userEvent.type(newEmailEditor, "bob");
    userEvent.type(confNewEmailEditor, "email@domain.com");
    userEvent.click(editorButtons[0]);
    expect(
      await screen.findByText(
        "Enter an email address in the correct format, like name@example.com"
      )
    ).toBeInTheDocument();
  });

  it("must show the correct message when a user does not enter their new email address confirmation", async () => {
    render(<AccountSettings />);
    await waitForElementToBeRemoved(await screen.findByText(/Loading.../));
    const changeButtons = await screen.findAllByText("Change");
    userEvent.click(changeButtons[0]);
    const newEmailEditor = await screen.findByLabelText("New email address");
    const editorButtons = await screen.findAllByRole("button");
    userEvent.type(newEmailEditor, "email@domain.com");
    userEvent.click(editorButtons[0]);
    const errors = await screen.findAllByRole("presentation");
    expect(errors[0]).toHaveTextContent("Confirm your new email address");
  });

  it("must show the correct message when a user does not enter a valid confirmation email address", async () => {
    render(<AccountSettings />);
    const changeButtons = await screen.findAllByText("Change");
    userEvent.click(changeButtons[0]);
    const newEmailEditor = await screen.findByLabelText("New email address");
    const confNewEmailEditor = await screen.findByLabelText(
      "Confirm your new email address"
    );
    const editorButtons = await screen.findAllByRole("button");
    userEvent.type(newEmailEditor, "email@domain.com");
    userEvent.type(confNewEmailEditor, "bob");
    userEvent.click(editorButtons[0]);
    expect(
      await screen.findByText(
        "Enter an email address in the correct format, like name@example.com"
      )
    ).toBeInTheDocument();
  });

  it("must show the correct message when a user does not enter matching email addresses", async () => {
    render(<AccountSettings />);
    const changeButtons = await screen.findAllByText("Change");
    userEvent.click(changeButtons[0]);
    const newEmailEditor = await screen.findByLabelText("New email address");
    const confNewEmailEditor = await screen.findByLabelText(
      "Confirm your new email address"
    );
    const editorButtons = await screen.findAllByRole("button");
    userEvent.type(newEmailEditor, "email@domain.com");
    userEvent.type(confNewEmailEditor, "other@domain.com");
    userEvent.click(editorButtons[0]);
    expect(
      await screen.findByText("Enter the same email address as above")
    ).toBeInTheDocument();
  });

  it("must show the correct message when the api call fails", async () => {
    server.post(`${process.env.REACT_APP_BASE_API}/users/changeemail`, () => {
      return {
        content: null,
        isSuccess: false,
        errors: [
          {
            service: "StudyAPi",
            component: "UserService",
            exceptionName: "NotAuthorizedException",
            httpStatusName: "InternalServerError",
            httpStatusCode: 500,
            httpResponseString: null,
            customCode: "Change_Email_Error_Unauthorised",
            detail: "Invalid Access Token",
          },
        ],
        conversationId: null,
        version: 1,
      };
    });
    render(<AccountSettings />);
    const changeButtons = await screen.findAllByText("Change");
    userEvent.click(changeButtons[0]);
    const newEmailEditor = await screen.findByLabelText("New email address");
    const confNewEmailEditor = await screen.findByLabelText(
      "Confirm your new email address"
    );
    const editorButtons = await screen.findAllByRole("button");
    userEvent.type(newEmailEditor, "email@domain.com");
    userEvent.type(confNewEmailEditor, "email@domain.com");
    userEvent.click(editorButtons[0]);
    expect(await screen.findByText(/There is a problem/)).toBeInTheDocument();
    expect(
      await screen.findByText(
        /Your email address has not been updated. The email address may already be registered or there may have been a technical issue./
      )
    ).toBeInTheDocument();
  });

  it("must show the correct message when the api gateway is down", async () => {
    server.post(`${process.env.REACT_APP_BASE_API}/users/changeemail`, () => {
      return new Response(504);
    });
    render(<AccountSettings />);
    const changeButtons = await screen.findAllByText("Change");
    userEvent.click(changeButtons[0]);
    const newEmailEditor = await screen.findByLabelText("New email address");
    const confNewEmailEditor = await screen.findByLabelText(
      "Confirm your new email address"
    );
    const editorButtons = await screen.findAllByRole("button");
    userEvent.type(newEmailEditor, "email@domain.com");
    userEvent.type(confNewEmailEditor, "email@domain.com");
    userEvent.click(editorButtons[0]);
    expect(await screen.findByText(/There is a problem/)).toBeInTheDocument();
    expect(
      await screen.findByText(
        /Your email address has not been updated. The email address may already be registered or there may have been a technical issue./
      )
    ).toBeInTheDocument();
  });
});

describe("Update Email must handle valid user operations", () => {
  it("must return to the Account Settings screen on cancel", async () => {
    render(<AccountSettings />);
    const changeButtons = await screen.findAllByText("Change");
    userEvent.click(changeButtons[0]);
    const newEmailEditor = await screen.findByLabelText("New email address");
    const confNewEmailEditor = await screen.findByLabelText(
      "Confirm your new email address"
    );
    const editorButtons = await screen.findAllByRole("button");
    userEvent.type(newEmailEditor, "email@domain.com");
    userEvent.type(confNewEmailEditor, "email@domain.com");
    userEvent.click(editorButtons[0]);
    userEvent.click(editorButtons[1]);
    const header = await screen.findByRole("heading", { level: 1 });
    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe("Account settings");
    expect(
      await screen.findByText("first.last@domain.com")
    ).toBeInTheDocument();
  });

  it("must post the correct information to the server api", async () => {
    render(<AccountSettings />);
    const changeButtons = await screen.findAllByText("Change");
    userEvent.click(changeButtons[0]);
    const newEmailEditor = await screen.findByLabelText("New email address");
    const confNewEmailEditor = await screen.findByLabelText(
      "Confirm your new email address"
    );
    const editorButtons = await screen.findAllByRole("button");
    userEvent.type(newEmailEditor, "email2@domain.com");
    userEvent.type(confNewEmailEditor, "email2@domain.com");
    userEvent.click(editorButtons[0]);
    server.pretender.handledRequest = async (verb, path, request) => {
      const { requestBody } = request;
      expect(verb).toBe("POST");
      expect(path).toContain("/users/changeemail");
      expect(requestBody).toBe(
        JSON.stringify({
          accessToken: null,
          newEmail: "email2@domain.com",
        })
      );
    };
  });

  it("must display the updating your details when new email is valid", async () => {
    render(<AccountSettings />);
    const changeButtons = await screen.findAllByText("Change");
    userEvent.click(changeButtons[0]);
    const newEmailEditor = await screen.findByLabelText("New email address");
    const confNewEmailEditor = await screen.findByLabelText(
      "Confirm your new email address"
    );
    const editorButtons = await screen.findAllByRole("button");
    userEvent.type(newEmailEditor, "email@domain.com");
    userEvent.type(confNewEmailEditor, "email@domain.com");
    userEvent.click(editorButtons[0]);
    const header = await screen.findByRole("heading", { level: 1 });
    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe("What is your new email address?");
    expect(
      await screen.findByText(/Updating your details.../)
    ).toBeInTheDocument();
  });

  it("must redirect to email updated page after updating the email address", async () => {
    render(<AccountSettings />, undefined, [
      { pathname: "/" },
      { pathname: "/Participants/AccountSettings" },
      { pathname: "/Participants/EmailUpdated" },
    ]);

    const changeButtons = await screen.findAllByText("Change");
    userEvent.click(changeButtons[0]);
    const newEmailEditor = await screen.findByLabelText("New email address");
    const confNewEmailEditor = await screen.findByLabelText(
      "Confirm your new email address"
    );
    const editorButtons = await screen.findAllByRole("button");
    userEvent.type(newEmailEditor, "email3@domain.com");
    userEvent.type(confNewEmailEditor, "email3@domain.com");
    userEvent.click(editorButtons[0]);

    server.pretender.handledRequest = async (verb, path, request) => {
      const { responseText } = request;
      expect(verb).toBe("POST");
      expect(path).toContain("/users/changeemail");
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
    await waitForElementToBeRemoved(
      await screen.findByText(/Updating your details.../)
    );
    expect(mockHistoryPush).toHaveBeenCalledTimes(1);
    expect(mockHistoryPush).toHaveBeenCalledWith("/Participants/EmailUpdated");
  });
});

describe("Update Email Form must display error summary header on invalid submission", () => {
  it("renders correctly", async () => {
    render(<AccountSettings />);
    const changeButtons = await screen.findAllByText("Change");
    userEvent.click(changeButtons[0]);

    const editorButtons = await screen.findAllByRole("button");
    userEvent.click(editorButtons[0]);

    const errors = await screen.findAllByRole("alert");
    const summary = errors[0];
    expect(summary).toHaveAttribute("id", "error-message");
  });
});
