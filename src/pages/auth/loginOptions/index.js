import { useHistory } from "react-router-dom";
import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import styled from "styled-components";
import DocumentTitle from "react-document-title";
import { AuthContext } from "../../../context/AuthContext";
import { ContentContext } from "../../../context/ContentContext";
import DTEHeader from "../../../components/Shared/UI/DTETypography/DTEHeader/DTEHeader";

export const LoginWrapper = styled(Grid)`
  margin: 40px 10px;
`;

function LoginOptions() {
  const { isAuthenticated } = useContext(AuthContext);
  const history = useHistory();
  const { content } = useContext(ContentContext);

  if (isAuthenticated()) {
    history.push("/");
  }
  return (
    <DocumentTitle title={content["signin-options-document-title"]}>
      <Grid container justifyContent="center" alignItems="center" role="main" id="main">
        <LoginWrapper item xs={12} sm={8} md={6} lg={5} xl={4}>
          <DTEHeader as="h1">{content["signin-options-header"]}</DTEHeader>
          {content["signin-options"]}
        </LoginWrapper>
      </Grid>
    </DocumentTitle>
  );
}

export default LoginOptions;
