import styled from "styled-components";
import DocumentTitle from "react-document-title";
import StepWrapper from "../../../Shared/StepWrapper/StepWrapper";
import DTERouteLink from "../../../Shared/UI/DTERouteLink/DTERouteLink";
import DTEHeader from "../../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../../Shared/UI/DTETypography/DTEContent/DTEContent";

const ButtonWrapper = styled.div`
  margin: 1rem 0;
`;

const StartRegistrationProcess = () => {
  return (
    <DocumentTitle title="Register now - Volunteer Registration - Be Part of Research">
      <StepWrapper>
        <DTEHeader as="h1">Register with Be Part of Research</DTEHeader>
        <DTEContent>
          A simple registration process will capture your basic information,
          including contact details.
        </DTEContent>
        <DTEContent>
          You&apos;ll need to verify your email address to ensure it is correct.
        </DTEContent>
        <DTEContent>
          Once you&apos;re fully registered, we&apos;ll have the information we
          need to keep in touch with you about health conditions you&apos;re
          interested in.
        </DTEContent>
        <DTEContent>You can sign up if you:</DTEContent>
        <ul>
          <li>have an email address</li>
          <li>are 18 or over</li>
          <li>live in the UK</li>
        </ul>
        <ButtonWrapper>
          <DTERouteLink to="/Participants/Register/Questions">
            Register now
          </DTERouteLink>
        </ButtonWrapper>
        <DTEContent>Already have an account?</DTEContent>
        <ButtonWrapper>
          <DTERouteLink to="/UserLogin" $outlined>
            Sign in
          </DTERouteLink>
        </ButtonWrapper>
      </StepWrapper>
    </DocumentTitle>
  );
};

export default StartRegistrationProcess;
