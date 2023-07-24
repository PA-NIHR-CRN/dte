import styled from "styled-components";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import DocumentTitle from "react-document-title";
import DTEHeader from "../../UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../UI/DTETypography/DTEContent/DTEContent";
import StepWrapper from "../../StepWrapper/StepWrapper";
import { AuthContext } from "../../../../context/AuthContext";
// import DTEDetails from "../../UI/DTEDetails/DTEDetails";
import DTERouteLink from "../../UI/DTERouteLink/DTERouteLink";

const LinkWrapper = styled.div`
  margin: 1rem 0;
`;

const MfaSecurityCodeExpired = () => {
  const { mfaDetails, prevUrl } = useContext(AuthContext);
  const history = useHistory();
  if (!mfaDetails) {
    history.push("/");
  }

  return (
    <DocumentTitle title="Security code expired">
      <StepWrapper>
        <DTEHeader as="h1">Security code expired</DTEHeader>
        <DTEContent>The security code you entered has expired.</DTEContent>
        <LinkWrapper>
          <DTERouteLink
            to={prevUrl || "/MfaChangeNumberConfirmEmail"}
            renderStyle="standard"
          >
            <DTEContent>Send your security code again</DTEContent>
          </DTERouteLink>
        </LinkWrapper>
        <LinkWrapper>
          <DTERouteLink
            to="/MfaChangeNumberConfirmEmail"
            renderStyle="standard"
          >
            <DTEContent>Enter your mobile phone number again</DTEContent>
          </DTERouteLink>
        </LinkWrapper>

        {/* <DTEDetails summary="Use another way to secure my account"> */}
        {/*  <> */}
        {/*    <DTEContent> */}
        {/*      If you do not have a UK mobile phone number or do not want to use */}
        {/*      this method, you can{" "} */}
        {/*      <DTERouteLink to="/MfaTokenSetup" renderStyle="standard"> */}
        {/*        use an authenticator app to secure your account */}
        {/*      </DTERouteLink> */}
        {/*      . */}
        {/*    </DTEContent> */}
        {/*  </> */}
        {/* </DTEDetails> */}
      </StepWrapper>
    </DocumentTitle>
  );
};

export default MfaSecurityCodeExpired;
