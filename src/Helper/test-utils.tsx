import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "styled-components";
import { useTheme, StylesProvider } from "@material-ui/core/styles";
import { MemoryRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { AppRoot, styledComponentsTheme } from "../theme";
import { AppContext, Theme } from "../context/AppContext";
import { AuthProvider } from "../context/AuthContext";
import ManualLoginProvider from "../context/ManualLoginContext";
import { MaintenanceProvider } from "../context/MaintenanceContext";

interface RenderProps {
  children?: any;
  initialRoutes?: { [name: string]: string }[];
}

// const { saveToken, logOutToken,isAuthenticated, } = useContext(AuthContext);

const AllTheProviders = ({ children, initialRoutes }: RenderProps) => {
  const MuiTheme = useTheme();
  return (
    <AuthProvider>
      <StylesProvider injectFirst>
        <ThemeProvider theme={{ ...styledComponentsTheme, ...MuiTheme }}>
          <MaintenanceProvider>
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              // TransitionComponent={Slide}
            >
              <AppRoot />
              <AppContext.Provider
                value={{
                  lang: "de",
                  theme: Theme.Light,
                  setTheme: () => {},
                  showHeader: true,
                  setShowHeader: () => {},
                  showBacklink: false,
                  setShowBacklink: () => {},
                  showSplotches: false,
                  setShowSplotches: () => {},
                }}
              >
                <MemoryRouter initialEntries={initialRoutes ?? ["/"]}>
                  <ManualLoginProvider>{children}</ManualLoginProvider>
                </MemoryRouter>
              </AppContext.Provider>
            </SnackbarProvider>
          </MaintenanceProvider>
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
