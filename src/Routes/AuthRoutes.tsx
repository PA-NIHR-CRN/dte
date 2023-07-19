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
import NhsLoginCallback from "../components/Shared/Login/NhsLoginCallback";
import NhsNoConsent from "../pages/NHS/NhsNoConsent/NhsNoConsent";
import NhsNoVsConsent from "../pages/NHS/NhsNoVsConsent";
import LoginOptions from "../pages/auth/loginOptions";
import NhsAppIntegration from "../pages/NHS/NhsAppIntegration";
import SessionExpired from "../components/Shared/SessionTimeout/SessionExpired";
import Under18ErrorPage from "../pages/NHS/Under18";
import NhsUnableToMatch from "../pages/NHS/NhsUnableToMatch";
import NhsAppLanding from "../pages/NHS/NhsAppLanding/NhsAppLanding";
import CookiePage from "../pages/CookiePage/CookiePage";
import MfaSmsSetup from "../components/Shared/Login/Mfa/MfaSmsSetup";
import MfaSmsChallenge from "../components/Shared/Login/Mfa/MfaSmsChallenge";
import MfaTokenSetup from "../components/Shared/Login/Mfa/MfaTokenSetup";
import MfaTokenChallenge from "../components/Shared/Login/Mfa/MfaTokenChallenge";
import MfaNoUkMobileOptions from "../components/Shared/Login/Mfa/MfaNoUkMobileOptions";
import MfaChangeNumberConfirmEmail from "../components/Shared/Login/Mfa/MfaChangeNumberConfirmEmail";
import MfaChangePhoneNumber from "../components/Shared/Login/Mfa/MfaChangePhoneNumber";
import MfaSecurityCodeExpired from "../components/Shared/Login/Mfa/MfaSecurityCodeExpired";

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
    path="/Participants/Options"
    render={() => {
      ReactGA.pageview("/Participants/Options");
      return <LoginOptions />;
    }}
    key="options"
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
    path="/SessionExpired"
    render={(props) => {
      ReactGA.pageview(props.location.pathname);
      return <SessionExpired />;
    }}
    strict
    key="sessionexpired"
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
  <Route
    path="/NhsNoConsent"
    render={() => {
      ReactGA.pageview("NhsNoConsent");
      return <NhsNoConsent />;
    }}
    strict
    key="nhsnocnsent"
  />,
  <Route
    path="/under18"
    render={() => {
      ReactGA.pageview("under18");
      return <Under18ErrorPage />;
    }}
    strict
    key="under18"
  />,
  <Route
    path="/NhsNoVsConsent"
    render={() => {
      ReactGA.pageview("NhsNoVsConsent");
      return <NhsNoVsConsent />;
    }}
    strict
    key="nhsnovsconsent"
  />,
  <Route
    path="/nhsappintegration"
    render={() => {
      ReactGA.pageview("nhsappintegration");
      return <NhsAppIntegration />;
    }}
    strict
    key="nhsappintegration"
  />,
  <Route
    path="/unabletomatch"
    render={() => {
      ReactGA.pageview("unabletomatch");
      return <NhsUnableToMatch />;
    }}
    strict
    key="unabletomatch"
  />,
  <Route
    path="/nhsapplanding"
    render={() => {
      ReactGA.pageview("nhsapplanding");
      return <NhsAppLanding />;
    }}
    strict
    key="nhsapplanding"
  />,
  <Route
    path="/MfaSmsSetup"
    render={() => {
      ReactGA.pageview("MfaSmsSetup");
      return <MfaSmsSetup />;
    }}
    strict
    key="MfaSmsSetup"
  />,
  <Route
    path="/MfaSmsChallenge"
    render={() => {
      ReactGA.pageview("MfaSmsChallenge");
      return <MfaSmsChallenge />;
    }}
    strict
    key="MfaSmsChallenge"
  />,
  <Route
    path="/MfaTokenSetup"
    render={() => {
      ReactGA.pageview("MfaTokenSetup");
      return <MfaTokenSetup />;
    }}
    strict
    key="MfaTokenSetup"
  />,
  <Route
    path="/MfaTokenChallenge"
    render={() => {
      ReactGA.pageview("MfaTokenChallenge");
      return <MfaTokenChallenge />;
    }}
    strict
    key="MfaTokenChallenge"
  />,
  <Route
    path="/MfaNoUkMobileOptions"
    render={() => {
      ReactGA.pageview("MfaNoUkMobileOptions");
      return <MfaNoUkMobileOptions />;
    }}
    strict
    key="MfaNoUkMobileOptions"
  />,
  <Route
    path="/MfaChangeNumberConfirmEmail"
    render={() => {
      ReactGA.pageview("MfaChangeNumberConfirmEmail");
      return <MfaChangeNumberConfirmEmail />;
    }}
    strict
    key="MfaChangeNumberConfirmEmail"
  />,
  <Route
    path="/MfaChangePhoneNumber"
    render={() => {
      ReactGA.pageview("MfaChangePhoneNumber");
      return <MfaChangePhoneNumber />;
    }}
    strict
    key="MfaChangePhoneNumber"
  />,
  <Route
    path="/MfaSecurityCodeExpired"
    render={() => {
      ReactGA.pageview("MfaSecurityCodeExpired");
      return <MfaSecurityCodeExpired />;
    }}
    strict
    key="MfaSecurityCodeExpired"
  />,
  <Route path="/Verify" component={Verify} strict key="verify" />,
  <Route path="/callback" component={NhsLoginCallback} strict key="callback" />,
];
