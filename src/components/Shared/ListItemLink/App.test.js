// import { render, screen } from "@testing-library/react";
import { shallow } from "enzyme";
import ListItemLink from "./ListItemLink";

describe("ListItemLink Component Tests", () => {
  test("ListItemLink renders without crashing", () => {
    shallow(<ListItemLink />);
  });
});
