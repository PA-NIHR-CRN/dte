/* eslint-disable no-restricted-globals */
import { render, screen } from "@testing-library/react";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";
import { styledComponentsTheme } from "../../../theme";
// import { shallow } from "enzyme";
import LoadingIndicator from "./LoadingIndicator";

describe("LoadingIndicator Component Tests", () => {
  test("LoadingIndicator renders without crashing", () => {
    const loadingMessage = "Loading...";
    render(
      <StyledComponentsThemeProvider theme={styledComponentsTheme}>
        <LoadingIndicator />
      </StyledComponentsThemeProvider>,
    );
    expect(screen.queryByText(loadingMessage)).toBeInTheDocument();
  });

  test("LoadingIndicator takes custom text", () => {
    const loadingMessage = "Custom Loading Text...";
    render(
      <StyledComponentsThemeProvider theme={styledComponentsTheme}>
        <LoadingIndicator text={loadingMessage} />
      </StyledComponentsThemeProvider>,
    );
    const loadingText = screen.queryByText(loadingMessage);
    expect(loadingText).toBeInTheDocument();
    expect(loadingText).toHaveAttribute("aria-live", "assertive");
  });
});
