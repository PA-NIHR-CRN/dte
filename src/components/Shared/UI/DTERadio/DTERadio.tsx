import { Radios, Fieldset } from "nhsuk-react-components";
import { ReactNode, memo, FormEvent } from "react";
import styled from "styled-components";

type Props = {
  id: string;
  name: string;
  label: ReactNode;
  hint?: string;
  error?: string;
  infoText?: string;
  children: ReactNode;
  onChange?: (event: FormEvent<HTMLDivElement> | undefined) => void;
  onBlur?: (event: FormEvent<HTMLDivElement> | undefined) => void;
};
const StyledHiddenInfoText = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  border: 0;
  white-space: nowrap;
`;
const StyledFieldset = styled(Fieldset)``;
const StyledFieldsetLegend = styled(Fieldset.Legend)``;
const StyledRadio = styled(Radios)`
  && {
    input + label::before {
      border: 0.15rem solid ${(Props) => Props.theme.NIHR.Grey};
    }
    input:focus + label::before {
      border: 0.15rem solid ${(Props) => Props.theme.NIHR.Blue};
      box-shadow: -0.3px -0.3px 0 3px ${(props) => props.theme.NIHR.Yellow};
    }
    input + label::after {
      border: 0.625rem solid ${(Props) => Props.theme.NIHR.Blue};
    }
  }
`;

const DTERadio = memo(({ id, name, label, hint, error, infoText, children, onChange, onBlur }: Props) => {
  let ariaDescribedElement: string;
  if (error !== "" && error !== undefined) {
    ariaDescribedElement = `${id}--error-message ${id}-legend`;
  } else {
    ariaDescribedElement = `${id}-legend`;
  }
  if (infoText !== "" && infoText !== undefined) {
    ariaDescribedElement += ` ${id}-info`;
  }

  return error !== "" && error !== undefined ? (
    <StyledFieldset data-testid={`${id}-fieldset`} aria-describedby={ariaDescribedElement}>
      <StyledFieldsetLegend data-testid={`${id}-legend`} id={`${id}-legend`}>
        {label}
      </StyledFieldsetLegend>
      {infoText && (
        <StyledHiddenInfoText data-testid={`${id}-info`} id={`${id}-info`}>
          {infoText}
        </StyledHiddenInfoText>
      )}
      <StyledRadio id={id} name={name} error={error} hint={hint} onChange={onChange} onBlur={onBlur}>
        {children}
      </StyledRadio>
    </StyledFieldset>
  ) : (
    <StyledFieldset data-testid={`${id}-fieldset`} aria-describedby={ariaDescribedElement}>
      <StyledFieldsetLegend data-testid={`${id}-legend`} id={`${id}-legend`}>
        {label}
      </StyledFieldsetLegend>
      {infoText && (
        <StyledHiddenInfoText data-testid={`${id}-info`} id={`${id}-info`}>
          {infoText}
        </StyledHiddenInfoText>
      )}
      <StyledRadio id={id} name={name} hint={hint} onChange={onChange} onBlur={onBlur}>
        {children}
      </StyledRadio>
    </StyledFieldset>
  );
});

export default DTERadio;
