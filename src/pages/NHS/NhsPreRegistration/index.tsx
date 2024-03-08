import styled from "styled-components";
import { Helmet } from "react-helmet";
import ReactGA from "react-ga";
import { Link } from "react-router-dom";
import DTEContent from "../../../components/Shared/UI/DTETypography/DTEContent/DTEContent";
import DTEDetails from "../../../components/Shared/UI/DTEDetails/DTEDetails";
import DTEHeader from "../../../components/Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTERouteLink from "../../../components/Shared/UI/DTERouteLink/DTERouteLink";
import DTEHeaderCaption from "../../../../src/components/Shared/UI/DTETypography/DTEHeaderCaption/DTEHeaderCaption";
import StepWrapper from "../../../components/Shared/StepWrapper/StepWrapper";
import React, { useContext } from "react";
import { ContentContext } from "../../../context/ContentContext";
import { baseButton } from "../../../components/Shared/UI/DTEButton/DTEButton";

interface WrapperProps {
  margin?: string;
}

const StyledLink = styled(Link)`
  text-underline-offset: 2.5px;
  background-color: ${(props) => props.theme.NIHR.LinkBlue};
  text-decoration-color: ${(props) => props.theme.NIHR.LinkBlue};
  &:focus {
    color: ${(props) => props.theme.NIHR.Blue};
    text-decoration: none;
    background-color: ${(props) => props.theme.NIHR.Yellow} !important;
    box-shadow:
      0 -2px ${(props) => props.theme.NIHR.Yellow},
      0 4px ${(props) => props.theme.NIHR.Blue} !important;
    border: 0.25rem solid ${(props) => props.theme.NIHR.Yellow} !important;
  }
  &:hover {
    color: ${(props) => props.theme.NIHR.Blue};
    text-decoration-color: ${(props) => props.theme.NIHR.Blue};
    text-decoration-thickness: max(3px, 0.1875rem, 0.12em);
    &:focus {
      text-decoration-line: none;
      text-decoration-thickness: none;
    }
  }
  &:visited {
    color: ${(props) => props.theme.NIHR.LinkBlue};
    &:focus {
      color: ${(props) => props.theme.NIHR.Blue};
    }
    &:hover {
      color: ${(props) => props.theme.NIHR.Blue};
    }
  }
  &.button-route {
    ${baseButton};
  }
`;

const Wrapper = styled.div<WrapperProps>`
  margin: ${({ margin }) => margin || "1rem 0"};
`;

function NhsPreRegistration() {
  const { content } = useContext(ContentContext);
  return (
    <>
      <Helmet
        title={content["introduction-document-title"]}
        meta={[
          {
            name: `robots`,
            content: "noindex",
          },
        ]}
      />
      <StepWrapper>
        <DTEHeaderCaption contentKey="introduction-header-caption" />
        <DTEHeader as="h1">{content["introduction-header"]}</DTEHeader>
        {content["introduction-body"]}
        <Wrapper margin="2rem 0">
        <DTEHeaderCaption contentKey="introduction-accordion-header-caption" />
          <DTEDetails summary={content["introduction-accordion-header"]}>
            <DTEContent>
              {content["introduction-accordion-body1"]}{" "}
              <DTERouteLink
                external
                target="_blank"
                to="https://bepartofresearch.nihr.ac.uk/volunteer-service/"
                renderStyle="standard"
                onClick={() =>
                  ReactGA.outboundLink(
                    {
                      label: "Be Part of Research",
                    },
                    () => {},
                    ["https://bepartofresearch.nihr.ac.uk/volunteer-service/"]
                  )
                }
              >
                {content["introduction-accordion-link"]}
              </DTERouteLink>
              {content["introduction-accordion-body2"]}
            </DTEContent>
          </DTEDetails>
        </Wrapper>
        <Wrapper>
          <StyledLink
            to="/Participants/Register"
            role="button"
            draggable="false"
            className="govuk-button govuk-button--start button-route"
            data-module="govuk-button"
            onClick={() => {
              ReactGA.event({
                category: "Internal Link Clicks",
                action: "https://volunteer.bepartofresearch.nihr.ac.uk/Participants/Register",
                label: "Register",
              });
            }}
          >
            {content["introduction-button-start-now"]}
            <svg
              className="govuk-button__start-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="17.5"
              height="19"
              viewBox="0 0 33 40"
              aria-hidden="true"
              focusable="false"
            >
              <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
            </svg>
          </StyledLink>
        </Wrapper>
        <Wrapper>{content["introduction-text-sign-in"]}</Wrapper>
      </StepWrapper>
    </>
  );
}

export default NhsPreRegistration;
