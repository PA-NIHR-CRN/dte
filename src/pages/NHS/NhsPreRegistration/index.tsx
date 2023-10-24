import styled from "styled-components";
import { Helmet } from "react-helmet";
import ReactGA from "react-ga";
import { useHistory } from "react-router-dom";
import DTEContent from "../../../components/Shared/UI/DTETypography/DTEContent/DTEContent";
import DTEDetails from "../../../components/Shared/UI/DTEDetails/DTEDetails";
import DTEHeader from "../../../components/Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTERouteLink from "../../../components/Shared/UI/DTERouteLink/DTERouteLink";
import StepWrapper from "../../../components/Shared/StepWrapper/StepWrapper";
import DTEButton from "../../../components/Shared/UI/DTEButton/DTEButton";
import React, { useContext } from "react";
import { ContentContext } from "../../../context/ContentContext";
import DTELinkButton from "../../../components/Shared/UI/DTELinkButton/DTELinkButton";

const ButtonWrapper = styled.div`
  margin: 1rem 0;
`;

const AccordionWrapper = styled.div`
  margin: 2rem 0;
`;

function NhsPreRegistration() {
  const { content } = useContext(ContentContext);
  const history = useHistory();
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
          <DTEButton
            onClick={() => {
              history.push("/Participants/Register");
              ReactGA.event({
                category: "Internal Link Clicks",
                action: "https://volunteer.bepartofresearch.nihr.ac.uk/Participants/Register",
                label: "Register",
              });
            }}
            ariaLabel="Continue to register for an account"
          >
            {content["introduction-button-register"]}
          </DTEButton>
        </ButtonWrapper>
        <DTEContent>{content["introduction-text-account"]}</DTEContent>
        <ButtonWrapper>
          <DTEButton
            $outlined
            onClick={() => {
              history.push("/Participants/Options");
              ReactGA.event({
                category: "Internal Link Clicks",
                action: "https://volunteer.bepartofresearch.nihr.ac.uk/Participants/Options",
                label: "Sign in",
              });
            }}
          >
            {content["reusable-button-signin"]}
          </DTEButton>
          <br></br>
          <br></br>
          <button
            className="govuk-button govuk-button--start"
            style={{ backgroundColor: "#00407a", color: "#ffffff" }}
            onClick={() => history.push("/Participants/Register")}
          >
            Start now
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
          </button>
          <DTEContent>
            If you already have an account, you can{" "}
            <DTELinkButton onClick={() => history.push("/Participants/Options")}>sign in</DTELinkButton>
          </DTEContent>
        </ButtonWrapper>
      </StepWrapper>
    </>
  );
}

export default NhsPreRegistration;
