import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { render } from "../../../Helper/test-utils";
import ParticipantAccount from "./ParticipantAccount";

describe("ParticipantAccount Component Tests", () => {
  it("renders", () => {
    render(
      <MemoryRouter>
        <ParticipantAccount />
      </MemoryRouter>
    );
  });
});
