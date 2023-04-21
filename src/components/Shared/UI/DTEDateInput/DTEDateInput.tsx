import { DateInput } from "nhsuk-react-components";
import styled from "styled-components";

const DTEDateInput = styled(DateInput)`
  && {
    input {
      border-radius: 0.3rem;
      border-color: ${(Props) =>
        Props.error ? Props.theme.NIHR.ErrorRed : Props.theme.NIHR.Grey};
      &:focus {
        border: 4px solid ${(Props) => Props.theme.NIHR.Blue};
        box-shadow: none;
        outline: 4px solid ${(Props) => Props.theme.NIHR.Yellow};
      }
    }
  }
`;

export default DTEDateInput;
