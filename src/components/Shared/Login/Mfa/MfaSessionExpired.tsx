import { useContext, useEffect } from "react";
import DocumentTitle from "react-document-title";
import DTEHeader from "../../UI/DTETypography/DTEHeader/DTEHeader";
import StepWrapper from "../../StepWrapper/StepWrapper";
import { AuthContext } from "../../../../context/AuthContext";
import { ContentContext } from "../../../../context/ContentContext";

const MfaSessionExpired = () => {
  const { content } = useContext(ContentContext);
  const { setMfaDetails, setUserMfaEmail, setEnteredMfaMobile } = useContext(AuthContext);

  useEffect(() => {
    setMfaDetails("");
    setUserMfaEmail("");
    setEnteredMfaMobile("");
  }, []);

  return (
    <DocumentTitle title={content["mfa-session-expired-document-title"]}>
      <StepWrapper>
        <DTEHeader as="h1" captionKey="mfa-session-expired-header">
          {content["mfa-session-expired-header"]}
        </DTEHeader>
        {content["mfa-session-expired-page"]}
      </StepWrapper>
    </DocumentTitle>
  );
};

export default MfaSessionExpired;
