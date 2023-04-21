// import { render, screen } from "@testing-library/react";
import { shallow } from "enzyme";
import PageNotFound from "./PageNotFound";

describe("PageNotFound Component Tests", () => {
  test("PageNotFound renders without crashing", () => {
    shallow(<PageNotFound />);
  });
});
