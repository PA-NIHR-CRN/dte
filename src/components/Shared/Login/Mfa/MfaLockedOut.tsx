import React, { useContext, useEffect } from "react";
import DocumentTitle from "react-document-title";
import DTEHeader from "../../UI/DTETypography/DTEHeader/DTEHeader";
import StepWrapper from "../../StepWrapper/StepWrapper";
import { AuthContext } from "../../../../context/AuthContext";
import { ContentContext } from "../../../../context/ContentContext";

const MfaLockedOut = () => {
  const { content } = useContext(ContentContext);
  const { setMfaDetails, setUserMfaEmail, setEnteredMfaMobile } = useContext(AuthContext);

  useEffect(() => {
    setMfaDetails("");
    setUserMfaEmail("");
    setEnteredMfaMobile("");
  }, []);

  return (
    <DocumentTitle title={content["mfa-locked-out-document-title"]}>
      <StepWrapper>
        <DTEHeader as="h1">{content["mfa-locked-out-header"]}</DTEHeader>
        {content["mfa-locked-out-page"]}
      </StepWrapper>
    </DocumentTitle>
  );
};

export default MfaLockedOut;
