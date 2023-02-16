import { Chip } from "@material-ui/core";
import styled from "styled-components";

interface DTEChipProps {
  $color?: "blue" | "light-blue" | "light-orange" | "red" | "grey";
  $bold?: boolean;
}

const handleBackgroundColourType = (props: any) => {
  switch (props.$color) {
    case "light-blue":
      return props.theme.NIHR.LinkBlue;
    case "blue":
      return props.theme.NIHR.Blue;
    case "red":
      return props.theme.NIHR.Red;
    case "light-orange":
      return props.theme.NIHR.Orange;
    case "grey":
      return props.theme.NIHR.BackgroundGrey;
    default:
      return props.theme.NIHR.LightGrey;
  }
};

const handleColourType = (props: any) => {
  switch (props.$color) {
    case "light-blue":
      return props.theme.NIHR.PrimaryWhite;
    case "blue":
      return props.theme.NIHR.PrimaryWhite;
    case "red":
      return props.theme.NIHR.PrimaryWhite;
    case "light-orange":
      return "#494949";
    case "grey":
      return "#494949";
    default:
      return "#000000";
  }
};

const DTEChip = styled(Chip)<DTEChipProps>`
  && {
    border-radius: 0;
    font-weight: ${(props) => (props.$bold ? "bold" : "normal")};
    background-color: ${(props) => handleBackgroundColourType(props)};
    color: ${(props) => handleColourType(props)};
    /* color: #494949;
    background-color: #ffffff; */
    font-size: 1.1875rem;
    line-height: 1.47368;
    span {
      padding: 0;
    }
  }
`;

export default DTEChip;
