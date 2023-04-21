import { Button } from "@material-ui/core";
import styled from "styled-components";

const DTENavbarButton = styled(Button).attrs({ disableRipple: true })`
  && {
    height: 100px;
    border-bottom: 8px solid ${(props) => props.theme.NIHR.Orange};
    border-radius: 0;
    color: ${(props) => props.theme.NIHR.Blue};
    font-size: 1.25rem;
    font-weight: bold;
    text-transform: none;
    margin: 0 25px;
  }
`;

export default DTENavbarButton;
