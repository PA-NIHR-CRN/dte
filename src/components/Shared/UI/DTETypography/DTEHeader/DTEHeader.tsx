import styled from "styled-components";

interface DTEHeaderProps {
  as: "h1" | "h2" | "h3" | "h4";
  $variant?: "h1" | "h2" | "h3" | "h4";
  $color?: "blue" | "grey" | "black";
  $weight?: "normal" | "bold" | "lighter";
  $align?: "center" | "right";
  $platform?: "mobile" | "desktop";
  testId?: string;
}

const getStyleData = (
  props: DTEHeaderProps & { theme: any },
  styleElement: "size" | "height",
  platform: "desktop" | "mobile"
) => {
  if (styleElement === "size") {
    if (platform === "desktop") {
      switch (props.$variant || props.as) {
        case "h1":
          return "48px";
        case "h2":
          return "36px";
        case "h3":
          return "24px";
        default:
          return "18px";
      }
    } else {
      switch (props.$variant || props.as) {
        case "h1":
          return "32px";
        case "h2":
          return "24px";
        case "h3":
          return "18px";
        default:
          return "16px";
      }
    }
  } else if (platform === "desktop") {
    switch (props.$variant || props.as) {
      case "h1":
        return "62px";
      case "h2":
        return "54px";
      case "h3":
        return "32px";
      default:
        return "27px";
    }
  } else {
    switch (props.$variant || props.as) {
      case "h1":
        return "44px";
      case "h2":
        return "32px";
      case "h3":
        return "27px";
      default:
        return "24px";
    }
  }
};

const getColour = (
  props: DTEHeaderProps & {
    theme: any;
  }
) => {
  switch (props.$color) {
    case "blue":
      return props.theme.NIHR.Blue;
    case "grey":
      return props.theme.NIHR.PrimaryDarkGrey;
    case "black":
      return "#000000";
    default:
      return props.theme.NIHR.Blue;
  }
};

const DTEHeader = styled.h1.attrs<DTEHeaderProps>((props) => ({
  "data-testid": props.testId,
}))<DTEHeaderProps>`
  font-weight: ${(props) => (props.$weight ? props.$weight : "bold")};
  font-stretch: normal;
  font-style: normal;
  color: ${(props) => getColour(props)};
  text-align: ${(props) => (props.$align ? props.$align : "left")};
  margin-bottom: 0.5em;

  // Desktop
  ${(props) =>
    props.$platform === undefined
      ? props.theme.breakpoints.up("sm")
      : "@media all"} {
    ${(props) =>
      (props.$platform === undefined || props.$platform === "desktop") &&
      `font-size: ${getStyleData(props, "size", "desktop")};
       line-height: ${getStyleData(props, "height", "desktop")};`}
  }

  // Mobile
  ${(props) =>
    props.$platform === undefined
      ? props.theme.breakpoints.down("xs")
      : "@media all"} {
    ${(props) =>
      (props.$platform === undefined || props.$platform === "mobile") &&
      `font-size: ${getStyleData(props, "size", "mobile")};
       line-height: ${getStyleData(props, "height", "mobile")};`}
  }
`;

export default DTEHeader;
