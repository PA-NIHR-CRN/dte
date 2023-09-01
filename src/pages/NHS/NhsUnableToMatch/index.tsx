import { useContext } from "react";
import DTEHeader from "../../../components/Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../../components/Shared/UI/DTETypography/DTEContent/DTEContent";
import StepWrapper from "../../../components/Shared/StepWrapper/StepWrapper";
import { AuthContext } from "../../../context/AuthContext";

function NhsUnableToMatch() {
  const { isInNHSApp } = useContext(AuthContext);
  return (
    <StepWrapper>
      <DTEHeader as="h1">There is a problem</DTEHeader>
      {isInNHSApp ? (
        <DTEContent>
          Please contact us by email at bepartofresearch@nihr.ac.uk so that we can identify and resolve the cause of the
          issue.
        </DTEContent>
      ) : (
        <DTEContent>
          Please contact us by email at <a href="mailto:bepartofresearch@nihr.ac.uk">bepartofresearch@nihr.ac.uk</a> so
          that we can identify and resolve the cause of the issue.
        </DTEContent>
      )}
    </StepWrapper>
  );
}

export default NhsUnableToMatch;
