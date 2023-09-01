import { Textarea } from "nhsuk-react-components";
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
  rows?: number;
  disabled?: boolean;
  onValueChange?: (value: ChangeEvent<HTMLTextAreaElement>) => void;
  onValueBlur?: (value: FocusEvent<HTMLTextAreaElement>) => void;
};

const StyledTextArea = styled(Textarea)`
  border-radius: 0.3rem;
  border-color: ${(Props) => Props.theme.NIHR.Grey};
  &:focus {
    border: 4px solid ${(Props) => Props.theme.NIHR.Blue};
    box-shadow: none;
    outline: 4px solid ${(Props) => Props.theme.NIHR.Yellow};
  }
`;

function DTETextArea({
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
  rows,
  disabled,
}: Props) {
  const handleValueChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (onValueChange) {
      onValueChange(e);
    }
  };

  return (
    <StyledTextArea
      id={id}
      name={name}
      label={label}
      error={error}
      hint={hint}
      required={required}
      aria-required={required}
      aria-invalid={error !== "" && error !== undefined}
      value={value}
      type={type}
      disabled={disabled}
      rows={rows}
      onChange={handleValueChange}
      onBlur={onValueBlur}
    />
  );
}

export default DTETextArea;
