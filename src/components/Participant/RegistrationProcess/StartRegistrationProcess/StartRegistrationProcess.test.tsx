import { axe, toHaveNoViolations } from "jest-axe";
import { render, screen } from "../../../../Helper/test-utils";
import "@testing-library/jest-dom";

import StartRegistrationProcess from "./StartRegistrationProcess";

expect.extend(toHaveNoViolations);

describe("StartRegistrationProcess accessibility tests", () => {
  it("is accessible", async () => {
    const { container } = render(<StartRegistrationProcess />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("StartRegistrationProcess functionality tests", () => {
  it("should render without crashing", async () => {
    render(<StartRegistrationProcess />);

    expect(screen.getByText("Register with Be Part of Research")).toBeInTheDocument();
  });
});
