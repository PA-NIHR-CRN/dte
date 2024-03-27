import DocumentTitle from "react-document-title";
import StepWrapper from "../../../Shared/StepWrapper/StepWrapper";
import DTEHeader from "../../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import { useContext } from "react";
import { ContentContext } from "../../../../context/ContentContext";

function UpdateEmailSuccess() {
  const { content } = useContext(ContentContext);
  return (
    <DocumentTitle title={content["update-email-success-document-title"]}>
      <StepWrapper>
        <DTEHeader as="h1" captionKey="update-email-success-header">
          {content["update-email-success-header"]}
        </DTEHeader>
        {content["update-email-success-page"]}
      </StepWrapper>
    </DocumentTitle>
  );
}

export default UpdateEmailSuccess;
