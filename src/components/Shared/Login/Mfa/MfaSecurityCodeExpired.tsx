import styled from "styled-components";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import DocumentTitle from "react-document-title";
import DTEHeader from "../../UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../UI/DTETypography/DTEContent/DTEContent";
import StepWrapper from "../../StepWrapper/StepWrapper";
import { AuthContext } from "../../../../context/AuthContext";
import DTERouteLink from "../../UI/DTERouteLink/DTERouteLink";
import DTEDetails from "../../UI/DTEDetails/DTEDetails";

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
        {prevUrl === "/MfaSmsChallenge" && (
          <DTEDetails summary="I do not have access to my mobile phone">
            <DTEContent>
              If you do not have access to your mobile phone, you can{" "}
              <DTERouteLink
                to="/MfaChangeNumberConfirmEmail"
                renderStyle="standard"
              >
                change your mobile phone number securely.
              </DTERouteLink>
            </DTEContent>
          </DTEDetails>
        )}
      </StepWrapper>
    </DocumentTitle>
  );
};

export default MfaSecurityCodeExpired;
