import { forwardRef } from "react";
import MobileStepper from "@material-ui/core/MobileStepper";
import styled from "styled-components";

const StyledStepper = styled(MobileStepper)`
  && {
    padding: 0;
    padding: 0;
    div[role="progressbar"] {
      height: 20px;
      background-color: #daeee2;
      width: 100%;
      div {
        background-color: #46a86c;
      }
    }
  }
`;

export type LinearProgressPropsData = {
  "aria-label": string;
};

const DTEStepper = forwardRef((props: any, ref) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <StyledStepper {...props} ref={ref} />;
});

export default DTEStepper;
