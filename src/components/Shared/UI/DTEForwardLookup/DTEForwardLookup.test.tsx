import { axe, toHaveNoViolations } from "jest-axe";
import {
  render,
  screen,
  fireEvent,
  userEvent,
} from "../../../../Helper/test-utils";
import DTEForwardLookup from "./DTEForwardLookup";

expect.extend(toHaveNoViolations);

describe("Test suite for DTEForwardLookup component accessibility", () => {
  it("should not fail any accessibility tests with minimum configuration - empty data", async () => {
    const mockOnSelectedChange = jest.fn();
    const { container } = render(
      <DTEForwardLookup
        id="test"
        label="test"
        data={[]}
        values={[]}
        onSelectedValuesChange={mockOnSelectedChange}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should not fail any accessibility tests with minimum configuration - populated data", async () => {
    const mockOnSelectedChange = jest.fn();
    const { container } = render(
      <DTEForwardLookup
        id="test"
        label="test"
        data={["item1", "item2"]}
        values={[]}
        onSelectedValuesChange={mockOnSelectedChange}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should not fail any accessibility tests with minimum configuration - populated data and selected data", async () => {
    const mockOnSelectedChange = jest.fn();
    const { container } = render(
      <DTEForwardLookup
        id="test"
        label="test"
        data={["item1", "item2"]}
        values={["item1"]}
        onSelectedValuesChange={mockOnSelectedChange}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("search input must have correct attributes", async () => {
    const mockOnSelectedChange = jest.fn();
    render(
      <DTEForwardLookup
        id="test"
        label="test"
        data={[]}
        values={[]}
        onSelectedValuesChange={mockOnSelectedChange}
      />,
    );

    const inputBox = await screen.findByLabelText("test");

    expect(inputBox).toHaveAttribute("role");
    const inputRole = inputBox.getAttribute("role");
    expect(inputRole).toBe("combobox");

    expect(inputBox).toHaveAttribute("aria-autocomplete");
    const autComplete = inputBox.getAttribute("aria-autocomplete");
    expect(autComplete).toBe("list");

    expect(inputBox).toHaveAttribute("aria-controls");
    const ariaControls = inputBox.getAttribute("aria-controls");
    expect(ariaControls).toBe("testcheckboxes");

    expect(inputBox).toHaveAttribute("role");
    const ariaExpanded = inputBox.getAttribute("aria-expanded");
    expect(ariaExpanded).toBe("false");

    expect(inputBox).toHaveAttribute("role");
    const ariaDescribedBy = inputBox.getAttribute("aria-describedby");
    expect(ariaDescribedBy).toBe("test-result-area-count");
  });
});

describe("Test suite for DTEForwardLookup data handling", () => {
  it("duplicated items in the data list must be de-duplicated", async () => {
    const mockOnSelectedChange = jest.fn();
    render(
      <DTEForwardLookup
        id="test"
        label="test label"
        data={["item1", "item1"]}
        values={[]}
        onSelectedValuesChange={mockOnSelectedChange}
      />,
    );

    const inputBox = await screen.findByLabelText("test label");
    fireEvent.change(inputBox, { target: { value: "item" } });

    const selectedCheckBoxes = await screen.findAllByRole("checkbox");
    expect(selectedCheckBoxes).toHaveLength(1);
  });
});

describe("Test suite for DTEForwardLookup component functionality", () => {
  it("selected item count must be correct for zero selections", async () => {
    const mockOnSelectedChange = jest.fn();
    render(
      <DTEForwardLookup
        id="test"
        label="test"
        data={["item1", "item2"]}
        values={[]}
        onSelectedValuesChange={mockOnSelectedChange}
      />,
    );

    const selectedArea = await screen.findByTestId("test-selected-area");
    expect(selectedArea).toBeInTheDocument();
    expect(selectedArea.childElementCount).toBe(0);
  });

  it("selected item count must be correct for a single selection", async () => {
    const mockOnSelectedChange = jest.fn();
    render(
      <DTEForwardLookup
        id="test2"
        label="test2"
        data={["item1", "item2"]}
        values={["item1"]}
        onSelectedValuesChange={mockOnSelectedChange}
      />,
    );

    const selectedCount = await screen.findByTestId(
      "test2-selected-area-count",
    );
    expect(selectedCount).toBeInTheDocument();
    expect(selectedCount.innerHTML).toBe("You have 1 area selected");
  });

  it("selected item count must be correct for a multiple selection", async () => {
    const mockOnSelectedChange = jest.fn();
    render(
      <DTEForwardLookup
        id="test3"
        label="test3"
        data={["item1", "item2"]}
        values={["item1", "item2"]}
        onSelectedValuesChange={mockOnSelectedChange}
      />,
    );

    const selectedCount = await screen.findByTestId(
      "test3-selected-area-count",
    );
    expect(selectedCount).toBeInTheDocument();
    expect(selectedCount.innerHTML).toBe("You have 2 areas selected");
  });

  it("selected buttons must be correct for a single selection", async () => {
    const mockOnSelectedChange = jest.fn();
    render(
      <DTEForwardLookup
        id="test2"
        label="test2"
        data={["item1", "item2"]}
        values={["item1"]}
        onSelectedValuesChange={mockOnSelectedChange}
      />,
    );

    const selectedButtons = await screen.findAllByRole("button");
    expect(selectedButtons).toHaveLength(2);
    expect(selectedButtons[0].textContent).toEqual("item1");
  });

  it("selected buttons must be correct for a multiple selection", async () => {
    const mockOnSelectedChange = jest.fn();
    render(
      <DTEForwardLookup
        id="test2"
        label="test2"
        data={["item1", "item2"]}
        values={["item1", "item2"]}
        onSelectedValuesChange={mockOnSelectedChange}
      />,
    );

    const selectedButtons = await screen.findAllByRole("button");
    expect(selectedButtons).toHaveLength(3);
    expect(selectedButtons[0].textContent).toEqual("item1");
    expect(selectedButtons[1].textContent).toEqual("item2");
  });

  it("result count must be correct for zero results", async () => {
    const mockOnSelectedChange = jest.fn();
    render(
      <DTEForwardLookup
        id="test"
        label="test"
        data={["item1", "item2"]}
        values={[]}
        onSelectedValuesChange={mockOnSelectedChange}
      />,
    );

    const resultCount = await screen.findByTestId("test-result-area-count");
    expect(resultCount).toBeInTheDocument();
    expect(resultCount).toHaveTextContent("Please type your search");
  });

  it("result count must be correct for 1 result", async () => {
    const mockOnSelectedChange = jest.fn();
    render(
      <DTEForwardLookup
        id="test"
        label="test"
        data={["item1", "item2"]}
        values={[]}
        onSelectedValuesChange={mockOnSelectedChange}
      />,
    );

    const searchInput = await screen.findByLabelText("test");
    userEvent.type(searchInput, "item1");
    const resultCount = await screen.findByTestId("test-result-area-count");
    expect(resultCount).toBeInTheDocument();
    expect(resultCount).toHaveTextContent("There are 1 results available");
  });

  it("result count must be correct for multiple results", async () => {
    const mockOnSelectedChange = jest.fn();
    render(
      <DTEForwardLookup
        id="test"
        label="test"
        data={["item1", "item2"]}
        values={[]}
        onSelectedValuesChange={mockOnSelectedChange}
      />,
    );

    const searchInput = await screen.findByLabelText("test");
    userEvent.type(searchInput, "item");
    const resultCount = await screen.findByTestId("test-result-area-count");
    expect(resultCount).toBeInTheDocument();
    expect(resultCount).toHaveTextContent("There are 2 results available");
  });

  it("selected buttons must be correct for a erroneous selection", async () => {
    const mockOnSelectedChange = jest.fn();
    render(
      <DTEForwardLookup
        id="test2"
        label="test2"
        data={["item1", "item2"]}
        values={["item1", "item4"]}
        onSelectedValuesChange={mockOnSelectedChange}
      />,
    );

    const selectedButtons = await screen.findAllByRole("button");
    expect(selectedButtons).toHaveLength(3);
    expect(selectedButtons[0].textContent).toEqual("item1");
    expect(selectedButtons[1].textContent).toEqual("item4");
  });

  it("clicking a selected buttons must remove the selected item from the list", async () => {
    const mockOnSelectedChange = jest.fn();
    render(
      <DTEForwardLookup
        id="test2"
        label="test2"
        data={["item1", "item2"]}
        values={["item1", "item2"]}
        onSelectedValuesChange={mockOnSelectedChange}
      />,
    );

    const initialSelectedButtons = await screen.findAllByRole("button");
    expect(initialSelectedButtons).toHaveLength(3);
    fireEvent.click(initialSelectedButtons[0]);

    const updatedSelectedButtons = await screen.findAllByRole("button");
    expect(updatedSelectedButtons).toHaveLength(2);
    expect(updatedSelectedButtons[0].textContent).toEqual("item2");
  });

  it("keydown a selected buttons must remove the selected item from the list if enter is pressed", async () => {
    const mockOnSelectedChange = jest.fn();
    render(
      <DTEForwardLookup
        id="test2"
        label="test2"
        data={["item1", "item2"]}
        values={["item1", "item2"]}
        onSelectedValuesChange={mockOnSelectedChange}
      />,
    );

    let selectedButtons = await screen.findAllByRole("button");
    expect(selectedButtons).toHaveLength(3);

    fireEvent.keyDown(selectedButtons[0], { code: "Tab" });
    selectedButtons = await screen.findAllByRole("button");
    expect(selectedButtons).toHaveLength(3);

    fireEvent.keyDown(selectedButtons[0], { code: "AltLeft" });
    selectedButtons = await screen.findAllByRole("button");
    expect(selectedButtons).toHaveLength(3);

    fireEvent.keyDown(selectedButtons[0], { code: "Enter" });
    selectedButtons = await screen.findAllByRole("button");

    expect(selectedButtons).toHaveLength(2);
    expect(selectedButtons[0].textContent).toEqual("item2");
  });

  it("keydown a selected buttons must remove the selected item from the list if numpad enter is pressed", async () => {
    const mockOnSelectedChange = jest.fn();
    render(
      <DTEForwardLookup
        id="test2"
        label="test2"
        data={["item1", "item2"]}
        values={["item1", "item2"]}
        onSelectedValuesChange={mockOnSelectedChange}
      />,
    );

    let selectedButtons = await screen.findAllByRole("button");
    expect(selectedButtons).toHaveLength(3);

    fireEvent.keyDown(selectedButtons[0], { code: "Tab" });
    selectedButtons = await screen.findAllByRole("button");
    expect(selectedButtons).toHaveLength(3);

    fireEvent.keyDown(selectedButtons[0], { code: "AltLeft" });
    selectedButtons = await screen.findAllByRole("button");
    expect(selectedButtons).toHaveLength(3);

    fireEvent.keyDown(selectedButtons[0], { code: "NumpadEnter" });
    selectedButtons = await screen.findAllByRole("button");

    expect(selectedButtons).toHaveLength(2);
    expect(selectedButtons[0].textContent).toEqual("item2");
  });

  it("keydown a selected buttons must remove the selected item from the list if space is pressed", async () => {
    const mockOnSelectedChange = jest.fn();
    render(
      <DTEForwardLookup
        id="test2"
        label="test2"
        data={["item1", "item2"]}
        values={["item1", "item2"]}
        onSelectedValuesChange={mockOnSelectedChange}
      />,
    );

    let selectedButtons = await screen.findAllByRole("button");
    expect(selectedButtons).toHaveLength(3);

    fireEvent.keyDown(selectedButtons[0], { code: "Tab" });
    selectedButtons = await screen.findAllByRole("button");
    expect(selectedButtons).toHaveLength(3);

    fireEvent.keyDown(selectedButtons[0], { code: "AltLeft" });
    selectedButtons = await screen.findAllByRole("button");
    expect(selectedButtons).toHaveLength(3);

    fireEvent.keyDown(selectedButtons[0], { code: "Space" });
    selectedButtons = await screen.findAllByRole("button");

    expect(selectedButtons).toHaveLength(2);
    expect(selectedButtons[0].textContent).toEqual("item2");
  });

  it("clicking a selected button must change the item in the checklist to show as unchecked", async () => {
    const mockOnSelectedChange = jest.fn();
    render(
      <DTEForwardLookup
        id="test"
        label="test label"
        data={["item1", "item2"]}
        values={["item1", "item2"]}
        onSelectedValuesChange={mockOnSelectedChange}
      />,
    );

    const selectedButtons = await screen.findAllByRole("button");
    expect(selectedButtons).toHaveLength(3);

    const inputBox = await screen.findByLabelText("test label");
    fireEvent.change(inputBox, { target: { value: "item" } });

    let checkBoxes = await screen.findAllByRole("checkbox");
    expect(checkBoxes).toHaveLength(2);
    expect(checkBoxes[0]).toBeChecked();
    expect(checkBoxes[1]).toBeChecked();

    fireEvent.click(selectedButtons[0]);

    checkBoxes = await screen.findAllByRole("checkbox");
    expect(checkBoxes).toHaveLength(2);
    expect(checkBoxes[0]).not.toBeChecked();
    expect(checkBoxes[1]).toBeChecked();
  });

  it("keydown on a selected button must change the item in the checklist to show as unchecked if enter is pressed", async () => {
    const mockOnSelectedChange = jest.fn();
    render(
      <DTEForwardLookup
        id="test"
        label="test label"
        data={["item1", "item2"]}
        values={["item1", "item2"]}
        onSelectedValuesChange={mockOnSelectedChange}
      />,
    );

    let selectedButtons = await screen.findAllByRole("button");
    expect(selectedButtons).toHaveLength(3);

    const inputBox = await screen.findByLabelText("test label");
    fireEvent.change(inputBox, { target: { value: "item" } });

    let checkBoxes = await screen.findAllByRole("checkbox");
    expect(checkBoxes).toHaveLength(2);
    expect(checkBoxes[0]).toBeChecked();
    expect(checkBoxes[1]).toBeChecked();

    fireEvent.keyDown(selectedButtons[0], { code: "Tab" });
    selectedButtons = await screen.findAllByRole("button");
    checkBoxes = await screen.findAllByRole("checkbox");
    expect(checkBoxes).toHaveLength(2);
    expect(checkBoxes[0]).toBeChecked();
    expect(checkBoxes[1]).toBeChecked();

    fireEvent.keyDown(selectedButtons[0], { code: "AltLeft" });
    selectedButtons = await screen.findAllByRole("button");
    checkBoxes = await screen.findAllByRole("checkbox");
    expect(checkBoxes).toHaveLength(2);
    expect(checkBoxes[0]).toBeChecked();
    expect(checkBoxes[1]).toBeChecked();

    fireEvent.keyDown(selectedButtons[0], { code: "Enter" });
    selectedButtons = await screen.findAllByRole("button");
    checkBoxes = await screen.findAllByRole("checkbox");
    expect(checkBoxes).toHaveLength(2);
    expect(checkBoxes[0]).not.toBeChecked();
    expect(checkBoxes[1]).toBeChecked();
  });

  it("keydown on a selected button must change the item in the checklist to show as unchecked if numpad enter is pressed", async () => {
    const mockOnSelectedChange = jest.fn();
    render(
      <DTEForwardLookup
        id="test"
        label="test label"
        data={["item1", "item2"]}
        values={["item1", "item2"]}
        onSelectedValuesChange={mockOnSelectedChange}
      />,
    );

    let selectedButtons = await screen.findAllByRole("button");
    expect(selectedButtons).toHaveLength(3);

    const inputBox = await screen.findByLabelText("test label");
    fireEvent.change(inputBox, { target: { value: "item" } });

    let checkBoxes = await screen.findAllByRole("checkbox");
    expect(checkBoxes).toHaveLength(2);
    expect(checkBoxes[0]).toBeChecked();
    expect(checkBoxes[1]).toBeChecked();

    fireEvent.keyDown(selectedButtons[0], { code: "Tab" });
    selectedButtons = await screen.findAllByRole("button");
    checkBoxes = await screen.findAllByRole("checkbox");
    expect(checkBoxes).toHaveLength(2);
    expect(checkBoxes[0]).toBeChecked();
    expect(checkBoxes[1]).toBeChecked();

    fireEvent.keyDown(selectedButtons[0], { code: "AltLeft" });
    selectedButtons = await screen.findAllByRole("button");
    checkBoxes = await screen.findAllByRole("checkbox");
    expect(checkBoxes).toHaveLength(2);
    expect(checkBoxes[0]).toBeChecked();
    expect(checkBoxes[1]).toBeChecked();

    fireEvent.keyDown(selectedButtons[0], { code: "NumpadEnter" });
    selectedButtons = await screen.findAllByRole("button");
    checkBoxes = await screen.findAllByRole("checkbox");
    expect(checkBoxes).toHaveLength(2);
    expect(checkBoxes[0]).not.toBeChecked();
    expect(checkBoxes[1]).toBeChecked();
  });

  it("keydown on a selected button must change the item in the checklist to show as unchecked if space is pressed", async () => {
    const mockOnSelectedChange = jest.fn();
    render(
      <DTEForwardLookup
        id="test"
        label="test label"
        data={["item1", "item2"]}
        values={["item1", "item2"]}
        onSelectedValuesChange={mockOnSelectedChange}
      />,
    );

    let selectedButtons = await screen.findAllByRole("button");
    expect(selectedButtons).toHaveLength(3);

    const inputBox = await screen.findByLabelText("test label");
    fireEvent.change(inputBox, { target: { value: "item" } });

    let checkBoxes = await screen.findAllByRole("checkbox");
    expect(checkBoxes).toHaveLength(2);
    expect(checkBoxes[0]).toBeChecked();
    expect(checkBoxes[1]).toBeChecked();

    fireEvent.keyDown(selectedButtons[0], { code: "Tab" });
    selectedButtons = await screen.findAllByRole("button");
    checkBoxes = await screen.findAllByRole("checkbox");
    expect(checkBoxes).toHaveLength(2);
    expect(checkBoxes[0]).toBeChecked();
    expect(checkBoxes[1]).toBeChecked();

    fireEvent.keyDown(selectedButtons[0], { code: "AltLeft" });
    selectedButtons = await screen.findAllByRole("button");
    checkBoxes = await screen.findAllByRole("checkbox");
    expect(checkBoxes).toHaveLength(2);
    expect(checkBoxes[0]).toBeChecked();
    expect(checkBoxes[1]).toBeChecked();

    fireEvent.keyDown(selectedButtons[0], { code: "Space" });
    selectedButtons = await screen.findAllByRole("button");
    checkBoxes = await screen.findAllByRole("checkbox");
    expect(checkBoxes).toHaveLength(2);
    expect(checkBoxes[0]).not.toBeChecked();
    expect(checkBoxes[1]).toBeChecked();
  });

  it("correct checkboxes must be returned for inputted search data", async () => {
    const mockOnSelectedChange = jest.fn();
    render(
      <DTEForwardLookup
        id="test"
        label="test label"
        data={["item1", "item2"]}
        values={["item1"]}
        onSelectedValuesChange={mockOnSelectedChange}
      />,
    );

    const inputBox = await screen.findByLabelText("test label");
    fireEvent.change(inputBox, { target: { value: "item" } });

    const selectedCheckBoxes = await screen.findAllByRole("checkbox");
    expect(selectedCheckBoxes).toHaveLength(2);
  });

  it("no checkboxes must be returned for invalid inputted search data", async () => {
    const mockOnSelectedChange = jest.fn();
    render(
      <DTEForwardLookup
        id="test"
        label="test label"
        data={["item1", "item2"]}
        values={["item1"]}
        onSelectedValuesChange={mockOnSelectedChange}
      />,
    );

    const inputBox = await screen.findByLabelText("test label");
    fireEvent.change(inputBox, { target: { value: "blah" } });

    const selectedCheckBoxes = screen.queryAllByRole("checkbox");
    expect(selectedCheckBoxes).toHaveLength(0);
  });

  it("correct checkbox labels must be displayed for inputted search data", async () => {
    const mockOnSelectedChange = jest.fn();
    render(
      <DTEForwardLookup
        id="test"
        label="test label"
        data={["item1", "item2"]}
        values={["item1"]}
        onSelectedValuesChange={mockOnSelectedChange}
      />,
    );

    const inputBox = await screen.findByLabelText("test label");
    fireEvent.change(inputBox, { target: { value: "item" } });

    const selectedCheckBoxes = await screen.findAllByRole("checkbox");
    expect(selectedCheckBoxes).toHaveLength(2);
    expect(selectedCheckBoxes[0]).toHaveAttribute("value", "item1");
    expect(selectedCheckBoxes[1]).toHaveAttribute("value", "item2");
  });

  it("selected checkboxes must be correct for inputted search data and a single selection", async () => {
    const mockOnSelectedChange = jest.fn();
    render(
      <DTEForwardLookup
        id="test"
        label="test label"
        data={["item1", "item2"]}
        values={["item1"]}
        onSelectedValuesChange={mockOnSelectedChange}
      />,
    );

    const inputBox = await screen.findByLabelText("test label");
    fireEvent.change(inputBox, { target: { value: "item" } });

    const selectedCheckBoxes = await screen.findAllByRole("checkbox");
    expect(selectedCheckBoxes).toHaveLength(2);
    expect(selectedCheckBoxes[0]).toBeChecked();
    expect(selectedCheckBoxes[1]).not.toBeChecked();
  });

  it("checking an unchecked checkbox must add the value to the selected data", async () => {
    const mockOnSelectedChange = jest.fn();
    render(
      <DTEForwardLookup
        id="test"
        label="test label"
        data={["item1", "item2"]}
        values={[]}
        onSelectedValuesChange={mockOnSelectedChange}
      />,
    );

    const initialSelectedButtons = await screen.queryAllByRole("button");
    expect(initialSelectedButtons).toHaveLength(1);

    const inputBox = await screen.findByLabelText("test label");
    fireEvent.change(inputBox, { target: { value: "item" } });

    const selectedCheckBoxes = await screen.findAllByRole("checkbox");
    fireEvent.click(selectedCheckBoxes[0]);

    const updatedSelectedButtons = await screen.findAllByRole("button");
    expect(updatedSelectedButtons).toHaveLength(2);
    expect(updatedSelectedButtons[0].textContent).toEqual("item1");
  });

  it("checking a checked checkbox must remove the value from the selected data", async () => {
    const mockOnSelectedChange = jest.fn();
    render(
      <DTEForwardLookup
        id="test"
        label="test label"
        data={["item1", "item2"]}
        values={["item1", "item2"]}
        onSelectedValuesChange={mockOnSelectedChange}
      />,
    );

    let selectedButtons = await screen.findAllByRole("button");
    expect(selectedButtons).toHaveLength(3);

    const inputBox = await screen.findByLabelText("test label");
    fireEvent.change(inputBox, { target: { value: "item" } });

    const selectedCheckBoxes = await screen.findAllByRole("checkbox");
    expect(selectedCheckBoxes).toHaveLength(2);
    fireEvent.click(selectedCheckBoxes[0]);

    selectedButtons = await screen.findAllByRole("button");
    expect(selectedButtons).toHaveLength(2);
    expect(selectedButtons[0].textContent).toEqual("item2");
  });

  it("added selected data must always show in alphabetical order", async () => {
    const mockOnSelectedChange = jest.fn();
    render(
      <DTEForwardLookup
        id="test"
        label="test label"
        data={["item1", "item2", "item3"]}
        values={["item2"]}
        onSelectedValuesChange={mockOnSelectedChange}
      />,
    );

    let selectedButtons = await screen.findAllByRole("button");
    expect(selectedButtons).toHaveLength(2);
    expect(selectedButtons[0].textContent).toEqual("item2");

    const inputBox = await screen.findByLabelText("test label");
    fireEvent.change(inputBox, { target: { value: "item" } });

    const checkBoxes = await screen.findAllByRole("checkbox");
    fireEvent.click(checkBoxes[2]);

    selectedButtons = await screen.findAllByRole("button");
    expect(selectedButtons).toHaveLength(3);
    expect(selectedButtons[0].textContent).toEqual("item2");
    expect(selectedButtons[1].textContent).toEqual("item3");

    fireEvent.click(checkBoxes[0]);

    selectedButtons = await screen.findAllByRole("button");
    expect(selectedButtons).toHaveLength(4);
    expect(selectedButtons[0].textContent).toEqual("item1");
    expect(selectedButtons[1].textContent).toEqual("item2");
    expect(selectedButtons[2].textContent).toEqual("item3");
  });

  it("adding data to selected data must call the callback", async () => {
    const mockOnSelectedChange = jest.fn();
    render(
      <DTEForwardLookup
        id="test"
        label="test label"
        data={["item1", "item2"]}
        values={[]}
        onSelectedValuesChange={mockOnSelectedChange}
      />,
    );

    const inputBox = await screen.findByLabelText("test label");
    fireEvent.change(inputBox, { target: { value: "item" } });

    const selectedCheckBoxes = await screen.findAllByRole("checkbox");
    fireEvent.click(selectedCheckBoxes[0]);

    expect(mockOnSelectedChange).toHaveBeenCalledTimes(2);

    fireEvent.click(selectedCheckBoxes[1]);

    expect(mockOnSelectedChange).toHaveBeenCalledTimes(3);
  });

  it("should have a icon button with data-testid clear-icon", async () => {
    const mockOnSelectedChange = jest.fn();
    render(
      <DTEForwardLookup
        id="test"
        label="test label"
        data={["item1", "item2"]}
        values={[]}
        onSelectedValuesChange={mockOnSelectedChange}
      />,
    );

    const inputBox = await screen.findByLabelText("test label");
    fireEvent.change(inputBox, { target: { value: "item" } });

    const selectedCheckBoxes = await screen.findAllByRole("checkbox");
    fireEvent.click(selectedCheckBoxes[0]);

    const clearIcon = await screen.findByTestId("clear-icon");
    expect(clearIcon).toBeInTheDocument();
  });
  it("should clear the data if the clear-icon button is pressed", () => {
    const mockOnSelectedChange = jest.fn();
    render(
      <DTEForwardLookup
        id="test"
        label="test label"
        data={["item1", "item2"]}
        values={[]}
        onSelectedValuesChange={mockOnSelectedChange}
      />,
    );

    const inputBox = screen.getByLabelText("test label");
    fireEvent.change(inputBox, { target: { value: "item" } });

    const selectedCheckBoxes = screen.getAllByRole("checkbox");
    fireEvent.click(selectedCheckBoxes[0]);

    const clearIcon = screen.getByTestId("clear-icon");
    fireEvent.click(clearIcon);

    expect(mockOnSelectedChange).toHaveBeenCalledWith([]);
  });
  it("should keep the selected items but clear the choices when the clear-icon is clicked", () => {
    const mockOnSelectedChange = jest.fn();
    render(
      <DTEForwardLookup
        id="test"
        label="test label"
        data={["item1", "item2"]}
        values={["item1"]}
        onSelectedValuesChange={mockOnSelectedChange}
      />,
    );

    const inputBox = screen.getByLabelText("test label");
    fireEvent.change(inputBox, { target: { value: "item" } });

    const selectedCheckBoxes = screen.getAllByRole("checkbox");
    fireEvent.click(selectedCheckBoxes[0]);

    const clearIcon = screen.getByTestId("clear-icon");
    fireEvent.click(clearIcon);

    expect(mockOnSelectedChange).toHaveBeenCalledWith(["item1"]);
  });
});
