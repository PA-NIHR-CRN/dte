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

    expect(screen.getByRole("heading", { name: "Welcome to Be Part of Research" })).toBeInTheDocument();
    expect(
      screen.getByText("Be Part of Research enables you to find and take part in a range of health and care research.")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Health research helps to discover new and better ways to treat diseases, improve the NHS and the quality of care across the country."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Anyone can take part in research whether you have a health condition or not. You could take part in research at a local hospital, GP practice – or even at home."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "It's easy to get involved. Simply sign up online and choose the health conditions you are interested in. You will be sent details of approved studies that match your interests to decide if you want to take part."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("More information about registering with Be Part of Research")).toBeInTheDocument();
    expect(screen.getByText("Start now")).toBeInTheDocument();
    expect(screen.getByText(/If you already have an account, you can/i)).toBeInTheDocument();
  });

  it("should open the accordion with text Find out more about Be Part of Research", async () => {
    render(<NhsPreRegistration />);

    expect(screen.getByText(/Find out more information about registering your account with/)).not.toBeVisible();

    expect(screen.getByText(/. Please use the back button on your device to return to this page./)).not.toBeVisible();

    screen.getByText("More information about registering with Be Part of Research").click();

    expect(screen.getByText(/Find out more information about registering your account with/)).toBeVisible();

    expect(screen.getByText(/. Please use the back button on your device to return to this page./)).toBeVisible();
    const links = await screen.findAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", "https://bepartofresearch.nihr.ac.uk/volunteer-service/");
    expect(links[0]).toHaveAttribute("target", "_blank");
    expect(links[0]).toHaveAttribute("aria-label", "Opens in new tab");
    expect(links[0]).toHaveTextContent("Be Part of Research");
  });
});
