import "@testing-library/jest-dom";

import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "./Helper/translations";
import { screen, waitFor } from "./Helper/test-utils";

beforeAll(() => {
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
