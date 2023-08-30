import { render, screen, userEvent } from "../../../Helper/test-utils";
import Honeypot from "./Honeypot";

const mockPush = jest.fn();
const mockListen = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockPush,
    listen: mockListen,
  }),
}));

describe("Honeypot Component", () => {
  it("renders a hidden input field", () => {
    render(<Honeypot />);

    const input = screen.getByRole("textbox", { hidden: true });
    expect(input).toBeInTheDocument();
    expect(input).toHaveStyle("position: absolute");
    expect(input).toHaveStyle("left: -9999px");
  });

  it("has the correct name attribute", () => {
    render(<Honeypot />);
    const input = screen.getByRole("textbox", { hidden: true });
    expect(input).toHaveAttribute("name", "faxNumber");
  });

  it("has the correct tabIndex and aria-hidden attributes", () => {
    render(<Honeypot />);
    const input = screen.getByRole("textbox", { hidden: true });
    expect(input).toHaveAttribute("tabIndex", "-1");
    expect(input).toHaveAttribute("aria-hidden", "true");
  });

  it("redirects to root path when the honeypot field is filled", () => {
    render(<Honeypot />);

    const input = screen.getByRole("textbox", { hidden: true });
    userEvent.type(input, "bot-input");

    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("doesn't redirect if the honeypot field is untouched", () => {
    render(<Honeypot />);
    expect(mockPush).not.toHaveBeenCalled();
  });
});
