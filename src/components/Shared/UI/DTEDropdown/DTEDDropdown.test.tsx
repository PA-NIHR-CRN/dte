import { axe, toHaveNoViolations } from "jest-axe";
import { render, screen, fireEvent } from "../../../../Helper/test-utils";
import DTEDropdown, { DTEDropdownItem } from "./DTEDropdown";

expect.extend(toHaveNoViolations);

describe("DTEDropdown accessiblity tests", () => {
  it("should be accessible", async () => {
    const mockButtonHandler = jest.fn();
    const { container } = render(
      <DTEDropdown>
        <DTEDropdownItem>
          <button onClick={mockButtonHandler} type="button">
            Edit document
          </button>
        </DTEDropdownItem>
        <DTEDropdownItem>
          <button onClick={mockButtonHandler} type="button">
            Archive document
          </button>
        </DTEDropdownItem>
      </DTEDropdown>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("DTEDropdown tests", () => {
  it("renders without error", async () => {
    const mockButtonHandler = jest.fn();
    render(
      <DTEDropdown>
        <DTEDropdownItem>
          <button onClick={mockButtonHandler} type="button">
            Edit document
          </button>
        </DTEDropdownItem>
        <DTEDropdownItem>
          <button onClick={mockButtonHandler} type="button">
            Archive document
          </button>
        </DTEDropdownItem>
      </DTEDropdown>
    );
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });
  it("allows for custom button text", async () => {
    const mockButtonHandler = jest.fn();
    render(
      <DTEDropdown text="Custom text">
        <DTEDropdownItem>
          <button onClick={mockButtonHandler} type="button">
            Edit document
          </button>
        </DTEDropdownItem>
        <DTEDropdownItem>
          <button onClick={mockButtonHandler} type="button">
            Archive document
          </button>
        </DTEDropdownItem>
      </DTEDropdown>
    );
    expect(screen.getByText("Custom text")).toBeInTheDocument();
    const oldText = screen.queryByText("Actions");
    expect(oldText).not.toBeInTheDocument();
  });
  it("Shows and hides the dropdown content", async () => {
    const mockButtonHandler = jest.fn();
    render(
      <DTEDropdown>
        <DTEDropdownItem>
          <button onClick={mockButtonHandler} type="button">
            Edit document
          </button>
        </DTEDropdownItem>
        <DTEDropdownItem>
          <button onClick={mockButtonHandler} type="button">
            Archive document
          </button>
        </DTEDropdownItem>
      </DTEDropdown>
    );
    fireEvent.click(screen.getByText("Actions"));
    expect(screen.getByText("Edit document")).toBeInTheDocument();
    expect(screen.getByText("Archive document")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Edit document"));
    expect(mockButtonHandler).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByText("Actions"));
    expect(screen.queryByText("Edit document")).not.toBeInTheDocument();
  });
});
