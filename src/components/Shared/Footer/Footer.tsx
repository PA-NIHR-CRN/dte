/* eslint-disable no-nested-ternary */
import { Grid } from "@material-ui/core";
import styled from "styled-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import bporlogo from "../../../images/BPoR_logo_WO.svg";
import HSClogo from "../../../images/HSCLogo.svg";
import nihrlogo from "../../../images/NIHR-Logo.svg";
import HCRwaleslogo from "../../../images/Health-and-Care-Research-Wales-full-colour-logo-CMYK.svg";
import nhsScotlandlogo from "../../../images/nhs-research-scotland-logo.svg";
import shawTrustLogo from "../../../images/Accessibility-Accrediation-white-2048x597.png";
import { useContext } from "react";
import { ContentContext } from "../../../context/ContentContext";

interface IsMobileProps {
  isMobile?: boolean;
}
interface FooterPanelProps {
  color?: string;
}

const NavHeading = styled.h2`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  -webkit-clip-path: inset(50%);
  clip-path: inset(50%);
  border: 0;
  white-space: nowrap;
`;

const BPORLogo = styled.img.attrs(() => {
  return {
    src: `${bporlogo}`,
    alt: "Be Part Of Research footer Logo",
  };
})`
  max-height: 200px;
  padding: 2.2rem;
  max-width: 100%;
  width: 100%;
`;

const BPORLink = styled.a<IsMobileProps>`
  border: 3px solid ${(Props) => Props.theme.NIHR.Blue};
  display: block;
  padding: 0.2em;
  &:focus,
  :hover {
    background-color: ${(Props) => Props.theme.NIHR.Blue};
    border-color: ${(Props) => Props.theme.NIHR.Yellow};
    box-shadow: none;
  }
`;

const FooterPanel = styled(Grid)<FooterPanelProps>`
  background-color: ${(Props) => Props.color ?? Props.theme.NIHR.Blue};
`;

export default function Footer() {
  const { content } = useContext(ContentContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const servicesLinks = [
    { name: content["footer-item-find-study"], url: "https://bepartofresearch.nihr.ac.uk/" },
    {
      name: content["footer-item-add-study"],
      url: "https://bepartofresearch.nihr.ac.uk/promote-research/information-for-researchers/",
    },
    {
      name: content["footer-item-a-z"],
      url: "https://bepartofresearch.nihr.ac.uk/results/a-z-conditions",
    },
    {
      name: content["footer-item-glossary"],
      url: "https://bepartofresearch.nihr.ac.uk/about/glossary/",
    },
  ];

  const learnLinks = [
    {
      name: content["footer-item-what-is-health-and-care-research"],
      url: "https://bepartofresearch.nihr.ac.uk/what-is-health-and-care-research/",
    },
    {
      name: content["footer-item-why-take-part"],
      url: "https://bepartofresearch.nihr.ac.uk/take-part-in-research/why-taking-part-matters/",
    },
    {
      name: content["footer-item-what-happens-on-a-study"],
      url: "https://bepartofresearch.nihr.ac.uk/take-part-in-research/what-to-expect-on-a-study/",
    },
    {
      name: content["footer-item-consent-study"],
      url: "https://bepartofresearch.nihr.ac.uk/taking-part/Consent/",
    },
  ];

  const sitePolicyLinks = [
    {
      name: content["footer-item-all-site-policies"],
      url: "https://bepartofresearch.nihr.ac.uk/site-policies/",
    },
    {
      name: content["footer-item-accessibility"],
      url: "https://bepartofresearch.nihr.ac.uk/site-policies/accessibility",
    },
    {
      name: content["footer-item-complaints"],
      url: "https://bepartofresearch.nihr.ac.uk/site-policies/complaints",
    },
    {
      name: content["footer-item-cookie-policy"],
      url: "https://bepartofresearch.nihr.ac.uk/site-policies/cookie-policy",
    },
    {
      name: content["footer-item-freedom-information"],
      url: "https://bepartofresearch.nihr.ac.uk/site-policies/freedom-of-information",
    },
    {
      name: content["footer-item-privacy-policy"],
      url: "https://bepartofresearch.nihr.ac.uk/site-policies/privacy-policy",
    },
    {
      name: content["footer-item-terms-conditions"],
      url: "https://bepartofresearch.nihr.ac.uk/site-policies/terms-and-conditions",
    },
  ];

  const stayConnectedLinks = [
    {
      name: content["footer-item-blogs"],
      url: "https://bepartofresearch.nihr.ac.uk/Articles/index",
    },
    {
      name: content["footer-item-contact-us"],
      url: "https://bepartofresearch.nihr.ac.uk/get-in-touch/",
    },
    {
      name: content["footer-item-newsletter"],
      url: "https://nihr.us14.list-manage.com/subscribe?u=299dc02111e8a68172029095f&id=3b030a1027",
    },
  ];

  return (
    <>
      <div className="footer-wrapper nihr--corp">
        <footer className="page-footer bg-primary text-white">
          <div className="container">
            <div className="page-footer__top page-footer__border-bottom">
              <div className="region region-footer">
                <nav
                  role="navigation"
                  id="block-nihr-footer"
                  className="block block-menu navigation menu--footer"
                  aria-label="Footer menu"
                >
                  <ul data-block="footer" className="nav nav-level-0 row row-cols-1 row-cols-lg-4 gx-5 my-lg-0">
                    <li className="nav-item">
                      <a
                        className="link-footer link-level-0 white"
                        data-bs-toggle="collapse"
                        href="#collapse-768698"
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapse-768698"
                      >
                        {content["footer-heading-services"]}
                      </a>
                      <ul data-block="footer" className="collapse nav-nested" id="collapse-768698">
                        <li className="nav-item">
                          <a href="https://bepartofresearch.nihr.ac.uk/" className="white link-footer">
                            {content["footer-item-find-study"]}
                          </a>
                        </li>

                        <li className="nav-item">
                          <a
                            href="https://bepartofresearch.nihr.ac.uk/promote-research/information-for-researchers/"
                            className="white link-footer"
                          >
                            {content["footer-item-add-study"]}
                          </a>
                        </li>

                        <li className="nav-item">
                          <a
                            href="https://bepartofresearch.nihr.ac.uk/results/a-z-conditions"
                            className="white link-footer"
                          >
                            {content["footer-item-a-z"]}
                          </a>
                        </li>

                        <li className="nav-item">
                          <a href="https://bepartofresearch.nihr.ac.uk/about/glossary/" className="white link-footer">
                            {content["footer-item-glossary"]}
                          </a>
                        </li>
                      </ul>
                    </li>

                    <li className="nav-item">
                      <a
                        className="link-footer link-level-0 white"
                        data-bs-toggle="collapse"
                        href="#collapse-298211"
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapse-298211"
                      >
                        {content["footer-heading-learn"]}
                      </a>
                      <ul data-block="footer" className="collapse nav-nested" id="collapse-298211">
                        <li className="nav-item">
                          <a
                            href="https://bepartofresearch.nihr.ac.uk/what-is-health-and-care-research/"
                            title="Latest news"
                            className="white link-footer"
                          >
                            {content["footer-item-what-is-health-and-care-research"]}
                          </a>
                        </li>

                        <li className="nav-item">
                          <a
                            href="https://bepartofresearch.nihr.ac.uk/take-part-in-research/why-taking-part-matters/"
                            className="white link-footer"
                          >
                            {content["footer-item-why-take-part"]}
                          </a>
                        </li>

                        <li className="nav-item">
                          <a
                            href="https://bepartofresearch.nihr.ac.uk/take-part-in-research/what-to-expect-on-a-study/"
                            className="white link-footer"
                          >
                            {content["footer-item-what-happens-on-a-study"]}
                          </a>
                        </li>

                        <li className="nav-item">
                          <a
                            href="https://bepartofresearch.nihr.ac.uk/taking-part/Consent/"
                            className="white link-footer"
                          >
                            {content["footer-item-consent-study"]}
                          </a>
                        </li>
                      </ul>
                    </li>

                    <li className="nav-item">
                      <a
                        className="link-footer link-level-0 white"
                        data-bs-toggle="collapse"
                        href="#collapse-660177"
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapse-660177"
                      >
                        {content["footer-heading-stay-connected"]}
                      </a>
                      <ul data-block="footer" className="collapse nav-nested" id="collapse-660177">
                        <li className="nav-item">
                          <a href="https://bepartofresearch.nihr.ac.uk/Articles/index" className="white link-footer">
                            {content["footer-item-blogs"]}
                          </a>
                        </li>

                        <li className="nav-item">
                          <a href="https://bepartofresearch.nihr.ac.uk/get-in-touch/" className="white link-footer">
                            {content["footer-item-contact-us"]}
                          </a>
                        </li>

                        <li className="nav-item">
                          <a
                            href="https://nihr.us14.list-manage.com/subscribe?u=299dc02111e8a68172029095f&id=3b030a1027"
                            className="white link-footer"
                          >
                            {content["footer-item-newsletter"]}
                          </a>
                        </li>
                      </ul>
                    </li>

                    <li className="nav-item">
                      <a
                        className="link-footer link-level-0 white"
                        data-bs-toggle="collapse"
                        href="#collapse-298211"
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapse-298211"
                      >
                        {content["footer-heading-site-policies"]}
                      </a>
                      <ul data-block="footer" className="collapse nav-nested" id="collapse-298211">
                        <li className="nav-item">
                          <a href="https://bepartofresearch.nihr.ac.uk/site-policies/" className="white link-footer">
                            {content["footer-item-all-site-policies"]}
                          </a>
                        </li>

                        <li className="nav-item">
                          <a
                            href="https://bepartofresearch.nihr.ac.uk/site-policies/complaints"
                            className="white link-footer"
                          >
                            {content["footer-item-complaints"]}
                          </a>
                        </li>

                        <li className="nav-item">
                          <a
                            href="https://bepartofresearch.nihr.ac.uk/site-policies/freedom-of-information"
                            className="white link-footer"
                          >
                            {content["footer-item-freedom-information"]}
                          </a>
                        </li>

                        <li className="nav-item">
                          <a
                            href="https://bepartofresearch.nihr.ac.uk/site-policies/terms-and-conditions"
                            className="white link-footer"
                          >
                            {content["footer-item-terms-conditions"]}
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="row page-footer__bottom flex-column flex-lg-row gx-lg-5">
              <div className="col-12 col-lg-6 me-lg-auto">
                <div className="page-footer__bottom__left">
                  <div className="social-links">
                    <a
                      href="https://www.linkedin.com/company/nihr-research"
                      className="fa-link fa-brands fa-linkedin"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span className="visually-hidden">LinkedIn</span>
                    </a>
                    <a
                      href="https://x.com/NIHRresearch"
                      className="fa-link fa-brands fa-x-twitter"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span className="visually-hidden">X / Twitter</span>
                    </a>
                    <a
                      href="https://en-gb.facebook.com/OfficialNIHR/"
                      className="fa-link fa-brands fa-facebook"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span className="visually-hidden">Facebook</span>
                    </a>
                    <a
                      href="https://www.youtube.com/NIHRtv"
                      className="fa-link fa-brands fa-youtube"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span className="visually-hidden">YouTube</span>
                    </a>
                    <a
                      href="https://www.instagram.com/nihr_research/"
                      className="fa-link fa-brands fa-instagram"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span className="visually-hidden">Instagram</span>
                    </a>
                  </div>

                  <nav
                    role="navigation"
                    aria-label="Supplementary Footer Menu"
                    className="block block-menu navigation menu--footer-second"
                  >
                    <ul className="nav">
                      <li className="nav-item">
                        <a
                          href="https://bepartofresearch.nihr.ac.uk/site-policies/accessibility"
                          className="white link-footer"
                        >
                          {content["footer-item-accessibility"]}
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="https://bepartofresearch.nihr.ac.uk/site-policies/cookie-policy"
                          className="white link-footer"
                        >
                          {content["footer-item-cookie-policy"]}
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="https://bepartofresearch.nihr.ac.uk/site-policies/privacy-policy"
                          className="white link-footer"
                        >
                          {content["footer-item-privacy-policy"]}
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>

              <div className="col-12 col-lg-3 ms-lg-auto page-footer__bottom__right">
                <div className="funded-by">
                  <a
                    href="https://www.accessibility-services.co.uk/certificates/nihr-be-part-of-research/"
                    className="link-image"
                  >
                    <picture>
                      <img src={shawTrustLogo} className="mw-100" alt="Shaw Trust accessible" loading="lazy" />
                    </picture>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
      <div className="govuk-width-container container no-print" id="footerLogos">
        <div className="row FooterImageWrapper">
          <div className="col regional-logos nihr-image" id="NIHRFooter">
            <a
              href="https://www.nihr.ac.uk/"
              aria-label="National Institute for Health and Care Research"
              className="accessability-image"
            >
              <img
                src={nihrlogo}
                id="NihrLogo"
                className="regional-logos img-responsive"
                alt="National Institute for Health and Care Research"
              />
            </a>
          </div>

          <div className="col regional-logos NI-logo">
            <a
              href="http://www.research.hscni.net/"
              target="_blank"
              aria-label="Public Health Agency Northern Ireland"
              className="accessability-image NI-logo-link"
              rel="noreferrer"
            >
              <img
                src={HSClogo}
                className="regional-logos img-responsive NI-logo-img"
                alt="Public Health Agency Northern Ireland"
              />
            </a>
          </div>

          <div className="col regional-logos Scot-logo">
            <a
              href="https://www.nhsresearchscotland.org.uk/"
              target="_blank"
              aria-label="NHS Scotland"
              className="accessability-image scot-logo-img"
              rel="noreferrer"
            >
              <img src={nhsScotlandlogo} className="regional-logos img-responsive" alt="NHS Scotland" />
            </a>
          </div>

          <div className="col regional-logos HCW-logo">
            <a
              href="https://healthandcareresearchwales.org/"
              target="_blank"
              aria-label="Health and Care Research Wales"
              className="accessability-image"
              rel="noreferrer"
            >
              <img src={HCRwaleslogo} className="regional-logos img-responsive" alt="Health and Care Research Wales" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
