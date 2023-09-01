import DocumentTitle from "react-document-title";
import Container from "../../Shared/Container/Container";
import DTEContent from "../../Shared/UI/DTETypography/DTEContent/DTEContent";
import DTEHeader from "../../Shared/UI/DTETypography/DTEHeader/DTEHeader";

function AccountClosed() {
  return (
    <DocumentTitle title="Your account has been closed - Volunteer Account - Be Part of Research">
      <Container>
        <DTEHeader as="h1">Your account has been closed</DTEHeader>
        <DTEContent>Your personal data has been deleted.</DTEContent>
        <DTEContent>Thank you for your interest in Be Part of Research.</DTEContent>
      </Container>
    </DocumentTitle>
  );
}

export default AccountClosed;
