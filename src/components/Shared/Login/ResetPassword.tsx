import React, { useState, useEffect, useContext } from "react";
import { Grid, Box } from "@material-ui/core";
import styled from "styled-components";
import DocumentTitle from "react-document-title";
import { Controller, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import ReactGA from "react-ga";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import ErrorMessageContainer from "../ErrorMessageContainer/ErrorMessageContainer";
import DTEButton from "../UI/DTEButton/DTEButton";
import DTEHeader from "../UI/DTETypography/DTEHeader/DTEHeader";
import DTEHeaderCaption from "../UI/DTETypography/DTEHeaderCaption/DTEHeaderCaption";
import DTEContent from "../UI/DTETypography/DTEContent/DTEContent";
import { DTEAxiosResponse } from "../../../types/AuthTypes";
import Utils from "../../../Helper/Utils";
import DTERouteLink from "../UI/DTERouteLink/DTERouteLink";
import ErrorMessageSummary from "../ErrorMessageSummary/ErrorMessageSummary";
import PasswordShowHide from "../Password/showHide";
import ThreeWords from "../Password/threeWords";
import { ContentContext } from "../../../context/ContentContext";
import Honeypot from "../Honeypot/Honeypot";
import validatePassword, { PasswordPolicy } from "../../../Helper/passwordValidation/passwordValidation";
import { PasswordFormData } from "../../Participant/RegistrationProcess/StartRegistrationProcess/Stepper/Forms/PasswordForm";

const StyledDTEContent = styled(DTEContent)`
  && {
    margin: 0;
  }
`;

function ResetPassword() {
  const { content } = useContext(ContentContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [localFormData, setLocalFormData] = useState<PasswordFormData>({
    password: "",
    password2: "",
  });
  let requirePolicyComma: boolean;
  const [policyBuilder, setPolicyBuilder] = useState("");
  const [passwordPolicy, setPasswordPolicy] = useState<PasswordPolicy>();
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors: formErrors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const { search } = useLocation();
  const code = new URLSearchParams(search).get("code");
  const userId = new URLSearchParams(search).get("userId");

  const [submitResponse, setSubmitResponse] = useState<DTEAxiosResponse | undefined>(undefined);

  const [{ response: policyResponse, loading: policyLoading, error: policyError }] = useAxiosFetch(
    {
      url: `${process.env.REACT_APP_BASE_API}/users/passwordpolicy`,
      method: "GET",
    },
    { useCache: false, manual: false }
  );

  const requirementsConstructor = (constructor: string, clause: boolean, clauseText: string) => {
    let returnedValue = constructor;
    if (clause) {
      if (requirePolicyComma) {
        returnedValue += ", ";
      }
      returnedValue += clauseText;
      requirePolicyComma = true;
    }
    return returnedValue;
  };

  useEffect(() => {
    if (policyResponse) {
      const policy = Utils.ConvertResponseToDTEResponse(policyResponse) as unknown as PasswordPolicy;
      let builder = `${content["register-password-policy-builder-char1"]} ${policy.minimumLength} ${content["register-password-policy-builder-char2"]}`;
      let requirements = "";
      if (policy.requireUppercase || policy.requireLowercase || policy.requireNumbers || policy.requireSymbols) {
        requirements += content["register-password-policy-builder-include"];
      }
      requirements = requirementsConstructor(
        requirements,
        policy.requireUppercase,
        content["register-password-policy-builder-include-uppercase"]
      );
      requirements = requirementsConstructor(
        requirements,
        policy.requireLowercase,
        content["register-password-policy-builder-include-lowercase"]
      );
      requirements = requirementsConstructor(
        requirements,
        policy.requireNumbers,
        content["register-password-policy-builder-include-numbers"]
      );
      requirements = requirementsConstructor(
        requirements,
        policy.requireSymbols,
        content["register-password-policy-builder-include-symbols"]
      );
      if (policy.requireUppercase || policy.requireLowercase || policy.requireNumbers || policy.requireSymbols) {
        requirements = requirements.replace(/,([^,]*)$/, ` ${content["reusable-text-and"]}$1`);
      }
      builder += `${requirements}.`;
      setPolicyBuilder(builder);
      setPasswordPolicy(policy);
    }
  }, [policyResponse]);

  useEffect(() => {
    if (document.getElementsByClassName("nhsuk-error-message")[0]) {
      Utils.FocusOnError();
    }
  }, [isSubmitting]);

  const onSubmit = async (formData: any) => {
    // setInvalidCredentials(false);
    setSubmitResponse(undefined);
    const res = await confirmPasswordReset(
      {
        url: `${process.env.REACT_APP_BASE_API}/users/confirmforgotpassword`,
        method: "POST",
        data: { code, userId, password: formData?.password },
      },
      {
        manual: true,
      }
    ).catch(() => {
      // swallow 404 axios error -
    });
    const result = Utils.ConvertResponseToDTEResponse(res);
    setSubmitResponse(result);
  };

  const [{ loading: loadingForgot, error: errorForgot }, confirmPasswordReset] = useAxiosFetch({}, { manual: true });

  useEffect(() => {
    if (passwordPolicy) ReactGA.pageview("/ResetPassword/choose");
    if (!submitResponse?.isSuccess && submitResponse?.errors[0]?.exceptionName === "ExpiredCodeException")
      ReactGA.pageview("/ResetPassword/failed");
    if (submitResponse?.isSuccess) ReactGA.pageview("/ResetPassword/updated");
  }, [passwordPolicy, submitResponse]);

  const handleValueChange = (field: keyof PasswordFormData, value: string) => {
    setValue(field, value);
    setLocalFormData((prevState) => ({ ...prevState, [field]: value }));
  };

  return (
    <DocumentTitle title={content["resetpassword-choose-password-document-title"]}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={10} sm={6} md={4}>
          <Box pt={isMobile ? 5 : 15} pb={isMobile ? 5 : 15}>
            <Grid container direction="column" alignItems="center" justifyContent="center">
              {policyLoading && <LoadingIndicator text={content["reusable-password-policy-loading"]} />}
              {passwordPolicy && (
                <Grid item xs={12}>
                  {!submitResponse?.isSuccess && (
                    <>
                      {submitResponse?.errors[0]?.exceptionName !== "ExpiredCodeException" ? (
                        <>
                          <ErrorMessageContainer
                            axiosErrors={[policyError]}
                            DTEAxiosErrors={[Utils.ConvertResponseToDTEResponse(policyResponse)?.errors]}
                          />
                          <DTEHeaderCaption contentKey="resetpassword-header-choose-password-caption" />
                          <DTEHeader as="h1">{content["resetpassword-header-choose-password"]}</DTEHeader>
                          <ErrorMessageSummary renderSummary={!isSubmitting} errors={formErrors} />
                          <DTEContent>{policyBuilder}</DTEContent>
                          <ThreeWords />
                          <form onSubmit={handleSubmit(onSubmit)} noValidate onInvalid={() => {}}>
                            <Honeypot />
                            <Controller
                              control={control}
                              name="password"
                              render={({ fieldState: { error } }) => (
                                <PasswordShowHide
                                  id="password"
                                  onValueChange={(e) => handleValueChange("password", e.target.value)}
                                  error={error?.message}
                                  label={content["reusable-password-input-create"]}
                                  required
                                  autocomplete="new-password"
                                  spellcheck={false}
                                  buttonAriaLabelHide={content["reusable-aria-hide-password"]}
                                  buttonAriaLabelShow={content["reusable-aria-show-password"]}
                                  value={localFormData.password}
                                />
                              )}
                              rules={{
                                required: {
                                  value: true,
                                  message: content["reusable-password-validation-required"],
                                },
                                validate: (value) => validatePassword(value, passwordPolicy, content),
                              }}
                            />
                            <Controller
                              control={control}
                              name="password2"
                              render={({ fieldState: { error } }) => (
                                <PasswordShowHide
                                  id="password2"
                                  label={content["reusable-password-input-confirm"]}
                                  error={error?.message}
                                  onValueChange={(e) => handleValueChange("password2", e.target.value)}
                                  required
                                  spellcheck={false}
                                  buttonAriaLabelHide={content["reusable-aria-hide-password-confirmation"]}
                                  buttonAriaLabelShow={content["reusable-aria-show-password-confirmation"]}
                                  value={localFormData.password2}
                                />
                              )}
                              rules={{
                                required: {
                                  value: true,
                                  message: content["reusable-validation-confirm-password"],
                                },
                                validate: (value) => {
                                  if (value === getValues().password) {
                                    return true;
                                  }
                                  return content["reusable-validation-same-password"];
                                },
                              }}
                            />
                            <Grid container spacing={4} alignItems="center">
                              <Grid item xs={4}>
                                <DTEButton $fullwidth disabled={loadingForgot}>
                                  {content["reusable-save"]}
                                </DTEButton>
                              </Grid>
                              <Grid item>
                                <StyledDTEContent>
                                  <DTERouteLink to="/UserLogin" renderStyle="standard">
                                    {content["reusable-cancel"]}
                                  </DTERouteLink>
                                </StyledDTEContent>
                              </Grid>
                            </Grid>
                          </form>
                          <ErrorMessageContainer axiosError={errorForgot} DTEAxiosErrors={[submitResponse?.errors]} />
                        </>
                      ) : (
                        <>
                          <DTEHeaderCaption contentKey="resetpassword-header-failed-caption" />
                          <DTEHeader as="h2">{content["resetpassword-header-failed"]}</DTEHeader>
                          {content["resetpassword-failed-page"]}
                        </>
                      )}
                    </>
                  )}
                  {submitResponse?.isSuccess && (
                    <>
                      <DTEHeaderCaption contentKey="resetpassword-header-updated-caption" />
                      <DTEHeader as="h2">{content["resetpassword-header-updated"]}</DTEHeader>
                      <DTERouteLink to="/">{content["reusable-button-signin"]}</DTERouteLink>
                    </>
                  )}
                  {loadingForgot && <LoadingIndicator text={content["reusable-loading-submitting"]} />}
                </Grid>
              )}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </DocumentTitle>
  );
}

export default ResetPassword;
