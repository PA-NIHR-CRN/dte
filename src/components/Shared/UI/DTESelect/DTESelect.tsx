import { Select } from "nhsuk-react-components";
import { memo, ChangeEvent } from "react";
import styled from "styled-components";
import IDTESelectOption from "./IDTESelectOption";
import { capitaliseWords } from "../../../../Helper/Utils";

type Props = {
  id: string;
  name: string;
  label: string;
  hint?: string;
  required: boolean;
  error?: string;
  defaultValue?: string;
  options: IDTESelectOption[];
  onValueChange: (value: ChangeEvent<HTMLSelectElement>) => void;
  isCapitalised?: boolean;
};

const StyledSelect = styled(Select)`
  // && Overrides the NHS default styling
  && {
    border-radius: 0.3rem;
    border-color: ${(props) => props.theme.NIHR.Grey};

    &:focus {
      border: 0.2rem solid ${(props) => props.theme.NIHR.Blue};
      box-shadow: none;
      outline: 0.2rem solid ${(props) => props.theme.NIHR.Yellow};
    }
  }
`;

const StyledSelectOption = styled(Select.Option)``;

const DTESelect = memo(
  ({ id, name, label, hint, required, error, defaultValue, options, onValueChange, isCapitalised = false }: Props) => {
    const optionElements = options.map((option) => (
      <StyledSelectOption value={option.value} key={option.value} data-testid={option?.testID}>
        {isCapitalised ? capitaliseWords(option.text || "") : option.text || ""}
      </StyledSelectOption>
    ));

    return error !== "" && error !== undefined ? (
      <StyledSelect
        id={id}
        name={name}
        label={label}
        hint={hint}
        required={required}
        aria-required={required}
        aria-describedby={`${id}--error-message`}
        error={error}
        aria-invalid
        onChange={(e: ChangeEvent<HTMLSelectElement>) => onValueChange(e)}
        defaultValue={defaultValue}
      >
        {optionElements}
      </StyledSelect>
    ) : (
      <StyledSelect
        id={id}
        name={name}
        label={label}
        hint={hint}
        required={required}
        aria-required={required}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => onValueChange(e)}
        defaultValue={defaultValue}
      >
        {optionElements}
      </StyledSelect>
    );
  }
);

export default DTESelect;
