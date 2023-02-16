import DTEHeader from "../../../../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../../../../Shared/UI/DTETypography/DTEContent/DTEContent";
import DTERouteLink from "../../../../../Shared/UI/DTERouteLink/DTERouteLink";

const NoConsent = () => {
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
      <DTERouteLink external to="https://bepartofresearch.nihr.ac.uk/">
        Go to Be Part of Research homepage
      </DTERouteLink>
    </>
  );
};

export default NoConsent;
