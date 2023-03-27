import styled from "styled-components";
import DocumentTitle from "react-document-title";
import StepWrapper from "../../../Shared/StepWrapper/StepWrapper";
import DTERouteLink from "../../../Shared/UI/DTERouteLink/DTERouteLink";
import DTEHeader from "../../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../../Shared/UI/DTETypography/DTEContent/DTEContent";
import NhsLoginButton from "../../../Shared/UI/NhsLoginButton";

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
          You&apos;ll need to verify your email address to ensure it is correct
          if you are not using NHS login.
        </DTEContent>
        <DTEContent>
          Once you&apos;re fully registered, and have agreed to be contacted,
          we&apos;ll have the information we need to keep in touch with you
          about health conditions you&apos;re interested in.
        </DTEContent>
        <DTEContent>You can sign up if you:</DTEContent>
        <ul>
          <li>have an email address</li>
          <li>are 18 or over</li>
          <li>live in the UK</li>
        </ul>
        <NhsLoginButton />
        <DTEContent>
          (Please note that unless otherwise stated, all registration questions
          are mandatory)
        </DTEContent>
        <ButtonWrapper>
          <DTERouteLink to="/Participants/Register/Questions">
            Register with email address
          </DTERouteLink>
        </ButtonWrapper>
        <DTEContent>Already have an account?</DTEContent>
        <ButtonWrapper>
          <DTERouteLink to="/Participants/Options" $outlined>
            Sign in
          </DTERouteLink>
        </ButtonWrapper>
      </StepWrapper>
    </DocumentTitle>
  );
};

export default StartRegistrationProcess;
