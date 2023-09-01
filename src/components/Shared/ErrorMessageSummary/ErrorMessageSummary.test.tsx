import { axe, toHaveNoViolations } from "jest-axe";
import { render, screen } from "../../../Helper/test-utils";
import ErrorMessageSummary from "./ErrorMessageSummary";

expect.extend(toHaveNoViolations);

const errors = {
  email: { type: "required", message: "Enter an email address" },
  password: { type: "required", message: "Enter a password" },
};

describe("Error Message Summary must render correctly", () => {
  it("should not fail any accessibility tests", async () => {
    const { container } = render(
      <ErrorMessageSummary renderSummary errors={errors} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders correctly", async () => {
    render(<ErrorMessageSummary renderSummary errors={errors} />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("There is a problem")).toBeInTheDocument();
    const emailError = screen.getByText("Error: Enter an email address");
    const passwordError = screen.getByText("Error: Enter a password");
    expect(emailError).toBeInTheDocument();
    expect(emailError).toHaveAttribute("href", "#email");
    expect(passwordError).toBeInTheDocument();
    expect(passwordError).toHaveAttribute("href", "#password");
  });
});

describe.each([
  [false, errors],
  [true, {}],
])(
  "Error Message Summary must not render when ",
  (renderSummary, formErrors) => {
    test(`renderSummary is ${renderSummary} and errors are ${formErrors}`, async () => {
      render(
        <ErrorMessageSummary
          renderSummary={renderSummary}
          errors={formErrors}
        />,
      );
      expect(screen.queryByRole("alert")).toBeNull();
      expect(screen.queryByText("There is a problem")).toBeNull();
      expect(screen.queryByText("Error: Enter an email address")).toBeNull();
      expect(screen.queryByText("Error: Enter a password")).toBeNull();
    });
  },
);
