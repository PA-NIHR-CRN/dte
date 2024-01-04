import React, { useEffect, useContext } from "react";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";
import { useTheme, StylesProvider } from "@material-ui/core/styles";
import { Route, Switch, useLocation } from "react-router-dom";
import Header from "./components/Shared/Header/Header";
import Footer from "./components/Shared/Footer/Footer";
import ParticipantRoutes from "./Routes/ParticipantRoutes";
import AuthRoutes from "./Routes/AuthRoutes";
import PageNotFound from "./components/Shared/PageNotFound/PageNotFound";
import Unauthorized from "./components/Shared/Unauthorized/Unauthorized";
import { AuthContext } from "./context/AuthContext";
import { AppRoot, styledComponentsTheme } from "./theme";
import CookieBanner from "./components/Shared/Footer/CookieBanner";
import SessionTimeoutModal from "./components/Shared/SessionTimeout/SessionTimeoutModal";

function App() {
  const location = useLocation();
  const { persistLastUrl, isInNHSApp } = useContext(AuthContext);
  const MuiTheme = useTheme();

  // occurs on page change
  useEffect(() => {
    persistLastUrl(location?.pathname);
  }, [location]);

  return (
    <StylesProvider injectFirst>
      <StyledComponentsThemeProvider
        theme={{ ...styledComponentsTheme, ...MuiTheme }}
      >
        <div className="App Site">
          <AppRoot />
          <div className="Site-content">
            <CookieBanner />
            {!isInNHSApp && <Header />}
            <Switch>
              {AuthRoutes}
              {ParticipantRoutes}
              <Route
                path="/Unauthorized"
                component={Unauthorized}
                key="unauthorized"
              />
              <Route path="*" component={PageNotFound} key="pagenotfound" />
            </Switch>
          </div>
          {!isInNHSApp && <Footer />}
          <SessionTimeoutModal />
        </div>
      </StyledComponentsThemeProvider>
    </StylesProvider>
  );
}
export default App;
