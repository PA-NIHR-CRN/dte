import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "styled-components";
import { useTheme, StylesProvider } from "@material-ui/core/styles";
import { MemoryRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { AppRoot, styledComponentsTheme } from "../theme";
import { AuthProvider } from "../context/AuthContext";

interface RenderProps {
  children?: any;
  initialRoutes?: { [name: string]: string }[];
}

const AllTheProviders = ({ children, initialRoutes }: RenderProps) => {
  const MuiTheme = useTheme();
  return (
    <AuthProvider>
      <StylesProvider injectFirst>
        <ThemeProvider theme={{ ...styledComponentsTheme, ...MuiTheme }}>
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <AppRoot />
            <MemoryRouter initialEntries={initialRoutes ?? ["/"]}>
              {children}
            </MemoryRouter>
          </SnackbarProvider>
        </ThemeProvider>
      </StylesProvider>
    </AuthProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
  initialRoutes?: { [name: string]: string }[]
) => {
  return render(ui, {
    wrapper: (args) => AllTheProviders({ ...args, initialRoutes }),
    ...options,
  });
};

export * from "@testing-library/react";
export { customRender as render, userEvent };
