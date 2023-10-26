// import { ContentContext } from "../../../../context/ContentContext";
// import { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import DocumentTitle from "react-document-title";
import StepWrapper from "../../../Shared/StepWrapper/StepWrapper";
import DTERouteLink from "../../../Shared/UI/DTERouteLink/DTERouteLink";
import DTEHeader from "../../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../../Shared/UI/DTETypography/DTEContent/DTEContent";
import NhsLoginButton from "../../../Shared/UI/NhsLoginButton";
import DTEBackLink from "../../../Shared/UI/DTEBackLink/DTEBackLink";
import DTELinkButton from "../../../Shared/UI/DTELinkButton/DTELinkButton";
import { Grid } from "@material-ui/core";

const StyledGridElementLeft = styled(Grid)`
  padding-left: 1em;
  && {
    text-align: left;
  }
  padding-bottom: -1em;
  margin-bottom: 0;
`;

const StartRegistrationProcess = () => {
  const history = useHistory();

  return (
    <DocumentTitle title="Register now - Volunteer Registration - Be Part of Research">
      <StepWrapper>
        <DTEBackLink linkText="Back" onClick={() => history.goBack()} />
        <DTEHeader as="h1">Register with Be Part of Research</DTEHeader>
        <DTEContent>
          A simple registration process will capture your basic information, including contact details.
        </DTEContent>
        <DTEContent>
          You&apos;ll need to verify your email address to ensure it is correct if you are not using NHS login.
        </DTEContent>
        <DTEContent>
          Once you&apos;re fully registered, and have agreed to be contacted, we&apos;ll have the information we need to
          keep in touch with you about health conditions you&apos;re interested in.
        </DTEContent>
        <DTEContent>You can sign up if you:</DTEContent>
        <ul>
          <li>have an email address</li>
          <li>are 18 or over</li>
          <li>live in the UK</li>
        </ul>
        <DTEContent>(Please note that unless otherwise stated, all registration questions are mandatory)</DTEContent>

        <Grid>
          <NhsLoginButton buttonText="Start now" />
          <StepWrapper>
            <DTERouteLink $outlined={true} to="/Participants/Register/Questions">
              Register with email address
            </DTERouteLink>
          </StepWrapper>
        </Grid>

        <DTEContent
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          If you already have an account, you can
          <DTELinkButton customStyles={{ marginLeft: "5px" }} onClick={() => history.push("/Participants/Options")}>
            sign in
          </DTELinkButton>
        </DTEContent>
      </StepWrapper>
    </DocumentTitle>
  );
};

export default StartRegistrationProcess;
