import { useHistory } from "react-router-dom";
import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import styled from "styled-components";
import DocumentTitle from "react-document-title";
import { AuthContext } from "../../../context/AuthContext";
import { ContentContext } from "../../../context/ContentContext";
import DTEHeader from "../../../components/Shared/UI/DTETypography/DTEHeader/DTEHeader";
import NhsLoginButton from "../../../components/Shared/UI/NhsLoginButton";
import DTEButton from "../../../components/Shared/UI/DTEButton/DTEButton";
import DTEContent from "../../../components/Shared/UI/DTETypography/DTEContent/DTEContent";
import DTELinkButton from "../../../components/Shared/UI/DTELinkButton/DTELinkButton";

export const LoginWrapper = styled(Grid)`
  margin: 40px 10px;
`;

function LoginOptions() {
  const { isAuthenticated } = useContext(AuthContext);
  const history = useHistory();
  const { content } = useContext(ContentContext);

  const handleGoBack = () => {
    history.goBack();
  };

  if (isAuthenticated()) {
    history.push("/");
  }
  return (
    <DocumentTitle title={content["signin-options-document-title"]}>
      <Grid container justifyContent="center" alignItems="center" role="main" id="main">
        <LoginWrapper item xs={12} sm={8} md={6} lg={5} xl={4}>
          <DTEHeader as="h1">{content["signin-options-header"]}</DTEHeader>
          <a href="#" onClick={handleGoBack}>
            {"< "} Back
          </a>
          {content["signin-options"]}
          <div style={{ display: "flex", gap: "2rem", alignItems: "center", justifyContent: "flex-start" }}>
            <div style={{ marginLeft: "5px" }}>
              <NhsLoginButton buttonText="Continue to NHS login" />
            </div>
            <div style={{ marginTop: "39.75px" }}>
              <DTEButton $outlined onClick={() => history.push("/Userlogin")}>
                Sign in with email address
              </DTEButton>
            </div>
          </div>
          <br></br>
          <DTEContent>
            Need an account?{" "}
            <DTELinkButton onClick={() => history.push("/Participants/register")}>Register here.</DTELinkButton>
          </DTEContent>
          <br></br>
          <br></br>
        </LoginWrapper>
      </Grid>
    </DocumentTitle>
  );
}

export default LoginOptions;
