import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import "../NHS.scss";
import { baseButton } from "../DTEButton/DTEButton";

interface BaseLinkProps {
  children?: React.ReactNode;
  $outlined?: boolean;
  $fullwidth?: boolean;
  $small?: boolean;
  $padded?: boolean;
  disabled?: boolean;
  target?: "_blank";
}

interface RouteLinkProps extends BaseLinkProps {
  to: string;
  external?: boolean;
  inverted?: boolean;
  renderStyle?: "standard" | undefined;
  ariaLabel?: string;
  role?: string;
}

interface ExternalLinkProps extends BaseLinkProps {
  href: string;
}

const determineClassName = (
  renderStyle: "standard" | undefined,
  inverted: boolean,
) => {
  switch (renderStyle) {
    case "standard":
      return inverted ? "standard-route inverted" : "standard-route";
    default:
      return "nhsuk-button button-route";
  }
};

const CommonLinkStyle = css<BaseLinkProps>`
  && {
    text-underline-offset: 2.5px;
    padding-left: ${(props) => (props.$padded ? "2em" : "0")};
    padding-right: ${(props) => (props.$padded ? "2em" : "0")};
    &.standard-route {
      color: ${(props) => props.theme.NIHR.LinkBlue};
      text-decoration-color: ${(props) => props.theme.NIHR.LinkBlue};
      &:focus {
        color: ${(props) => props.theme.NIHR.Blue};
        text-decoration: none;
        background-color: ${(props) => props.theme.NIHR.Yellow};
        box-shadow:
          0 -2px ${(props) => props.theme.NIHR.Yellow},
          0 4px #212b32;
      }
      &:hover {
        color: ${(props) => props.theme.NIHR.Blue};
        text-decoration-color: ${(props) => props.theme.NIHR.Blue};
        text-decoration-line: underline;
        text-decoration-thickness: max(3px, 0.1875rem, 0.12em);
        &:focus {
          text-decoration-line: none;
          text-decoration-thickness: none;
        }
      }
      &:visited {
        color: ${(props) => props.theme.NIHR.LinkBlue};
        &:focus {
          color: ${(props) => props.theme.NIHR.Blue};
        }
        &:hover {
          color: ${(props) => props.theme.NIHR.Blue};
        }
      }
      &.inverted {
        text-decoration-color: ${(props) => props.theme.NIHR.PrimaryWhite};
        color: ${(props) => props.theme.NIHR.PrimaryWhite};
        &:focus {
          color: ${(props) => props.theme.NIHR.Blue};
          text-decoration: none;
          background-color: ${(props) => props.theme.NIHR.Yellow};
          box-shadow:
            0 -2px ${(props) => props.theme.NIHR.Yellow},
            0 4px #212b32;
        }
        &:hover {
          color: ${(props) => props.theme.NIHR.PrimaryWhite};
          text-decoration-color: ${(props) => props.theme.NIHR.PrimaryWhite};
          text-decoration-line: underline;
          text-decoration-thickness: max(3px, 0.1875rem, 0.12em);
          &:focus {
            color: ${(props) => props.theme.NIHR.Blue};
            text-decoration-line: none;
            text-decoration-thickness: none;
          }
        }
      }
    }
    &.button-route {
      ${baseButton};
    }
  }
`;

const StyledRouteLink = styled(Link)<RouteLinkProps>`
  ${CommonLinkStyle}
`;

const StyledExternalLink = styled.a<ExternalLinkProps>`
  ${CommonLinkStyle}
  && {
    cursor: pointer;
  }
`;

const DTERouteLink = ({
  to,
  children,
  $outlined,
  $fullwidth,
  $small,
  $padded,
  disabled,
  target,
  external,
  renderStyle,
  inverted,
  ariaLabel,
  role,
}: RouteLinkProps & React.HTMLProps<HTMLLinkElement>) => {
  if (external) {
    return (
      <StyledExternalLink
        href={to}
        className={determineClassName(renderStyle, inverted || false)}
        $outlined={$outlined}
        $fullwidth={$fullwidth}
        $small={$small}
        $padded={$padded}
        disabled={disabled}
        target={target}
        aria-label={ariaLabel}
      >
        {children}
      </StyledExternalLink>
    );
  }
  return (
    <StyledRouteLink
      to={to}
      className={determineClassName(renderStyle, inverted || false)}
      $outlined={$outlined}
      $fullwidth={$fullwidth}
      $small={$small}
      $padded={$padded}
      disabled={disabled}
      target={target}
      aria-label={ariaLabel}
      role={role}
    >
      {children}
    </StyledRouteLink>
  );
};

export default DTERouteLink;
