import { useHistory } from "react-router-dom";
import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import styled from "styled-components";
import DocumentTitle from "react-document-title";
import { AuthContext } from "../../../context/AuthContext";
import { ContentContext } from "../../../context/ContentContext";
import DTEHeader from "../../../components/Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEHeaderCaption from "../../../components/Shared/UI/DTETypography/DTEHeaderCaption/DTEHeaderCaption";
import DTEBackLink from "../../../components/Shared/UI/DTEBackLink/DTEBackLink";

export const LoginWrapper = styled(Grid)`
  margin: 20px 10px 40px 10px;
`;

const StyledGridElementLeft = styled(Grid)`
  padding-left: 1em;
  && {
    text-align: left;
  }
  padding-bottom: -1em;
  margin-bottom: 0;
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
      <>
        <Grid container alignItems="center" justifyContent="flex-start">
          <Grid item sm={2} md={1} />
          <StyledGridElementLeft item xs={12} sm={10} md={11}>
            <DTEBackLink
              linkText={content["reusable-back-link"]}
              onClick={() => history.goBack()}
              ariaLabel={content["reusable-aria-go-back"]}
            />
          </StyledGridElementLeft>
        </Grid>
        <Grid container justifyContent="center" alignItems="center" role="main" id="main">
          <LoginWrapper item xs={12} sm={8} md={6} lg={5} xl={4}>
            <DTEHeaderCaption contentKey="signin-options-header-caption" />
            <DTEHeader as="h1">{content["signin-options-header"]}</DTEHeader>
            {content["signin-options"]}
          </LoginWrapper>
        </Grid>
      </>
    </DocumentTitle>
  );
}

export default LoginOptions;
