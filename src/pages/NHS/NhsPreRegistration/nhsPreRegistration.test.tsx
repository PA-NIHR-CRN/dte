import { axe, toHaveNoViolations } from "jest-axe";
import { render, screen } from "../../../Helper/test-utils";
import "@testing-library/jest-dom";

import NhsPreRegistration from "./index";

expect.extend(toHaveNoViolations);

describe("NhsPreRegistration accessibility tests", () => {
  it("is accessible", async () => {
    const { container } = render(<NhsPreRegistration />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("NhsPreRegistration functionality tests", () => {
  it("should render without crashing", async () => {
    render(<NhsPreRegistration />);

    expect(screen.getByRole("heading", { level: 1 }).textContent?.trim()).toBeTruthy();
    expect(screen.getByText("More information about registering with Be Part of Research")).toBeInTheDocument();
    expect(screen.getByText("Start now")).toBeInTheDocument();
    expect(screen.getByText(/If you already have an account, you can/i)).toBeInTheDocument();
  });
});
