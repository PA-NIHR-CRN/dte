import { Button } from "nhsuk-react-components";
import Grid from "@material-ui/core/Grid";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import styled, { css } from "styled-components";
import React from "react";
import "../NHS.scss";

export interface baseButtonProps {
  $disabled?: boolean;
  $outlined?: boolean;
  $fullwidth?: boolean;
  $small?: boolean;
  $danger?: boolean;
  $padded?: boolean;
  $backArrow?: boolean;
}
interface Props {
  id?: string;
  name?: string;
  label?: string;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  ariaLabel?: string;
}

export const baseButton = css<baseButtonProps>`
  width: ${(props) => (props.$fullwidth ? "100%" : "auto")};
  box-shadow: none;
  padding-left: ${(props) => (props.$padded ? "2em" : "1em")};
  padding-right: ${(props) => (props.$padded ? "2em" : "1em")};
  background-color: ${(props) => {
    if (props.$outlined) return props.theme.NIHR.PrimaryWhite;
    if (props.$danger) return props.theme.NIHR.Red;
    return props.theme.NIHR.Blue;
  }};
  margin: 0;
  color: ${(props) =>
    props.$outlined ? props.theme.NIHR.Blue : props.theme.NIHR.PrimaryWhite};
  border: 0.25rem solid
    ${(props) => (props.$danger ? props.theme.NIHR.Red : props.theme.NIHR.Blue)};
  outline: 0.25rem solid transparent;
  ${(props) => props.$small && "padding: 2px; font-size: 16px; margin: 0 10px;"}
  ${(props) => props.$backArrow && "padding: 0; font-size: 16px;"}
    &:visited {
    color: ${(props) =>
      props.$outlined ? props.theme.NIHR.Blue : props.theme.NIHR.PrimaryWhite};
  }
  // Hover colour
  &:hover {
    background-color: ${(props) =>
      props.$danger ? props.theme.NIHR.Red : props.theme.NIHR.LightBlue};
    border: ${(props) =>
      props.$danger
        ? `0.25rem solid ${props.theme.Red}`
        : `0.25rem solid ${props.theme.NIHR.LightBlue}`};
    &:not(:focus) {
      color: ${(props) => props.$outlined && props.theme.NIHR.PrimaryWhite};
    }
  }
  // Focus colours
  &:focus,
  &:active,
  &:target,
  &:focus-within {
    top: 0;
    background: ${(props) => {
      if (props.$danger) return props.theme.NIHR.Red;
      return props.theme.NIHR.Yellow;
    }};
    box-shadow: none;
    border: 0.25rem solid
      ${(props) => {
        if (props.$danger) return props.theme.NIHR.Red;
        return props.theme.NIHR.Yellow;
      }};
    border-radius: 4px 4px 0 0;
    box-shadow: 0px 4px 0px 0px ${(props) => props.theme.NIHR.Blue};
    color: ${(props) => props.theme.NIHR.Blue};
    &:visited {
      color: ${(props) => props.theme.NIHR.Blue};
      &:active {
        color: ${(props) => props.theme.NIHR.Blue};
      }
    }
  }
`;

const StyledButton = styled(Button)<Props & baseButtonProps>`
  && {
    ${baseButton}
  }
`;

const StyledBackArrow = styled(ArrowBackIcon)<Props & baseButtonProps>`
  && {
    margin: 0;
    padding: 0;
    margin-top: 0.4rem;
    margin-right: 0.4rem;
    margin-left: 0.6rem;
  }
`;

const StyledGrid = styled(Grid)`
  padding-right: 1rem;
`;

const DTEButton = ({
  id,
  name,
  label,
  children,
  ariaLabel,
  $backArrow,
  $disabled,
  $outlined,
  $fullwidth,
  $small,
  $padded,
  type,
  onClick,
  onKeyDown,
  disabled,
  $danger,
}: Props & baseButtonProps) => {
  return (
    <StyledButton
      id={id}
      name={name}
      label={label}
      aria-label={ariaLabel}
      $disabled={$disabled}
      $outlined={$outlined}
      $fullwidth={$fullwidth}
      $small={$small}
      $padded={$padded}
      type={type}
      onClick={onClick}
      onKeyDown={onKeyDown}
      disabled={disabled}
      $backArrow={$backArrow}
      $danger={$danger}
    >
      {$backArrow ? (
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item>{$backArrow && <StyledBackArrow $backArrow />}</Grid>
          <StyledGrid item>{children}</StyledGrid>
        </Grid>
      ) : (
        children
      )}
    </StyledButton>
  );
};

export default DTEButton;
