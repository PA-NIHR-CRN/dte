import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { Grid } from "@material-ui/core";
import styled from "styled-components";
import DocumentTitle from "react-document-title";
import DTERouteLink from "../../../components/Shared/UI/DTERouteLink/DTERouteLink";
import DTEHeader from "../../../components/Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../../components/Shared/UI/DTETypography/DTEContent/DTEContent";
import NhsLoginButton from "../../../components/Shared/UI/NhsLoginButton";
import { AuthContext } from "../../../context/AuthContext";
import DTEBackLink from "../../../components/Shared/UI/DTEBackLink/DTEBackLink";

export const LoginWrapper = styled(Grid)`
  margin: 40px 10px;
`;

const ButtonWrapper = styled.div`
  margin-top: 1rem;
`;

const ButtonContainer = styled.div`
  margin-top: 3rem;
  margin-bottom: 3rem;
`;

const LoginOptions = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const history = useHistory();

  if (isAuthenticated()) {
    history.push("/");
  }
  return (
    <DocumentTitle title="Sign in or register - Volunteer Registration - Be Part of Research">
      <>
        <Grid container justifyContent="center" alignItems="center" role="main">
          <DTEBackLink linkText="Back" onClick={() => history.goBack()} />
          <LoginWrapper item xs={12} sm={8} md={6} lg={5} xl={4}>
            <DTEHeader as="h1">Sign in to Be Part of Research</DTEHeader>
            <ButtonContainer>
              <Grid>
                <NhsLoginButton />
                <ButtonWrapper>
                  <DTERouteLink to="/UserLogin" $outlined={true}>
                    Sign in with email address
                  </DTERouteLink>
                </ButtonWrapper>
              </Grid>
            </ButtonContainer>

            <DTEContent
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              Need an account?
              <DTELinkButton customStyles={{ marginLeft: "5px" }} onClick={() => history.push("/Participants/Options")}>
                Register here
              </DTELinkButton>
            </DTEContent>
          </LoginWrapper>
        </Grid>
      </>
    </DocumentTitle>
  );
};

export default LoginOptions;
