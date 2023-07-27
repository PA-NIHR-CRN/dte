import { axe, toHaveNoViolations } from "jest-axe";
import { createServer, Server } from "miragejs";
import "@testing-library/jest-dom";
import MfaSmsChallenge from "./MfaSmsChallenge";
import {
  render,
  screen,
  userEvent,
  waitFor,
} from "../../../../Helper/test-utils";

expect.extend(toHaveNoViolations);

let server: Server;

beforeAll(() => {
  server = createServer({
    routes() {
      this.post(
        `${process.env.REACT_APP_BASE_API}/users/respondtomfachallenge`,
        (schema, request) => {
          const { mfaCode, mfaDetails } = JSON.parse(request.requestBody);
          if (mfaCode === "123456" && mfaDetails) {
            return {
              content: null,
              isSuccess: true,
              errors: [],
              conversationId: null,
              version: 1,
            };
          }
          return new Error("Incorrect MFA Code");
        }
      );
      this.post(
        `${process.env.REACT_APP_BASE_API}/users/resendmfachallenge`,
        () => {
          return {
            content: null,
            isSuccess: true,
            errors: [],
            conversationId: null,
            version: 1,
          };
        }
      );
    },
  });
});

afterAll(() => {
  server.shutdown();
});

describe("Accessibility test", () => {
  it("should not fail any accessibility tests", async () => {
    const { container } = render(<MfaSmsChallenge />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("Render MFA SMS Challenge Form", () => {
  it("must render the form", () => {
    render(<MfaSmsChallenge />);
  });
});

describe("MFA code input must have correct attributes", () => {
  it("must have a required attribute", async () => {
    render(<MfaSmsChallenge />);
    const mfaInput = await screen.findByLabelText("Security code");
    expect(mfaInput).toHaveAttribute("required");
  });

  it("must have a type attribute of text", async () => {
    render(<MfaSmsChallenge />);
    const mfaInput = await screen.findByLabelText("Security code");
    const typeValue = mfaInput.getAttribute("type");
    expect(mfaInput).toHaveAttribute("type");
    expect(typeValue).toBe("text");
  });

  it("must have a autocomplete attribute of off", async () => {
    render(<MfaSmsChallenge />);
    const mfaInput = await screen.findByLabelText("Security code");
    const autocompleteValue = mfaInput.getAttribute("autocomplete");
    expect(mfaInput).toHaveAttribute("autocomplete");
    expect(autocompleteValue).toBe("off");
  });

  it("must have a spellcheck attribute set to false", async () => {
    render(<MfaSmsChallenge />);
    const mfaInput = await screen.findByLabelText("Security code");
    const spellcheckValue = mfaInput.getAttribute("spellcheck");
    expect(mfaInput).toHaveAttribute("spellcheck");
    expect(spellcheckValue).toBe("false");
  });
});

describe("Functional requirements must be met", () => {
  it("must send a post request when the validation rules are met", async () => {
    render(<MfaSmsChallenge />);
    const mfaInput = await screen.findByLabelText("Security code");
    userEvent.type(mfaInput, "123456");
    const submitButton = await screen.findByText("Continue");
    userEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText("Security code")).toBeInTheDocument();
    });
  });
});
