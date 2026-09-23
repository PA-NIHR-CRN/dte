/* eslint-disable no-nested-ternary */
import HSClogo from "../../../images/HSCLogo.svg";
import nihrlogo from "../../../images/NIHR-Logo.svg";
import HCRwaleslogo from "../../../images/Health-and-Care-Research-Wales-full-colour-logo-CMYK.svg";
import nhsScotlandlogo from "../../../images/nhs-research-scotland-logo.svg";
import shawTrustLogo from "../../../images/Accessibility-Accrediation-white-2048x597.png";
import { useContext } from "react";
import { ContentContext } from "../../../context/ContentContext";

export default function Footer() {
  const { content } = useContext(ContentContext);

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
