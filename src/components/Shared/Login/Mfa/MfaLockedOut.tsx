import React, { useContext, useEffect } from "react";
import DocumentTitle from "react-document-title";
import DTEHeader from "../../UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../UI/DTETypography/DTEContent/DTEContent";
import StepWrapper from "../../StepWrapper/StepWrapper";
import { AuthContext } from "../../../../context/AuthContext";
import DTERouteLink from "../../UI/DTERouteLink/DTERouteLink";

const MfaLockedOut = () => {
  const { setMfaDetails, setUserMfaEmail, setEnteredMfaMobile } =
    useContext(AuthContext);

  useEffect(() => {
    setMfaDetails("");
    setUserMfaEmail("");
    setEnteredMfaMobile("");
  }, []);

  return (
    <DocumentTitle title="Locked Out - Volunteer Registration - Be Part of Research">
      <StepWrapper>
        <DTEHeader as="h1">
          You are temporarily prevented from signing in
        </DTEHeader>
        <DTEContent>
          You entered the wrong security code too many times. Wait 15 minutes
          and then{" "}
          <DTERouteLink to="/userlogin" renderStyle="standard">
            sign in again.
          </DTERouteLink>
        </DTEContent>
      </StepWrapper>
    </DocumentTitle>
  );
};

export default MfaLockedOut;
