import { axe, toHaveNoViolations } from "jest-axe";
import {
  render,
  fireEvent,
  screen,
  waitFor,
} from "../../../../Helper/test-utils";
import "@testing-library/jest-dom";
import Ethnicity2Form from "./Ethnicity2Form";

expect.extend(toHaveNoViolations);

test("loads and displays background form", async () => {
  render(
    <Ethnicity2Form
      initialStateData={{
        background: "",
      }}
      onDataChange={() => {}}
      ethnicity="asian"
    />,
  );
  await waitFor(() => {
    expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
  });
  expect(screen.getByDisplayValue("Bangladeshi")).toBeInTheDocument();
  expect(screen.getByDisplayValue("Bangladeshi")).not.toBeChecked();
  expect(screen.queryByDisplayValue("African")).not.toBeInTheDocument();
});

test("different background form displayed depending on ethnicity", async () => {
  render(
    <Ethnicity2Form
      initialStateData={{
        background: "",
      }}
      onDataChange={() => {}}
      ethnicity="white"
    />,
  );
  await waitFor(() => {
    expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
  });
  expect(
    screen.getByDisplayValue(
      "British, English, Northern Irish, Scottish, or Welsh",
    ),
  ).toBeInTheDocument();
  expect(
    screen.getByDisplayValue(
      "British, English, Northern Irish, Scottish, or Welsh",
    ),
  ).not.toBeChecked();
  expect(screen.queryByDisplayValue("African")).not.toBeInTheDocument();
});

test("other background textbox to be filled", async () => {
  render(
    <Ethnicity2Form
      initialStateData={{
        background: "Not one of the options",
      }}
      onDataChange={() => {}}
      ethnicity="asian"
    />,
  );
  await waitFor(() => {
    expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
  });
  expect(
    screen.getByDisplayValue("Not one of the options"),
  ).toBeInTheDocument();
});

test("submitting other", async () => {
  const mockOnDataChange = jest.fn();
  render(
    <Ethnicity2Form
      initialStateData={{
        background: "",
      }}
      onDataChange={mockOnDataChange}
      ethnicity="other"
    />,
  );
  await waitFor(() => {
    expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
  });
  fireEvent.click(screen.getByDisplayValue("other"));
  fireEvent.change(
    screen.getByLabelText(/How would you describe your background\?/i),
    {
      target: { value: "Custom value" },
    },
  );
  fireEvent.submit(screen.getByTestId("background-form"));
  await waitFor(() => {
    expect(mockOnDataChange).toHaveBeenCalledWith({
      background: "Custom value",
    });
  });
});

test("submitting other with blank data", async () => {
  const mockOnDataChange = jest.fn();
  render(
    <Ethnicity2Form
      initialStateData={{
        background: "",
      }}
      onDataChange={mockOnDataChange}
      ethnicity="other"
    />,
  );
  await waitFor(() => {
    expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
  });
  fireEvent.click(screen.getByDisplayValue("other"));
  fireEvent.change(
    screen.getByLabelText(/How would you describe your background\?/i),
    {
      target: { value: "   " },
    },
  );
  fireEvent.submit(screen.getByTestId("background-form"));
  await waitFor(() => {
    expect(mockOnDataChange).toHaveBeenCalledWith({
      background: "other",
    });
  });
});

test("submitting other with whitespace", async () => {
  const mockOnDataChange = jest.fn();
  render(
    <Ethnicity2Form
      initialStateData={{
        background: "",
      }}
      onDataChange={mockOnDataChange}
      ethnicity="other"
    />,
  );
  await waitFor(() => {
    expect(screen.queryByTestId("loadingContent")).not.toBeInTheDocument();
  });
  fireEvent.click(screen.getByDisplayValue("other"));
  fireEvent.change(
    screen.getByLabelText(/How would you describe your background\?/i),
    {
      target: { value: "  ethnicity  " },
    },
  );
  fireEvent.submit(screen.getByTestId("background-form"));
  await waitFor(() => {
    expect(mockOnDataChange).toHaveBeenCalledWith({
      background: "ethnicity",
    });
  });
});

describe("Accessibility test", () => {
  it("should not fail any accessibility tests", async () => {
    const mockOnDataChange = jest.fn();
    const { container } = render(
      <Ethnicity2Form
        initialStateData={{
          background: "",
        }}
        onDataChange={mockOnDataChange}
        ethnicity="other"
      />,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
