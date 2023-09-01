/* eslint-disable react/no-danger */
import sanitizeHtml from "sanitize-html";
import styled from "styled-components";

const StyledRender = styled.span`
  && {
    ul {
      li {
        margin-bottom: 0;
      }
    }
    a {
      color: ${(props) => props.theme.NIHR.LinkBlue};
      text-decoration-color: ${(props) => props.theme.NIHR.LinkBlue};
      text-underline-offset: 2.5px;
      &:focus {
        color: ${(props) => props.theme.NIHR.Blue};
        text-decoration: none;
        background-color: ${(props) => props.theme.NIHR.Yellow};
        box-shadow: 0 -2px ${(props) => props.theme.NIHR.Yellow}, 0 4px #212b32;
      }
      &:hover {
        color: ${(props) => props.theme.NIHR.Blue};
        text-decoration-color: ${(props) => props.theme.NIHR.Blue};
        text-decoration-line: underline;
        text-decoration-thickness: max(3px, 0.1875rem, 0.12em);
        &:focus {
          text-decoration-line: none;
          text-decoration-thickness: none;
        }
      }
      &:visited {
        color: ${(props) => props.theme.NIHR.LinkBlue};
        &:focus {
          color: ${(props) => props.theme.NIHR.Blue};
        }
        &:hover {
          color: ${(props) => props.theme.NIHR.Blue};
        }
      }
    }
  }
`;

type Props = {
  richText: string;
};

const DTERichTextRender = ({ richText }: Props) => {
  const clean = sanitizeHtml(richText, {
    allowedTags: ["p", "b", "ol", "ul", "li", "strong", "a"],
    allowedAttributes: {
      a: ["href", "target"],
    },
  });

  const removeJsonFormatting = (dirty: string) => {
    return dirty.replace(/(\\&quot;|\\n|\\r)/g, "");
  };

  const removeLeadingAndTrailingQuotes = (dirty: string) => {
    let formatted = removeJsonFormatting(dirty).substring(0);
    formatted = formatted.substring(1, formatted.length - 1);
    return formatted;
  };

  return (
    <StyledRender
      dangerouslySetInnerHTML={{
        __html: removeLeadingAndTrailingQuotes(clean),
      }}
    />
  );
};

export default DTERichTextRender;
