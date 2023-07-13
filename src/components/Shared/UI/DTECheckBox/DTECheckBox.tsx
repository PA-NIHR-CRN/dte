import styled from "styled-components";
import { Checkboxes } from "nhsuk-react-components";

const StyledDTECheckBox = styled(Checkboxes)`
  // && Overrides the NHS default styling
  && {
    // The checkbox border
    input + label::before {
      border-radius: 0.3rem;
    }

    // The checkbox border once clicked
    .nhsuk-checkboxes__input:focus + .nhsuk-checkboxes__label::before {
      border: 0.2rem solid ${(Props) => Props.theme.NIHR.Blue};
      outline: 0.2rem solid ${(Props) => Props.theme.NIHR.Yellow};
      color: ${(Props) => Props.theme.NIHR.Blue};
    }

    // The tick
    .nhsuk-checkboxes__input + .nhsuk-checkboxes__label::after {
      color: ${(Props) => Props.theme.NIHR.Blue};
    }
  }
`;

const DTECheckBox = (props: any) => {
  const { value } = props;
  return <StyledDTECheckBox.Box>{value}</StyledDTECheckBox.Box>;
};
export default DTECheckBox;
