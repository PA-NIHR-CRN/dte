import { createServer, Response, Server } from "miragejs";
import { render, screen, waitFor } from "../../../../../../Helper/test-utils";
import "@testing-library/jest-dom";
import PasswordForm from "./PasswordForm";
import weakPasswords from "../../../../../../data/weakPasswords";

const data = {
  password: "",
  password2: "",
};

describe.each([
  [
    5,
    false,
    false,
    false,
    false,
    "Your password must be 5 or more characters. You can use a mix of letters, numbers or symbols.",
  ],
  [
    6,
    false,
    false,
    false,
    true,
    "Your password must be 6 or more characters. You can use a mix of letters, numbers or symbols which must include at least 1 capital letter.",
  ],
  [
    7,
    false,
    false,
    true,
    false,
    "Your password must be 7 or more characters. You can use a mix of letters, numbers or symbols which must include at least 1 symbol.",
  ],
  [
    8,
    false,
    false,
    true,
    true,
    "Your password must be 8 or more characters. You can use a mix of letters, numbers or symbols which must include at least 1 capital letter and 1 symbol.",
  ],
  [
    9,
    false,
    true,
    false,
    false,
    "Your password must be 9 or more characters. You can use a mix of letters, numbers or symbols which must include at least 1 number.",
  ],
  [
    10,
    false,
    true,
    false,
    true,
    "Your password must be 10 or more characters. You can use a mix of letters, numbers or symbols which must include at least 1 capital letter and 1 number.",
  ],
  [
    11,
    false,
    true,
    true,
    false,
    "Your password must be 11 or more characters. You can use a mix of letters, numbers or symbols which must include at least 1 number and 1 symbol.",
  ],
  [
    12,
    false,
    true,
    true,
    true,
    "Your password must be 12 or more characters. You can use a mix of letters, numbers or symbols which must include at least 1 capital letter, 1 number and 1 symbol.",
  ],
  [
    13,
    true,
    false,
    false,
    false,
    "Your password must be 13 or more characters. You can use a mix of letters, numbers or symbols which must include at least 1 lowercase letter.",
  ],
  [
    14,
    true,
    false,
    false,
    true,
    "Your password must be 14 or more characters. You can use a mix of letters, numbers or symbols which must include at least 1 capital letter and 1 lowercase letter.",
  ],
  [
    15,
    true,
    false,
    true,
    false,
    "Your password must be 15 or more characters. You can use a mix of letters, numbers or symbols which must include at least 1 lowercase letter and 1 symbol.",
  ],
  [
    16,
    true,
    false,
    true,
    true,
    "Your password must be 16 or more characters. You can use a mix of letters, numbers or symbols which must include at least 1 capital letter, 1 lowercase letter and 1 symbol.",
  ],
  [
    17,
    true,
    true,
    false,
    false,
    "Your password must be 17 or more characters. You can use a mix of letters, numbers or symbols which must include at least 1 lowercase letter and 1 number.",
  ],
  [
    18,
    true,
    true,
    false,
    true,
    "Your password must be 18 or more characters. You can use a mix of letters, numbers or symbols which must include at least 1 capital letter, 1 lowercase letter and 1 number.",
  ],
  [
    19,
    true,
    true,
    true,
    false,
    "Your password must be 19 or more characters. You can use a mix of letters, numbers or symbols which must include at least 1 lowercase letter, 1 number and 1 symbol.",
  ],
  [
    20,
    true,
    true,
    true,
    true,
    "Your password must be 20 or more characters. You can use a mix of letters, numbers or symbols which must include at least 1 capital letter, 1 lowercase letter, 1 number and 1 symbol.",
  ],
])("Password policy text must be correct", (minLength, lowercase, numbers, symbols, uppercase, expectedContent) => {
  let server: Server;
  beforeEach(() => {
    server = createServer({});
  });

  afterEach(() => {
    server.shutdown();
  });

  test(`constructs ${expectedContent}`, async () => {
    const mockOnDataChange = jest.fn();
    const mockSetLoading = jest.fn();
    const mockSetLoadingText = jest.fn();

    server.get(
      `${process.env.REACT_APP_BASE_API}/users/passwordpolicy`,
      () =>
        new Response(
          200,
          { "Content-Type": "application/json" },
          {
            minimumLength: minLength,
            requireLowercase: lowercase,
            requireNumbers: numbers,
            requireSymbols: symbols,
            requireUppercase: uppercase,
            allowedPasswordSymbols: "^ $ * . , [ ] { } ( ) ? \" ! @ # % & / \\ , > < ' : ; | _ ~ `",
            weakPasswords,
          }
        )
    );

    render(
      <PasswordForm
        initialStateData={data}
        onDataChange={mockOnDataChange}
        setLoading={mockSetLoading}
        setLoadingText={mockSetLoadingText}
      />
    );
    await waitFor(() => {
      expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
    });
    const policy = await screen.findByText(expectedContent);
    expect(policy).toBeInTheDocument();
  });
});
