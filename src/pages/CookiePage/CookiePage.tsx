import StepWrapper from "../../components/Shared/StepWrapper/StepWrapper";
import React, { useContext } from "react";
import { ContentContext } from "../../context/ContentContext";

function CookiePage() {
  const { content } = useContext(ContentContext);
  return (
    <StepWrapper>
      <div className="govuk-width-container">{content["cookies"]}</div>
    </StepWrapper>
  );
}

export default CookiePage;
