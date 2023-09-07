import "@testing-library/jest-dom";

import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "./Helper/translations";
import { fetchContent } from "./Helper/contenful/contentHandler";

jest.mock("react-ga", () => ({
  initialize: jest.fn(),
  pageview: jest.fn(),
}));

jest.mock("react-gtm-module", () => ({
  initialize: jest.fn(),
}));

jest.mock("react-hotjar", () => ({
  initialize: jest.fn(),
}));

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
