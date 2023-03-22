import { useContext, useEffect } from "react";
import DTEHeader from "../../../../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../../../../Shared/UI/DTETypography/DTEContent/DTEContent";
import DTERouteLink from "../../../../../Shared/UI/DTERouteLink/DTERouteLink";
import { AuthContext } from "../../../../../../context/AuthContext";

const NoConsent = () => {
  const { isInNHSApp, logOutToken } = useContext(AuthContext);

  useEffect(() => {
    logOutToken();
  }, []);

  return (
    <>
      <DTEHeader as="h1" $variant="h2">
        Your registration has been cancelled
      </DTEHeader>
      <DTEContent>
        <strong>Your data has not been stored.</strong>
      </DTEContent>
      <DTEContent>
        Thank you for your interest in Be Part of Research. We hope to see you
        back again soon.
      </DTEContent>
      {!isInNHSApp && (
        <DTERouteLink external to="https://bepartofresearch.nihr.ac.uk/">
          Go to Be Part of Research homepage
        </DTERouteLink>
      )}
    </>
  );
};

export default NoConsent;
