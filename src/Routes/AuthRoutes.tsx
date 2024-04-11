import { Route } from "react-router-dom";
import React from "react";
import ReactGA from "react-ga";
import Logout from "../components/Shared/Login/Logout";
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
import MfaChangeNumberConfirmEmail from "../components/Shared/Login/Mfa/MfaChangeNumberConfirmEmail";
import MfaChangePhoneNumber from "../components/Shared/Login/Mfa/MfaChangePhoneNumber";
import MfaSecurityCodeExpired from "../components/Shared/Login/Mfa/MfaSecurityCodeExpired";
import MfaSessionExpired from "../components/Shared/Login/Mfa/MfaSessionExpired";
import MfaLockedOut from "../components/Shared/Login/Mfa/MfaLockedOut";

export default [
  /* Auth Routes */
  <Route
    path={["/UserLogin", "/MewngofnodiDefnyddiwr"]}
    render={(props) => {
      ReactGA.pageview(props.location.pathname);
      return <UserLogin />;
    }}
    key="userlogin"
  />,
  <Route
    path={["/Participants/Options", "/Cyfranogwyr/Dewisiadau"]}
    render={() => {
      ReactGA.pageview("/Participants/Options");
      return <LoginOptions />;
    }}
    key="options"
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
  <Route
    path="/MfaSessionExpired"
    render={() => {
      ReactGA.pageview("MfaSessionExpired");
      return <MfaSessionExpired />;
    }}
    strict
    key="MfaSessionExpired"
  />,
  <Route
    path="/MfaLockedOut"
    render={() => {
      ReactGA.pageview("MfaLockedOut");
      return <MfaLockedOut />;
    }}
    strict
    key="MfaLockedOut"
  />,
  <Route path="/Verify" component={Verify} strict key="verify" />,
  <Route path="/callback" component={NhsLoginCallback} strict key="callback" />,
];
