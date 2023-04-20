// import { render, screen } from "@testing-library/react";
import { shallow } from "enzyme";
import Unauthorized from "./Unauthorized";

describe("Unauthorized Component Tests", () => {
  test("Unauthorized renders without crashing", () => {
    shallow(<Unauthorized />);
  });
});
