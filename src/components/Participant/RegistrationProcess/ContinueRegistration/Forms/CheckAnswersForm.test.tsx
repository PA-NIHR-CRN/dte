import { axe, toHaveNoViolations } from "jest-axe";
import {
  render,
  screen,
  waitFor,
  fireEvent,
} from "../../../../../Helper/test-utils";
import "@testing-library/jest-dom";
import CheckAnswersForm from "./CheckAnswersForm";
import { ContinueRegistrationState } from "../../../../../types/ParticipantTypes";
import { AddressFormData } from "../../../../Shared/FormElements/AddressForm";
import { MobileFormData } from "../../../../Shared/FormElements/MobileNumberForm";
import { Ethnicity1FormData } from "../../../../Shared/FormElements/EthnicityFormComponents/Ethnicity1Form";
import { Ethnicity2FormData } from "../../../../Shared/FormElements/EthnicityFormComponents/Ethnicity2Form";
import { DisabilityFormData } from "../../../../Shared/FormElements/DisabilityForm";
import { Disability2FormData } from "../../../../Shared/FormElements/Disability2Form";
import { HealthConditionFormData } from "../../../../Shared/FormElements/HealthConditionForm";
import { SexFormData } from "../../../../Shared/FormElements/SexForm";

expect.extend(toHaveNoViolations);

const blankTestData: ContinueRegistrationState = {
  addressFormData: {
    address: {
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      addressLine4: "",
      town: "",
    },
    postcode: "",
  } as AddressFormData,
  mobileFormData: {
    mobileNumber: undefined,
    landlineNumber: undefined,
  } as MobileFormData,
  sexFormData: {
    sexAtBirth: "",
  } as SexFormData,
  ethnicity1FormData: {
    ethnicity: "",
  } as Ethnicity1FormData,
  ethnicity2FormData: {
    background: "",
  } as Ethnicity2FormData,
  disabilityFormData: {
    disability: "",
  } as DisabilityFormData,
  disability2FormData: {
    disabilityDescription: "",
  } as Disability2FormData,
  healthConditionFormData: {
    conditions: [],
  } as HealthConditionFormData,
};

const populatedTestData: ContinueRegistrationState = {
  addressFormData: {
    address: {
      addressLine1: "address line 1",
      addressLine2: "address line 2",
      addressLine3: "address line 3",
      addressLine4: "address line 4",
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
    disabilityDescription: "Yes, a little",
  },
  healthConditionFormData: {
    conditions: ["Flu"],
  },
};

describe("Check Answers Form displays data correctly", () => {
  it("Home address must be rendered correctly", async () => {
    const mockChangeStep = jest.fn();
    render(
      <CheckAnswersForm
        initialStateData={populatedTestData}
        changeStep={mockChangeStep}
      />,
    );

    expect(screen.getByText(/address line 1/)).toBeInTheDocument();
    expect(screen.getByText(/address line 2/)).toBeInTheDocument();
    expect(screen.getByText(/address line 3/)).toBeInTheDocument();
    expect(screen.getByText(/address line 4/)).toBeInTheDocument();
    expect(screen.getByText(/town/)).toBeInTheDocument();
    expect(screen.getByText(/postcode/)).toBeInTheDocument();
  });

  it("Phone number must be rendered correctly", async () => {
    const mockChangeStep = jest.fn();
    render(
      <CheckAnswersForm
        initialStateData={populatedTestData}
        changeStep={mockChangeStep}
      />,
    );

    expect(screen.getByText(/Phone number/)).toBeInTheDocument();
    expect(screen.getByText(/Mobile/)).toBeInTheDocument();
    expect(screen.getByText(/07666666666/)).toBeInTheDocument();
    expect(screen.getByText(/Landline/)).toBeInTheDocument();
    expect(screen.getByText(/01234567890/)).toBeInTheDocument();
  });

  it("Sex registered at Birth must be rendered correctly", async () => {
    const mockChangeStep = jest.fn();
    render(
      <CheckAnswersForm
        initialStateData={populatedTestData}
        changeStep={mockChangeStep}
      />,
    );

    expect(screen.getByText("Sex registered at birth")).toBeInTheDocument();
    expect(screen.getByText("Male")).toBeInTheDocument();
  });

  it("Gender Identity must be rendered correctly", async () => {
    const mockChangeStep = jest.fn();
    render(
      <CheckAnswersForm
        initialStateData={populatedTestData}
        changeStep={mockChangeStep}
      />,
    );

    expect(
      screen.getByText("Gender identity same as sex registered at birth"),
    ).toBeInTheDocument();
    expect(screen.getByText("Prefer not to say")).toBeInTheDocument();
  });

  it("Ethnic Group must be rendered correctly", async () => {
    const mockChangeStep = jest.fn();
    render(
      <CheckAnswersForm
        initialStateData={populatedTestData}
        changeStep={mockChangeStep}
      />,
    );

    expect(screen.getByText("Ethnic group")).toBeInTheDocument();
    expect(screen.getByText("White")).toBeInTheDocument();
  });

  it("Ethnic background must be rendered correctly", async () => {
    const mockChangeStep = jest.fn();
    render(
      <CheckAnswersForm
        initialStateData={populatedTestData}
        changeStep={mockChangeStep}
      />,
    );

    expect(screen.getByText("Ethnic background")).toBeInTheDocument();
    expect(screen.getByText("other typed in answer")).toBeInTheDocument();
  });

  it("Long Term Illness must be rendered correctly", async () => {
    const mockChangeStep = jest.fn();
    render(
      <CheckAnswersForm
        initialStateData={populatedTestData}
        changeStep={mockChangeStep}
      />,
    );

    expect(
      screen.getByText("Long-term conditions or illness"),
    ).toBeInTheDocument();
    expect(screen.getByText("Yes")).toBeInTheDocument();
  });

  it("Reduced ability must be rendered correctly", async () => {
    const mockChangeStep = jest.fn();
    render(
      <CheckAnswersForm
        initialStateData={populatedTestData}
        changeStep={mockChangeStep}
      />,
    );

    expect(
      screen.getByText("Reduced ability to carry out daily activities"),
    ).toBeInTheDocument();
    expect(screen.getByText("Yes, a little")).toBeInTheDocument();
  });

  it("Areas of research must be rendered correctly", async () => {
    const mockChangeStep = jest.fn();
    render(
      <CheckAnswersForm
        initialStateData={populatedTestData}
        changeStep={mockChangeStep}
      />,
    );

    const allMatches = screen.getAllByText("Areas of research");
    expect(allMatches).toHaveLength(2);
    expect(screen.getByText("Flu")).toBeInTheDocument();
  });
});

describe("Check Answers Form Layout", () => {
  it("must have the correct header", async () => {
    const mockChangeStep = jest.fn();
    render(
      <CheckAnswersForm
        initialStateData={populatedTestData}
        changeStep={mockChangeStep}
      />,
    );

    const header = screen.getByRole("heading", { level: 1 });
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(
      "Check your answers before completing your registration",
    );
  });

  it("must have the correct amount of change answer buttons", async () => {
    const mockChangeStep = jest.fn();
    render(
      <CheckAnswersForm
        initialStateData={populatedTestData}
        changeStep={mockChangeStep}
      />,
    );

    const changeButtons = await screen.findAllByRole("button");
    expect(changeButtons[0]).toHaveTextContent("Change home address");
    expect(changeButtons[1]).toHaveTextContent("Change phone number");
    expect(changeButtons[2]).toHaveTextContent(
      "Change sex registered at birth",
    );
    expect(changeButtons[3]).toHaveTextContent(
      "Change gender identity same as sex registered at birth",
    );
    expect(changeButtons[4]).toHaveTextContent("Change ethnic group");
    expect(changeButtons[5]).toHaveTextContent("Change ethnic background");
    expect(changeButtons[6]).toHaveTextContent(
      "Change long-term conditions or illness",
    );
    expect(changeButtons[7]).toHaveTextContent(
      "Change reduced ability to carry out daily activities",
    );
    expect(changeButtons[8]).toHaveTextContent("Change Areas of research");
  });

  it("must have the correct submit button", async () => {
    const mockChangeStep = jest.fn();
    render(
      <CheckAnswersForm
        initialStateData={populatedTestData}
        changeStep={mockChangeStep}
      />,
    );

    const buttons = screen.getAllByRole("button");
    const submitButtons = buttons.filter(
      (x) => x.textContent === "Complete registration",
    );
    expect(submitButtons).toHaveLength(1);
  });

  it("allows the user to change an answer", async () => {
    const mockChangeStep = jest.fn();
    render(
      <CheckAnswersForm
        initialStateData={populatedTestData}
        changeStep={mockChangeStep}
      />,
    );

    const changeButton = screen.getAllByText("Change")[4];
    fireEvent.click(changeButton);
    await waitFor(() => {
      expect(mockChangeStep).toHaveBeenCalledWith(3);
    });
  });
});

describe("Accessibility test", () => {
  it("should not fail any accessibility tests for empty data", async () => {
    const mockChangeStep = jest.fn();
    const { container } = render(
      <CheckAnswersForm
        initialStateData={blankTestData}
        changeStep={mockChangeStep}
      />,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should not fail any accessibility tests for populated data", async () => {
    const mockChangeStep = jest.fn();
    const { container } = render(
      <CheckAnswersForm
        initialStateData={populatedTestData}
        changeStep={mockChangeStep}
      />,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
