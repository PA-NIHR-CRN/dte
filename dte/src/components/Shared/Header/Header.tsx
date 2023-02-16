import { Grid } from "@material-ui/core";
import { useContext } from "react";
import styled from "styled-components";
import bporlogo from "../../../images/BPoR_logo.svg";
import nhslogo from "../../../images/NHS_logo.svg";
import { AppContext } from "../../../context/AppContext";
import DTEBackLink from "../UI/DTEBackLink/DTEBackLink";
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

const BPORLogo = styled.img.attrs({
  src: `${bporlogo}`,
  alt: "Be Part Of Research Logo",
  height: "70",
})``;

const NHSLogo = styled.img.attrs({
  src: `${nhslogo}`,
  alt: "NHS Logo",
  height: "36",
})``;

export default function Header() {
  const { showBacklink } = useContext(AppContext);
  return (
    <>
      <StyledHeader>
        <Grid
          container
          alignItems="center"
          direction="row"
          justifyContent="flex-start"
        >
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
              >
                <BPORLogo />
              </StyledLink>
            )}
          </StyledGridElementLeft>
          <StyledGridElementRight item xs={4} sm={3} md={3}>
            <StyledLink
              rel="noreferrer"
              target="_blank"
              href=" https://nhs.uk/"
            >
              <NHSLogo />
            </StyledLink>
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
