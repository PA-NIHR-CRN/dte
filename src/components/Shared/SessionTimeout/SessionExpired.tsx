import { useContext } from "react";
import { Grid } from "@material-ui/core";
import DocumentTitle from "react-document-title";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import DTEHeader from "../UI/DTETypography/DTEHeader/DTEHeader";
import DTEButton from "../UI/DTEButton/DTEButton";
import { AuthContext } from "../../../context/AuthContext";

const StyledWrapper = styled.div`
  padding: 3em 2em;
`;

function SessionExpired() {
  const history = useHistory();
  const { isInNHSApp } = useContext(AuthContext);

  const gotoLogin = () => {
    history.push("/Participants/Options");
  };

  return (
    <DocumentTitle title="Session Expired - Be Part of Research">
      <>
        <Grid container justifyContent="center" alignItems="center" role="main">
          <StyledWrapper>
            <DTEHeader as="h1">
              Your session has ended due to inactivity
            </DTEHeader>
            <p>
              Your session has ended because you haven&apos;t done anything for
              10 minutes.
            </p>
            <p>
              We did not store any information you entered and had not saved.
            </p>
            <DTEButton
              onClick={() =>
                isInNHSApp
                  ? window.nhsapp.navigation.goToPage(
                      window.nhsapp.navigation.HOME_PAGE,
                    )
                  : gotoLogin()
              }
            >
              Sign in again
            </DTEButton>
          </StyledWrapper>
        </Grid>
      </>
    </DocumentTitle>
  );
}

export default SessionExpired;
