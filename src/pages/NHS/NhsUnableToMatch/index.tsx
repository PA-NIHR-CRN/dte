import { useContext } from "react";
import DTEHeader from "../../../components/Shared/UI/DTETypography/DTEHeader/DTEHeader";
import StepWrapper from "../../../components/Shared/StepWrapper/StepWrapper";
import { AuthContext } from "../../../context/AuthContext";
import { ContentContext } from "../../../context/ContentContext";

function NhsUnableToMatch() {
  const { content } = useContext(ContentContext);
  const { isInNHSApp } = useContext(AuthContext);
  return (
    <StepWrapper>
      <DTEHeader as="h1" captionKey="error-summary-title-problem">
        {content["error-summary-title-problem"]}
      </DTEHeader>
      {isInNHSApp ? content["nhs-unable-to-match-app"] : content["nhs-unable-to-match"]}
    </StepWrapper>
  );
}

export default NhsUnableToMatch;
