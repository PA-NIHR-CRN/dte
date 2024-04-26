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
import { UserContext } from "../../../context/UserContext";

const StyledGrid = styled(Grid)`
  padding: 1rem;
`;

const StyledDTERouteLink = styled(DTERouteLink)`
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
  const { content, setLanguage } = useContext(ContentContext);
  const { setCurrentPage, setCurrentAccountPage } = useContext(UserContext);
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
    }
  );

  useEffect(() => {
    if (response) {
      const converetResponse = Utils.ConvertResponseToDTEResponse(response);
      if (converetResponse?.content?.selectedLocale) {
        setLanguage(converetResponse?.content.selectedLocale);
      }
      if (!Utils.ConvertResponseToDTEResponse(response)?.isSuccess) {
        history.push("/Participants/register/continue/questions");
      }
    }
  }, [response, error, loading]);

  useEffect(() => {
    setCurrentPage("main");
    setCurrentAccountPage("main");
  }, []);

  return (
    <DocumentTitle title={content["account-document-title"]}>
      <StyledGrid container direction="row" role="main" id="main">
        {loading && <LoadingIndicator text={content["reusable-loading"]} />}
        <Grid item sm={1} md={2} />
        <Grid item xs={12} sm={8} md={7} lg={6} xl={5}>
          {Utils.ConvertResponseToDTEResponse(response)?.isSuccess && !isInNHSApp && (
            <>
              <DTEHeader as="h1" captionKey="account-header">
                {content["account-header"]}
              </DTEHeader>
              <DTEHR />
              <StyledDTERouteLink
                to={
                  isNhsLinkedAccount
                    ? (process.env.REACT_APP_NHS_SETTINGS_URL as string)
                    : "/Participants/AccountSettings"
                }
                renderStyle="standard"
                external={isNhsLinkedAccount || false}
                target={isNhsLinkedAccount ? "_blank" : undefined}
                ariaLabel={
                  isNhsLinkedAccount
                    ? `${content["reusable-account-settings-header"]} (Opens in a new tab)`
                    : content["reusable-account-settings-header"]
                }
              >
                <DTEHeader as="h2" $variant="h3" captionKey="reusable-account-settings-header">
                  {content["reusable-account-settings-header"]}
                </DTEHeader>
                <ArrowForwardRoundedIcon />
              </StyledDTERouteLink>
              <StyledDTEContent>
                {isNhsLinkedAccount ? content["account-settings-nhs-text"] : content["account-settings-native-text"]}
              </StyledDTEContent>
              <DTEHR />
              <StyledDTERouteLink to="/Participants/ResearchAreas" renderStyle="standard">
                <DTEHeader as="h2" $variant="h3" captionKey="reusable-areas-of-research">
                  {content["reusable-areas-of-research"]}
                </DTEHeader>
                <ArrowForwardRoundedIcon />
              </StyledDTERouteLink>
              <StyledDTEContent>{content["account-areas-of-research-body"]}</StyledDTEContent>
              <DTEHR />
              <StyledDTERouteLink to="/Participants/MyDetails" renderStyle="standard">
                <DTEHeader as="h2" $variant="h3" captionKey="reusable-personal-details-header">
                  {content["reusable-personal-details-header"]}
                </DTEHeader>
                <ArrowForwardRoundedIcon />
              </StyledDTERouteLink>
              <StyledDTEContent>
                {content["account-personal-details-body"]}{" "}
                {isNhsLinkedAccount ? "" : content["account-personal-details-body-nhs"]}
                {content["reusable-home-address"].toLowerCase()}.
              </StyledDTEContent>
              <DTEHR />
              <StyledDTERouteLink
                to="https://bepartofresearch.nihr.ac.uk/results/search-results?query=&location="
                renderStyle="standard"
                external
                target="_blank"
                ariaLabel={
                  isNhsLinkedAccount
                    ? `${content["account-search-studies-header"]} (Opens in a new tab)`
                    : content["account-search-studies-header"]
                }
              >
                <DTEHeader as="h2" $variant="h3" captionKey="account-search-studies-header">
                  {content["account-search-studies-header"]}
                </DTEHeader>
                <ArrowForwardRoundedIcon />
              </StyledDTERouteLink>
              <StyledDTEContent>{content["account-search-studies-body"]}</StyledDTEContent>
              <DTEHR />
              <StyledDTERouteLink to="/Participants/BePartOfResearchNewsletter" renderStyle="standard">
                <DTEHeader as="h2" $variant="h3" captionKey="reusable-newsletter-header">
                  {content["reusable-newsletter-header"]}
                </DTEHeader>
                <ArrowForwardRoundedIcon />
              </StyledDTERouteLink>
              <StyledDTEContent>{content["account-newsletter-body"]}</StyledDTEContent>
              <DTEHR />
              <StyledDTERouteLink to="/Participants/CloseAccount" renderStyle="standard">
                <DTEHeader as="h2" $variant="h3" captionKey="reusable-close-your-account">
                  {content["reusable-close-your-account"]}
                </DTEHeader>
                <ArrowForwardRoundedIcon />
              </StyledDTERouteLink>
              <StyledDTEContent>{content["account-close-account-body"]}</StyledDTEContent>
              <StyledDTEHR />
              <DTERouteLink to="/logout">{content["account-button-sign-out"]}</DTERouteLink>
            </>
          )}
          {Utils.ConvertResponseToDTEResponse(response)?.isSuccess && isInNHSApp && (
            <>
              <DTEHeader as="h1" captionKey="reusable-registered-with-bpor">
                {content["reusable-registered-with-bpor"]}
              </DTEHeader>
              {content["reusable-nhs-confirmation"]}
              <DTEHeader as="h2" captionKey="reusable-hear-from-us">
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
