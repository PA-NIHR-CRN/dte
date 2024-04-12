import DocumentTitle from "react-document-title";
import StepWrapper from "../../../Shared/StepWrapper/StepWrapper";
import DTERouteLink from "../../../Shared/UI/DTERouteLink/DTERouteLink";
import DTEHeader from "../../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import { useContext } from "react";
import { ContentContext } from "../../../../context/ContentContext";

function UpdatePasswordSuccess() {
  const { content } = useContext(ContentContext);
  return (
    <DocumentTitle title={content["updatepassword-success-document-title"]}>
      <StepWrapper>
        <DTEHeader as="h1" captionKey="resetpassword-header-updated">
          {content["resetpassword-header-updated"]}
        </DTEHeader>
        <DTERouteLink to="/">{content["updatepassword-success-return-to-account"]}</DTERouteLink>
      </StepWrapper>
    </DocumentTitle>
  );
}

export default UpdatePasswordSuccess;
