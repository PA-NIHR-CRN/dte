import { axe, toHaveNoViolations } from "jest-axe";
import { createServer, Server } from "miragejs";
import ReactGA from "react-ga";
import { render, screen, fireEvent, act, waitFor } from "../../../Helper/test-utils";
import UpdateParticipant from "./UpdateParticipant";

expect.extend(toHaveNoViolations);

let server: Server;

beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  ReactGA.initialize("UA-XXXXX-Y", { testMode: true });
  expect(ReactGA.testModeAPI.calls).toEqual([["create", "UA-XXXXX-Y", "auto"]]);
});

beforeEach(() => {
  ReactGA.testModeAPI.resetCalls();
  server = createServer({
    routes() {
      this.get(`${process.env.REACT_APP_BASE_API}/participants/details`, () => {
        return {
          content: {
            firstname: "Miles",
            lastname: "Budden",
            email: "miles.budden@nihr.ac.uk",
          },
          isSuccess: true,
          errors: [],
          conversationId: null,
          version: 1,
        };
      });
      this.get(`${process.env.REACT_APP_BASE_API}/participants/demographics`, () => {
        return {
          content: {
            mobileNumber: "01234567890",
            landlineNumber: "09876543210",
            address: {
              addressLine1: "998",
              addressLine2: "What Street",
              addressLine3: "Dtoke Village",
              addressLine4: "Slough Town",
              town: "Buckinghamshire",
              postcode: "ER4 9PL",
            },
            dateOfBirth: "1999-01-21T00:00:00+00:00",
            sexRegisteredAtBirth: "male",
            genderIsSameAsSexRegisteredAtBirth: false,
            ethnicGroup: "asian",
            ethnicBackground: "Pakistani",
            disability: true,
            disabilityDescription: "Prefer not to say",
            healthConditionInterests: ["Aspirin"],
            consentContact: false,
          },
          isSuccess: true,
          errors: [],
          conversationId: null,
          version: 1,
        };
      });
      this.put(`${process.env.REACT_APP_BASE_API}/participants/demographics`, () => {
        return { message: "Success" };
      });
      this.put(`${process.env.REACT_APP_BASE_API}/participants/details`, () => {
        return { message: "Success" };
      });
      this.get(`${process.env.REACT_APP_BASE_API}/referencedata/demographics/ethnicity`, () => {
        return {
          content: {
            asian: {
              longName: "Asian or Asian British",
              shortName: "asian",
              description:
                "Includes any Asian background, for example, Bangladeshi, Chinese, Indian, Pakistani or other South or East Asian",
              backgrounds: ["Bangladeshi", "Chinese", "Indian", "Pakistani"],
            },
            black: {
              longName: "Black, African, Black British or Caribbean",
              shortName: "black",
              description: "Includes any Black background",
              backgrounds: ["African", "Black British", "Caribbean"],
            },
            mixed: {
              longName: "Mixed or multiple ethnic groups",
              shortName: "mixed",
              description: "Includes any Mixed background",
              backgrounds: ["Asian and White", "Black African and White", "Black Caribbean and White"],
            },
            white: {
              longName: "White",
              shortName: "white",
              description: "Includes any White background",
              backgrounds: ["British, English, Northern Irish, Scottish, or Welsh", "Irish", "Irish Traveller", "Roma"],
            },
            other: {
              longName: "Other ethnic group",
              shortName: "other",
              description: "Includes Arab",
              backgrounds: ["Arab"],
            },
          },
          isSuccess: true,
          errors: [],
          conversationId: null,
          version: 1,
        };
      });
      this.get(`${process.env.REACT_APP_BASE_API}/location/postcode/sa11aa`, () => {
        return {
          content: [
            {
              fullAddress: "ROYAL MAIL, SWANSEA MAIL CENTRE, SIEMENS WAY, ABERTAWE, SA1 1AA",
              addressLine1: "ROYAL MAIL SWANSEA MAIL CENTRE",
              addressLine2: "SIEMENS WAY",
              addressLine3: "ABERTAWE",
              addressLine4: null,
              town: "SWANSEA",
              postcode: "SA1 1AA",
            },
            {
              fullAddress: "ROYAL MAIL, SWANSEA MAIL CENTRE, SIEMENS WAY, ABERTAWE, SA1 1AA",
              addressLine1: "ROYAL MAIL SWANSEA MAIL CENTRE",
              addressLine2: "SIEMENS WAY",
              addressLine3: "ABERTAWE",
              addressLine4: null,
              town: "SWANSEA",
              postcode: "SA1 1AA",
            },
          ],
          isSuccess: true,
          errors: [],
          conversationId: null,
          version: 1,
        };
      });
      this.get(`${process.env.REACT_APP_BASE_API}/location/postcode/aa11aa`, () => {
        return {
          content: [],
          isSuccess: true,
          errors: [],
          conversationId: null,
          version: 1,
        };
      });
    },
  });
});

afterEach(() => {
  server.shutdown();
});

describe("UpdateParticipant display tests", () => {
  it("should not have accessibility violations", async () => {
    const { container } = render(<UpdateParticipant />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should render without crashing", async () => {
    const { container } = render(<UpdateParticipant />);

    expect(container).toBeInTheDocument();
  });

  it("should render the correct title", async () => {
    render(<UpdateParticipant />);

    const header = await screen.findByRole("heading", { level: 1 });
    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe("Personal details");
  });

  it("displays the data retrieved from the server correctly", async () => {
    render(<UpdateParticipant />);

    const nameHeader = await screen.findByText("Name");
    expect(nameHeader).toBeInTheDocument();
    const name = await screen.findByText("Miles Budden");
    expect(name).toBeInTheDocument();
    const addressHeader = await screen.findByText("Home address");
    expect(addressHeader).toBeInTheDocument();
    const address = await screen.findByText(/998/i);
    expect(address).toBeInTheDocument();
    const phoneHeader = await screen.findByText("Phone number");
    expect(phoneHeader).toBeInTheDocument();
    const mobileHeader = await screen.findByText(/Mobile/i);
    expect(mobileHeader).toBeInTheDocument();
    const mobile = await screen.findByText(/01234567890/i);
    expect(mobile).toBeInTheDocument();
    const landlineHeader = await screen.findByText(/Landline/i);
    expect(landlineHeader).toBeInTheDocument();
    const landline = await screen.findByText(/09876543210/i);
    expect(landline).toBeInTheDocument();
    const dobHeader = await screen.findByText("Date of birth");
    expect(dobHeader).toBeInTheDocument();
    const dob = await screen.findByText("21 January 1999");
    expect(dob).toBeInTheDocument();

    const sexHeader = await screen.findByText("Sex registered at birth");
    expect(sexHeader).toBeInTheDocument();
    const sex = await screen.findByText("Male");
    expect(sex).toBeInTheDocument();
    const genderHeader = await screen.findByText("Gender identity same as sex registered at birth");
    expect(genderHeader).toBeInTheDocument();
    const gender = await screen.findByText("No");
    expect(gender).toBeInTheDocument();
    const ethnicity1Header = await screen.findByText("Ethnic group");
    expect(ethnicity1Header).toBeInTheDocument();
    const ethnicity1 = await screen.findByText("Asian or Asian British");
    expect(ethnicity1).toBeInTheDocument();
    const ethnicity2Header = await screen.findByText("Ethnic background");
    expect(ethnicity2Header).toBeInTheDocument();
    const ethnicity2 = await screen.findByText("Pakistani");
    expect(ethnicity2).toBeInTheDocument();
    const longTermIllnesHeader = await screen.findByText("Ethnic background");
    expect(longTermIllnesHeader).toBeInTheDocument();
    const longTermIllnes = await screen.findByText("Yes");
    expect(longTermIllnes).toBeInTheDocument();
    const longTermIllnesImpactHeader = await screen.findByText("Reduced ability to carry out daily activities");
    expect(longTermIllnesImpactHeader).toBeInTheDocument();
    const longTermIllnesImpact = await screen.findByText(
      "I would prefer not to say how much my condition reduces my ability to carry out day to day activities"
    );
    expect(longTermIllnesImpact).toBeInTheDocument();
  });

  it("must have the correct amount of change answer buttons", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByRole("button");
    expect(changeButtons[0]).toHaveTextContent("Change name");
    expect(changeButtons[1]).toHaveTextContent("Change home address");
    expect(changeButtons[2]).toHaveTextContent("Change phone number");
    expect(changeButtons[3]).toHaveTextContent("Change date of birth");
    expect(changeButtons[4]).toHaveTextContent("Change sex registered at birth");
    expect(changeButtons[5]).toHaveTextContent("Change gender identity same as sex registered at birth");
    expect(changeButtons[6]).toHaveTextContent("Change ethnic group");
    expect(changeButtons[7]).toHaveTextContent("Change ethnic background");
    expect(changeButtons[8]).toHaveTextContent("Change long-term conditions or illness");
    expect(changeButtons[9]).toHaveTextContent("Change reduced ability to carry out daily activities");
  });
});

describe("Update participant name", () => {
  it("must display the update options", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[0]);
    });
    const header = await screen.findByRole("heading", { level: 1 });
    expect(header).toBeInTheDocument();
    expect(header.textContent?.trim()).toBeTruthy();
    const editorButtons = await screen.findAllByRole("button");
    const firstNameEditor = await screen.findByLabelText("First name");
    const lastNameEditor = await screen.findByLabelText("Last name");

    expect(editorButtons).toHaveLength(2);
    expect(editorButtons[0]).toHaveTextContent("Save");
    expect(editorButtons[1]).toHaveTextContent("Cancel");
    expect(firstNameEditor).toBeInTheDocument();
    expect(firstNameEditor).toHaveValue("Miles");
    expect(lastNameEditor).toBeInTheDocument();
    expect(lastNameEditor).toHaveValue("Budden");
  });

  it("must update the name correctly", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[0]);
    });
    const editorButtons = await screen.findAllByRole("button");
    const firstNameEditor = await screen.findByLabelText("First name");
    const lastNameEditor = await screen.findByLabelText("Last name");
    act(() => {
      fireEvent.change(firstNameEditor, {
        target: { value: "Miles2" },
      });
      fireEvent.change(lastNameEditor, {
        target: { value: "Budden2" },
      });
      fireEvent.click(editorButtons[0]);
    });
    const name = await screen.findByText("Miles2 Budden2");
    expect(name).toBeInTheDocument();
  });

  it("must cancel updating the name correctly", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[0]);
    });
    const editorButtons = await screen.findAllByRole("button");
    act(() => {
      fireEvent.click(editorButtons[1]);
    });
    const name = await screen.findByText("Miles Budden");
    expect(name).toBeInTheDocument();
  });
});

describe("Update participant phone number", () => {
  it("must display the update options", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[2]);
    });
    const header = await screen.findByRole("heading", { level: 1 });
    expect(header).toBeInTheDocument();
    expect(header.textContent?.trim()).toBeTruthy();
    const editorButtons = await screen.findAllByRole("button");
    const mobileEditor = await screen.findByLabelText("Mobile number");
    const landlineEditor = await screen.findByLabelText("Landline number");

    expect(editorButtons).toHaveLength(2);
    expect(editorButtons[0]).toHaveTextContent("Save");
    expect(editorButtons[1]).toHaveTextContent("Cancel");
    expect(mobileEditor).toBeInTheDocument();
    expect(mobileEditor).toHaveValue("01234567890");
    expect(landlineEditor).toBeInTheDocument();
    expect(landlineEditor).toHaveValue("09876543210");
  });

  it("must update both the numbers correctly", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[2]);
    });
    const editorButtons = await screen.findAllByRole("button");
    const mobileEditor = await screen.findByLabelText("Mobile number");
    const landlineEditor = await screen.findByLabelText("Landline number");
    act(() => {
      fireEvent.change(mobileEditor, {
        target: { value: "01357924680" },
      });
      fireEvent.change(landlineEditor, {
        target: { value: "08642975310" },
      });
      fireEvent.click(editorButtons[0]);
    });
    const mobileDetails = await screen.findByText(/Mobile01357924680/);
    const landlineDetails = await screen.findByText(/Landline08642975310/);
    expect(mobileDetails).toBeInTheDocument();
    expect(landlineDetails).toBeInTheDocument();
  });

  it("must update only the mobile correctly", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[2]);
    });
    const editorButtons = await screen.findAllByRole("button");
    const mobileEditor = await screen.findByLabelText("Mobile number");
    const landlineEditor = await screen.findByLabelText("Landline number");
    act(() => {
      fireEvent.change(mobileEditor, {
        target: { value: "01357924680" },
      });
      fireEvent.change(landlineEditor, {
        target: { value: "" },
      });
      fireEvent.click(editorButtons[0]);
    });
    const mobileDetails = await screen.findByText(/Mobile01357924680/);
    const landlineDetails = await screen.queryByText(/Landline/);
    expect(mobileDetails).toBeInTheDocument();
    expect(landlineDetails).not.toBeInTheDocument();
  });

  it("must update only the landline correctly", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[2]);
    });
    const editorButtons = await screen.findAllByRole("button");
    const mobileEditor = await screen.findByLabelText("Mobile number");
    const landlineEditor = await screen.findByLabelText("Landline number");
    act(() => {
      fireEvent.change(mobileEditor, {
        target: { value: "" },
      });
      fireEvent.change(landlineEditor, {
        target: { value: "08642975310" },
      });
      fireEvent.click(editorButtons[0]);
    });
    const landlineDetails = await screen.findByText(/Landline08642975310/);
    const mobileDetails = await screen.queryByText(/Mobile/);
    expect(landlineDetails).toBeInTheDocument();
    expect(mobileDetails).not.toBeInTheDocument();
  });

  it("must clear both the numbers correctly", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[2]);
    });
    const editorButtons = await screen.findAllByRole("button");
    const mobileEditor = await screen.findByLabelText("Mobile number");
    const landlineEditor = await screen.findByLabelText("Landline number");
    act(() => {
      fireEvent.change(mobileEditor, {
        target: { value: "" },
      });
      fireEvent.change(landlineEditor, {
        target: { value: "" },
      });
      fireEvent.click(editorButtons[0]);
    });
    const noNumbers = await screen.findByText("Not provided");
    expect(noNumbers).toBeInTheDocument();
  });

  it("must cancel updating the phone number correctly", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[2]);
    });
    const editorButtons = await screen.findAllByRole("button");
    act(() => {
      fireEvent.click(editorButtons[1]);
    });
    const mobilePhone = await screen.findByText(/01234567890/);
    const landlinePhone = await screen.findByText(/09876543210/);
    expect(mobilePhone).toBeInTheDocument();
    expect(landlinePhone).toBeInTheDocument();
  });
});

describe("Update participant date of birth", () => {
  it("must display the update options", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[3]);
    });
    const header = await screen.findByRole("heading", { level: 1 });
    expect(header).toBeInTheDocument();
    expect(header.textContent?.trim()).toBeTruthy();
    const editorButtons = await screen.findAllByRole("button");
    const dayEditor = await screen.findByLabelText("Day");
    const monthEditor = await screen.findByLabelText("Month");
    const yearEditor = await screen.findByLabelText("Year");

    expect(editorButtons).toHaveLength(2);
    expect(editorButtons[0]).toHaveTextContent("Save");
    expect(editorButtons[1]).toHaveTextContent("Cancel");
    expect(dayEditor).toBeInTheDocument();
    expect(dayEditor).toHaveValue("21");
    expect(monthEditor).toBeInTheDocument();
    expect(monthEditor).toHaveValue("1");
    expect(yearEditor).toBeInTheDocument();
    expect(yearEditor).toHaveValue("1999");
  });

  it("must update the day correctly", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[3]);
    });
    const dayEditor = await screen.findByLabelText("Day");
    fireEvent.change(dayEditor, {
      target: { value: "8" },
    });
    const updateButtons = await screen.findAllByRole("button");
    act(() => {
      fireEvent.click(updateButtons[0]);
    });

    const dob = await screen.findByText("8 January 1999");
    expect(dob).toBeInTheDocument();
  });

  it("must handle the day cancel correctly", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[3]);
    });
    fireEvent.change(screen.getByLabelText("Day", { selector: "input" }), {
      target: { value: "8" },
    });
    const updateButtons = await screen.findAllByRole("button");
    act(() => {
      fireEvent.click(updateButtons[1]);
    });
    const dob = await screen.findByText("21 January 1999");
    expect(dob).toBeInTheDocument();
  });

  it("must update the month correctly", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[3]);
    });
    fireEvent.change(screen.getByLabelText("Month", { selector: "input" }), {
      target: { value: "8" },
    });
    const updateButtons = await screen.findAllByRole("button");
    act(() => {
      fireEvent.click(updateButtons[0]);
    });
    const dob = await screen.findByText("21 August 1999");
    expect(dob).toBeInTheDocument();
  });

  it("must handle the month cancel correctly", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[3]);
    });
    fireEvent.change(screen.getByLabelText("Month", { selector: "input" }), {
      target: { value: "8" },
    });
    const updateButtons = await screen.findAllByRole("button");
    act(() => {
      fireEvent.click(updateButtons[1]);
    });
    const dob = await screen.findByText("21 January 1999");
    expect(dob).toBeInTheDocument();
  });

  it("must update the year correctly", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[3]);
    });
    fireEvent.change(screen.getByLabelText("Year", { selector: "input" }), {
      target: { value: "2000" },
    });
    const updateButtons = await screen.findAllByRole("button");
    act(() => {
      fireEvent.click(updateButtons[0]);
    });
    const dob = await screen.findByText("21 January 2000");
    expect(dob).toBeInTheDocument();
  });

  it("must handle the year cancel correctly", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[3]);
    });
    fireEvent.change(screen.getByLabelText("Year", { selector: "input" }), {
      target: { value: "2000" },
    });
    const updateButtons = await screen.findAllByRole("button");
    act(() => {
      fireEvent.click(updateButtons[1]);
    });
    const dob = await screen.findByText("21 January 1999");
    expect(dob).toBeInTheDocument();
  });
});

describe("Update participant Ethnicity", () => {
  it("must display the Ethnic Group options", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[6]);
    });
    const header = await screen.findByRole("heading", { level: 1 });
    expect(header).toBeInTheDocument();
    expect(header.textContent?.trim()).toBeTruthy();
    expect(
      await screen.findByText(
        "If you change your ethnic group you will also need to change your ethnic background in the next question."
      )
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Once both questions have been answered the changes can be saved.")
    ).toBeInTheDocument();
    const updateGroupButtons = await screen.findAllByRole("button");
    const asianOption = await screen.findByLabelText("Asian or Asian British");
    const blackOption = await screen.findByLabelText("Black, African, Black British or Caribbean");
    const mixedOption = await screen.findByLabelText("Mixed or multiple ethnic groups");
    const whiteOption = await screen.findByLabelText("White");
    const otherOption = await screen.findByLabelText("Other ethnic group");

    expect(asianOption).toBeInTheDocument();
    expect(asianOption).toBeChecked();
    expect(blackOption).toBeInTheDocument();
    expect(blackOption).not.toBeChecked();
    expect(mixedOption).toBeInTheDocument();
    expect(mixedOption).not.toBeChecked();
    expect(whiteOption).toBeInTheDocument();
    expect(whiteOption).not.toBeChecked();
    expect(otherOption).toBeInTheDocument();
    expect(otherOption).not.toBeChecked();
    expect(updateGroupButtons).toHaveLength(2);
    expect(updateGroupButtons[0]).toHaveTextContent("Continue");
    expect(updateGroupButtons[1]).toHaveTextContent("Cancel");
  });

  it("must correctly update a change to the ethnic group and background", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[6]);
    });

    const updateGroupButtons = await screen.findAllByRole("button");
    const asianOption = await screen.findByLabelText("Asian or Asian British");
    const mixedOption = await screen.findByLabelText("Mixed or multiple ethnic groups");

    fireEvent.click(mixedOption);
    expect(asianOption).not.toBeChecked();
    expect(mixedOption).toBeChecked();

    await waitFor(() => {
      fireEvent.click(updateGroupButtons[0]);
    });

    await screen.findByText("Which of the following best describes your Mixed or multiple ethnic groups background?");

    const asianWhiteOption = await screen.findByLabelText("Asian and White");
    const blackAfricanOption = await screen.findByLabelText("Black African and White");
    const blackCaribbeanOption = await screen.findByLabelText("Black Caribbean and White");
    const anotherMixedOption = await screen.findByLabelText("Another mixed background");

    expect(asianWhiteOption).toBeInTheDocument();
    expect(asianWhiteOption).not.toBeChecked();
    expect(blackAfricanOption).toBeInTheDocument();
    expect(blackAfricanOption).not.toBeChecked();
    expect(blackCaribbeanOption).toBeInTheDocument();
    expect(blackCaribbeanOption).not.toBeChecked();
    expect(anotherMixedOption).toBeInTheDocument();
    expect(anotherMixedOption).not.toBeChecked();

    const updateBackgroundButtons = await screen.findAllByRole("button");

    fireEvent.click(blackAfricanOption);
    expect(blackAfricanOption).toBeChecked();

    await waitFor(() => {
      fireEvent.click(updateBackgroundButtons[0]);
    });

    const ethnicGroup = await screen.findByText("Mixed or multiple ethnic groups");
    const ethnicBackground = await screen.findByText("Black African and White");
    expect(ethnicGroup).toBeInTheDocument();
    expect(ethnicBackground).toBeInTheDocument();
  });

  it("must handle the ethnic group cancel correctly", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[6]);
    });

    const mixedOption = await screen.findByLabelText("Mixed or multiple ethnic groups");
    const updateBackgroundButtons = await screen.findAllByRole("button");

    act(() => {
      fireEvent.click(mixedOption);
      fireEvent.click(updateBackgroundButtons[1]);
    });

    const ethnicGroup = await screen.findByText("Asian or Asian British");
    const ethnicBackground = await screen.findByText("Pakistani");
    expect(ethnicGroup).toBeInTheDocument();
    expect(ethnicBackground).toBeInTheDocument();
  });

  it("must handle the ethnic background cancel correctly", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[6]);
    });

    const updateGroupButtons = await screen.findAllByRole("button");
    const mixedOption = await screen.findByLabelText("Mixed or multiple ethnic groups");

    act(() => {
      fireEvent.click(mixedOption);
      fireEvent.click(updateGroupButtons[0]);
    });

    const blackAfricanOption = await screen.findByLabelText("Black African and White");
    const updateBackgroundButtons = await screen.findAllByRole("button");

    act(() => {
      fireEvent.click(blackAfricanOption);
      fireEvent.click(updateBackgroundButtons[1]);
    });

    const ethnicGroup = await screen.findByText("Asian or Asian British");
    const ethnicBackground = await screen.findByText("Pakistani");
    expect(ethnicGroup).toBeInTheDocument();
    expect(ethnicBackground).toBeInTheDocument();
  });
});
describe("Update participant Sex", () => {
  it("must display the Sex options", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[4]);
    });
    const header = await screen.findByRole("heading", { level: 1 });
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Sex and gender identity");
    const updateGroupButtons = await screen.findAllByRole("button");
    const femaleOption = await screen.findByLabelText("Female");
    const maleOption = await screen.findByLabelText("Male");
    const nextQuestion = screen.queryByText("This question is about your sex registered at birth.");

    expect(femaleOption).toBeInTheDocument();
    expect(femaleOption).not.toBeChecked();
    expect(maleOption).toBeInTheDocument();
    expect(maleOption).toBeChecked();
    expect(updateGroupButtons).toHaveLength(2);
    expect(updateGroupButtons[0]).toHaveTextContent("Save");
    expect(updateGroupButtons[1]).toHaveTextContent("Cancel");

    expect(nextQuestion).not.toBeInTheDocument();
  });

  it("must correctly update a change to the sex", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[4]);
    });

    const updateGroupButtons = await screen.findAllByRole("button");
    const femaleOption = await screen.findByLabelText("Female");
    const maleOption = await screen.findByLabelText("Male");

    fireEvent.click(femaleOption);
    expect(maleOption).not.toBeChecked();
    expect(femaleOption).toBeChecked();

    await waitFor(() => {
      fireEvent.click(updateGroupButtons[0]);
    });

    const updatedSex = await screen.findByText("Female");
    expect(updatedSex).toBeInTheDocument();
  });

  it("must handle the sex cancel correctly", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[4]);
    });

    const updateGroupButtons = await screen.findAllByRole("button");
    const femaleOption = await screen.findByLabelText("Female");
    const maleOption = await screen.findByLabelText("Male");

    fireEvent.click(femaleOption);
    expect(maleOption).not.toBeChecked();
    expect(femaleOption).toBeChecked();

    await waitFor(() => {
      fireEvent.click(updateGroupButtons[1]);
    });

    const updatedSex = await screen.findByText("Male");
    expect(updatedSex).toBeInTheDocument();
  });
});

describe("Update participant Gender Identification", () => {
  it("must display the Gender Identification options", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[4]);
    });
    const header = await screen.findByRole("heading", { level: 1 });
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Sex and gender identity");
    const updateGroupButtons = await screen.findAllByRole("button");
    const yesOption = await screen.findByLabelText("Yes");
    const noOption = await screen.findByLabelText("No");
    const preferNotToSayOption = await screen.findByLabelText("Prefer not to say");

    expect(yesOption).toBeInTheDocument();
    expect(yesOption).not.toBeChecked();
    expect(noOption).toBeInTheDocument();
    expect(noOption).toBeChecked();
    expect(preferNotToSayOption).toBeInTheDocument();
    expect(preferNotToSayOption).not.toBeChecked();
    expect(updateGroupButtons).toHaveLength(2);
    expect(updateGroupButtons[0]).toHaveTextContent("Save");
    expect(updateGroupButtons[1]).toHaveTextContent("Cancel");
  });

  // it("must correctly update a change to the Gender Identification", async () => {
  //   render(<UpdateParticipant />);
  //   const changeButtons = await screen.findAllByText("Change");
  //   act(() => {
  //     fireEvent.click(changeButtons[5]);
  //   });

  //   const updateGroupButtons = await screen.findAllByRole("button");
  //   const noOption = await screen.findByLabelText("No");
  //   const yesOption = await screen.findByLabelText("Yes");

  //   fireEvent.click(yesOption);
  //   expect(noOption).not.toBeChecked();
  //   expect(yesOption).toBeChecked();

  //   act(() => {
  //     fireEvent.click(updateGroupButtons[0]);
  //   });

  //   const updatedGenderIdentification = await screen.findAllByText("Yes");
  //   expect(updatedGenderIdentification).toHaveLength(2);
  // });

  it("must handle the Gender Identification cancel correctly", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[4]);
    });

    const updateGroupButtons = await screen.findAllByRole("button");
    const noOption = await screen.findByLabelText("No");
    const yesOption = await screen.findByLabelText("Yes");

    fireEvent.click(yesOption);
    expect(noOption).not.toBeChecked();
    expect(yesOption).toBeChecked();

    await waitFor(() => {
      fireEvent.click(updateGroupButtons[1]);
    });

    const updatedGenderIdentification = await screen.findByText("No");
    expect(updatedGenderIdentification).toBeInTheDocument();
  });
});

describe("Update participant Long Term Illness", () => {
  it("must display the Long Term Illness options", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[8]);
    });
    const header = await screen.findByRole("heading", { level: 1 });
    expect(header).toBeInTheDocument();
    expect(header.textContent?.trim()).toBeTruthy();
    expect(
      await screen.findByText(
        "If Yes, we will ask you a further question about the impact of your conditions or illness. Both questions will need to be answered before your changes can be saved."
      )
    ).toBeInTheDocument();
    const updateIllnessButtons = await screen.findAllByRole("button");
    const yesOption = await screen.findByLabelText("Yes");
    const noOption = await screen.findByLabelText("No");
    const noSayOption = await screen.findByLabelText("Prefer not to say");

    expect(yesOption).toBeInTheDocument();
    expect(yesOption).toBeChecked();
    expect(noOption).toBeInTheDocument();
    expect(noOption).not.toBeChecked();
    expect(noSayOption).toBeInTheDocument();
    expect(noSayOption).not.toBeChecked();
    expect(updateIllnessButtons).toHaveLength(2);
    expect(updateIllnessButtons[0]).toHaveTextContent("Save");
    expect(updateIllnessButtons[1]).toHaveTextContent("Cancel");
  });

  it("must correctly update a change to the Long Term Illness ability", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[8]);
    });

    const updateIllnessButtons = await screen.findAllByRole("button");

    await waitFor(() => {
      fireEvent.click(updateIllnessButtons[0]);
    });

    await screen.findByText(
      "Do any of your conditions or illnesses reduce your ability to carry out day to day activities?"
    );

    const yesALotOption = await screen.findByLabelText("Yes, a lot");
    const yesALittleOption = await screen.findByLabelText("Yes, a little");
    const notAtAllOption = await screen.findByLabelText("Not at all");
    const noSayOption = await screen.findByLabelText("Prefer not to say");

    expect(yesALotOption).toBeInTheDocument();
    expect(yesALotOption).not.toBeChecked();
    expect(yesALittleOption).toBeInTheDocument();
    expect(yesALittleOption).not.toBeChecked();
    expect(notAtAllOption).toBeInTheDocument();
    expect(notAtAllOption).not.toBeChecked();
    expect(noSayOption).toBeInTheDocument();
    expect(noSayOption).toBeChecked();

    const updateAbilityButtons = await screen.findAllByRole("button");

    fireEvent.click(notAtAllOption);
    expect(notAtAllOption).toBeChecked();

    await waitFor(() => {
      fireEvent.click(updateAbilityButtons[0]);
    });

    const longTermIllness = await screen.findByText("Yes");
    const longTermIllnessAbility = await screen.findByText("Not at all");
    expect(longTermIllness).toBeInTheDocument();
    expect(longTermIllnessAbility).toBeInTheDocument();
  });

  it("must correctly update a change to the Long Term Illness to remove the ability", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[8]);
    });

    const updateIllnessButtons = await screen.findAllByRole("button");
    const noSayOption = await screen.findByLabelText("Prefer not to say");

    fireEvent.click(noSayOption);
    await waitFor(() => {
      fireEvent.click(updateIllnessButtons[0]);
    });

    const longTermIllness = await screen.findByText("Prefer not to say");
    const longTermIllnesImpactHeader = screen.queryByText("Reduced ability to carry out daily activities");
    expect(longTermIllness).toBeInTheDocument();
    expect(longTermIllnesImpactHeader).not.toBeInTheDocument();
  });

  it("must handle the Long Term Illness cancel correctly where initial is Yes", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[8]);
    });

    const noOption = await screen.findByLabelText("No");
    const updateIllnessButtons = await screen.findAllByRole("button");

    act(() => {
      fireEvent.click(noOption);
      fireEvent.click(updateIllnessButtons[1]);
    });

    const longTermIllness = await screen.findByText("Yes");
    const longTermIllnessAbility = await screen.findByText(
      "I would prefer not to say how much my condition reduces my ability to carry out day to day activities"
    );
    expect(longTermIllness).toBeInTheDocument();
    expect(longTermIllnessAbility).toBeInTheDocument();
  });

  it("must handle the Long Term Illness cancel correctly where initial is No", async () => {
    server.get(`${process.env.REACT_APP_BASE_API}/participants/:userID/demographics`, () => {
      return {
        content: {
          mobileNumber: "01234567890",
          landlineNumber: "09876543210",
          address: {
            addressLine1: "998 What Street",
            addressLine2: "Dtoke Villaget",
            addressLine3: null,
            addressLine4: null,
            town: "Slough Town",
            postcode: "ER4 9PL",
          },
          dateOfBirth: "1999-01-21T00:00:00+00:00",
          sexRegisteredAtBirth: "male",
          genderIsSameAsSexRegisteredAtBirth: true,
          ethnicGroup: "asian",
          ethnicBackground: "Pakistani",
          disability: false,
          disabilityDescription: undefined,
          healthConditionInterests: ["Aspirin"],
          consentContact: false,
        },
        isSuccess: true,
        errors: [],
        conversationId: null,
        version: 1,
      };
    });
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[8]);
    });

    const yesOption = await screen.findByLabelText("Yes");
    const updateIllnessButtons = await screen.findAllByRole("button");

    act(() => {
      fireEvent.click(yesOption);
      fireEvent.click(updateIllnessButtons[1]);
    });

    const longTermIllness = await screen.findByText("No");
    expect(longTermIllness).toBeInTheDocument();
  });

  it("must handle the Long Term Illness ability cancel correctly where intial is Yes", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[8]);
    });

    const updateIllnessButtons = await screen.findAllByRole("button");

    await waitFor(() => {
      fireEvent.click(updateIllnessButtons[0]);
    });

    const notAtAllOption = await screen.findByLabelText("Not at all");
    const updateAbilityButtons = await screen.findAllByRole("button");

    fireEvent.click(notAtAllOption);

    await waitFor(() => {
      fireEvent.click(updateAbilityButtons[1]);
    });

    const longTermIllness = await screen.findByText("Yes");
    const longTermIllnessAbility = await screen.findByText(
      "I would prefer not to say how much my condition reduces my ability to carry out day to day activities"
    );
    expect(longTermIllness).toBeInTheDocument();
    expect(longTermIllnessAbility).toBeInTheDocument();
  });

  it("must handle the Long Term Illness ability cancel correctly where intial is No and Changed to Yes", async () => {
    server.get(`${process.env.REACT_APP_BASE_API}/participants/:userID/demographics`, () => {
      return {
        content: {
          mobileNumber: "01234567890",
          landlineNumber: "09876543210",
          address: {
            addressLine1: "ROYAL MAIL SWANSEA MAIL CENTRE",
            addressLine2: "SIEMENS WAY",
            addressLine3: "ABERTAWE",
            addressLine4: null,
            town: "SWANSEA",
            postcode: "SA1 1AA",
          },
          dateOfBirth: "1999-01-21T00:00:00+00:00",
          sexRegisteredAtBirth: "male",
          genderIsSameAsSexRegisteredAtBirth: true,
          ethnicGroup: "asian",
          ethnicBackground: "Pakistani",
          disability: false,
          disabilityDescription: undefined,
          healthConditionInterests: ["Aspirin"],
          consentContact: false,
        },
        isSuccess: true,
        errors: [],
        conversationId: null,
        version: 1,
      };
    });
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[8]);
    });

    const yesOption = await screen.findByLabelText("Yes");
    const updateIllnessButtons = await screen.findAllByRole("button");

    await waitFor(() => {
      fireEvent.click(yesOption);
      fireEvent.click(updateIllnessButtons[0]);
    });

    const notAtAllOption = await screen.findByLabelText("Not at all");
    const updateAbilityButtons = await screen.findAllByRole("button");

    fireEvent.click(notAtAllOption);

    await waitFor(() => {
      fireEvent.click(updateAbilityButtons[1]);
    });

    const longTermIllness = await screen.findByText("No");
    expect(longTermIllness).toBeInTheDocument();
  });
});

describe("Update participant address", () => {
  it("must display the update options", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[1]);
    });
    const header = await screen.findByRole("heading", { level: 1 });
    expect(header).toBeInTheDocument();
    expect(header.textContent?.trim()).toBeTruthy();
    const editorButtons = await screen.findAllByRole("button");
    const postCodeEditor = await screen.findByLabelText("Postcode");

    expect(editorButtons).toHaveLength(3);
    expect(editorButtons[0].textContent?.trim()).toBeTruthy();
    expect(editorButtons[1].textContent?.trim()).toBeTruthy();
    expect(editorButtons[2].textContent?.trim()).toBeTruthy();
    expect(postCodeEditor).toBeInTheDocument();
    expect(postCodeEditor).toHaveValue("ER4 9PL");
  });

  it("must allow update of located address correctly", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[1]);
    });
    const editorButtons = await screen.findAllByRole("button");
    const postCodeEditor = await screen.findByLabelText("Postcode");

    fireEvent.change(postCodeEditor, {
      target: { value: "sa11aa" },
    });

    await waitFor(() => {
      fireEvent.click(editorButtons[0]);
    });

    const addressLookup = await screen.findByLabelText("Select your address");
    const addressLookupButtons = await screen.findAllByRole("button");

    expect(addressLookupButtons).toHaveLength(4);
    expect(addressLookupButtons[0]).toHaveTextContent("Change");
    expect(addressLookupButtons[1]).toHaveTextContent("Enter your address manually");
    expect(addressLookupButtons[2]).toHaveTextContent("Save");
    expect(addressLookupButtons[3]).toHaveTextContent("Cancel");

    fireEvent.change(addressLookup, {
      target: { value: "1" },
    });

    act(() => {
      fireEvent.click(addressLookupButtons[2]);
    });
    const updatedAddress = await screen.findByText(/Royal Mail Swansea Mail Centre/);
    expect(updatedAddress).toBeInTheDocument();
  });

  it("must allow update of manually entered address correctly", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[1]);
    });
    const editorButtons = await screen.findAllByRole("button");

    await waitFor(() => {
      fireEvent.click(editorButtons[2]);
    });

    const addressEditor1 = await screen.findByLabelText("Address line 1");
    const addressEditor2 = await screen.findByLabelText("Address line 2 (optional)");
    const addressEditor3 = await screen.findByLabelText("Address line 3 (optional)");
    const addressEditor4 = await screen.findByLabelText("Address line 4 (optional)");
    const townEditor = await screen.findByLabelText("Town");
    const postCodeEditor = await screen.findByLabelText("Postcode");
    const manualAddressButtons = await screen.findAllByRole("button");

    expect(manualAddressButtons).toHaveLength(3);
    expect(manualAddressButtons[0]).toHaveTextContent("Find your address by postcode");
    expect(manualAddressButtons[1]).toHaveTextContent("Save");
    expect(manualAddressButtons[2]).toHaveTextContent("Cancel");

    fireEvent.change(addressEditor1, {
      target: { value: "manual address 1" },
    });
    fireEvent.change(addressEditor2, {
      target: { value: "manual address 2" },
    });
    fireEvent.change(addressEditor3, {
      target: { value: "manual address 3" },
    });
    fireEvent.change(addressEditor4, {
      target: { value: "manual address 4" },
    });
    fireEvent.change(townEditor, {
      target: { value: "manual town" },
    });
    fireEvent.change(postCodeEditor, {
      target: { value: "CT25PG" },
    });

    await waitFor(() => {
      fireEvent.click(manualAddressButtons[1]);
    });

    const updatedAddress1 = await screen.findByText(/Manual Address 1/);
    const updatedAddress2 = await screen.findByText(/Manual Address 2/);
    const updatedAddress3 = await screen.findByText(/Manual Address 3/);
    const updatedAddress4 = await screen.findByText(/Manual Address 4/);
    const updatedTown = await screen.findByText(/Manual Town/);
    const updatedPostCode = await screen.findByText(/CT25PG/);
    expect(updatedAddress1).toBeInTheDocument();
    expect(updatedAddress2).toBeInTheDocument();
    expect(updatedAddress3).toBeInTheDocument();
    expect(updatedAddress4).toBeInTheDocument();
    expect(updatedTown).toBeInTheDocument();
    expect(updatedPostCode).toBeInTheDocument();
  });

  it("must display a no-found postcode error correctly", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[1]);
    });
    const editorButtons = await screen.findAllByRole("button");
    const postCodeEditor = await screen.findByLabelText("Postcode");

    fireEvent.change(postCodeEditor, {
      target: { value: "aa11aa" },
    });

    await waitFor(() => {
      fireEvent.click(editorButtons[0]);
    });

    const errorHeader = await screen.findByText("There is a problem");
    const errorContent = await screen.findByText(
      "We cannot find a match for the postcode entered. Please try again or enter your address manually."
    );
    expect(errorHeader).toBeInTheDocument();
    expect(errorContent).toBeInTheDocument();
  });

  it("must cancel update on postcode search correctly", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[1]);
    });
    const editorButtons = await screen.findAllByRole("button");
    act(() => {
      fireEvent.click(editorButtons[1]);
    });
    const address = await screen.findByText(/998/i);
    expect(address).toBeInTheDocument();
  });

  it("must cancel update on postcode search result correctly", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[1]);
    });
    const editorButtons = await screen.findAllByRole("button");
    const postCodeEditor = await screen.findByLabelText("Postcode");

    fireEvent.change(postCodeEditor, {
      target: { value: "aa11aa" },
    });

    await waitFor(() => {
      fireEvent.click(editorButtons[1]);
    });
    const address = await screen.findByText(/998/i);
    expect(address).toBeInTheDocument();
  });

  it("must cancel update on manual address entry correctly", async () => {
    render(<UpdateParticipant />);

    const changeButtons = await screen.findAllByText("Change");
    act(() => {
      fireEvent.click(changeButtons[1]);
    });
    const editorButtons = await screen.findAllByRole("button");

    await waitFor(() => {
      fireEvent.click(editorButtons[2]);
    });

    const manualAddressButtons = await screen.findAllByRole("button");
    await waitFor(() => {
      fireEvent.click(manualAddressButtons[2]);
    });

    const address = await screen.findByText(/998/i);
    expect(address).toBeInTheDocument();
  });
});

describe("Update participant analytics", () => {
  it("must send the correct data", async () => {
    render(<UpdateParticipant />);

    await waitFor(
      () => {
        expect(ReactGA.testModeAPI.calls).toEqual([
          ["send", { hitType: "pageview", page: "/MyAccount/PersonalDetails" }],
        ]);
      },
      { timeout: 1000 }
    );
  });
});
