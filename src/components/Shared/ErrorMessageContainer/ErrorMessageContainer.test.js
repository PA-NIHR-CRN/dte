// import { render, screen } from "@testing-library/react";
import { shallow } from "enzyme";
import ErrorMessageContainer from "./ErrorMessageContainer";

describe("ErrorMessageContainer Component Tests", () => {
  test("ErrorMessageContainer renders without crashing", () => {
    shallow(<ErrorMessageContainer />);
  });
});
