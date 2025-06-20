import { createServer, Response, Server } from "miragejs";
import { render, screen, waitFor } from "../../../../../../Helper/test-utils";
import "@testing-library/jest-dom";
import PasswordForm from "./PasswordForm";
import weakPasswords from "../../../../../../data/weakPasswords";

const data = {
  password: "",
  password2: "",
};

describe("Password policy text must be correct (new bullet format)", () => {
  let server: Server;

  beforeEach(() => {
    server = createServer({});
    server.get(
      `${process.env.REACT_APP_BASE_API}/users/passwordpolicy`,
      () =>
        new Response(
          200,
          { "Content-Type": "application/json" },
          {
            minimumLength: 12,
            requireLowercase: true,
            requireNumbers: true,
            requireSymbols: true,
            requireUppercase: true,
            allowedPasswordSymbols:
              '^ $ * . , [ ] { } ( ) ? " ! @ # % & / \\ , > < \' : ; | _ ~ `',
            weakPasswords,
          }
        )
    );
  });

  afterEach(() => {
    server.shutdown();
  });

  test("renders bullet-point policy list and example", async () => {
    const mockOnDataChange = jest.fn();
    const mockSetLoading = jest.fn();
    const mockSetLoadingText = jest.fn();

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

    expect(
      await screen.findByText((content) =>
        content.includes("Your password must include at least")
      )
    ).toBeInTheDocument();

    expect(
      await screen.findByText((text) => text.includes("12 characters in total"))
    ).toBeInTheDocument();

    expect(
      await screen.findByText((text) => text.includes("1 UPPERCASE letter"))
    ).toBeInTheDocument();

    expect(
      await screen.findByText((text) => text.includes("1 lowercase letter"))
    ).toBeInTheDocument();

    expect(
      await screen.findByText((text) => text.includes("1 number"))
    ).toBeInTheDocument();

    expect(
      await screen.findByText((text) => text.includes("1 symbol - for example, #, ! or %"))
    ).toBeInTheDocument();

    expect(
      await screen.findByText((text) => text.includes("For example, APPLE15nemo#biro"))
    ).toBeInTheDocument();
  });
});
