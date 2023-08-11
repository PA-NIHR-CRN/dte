import { useContext } from "react";
import { Grid } from "@material-ui/core";
import DocumentTitle from "react-document-title";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import DTEHeader from "../UI/DTETypography/DTEHeader/DTEHeader";
import DTEButton from "../UI/DTEButton/DTEButton";
import { AuthContext } from "../../../context/AuthContext";
import { ContentContext } from "../../../context/ContentContext";

const StyledWrapper = styled.div`
  padding: 3em 2em;
`;

function SessionExpired() {
  const { content } = useContext(ContentContext);
  const history = useHistory();
  const { isInNHSApp } = useContext(AuthContext);

  const gotoLogin = () => {
    history.push("/Participants/Options");
  };

  return (
    <DocumentTitle title={content["session-expired-document-title"]}>
      <>
        <Grid container justifyContent="center" alignItems="center" role="main">
          <StyledWrapper>
            <DTEHeader as="h1">{content["session-expired-header"]}</DTEHeader>
            {content["session-expired-body"]}
            <DTEButton
              onClick={() =>
                isInNHSApp
                  ? window.nhsapp.navigation.goToPage(
                      window.nhsapp.navigation.HOME_PAGE,
                    )
                  : gotoLogin()
              }
            >
              {content["session-expired-button-text"]}
            </DTEButton>
          </StyledWrapper>
        </Grid>
      </>
    </DocumentTitle>
  );
}

export default SessionExpired;
