import styled from "styled-components";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import DocumentTitle from "react-document-title";
import DTEHeader from "../../UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../UI/DTETypography/DTEContent/DTEContent";
import StepWrapper from "../../StepWrapper/StepWrapper";
import { AuthContext } from "../../../../context/AuthContext";
import DTERouteLink from "../../UI/DTERouteLink/DTERouteLink";
import { ContentContext } from "../../../../context/ContentContext";

const LinkWrapper = styled.div`
  margin: 1rem 0;
`;

const MfaSecurityCodeExpired = () => {
  const { content } = useContext(ContentContext);
  const { mfaDetails, prevUrl } = useContext(AuthContext);
  const history = useHistory();

  if (!mfaDetails) {
    history.push("/");
  }

  return (
    <DocumentTitle title={content["mfa-security-code-expired-document-title"]}>
      <StepWrapper>
        <DTEHeader as="h1">{content["mfa-security-code-expired-header"]}</DTEHeader>
        <DTEContent>{content["mfa-security-code-expired-body"]}</DTEContent>
        <LinkWrapper>
          <DTEContent>
            <DTERouteLink
              to={
                prevUrl === "/MfaSmsChallenge"
                  ? "/MfaSmsChallenge?setCodeResent=true"
                  : "/MfaChangeNumberConfirmEmail?setCodeResent=true"
              }
              renderStyle="standard"
            >
              {content["mfa-security-code-expired-link-resend-code"]}
            </DTERouteLink>
          </DTEContent>
        </LinkWrapper>
        {content["mfa-security-code-expired-page"]}
      </StepWrapper>
    </DocumentTitle>
  );
};

export default MfaSecurityCodeExpired;
