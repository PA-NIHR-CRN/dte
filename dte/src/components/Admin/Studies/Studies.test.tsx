/* eslint-disable import/no-extraneous-dependencies */
import { axe, toHaveNoViolations } from "jest-axe";
import { render, screen } from "../../../Helper/test-utils";
import "@testing-library/jest-dom";
import Studies from "./Studies";

expect.extend(toHaveNoViolations);

describe("Studies", () => {
  it("should render", () => {
    render(<Studies />);
  });
});

describe("Studies setup tests", () => {
  it("should render without crashing", async () => {
    const { container } = render(<Studies />);
    expect(container).toBeInTheDocument();
  });

  it("should contain a study requests title", async () => {
    render(<Studies />);
    const StudiesTitle = screen.getByText("Studies");
    expect(StudiesTitle).toBeInTheDocument();
  });

  it("should contain a study requests button", async () => {
    render(<Studies />);
    const StudiesButton = screen.getByText("Study requests");
    expect(StudiesButton).toBeInTheDocument();
  });

  it("should contain an active studies button", async () => {
    render(<Studies />);
    const activeStudiesButton = screen.getByText("Active studies");
    expect(activeStudiesButton).toBeInTheDocument();
  });

  it("should contain a declined requests button", async () => {
    render(<Studies />);
    const declinedRequestsButton = screen.getByText("Declined requests");
    expect(declinedRequestsButton).toBeInTheDocument();
  });
});

describe("Accessibility test", () => {
  it("should not fail any accessibility tests", async () => {
    const { container } = render(<Studies />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
