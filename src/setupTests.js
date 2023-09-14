import "@testing-library/jest-dom";

import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "./Helper/translations";
import { fetchContent } from "./Helper/contenful/contentHandler";

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

beforeAll(async () => {
  await fetchContent();
  window.nhsapp = {
    tools: {
      isOpenInNHSApp: jest.fn().mockReturnValue(false),
    },
    navigation: {
      openBrowserOverlay: jest.fn(),
      goToHomepage: jest.fn(),
      goToPage: jest.fn(),
      HOME_PAGE: 0,
    },
  };
});

configure({ adapter: new Adapter() });
