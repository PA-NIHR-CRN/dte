import { ErrorSummary } from "nhsuk-react-components";
import styled from "styled-components";

const StyledErrorSummary = styled(ErrorSummary)<{ $success?: boolean }>`
  margin-bottom: 16px;
  padding: 16px;
  border-color: ${(props) => (props.$success ? props.theme.NIHR.LighterGreen : props.theme.NIHR.Red)};
  svg {
    vertical-align: middle;
    ${(props) => props.$success && `color: ${props.theme.NIHR.LighterGreen};`}
  }
  p {
    font-size: 18px;
    margin: 0;
  }
`;

const DangerText = styled.p`
  color: ${(props) => props.theme.NIHR.Red};
  font-weight: bolder;
`;

export default StyledErrorSummary;
export { DangerText as DTEConfirmationBoxText };
