import DTEHeader from "../../../components/Shared/UI/DTETypography/DTEHeader/DTEHeader";
import StepWrapper from "../../../components/Shared/StepWrapper/StepWrapper";
import { useContext } from "react";
import { ContentContext } from "../../../context/ContentContext";

function Under18ErrorPage() {
  const { content } = useContext(ContentContext);
  return (
    <StepWrapper>
      <DTEHeader as="h1">{content["error-summary-title-problem"]}</DTEHeader>
      {content["nhs-under-18"]}
    </StepWrapper>
  );
}

export default Under18ErrorPage;
