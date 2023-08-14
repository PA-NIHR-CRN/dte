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
      this.get(
        `${process.env.REACT_APP_BASE_API}/participants/demographics`,
        () => {
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
              ethnicBackground:
                "British, English, Northern Irish, Scottish, or Welsh",
              disability: true,
              disabilityDescription: "Not at all",
              healthConditionInterests: [
                "Achalasia",
                "Vestibular schwannoma",
                "Gigantism",
              ],
              hasDemographics: true,
            },
            isSuccess: true,
            errors: [],
            conversationId: null,
            version: 1,
          };
        }
      );
      this.get(
        `${process.env.REACT_APP_BASE_API}/referencedata/health/healthconditions`,
        () => {
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
        }
      );
      this.put(
        `${process.env.REACT_APP_BASE_API}/participants/demographics`,
        () => {
          return { message: "Success" };
        }
      );
    },
  });
});

afterEach(() => {
  server.shutdown();
});

describe("Areas Of Research display tests", () => {
  it("must not have accessibility violations", async () => {
    const { container } = render(<AreasOfResearch />);
    await waitFor(() => {
      expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("must render without crashing", async () => {
    const { container } = render(<AreasOfResearch />);
    await waitFor(() => {
      expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
    });
    expect(container).toBeInTheDocument();
  });

  it("must render the correct title", async () => {
    render(<AreasOfResearch />);
    await waitFor(() => {
      expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
    });
    const header = await screen.findByRole("heading", { level: 1 });
    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe(
      "Which areas of research are you interested in?"
    );
  });

  it("must display the data retrieved from the server correctly", async () => {
    render(<AreasOfResearch />);
    await waitFor(() => {
      expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
    });
    const intro1 = await screen.findByText(
      "Start entering details below to see different areas of research. You can select as many options as you like."
    );
    expect(intro1).toBeInTheDocument();

    const intro2 = await screen.findByText(
      /For example, you can enter a health condition like 'diabetes', 'heart disease' or 'COVID-19'. You can take part whether you have a health condition or not by entering '/
    );
    expect(intro2).toBeInTheDocument();
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute(
      "href",
      "https://bepartofresearch.nihr.ac.uk/taking-part/volunteering-without-a-condition/"
    );
    expect(links[0]).toHaveTextContent("healthy volunteer");

    const areaEditor = await screen.findByLabelText("Areas of research");
    expect(areaEditor).toBeInTheDocument();

    const editorButtons = await screen.findAllByRole("button");
    expect(editorButtons).toHaveLength(6);
    expect(editorButtons[0]).toHaveTextContent("Achalasia");
    expect(editorButtons[1]).toHaveTextContent("Vestibular schwannoma");
    expect(editorButtons[2]).toHaveTextContent("Gigantism");
    expect(editorButtons[4]).toHaveTextContent("Save");
    expect(editorButtons[5]).toHaveTextContent("Cancel");
    const extraInfoDetails = await screen.findByText(
      "Why we are asking this question"
    );
    expect(extraInfoDetails).toBeInTheDocument();
  });
});

describe("Update Areas Of Research", () => {
  it("must remove an existing area of research", async () => {
    render(<AreasOfResearch />);
    await waitFor(() => {
      expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
    });
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
        ethnicBackground:
          "British, English, Northern Irish, Scottish, or Welsh",
        disability: true,
        disabilityDescription: "Not at all",
        healthConditionInterests: ["Achalasia", "Vestibular schwannoma"],
      });
    };
  });
  it("must add a new area of research", async () => {
    render(<AreasOfResearch />);
    await waitFor(() => {
      expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
    });
    const areaEditor = await screen.findByLabelText("Areas of research");
    await waitFor(() => {
      fireEvent.change(areaEditor, {
        target: { value: "Sol" },
      });
    });

    const healthConditionOptions = await screen.findAllByRole("checkbox");
    expect(healthConditionOptions).toHaveLength(2);
    expect(healthConditionOptions[0]).toHaveAttribute(
      "value",
      "Actinic keratoses (solar keratoses)"
    );
    expect(healthConditionOptions[1]).toHaveAttribute(
      "value",
      "Solar keratoses"
    );

    await waitFor(() => {
      fireEvent.click(healthConditionOptions[0]);
    });

    const editorButtons = await screen.findAllByRole("button");
    expect(editorButtons).toHaveLength(7);
    expect(editorButtons[0]).toHaveTextContent("Achalasia");
    expect(editorButtons[1]).toHaveTextContent(
      "Actinic keratoses (solar keratoses)"
    );
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
        ethnicBackground:
          "British, English, Northern Irish, Scottish, or Welsh",
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
