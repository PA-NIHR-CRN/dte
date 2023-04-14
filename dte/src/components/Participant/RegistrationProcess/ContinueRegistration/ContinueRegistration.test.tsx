import { axe, toHaveNoViolations } from "jest-axe";
import { createServer, Server } from "miragejs";
import ReactGA from "react-ga";
import { render, screen, waitFor } from "../../../../Helper/test-utils";
import "@testing-library/jest-dom";
import ContinueRegistration from "./ContinueRegistration";

expect.extend(toHaveNoViolations);

let server: Server;
beforeAll(() => {
  ReactGA.initialize("UA-XXXXX-Y", { testMode: true });
  expect(ReactGA.testModeAPI.calls).toEqual([["create", "UA-XXXXX-Y", "auto"]]);
});

beforeEach(() => {
  ReactGA.testModeAPI.resetCalls();
  server = createServer({
    routes() {
      this.get(
        `${process.env.REACT_APP_BASE_API}/referencedata/demographics/ethnicity`,
        () => {
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
                backgrounds: [
                  "Asian and White",
                  "Black African and White",
                  "Black Caribbean and White",
                ],
              },
              white: {
                longName: "White",
                shortName: "white",
                description: "Includes any White background",
                backgrounds: [
                  "British, English, Northern Irish, Scottish, or Welsh",
                  "Irish",
                  "Irish Traveller",
                  "Roma",
                ],
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
        }
      );
      this.get(`${process.env.REACT_APP_BASE_API}/participants/consent`, () => {
        return {
          content: true,
        };
      });
      this.post(`${process.env.REACT_APP_BASE_API}/users/nhssignup`, () => {
        return {
          content: {
            userConsent: true,
          },
        };
      });
    },
  });
});

afterEach(() => {
  server.shutdown();
});

describe("ContinueRegistration", () => {
  it("should render", () => {
    render(<ContinueRegistration />);
  });
});

describe("Accessibility test", () => {
  it("should not fail any accessibility tests", async () => {
    const { container } = render(<ContinueRegistration />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  test("progress bar marked as aria hidden", async () => {
    render(<ContinueRegistration />);
    const progressText = await screen.findByText("36% complete");
    expect(progressText).toBeInTheDocument();
    expect(progressText).toHaveAttribute("aria-hidden", "true");
  });
});

describe("Continue registration analytics", () => {
  it("must send the correct data", async () => {
    render(<ContinueRegistration />);

    await waitFor(
      () => {
        expect(ReactGA.testModeAPI.calls).toEqual([
          ["send", { hitType: "pageview", page: "/registration/address" }],
        ]);
      },
      { timeout: 1000 }
    );
  });
});
