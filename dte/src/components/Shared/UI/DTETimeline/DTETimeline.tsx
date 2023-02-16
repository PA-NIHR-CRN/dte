import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import styled from "styled-components";

const DTETimeline = styled(Timeline)`
  && {
    margin-bottom: 0;
  }
`;
const DTETimelineItem = styled(TimelineItem)`
  && {
    margin-bottom: 0;
    &:before {
      display: none;
    }
    &:not(:last-child) {
      div:last-child {
        border-bottom: ${(Props) => Props.theme.NIHR.Grey} solid 2px;
      }
    }
  }
`;
const DTETimelineSeparator = styled(TimelineSeparator)``;
const DTETimelineConnector = styled(TimelineConnector)`
  && {
    background-color: ${(Props) => Props.theme.NIHR.Grey};
  }
`;
const DTETimelineContent = styled(TimelineContent)`
  && {
    padding: 0;
    margin-left: 37px;
    /* margin-top: 15px; */
    margin-bottom: 15px;
    p {
      margin: 0;

      &:last-child {
        margin-bottom: 15px;
      }
    }
  }
`;
const DTETimelineDot = styled(TimelineDot)``;
const DTETimelineNumber = styled.div`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  border: 2px solid;
  border-color: ${(Props) => Props.theme.NIHR.Grey};
  text-align: center;
  font-weight: 500;
  line-height: 26px;
`;

export {
  DTETimeline,
  DTETimelineItem,
  DTETimelineSeparator,
  DTETimelineConnector,
  DTETimelineContent,
  DTETimelineDot,
  DTETimelineNumber,
};
