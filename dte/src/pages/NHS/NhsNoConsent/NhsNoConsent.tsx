import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import DTEHeader from "../../../components/Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../../components/Shared/UI/DTETypography/DTEContent/DTEContent";
import DTERouteLink from "../../../components/Shared/UI/DTERouteLink/DTERouteLink";
import StepWrapper from "../../../components/Shared/StepWrapper/StepWrapper";
import { AuthContext } from "../../../context/AuthContext";
import DTEButton from "../../../components/Shared/UI/DTEButton/DTEButton";
import DTEBackLink from "../../../components/Shared/UI/DTEBackLink/DTEBackLink";
import DTELinkButton from "../../../components/Shared/UI/DTELinkButton/DTELinkButton";

const NhsNoConsent = () => {
  const { isInNHSApp } = useContext(AuthContext);
  const { search } = useLocation();
  const state = new URLSearchParams(search).get("state");
  return (
    <>
      {isInNHSApp && (
        <div className="nhs-app-provider-banner">
          <div className="nhsuk-width-container">
            <strong>
              This service is provided by the National Institute for Health and
              Care Research
            </strong>
          </div>
        </div>
      )}
      <StepWrapper>
        {!isInNHSApp && (
          <DTEBackLink
            linkText="Back"
            onClick={() =>
              window.history.go(state === "ssointegration" ? -2 : -3)
            }
          />
        )}
        <DTEHeader as="h1" $variant="h2">
          Your registration has been cancelled
        </DTEHeader>
        <DTEContent>
          <strong>Your data has not been stored.</strong>
        </DTEContent>
        <DTEContent>
          You have chosen not to share your NHS login account information with
          Be Part of Research. You can{" "}
          {isInNHSApp ? (
            <DTELinkButton
              onClick={() =>
                window.nhsapp.navigation.goToPage(
                  window.nhsapp.navigation.HOME_PAGE
                )
              }
            >
              go back
            </DTELinkButton>
          ) : (
            "go back"
          )}{" "}
          and change this decision if you wish.
        </DTEContent>
        <DTEContent>
          You can find out more about taking part in health and care research
          and register using your email address on the Be Part of Research
          website.
        </DTEContent>
        {isInNHSApp ? (
          <DTEButton
            onClick={() =>
              window.nhsapp.navigation.openBrowserOverlay(
                "https://bepartofresearch.nihr.ac.uk/"
              )
            }
          >
            Go to Be Part of Research homepage
          </DTEButton>
        ) : (
          <DTERouteLink external to="https://bepartofresearch.nihr.ac.uk/">
            Go to Be Part of Research homepage
          </DTERouteLink>
        )}
      </StepWrapper>
    </>
  );
};

export default NhsNoConsent;
