import { useContext, useEffect } from "react";
import styled from "styled-components";
import DocumentTitle from "react-document-title";
import Grid from "@material-ui/core/Grid";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import { useHistory } from "react-router-dom";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import DTEHeader from "../UI/DTETypography/DTEHeader/DTEHeader";
import DTEHR from "../UI/DTEHR/DTEHR";
import DTERouteLink from "../UI/DTERouteLink/DTERouteLink";
import DTEContent from "../UI/DTETypography/DTEContent/DTEContent";
import Utils from "../../../Helper/Utils";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import { AuthContext } from "../../../context/AuthContext";
import { ContentContext } from "../../../context/ContentContext";

const StyledGrid = styled(Grid)`
  padding: 1rem;
`;

const StyledDTEHeader = styled(DTEHeader)`
  && {
    display: block;
    width: 100%;
    margin-bottom: 1em;
    a {
      display: block;
      width: 100%;
      svg {
        float: right;
      }
    }
  }
`;

const StyledDTEContent = styled(DTEContent)`
  && {
    padding-right: 4em;
  }
`;

const StyledDTEHR = styled(DTEHR)`
  && {
    margin-bottom: 2em;
  }
`;

function Home() {
  const { content } = useContext(ContentContext);
  const history = useHistory();
  const getDemographicsURL = `${process.env.REACT_APP_BASE_API}/participants/demographics`;
  const { isNhsLinkedAccount, isInNHSApp } = useContext(AuthContext);
  const [{ response, loading, error }] = useAxiosFetch(
    {
      url: getDemographicsURL,
      method: "GET",
    },
    {
      manual: false,
      useCache: false,
    },
  );

  useEffect(() => {
    if (response) {
      if (!Utils.ConvertResponseToDTEResponse(response)?.isSuccess) {
        history.push("/Participants/register/continue/questions");
      }
    }
  }, [response, error, loading]);

  return (
    <DocumentTitle title={content["account-document-title"]}>
      <StyledGrid container direction="row" role="main" id="main">
        {loading && <LoadingIndicator />}
        <Grid item sm={1} md={2} />
        <Grid item xs={12} sm={8} md={7} lg={6} xl={5}>
          {Utils.ConvertResponseToDTEResponse(response)?.isSuccess &&
            !isInNHSApp && (
              <>
                <DTEHeader as="h1">{content["account-header"]}</DTEHeader>
                <DTEHR />
                <StyledDTEHeader as="h2" $variant="h3">
                  <DTERouteLink
                    to={
                      isNhsLinkedAccount
                        ? (process.env.REACT_APP_NHS_SETTINGS_URL as string)
                        : "/Participants/AccountSettings"
                    }
                    renderStyle="standard"
                    external={isNhsLinkedAccount || false}
                    target={isNhsLinkedAccount ? "_blank" : undefined}
                  >
                    {content["reusable-account-settings-header"]}
                    <ArrowForwardRoundedIcon />
                  </DTERouteLink>
                </StyledDTEHeader>
                <StyledDTEContent>
                  {isNhsLinkedAccount
                    ? content["account-settings-nhs-text"]
                    : content["account-settings-native-text"]}
                </StyledDTEContent>
                <DTEHR />
                <StyledDTEHeader as="h2" $variant="h3">
                  <DTERouteLink
                    to="/Participants/ResearchAreas"
                    renderStyle="standard"
                  >
                    {content["reusable-areas-of-research"]}
                    <ArrowForwardRoundedIcon />
                  </DTERouteLink>
                </StyledDTEHeader>
                <StyledDTEContent>
                  {content["account-areas-of-research-body"]}
                </StyledDTEContent>
                <DTEHR />
                <StyledDTEHeader as="h2" $variant="h3">
                  <DTERouteLink
                    to="/Participants/MyDetails"
                    renderStyle="standard"
                  >
                    {content["reusable-personal-details-header"]}
                    <ArrowForwardRoundedIcon />
                  </DTERouteLink>
                </StyledDTEHeader>
                <StyledDTEContent>
                  {content["account-personal-details-body"]}{" "}
                  {isNhsLinkedAccount
                    ? ""
                    : content["account-personal-details-body-nhs"]}
                  {content["reusable-home-address"]}.
                </StyledDTEContent>
                <DTEHR />
                <StyledDTEHeader as="h2" $variant="h3">
                  <DTERouteLink
                    to="https://bepartofresearch.nihr.ac.uk/results/search-results?query=&location="
                    renderStyle="standard"
                    external
                    target="_blank"
                  >
                    {content["account-search-studies-header"]}
                    <ArrowForwardRoundedIcon />
                  </DTERouteLink>
                </StyledDTEHeader>
                <StyledDTEContent>
                  {content["account-search-studies-body"]}
                </StyledDTEContent>
                <DTEHR />
                <StyledDTEHeader as="h2" $variant="h3">
                  <DTERouteLink
                    to="/Participants/BePartOfResearchNewsletter"
                    renderStyle="standard"
                  >
                    {content["reusable-newsletter-header"]}
                    <ArrowForwardRoundedIcon />
                  </DTERouteLink>
                </StyledDTEHeader>
                <StyledDTEContent>
                  {content["account-newsletter-body"]}
                </StyledDTEContent>
                <DTEHR />
                <StyledDTEHeader as="h2" $variant="h3">
                  <DTERouteLink
                    to="/Participants/CloseAccount"
                    renderStyle="standard"
                  >
                    {content["reusable-header-close-account"]}
                    <ArrowForwardRoundedIcon />
                  </DTERouteLink>
                </StyledDTEHeader>
                <StyledDTEContent>
                  {content["account-close-account-body"]}
                </StyledDTEContent>
                <StyledDTEHR />
                <DTERouteLink to="/logout">
                  {content["account-button-sign-out"]}
                </DTERouteLink>
              </>
            )}
          {Utils.ConvertResponseToDTEResponse(response)?.isSuccess &&
            isInNHSApp && (
              <>
                <DTEHeader as="h1">
                  {content["reusable-registered-with-bpor"]}
                </DTEHeader>
                {content["reusable-nhs-confirmation"]}
                <DTEHeader as="h2">
                  {content["reusable-hear-from-us"]}
                </DTEHeader>
                {content["reusable-hear-about-study-timescale"]}
              </>
            )}
        </Grid>
      </StyledGrid>
    </DocumentTitle>
  );
}

export default Home;
