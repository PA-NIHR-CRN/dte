import DocumentTitle from "react-document-title";
import Container from "../../Shared/Container/Container";
import DTEHeader from "../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import { useContext } from "react";
import { ContentContext } from "../../../context/ContentContext";

function AccountClosed() {
  const { content } = useContext(ContentContext);
  return (
    <DocumentTitle title={content["accountclosed-document-title"]}>
      <Container>
        <DTEHeader as="h1">{content["accountclosed-header"]}</DTEHeader>
        {content["accountclosed-page"]}
      </Container>
    </DocumentTitle>
  );
}

export default AccountClosed;
