import DocumentTitle from "react-document-title";
import StepWrapper from "../../../Shared/StepWrapper/StepWrapper";
import DTERouteLink from "../../../Shared/UI/DTERouteLink/DTERouteLink";
import DTEHeader from "../../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../../Shared/UI/DTETypography/DTEContent/DTEContent";

const UpdateEmailSuccess = () => {
  return (
    <DocumentTitle title="Your email address has been updated - Volunteer Account - Be Part of Research">
      <StepWrapper>
        <DTEHeader as="h1">Your email address has been updated</DTEHeader>
        <DTEContent>You need to sign back in to your account.</DTEContent>
        <DTERouteLink to="/">Sign in</DTERouteLink>
      </StepWrapper>
    </DocumentTitle>
  );
};

export default UpdateEmailSuccess;
