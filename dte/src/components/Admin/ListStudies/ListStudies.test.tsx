import { render } from "../../../Helper/test-utils";
import "@testing-library/jest-dom";
import ListStudies from "./ListStudies";

describe("ListStudies", () => {
  it("renders", async () => {
    render(<ListStudies />);
  });
});
