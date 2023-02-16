import {
  render,
  fireEvent,
  screen,
  waitFor,
} from "../../../../../Helper/test-utils";
import "@testing-library/jest-dom";
import SelectSite from "./SelectSite";

test("loads and displays list of sites", async () => {
  const mockOnDataChange = jest.fn();
  render(
    <SelectSite
      initialStateData={{
        identifier: "",
        name: "",
        addressLine1: "",
        addressLine2: "",
        addressLine3: "",
        addressLine4: "",
        addressLine5: "",
        postcode: "",
      }}
      onSubmit={mockOnDataChange}
      sites={[
        {
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
        {
          studyId: 12343,
          identifier: "RX1RA@2.16.840.1.113883.2.1.3.2.4.18.48",
          name: "Nottingham University Hospitals NHS Trust - Queen's Medical Centre Campus",
          studySiteStatus: "InSetup",
          addressLine1: "NOTTINGHAM UNIVERSITY HOSPITAL",
          addressLine2: "DERBY ROAD",
          addressLine3: null,
          addressLine4: "NOTTINGHAM",
          addressLine5: "NOTTINGHAMSHIRE",
          postcode: "NG7 2UH",
        },
      ]}
    />
  );
});

test("submits when choosing an option and clicking submit", async () => {
  const mockOnDataChange = jest.fn();
  render(
    <SelectSite
      initialStateData={{
        identifier: "",
        name: "",
        addressLine1: "",
        addressLine2: "",
        addressLine3: "",
        addressLine4: "",
        addressLine5: "",
        postcode: "",
      }}
      onSubmit={mockOnDataChange}
      sites={[
        {
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
        {
          studyId: 12343,
          identifier: "RX1RA@2.16.840.1.113883.2.1.3.2.4.18.48",
          name: "Nottingham University Hospitals NHS Trust - Queen's Medical Centre Campus",
          studySiteStatus: "InSetup",
          addressLine1: "NOTTINGHAM UNIVERSITY HOSPITAL",
          addressLine2: "DERBY ROAD",
          addressLine3: null,
          addressLine4: "NOTTINGHAM",
          addressLine5: "NOTTINGHAMSHIRE",
          postcode: "NG7 2UH",
        },
      ]}
    />
  );
  fireEvent.click(
    screen.getByDisplayValue("RX1RA@2.16.840.1.113883.2.1.3.2.4.18.48")
  );
  expect(
    screen.getByDisplayValue("RX1RA@2.16.840.1.113883.2.1.3.2.4.18.48")
  ).toBeChecked();
  fireEvent.click(screen.getByText(/continue/i));
  await waitFor(() =>
    expect(mockOnDataChange).toHaveBeenCalledWith({
      studyId: 12343,
      identifier: "RX1RA@2.16.840.1.113883.2.1.3.2.4.18.48",
      name: "Nottingham University Hospitals NHS Trust - Queen's Medical Centre Campus",
      studySiteStatus: "InSetup",
      addressLine1: "NOTTINGHAM UNIVERSITY HOSPITAL",
      addressLine2: "DERBY ROAD",
      addressLine3: null,
      addressLine4: "NOTTINGHAM",
      addressLine5: "NOTTINGHAMSHIRE",
      postcode: "NG7 2UH",
    })
  );
});
