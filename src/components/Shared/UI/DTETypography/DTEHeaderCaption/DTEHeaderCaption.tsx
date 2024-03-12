import styled from "styled-components";
import { useContext } from "react";
import { ContentContext } from "../../../../../context/ContentContext";

const ExtendedCaption = styled.span`
  color: #505a5f;
  font-family: "Lato Light", sans-serif;
`;

type DTEHeaderCaptionProps = {
  contentKey: string;
  size?: "xl" | "l" | "md";
};

const DTEHeaderCaption = ({ contentKey, size = "xl" }: DTEHeaderCaptionProps) => {
  const { content } = useContext(ContentContext);

  if (!content[contentKey]) {
    return null;
  }
  return <ExtendedCaption className={`govuk-caption-${size}`}>{content[contentKey]}</ExtendedCaption>;
};

export default DTEHeaderCaption;
