import DocumentTitle from "react-document-title";
import StepWrapper from "../../../Shared/StepWrapper/StepWrapper";
import DTEHeader from "../../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEHeaderCaption from "../../../Shared/UI/DTETypography/DTEHeaderCaption/DTEHeaderCaption";
import { useContext } from "react";
import { ContentContext } from "../../../../context/ContentContext";

function UpdateEmailSuccess() {
  const { content } = useContext(ContentContext);
  return (
    <DocumentTitle title={content["update-email-success-document-title"]}>
      <StepWrapper>
        <DTEHeaderCaption contentKey="update-email-success-header-caption" />
        <DTEHeader as="h1">{content["update-email-success-header"]}</DTEHeader>
        {content["update-email-success-page"]}
      </StepWrapper>
    </DocumentTitle>
  );
}

export default UpdateEmailSuccess;
