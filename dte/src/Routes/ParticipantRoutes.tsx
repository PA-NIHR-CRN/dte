import { Route } from "react-router-dom";
import ReactGA from "react-ga";
import UpdateParticipant from "../components/Participant/UpdateParticipant/UpdateParticipant";
import ProtectedRoute from "./ProtectedRoute";
import { Role } from "../types/AuthTypes";
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

export default [
  <ProtectedRoute
    userRole={Role.Participant}
    path="/Participants/MyDetails"
    component={UpdateParticipant}
    strict
    exact
    key="updateparticipant"
  />,
  <ProtectedRoute
    userRole={Role.Participant}
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
    userRole={Role.Participant}
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
    userRole={Role.Participant}
    path="/"
    render={(props) => {
      ReactGA.pageview(props.location.pathname);
      return <Home />;
    }}
    strict
    exact
    key="home"
  />,
  <ProtectedRoute
    userRole={Role.Participant}
    path="/Participants/CloseAccount"
    component={CloseAccount}
    strict
    exact
    key="closeaccount"
  />,
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
  // <Route
  //   path="/UserRegistration"
  //   component={UserRegistration}
  //   strict
  //   exact
  //   key="userregistration"
  // />,
  <Route
    path="/Participants/Register/Questions"
    component={RegsitrationProcess}
    strict
    exact
    key="registrationprocess"
  />,
  <ProtectedRoute
    userRole={Role.Participant}
    path="/Participants/Register/Continue/Questions"
    component={ContinueRegistration}
    strict
    exact
    key="continueregistration"
  />,
  <Route
    path="/Participants/Register"
    render={() => {
      ReactGA.pageview("/register");
      return <StartRegistrationProcess />;
    }}
    strict
    exact
    key="startregistrationprocess"
  />,
  <ProtectedRoute
    userRole={Role.Participant}
    path="/Participants/BePartOfResearchNewsletter"
    render={() => {
      ReactGA.pageview("/MyAccount/BePartOfResearchNewsletter");
      return <Newsletter />;
    }}
    strict
    exact
    key="newsletter"
  />,
  // <Route
  //   path="/Participants/SelfReferral/:studyid"
  //   component={SelfReferralLanding}
  //   strict
  //   exact
  //   key="studyinfo"
  // />,
  // <Route
  //   path="/Participants/SelfReferral/Information/:studyid"
  //   component={StudyInfo}
  //   strict
  //   exact
  //   key="studyinfo"
  // />,
  // <ProtectedRoute
  //   userRole={Role.Participant}
  //   path="/Participants/SelfReferral/Continue/:studyid"
  //   component={ContinueSelfReferral}
  //   strict
  //   exact
  //   key="continueselfreferral"
  // />,
  // <ProtectedRoute
  //   userRole={Role.Participant}
  //   path="/Participants/SelfReferral/Suitability/:studyid"
  //   component={Suitability}
  //   strict
  //   exact
  //   key="suitability"
  // />,
];
