import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import theme from "./theme";
import { AuthProvider } from "./context/AuthContext";
import ScrollToTop from "./Helper/ScrollToTop";

ReactDOM.render(
  <AuthProvider>
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Router>
          <ScrollToTop />
          <App />
        </Router>
      </SnackbarProvider>
    </MuiThemeProvider>
  </AuthProvider>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
