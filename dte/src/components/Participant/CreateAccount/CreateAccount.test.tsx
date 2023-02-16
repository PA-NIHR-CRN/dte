import { render } from "../../../Helper/test-utils";
import "@testing-library/jest-dom";
import CreateAccount from "./CreateAccount";

describe("CreateAccount", () => {
  it("renders", () => {
    render(<CreateAccount />);
  });
});
