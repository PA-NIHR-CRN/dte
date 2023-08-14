import { axe, toHaveNoViolations } from "jest-axe";
import { createServer, Response, Server } from "miragejs";
import {
  userEvent,
  render,
  screen,
  waitForElementToBeRemoved,
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
      this.get(`${process.env.REACT_APP_BASE_API}/participants/details`, () => {
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
      });
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
      this.post(
        `${process.env.REACT_APP_BASE_API}/users/changepassword`,
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

afterEach(() => {
  server.shutdown();
});

describe("Update Password display tests", () => {
  it("must not have accessibility violations", async () => {
    const { container } = render(<AccountSettings />);

    const changeButtons = await screen.findAllByText("Change");
    userEvent.click(changeButtons[1]);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("must render without crashing", async () => {
    const { container } = render(<AccountSettings />);

    const changeButtons = await screen.findAllByText("Change");
    userEvent.click(changeButtons[1]);
    expect(container).toBeInTheDocument();
  });

  it("must render the correct title", async () => {
    render(<AccountSettings />);

    const changeButtons = await screen.findAllByText("Change");
    userEvent.click(changeButtons[1]);
    const header = await screen.findByRole("heading", { level: 1 });
    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe("Change your password");
  });

  it("must render the correct auto complete attributes", async () => {
    render(<AccountSettings />);

    const changeButtons = await screen.findAllByText("Change");
    userEvent.click(changeButtons[1]);

    const currentPasswordEditor = await screen.findByLabelText(
      "Current password",
    );
    const newPasswordEditor = await screen.findByLabelText(
      "Create new password",
    );
    const confirmNewPasswordEditor = await screen.findByLabelText(
      "Confirm new password",
    );

    expect(currentPasswordEditor).toBeInTheDocument();
    expect(currentPasswordEditor.getAttribute("autocomplete")).toEqual(
      "current-password",
    );
    expect(newPasswordEditor).toBeInTheDocument();
    expect(newPasswordEditor.getAttribute("autocomplete")).toEqual(
      "new-password",
    );
    expect(confirmNewPasswordEditor).toBeInTheDocument();
    expect(confirmNewPasswordEditor.getAttribute("autocomplete")).toBeNull();
  });

  it("must display the data retrieved from the server correctly", async () => {
    render(<AccountSettings />);

    const changeButtons = await screen.findAllByText("Change");
    userEvent.click(changeButtons[1]);

    const currentPasswordEditor = await screen.findByLabelText(
      "Current password",
    );
    const newPasswordEditor = await screen.findByLabelText(
      "Create new password",
    );
    const confirmNewPasswordEditor = await screen.findByLabelText(
      "Confirm new password",
    );

    expect(currentPasswordEditor).toBeInTheDocument();
    expect(currentPasswordEditor).toHaveDisplayValue("");
    expect(newPasswordEditor).toBeInTheDocument();
    expect(newPasswordEditor).toHaveDisplayValue("");
    expect(confirmNewPasswordEditor).toBeInTheDocument();
    expect(confirmNewPasswordEditor).toHaveDisplayValue("");

    const editorButtons = await screen.findAllByRole("button");
    expect(editorButtons).toHaveLength(5);
    expect(editorButtons[3]).toHaveTextContent("Save");
    expect(editorButtons[4]).toHaveTextContent("Cancel");
  });
});

describe("Update Password must show correct error messages", () => {
  it("must show the correct messages when a user does not enter data in the fields", async () => {
    render(<AccountSettings />);

    const changeButtons = await screen.findAllByText("Change");
    userEvent.click(changeButtons[1]);

    const editorButtons = await screen.findAllByRole("button");
    userEvent.click(editorButtons[3]);

    const alerts = await screen.findAllByRole("presentation");
    expect(alerts).toHaveLength(3);
    expect(alerts[0]).toHaveTextContent("Enter your current password");
    expect(alerts[1]).toHaveTextContent("Enter a new password");
    expect(alerts[2]).toHaveTextContent("Confirm the new password");
  });

  it("must show the correct message when a user does not enter matching passwords", async () => {
    render(<AccountSettings />);

    const changeButtons = await screen.findAllByText("Change");
    userEvent.click(changeButtons[1]);

    const currentPasswordEditor = await screen.findByLabelText(
      "Current password",
    );
    const newPasswordEditor = await screen.findByLabelText(
      "Create new password",
    );
    const confirmNewPasswordEditor = await screen.findByLabelText(
      "Confirm new password",
    );
    const editorButtons = await screen.findAllByRole("button");

    userEvent.type(currentPasswordEditor, "V4l1dP4ssW0rd!");
    userEvent.type(newPasswordEditor, "L0ngV4l1dP4ssW0rd!");
    userEvent.type(confirmNewPasswordEditor, "L0ngInV4l1dP4ssW0rd!");
    userEvent.click(editorButtons[3]);

    const alerts = await screen.findAllByRole("presentation");
    expect(alerts).toHaveLength(1);
    expect(alerts[0]).toHaveTextContent("Enter the same new password as above");
  });
});

describe.each([
  [
    "1",
    "Enter a new password that is at least 12 characters long and includes at least 1 capital letter, 1 lowercase letter and 1 symbol",
  ],
  [
    "a",
    "Enter a new password that is at least 12 characters long and includes at least 1 capital letter, 1 number and 1 symbol",
  ],
  [
    "A",
    "Enter a new password that is at least 12 characters long and includes at least 1 lowercase letter, 1 number and 1 symbol",
  ],
  [
    "!",
    "Enter a new password that is at least 12 characters long and includes at least 1 capital letter, 1 lowercase letter and 1 number",
  ],
  [
    " ",
    "Enter a new password that is at least 12 characters long and includes at least 1 capital letter, 1 lowercase letter, 1 number, 1 symbol and does not include spaces",
  ],
  [
    "1a",
    "Enter a new password that is at least 12 characters long and includes at least 1 capital letter and 1 symbol",
  ],
  [
    "1A",
    "Enter a new password that is at least 12 characters long and includes at least 1 lowercase letter and 1 symbol",
  ],
  [
    "1!",
    "Enter a new password that is at least 12 characters long and includes at least 1 capital letter and 1 lowercase letter",
  ],
  [
    "1 ",
    "Enter a new password that is at least 12 characters long and includes at least 1 capital letter, 1 lowercase letter, 1 symbol and does not include spaces",
  ],
  [
    "aA",
    "Enter a new password that is at least 12 characters long and includes at least 1 number and 1 symbol",
  ],
  [
    "a!",
    "Enter a new password that is at least 12 characters long and includes at least 1 capital letter and 1 number",
  ],
  [
    "l ",
    "Enter a new password that is at least 12 characters long and includes at least 1 capital letter, 1 number, 1 symbol and does not include spaces",
  ],
  [
    "A!",
    "Enter a new password that is at least 12 characters long and includes at least 1 lowercase letter and 1 number",
  ],
  [
    "A ",
    "Enter a new password that is at least 12 characters long and includes at least 1 lowercase letter, 1 number, 1 symbol and does not include spaces",
  ],
  [
    "! ",
    "Enter a new password that is at least 12 characters long and includes at least 1 capital letter, 1 lowercase letter, 1 number and does not include spaces",
  ],
  [
    "1aB",
    "Enter a new password that is at least 12 characters long and includes at least 1 symbol",
  ],
  [
    "1A!",
    "Enter a new password that is at least 12 characters long and includes at least 1 lowercase letter",
  ],
  [
    "1! ",
    "Enter a new password that is at least 12 characters long and includes at least 1 capital letter, 1 lowercase letter and does not include spaces",
  ],
  [
    "1a!",
    "Enter a new password that is at least 12 characters long and includes at least 1 capital letter",
  ],
  [
    "1a ",
    "Enter a new password that is at least 12 characters long and includes at least 1 capital letter, 1 symbol and does not include spaces",
  ],
  [
    "1A ",
    "Enter a new password that is at least 12 characters long and includes at least 1 lowercase letter, 1 symbol and does not include spaces",
  ],
  [
    "fG!",
    "Enter a new password that is at least 12 characters long and includes at least 1 number",
  ],
  [
    "f! ",
    "Enter a new password that is at least 12 characters long and includes at least 1 capital letter, 1 number and does not include spaces",
  ],
  [
    "C! ",
    "Enter a new password that is at least 12 characters long and includes at least 1 lowercase letter, 1 number and does not include spaces",
  ],
  ["1aB!", "Enter a new password that is at least 12 characters long"],
  [
    "1A! ",
    "Enter a new password that is at least 12 characters long and includes at least 1 lowercase letter and does not include spaces",
  ],
  [
    "1a! ",
    "Enter a new password that is at least 12 characters long and includes at least 1 capital letter and does not include spaces",
  ],
  [
    "1aG ",
    "Enter a new password that is at least 12 characters long and includes at least 1 symbol and does not include spaces",
  ],
  [
    "aV! ",
    "Enter a new password that is at least 12 characters long and includes at least 1 number and does not include spaces",
  ],
  [
    "1aS! ",
    "Enter a new password that is at least 12 characters long and does not include spaces",
  ],
  ["passwordElephant!", "Enter a new password that includes at least 1 number"],
  [
    "password Elephant!",
    "Enter a new password that includes at least 1 number and does not include spaces",
  ],
  [
    "PASSWORDELEPHANT1!",
    "Enter a new password that includes at least 1 lowercase letter",
  ],
  [
    "PASSWORD ELEPHANT1!",
    "Enter a new password that includes at least 1 lowercase letter and does not include spaces",
  ],
  [
    "passwordelephant1!",
    "Enter a new password that includes at least 1 capital letter",
  ],
  [
    "password elephant1!",
    "Enter a new password that includes at least 1 capital letter and does not include spaces",
  ],
  ["passwordElephant1", "Enter a new password that includes at least 1 symbol"],
  [
    "password Elephant1",
    "Enter a new password that includes at least 1 symbol and does not include spaces",
  ],
  [
    "PASSWORDELEPHANT!",
    "Enter a new password that includes at least 1 lowercase letter and 1 number",
  ],
  [
    "PASSWORD ELEPHANT!",
    "Enter a new password that includes at least 1 lowercase letter, 1 number and does not include spaces",
  ],
  [
    "1234567890!!",
    "Enter a new password that includes at least 1 capital letter and 1 lowercase letter",
  ],
  [
    "12345 67890!!",
    "Enter a new password that includes at least 1 capital letter, 1 lowercase letter and does not include spaces",
  ],
  [
    "ELEPHANTPASSWORD1",
    "Enter a new password that includes at least 1 lowercase letter and 1 symbol",
  ],
  [
    "ELEPHANT PASSWORD1",
    "Enter a new password that includes at least 1 lowercase letter, 1 symbol and does not include spaces",
  ],
  [
    "elephantpassword!",
    "Enter a new password that includes at least 1 capital letter and 1 number",
  ],
  [
    "elephant password!",
    "Enter a new password that includes at least 1 capital letter, 1 number and does not include spaces",
  ],
  [
    "elephantpassword1",
    "Enter a new password that includes at least 1 capital letter and 1 symbol",
  ],
  [
    "elephant password1",
    "Enter a new password that includes at least 1 capital letter, 1 symbol and does not include spaces",
  ],
  ["elephantPassword!", "Enter a new password that includes at least 1 number"],
  [
    "elephant Password!",
    "Enter a new password that includes at least 1 number and does not include spaces",
  ],
  [
    "ELEPHANTPASSWORD1!",
    "Enter a new password that includes at least 1 lowercase letter",
  ],
  [
    "ELEPHANT PASSWORD1!",
    "Enter a new password that includes at least 1 lowercase letter and does not include spaces",
  ],
  [
    "elephantpassword1!",
    "Enter a new password that includes at least 1 capital letter",
  ],
  [
    "elephant password1!",
    "Enter a new password that includes at least 1 capital letter and does not include spaces",
  ],
  ["elephantPassword1", "Enter a new password that includes at least 1 symbol"],
  [
    "elephant Password1",
    "Enter a new password that includes at least 1 symbol and does not include spaces",
  ],
  ["elephantPassword1! ", "Enter a new password that does not include spaces"],
  [
    "Pass1!£",
    "Enter a new password that is at least 12 characters long and only includes symbols from this list ^$*.,[]{}()?\"!@#%&/\\,><':;|_~`",
  ],
  [
    "ElephantPassword!£",
    "Enter a new password that includes at least 1 number and only includes symbols from this list ^$*.,[]{}()?\"!@#%&/\\,><':;|_~`",
  ],
  [
    "ELEPHANTPASSWORD1!£",
    "Enter a new password that includes at least 1 lowercase letter and only includes symbols from this list ^$*.,[]{}()?\"!@#%&/\\,><':;|_~`",
  ],
  [
    "elephantpassword1!£",
    "Enter a new password that includes at least 1 capital letter and only includes symbols from this list ^$*.,[]{}()?\"!@#%&/\\,><':;|_~`",
  ],
  [
    "ElephantPassword1£",
    "Enter a new password that includes at least 1 symbol and only includes symbols from this list ^$*.,[]{}()?\"!@#%&/\\,><':;|_~`",
  ],
  [
    "elephantPassword1!£",
    "Enter a new password that only includes symbols from this list ^$*.,[]{}()?\"!@#%&/\\,><':;|_~`",
  ],
  [
    "elephantPassword1!£ ",
    "Enter a new password that does not include spaces and only includes symbols from this list ^$*.,[]{}()?\"!@#%&/\\,><':;|_~`",
  ],
])(
  "Update Password must show correct error message for invalid new passwords",
  (password, expectedError) => {
    test(`for ${password}, returns ${expectedError}`, async () => {
      render(<AccountSettings />);
      await waitFor(() => {
        expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
      });
      const changeButtons = await screen.findAllByText("Change");
      userEvent.click(changeButtons[1]);

      const currentPasswordEditor = await screen.findByLabelText(
        "Current password",
      );
      const newPasswordEditor = await screen.findByLabelText(
        "Create new password",
      );
      const confirmNewPasswordEditor = await screen.findByLabelText(
        "Confirm new password",
      );
      const editorButtons = await screen.findAllByRole("button");

      userEvent.type(currentPasswordEditor, "V4l1dP4ssW0rd!");
      userEvent.type(newPasswordEditor, password);
      userEvent.type(confirmNewPasswordEditor, password);
      userEvent.click(editorButtons[3]);

      const alerts = await screen.findAllByRole("presentation");
      expect(alerts).toHaveLength(1);
      expect(alerts[0]).toHaveTextContent(expectedError);
    });
  },
);

describe("Update Password must handle valid user operations", () => {
  it("must return to the Account Settings screen on cancel", async () => {
    render(<AccountSettings />);

    const changeButtons = await screen.findAllByText("Change");
    userEvent.click(changeButtons[1]);

    const editorButtons = await screen.findAllByRole("button");
    userEvent.click(editorButtons[4]);

    const header = await screen.findByRole("heading", { level: 1 });
    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe("Account settings");
    expect(
      await screen.findByText("first.last@domain.com"),
    ).toBeInTheDocument();
  });

  it("must redirect to password updated page after updating the password", async () => {
    render(<AccountSettings />, undefined, [
      { pathname: "/" },
      { pathname: "/Participants/AccountSettings" },
      { pathname: "/Participants/PasswordUpdated" },
    ]);

    const changeButtons = await screen.findAllByText("Change");
    userEvent.click(changeButtons[1]);

    const currentPasswordEditor = await screen.findByLabelText(
      "Current password",
    );
    const newPasswordEditor = await screen.findByLabelText(
      "Create new password",
    );
    const confirmNewPasswordEditor = await screen.findByLabelText(
      "Confirm new password",
    );
    const editorButtons = await screen.findAllByRole("button");

    userEvent.type(currentPasswordEditor, "V4l1dP4ssW0rd!");
    userEvent.type(newPasswordEditor, "L0ngV4l1dP4ssW0rd!");
    userEvent.type(confirmNewPasswordEditor, "L0ngV4l1dP4ssW0rd!");
    userEvent.click(editorButtons[3]);

    server.pretender.handledRequest = async (verb, path, request) => {
      const { requestBody } = request;
      expect(verb).toBe("POST");
      expect(path).toContain("/users/changepassword");
      expect(requestBody).toBe(
        JSON.stringify({
          oldPassword: "V4l1dP4ssW0rd!",
          newPassword: "L0ngV4l1dP4ssW0rd!",
        }),
      );
    };

    await waitForElementToBeRemoved(
      await screen.findByText("Updating your details..."),
    );
    expect(mockHistoryPush).toHaveBeenCalledTimes(1);
    expect(mockHistoryPush).toHaveBeenCalledWith(
      "/Participants/PasswordUpdated",
    );
  });
});

describe("Update Password must handle server errors", () => {
  it("must show the correct message when the access token is invalid", async () => {
    server.post(
      `${process.env.REACT_APP_BASE_API}/users/changepassword`,
      () => {
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
              customCode: "Change_Password_Error_Unauthorised",
              detail: "Invalid Access Token",
            },
          ],
          conversationId: null,
          version: 1,
        };
      },
    );
    render(<AccountSettings />);

    const changeButtons = await screen.findAllByText("Change");
    userEvent.click(changeButtons[1]);

    const currentPasswordEditor = await screen.findByLabelText(
      "Current password",
    );
    const newPasswordEditor = await screen.findByLabelText(
      "Create new password",
    );
    const confirmNewPasswordEditor = await screen.findByLabelText(
      "Confirm new password",
    );
    const editorButtons = await screen.findAllByRole("button");

    userEvent.type(currentPasswordEditor, "V4l1dP4ssW0rd!");
    userEvent.type(newPasswordEditor, "L0ngV4l1dP4ssW0rd!");
    userEvent.type(confirmNewPasswordEditor, "L0ngV4l1dP4ssW0rd!");
    userEvent.click(editorButtons[3]);

    expect(await screen.findByText("There is a problem")).toBeInTheDocument();
    expect(
      await screen.findByText(
        "Your password has not been updated. You may not have entered the current password correctly or there may have been a technical issue.",
      ),
    ).toBeInTheDocument();
  });

  it("must show the correct message when the api gateway is down", async () => {
    server.post(
      `${process.env.REACT_APP_BASE_API}/users/changepassword`,
      () => {
        return new Response(504);
      },
    );
    render(<AccountSettings />);

    const changeButtons = await screen.findAllByText("Change");
    userEvent.click(changeButtons[1]);

    const currentPasswordEditor = await screen.findByLabelText(
      "Current password",
    );
    const newPasswordEditor = await screen.findByLabelText(
      "Create new password",
    );
    const confirmNewPasswordEditor = await screen.findByLabelText(
      "Confirm new password",
    );
    const editorButtons = await screen.findAllByRole("button");

    userEvent.type(currentPasswordEditor, "V4l1dP4ssW0rd!");
    userEvent.type(newPasswordEditor, "L0ngV4l1dP4ssW0rd!");
    userEvent.type(confirmNewPasswordEditor, "L0ngV4l1dP4ssW0rd!");
    userEvent.click(editorButtons[3]);

    expect(await screen.findByText("There is a problem")).toBeInTheDocument();
    expect(
      await screen.findByText(
        "Your password has not been updated. You may not have entered the current password correctly or there may have been a technical issue.",
      ),
    ).toBeInTheDocument();
  });
});

describe("Update Password Form must display error summary header on invalid submission", () => {
  it("renders correctly", async () => {
    render(<AccountSettings />);

    const changeButtons = await screen.findAllByText("Change");
    userEvent.click(changeButtons[1]);

    const editorButtons = await screen.findAllByRole("button");
    userEvent.click(editorButtons[3]);

    const errors = await screen.findAllByRole("alert");
    const summary = errors[0];
    expect(summary).toHaveAttribute("id", "error-message");
  });
});
