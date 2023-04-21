import React from "react";
import { Paper, IconButton } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import styled from "styled-components";
import "../NHS.scss";

type Props = {
  // $showColorBand?: boolean;
  $bandColour?: string;
  onClickClose?: (e: any) => void;
  disabled?: boolean;
  children?: React.ReactNode;
  $spaced?: boolean;
  variant?: "elevation" | "outlined";
  className?: string;
  $buttonLabel?: string;
  elevation?: number;
};

const StyledPaper = styled(Paper)<Props>`
  && {
    color: black;
    padding: 3em;
    /* border: 2; */
    margin: ${(Props) => (Props.$spaced ? "2em 0" : "0")};
    /* borderColor: theme.palette.nhsnavy.dark, */
    position: relative;
    /* padding: 3em; */
    border-left: ${(Props) =>
      Props.$bandColour
        ? `10px solid ${
            Props.$bandColour === "Default"
              ? Props.theme.NIHR.Blue
              : Props.$bandColour
          }`
        : ``};
  }
`;

const StyledCloseIconButton = styled(IconButton)<Props>`
  && {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

const DTEPaper = ({
  onClickClose,
  disabled,
  $bandColour,
  children,
  $spaced,
  variant,
  className,
  $buttonLabel,
  elevation,
}: Props) => {
  return (
    <StyledPaper
      $bandColour={$bandColour}
      variant={variant}
      className={className}
      $spaced={$spaced}
      elevation={elevation}
    >
      {onClickClose && (
        <StyledCloseIconButton
          onClick={onClickClose}
          disabled={disabled}
          aria-label={$buttonLabel}
        >
          <CloseIcon />
        </StyledCloseIconButton>
      )}
      {children}
    </StyledPaper>
  );
};

export default DTEPaper;
