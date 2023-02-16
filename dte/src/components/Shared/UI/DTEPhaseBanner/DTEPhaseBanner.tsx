import styled from "styled-components";
import DTERouteLink from "../DTERouteLink/DTERouteLink";

type DTEPhaseBannerProps = {
  phase: "ALPHA" | "BETA";
  url: string;
};

const StyledDiv = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`;

const StyledPara = styled.p`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 400;
  line-height: 1.14286;
  display: table;
  margin: 0;
  @media (min-width: 40.0625em) {
    font-size: 16px;
    font-size: 1rem;
    line-height: 1.25;
  }
`;

const StyledStrong = styled.strong`
  display: inline-block;
  outline: 2px solid transparent;
  outline-offset: -2px;
  color: ${(Props) => Props.theme.NIHR.PrimaryWhite};
  background-color: ${(Props) => Props.theme.NIHR.LinkBlue};
  letter-spacing: 1px;
  text-decoration: none;
  text-transform: uppercase;
  font-family: "GDS Transport", arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 700;
  line-height: 1;
  padding-top: 5px;
  padding-right: 8px;
  padding-bottom: 4px;
  padding-left: 8px;
  margin-right: 10px;

  @media (min-width: 40.0625em) {
    line-height: 1;
  }
`;

const StyledSpan = styled.span`
  display: table-cell;
  vertical-align: middle;
`;

const DTEPhaseBanner = ({ phase, url }: DTEPhaseBannerProps) => {
  return (
    <StyledDiv>
      <StyledPara>
        <StyledStrong>{phase}</StyledStrong>
        <StyledSpan>
          This is a new service – your{" "}
          <DTERouteLink
            to={url}
            external
            target="_blank"
            renderStyle="standard"
          >
            feedback
          </DTERouteLink>{" "}
          will help us to improve it.
        </StyledSpan>
      </StyledPara>
    </StyledDiv>
  );
};

export default DTEPhaseBanner;
