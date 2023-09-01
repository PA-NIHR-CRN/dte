import { axe, toHaveNoViolations } from "jest-axe";
import { createServer, Server } from "miragejs";
import { render, screen, userEvent } from "../../../../Helper/test-utils";
import "@testing-library/jest-dom";
import MfaSmsSetup from "./MfaSmsSetup";

expect.extend(toHaveNoViolations);

let server: Server;

beforeAll(() => {
  server = createServer({
    routes() {
      this.post(
        `${process.env.REACT_APP_BASE_API}/users/setupsmsmfa`,
        (schema, request) => {
          const { phoneNumber, mfaDetails } = JSON.parse(request.requestBody);
          if (phoneNumber === "1234567890" && mfaDetails) {
            return {
              content: null,
              isSuccess: true,
              errors: [],
              conversationId: null,
              version: 1,
            };
          }
          return new Error("Incorrect Phone Number");
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
    const { container } = render(<MfaSmsSetup />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("Render MFA SMS Setup Form", () => {
  it("must render the form", () => {
    render(<MfaSmsSetup />);
  });
});

describe("Phone Number input must have correct attributes", () => {
  it("must have a required attribute", async () => {
    render(<MfaSmsSetup />);
    const phoneNumberInput = await screen.findByLabelText(
      "UK mobile phone number",
    );
    expect(phoneNumberInput).toHaveAttribute("required");
  });

  it("must have a type attribute of tel", async () => {
    render(<MfaSmsSetup />);
    const phoneNumberInput = await screen.findByLabelText(
      "UK mobile phone number",
    );
    const typeValue = phoneNumberInput.getAttribute("type");
    expect(phoneNumberInput).toHaveAttribute("type");
    expect(typeValue).toBe("tel");
  });

  it("must have a autocomplete attribute of tel-national", async () => {
    render(<MfaSmsSetup />);
    const phoneNumberInput = await screen.findByLabelText(
      "UK mobile phone number",
    );
    const autocompleteValue = phoneNumberInput.getAttribute("autocomplete");
    expect(phoneNumberInput).toHaveAttribute("autocomplete");
    expect(autocompleteValue).toBe("tel-national");
  });

  it("must have a spellcheck attribute set to false", async () => {
    render(<MfaSmsSetup />);
    const phoneNumberInput = await screen.findByLabelText(
      "UK mobile phone number",
    );
    const spellcheckValue = phoneNumberInput.getAttribute("spellcheck");
    expect(phoneNumberInput).toHaveAttribute("spellcheck");
    expect(spellcheckValue).toBe("false");
  });
});

describe("Functional requirements must be met", () => {
  it("must send a post request when the validation rules are met", async () => {
    render(<MfaSmsSetup />);
    const phoneNumberInput = await screen.findByLabelText(
      "UK mobile phone number",
    );
    userEvent.type(phoneNumberInput, "1234567890");
    const submitButton = await screen.findByText("Continue");
    userEvent.click(submitButton);
  });
});
