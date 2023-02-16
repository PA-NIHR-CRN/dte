import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "../../../../../Helper/test-utils";
import "@testing-library/jest-dom";
import Consent from "./Consent";

test("loads and displays consent page", async () => {
  const mockOnSubmit = jest.fn();
  render(
    <Consent onSubmit={mockOnSubmit} initialStateData={{ consent: false }} />
  );
  expect(screen.getByText("Yes - I Consent")).toBeInTheDocument();
  expect(screen.getByText("No - I do not Consent")).toBeInTheDocument();
});

test("continues when the user clicks I consent", async () => {
  const mockOnSubmit = jest.fn();
  render(
    <Consent onSubmit={mockOnSubmit} initialStateData={{ consent: false }} />
  );
  fireEvent.click(screen.getByText("Yes - I Consent"));
  await waitFor(() => {
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});

test("shows the user a different page when they decline", async () => {
  const mockOnSubmit = jest.fn();
  render(
    <Consent onSubmit={mockOnSubmit} initialStateData={{ consent: false }} />
  );
  fireEvent.click(screen.getByText("No - I do not Consent"));
  await waitFor(() => {
    expect(
      screen.getByText(
        "You will not be able to use this service and cannot register your interest to take part in studies."
      )
    ).toBeInTheDocument();
  });
});
