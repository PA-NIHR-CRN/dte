import { axe, toHaveNoViolations } from "jest-axe";
import { createServer, Server } from "miragejs";
import { render, screen } from "../../../../../Helper/test-utils";
import "@testing-library/jest-dom";
import YouAreNowRegisteredForm from "./YouAreNowRegisteredForm";
import { ContinueRegistrationState } from "../../../../../types/ParticipantTypes";

expect.extend(toHaveNoViolations);

const testData: ContinueRegistrationState = {
  addressFormData: {
    address: {
      addressLine1: "Address Line 1",
      addressLine2: "Address Line 2",
      addressLine3: "Address Line 3",
      addressLine4: "Address Line 4",
      town: "town",
    },
    postcode: "postcode",
  },
  mobileFormData: {
    mobileNumber: "07666666666",
    landlineNumber: "01234567890",
  },
  sexFormData: {
    sexAtBirth: "male",
    genderAtBirth: "noSay",
  },
  ethnicity1FormData: {
    ethnicity: "white",
  },
  ethnicity2FormData: {
    background: "other typed in answer",
  },
  disabilityFormData: {
    disability: "yes",
  },
  disability2FormData: {
    disability: "yes",
    disabilityDescription: "Yes, a little",
  },
  healthConditionFormData: {
    conditions: ["Flu"],
  },
};
const mockSetLoading = jest.fn();
const mockSetLoadingText = jest.fn();
const mockSetPrevRegistrationData = jest.fn();

let server: Server;
beforeAll(() => {
  server = createServer({
    routes() {
      this.post(`${process.env.REACT_APP_BASE_API}/participants/demographics`, () => {
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

describe("Demographics Api Success Tests", () => {
  it("must display the correct screen for a successfull post", async () => {
    render(<YouAreNowRegisteredForm data={testData} setLoading={mockSetLoading} setLoadingText={mockSetLoadingText} />);

    expect(await screen.findByText("Thank you for registering for Be Part of Research")).toBeInTheDocument();
  });

  it("must not fail any accessibility tests for populated data", async () => {
    const { container } = render(
      <YouAreNowRegisteredForm data={testData} setLoading={mockSetLoading} setLoadingText={mockSetLoadingText} />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
