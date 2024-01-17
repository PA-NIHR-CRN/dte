import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom/client";
import { MuiThemeProvider } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import theme from "./theme";
import { AuthProvider } from "./context/AuthContext";
import ScrollToTop from "./Helper/ScrollToTop";
import { ContentProvider } from "./context/ContentContext";
import "./Helper/translations";
import { UserProvider } from "./context/UserContext";
import { MaintenanceProvider } from "./context/MaintenanceContext";

const root = document.getElementById("root");

if (!root) throw new Error("Root element not found");

const app = (
  <MuiThemeProvider theme={theme}>
  <MaintenanceProvider>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Router>
        <AuthProvider>
          <UserProvider>
            <ContentProvider>
              <ScrollToTop />
              <App />
            </ContentProvider>
          </UserProvider>
        </AuthProvider>
      </Router>
    </SnackbarProvider>
    </MaintenanceProvider>
  </MuiThemeProvider>

);

ReactDOM.createRoot(root).render(app);
