import { Button } from "nhsuk-react-components";
import styled from "styled-components";
import "../NHS.scss";

type Props = {
  id?: string;
  name?: string;
  label?: string;
  $disabled?: boolean;
  $active?: boolean;
  $fullwidth?: boolean;
  $small?: boolean;
  type?: "button" | "submit" | "reset";
};

const StyledButton = styled(Button)<Props>`
  && {
    width: ${(props) => (props.$fullwidth ? "100%" : "auto")};
    box-shadow: none;
    background-color: ${(props) =>
      props.$active
        ? props.theme.NIHR.PrimaryWhite
        : props.theme.NIHR.LightGrey};
    margin: 0;
    color: ${(props) =>
      props.$active ? props.theme.NIHR.LightBlue : props.theme.NIHR.Blue};
    outline: 2px solid ${(props) => props.theme.NIHR.LightGrey};
    ${(props) =>
      props.$small && "padding: 2px; font-size: 16px; margin: 0 10px;"}
    &:visited {
      color: ${(props) =>
        props.$active ? props.theme.NIHR.Blue : props.theme.NIHR.PrimaryWhite};
    }
    &:active {
      box-shadow: none;
      top: 0;
    }
  }
`;

export default StyledButton;
