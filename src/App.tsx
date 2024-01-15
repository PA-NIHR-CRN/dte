import React, { useEffect, useContext, useState } from "react";
import styled, {
  ThemeProvider as StyledComponentsThemeProvider,
} from "styled-components";
import { useTheme, StylesProvider } from "@material-ui/core/styles";
import { Route, Switch, useLocation } from "react-router-dom";
import Header from "./components/Shared/Header/Header";
import Footer from "./components/Shared/Footer/Footer";
import { AppContext, Theme } from "./context/AppContext";
import ParticipantRoutes from "./Routes/ParticipantRoutes";
import AuthRoutes from "./Routes/AuthRoutes";
import PageNotFound from "./components/Shared/PageNotFound/PageNotFound";
import Unauthorized from "./components/Shared/Unauthorized/Unauthorized";
import { AuthContext } from "./context/AuthContext";
import { AppRoot, styledComponentsTheme } from "./theme";
import topLeftSplotch from "./images/topsplash.png";
import bottomRightSplotch from "./images/bottomsplash.png";
import CookieBanner from "./components/Shared/Footer/CookieBanner";
import { NHSApp } from "./types/AuthTypes";
import SessionTimeoutModal from "./components/Shared/SessionTimeout/SessionTimeoutModal";
import useAxiosFetch from "./hooks/useAxiosFetch";
import MaintenancePage from "./pages/maintenance/MaintenancePage";
import LoadingIndicator from "./components/Shared/LoadingIndicator/LoadingIndicator";
import { useMaintenance } from "./context/MaintenanceContext";
import { setupAxiosInterceptors } from "./Helper/axiosSetup";

const TopLeftSplotch = styled.img.attrs({
  src: `${topLeftSplotch}`,
  alt: "",
})`
  align-self: center;
  position: absolute;
  top: 0;
  left: 0;
`;

const BottomRightSplotch = styled.img.attrs({
  src: `${bottomRightSplotch}`,
  alt: "",
})`
  align-self: center;
  position: absolute;
  bottom: 0;
  right: 0;
`;
const SplotchContainer = styled.div.attrs({
  role: "complementary",
})`
  /* align-self: center; */
  position: relative;
`;

declare global {
  interface Window {
    nhsapp: NHSApp;
  }
}

function App() {
  const [theme, setTheme] = useState(Theme.Light);
  const [showHeader, setShowHeader] = useState(true);
  const [showSplotches, setShowSplotches] = useState(false);
  const [showBacklink, setShowBacklink] = useState(false);
  const location = useLocation();
  const { persistLastUrl, isInNHSApp } = useContext(AuthContext);
  const MuiTheme = useTheme();
  const { setInMaintenanceMode, inMaintenanceMode } = useMaintenance();

  const [{ error, loading }] = useAxiosFetch(
    {
      url: `${process.env.REACT_APP_BASE_API}/health`,
      method: "GET",
    },
    {
      useCache: false,
      manual: false,
    }
  );

  useEffect(() => {
    setupAxiosInterceptors(setInMaintenanceMode);
  }, [setInMaintenanceMode]);

  // Initial API health check on mount
  useEffect(() => {
    if (error?.response?.status === 503) {
      setInMaintenanceMode(true);
    }
  }, [error, setInMaintenanceMode]);

  // occurs on page change
  useEffect(() => {
    persistLastUrl(location?.pathname);
    setShowHeader(true);
    setShowBacklink(false);
    setShowSplotches(false);
  }, [location]);

  return (
    <StylesProvider injectFirst>
      <StyledComponentsThemeProvider
        theme={{ ...styledComponentsTheme, ...MuiTheme }}
      >
        {loading ? (
          <div className="App Site">
            <LoadingIndicator />
          </div>
        ) : (
          <>
            {inMaintenanceMode ? (
              <div className="App Site">
                <AppRoot />
                <div className="Site-content">
                  <Header />
                  <MaintenancePage />
                </div>
              </div>
            ) : (
              <div className="App Site">
                <AppRoot />
                <AppContext.Provider
                  value={{
                    lang: "de",
                    theme,
                    setTheme,
                    showHeader,
                    setShowHeader,
                    showBacklink,
                    setShowBacklink,
                    showSplotches,
                    setShowSplotches,
                  }}
                >
                  <div className="Site-content">
                    <CookieBanner />
                    {showSplotches && (
                      <SplotchContainer aria-label="Top left splotch">
                        <TopLeftSplotch />
                      </SplotchContainer>
                    )}
                    {!isInNHSApp && showHeader && <Header />}
                    <Switch>
                      {AuthRoutes}
                      {ParticipantRoutes}
                      <Route
                        path="/Unauthorized"
                        component={Unauthorized}
                        key="unauthorized"
                      />
                      <Route
                        path="*"
                        component={PageNotFound}
                        key="pagenotfound"
                      />
                    </Switch>
                  </div>
                  {showSplotches && (
                    <SplotchContainer aria-label="Bottom right splotch">
                      <BottomRightSplotch />
                    </SplotchContainer>
                  )}
                  {!isInNHSApp && <Footer />}
                </AppContext.Provider>
                <SessionTimeoutModal />
              </div>
            )}
          </>
        )}
      </StyledComponentsThemeProvider>
    </StylesProvider>
  );
}
export default App;
