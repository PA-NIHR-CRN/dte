import DocumentTitle from "react-document-title";
import StepWrapper from "../../../Shared/StepWrapper/StepWrapper";
import DTERouteLink from "../../../Shared/UI/DTERouteLink/DTERouteLink";
import DTEHeader from "../../../Shared/UI/DTETypography/DTEHeader/DTEHeader";

const UpdatePasswordSuccess = () => {
  return (
    <DocumentTitle title="Your password has been updated - Volunteer Account - Be Part of Research">
      <StepWrapper>
        <DTEHeader as="h1">Your password has been updated</DTEHeader>
        <DTERouteLink to="/">Go back to my account</DTERouteLink>
      </StepWrapper>
    </DocumentTitle>
  );
};

export default UpdatePasswordSuccess;
