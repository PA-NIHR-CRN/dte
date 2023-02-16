import { useEffect, useState } from "react";
import ReactGA from "react-ga";
import { hotjar } from "react-hotjar";
import Cookies from "js-cookie";
import DTEButton from "../UI/DTEButton/DTEButton";
import DTEContent from "../UI/DTETypography/DTEContent/DTEContent";
import DTERouteLink from "../UI/DTERouteLink/DTERouteLink";
import DTEHeader from "../UI/DTETypography/DTEHeader/DTEHeader";

// eslint-disable-next-line
const reactGTMModule = require("react-gtm-module");

const tagManagerArgs = {
  gtmId: "GTM-MH4K4Z7",
};

const CookieBanner = () => {
  const [cookiesAccepted, setCookiesAccepted] = useState(
    Cookies.get("cookiesAccepted") || null
  );
  const [confirmationBannerShow, setConfirmationBannerShow] = useState(false);
  const [cookieBannerHide, setCookieBannerHide] = useState(true);

  useEffect(() => {
    if (cookiesAccepted === "true") {
      ReactGA.initialize("UA-125366174-4");
      reactGTMModule.initialize(tagManagerArgs);
      hotjar.initialize(3226374, 6);
      ReactGA.pageview(window.location.pathname + window.location.search);
    } else if (cookiesAccepted == null) {
      setCookieBannerHide(false);
    }
  }, [cookiesAccepted]);

  const handleAcceptCookie = () => {
    setCookiesAccepted("true");

    Cookies.set("cookiesAccepted", "true", {
      path: "/",
      expires: 182.5,
    });
    setConfirmationBannerShow(true);
  };

  const handleRejectCookie = () => {
    setCookiesAccepted("false");

    Cookies.set("cookiesAccepted", "false", {
      path: "/",
      expires: 182.5,
    });
    setConfirmationBannerShow(true);
  };
  const handleHideBanner = () => {
    setCookieBannerHide(true);
    setConfirmationBannerShow(false);
  };

  // eslint-disable-next-line no-nested-ternary
  return cookiesAccepted === null && !confirmationBannerShow ? (
    <div
      className="govuk-cookie-banner GDSCookieBanner"
      data-nosnippet
      role="region"
      aria-label="Cookies on Be Part of Research"
    >
      {!cookieBannerHide && (
        <div className="govuk-cookie-banner__message govuk-width-container">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column">
              <DTEHeader as="h1">Cookies on Be Part of Research</DTEHeader>
              <div className="govuk-cookie-banner__content">
                <DTEContent>
                  We use some essential cookies to make this service work.
                </DTEContent>
                <DTEContent>
                  We&apos;d also like to use analytics cookies so we can
                  understand how you use Be Part of Research, remember your
                  settings and improve the service.
                </DTEContent>
                <DTEContent>
                  We also use cookies set by other sites to help us deliver
                  content via their services.
                </DTEContent>
              </div>
            </div>
          </div>
          <div className="govuk-button-group">
            <div className="cookie-button">
              <DTEButton onClick={() => handleAcceptCookie()} type="button">
                Accept analytics cookies
              </DTEButton>
            </div>
            <div className="cookie-button">
              <DTEButton onClick={() => handleRejectCookie()} type="button">
                Reject analytics cookies
              </DTEButton>
            </div>
            <DTERouteLink to="/cookies" renderStyle="standard">
              View cookies
            </DTERouteLink>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div>
      {confirmationBannerShow && (
        <form method="POST">
          <div
            className="govuk-cookie-banner GDSCookieBanner"
            data-nosnippet
            role="region"
            aria-label="Cookies on Be Part of Research"
          >
            <div className="govuk-cookie-banner__message govuk-width-container">
              <div className="govuk-grid-row">
                <div className="govuk-grid-column">
                  <div className="govuk-cookie-banner__content">
                    <p className="govuk-body">
                      <DTEContent>
                        You’ve
                        {cookiesAccepted === "true" && <span> accepted </span>}
                        {cookiesAccepted === "false" && <span> rejected </span>}
                        additional cookies. You can{" "}
                        <DTERouteLink renderStyle="standard" to="/cookies">
                          view your cookie settings
                        </DTERouteLink>{" "}
                        at any time. Your preference has been saved for 6
                        months.
                      </DTEContent>
                    </p>
                  </div>
                </div>
              </div>
              <div className="govuk-button-group">
                <DTEButton onClick={() => handleHideBanner()} type="button">
                  Hide cookie message
                </DTEButton>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default CookieBanner;
