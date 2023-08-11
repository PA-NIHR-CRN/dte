import Button from "@material-ui/core/Button";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import styled from "styled-components";
import React from "react";
import "../NHS.scss";

type Props = {
  id?: string;
  name?: string;
  label?: string;
  onClick?: (e: any) => void;
  children?: React.ReactNode;
  disabled?: boolean;
  arrowIcon?: boolean;
  type?: "button" | "submit" | "reset";
  dark?: boolean;
  padded?: boolean;
  ariaLabel?: string;
};

const StyledButton = styled(Button)<
  Props & { $dark?: boolean; $padded?: boolean }
>`
  && {
    border-radius: 0;
    background-color: transparent;
    color: ${(props) => props.theme.NIHR.LinkBlue};
    box-shadow: none;
    text-decoration: underline;
    font-weight: ${(props) => (props.$dark ? "bold" : "normal")};
    text-transform: none;
    font-size: 18px;
    text-underline-offset: 2.5px;
    line-height: 1.5;
    letter-spacing: normal;
    padding-left: ${(props) => (props.$padded ? "8px" : "0")};
    padding-right: ${(props) => (props.$padded ? "8px" : "0")};
    min-width: fit-content;
    &:hover {
      color: ${(props) => props.theme.NIHR.Blue};
      text-decoration: underline;
      text-decoration-thickness: max(3px, 0.1875rem, 0.12em);
      background-color: transparent;
    }

    &:focus {
      background-color: ${(props) => props.theme.NIHR.Yellow};
      box-shadow:
        0 -2px ${(props) => props.theme.NIHR.Yellow},
        0 4px #0b0c0c;
      color: ${(props) => props.theme.NIHR.Blue};
      text-decoration: none;
    }

    &:active {
      top: 0;
    }
  }
`;

const StlyedArrow = styled(ArrowForwardRoundedIcon)`
  && {
    margin: 0;
    padding: 0;
    background-color: ${(props) => props.theme.NIHR.Blue};
    color: ${(props) => props.theme.NIHR.PrimaryWhite};
    border-radius: 1rem;
    font-size: 20px;
  }
`;

function DTELinkButton({
  id,
  name,
  label,
  onClick,
  children,
  disabled,
  arrowIcon,
  type,
  dark,
  padded,
  ariaLabel,
}: Props) {
  return (
    <StyledButton
      id={id}
      name={name}
      label={label}
      onClick={onClick}
      disabled={disabled}
      endIcon={arrowIcon && <StlyedArrow />}
      disableRipple
      type={type}
      $dark={dark}
      $padded={padded}
      aria-label={ariaLabel}
      aria-labelledby=""
    >
      {children}
    </StyledButton>
  );
}

export default DTELinkButton;
