import { Grid } from "@material-ui/core";
import styled from "styled-components";
import bporlogo from "../../../images/BPoR_NIHR_colour-RGB.svg";
import nhslogo from "../../../images/NHS_logo.svg";
import DTEPhaseBanner from "../UI/DTEPhaseBanner/DTEPhaseBanner";

const StyledHeader = styled.header`
  margin-top: 0.5em;
  padding-left: 1em;
  padding-right: 1em;
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
  return (
    <>
      <StyledHeader>
        <StyledSkipToMain href="#main"> Skip to Main Content</StyledSkipToMain>
        <Grid
          container
          alignItems="center"
          direction="row"
          justifyContent="flex-start"
        >
          <Grid item sm={2} md={1} />
          <StyledGridElementLeft item xs={8} sm={6} md={7}>
            <StyledLink
              target="_blank"
              href="https://bepartofresearch.nihr.ac.uk/"
              rel="noreferrer"
              id="styledLogoLink"
            >
              <BPORLogo />
            </StyledLink>
          </StyledGridElementLeft>
          <StyledGridElementRight item xs={4} sm={3} md={3}>
            <StyledLogoLink
              rel="noreferrer"
              id="styledLogoLink"
              target="_blank"
              href=" https://nhs.uk/"
            >
              <NHSLogo id="NHSLogo" />
            </StyledLogoLink>
          </StyledGridElementRight>
          <Grid item sm={1} md={1} />
          <Grid item sm={2} md={1} />
          <StyledGridElementLeft item xs={12} sm={10} md={11}>
            <DTEPhaseBanner
              phase="BETA"
              url="https://bepartofresearch.nihr.ac.uk/about/#contact-form"
            />
          </StyledGridElementLeft>
        </Grid>
      </StyledHeader>
    </>
  );
}
