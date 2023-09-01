import { axe, toHaveNoViolations } from "jest-axe";
import { createServer, Server } from "miragejs";
import { render, screen } from "../../../../Helper/test-utils";
import "@testing-library/jest-dom";
import MfaLandlineSetup from "./MfaLandlineSetup";

expect.extend(toHaveNoViolations);

let server: Server;
beforeAll(() => {
  server = createServer({
    routes() {
      this.post(`${process.env.REACT_APP_BASE_API}/users/setupsmsmfa`, () => {
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

afterAll(() => {
  server.shutdown();
});

describe("Accessibility test", () => {
  it("should not fail any accessibility tests", async () => {
    const { container } = render(<MfaLandlineSetup />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("Render MFA Landline Setup Form", () => {
  it("must render the form", () => {
    render(<MfaLandlineSetup />);
  });
});

describe("Landline number input must have correct attributes", () => {
  it("must have a required attribute", async () => {
    render(<MfaLandlineSetup />);
    const landlineInput = await screen.findByLabelText("Landline number");
    expect(landlineInput).toHaveAttribute("required");
  });

  it("must have a type attribute of tel", async () => {
    render(<MfaLandlineSetup />);
    const landlineInput = await screen.findByLabelText("Landline number");
    const typeValue = landlineInput.getAttribute("type");
    expect(landlineInput).toHaveAttribute("type");
    expect(typeValue).toBe("tel");
  });

  it("must have a autocomplete attribute of tel", async () => {
    render(<MfaLandlineSetup />);
    const landlineInput = await screen.findByLabelText("Landline number");
    const autocompleteValue = landlineInput.getAttribute("autocomplete");
    expect(landlineInput).toHaveAttribute("autocomplete");
    expect(autocompleteValue).toBe("tel");
  });

  it("must have a spellcheck attribute set to false", async () => {
    render(<MfaLandlineSetup />);
    const landlineInput = await screen.findByLabelText("Landline number");
    const spellcheckValue = landlineInput.getAttribute("spellcheck");
    expect(landlineInput).toHaveAttribute("spellcheck");
    expect(spellcheckValue).toBe("false");
  });
});
