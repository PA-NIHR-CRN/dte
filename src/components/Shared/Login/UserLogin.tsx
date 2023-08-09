import { useState, useEffect, useContext } from "react";
import { Grid } from "@material-ui/core";
import { Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";
import DocumentTitle from "react-document-title";
import { AuthContext } from "../../../context/AuthContext";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import ErrorMessageContainer from "../ErrorMessageContainer/ErrorMessageContainer";
import {
  DTEAxiosResponse,
  Role,
  DTEAxiosError,
} from "../../../types/AuthTypes";
import Utils from "../../../Helper/Utils";
import DTERouteLink from "../UI/DTERouteLink/DTERouteLink";
import DTEHeader from "../UI/DTETypography/DTEHeader/DTEHeader";
import CheckYourEmail from "../FormElements/CommonElements/CheckYourEmail";
import DTEBackLink from "../UI/DTEBackLink/DTEBackLink";
import UserLoginForm from "./UserLoginForm/UserLoginForm";

const StyledGridElementLeft = styled(Grid)`
  padding-left: 1em;
  && {
    text-align: left;
  }
  padding-bottom: -1em;
  margin-bottom: 0;
`;

export const LoginWrapper = styled(Grid)`
  margin: 0 10px 40px 10px;
`;

const ButtonWrapper = styled.div`
  margin-top: 1rem;
`;

interface UserLoginProps {
  nested?: boolean;
}
const UserLogin = (props: UserLoginProps) => {
  const { nested } = props;

  const history = useHistory();
  const {
    persistLastNonLoginUrl,
    lastUrl,
    isAuthenticated,
    isAuthenticatedRole,
    logOutToken,
    token,
    saveToken,
    setMfaDetails,
  } = useContext(AuthContext);

  const [loginResponse, setLoginResponse] = useState<
    DTEAxiosResponse | undefined
  >(undefined);
  const [resendDTEResponse, setResendDTEResponse] = useState<
    DTEAxiosResponse | undefined
  >(undefined);

  const [email, setEmail] = useState<string>();

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const onSubmit = async (formData: any) => {
    setEmail(formData.email);
    setLoginResponse(undefined);
    setResendDTEResponse(undefined);
    const res = await login(
      {
        url: `${process.env.REACT_APP_BASE_API}/users/login`,
        method: "POST",
        data: { ...formData },
      },
      {
        manual: true,
      }
    ).catch(() => {
      // swallow 404 axios error -
    });
    const result = Utils.ConvertResponseToDTEResponse(res);
    setLoginResponse(result);

    if (result?.errors?.some((e) => e.customCode === "Mfa_Setup_Challenge")) {
      setMfaDetails(result?.errors[0]?.detail as string);
      history.push("/MfaSmsSetup");
    }
    if (result?.errors?.some((e) => e.customCode === "Sms_Mfa_Challenge")) {
      setMfaDetails(result?.errors[0]?.detail as string);
      history.push(`/MfaSmsChallenge`);
    }
    if (
      result?.errors?.some(
        (e) => e.customCode === "Software_Token_Mfa_Challenge"
      )
    ) {
      setMfaDetails(result?.errors[0]?.detail as string);
      history.push("/MfaTokenChallenge");
    }
    if (result?.isSuccess) {
      saveToken(result?.content);
      setMfaDetails("");
      history.push("/");
    }
  };

  const [{ loading: loadingLogin, error: errorLogin }, login] = useAxiosFetch(
    {},
    { manual: true }
  );

  useEffect(() => {
    if (isAuthenticated() && isAuthenticatedRole(Role.Participant)) {
      // redirect back as we are already logged in.
      setShouldRedirect(true);
    } else {
      logOutToken();
      persistLastNonLoginUrl(lastUrl ?? "");
    }
  }, []);

  const [
    { response: resendResponse, loading: resendLoading, error: resendError },
  ] = useAxiosFetch(
    {
      url: `${process.env.REACT_APP_BASE_API}/users/resendverificationemail`,
      method: "POST",
      data: {
        email,
      },
    },
    { useCache: false, manual: true }
  );

  useEffect(() => {
    if (resendResponse) {
      setResendDTEResponse(Utils.ConvertResponseToDTEResponse(resendResponse));
    }
  }, [resendResponse]);

  const injectCallIntoError = (errors: (DTEAxiosError[] | undefined)[]) => {
    return errors.map((error) => {
      if (error) {
        return error.map((e) => {
          let detail;
          const customCode = "NO_CHANGE";

          if (e?.customCode === "Authentication_Not_Authorized") {
            detail = `Enter the email address and password for a registered user account.${
              !nested
                ? " If you registered using NHS login use the back button above and select NHS login to sign in."
                : ""
            }`;
          } else if (e.customCode === "Mfa_Setup_Challenge") {
            detail =
              "You have not set up MFA for your account. Please check your email for instructions on how to set up MFA.";
          } else {
            detail =
              "You have not given permission to access your account. Please";
          }

          return {
            ...e,
            detail,
            customCode,
          };
        });
      }
      return undefined;
    });
  };

  return (
    <>
      {nested ? (
        <>
          {shouldRedirect && <Redirect push to={`/Login#id_token=${token}`} />}
          {loadingLogin && <LoadingIndicator text="Signing In..." />}
          {resendLoading && (
            <LoadingIndicator text="Resending verification email..." />
          )}
          {!resendDTEResponse?.isSuccess &&
            !resendDTEResponse?.errors?.some(
              (e) => e.customCode === "Mfa_Setup_Challenge"
            ) && (
              <ErrorMessageContainer
                axiosErrors={[errorLogin, resendError]}
                DTEAxiosErrors={injectCallIntoError([
                  loginResponse?.errors,
                  resendDTEResponse?.errors,
                ])}
              />
            )}
          <UserLoginForm loadingLogin={loadingLogin} onSubmit={onSubmit} />
        </>
      ) : (
        <DocumentTitle title="Sign in or register - Volunteer Registration - Be Part of Research">
          <>
            {shouldRedirect && (
              <Redirect push to={`/Login#id_token=${token}`} />
            )}
            {loadingLogin && <LoadingIndicator text="Signing In..." />}
            {resendLoading && (
              <LoadingIndicator text="Resending verification email..." />
            )}
            {!loadingLogin && !resendLoading && (
              <Grid
                container
                alignItems="center"
                direction="row"
                justifyContent="flex-start"
              >
                <Grid item sm={2} md={1} />
                <StyledGridElementLeft item xs={12} sm={10} md={11}>
                  <DTEBackLink href="/Participants/Options" linkText="Back" />
                </StyledGridElementLeft>
              </Grid>
            )}
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              role="main"
              id="main"
            >
              <LoginWrapper item xs={12} sm={8} md={6} lg={5} xl={4}>
                {!loadingLogin &&
                  !resendLoading &&
                  !resendDTEResponse?.isSuccess && (
                    <>
                      <DTEHeader as="h1">
                        Sign in to Be Part of Research
                      </DTEHeader>

                      {!resendDTEResponse?.isSuccess &&
                        !resendDTEResponse?.errors?.some(
                          (e) => e.customCode === "Mfa_Setup_Challenge"
                        ) && (
                          <ErrorMessageContainer
                            axiosErrors={[errorLogin, resendError]}
                            DTEAxiosErrors={injectCallIntoError([
                              loginResponse?.errors,
                              resendDTEResponse?.errors,
                            ])}
                          />
                        )}
                      <UserLoginForm
                        loadingLogin={loadingLogin}
                        onSubmit={onSubmit}
                      />
                      <ButtonWrapper>
                        <DTERouteLink
                          to="/Participants/register"
                          disabled={loadingLogin}
                          $outlined
                        >
                          Register with Be Part of Research
                        </DTERouteLink>
                      </ButtonWrapper>
                    </>
                  )}
                {resendDTEResponse?.isSuccess && (
                  <CheckYourEmail emailAddress={email} />
                )}
              </LoginWrapper>
            </Grid>
          </>
        </DocumentTitle>
      )}
    </>
  );
};

export default UserLogin;
