import { useContext, useEffect } from "react";
import styled from "styled-components";
import DocumentTitle from "react-document-title";
import Grid from "@material-ui/core/Grid";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import DTEHeader from "../UI/DTETypography/DTEHeader/DTEHeader";
import DTEHR from "../UI/DTEHR/DTEHR";
import DTERouteLink from "../UI/DTERouteLink/DTERouteLink";
import DTEContent from "../UI/DTETypography/DTEContent/DTEContent";
import Utils from "../../../Helper/Utils";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

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

const Home = () => {
  const history = useHistory();
  const { authenticatedUserId } = useContext(AuthContext);
  const getDemographicsURL = `${process.env.REACT_APP_BASE_API}/participants/${authenticatedUserId}/demographics`;
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
      if (!Utils.ConvertResponseToDTEResponse(response)?.isSuccess) {
        history.push("/Participants/register/continue/questions");
      }
    }
  }, [response, error, loading]);

  return (
    <DocumentTitle title="My account - Volunteer Account - Be Part of Research">
      <StyledGrid container direction="row" role="main">
        {loading && <LoadingIndicator />}
        <Grid item sm={1} md={2} />
        <Grid item xs={12} sm={8} md={7} lg={6} xl={5}>
          {Utils.ConvertResponseToDTEResponse(response)?.isSuccess && (
            <>
              <DTEHeader as="h1">My account</DTEHeader>
              <DTEHR />
              <StyledDTEHeader as="h2" $variant="h3">
                <DTERouteLink
                  to="/Participants/AccountSettings"
                  renderStyle="standard"
                >
                  Account settings
                  <ArrowForwardRoundedIcon />
                </DTERouteLink>
              </StyledDTEHeader>
              <StyledDTEContent>
                Change your email or password.
              </StyledDTEContent>
              <DTEHR />
              <StyledDTEHeader as="h2" $variant="h3">
                <DTERouteLink
                  to="/Participants/ResearchAreas"
                  renderStyle="standard"
                >
                  Areas of research
                  <ArrowForwardRoundedIcon />
                </DTERouteLink>
              </StyledDTEHeader>
              <StyledDTEContent>
                Add, edit or remove areas of research that you are interested
                in. Remember - you do not need a diagnosis of a disease or
                condition to take part, lots of studies need healthy volunteers
                too.
              </StyledDTEContent>
              <DTEHR />
              <StyledDTEHeader as="h2" $variant="h3">
                <DTERouteLink
                  to="/Participants/MyDetails"
                  renderStyle="standard"
                >
                  Personal details
                  <ArrowForwardRoundedIcon />
                </DTERouteLink>
              </StyledDTEHeader>
              <StyledDTEContent>
                Change any information that you&apos;ve provided about yourself,
                such as your name or home address.
              </StyledDTEContent>
              <DTEHR />
              <StyledDTEHeader as="h2" $variant="h3">
                <DTERouteLink
                  to="/Participants/BePartOfResearchNewsletter"
                  renderStyle="standard"
                >
                  Be Part of Research Newsletter
                  <ArrowForwardRoundedIcon />
                </DTERouteLink>
              </StyledDTEHeader>
              <StyledDTEContent>
                By signing up to our monthly newsletter, you&apos;ll receive all
                our latest news and hear of more opportunities to take part in
                research from across the UK.
              </StyledDTEContent>
              <DTEHR />
              <StyledDTEHeader as="h2" $variant="h3">
                <DTERouteLink
                  to="/Participants/CloseAccount"
                  renderStyle="standard"
                >
                  Close your account
                  <ArrowForwardRoundedIcon />
                </DTERouteLink>
              </StyledDTEHeader>
              <StyledDTEContent>
                If you have changed your mind and wish to withdraw your consent
                to be contacted.
              </StyledDTEContent>
              <StyledDTEHR />
              <DTERouteLink to="/logout">Sign out</DTERouteLink>
            </>
          )}
        </Grid>
      </StyledGrid>
    </DocumentTitle>
  );
};

export default Home;
