import { axe, toHaveNoViolations } from "jest-axe";
import { render, fireEvent, screen, waitFor } from "../../../../Helper/test-utils";
import "@testing-library/jest-dom";
import Ethnicity1Form from "./Ethnicity1Form";

expect.extend(toHaveNoViolations);

test("loads and displays ethnicity form", async () => {
  render(
    <Ethnicity1Form
      initialStateData={{
        ethnicity: "",
      }}
      onDataChange={() => {}}
    />
  );
  await waitFor(() => {
    expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
  });
  expect(screen.getByDisplayValue("asian")).toBeInTheDocument();
  expect(screen.getByDisplayValue("asian")).not.toBeChecked();
  expect(screen.getByDisplayValue("other")).not.toBeChecked();
});

test("select a radio button and submit", async () => {
  const mockOnDataChange = jest.fn();
  render(
    <Ethnicity1Form
      initialStateData={{
        ethnicity: "",
      }}
      onDataChange={mockOnDataChange}
    />
  );
  await waitFor(() => {
    expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
  });
  fireEvent.click(screen.getByDisplayValue("asian"));
  expect(screen.getByDisplayValue("asian")).toBeChecked();
  fireEvent.submit(screen.getByTestId("ethnicity-form"));
  await waitFor(() =>
    expect(mockOnDataChange).toHaveBeenCalledWith({
      ethnicity: "asian",
    })
  );
});

test("pre-filled data entry", async () => {
  render(
    <Ethnicity1Form
      initialStateData={{
        ethnicity: "black",
      }}
      onDataChange={() => {}}
    />
  );
  await waitFor(() => {
    expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
  });
  expect(screen.getByDisplayValue("black")).toBeChecked();
});

describe("Accessibility test", () => {
  it("should not fail any accessibility tests", async () => {
    const { container } = render(
      <Ethnicity1Form
        initialStateData={{
          ethnicity: "",
        }}
        onDataChange={() => {}}
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
