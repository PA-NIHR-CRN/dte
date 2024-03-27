import React, { useContext, useRef } from "react";
import styled from "styled-components";
import DocumentTitle from "react-document-title";
import Container from "../../Shared/Container/Container";
import DTEHeader from "../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEBackLink from "../../Shared/UI/DTEBackLink/DTEBackLink";
import { ContentContext } from "../../../context/ContentContext";

const StyledWrapper = styled.div`
  scroll-margin-top: 10em;
`;

function Newsletter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { content } = useContext(ContentContext);

  return (
    <DocumentTitle title={content["newsletter-document-title"]}>
      <StyledWrapper role="main" id="main" ref={containerRef}>
        <Container>
          <DTEBackLink href="/" linkText={content["reusable-back-link"]} />
          <DTEHeader as="h1" captionKey="reusable-newsletter-header">
            {content["reusable-newsletter-header"]}
          </DTEHeader>
          {content["newsletter"]}
        </Container>
      </StyledWrapper>
    </DocumentTitle>
  );
}

export default Newsletter;
