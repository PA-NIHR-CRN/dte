import { ReactElement, useEffect, useState } from "react";
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
import { ContentContext } from "../context/ContentContext";
import { getContent } from "./contenful/contentHandler";
import { UserProvider } from "../context/UserContext";

interface RenderProps {
  children?: any;
  initialRoutes?: { [name: string]: string }[];
}

function AllTheProviders({ children, initialRoutes }: RenderProps) {
  const MuiTheme = useTheme();
  const [mockContent, setMockContent] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const savedContent = getContent();

    setMockContent(savedContent);
    setIsLoading(false);
  }, []);

  if (isLoading) return <div data-testid="loadingContent">Loading...</div>;

  return (
    <AuthProvider>
      <UserProvider>
        <ContentContext.Provider
          value={{
            content: mockContent,
            setLanguage: () => {},
            contentLoading: false,
            language: "en-GB",
          }}
        >
          <StylesProvider injectFirst>
            <ThemeProvider theme={{ ...styledComponentsTheme, ...MuiTheme }}>
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
            </ThemeProvider>
          </StylesProvider>
        </ContentContext.Provider>
      </UserProvider>
    </AuthProvider>
  );
}

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
