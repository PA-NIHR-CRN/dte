/* eslint-disable no-nested-ternary */
import { Grid } from "@material-ui/core";
import styled from "styled-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faYoutube, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import bporlogo from "../../../images/BPoR_logo_WO.svg";
import HSClogo from "../../../images/HSCLogo.svg";
import nihrlogo from "../../../images/NIHR-Logo.svg";
import shawTrustLogo from "../../../images/Shaw_Trust_logo.svg";
import HCRwaleslogo from "../../../images/Health-and-Care-Research-Wales-full-colour-logo-CMYK.svg";
import nhsScotlandlogo from "../../../images/nhs-research-scotland-logo.svg";
import FooterLinksPanel from "./FooterLinksPanel";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
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

const ShawTrustLink = styled.a.attrs(() => {
  return {
    "aria-label": "Shaw Trust Accessible, Be Part of Research Accreditation (Opens in a new tab)",
    href: "https://www.accessibility-services.co.uk/certificates/nihr-be-part-of-research/",
    target: "_blank",
    rel: "noopener noreferrer",
  };
})<IsMobileProps>`
  border: 3px solid ${(Props) => Props.theme.NIHR.DarkestBlue};
  display: block;
  &:focus,
  :hover {
    background-color: ${(Props) => Props.theme.NIHR.Blue};
    border-color: ${(Props) => Props.theme.NIHR.Yellow};
    box-shadow: none;
  }
`;
const ShawTrustLogo = styled.img.attrs(() => {
  return {
    src: `${shawTrustLogo}`,
    alt: "Shaw trust Logo",
  };
})`
  max-height: 200px;
  max-width: 100%;
  width: 100%;
`;

// eslint-disable-next-line
const NIHRLogo = styled.img.attrs(() => {
  return {
    src: `${nihrlogo}`,
    alt: "National Institute for Health Research Logo",
  };
})<IsMobileProps>`
  width: 100%;
`;

// eslint-disable-next-line
const FooterImageLink = styled.a`
  border: 3px solid transparent;
  display: block;
  text-align: center;
  :focus,
  :hover {
    background-color: transparent;
    border-color: ${(Props) => Props.theme.NIHR.Yellow};
    box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.75);
  }
`;

// eslint-disable-next-line
const HSCLogo = styled.img.attrs(() => {
  return {
    src: `${HSClogo}`,
    alt: "Public Heath Agency Research and Development Logo",
  };
})<IsMobileProps>`
  width: 100%;
`;

// eslint-disable-next-line
const NHSScotlandLogo = styled.img.attrs(() => {
  return {
    src: `${nhsScotlandlogo}`,
    alt: "NHS Scotland Logo",
  };
})<IsMobileProps>`
  width: 80%;
`;

// eslint-disable-next-line
const HCRWales = styled.img.attrs(() => {
  return {
    src: `${HCRwaleslogo}`,
    alt: "Health and Care Research Wales Logo",
  };
})<IsMobileProps>`
  width: 100%;
`;

const FollowUsText = styled.span<IsMobileProps>`
  && {
    color: ${(Props) => Props.color ?? Props.theme.NIHR.PrimaryWhite};
    font-size: 1em;
    font-family: Lato;
    margin-right: 1.2em;
    font-weight: 900;
  }
`;

const FooterPanel = styled(Grid)<FooterPanelProps>`
  background-color: ${(Props) => Props.color ?? Props.theme.NIHR.Blue};
`;

// eslint-disable-next-line
const StyledFooterPanel = styled(FooterPanel)`
  background-color: ${(Props) => Props.theme.NIHR.PrimaryWhite};
`;

const SocialPanel = styled(Grid)`
  background-color: ${(Props) => Props.theme.NIHR.DarkestBlue};
  padding: 1em;
`;

const SocialIconContainer = styled(Link)`
  width: 3em;
  padding: 0.2em;
  display: inline-block;
  text-align: center;
  border: 3px solid ${(Props) => Props.theme.NIHR.DarkestBlue};
  :focus,
  :hover {
    border-color: ${(Props) => Props.theme.NIHR.Yellow};
    box-shadow: none;
    background-color: ${(Props) => Props.theme.NIHR.DarkestBlue};
  }
`;

const SocialIconWrapper = styled.span`
  width: 2em;
  height: 2em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${(Props) => Props.theme.NIHR.PrimaryWhite};
  border-radius: 50%;
`;

const SocialIcon = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.NIHR.Blue};
  background-color: ${(props) => props.color ?? props.theme.NIHR.PrimaryWhite};
  width: 1.4em;
  height: 1.4em;
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
    <footer>
      <SocialPanel container direction="row" alignContent="center" alignItems="center" justifyContent="center">
        <Grid xs={10} direction="row" container justifyContent={isMobile ? "flex-start" : "space-between"}>
          <ShawTrustLink>
            <ShawTrustLogo />
          </ShawTrustLink>
          <Grid item xs={12} md={5} lg={4}>
            <FollowUsText>{content["footer-follow-us"]} </FollowUsText>
            <SocialIconContainer
              to={{ pathname: "https://www.facebook.com/OfficialNIHR/" }}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook (Opens in a new tab)"
            >
              <SocialIconWrapper>
                <SocialIcon aria-label="Facebook" icon={faFacebookF as IconProp} size="xs" />
              </SocialIconWrapper>
            </SocialIconContainer>
            <SocialIconContainer
              to={{ pathname: "https://twitter.com/NIHRtakepart" }}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter (Opens in a new tab)"
            >
              <SocialIconWrapper>
                <SocialIcon aria-label="Twitter" icon={faTwitter as IconProp} size="xs" />
              </SocialIconWrapper>
            </SocialIconContainer>
            <SocialIconContainer
              to={{ pathname: "https://www.youtube.com/user/NIHRtv" }}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube (Opens in a new tab)"
            >
              <SocialIconWrapper>
                <SocialIcon aria-label="You Tube" icon={faYoutube as IconProp} size="xs" />
              </SocialIconWrapper>
            </SocialIconContainer>
            <SocialIconContainer
              to={{ pathname: "https://www.linkedin.com/company/nihr-research" }}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn (Opens in a new tab)"
            >
              <SocialIconWrapper>
                <SocialIcon aria-label="LinkedIn" icon={faLinkedin as IconProp} size="xs" />
              </SocialIconWrapper>
            </SocialIconContainer>
          </Grid>
        </Grid>
      </SocialPanel>
      <FooterPanel container direction="row" justifyContent="center" alignContent="center">
        <Grid
          item
          container
          xs={10}
          direction="row"
          justifyContent="flex-start"
          alignContent="center"
          role="navigation"
          aria-label="Site menu"
        >
          <NavHeading>Site Links</NavHeading>
          <Grid item xs={12} md={2}>
            <FooterLinksPanel
              heading={content["footer-heading-services"]}
              links={servicesLinks}
              isMobile={isMobile}
              ariaLabel={content["footer-heading-services-aria"]}
              isAccordion={isMobile}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FooterLinksPanel
              heading={content["footer-heading-learn"]}
              links={learnLinks}
              isMobile={isMobile}
              ariaLabel={content["footer-heading-learn-aria"]}
              isAccordion={isMobile}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FooterLinksPanel
              heading={content["footer-heading-site-policies"]}
              links={sitePolicyLinks}
              isMobile={isMobile}
              ariaLabel={content["footer-heading-site-policies-aria"]}
              isAccordion={isMobile}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FooterLinksPanel
              heading={content["footer-heading-stay-connected"]}
              links={stayConnectedLinks}
              isMobile={isMobile}
              ariaLabel={content["footer-heading-stay-connected-aria"]}
              isAccordion={isMobile}
            />
          </Grid>
          <Grid item>
            <BPORLink
              href="https://bepartofresearch.nihr.ac.uk"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Be Part of Research (Opens in a new tab)"
              isMobile={isMobile}
            >
              <BPORLogo />
            </BPORLink>
          </Grid>
        </Grid>
      </FooterPanel>
      <div className="FooterImageWrapper">
        <div className="regional-logos nihr-image" id="NIHRFooter">
          <a
            href="https://www.nihr.ac.uk/"
            aria-label="National Institute for Health and Care Research"
            className="footerImage"
          >
            <img
              src={nihrlogo}
              id="NihrLogo"
              className="regional-logos img-responsive"
              alt="National Institute for Health and Care Research"
            />
          </a>
        </div>
        <div className="regional-logos NI-logo">
          <a
            href="https://www.research.hscni.net/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Public Health Agency Northern Ireland (Opens in a new tab)"
            className="footerImage NI-logo-link"
          >
            <img
              src={HSClogo}
              className="regional-logos img-responsive NI-logo-img"
              alt="Public Health Agency Northern Ireland"
            />
          </a>
        </div>
        <div className="regional-logos Scot-logo">
          <a
            href="https://www.nhsresearchscotland.org.uk/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="NHS Scotland (Opens in a new tab)"
            className="footerImage scot-logo-img"
          >
            <img src={nhsScotlandlogo} className="regional-logos img-responsive" alt="NHS Scotland" />
          </a>
        </div>
        <div className="regional-logos HCW-logo">
          <a
            href="https://healthandcareresearchwales.org/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Health and Care Research Wales (Opens in a new tab)"
            className="footerImage HCWLogoContainer"
          >
            <img src={HCRwaleslogo} className="regional-logos img-responsive" alt="Health and Care Research Wales" />
          </a>
        </div>
      </div>
    </footer>
  );
}
