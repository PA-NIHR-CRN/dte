import React, { useEffect, useContext } from "react";
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
  const [theme, setTheme] = React.useState(Theme.Light);
  const [showHeader, setShowHeader] = React.useState(true);
  const [showSplotches, setShowSplotches] = React.useState(false);
  const [showBacklink, setShowBacklink] = React.useState(false);
  const location = useLocation();
  const { persistLastUrl, isInNHSApp } = useContext(AuthContext);
  const MuiTheme = useTheme();

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
                <Route path="*" component={PageNotFound} key="pagenotfound" />
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
      </StyledComponentsThemeProvider>
    </StylesProvider>
  );
}
export default App;
