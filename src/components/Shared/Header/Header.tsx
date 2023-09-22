import { Grid } from "@material-ui/core";
import { useContext } from "react";
import styled from "styled-components";
import bporlogo from "../../../images/BPoR_NIHR_colour-RGB.svg";
import nhslogo from "../../../images/NHS_logo.svg";
import { AppContext } from "../../../context/AppContext";
import DTEBackLink from "../UI/DTEBackLink/DTEBackLink";
import DTEPhaseBanner from "../UI/DTEPhaseBanner/DTEPhaseBanner";
import { ContentContext } from "../../../context/ContentContext";
import DTEContent from "../UI/DTETypography/DTEContent/DTEContent";
import DTELinkButton from "../UI/DTELinkButton/DTELinkButton";

const StyledHeader = styled.header`
  margin-top: 0.5em;
  padding-left: 1em;
  padding-right: 1em;
`;

const LanguageSelector = styled(Grid)`
  // float right
  float: right;
  margin-right: 1em;
`;

const StyledGridElementLeft = styled(Grid)`
  && {
    text-align: left;
  }
`;

const StyledGridElementRight = styled(Grid)`
  && {
    text-align: right;
  }
`;

const StyledLink = styled.a`
  &&& {
    margin: -6px;
    padding: 3px;
    border: 3px solid transparent;
    text-decoration: none;
    display: inline-block;
    &:focus,
    &:hover {
      background-color: transparent;
      border-color: ${(Props) => Props.theme.NIHR.Yellow};
      box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.75);
      text-decoration: none;
    }
  }
`;

const StyledLogoLink = styled.a`
  &&& {
    margin: 0;
    padding: 0;
    border: 3px solid transparent;
    left: 20px;
    position: relative;
    text-decoration: none;
    &:focus,
    &:hover {
      background-color: transparent;
      border-color: ${(Props) => Props.theme.NIHR.Yellow};
      box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.75);
      text-decoration: none;
    }
  }
`;

const StyledSkipToMain = styled.a`
  & {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
    &:focus {
      clip: auto;
      height: auto;
      margin: 0;
      overflow: visible;
      position: static;
      background: ${(Props) => Props.theme.NIHR.Yellow};
      white-space: normal;
      width: auto;
    }
  }
`;

const BPORLogo = styled.img.attrs({
  src: `${bporlogo}`,
  alt: "Be Part Of Research Logo",
})`
  width: 411px;
  @media (max-width: 767px) {
    width: 320px;
  }
  @media (max-width: 576px) {
    width: 280px;
  }
  @media (max-width: 440px) {
    width: 216px;
  }
`;

const NHSLogo = styled.img.attrs({
  src: `${nhslogo}`,
  alt: "NHS Logo",
  height: "36",
  width: "100%",
})``;

export default function Header() {
  const { showBacklink } = useContext(AppContext);
  const { setLanguage, language, content } = useContext(ContentContext);
  return (
    <>
      <StyledHeader>
        <StyledSkipToMain href="#main">{content["accessibility-hidden-skip-to-main"]}</StyledSkipToMain>
        <Grid container alignItems="center" direction="row" justifyContent="flex-start">
          <Grid item sm={2} md={1} />
          <StyledGridElementLeft item xs={8} sm={6} md={7}>
            {showBacklink ? (
              <DTEBackLink
                linkText="Be Part of Research"
                title="Be Part of Research"
                href="https://bepartofresearch.nihr.ac.uk/"
              />
            ) : (
              <StyledLink
                target="_blank"
                href="https://bepartofresearch.nihr.ac.uk/"
                rel="noreferrer"
                id="styledLogoLink"
              >
                <BPORLogo />
              </StyledLink>
            )}
          </StyledGridElementLeft>
          <StyledGridElementRight item xs={4} sm={3} md={3}>
            <StyledLogoLink rel="noreferrer" id="styledLogoLink" target="_blank" href=" https://nhs.uk/">
              <NHSLogo id="NHSLogo" />
            </StyledLogoLink>
          </StyledGridElementRight>
          <Grid item sm={1} md={1} />
          <Grid item sm={2} md={1} />
        </Grid>
        <Grid container alignItems="center" direction="row" justifyContent="flex-start">
          <Grid item sm={2} md={1} />
          <StyledGridElementLeft item xs={8} sm={6} md={7}>
            <DTEPhaseBanner phase="BETA" url="https://bepartofresearch.nihr.ac.uk/about/#contact-form" />
          </StyledGridElementLeft>
          <StyledGridElementRight item xs={4} sm={3} md={3}>
            <LanguageSelector>
              <DTEContent>
                {language !== "en-GB" ? (
                  <DTELinkButton onClick={() => setLanguage("en-GB")}>English</DTELinkButton>
                ) : (
                  "English"
                )}{" "}
                |{" "}
                {language !== "cy-GB" ? (
                  <DTELinkButton onClick={() => setLanguage("cy-GB")}>Cymraeg</DTELinkButton>
                ) : (
                  "Cymraeg"
                )}
              </DTEContent>
            </LanguageSelector>
          </StyledGridElementRight>
          <Grid item sm={2} md={1} />
        </Grid>
      </StyledHeader>
    </>
  );
}
