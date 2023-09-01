/* eslint-disable no-nested-ternary */
import { useMemo, useState } from "react";
import { Grid } from "@material-ui/core";
import { List, Collapse, ListItemButton, ListItemText } from "@mui/material";
import styled from "styled-components";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import DTERouteLink from "../UI/DTERouteLink/DTERouteLink";

interface FooterLinksPanelProps {
  isMobile?: boolean;
  seperators?: boolean;
  links: {
    name: string;
    url: string;
  }[];
  ariaLabel: string;
  heading: string;
  isAccordion: boolean;
}

interface NavStyledProps {
  isMobile?: boolean;
}

const NavHeading = styled.h3`
  padding-left: 40px;
  font-size: 1rem;
  margin-top: 1.2em;
  margin-bottom: 1em;
  font-family: Lato;
  font-weight: 900;
  color: white;
`;

const NavStyled = styled.ul<NavStyledProps>`
  padding-left: 40px;

  li {
    margin: 2px 0 0 0;
    font-size: 0.8rem;
    font-family: Lato;
    font-weight: 400;
    position: relative;
    list-style: none;
    padding-bottom: ${(Props) => (Props.isMobile ? "1.3em" : "0.5em")};
    &.seperator {
      border-right: 2px solid white;
    }
  }
`;

const AccordionElementStyled = styled.ul<NavStyledProps>`
  padding-left: 0;
  li {
    margin: 2px 0 0 0;
    font-size: 0.8425em;
    font-family: Lato;
    font-weight: 400;
    position: relative;
    list-style: none;
  }
`;

const StyledCollapse = styled(Collapse)`
  a {
    margin-left: 2rem;
  }
`;

const StyledListItemButton = styled(ListItemButton)`
  &&& {
    border: 2px solid transparent;
    :hover {
      border-color: ${(Props) => Props.theme.NIHR.Yellow};
      background-color: ${(Props) => Props.theme.NIHR.DarkestBlue};
    }
    :focus {
      color: ${(Props) => Props.theme.NIHR.Blue};
      border-color: ${(Props) => Props.theme.NIHR.Yellow};
      background-color: ${(Props) => Props.theme.NIHR.Yellow};
      box-shadow: 0 -2px ${(Props) => Props.theme.NIHR.Yellow}, 0 4px #212b32;
    }
  }
`;

export default function FooterLinksPanel(props: FooterLinksPanelProps) {
  const { links, seperators, isMobile, ariaLabel, heading, isAccordion } =
    props;
  const linkCount = links.length;
  const panelId = useMemo(() => heading.replace(/\s/g, ""), []);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  if (!isAccordion) {
    return (
      <Grid container direction="column">
        <Grid item xs={12}>
          <NavHeading aria-label={ariaLabel}>{heading}</NavHeading>
          <NavStyled isMobile={isMobile}>
            {links.map((link, i) => (
              <li
                className={
                  seperators && linkCount !== i + 1 && !isMobile
                    ? "seperator"
                    : ""
                }
                key={link.name}
              >
                <DTERouteLink
                  to={link.url}
                  renderStyle="standard"
                  target="_blank"
                  external
                  inverted
                >
                  {link.name}
                </DTERouteLink>
              </li>
            ))}
          </NavStyled>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container direction="column">
      <Grid item xs={12}>
        <List sx={{ color: "white" }} component="nav" aria-label={ariaLabel}>
          <StyledListItemButton
            aria-expanded={open}
            aria-controls={panelId}
            onClick={handleClick}
          >
            <ListItemText id={panelId} primary={heading} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </StyledListItemButton>
          <StyledCollapse in={open} timeout="auto" unmountOnExit>
            <AccordionElementStyled>
              {links.map((link) => (
                <li key={link.name}>
                  <DTERouteLink
                    to={link.url}
                    renderStyle="standard"
                    target="_blank"
                    key={link.name}
                    inverted
                    external
                  >
                    {link.name}
                    <br />
                  </DTERouteLink>
                </li>
              ))}
            </AccordionElementStyled>
          </StyledCollapse>
        </List>
      </Grid>
    </Grid>
  );
}
