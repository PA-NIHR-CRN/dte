import styled from "styled-components";
import { Helmet } from "react-helmet";
import ReactGA from "react-ga";
import { Link } from "react-router-dom";
import DTEContent from "../../../components/Shared/UI/DTETypography/DTEContent/DTEContent";
import DTEDetails from "../../../components/Shared/UI/DTEDetails/DTEDetails";
import DTEHeader from "../../../components/Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTERouteLink from "../../../components/Shared/UI/DTERouteLink/DTERouteLink";
import StepWrapper from "../../../components/Shared/StepWrapper/StepWrapper";
import React, { useContext } from "react";
import { ContentContext } from "../../../context/ContentContext";

const ButtonWrapper = styled.div`
  margin: 1rem 0;
`;

const AccordionWrapper = styled.div`
  margin: 2rem 0;
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
        <DTEHeader as="h1">{content["introduction-header"]}</DTEHeader>
        {content["introduction-body"]}
        <AccordionWrapper>
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
        </AccordionWrapper>
        <ButtonWrapper>
          <Link
            to="/Participants/Register"
            role="button"
            draggable="false"
            className="govuk-button govuk-button--start"
            data-module="govuk-button"
            style={{ backgroundColor: "#193e72" }}
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
          </Link>
        </ButtonWrapper>
        <ButtonWrapper>{content["introduction-text-sign-in"]}</ButtonWrapper>
      </StepWrapper>
    </>
  );
}

export default NhsPreRegistration;
