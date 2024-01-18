import { createServer, Response, Server } from "miragejs";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import Verify from "./Verify";
import { render, screen, waitFor } from "../../../Helper/test-utils";
import App from "../../../App";

describe.each([
  [
    "1234-5678-9101",
    {
      content: null,
      isSuccess: true,
      errors: [],
      conversationId: null,
      version: 1,
    },
    "Your email address has been verified",
    "Please sign in to continue registration.",
    "Sign in",
    "/Participants/Register/Continue/Questions",
  ],
  [
    "1234-5678-9101",
    {
      content: null,
      isSuccess: false,
      errors: [
        {
          service: "StudyAPi",
          component: "UserService",
          exceptionName: null,
          httpStatusName: null,
          httpStatusCode: 0,
          httpResponseString: null,
          customCode: "Confirm_SignUp_Error_User_Not_Found",
          detail: "User not found",
        },
      ],
      conversationId: null,
      version: 1,
    },
    "Unable to verify your email address",
    "There may have been a technical issue. You can try to sign in to continue your registration.",
    "Sign in",
    "/UserLogin",
  ],
  [
    "1234-5678-9101",
    {
      content: null,
      isSuccess: false,
      errors: [
        {
          service: "StudyAPi",
          component: "UserService",
          exceptionName: "CodeMismatchException",
          httpStatusName: "InternalServerError",
          httpStatusCode: 500,
          httpResponseString: null,
          customCode: "InternalServerError",
          detail: "Invalid verification code provided, please try again.",
        },
      ],
      conversationId: null,
      version: 1,
    },
    "Unable to verify your email address",
    "There may have been a technical issue. You can try to sign in to continue your registration.",
    "Sign in",
    "/UserLogin",
  ],
  [
    "1234-5678-9101",
    {
      content: null,
      isSuccess: false,
      errors: [
        {
          service: "StudyAPi",
          component: "UserService",
          exceptionName: null,
          httpStatusName: null,
          httpStatusCode: 0,
          httpResponseString: null,
          customCode: "Confirm_SignUp_Error_User_Already_Confirmed",
          detail: "User email is already confirmed",
        },
      ],
      conversationId: null,
      version: 1,
    },
    "Unable to verify your email address",
    "This verification link has already been used. Please sign in to continue registration.",
    "Sign in",
    "/UserLogin",
  ],
])("Landing screen for verification link", (email, response, headerText, contentText, linkText, linkUrl) => {
  let server: Server;
  beforeEach(() => {
    server = createServer({});
  });

  afterEach(() => {
    server.shutdown();
  });

  test(`must validate ${email} link correctly`, async () => {
    server.post(
      `${process.env.REACT_APP_BASE_API}/users/confirmsignup`,
      () => new Response(200, { "Content-Type": "application/json" }, response)
    );

    render(<Verify />, {}, [{ pathname: "/verify", search: `?code=123456&userId=${email}` }]);
    await waitFor(() => {
      expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
    });
    server.pretender.handledRequest = async (path) => {
      expect(path).toBe(`${process.env.REACT_APP_BASE_API}/users/confirmsignup`);
      const header = await screen.findByRole("heading", { level: 1 });
      expect(header).toBeInTheDocument();
      expect(header).toHaveTextContent(headerText);
      const content = await screen.findByText(contentText);
      expect(content).toBeInTheDocument();
      const link = await screen.findByRole("link");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", linkUrl);
      expect(link).toHaveTextContent(linkText);
    };
  });
});

describe.each([
  ["", "/Participants/Register/Continue/Questions"],
  ["?userId=", "/Participants/Register/Continue/Questions"],
  ["?userId=1234-5678-9101", "/Participants/Register/Continue/Questions"],
  ["?code=&userId=1234-5678-9101", "/Participants/Register/Continue/Questions"],
  ["?code=1234", "/Participants/Register/Continue/Questions"],
  ["?code=1234&userId=", "/Participants/Register/Continue/Questions"],
  ["?code=1234&userId=1234-5678-9101", "/verify"],
])("Page Load tests", (urlParams, redirectUrl) => {
  let server: Server;
  beforeEach(() => {
    server = createServer({
      routes() {
        this.get(`${process.env.REACT_APP_BASE_API}/users/confirmsignup`, () => {
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

  test(`must handle loading of ${redirectUrl} for ${urlParams}`, async () => {
    const history = createMemoryHistory();
    history.push(`/verify${urlParams}`);
    render(
      <Router history={history}>
        <App />
      </Router>
    );

    expect(history.location.pathname).toBe(redirectUrl);
  });
});
