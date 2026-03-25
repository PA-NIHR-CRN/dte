import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import "../NHS.scss";
import { baseButton } from "../DTEButton/DTEButton";

interface BaseLinkProps {
  $outlined?: boolean;
  $fullwidth?: boolean;
  $small?: boolean;
  $padded?: boolean;
  disabled?: boolean;
}

interface DTERouteLinkProps extends BaseLinkProps, React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  inverted?: boolean;
  renderStyle?: "standard";
  external?: boolean;
  ariaLabel?: string;
}

const determineClassName = (renderStyle: "standard" | undefined, inverted: boolean) => {
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
      }
    }
    &.button-route {
      ${baseButton};
    }
  }
`;

const StyledRouteLink = styled(Link)<BaseLinkProps>`
  ${CommonLinkStyle}
`;

const StyledExternalLink = styled.a<BaseLinkProps>`
  ${CommonLinkStyle}
  && {
    cursor: pointer;
  }
`;

type LinkType = { type: "internal"; path: string } | { type: "external" } | { type: "special" };

function classifyHref(to: string): LinkType {
  const isSpecialScheme = /^(mailto:|tel:)/i.test(to);
  const isHttp = /^https?:/i.test(to);

  if (isSpecialScheme) return { type: "special" };

  if (isHttp) {
    const url = new URL(to);

    if (url.origin === window.location.origin) {
      return { type: "internal", path: url.pathname + url.search + url.hash };
    }

    return { type: "external" };
  }

  return { type: "internal", path: to };
}

function normalizeAriaLabel(label?: string, isExternal?: boolean) {
  if (!label || !isExternal) return label;

  return `${label.trim()} (opens in new tab)`;
}

function DTERouteLink({
  to,
  children,
  $outlined,
  $fullwidth,
  $small,
  $padded,
  disabled,
  renderStyle,
  inverted,
  external,
  ariaLabel,
  target,
  rel,
  ...rest
}: DTERouteLinkProps) {
  const link = classifyHref(to);
  const isExternal = external ?? link.type === "external";
  const className = determineClassName(renderStyle, inverted || false);

  const finalTarget = target ?? (isExternal ? "_blank" : undefined);
  const finalRel = rel ?? (finalTarget === "_blank" ? "noopener noreferrer" : undefined);

  const computedAriaLabel = normalizeAriaLabel(ariaLabel, finalTarget === "_blank");

  if (isExternal || link.type === "special") {
    return (
      <StyledExternalLink
        href={to}
        className={className}
        $outlined={$outlined}
        $fullwidth={$fullwidth}
        $small={$small}
        $padded={$padded}
        disabled={disabled}
        target={finalTarget}
        rel={finalRel}
        aria-label={computedAriaLabel}
        {...rest}
      >
        {children}
      </StyledExternalLink>
    );
  }

  return (
    <StyledRouteLink
      to={link.type === "internal" ? link.path : to}
      className={className}
      $outlined={$outlined}
      $fullwidth={$fullwidth}
      $small={$small}
      $padded={$padded}
      disabled={disabled}
      aria-label={ariaLabel}
      {...rest}
    >
      {children}
    </StyledRouteLink>
  );
}

export default DTERouteLink;
