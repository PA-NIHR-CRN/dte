import { useState, useEffect, useContext } from "react";
import { Grid } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import DocumentTitle from "react-document-title";
import { AuthContext } from "../../../context/AuthContext";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import ErrorMessageContainer from "../ErrorMessageContainer/ErrorMessageContainer";
import { DTEAxiosResponse, DTEAxiosError } from "../../../types/AuthTypes";
import Utils from "../../../Helper/Utils";
import DTERouteLink from "../UI/DTERouteLink/DTERouteLink";
import DTEHeader from "../UI/DTETypography/DTEHeader/DTEHeader";
import CheckYourEmail from "../FormElements/CommonElements/CheckYourEmail";
import ErrorMessageSummary from "../ErrorMessageSummary/ErrorMessageSummary";
import DTEBackLink from "../UI/DTEBackLink/DTEBackLink";
import { ContentContext } from "../../../context/ContentContext";
import UserLoginForm from "./UserLoginForm/UserLoginForm";
import Honeypot from "../Honeypot/Honeypot";
import DTEContent from "../UI/DTETypography/DTEContent/DTEContent";
import DTELinkButton from "../UI/DTELinkButton/DTELinkButton";

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
  const { content } = useContext(ContentContext);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors: formErrors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    setValue("password", "");
  }, [isSubmitSuccessful]);

  const history = useHistory();
  const { setMfaDetails, setUserMfaEmail } = useContext(AuthContext);

  const { persistLastNonLoginUrl, lastUrl, isAuthenticated, logOutToken, saveToken } = useContext(AuthContext);

  const [loginResponse, setLoginResponse] = useState<DTEAxiosResponse | undefined>(undefined);
  const [resendDTEResponse, setResendDTEResponse] = useState<DTEAxiosResponse | undefined>(undefined);

  const [email, setEmail] = useState<string>();

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
    if (result?.errors?.some((e) => e.customCode === "Software_Token_Mfa_Challenge")) {
      setMfaDetails(result?.errors[0]?.detail as string);
      history.push("/MfaTokenChallenge");
    }
    if (result?.isSuccess) {
      saveToken(result?.content);
      setMfaDetails("");
      setUserMfaEmail("your email address");
      history.push("/");
    }
  };

  const [{ loading: loadingLogin, error: errorLogin }, login] = useAxiosFetch({}, { manual: true });

  useEffect(() => {
    if (isAuthenticated()) {
      history.push("/");
    } else {
      logOutToken();
      persistLastNonLoginUrl(lastUrl ?? "");
    }
  }, []);

  const [{ response: resendResponse, loading: resendLoading, error: resendError }] = useAxiosFetch(
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

  useEffect(() => {
    if (document.getElementsByClassName("nhsuk-error-message")[0]) {
      Utils.FocusOnError();
    } else if (document.getElementsByClassName("error-summary")[0]) {
      document.getElementsByTagName("input")[0].focus();
    }
  }, [isSubmitting]);

  const injectCallIntoError = (errors: (DTEAxiosError[] | undefined)[]) => {
    return errors.map((error) => {
      if (error) {
        return error.map((e) => {
          return {
            ...e,
            ...(e?.customCode === "Authentication_Not_Authorized"
              ? {
                  detail: (
                    <>
                      <p>{content["signin-error-authentication-not-authorized"]}</p>
                      <p>{content["signin-error-authentication-not-authorized2"]}</p>
                    </>
                  ),
                  customCode: "NO_CHANGE",
                }
              : {
                  detail: <>{content["signin-error-authentication-generic"] as string}</>,
                  customCode: "NO_CHANGE",
                }),
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
          {loadingLogin && <LoadingIndicator text={content["signin-loading-signin"]} />}
          {resendLoading && <LoadingIndicator text={content["signin-loading-resend"]} />}
          <ErrorMessageSummary renderSummary={!isSubmitting} errors={formErrors} />
          {!resendDTEResponse?.isSuccess &&
            !resendDTEResponse?.errors?.some((e) => e.customCode === "Mfa_Setup_Challenge") && (
              <ErrorMessageContainer
                axiosErrors={[errorLogin, resendError]}
                DTEAxiosErrors={injectCallIntoError([loginResponse?.errors, resendDTEResponse?.errors])}
              />
            )}
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Honeypot />
            <UserLoginForm control={control} loadingLogin={loadingLogin} setValue={setValue} nested />
          </form>
        </>
      ) : (
        <DocumentTitle title={content["signin-document-title"]}>
          <>
            {loadingLogin && <LoadingIndicator text={content["signin-loading-signin"]} />}
            {resendLoading && <LoadingIndicator text={content["signin-loading-resend"]} />}

            {!loadingLogin && !resendLoading && (
              <Grid container alignItems="center" direction="row" justifyContent="flex-start">
                <Grid item sm={2} md={1} />
                <StyledGridElementLeft item xs={12} sm={10} md={11}>
                  <DTEBackLink href="/Participants/Options" linkText={content["reusable-back-link"]} />
                </StyledGridElementLeft>
              </Grid>
            )}

            <Grid container justifyContent="center" alignItems="center" role="main" id="main">
              <LoginWrapper item xs={12} sm={8} md={6} lg={5} xl={4}>
                {!loadingLogin && !resendLoading && !resendDTEResponse?.isSuccess && (
                  <>
                    <DTEHeader as="h1">{content["signin-header"]}</DTEHeader>
                    <ErrorMessageSummary renderSummary={!isSubmitting} errors={formErrors} />
                    {!resendDTEResponse?.isSuccess &&
                      !resendDTEResponse?.errors?.some((e) => e.customCode === "Mfa_Setup_Challenge") && (
                        <ErrorMessageContainer
                          axiosErrors={[errorLogin, resendError]}
                          DTEAxiosErrors={injectCallIntoError([loginResponse?.errors, resendDTEResponse?.errors])}
                        />
                      )}
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                      <Honeypot />
                      <UserLoginForm control={control} loadingLogin={loadingLogin} setValue={setValue} />
                    </form>
                    <DTEContent style={{ display: "flex", alignItems: "center", marginTop: "1.5rem" }}>
                      Need an account?
                      <DTELinkButton
                        customStyles={{ marginLeft: "3.5px" }}
                        onClick={() => history.push("/participants/register")}
                      >
                        Register here
                      </DTELinkButton>
                    </DTEContent>
                  </>
                )}
                {resendDTEResponse?.isSuccess && <CheckYourEmail emailAddress={email} />}
              </LoginWrapper>
            </Grid>
          </>
        </DocumentTitle>
      )}
    </>
  );
};

export default UserLogin;
