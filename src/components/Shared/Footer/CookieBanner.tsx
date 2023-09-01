import React, { useContext, useEffect, useState } from "react";
import ReactGA from "react-ga";
import { hotjar } from "react-hotjar";
import Cookies from "js-cookie";
import DTEButton from "../UI/DTEButton/DTEButton";
import DTERouteLink from "../UI/DTERouteLink/DTERouteLink";
import DTEHeader from "../UI/DTETypography/DTEHeader/DTEHeader";
import { ContentContext } from "../../../context/ContentContext";
import Honeypot from "../Honeypot/Honeypot";

// eslint-disable-next-line
const reactGTMModule = require("react-gtm-module");

const tagManagerArgs = {
  gtmId: "GTM-MH4K4Z7",
};

function CookieBanner() {
  const { content } = useContext(ContentContext);
  const [cookiesAccepted, setCookiesAccepted] = useState(Cookies.get("cookiesAccepted") || null);
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
      domain: process.env.REACT_APP_COOKIE_DOMAIN || ".bepartofresearch.nihr.ac.uk",
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
                {content["cookiebanner-header"]}
              </DTEHeader>
              <div className="govuk-cookie-banner__content">{content["cookiebanner-body"]}</div>
            </div>
          </div>
          <div className="govuk-button-group">
            <DTEButton id="acceptCookies" $small onClick={() => handleAcceptCookie()}>
              {content["cookiebanner-button-accept"]}
            </DTEButton>
            <DTEButton id="rejectCookies" $small onClick={() => handleRejectCookie()} type="button">
              {content["cookiebanner-button-reject"]}
            </DTEButton>
            <DTERouteLink id="viewCookiesLink" to="/cookies" renderStyle="standard">
              {content["cookiebanner-link-view"]}
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
                      {content[`cookiebanner-text-confirmation-${cookiesAccepted === "true" ? "accept" : "reject"}`]}
                    </p>
                  </div>
                </div>
              </div>
              <div className="govuk-button-group hideCookieButtonGroup">
                <DTEButton $small onClick={() => handleHideBanner()} type="button" id="hideCookieButton">
                  {content["cookiebanner-button-hide"]}
                </DTEButton>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default CookieBanner;
