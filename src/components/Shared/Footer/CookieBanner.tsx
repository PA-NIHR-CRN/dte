import { useEffect, useState } from "react";
import ReactGA from "react-ga";
import { hotjar } from "react-hotjar";
import Cookies from "js-cookie";
import DTEButton from "../UI/DTEButton/DTEButton";
import DTEContent from "../UI/DTETypography/DTEContent/DTEContent";
import DTERouteLink from "../UI/DTERouteLink/DTERouteLink";
import DTEHeader from "../UI/DTETypography/DTEHeader/DTEHeader";
import Honeypot from "../Honeypot/Honeypot";

// eslint-disable-next-line
const reactGTMModule = require("react-gtm-module");

const tagManagerArgs = {
  gtmId: "GTM-MH4K4Z7",
};

const CookieBanner = () => {
  const [cookiesAccepted, setCookiesAccepted] = useState(
    Cookies.get("cookiesAccepted") || null,
  );
  const [confirmationBannerShow, setConfirmationBannerShow] = useState(false);
  const [cookieBannerHide, setCookieBannerHide] = useState(true);

  useEffect(() => {
    if (cookiesAccepted != null && cookiesAccepted.includes("true")) {
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

    Cookies.set("cookiesAccepted", "true-20221221", {
      path: "/",
      domain:
        process.env.REACT_APP_COOKIE_DOMAIN || ".bepartofresearch.nihr.ac.uk",
      expires: 182.5,
    });
    setConfirmationBannerShow(true);
  };

  const handleRejectCookie = () => {
    setCookiesAccepted("false");

    Cookies.set("cookiesAccepted", "false-20221221", {
      path: "/",
      domain: ".bepartofresearch.nihr.ac.uk",
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
            <div className="govuk-grid-column-two-thirds cookiesHeader">
              <DTEHeader as="h3" $variant="h3">
                Cookies on Be Part of Research
              </DTEHeader>
              <div className="govuk-cookie-banner__content">
                <DTEContent>
                  We use some essential cookies to make this service work.
                </DTEContent>
                <DTEContent>
                  We would like to use additional cookies to remember your
                  settings, understand how you use Be Part of Research and
                  improve the service.
                </DTEContent>
                <DTEContent>
                  We also use cookies set by other sites to help us deliver
                  content via their services.
                </DTEContent>
              </div>
            </div>
          </div>
          <div className="govuk-button-group">
            <DTEButton
              id="acceptCookies"
              $small
              onClick={() => handleAcceptCookie()}
            >
              Accept additional cookies
            </DTEButton>
            <DTEButton
              id="rejectCookies"
              $small
              onClick={() => handleRejectCookie()}
              type="button"
            >
              Reject additional cookies
            </DTEButton>
            <DTERouteLink
              id="viewCookiesLink"
              to="/cookies"
              renderStyle="standard"
            >
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
          <Honeypot />
          <div
            className="govuk-cookie-banner GDSCookieBanner"
            data-nosnippet
            role="region"
            aria-label="Cookies on Be Part of Research"
          >
            <div className="govuk-cookie-banner__message govuk-width-container">
              <div className="govuk-grid-row">
                <div className="govuk-grid-column-two-thirds">
                  <div className="govuk-cookie-banner__content">
                    <p className="govuk-body hideCookieMessage">
                      <DTEContent>
                        You’ve
                        {cookiesAccepted === "true" && <span> accepted </span>}
                        {cookiesAccepted === "false" && <span> rejected </span>}
                        additional cookies. You can{" "}
                        <DTERouteLink renderStyle="standard" to="/cookies">
                          View our cookie policy
                        </DTERouteLink>{" "}
                        for more information at any time.
                      </DTEContent>
                    </p>
                  </div>
                </div>
              </div>
              <div className="govuk-button-group hideCookieButtonGroup">
                <DTEButton
                  $small
                  onClick={() => handleHideBanner()}
                  type="button"
                  id="hideCookieButton"
                >
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
