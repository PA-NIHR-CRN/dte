import { axe, toHaveNoViolations } from "jest-axe";
import { createServer, Server } from "miragejs";
import { render, screen, fireEvent, waitFor } from "../../../Helper/test-utils";
import AreasOfResearch from "./AreasOfResearch";

expect.extend(toHaveNoViolations);

let server: Server;

beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
});

beforeEach(() => {
  server = createServer({
    routes() {
      this.get(`${process.env.REACT_APP_BASE_API}/participants/demographics`, () => {
        return {
          content: {
            mobileNumber: "01234567890",
            landlineNumber: null,
            address: {
              addressLine1: "ROYAL MAIL SWANSEA MAIL CENTRE",
              addressLine2: "SIEMENS WAY",
              addressLine3: "ABERTAWE",
              addressLine4: null,
              town: "SWANSEA",
              postcode: "SA1 1AA",
            },
            dateOfBirth: "1980-03-01T12:00:00.000Z",
            sexRegisteredAtBirth: "male",
            genderIsSameAsSexRegisteredAtBirth: false,
            ethnicGroup: "mixed",
            ethnicBackground: "British, English, Northern Irish, Scottish, or Welsh",
            disability: true,
            disabilityDescription: "Not at all",
            healthConditionInterests: ["Achalasia", "Vestibular schwannoma", "Gigantism"],
            hasDemographics: true,
          },
          isSuccess: true,
          errors: [],
          conversationId: null,
          version: 1,
        };
      });
      this.get(`${process.env.REACT_APP_BASE_API}/referencedata/health/healthconditions`, () => {
        return {
          content: [
            "Acanthosis nigricans",
            "Achalasia",
            "Acid and chemical burns",
            "Acoustic neuroma (vestibular schwannoma)",
            "Vestibular schwannoma",
            "Acromegaly",
            "Gigantism",
            "Urine albumin to creatinine ratio (ACR)",
            "Actinic keratoses (solar keratoses)",
            "Solar keratoses",
            "Acupuncture",
            "Acute cholecystitis",
          ],
          isSuccess: true,
          errors: [],
          conversationId: null,
          version: 1,
        };
      });
      this.put(`${process.env.REACT_APP_BASE_API}/participants/demographics`, () => {
        return { message: "Success" };
      });
    },
  });
});

afterEach(() => {
  server.shutdown();
});

describe("Areas Of Research display tests", () => {
  it("must not have accessibility violations", async () => {
    const { container } = render(<AreasOfResearch />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("must render without crashing", async () => {
    const { container } = render(<AreasOfResearch />);

    expect(container).toBeInTheDocument();
  });

  it("must render the correct title", async () => {
    render(<AreasOfResearch />);

    const header = await screen.findByRole("heading", { level: 1 });
    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe("Which health conditions can we contact you about?");
  });

  it("must display the data retrieved from the server correctly", async () => {
    render(<AreasOfResearch />);

    const intro1 = await screen.findByText(
      "The health conditions you choose in this section will be used to match you to suitable research studies using our service. We will then send you information on how you can take part."
    );
    expect(intro1).toBeInTheDocument();

    const heading = await screen.findByText("How to get started");
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H2");

    expect(
      await screen.findByText("Use the search tool to look for conditions you’re interested in.")
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        "You might select a health condition you already have like diabetes, or heart disease. Or you might have a family member or friend who has a condition, so you could choose those. Many studies do not require you to have a specific condition to take part, so we need people without conditions too."
      )
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        "If there aren’t any health conditions you’re interested in but would still like to take part, then select ‘healthy volunteer’. If you do not select anything, you will not be contacted about any studies."
      )
    ).toBeInTheDocument();

    const areaEditor = await screen.findByLabelText("Areas of research");
    expect(areaEditor).toBeInTheDocument();

    const editorButtons = await screen.findAllByRole("button");
    expect(editorButtons).toHaveLength(6);
    expect(editorButtons[0]).toHaveTextContent("Achalasia");
    expect(editorButtons[1]).toHaveTextContent("Vestibular schwannoma");
    expect(editorButtons[2]).toHaveTextContent("Gigantism");
    expect(editorButtons[4]).toHaveTextContent("Save");
    expect(editorButtons[5]).toHaveTextContent("Cancel");
    const extraInfoDetails = await screen.findByText("Why we are asking this question");
    expect(extraInfoDetails).toBeInTheDocument();
  });
});

describe("Update Areas Of Research", () => {
  it("must remove an existing area of research", async () => {
    render(<AreasOfResearch />);

    const editorButtons = await screen.findAllByRole("button");
    expect(editorButtons).toHaveLength(6);
    expect(editorButtons[0]).toHaveTextContent("Achalasia");
    expect(editorButtons[1]).toHaveTextContent("Vestibular schwannoma");
    expect(editorButtons[2]).toHaveTextContent("Gigantism");
    expect(editorButtons[4]).toHaveTextContent("Save");
    expect(editorButtons[5]).toHaveTextContent("Cancel");
    await waitFor(() => {
      fireEvent.click(editorButtons[2]);
    });
    await waitFor(() => {
      fireEvent.click(editorButtons[4]);
    });

    server.pretender.handledRequest = async (verb, path, request) => {
      const { requestBody } = request;
      const parsedRequestBody = JSON.parse(requestBody);
      expect(verb).toBe("PUT");
      expect(path).toContain("/participants/demographics");
      expect(parsedRequestBody).toStrictEqual({
        mobileNumber: "01234567890",
        landlineNumber: null,
        address: {
          addressLine1: "ROYAL MAIL SWANSEA MAIL CENTRE",
          addressLine2: "SIEMENS WAY",
          addressLine3: "ABERTAWE",
          addressLine4: null,
          town: "SWANSEA",
          postcode: "SA1 1AA",
        },
        dateOfBirth: "1980-03-01T12:00:00.000Z",
        sexRegisteredAtBirth: "male",
        genderIsSameAsSexRegisteredAtBirth: false,
        ethnicGroup: "mixed",
        ethnicBackground: "British, English, Northern Irish, Scottish, or Welsh",
        disability: true,
        disabilityDescription: "Not at all",
        healthConditionInterests: ["Achalasia", "Vestibular schwannoma"],
      });
    };
  });
  it("must add a new area of research", async () => {
    render(<AreasOfResearch />);

    const areaEditor = await screen.findByLabelText("Areas of research");
    await waitFor(() => {
      fireEvent.change(areaEditor, {
        target: { value: "Sol" },
      });
    });

    const healthConditionOptions = await screen.findAllByRole("checkbox");
    expect(healthConditionOptions).toHaveLength(1);
    expect(healthConditionOptions[0]).toHaveAttribute("value", "Actinic keratoses (solar keratoses)");

    await waitFor(() => {
      fireEvent.click(healthConditionOptions[0]);
    });

    const editorButtons = await screen.findAllByRole("button");
    expect(editorButtons).toHaveLength(7);
    expect(editorButtons[0]).toHaveTextContent("Achalasia");
    expect(editorButtons[1]).toHaveTextContent("Actinic keratoses (solar keratoses)");
    expect(editorButtons[2]).toHaveTextContent("Gigantism");
    expect(editorButtons[3]).toHaveTextContent("Vestibular schwannoma");
    expect(editorButtons[5]).toHaveTextContent("Save");
    expect(editorButtons[6]).toHaveTextContent("Cancel");
    await waitFor(() => {
      fireEvent.click(editorButtons[5]);
    });

    server.pretender.handledRequest = async (verb, path, request) => {
      const { requestBody } = request;
      const parsedRequestBody = JSON.parse(requestBody);
      expect(verb).toBe("PUT");
      expect(path).toContain("/participants/demographics");
      expect(parsedRequestBody).toStrictEqual({
        mobileNumber: "01234567890",
        landlineNumber: null,
        address: {
          addressLine1: "ROYAL MAIL SWANSEA MAIL CENTRE",
          addressLine2: "SIEMENS WAY",
          addressLine3: "ABERTAWE",
          addressLine4: null,
          town: "SWANSEA",
          postcode: "SA1 1AA",
        },
        dateOfBirth: "1980-03-01T12:00:00.000Z",
        sexRegisteredAtBirth: "male",
        genderIsSameAsSexRegisteredAtBirth: false,
        ethnicGroup: "mixed",
        ethnicBackground: "British, English, Northern Irish, Scottish, or Welsh",
        disability: true,
        disabilityDescription: "Not at all",
        healthConditionInterests: [
          "Achalasia",
          "Actinic keratoses (solar keratoses)",
          "Gigantism",
          "Vestibular schwannoma",
        ],
      });
    };
  });
});
