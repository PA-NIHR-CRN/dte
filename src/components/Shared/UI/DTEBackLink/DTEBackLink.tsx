import styled from "styled-components";
import { Link } from "react-router-dom";

type Props = {
  linkText: string;
  title?: string;
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
};

const StyledBackLink = styled(Link)`
  && {
    margin: 10px 10px 10px 0;
    cursor: pointer;
    text-underline-offset: 2.5px;
    text-decoration: underline;
    color: ${(props) => props.theme.NIHR.LinkBlue};
    text-decoration-color: ${(props) => props.theme.NIHR.LinkBlue};
    &:focus {
      text-decoration: none;
      background-color: ${(props) => props.theme.NIHR.Yellow};
      box-shadow:
        0 -2px ${(props) => props.theme.NIHR.Yellow},
        0 4px #212b32;
    }
    &:hover {
      color: ${(props) => props.theme.NIHR.Blue};
      text-decoration-color: ${(props) => props.theme.NIHR.Blue};
      text-decoration-thickness: max(3px, 0.1875rem, 0.12em);
      &:focus {
        color: ${(props) => props.theme.NIHR.Blue};
        text-decoration-line: none;
        text-decoration-thickness: none;
      }
      svg {
        fill: ${(props) => props.theme.NIHR.Blue};
      }
    }
    &:visited {
      color: ${(props) => props.theme.NIHR.LinkBlue};
      &:hover {
        color: ${(props) => props.theme.NIHR.Blue};
      }
      &:focus {
        color: ${(props) => props.theme.NIHR.Blue};
      }
    }

    svg {
      fill: ${(props) => props.theme.NIHR.LinkBlue};
    }
  }
`;

function DTEBackLink({
  linkText,
  title,
  ariaLabel,
  href = "#",
  onClick,
}: Props) {
  return (
    <div className="nhsuk-back-link">
      <StyledBackLink
        to={href}
        title={title}
        aria-label={ariaLabel}
        onClick={onClick}
        className="nhsuk-back-link__link"
      >
        <svg
          className="nhsuk-icon nhsuk-icon__chevron-left"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-hidden="true"
          height="32"
          width="32"
        >
          <path d="M8.5 12c0-.3.1-.5.3-.7l5-5c.4-.4 1-.4 1.4 0s.4 1 0 1.4L10.9 12l4.3 4.3c.4.4.4 1 0 1.4s-1 .4-1.4 0l-5-5c-.2-.2-.3-.4-.3-.7z" />
        </svg>
        {linkText}
      </StyledBackLink>
    </div>
  );
}

export default DTEBackLink;
