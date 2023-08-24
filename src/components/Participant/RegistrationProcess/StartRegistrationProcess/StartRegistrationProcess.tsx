import DocumentTitle from "react-document-title";
import StepWrapper from "../../../Shared/StepWrapper/StepWrapper";
import { ContentContext } from "../../../../context/ContentContext";
import { useContext } from "react";

function StartRegistrationProcess() {
  const { content } = useContext(ContentContext);

  return (
    <DocumentTitle title={content["register-page-document-title"]}>
      <StepWrapper>{content["register-page"]}</StepWrapper>
    </DocumentTitle>
  );
}

export default StartRegistrationProcess;
