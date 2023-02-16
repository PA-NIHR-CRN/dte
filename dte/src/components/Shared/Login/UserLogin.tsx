import { useState, useEffect, useContext } from "react";
import { Grid } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import DocumentTitle from "react-document-title";
import { AuthContext } from "../../../context/AuthContext";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import ErrorMessageContainer from "../ErrorMessageContainer/ErrorMessageContainer";
import DTEInput from "../UI/DTEInput/DTEInput";
import DTEButton from "../UI/DTEButton/DTEButton";
import {
  DTEAxiosResponse,
  Role,
  DTEAxiosError,
} from "../../../types/AuthTypes";
import Utils, { EmailRegex } from "../../../Helper/Utils";
import DTERouteLink from "../UI/DTERouteLink/DTERouteLink";
import DTEHeader from "../UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../UI/DTETypography/DTEContent/DTEContent";
import CheckYourEmail from "../FormElements/CommonElements/CheckYourEmail";
import ErrorMessageSummary from "../ErrorMessageSummary/ErrorMessageSummary";
import PasswordShowHide from "../Password/showHide";

export const LoginWrapper = styled(Grid)`
  margin: 40px 10px;
`;

const ButtonWrapper = styled.div`
  margin-top: 1rem;
`;

const UserLogin = () => {
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
  const {
    persistLastNonLoginUrl,
    lastUrl,
    isAuthenticated,
    isAuthenticatedRole,
    saveAccessToken,
    logOutToken,
    token,
  } = useContext(AuthContext);

  const [loginResponse, setLoginResponse] = useState<
    DTEAxiosResponse | undefined
  >(undefined);
  const [resendDTEResponse, setResendDTEResponse] = useState<
    DTEAxiosResponse | undefined
  >(undefined);

  const [email, setEmail] = useState<string>();

  if (isAuthenticated() && isAuthenticatedRole(Role.Participant)) {
    // redirect back as we are already logged in.
    history.push(`/Login#id_token=${token}`);
  }

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
      saveAccessToken(result?.content?.accessToken);
      history.push(`/Login#id_token=${result?.content?.idToken}`);
    }
  };

  const [{ loading: loadingLogin, error: errorLogin }, login] = useAxiosFetch(
    {},
    { manual: true }
  );

  useEffect(() => {
    logOutToken();
    persistLastNonLoginUrl(lastUrl ?? "");
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
          return {
            ...e,
            ...(e?.customCode === "Authentication_Not_Authorized"
              ? {
                  detail: (
                    <>
                      Enter the email address and password for a registered user
                      account.
                    </>
                  ),
                  customCode: "NO_CHANGE",
                }
              : {}),
          };
        });
      }
      return undefined;
    });
  };

  return (
    <DocumentTitle title="Sign in or register - Volunteer Registration - Be Part of Research">
      <>
        {loadingLogin && <LoadingIndicator text="Signing In..." />}
        {resendLoading && (
          <LoadingIndicator text="Resending verification email..." />
        )}
        <Grid container justifyContent="center" alignItems="center" role="main">
          <LoginWrapper item xs={12} sm={8} md={6} lg={5} xl={4}>
            {!loadingLogin && !resendLoading && !resendDTEResponse?.isSuccess && (
              <>
                <DTEHeader as="h1">Welcome</DTEHeader>
                <ErrorMessageSummary
                  renderSummary={!isSubmitting}
                  errors={formErrors}
                />
                {!resendDTEResponse?.isSuccess && (
                  <ErrorMessageContainer
                    axiosErrors={[errorLogin, resendError]}
                    DTEAxiosErrors={injectCallIntoError([
                      loginResponse?.errors,
                      resendDTEResponse?.errors,
                    ])}
                  />
                )}
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <Controller
                    control={control}
                    name="email"
                    render={({
                      field: { value, onChange, onBlur },
                      fieldState: { error },
                    }) => (
                      <DTEInput
                        id="email"
                        value={value}
                        onValueChange={onChange}
                        onValueBlur={onBlur}
                        error={error?.message}
                        label="Email address"
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
                        message: "Enter an email address",
                      },

                      pattern: {
                        value: EmailRegex,
                        message:
                          "Enter an email address in the correct format, like name@example.com",
                      },
                    }}
                  />
                  <Controller
                    control={control}
                    name="password"
                    render={({ fieldState: { error } }) => (
                      <PasswordShowHide
                        id="password"
                        onValueChange={(e) =>
                          setValue("password", e.target.value)
                        }
                        error={error?.message}
                        label="Password"
                        required
                        disabled={loadingLogin}
                        spellcheck={false}
                        autocomplete="current-password"
                      />
                    )}
                    rules={{
                      required: { value: true, message: "Enter a password" },
                    }}
                  />
                  <DTEContent>
                    If you cannot remember your password, you can{" "}
                    <DTERouteLink
                      to="/ForgottenPassword"
                      renderStyle="standard"
                    >
                      reset it here.
                    </DTERouteLink>
                  </DTEContent>
                  <ButtonWrapper>
                    <DTEButton disabled={loadingLogin}>Sign in</DTEButton>
                  </ButtonWrapper>
                </form>
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
  );
};

export default UserLogin;
