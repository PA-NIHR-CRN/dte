import { useState, useEffect, useContext } from "react";
import { Grid } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";
import DocumentTitle from "react-document-title";
import { AuthContext } from "../../../context/AuthContext";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import ErrorMessageContainer from "../ErrorMessageContainer/ErrorMessageContainer";
import DTEInput from "../UI/DTEInput/DTEInput";
import DTEButton from "../UI/DTEButton/DTEButton";
import { DTEAxiosResponse, Role, DTEAxiosError } from "../../../types/AuthTypes";
import Utils, { EmailRegex } from "../../../Helper/Utils";
import DTERouteLink from "../UI/DTERouteLink/DTERouteLink";
import DTEContent from "../UI/DTETypography/DTEContent/DTEContent";
import CheckYourEmail from "../FormElements/CommonElements/CheckYourEmail";
import ErrorMessageSummary from "../ErrorMessageSummary/ErrorMessageSummary";
import PasswordShowHide from "../Password/showHide";
import DTEBackLink from "../UI/DTEBackLink/DTEBackLink";
import { ContentContext } from "../../../context/ContentContext";
import DTEHeader from "../UI/DTETypography/DTEHeader/DTEHeader";

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

function UserLogin() {
  const { content } = useContext(ContentContext);
  const { language } = useContext(ContentContext);
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

  const history = useHistory();
  const { persistLastNonLoginUrl, lastUrl, isAuthenticated, isAuthenticatedRole, logOutToken, token, saveToken } =
    useContext(AuthContext);

  const [loginResponse, setLoginResponse] = useState<DTEAxiosResponse | undefined>(undefined);
  const [resendDTEResponse, setResendDTEResponse] = useState<DTEAxiosResponse | undefined>(undefined);

  const [email, setEmail] = useState<string>();

  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    setValue("password", "");
  }, [isSubmitSuccessful]);

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
    if (result?.isSuccess) {
      saveToken(result?.content);
      history.push("/");
    }
  };

  const [{ loading: loadingLogin, error: errorLogin }, login] = useAxiosFetch({}, { manual: true });

  useEffect(() => {
    if (isAuthenticated() && isAuthenticatedRole(Role.Participant)) {
      // redirect back as we are already logged in.
      setShouldRedirect(true);
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
                  detail: <>{content["signin-error-authentication-generic"]}</>,
                  customCode: "NO_CHANGE",
                }),
          };
        });
      }
      return undefined;
    });
  };

  return (
    <DocumentTitle title={content["signin-document-title"]}>
      <>
        {shouldRedirect && <Redirect push to={`/Login#id_token=${token}`} />}
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
                {!resendDTEResponse?.isSuccess && (
                  <ErrorMessageContainer
                    axiosErrors={[errorLogin, resendError]}
                    DTEAxiosErrors={injectCallIntoError([loginResponse?.errors, resendDTEResponse?.errors])}
                  />
                )}
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <Controller
                    control={control}
                    name="email"
                    render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                      <DTEInput
                        id="email"
                        value={value}
                        onValueChange={onChange}
                        onValueBlur={onBlur}
                        error={error?.message}
                        label={content["reusable-text-email-address"]}
                        required
                        disabled={loadingLogin}
                        type="email"
                        spellcheck={false}
                        autocomplete="username"
                      />
                    )}
                    rules={{
                      required: {
                        value: true,
                        message: content["reusable-email-validation-required"],
                      },

                      pattern: {
                        value: EmailRegex,
                        message: content["reusable-email-validation-invalid-format"],
                      },
                    }}
                  />
                  <Controller
                    control={control}
                    name="password"
                    render={({ fieldState: { error } }) => (
                      <PasswordShowHide
                        id="password"
                        onValueChange={(e) => setValue("password", e.target.value)}
                        error={error?.message}
                        label={content["reusable-text-password"]}
                        required
                        disabled={loadingLogin}
                        spellcheck={false}
                        autocomplete="current-password"
                        buttonAriaLabelHide={content["reusable-aria-hide-password"]}
                        buttonAriaLabelShow={content["reusable-aria-show-password"]}
                      />
                    )}
                    rules={{
                      required: {
                        value: true,
                        message: content["reusable-password-validation-required"],
                      },
                    }}
                  />
                  <DTEContent>
                    {content["reusable-text-forgotten-password"]}
                    <DTERouteLink
                      to="/ForgottenPassword"
                      renderStyle="standard"
                      ariaLabel={content["signin-aria-reset-password"]}
                    >
                      {content["reusable-link-forgotten-password"]}
                    </DTERouteLink>
                  </DTEContent>
                  <ButtonWrapper>
                    <DTEButton disabled={loadingLogin}>{content["reusable-button-signin"]}</DTEButton>
                  </ButtonWrapper>
                </form>
                <ButtonWrapper>
                  <DTERouteLink
                    to={language === "en-GB" ? "/Participants/register" : "/Cyfranogwyr/Cofrestrwch"}
                    disabled={loadingLogin}
                    $outlined
                  >
                    {content["signin-button-registerwithbpor"]}
                  </DTERouteLink>
                </ButtonWrapper>
              </>
            )}
            {resendDTEResponse?.isSuccess && <CheckYourEmail emailAddress={email} />}
          </LoginWrapper>
        </Grid>
      </>
    </DocumentTitle>
  );
}

export default UserLogin;
