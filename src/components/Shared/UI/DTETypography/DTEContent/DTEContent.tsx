import styled from "styled-components";

interface DTEContentProps {
  as?: "strong" | "b" | "i" | "span";
  $displayMode?: "block";
  $align?: "center" | "right";
  $marginBottom?: "small" | "medium" | "large";
  $radioList?: boolean;
}

const handleMarginCalc = (props: any) => {
  switch (props.$marginBottom) {
    case "small":
      return "1rem";
    case "medium":
      return "2rem";
    case "large":
      return "3rem";
    default:
      return "0.8rem";
  }
};

const handleDisplayCalc = (props: any) => {
  if (props.$displayMode === "block") {
    return "block";
  }
  if (props.as === undefined) {
    return "block";
  }
  if (props.as !== undefined && props.$marginBottom !== undefined) {
    return "block";
  }

  return "inline";
};

const DTEContent = styled.p<DTEContentProps>`
  ${(props) => {
    return `font-size: 18px;
        font-stretch: normal;
        line-height: 1.5;
        display: ${handleDisplayCalc(props)};
        text-align: ${props.$align ? props.$align : "left"};
        margin-bottom: ${handleMarginCalc(props)};
        margin-left: ${props.$radioList ? "0.6em" : "0"};`;
  }}
`;

export default DTEContent;
