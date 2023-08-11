import { Details } from "nhsuk-react-components";
import useId from "@accessible/use-id";
import styled from "styled-components";

type Props = {
  summary: string;
  children: any;
};

const StyledDetailsSummary = styled(Details.Summary)`
  && {
    text-underline-offset: 2.5px;
    color: ${(props) => props.theme.NIHR.LinkBlue};
    text-decoration-color: ${(props) => props.theme.NIHR.LinkBlue};

    &:focus {
      text-decoration: none;
      color: ${(props) => props.theme.NIHR.Blue};
      background-color: ${(props) => props.theme.NIHR.Yellow};
      box-shadow:
        0 -2px ${(props) => props.theme.NIHR.Yellow},
        0 4px #212b32;
    }
    &:hover {
      color: ${(props) => props.theme.NIHR.Blue};
      text-decoration-color: ${(props) => props.theme.NIHR.Blue};
      text-decoration-line: underline;
      text-decoration-thickness: max(3px, 0.1875rem, 0.12em);
      &:focus {
        text-decoration: none;
      }
    }
  }
`;

const StyledDetailsText = styled(Details.Text)`
  border-left-color: ${(props) => props.theme.NIHR.LightGrey};
`;

function DTEDetails({ summary, children }: Props) {
  const componentId = useId(null, "");

  return (
    <Details>
      <StyledDetailsSummary
        id={`summary-${componentId}`}
        aria-controls={`details-${componentId}`}
      >
        {summary}
      </StyledDetailsSummary>
      <StyledDetailsText id={`details-${componentId}`}>
        {children}
      </StyledDetailsText>
    </Details>
  );
}

export default DTEDetails;
