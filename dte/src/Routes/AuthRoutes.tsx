import { Route } from "react-router-dom";
import React, { useContext } from "react";
import ReactGA from "react-ga";
import Login from "../components/Shared/Login/Login";
import Logout from "../components/Shared/Login/Logout";
import { AuthContext } from "../context/AuthContext";
import UserLogin from "../components/Shared/Login/UserLogin";
import Verify from "../components/Shared/Login/Verify";
import ForgottenPassword from "../components/Shared/Login/ForgottenPassword";
import ResetPassword from "../components/Shared/Login/ResetPassword";
import CookiePage from "../pages/CookiePage/CookiePage";

const redirect = (pathOrigin: string) => {
  const { persistLastNonLoginUrl, prevUrl, lastUrl } = useContext(AuthContext);
  persistLastNonLoginUrl(prevUrl || lastUrl || "");
  window.location.href = pathOrigin;
  return null;
};

export default [
  /* Auth Routes */
  <Route path="/Login" component={Login} strict key="login" />,
  <Route
    path="/UserLogin"
    render={(props) => {
      ReactGA.pageview(props.location.pathname);
      return <UserLogin />;
    }}
    key="userlogin"
  />,
  <Route
    path="/ResearchLogin"
    component={() => {
      return redirect(process.env.REACT_APP_RESEARCHER_AUTH_URL || "");
    }}
    key="researchlogin"
  />,
  <Route
    path="/LogoutRedirect"
    component={() => {
      return redirect(process.env.REACT_APP_LOGOUT_URL || "");
    }}
    strict
    key="logoutredirect"
  />,
  <Route
    path="/Logout"
    render={(props) => {
      ReactGA.pageview(props.location.pathname);
      return <Logout />;
    }}
    strict
    key="logout"
  />,
  <Route
    path="/ForgottenPassword"
    render={(props) => {
      ReactGA.pageview(props.location.pathname);
      return <ForgottenPassword />;
    }}
    strict
    key="forgottenpassword"
  />,
  <Route
    path="/cookies"
    render={(props) => {
      ReactGA.pageview(props.location.pathname);
      return <CookiePage />;
    }}
    strict
    key="cookiepage"
  />,
  <Route
    path="/ResetPassword"
    render={() => {
      ReactGA.pageview("ResetPassword");
      return <ResetPassword />;
    }}
    strict
    key="resetpassword"
  />,
  <Route path="/Verify" component={Verify} strict key="verify" />,
];
