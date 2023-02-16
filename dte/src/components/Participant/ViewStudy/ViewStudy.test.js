// import { render, screen } from "@testing-library/react";
import { shallow } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import ViewStudy from "./ViewStudy";

describe("ViewStudy Component Tests", () => {
  test("ViewStudy renders without crashing", () => {
    shallow(
      <MemoryRouter>
        <ViewStudy />
      </MemoryRouter>
    );
  });
});
