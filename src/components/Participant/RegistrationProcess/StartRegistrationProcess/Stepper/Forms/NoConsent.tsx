import React, { useContext, useEffect } from "react";
import DTEHeader from "../../../../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTERouteLink from "../../../../../Shared/UI/DTERouteLink/DTERouteLink";
import { AuthContext } from "../../../../../../context/AuthContext";
import DTEButton from "../../../../../Shared/UI/DTEButton/DTEButton";
import { ContentContext } from "../../../../../../context/ContentContext";

function NoConsent() {
  const { isInNHSApp, logOutToken } = useContext(AuthContext);
  const { content } = useContext(ContentContext);
  useEffect(() => {
    logOutToken();
  }, []);

  return (
    <>
      <DTEHeader as="h1" $variant="h2">
        {content["register-no-consent-header"]}
      </DTEHeader>
      {content["register-no-consent-body"]}
      {!isInNHSApp ? (
        <DTERouteLink external to="https://bepartofresearch.nihr.ac.uk/">
          {content["register-no-consent-button-homepage"]}
        </DTERouteLink>
      ) : (
        <DTEButton onClick={() => window.nhsapp.navigation.openBrowserOverlay("https://bepartofresearch.nihr.ac.uk/")}>
          {content["register-no-consent-button-homepage"]}
        </DTEButton>
      )}
    </>
  );
}

export default NoConsent;
