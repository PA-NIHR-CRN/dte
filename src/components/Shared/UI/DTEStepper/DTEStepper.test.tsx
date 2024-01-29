import { axe, toHaveNoViolations } from "jest-axe";
import { render } from "../../../../Helper/test-utils";
import DTEStepper, { LinearProgressPropsData } from "./DTEStepper";

expect.extend(toHaveNoViolations);

describe("DTEStepper", () => {
  it("is accessible", async () => {
    const LinearProps: LinearProgressPropsData = {
      "aria-label": "Registration",
    };
    const { container } = render(
      <DTEStepper backButton={<></>} nextButton={<></>} steps={5} LinearProgressProps={LinearProps} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
