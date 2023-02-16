import { render } from "../../../Helper/test-utils";
import "@testing-library/jest-dom";
import ParticipantsHome from "./ParticipantsHome";

describe("ParticipantsHome Component Tests", () => {
  it("renders", () => {
    render(<ParticipantsHome />);
  });
});
