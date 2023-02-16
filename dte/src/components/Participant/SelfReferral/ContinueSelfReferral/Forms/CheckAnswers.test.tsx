import {
  render,
  screen,
  waitFor,
  fireEvent,
} from "../../../../../Helper/test-utils";
import "@testing-library/jest-dom";
import CheckAnswers from "./CheckAnswers";

test("renders without error", async () => {
  const mockChangeStep = jest.fn();
  render(
    <CheckAnswers
      initialStateData={{
        questionnaireData: [
          {
            question: {
              question: "This is a question",
              index: 1,
              flags: [],
              answers: [],
            },
            answer: "This is the answer",
          },
        ],
        consentData: {
          consent: false,
        },
        selectedSiteData: {
          studyId: 12343,
          identifier: "NV178@2.16.840.1.113883.2.1.3.2.4.18.48",
          name: "KINGS COLLEGE HOSPITAL",
          studySiteStatus: "InSetup",
          addressLine1: "MAPOTHER HOUSE",
          addressLine2: "DE CRESPIGNY PARK",
          addressLine3: "DENMARK HILL",
          addressLine4: "LONDON",
          addressLine5: "GREATER LONDON",
          postcode: "SE5 8AB",
        },
      }}
      changeStep={mockChangeStep}
      studyTitle="This is the study title"
    />
  );

  expect(screen.getByText(/KINGS COLLEGE HOSPITAL/)).toBeInTheDocument();
  expect(screen.getByText("This is the study title")).toBeInTheDocument();
});

test("allows the user to change an answer", async () => {
  const mockChangeStep = jest.fn();
  render(
    <CheckAnswers
      initialStateData={{
        questionnaireData: [
          {
            question: {
              question: "This is a question",
              index: 1,
              flags: [],
              answers: [],
            },
            answer: "This is the answer",
          },
        ],
        consentData: {
          consent: false,
        },
        selectedSiteData: {
          studyId: 12343,
          identifier: "NV178@2.16.840.1.113883.2.1.3.2.4.18.48",
          name: "KINGS COLLEGE HOSPITAL",
          studySiteStatus: "InSetup",
          addressLine1: "MAPOTHER HOUSE",
          addressLine2: "DE CRESPIGNY PARK",
          addressLine3: "DENMARK HILL",
          addressLine4: "LONDON",
          addressLine5: "GREATER LONDON",
          postcode: "SE5 8AB",
        },
      }}
      changeStep={mockChangeStep}
      studyTitle="This is the study title"
    />
  );

  const changeButton = screen.getAllByText("Change")[0];
  fireEvent.click(changeButton);
  await waitFor(() => {
    expect(mockChangeStep).toHaveBeenCalledWith(0);
  });
});
