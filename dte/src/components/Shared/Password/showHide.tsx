import React, { ChangeEvent, FocusEvent, useState } from "react";

import { ButtonProps } from "@mui/material";
import { Button } from "nhsuk-react-components";
import styled from "styled-components";
import DTEInput from "../UI/DTEInput/DTEInput";
import { baseButton } from "../UI/DTEButton/DTEButton";

type Props = {
  id?: string;
  buttonAriaLabelShow?: string;
  buttonAriaLabelHide?: string;
  name?: string;
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  value?: string;
  disabled?: boolean;
  onValueChange?: (value: ChangeEvent<HTMLInputElement>) => void;
  onValueBlur?: (value: FocusEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  autocomplete?: string;
  spellcheck?: boolean;
};

type StyledButtonProps = {
  error?: string;
} & ButtonProps;

const StyledDiv = styled.div`
  position: relative;
`;

const StyledButton = styled(Button)<StyledButtonProps>`
  position: absolute;
  display: block;
  right: 0;
  bottom: ${({ error }) => (error ? "1px" : "0")};
  height: 2.15em;
  padding: 0;
  min-width: fit-content;
  &&:active {
    width: 95px;
    top: unset;
  }
  &&:focus {
    width: 95px;
    top: unset;
  }
  & {
    ${baseButton}
  }
  && {
    min-height: 40px;
    padding-left: 0;
    padding-right: 0;
    margin-inline: auto;
    width: 95px;
  }
`;

const PasswordShowHide = ({
  id,
  buttonAriaLabelShow,
  buttonAriaLabelHide,
  name,
  label,
  error,
  hint,
  required,
  onValueChange,
  onValueBlur,
  value,
  disabled,
  autoFocus,
  autocomplete,
  spellcheck,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <StyledDiv>
      <DTEInput
        id={id}
        name={name}
        label={label}
        error={error}
        hint={hint}
        required={required}
        aria-controls="password"
        aria-describedby={`${id}--error-message`}
        aria-required={required}
        aria-invalid
        disabled={disabled}
        value={value}
        type={showPassword ? "text" : "password"}
        onValueChange={onValueChange}
        onValueBlur={onValueBlur}
        autoFocus={autoFocus}
        autocomplete={autocomplete}
        spellcheck={spellcheck}
      />
      <StyledButton
        type="button"
        className="nhsuk-button--secondary"
        onClick={handleClickShowPassword}
        aria-label={showPassword ? buttonAriaLabelHide : buttonAriaLabelShow}
        error={error}
      >
        {showPassword ? "Hide" : "Show"}
      </StyledButton>

      <span className="nhsuk-u-visually-hidden" aria-live="polite">
        {showPassword ? "Your Password is shown" : "Your Password is hidden"}
      </span>
    </StyledDiv>
  );
};

export default PasswordShowHide;
