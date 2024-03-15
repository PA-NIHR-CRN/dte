import { axe, toHaveNoViolations } from "jest-axe";
import { createServer, Server } from "miragejs";
import { render, screen, waitFor, waitForElementToBeRemoved } from "../../../Helper/test-utils";
import Home from "./Home";

expect.extend(toHaveNoViolations);

let server: Server;

beforeEach(() => {
  server = createServer({
    routes() {
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
    },
  });
});

afterEach(() => {
  server.shutdown();
});

describe("Accessibility test", () => {
  it("must not fail any accessibility tests", async () => {
    const { container } = render(<Home />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("Home screen render tests", () => {
  it("must display the correct information", async () => {
    render(<Home />);

    await waitForElementToBeRemoved(await screen.findByText(/Loading.../));

    const header = await screen.findByRole("heading", { level: 1 });
    const links = await screen.findAllByRole("link");

    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("My account");
    expect(links).toHaveLength(7);
    expect(links[0]).toHaveAttribute("aria-label", "Opens in new tab");
    expect(links[0]).toHaveAttribute("href", "/Participants/AccountSettings");
    expect(links[0]).toHaveTextContent("Account settings");
    expect(links[1]).toHaveAttribute("aria-label", "Opens in new tab");
    expect(links[1]).toHaveAttribute("href", "/Participants/ResearchAreas");
    expect(links[1]).toHaveTextContent("Areas of research");
    expect(links[2]).toHaveAttribute("aria-label", "Opens in new tab");
    expect(links[2]).toHaveAttribute("href", "/Participants/MyDetails");
    expect(links[2]).toHaveTextContent("Personal details");
    expect(links[3]).toHaveAttribute(
      "href",
      "https://bepartofresearch.nihr.ac.uk/results/search-results?query=&location="
    );
    expect(links[3]).toHaveAttribute("aria-label", "Opens in new tab");
    expect(links[3]).toHaveAttribute("target", "_blank");
    expect(links[3]).toHaveTextContent("Search for studies on Be Part of Research");
    expect(links[4]).toHaveAttribute("aria-label", "Opens in new tab");
    expect(links[4]).toHaveAttribute("href", "/Participants/BePartOfResearchNewsletter");
    expect(links[4]).toHaveTextContent("Be Part of Research Newsletter");
    expect(links[5]).toHaveAttribute("aria-label", "Opens in new tab");
    expect(links[5]).toHaveAttribute("href", "/Participants/CloseAccount");
    expect(links[5]).toHaveTextContent("Close your account");
    expect(links[6]).toHaveAttribute("aria-label", "Opens in new tab");
    expect(links[6]).toHaveAttribute("href", "/logout");
    expect(links[6]).toHaveTextContent("Sign out");
  });
});
