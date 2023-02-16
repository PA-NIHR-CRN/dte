// import { render, screen } from "@testing-library/react";
import { shallow } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import ViewStudyDetails from "./ViewStudyDetails";

describe("ViewStudyDetails Component Tests", () => {
  test("ViewStudyDetails renders without crashing", () => {
    shallow(
      <MemoryRouter>
        <ViewStudyDetails />
      </MemoryRouter>
    );
  });
});
