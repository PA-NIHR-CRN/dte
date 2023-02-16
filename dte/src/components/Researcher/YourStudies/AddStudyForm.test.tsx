import { axe, toHaveNoViolations } from "jest-axe";
import { render } from "../../../Helper/test-utils";
import AddStudyForm from "./AddStudyForm";

expect.extend(toHaveNoViolations);

describe("Test suite for Add Study Form component", () => {
  it("should fail any accessibility tests with no configuration", async () => {
    const { container } = render(<AddStudyForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
