import styled from "styled-components";
import React, { useContext, useEffect } from "react";
import DocumentTitle from "react-document-title";
import DTEHeader from "../../UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../UI/DTETypography/DTEContent/DTEContent";
import StepWrapper from "../../StepWrapper/StepWrapper";
import { AuthContext } from "../../../../context/AuthContext";
import DTERouteLink from "../../UI/DTERouteLink/DTERouteLink";

const LinkWrapper = styled.div`
  margin: 1rem 0;
`;

const MfaSessionExpired = () => {
  const { setMfaDetails, setUserMfaEmail, setEnteredMfaMobile } = useContext(AuthContext);

  useEffect(() => {
    setMfaDetails("");
    setUserMfaEmail("");
    setEnteredMfaMobile("");
  }, []);

  return (
    <DocumentTitle title="Session expired - Volunteer Registration - Be Part of Research">
      <StepWrapper>
        <DTEHeader as="h1">Your session has ended due to inactivity</DTEHeader>
        <DTEContent>You need to sign in again to continue.</DTEContent>
        <LinkWrapper>
          <DTERouteLink to="/participants/options">Sign in again</DTERouteLink>
        </LinkWrapper>
      </StepWrapper>
    </DocumentTitle>
  );
};

export default MfaSessionExpired;
