import { Input } from "nhsuk-react-components";
import { ChangeEvent, FocusEvent } from "react";
import styled from "styled-components";
import "../NHS.scss";

type Props = {
  id?: string;
  name?: string;
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  value?: string;
  type?: string;
  disabled?: boolean;
  onValueChange?: (value: ChangeEvent<HTMLInputElement>) => void;
  onValueBlur?: (value: FocusEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  autocomplete?: string;
  spellcheck?: boolean;
};

const StyledInput = styled(Input)`
  border-radius: 0.3rem;
  padding: 1em;
  border-color: ${(Props) => (Props.error ? Props.theme.NIHR.ErrorRed : Props.theme.NIHR.Grey)};
  &:focus {
    padding: 0.9em;
    border: 4px solid ${(Props) => Props.theme.NIHR.Blue};
    box-shadow: none;
    outline: 4px solid ${(Props) => Props.theme.NIHR.Yellow};
  }
`;

function DTEInput({
  id,
  name,
  label,
  error,
  hint,
  required,
  onValueChange,
  onValueBlur,
  value,
  type,
  disabled,
  autoFocus,
  autocomplete,
  spellcheck,
}: Props) {
  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onValueChange) {
      onValueChange(e);
    }
  };
  return error !== "" && error !== undefined ? (
    <StyledInput
      id={id}
      name={name}
      label={label}
      error={error}
      hint={hint}
      required={required}
      aria-describedby={`${id}--error-message`}
      aria-required={required}
      aria-invalid
      disabled={disabled}
      value={value}
      type={type}
      onChange={handleValueChange}
      onBlur={onValueBlur}
      autoFocus={autoFocus}
      autoComplete={autocomplete}
      spellCheck={spellcheck}
      errorProps={{ role: "presentation" }}
    />
  ) : (
    <StyledInput
      id={id}
      name={name}
      label={label}
      hint={hint}
      required={required}
      aria-required={required}
      disabled={disabled}
      value={value}
      type={type}
      onChange={handleValueChange}
      onBlur={onValueBlur}
      autoFocus={autoFocus}
      autoComplete={autocomplete}
      spellCheck={spellcheck}
    />
  );
}

export default DTEInput;
