import { Route } from "react-router-dom";
import ReactGA from "react-ga";
import UpdateParticipant from "../components/Participant/UpdateParticipant/UpdateParticipant";
import ProtectedRoute from "./ProtectedRoute";
import RegsitrationProcess from "../components/Participant/RegistrationProcess/StartRegistrationProcess/Stepper/RegistrationProcess";
import StartRegistrationProcess from "../components/Participant/RegistrationProcess/StartRegistrationProcess/StartRegistrationProcess";
import ContinueRegistration from "../components/Participant/RegistrationProcess/ContinueRegistration/ContinueRegistration";
import Home from "../components/Shared/Home/Home";
import AreasOfResearch from "../components/Participant/UpdateParticipant/AreasOfResearch";
import AccountSettings from "../components/Participant/UpdateParticipant/AccountSettings";
import UpdateEmailSuccess from "../components/Participant/UpdateParticipant/Forms/UpdateEmailSuccess";
import CloseAccount from "../components/Participant/UpdateParticipant/CloseAccount";
import UpdatePasswordSuccess from "../components/Participant/UpdateParticipant/Forms/UpdatePasswordSuccess";
import AccountClosed from "../components/Participant/UpdateParticipant/AccountClosed";
import Newsletter from "../components/Participant/UpdateParticipant/Newsletter";
import NhsPreRegistration from "../pages/NHS/NhsPreRegistration";

type VanityRoute = {
  campaign: string;
  source: string;
  medium: string;
};

const getVanityRoutes = (routeConfig: VanityRoute[]) =>
  routeConfig.map(({ campaign, source, medium }) => (
    <Route
      path={`/${campaign}`}
      render={() => {
        ReactGA.pageview(
          `/participants/introduction?utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}`
        );
        return <NhsPreRegistration />;
      }}
      strict
      exact
      key={`${campaign}`}
    />
  ));

export default [
  <ProtectedRoute path="/Participants/MyDetails" component={UpdateParticipant} strict exact key="updateparticipant" />,
  <ProtectedRoute
    path="/Participants/AccountSettings"
    render={() => {
      ReactGA.pageview("/AccountSettings");
      return <AccountSettings />;
    }}
    strict
    exact
    key="accountsettings"
  />,
  <ProtectedRoute
    path="/Participants/ResearchAreas"
    render={() => {
      ReactGA.pageview("/MyAccount/AreasOfResearch");
      return <AreasOfResearch />;
    }}
    strict
    exact
    key="areasofresearch"
  />,
  <Route
    path="/Participants/EmailUpdated"
    render={() => {
      ReactGA.pageview("/AccountSettings/EmailUpdated");
      return <UpdateEmailSuccess />;
    }}
    strict
    exact
    key="emailupdatedsuccessfully"
  />,
  <Route
    path="/participants/introduction"
    render={() => {
      ReactGA.pageview("/participants/introduction");
      return <NhsPreRegistration />;
    }}
    strict
    exact
    key="nhspreregistration"
  />,
  ...getVanityRoutes([
    { campaign: "nhsgp1", source: "sms", medium: "sms" },
    { campaign: "nhsgp2", source: "sms", medium: "sms" },
    { campaign: "nhsgp3", source: "sms", medium: "sms" },
    { campaign: "nhsgp4", source: "sms", medium: "referral" },
    { campaign: "nhsgp5", source: "leaflet", medium: "print" },
    { campaign: "nhsren1", source: "leaflet", medium: "print" },
    { campaign: "nhsren2", source: "leaflet", medium: "print" },
    { campaign: "nhsren3", source: "leaflet", medium: "print" },
    { campaign: "nhsren4", source: "leaflet", medium: "print" },
    { campaign: "nhsren5", source: "leaflet", medium: "print" },
    { campaign: "nottsmsk", source: "leaflet", medium: "print" },
    { campaign: "nwl", source: "poster", medium: "print" },
    { campaign: "swl", source: "poster", medium: "print" },
  ]),
  <Route
    path="/Participants/PasswordUpdated"
    render={() => {
      ReactGA.pageview("/AccountSettings/PasswordUpdated");
      return <UpdatePasswordSuccess />;
    }}
    strict
    exact
    key="passwordupdatedsuccessfully"
  />,
  <ProtectedRoute
    path="/"
    render={(props) => {
      ReactGA.pageview(props.location.pathname);
      return <Home />;
    }}
    strict
    exact
    key="home"
  />,
  <ProtectedRoute path="/Participants/CloseAccount" component={CloseAccount} strict exact key="closeaccount" />,
  <Route
    path="/Participants/AccountClosed"
    render={() => {
      ReactGA.pageview("/MyAccount/AccountClosed");
      return <AccountClosed />;
    }}
    strict
    exact
    key="accountclosed"
  />,
  <Route
    path={["/Participants/Register/Questions", "/Cyfranogwyr/Cofrestru/Cwestiynau"]}
    component={RegsitrationProcess}
    strict
    exact
    key="registrationprocess"
  />,
  <ProtectedRoute
    path="/Participants/Register/Continue/Questions"
    component={ContinueRegistration}
    strict
    exact
    key="continueregistration"
  />,
  <Route
    path={["/Participants/Register", "/Cyfranogwyr/Cofrestrwch"]}
    render={() => {
      ReactGA.pageview("/register");
      return <StartRegistrationProcess />;
    }}
    strict
    exact
    key="startregistrationprocess"
  />,
  <ProtectedRoute
    path="/Participants/BePartOfResearchNewsletter"
    render={() => {
      ReactGA.pageview("/MyAccount/BePartOfResearchNewsletter");
      return <Newsletter />;
    }}
    strict
    exact
    key="newsletter"
  />,
];
