import React, { useRef } from "react";
import styled from "styled-components";
import DocumentTitle from "react-document-title";
import Container from "../../Shared/Container/Container";
import DTEHeader from "../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../Shared/UI/DTETypography/DTEContent/DTEContent";
import DTEBackLink from "../../Shared/UI/DTEBackLink/DTEBackLink";
import DTERouteLink from "../../Shared/UI/DTERouteLink/DTERouteLink";

const StyledWrapper = styled.div`
  scroll-margin-top: 10em;
`;
const ButtonWrapper = styled.div`
  margin: 2rem 0;
`;

const Newsletter = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <DocumentTitle title="Be Part of Research Newsletter - Volunteer Account - Be Part of Research">
      <StyledWrapper role="main" id="main" ref={containerRef}>
        <Container>
          <DTEBackLink href="/" linkText="Back" />
          <DTEHeader as="h1">Be Part of Research Newsletter</DTEHeader>
          <DTEContent $marginBottom="medium">
            As the Be Part of Research Volunteer Service is in &apos;private
            beta&apos;, it may take some time to hear about studies you can take
            part in. By signing up to our monthly newsletter, you&apos;ll
            receive all our latest news and hear of more opportunities to take
            part in research from across the UK.
          </DTEContent>
          <ButtonWrapper>
            <DTERouteLink
              external
              to="https://nihr.us14.list-manage.com/subscribe?u=299dc02111e8a68172029095f&id=3b030a1027&utm_source=bpor-vs-website&utm_medium=referral&utm_campaign=bpor-newsletter"
              target="_blank"
            >
              Sign up to the Be Part of Research newsletter
            </DTERouteLink>
          </ButtonWrapper>
        </Container>
      </StyledWrapper>
    </DocumentTitle>
  );
};

export default Newsletter;
