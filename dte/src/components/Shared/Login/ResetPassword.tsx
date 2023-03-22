import React, { useState, useEffect } from "react";
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
import DTEContent from "../UI/DTETypography/DTEContent/DTEContent";
import { DTEAxiosResponse } from "../../../types/AuthTypes";
import Utils from "../../../Helper/Utils";
import DTERouteLink from "../UI/DTERouteLink/DTERouteLink";
import ErrorMessageSummary from "../ErrorMessageSummary/ErrorMessageSummary";
import PasswordShowHide from "../Password/showHide";
import ThreeWords from "../Password/threeWords";

interface PasswordPolicy {
  minimumLength: number;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSymbols: boolean;
  requireUppercase: boolean;
  allowedPasswordSymbols?: string;
}

const StyledDTEContent = styled(DTEContent)`
  && {
    margin: 0;
  }
`;

function ResetPassword() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  let requirePolicyComma: boolean;
  let requireErrorMessageComma: boolean;
  let minLengthErrorOccured: boolean;
  let validationSuccess = true;
  let includesStatement = "";
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

  const [submitResponse, setSubmitResponse] = useState<
    DTEAxiosResponse | undefined
  >(undefined);

  const [
    { response: policyResponse, loading: policyLoading, error: policyError },
  ] = useAxiosFetch(
    {
      url: `${process.env.REACT_APP_BASE_API}/users/passwordpolicy`,
      method: "GET",
    },
    { useCache: false, manual: false }
  );

  const requirementsConstruction = (
    constructor: string,
    clause: boolean,
    clauseText: string
  ) => {
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

  const errorConstruction = (
    errorConstructor: string,
    errorClause: boolean,
    errorCommaClauseText: string,
    errorNonCommaClauseText: string,
    errorSpecialConstructor?: boolean
  ) => {
    let returnedValue = errorConstructor;
    if (errorClause) {
      if (
        requireErrorMessageComma ||
        (minLengthErrorOccured && errorSpecialConstructor)
      ) {
        returnedValue += `, ${includesStatement}${errorCommaClauseText}`;
      } else {
        returnedValue += `${includesStatement}${errorNonCommaClauseText}`;
      }
      requireErrorMessageComma = true;
      includesStatement = "";
      validationSuccess = false;
    }
    return returnedValue;
  };

  useEffect(() => {
    if (policyResponse) {
      const policy = Utils.ConvertResponseToDTEResponse(
        policyResponse
      ) as unknown as PasswordPolicy;
      let builder = `Your password must be ${policy.minimumLength} or more characters. You can use a mix of letters, numbers or symbols`;
      let requirements = "";
      if (
        policy.requireUppercase ||
        policy.requireLowercase ||
        policy.requireNumbers ||
        policy.requireSymbols
      ) {
        requirements += " which must include at least ";
      }
      requirements = requirementsConstruction(
        requirements,
        policy.requireUppercase,
        "1 capital letter"
      );
      requirements = requirementsConstruction(
        requirements,
        policy.requireLowercase,
        "1 lowercase letter"
      );
      requirements = requirementsConstruction(
        requirements,
        policy.requireNumbers,
        "1 number"
      );
      requirements = requirementsConstruction(
        requirements,
        policy.requireSymbols,
        "1 symbol"
      );
      if (
        policy.requireUppercase ||
        policy.requireLowercase ||
        policy.requireNumbers ||
        policy.requireSymbols
      ) {
        requirements = requirements.replace(/,([^,]*)$/, ` and$1`);
      }
      builder += `${requirements}.`;
      setPolicyBuilder(builder);
      setPasswordPolicy(policy);
    }
  }, [policyResponse]);

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

  const [{ loading: loadingForgot, error: errorForgot }, confirmPasswordReset] =
    useAxiosFetch({}, { manual: true });

  useEffect(() => {
    if (passwordPolicy) ReactGA.pageview("/ResetPassword/choose");
    if (
      !submitResponse?.isSuccess &&
      submitResponse?.errors[0]?.exceptionName === "ExpiredCodeException"
    )
      ReactGA.pageview("/ResetPassword/failed");
    if (submitResponse?.isSuccess) ReactGA.pageview("/ResetPassword/updated");
  }, [passwordPolicy, submitResponse]);

  return (
    <DocumentTitle title="Choose a new password - Volunteer Account - Be Part of Research">
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={10} sm={6} md={4}>
          <Box pt={isMobile ? 5 : 15} pb={isMobile ? 5 : 15}>
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              {policyLoading && (
                <LoadingIndicator text="Loading password policy..." />
              )}
              {passwordPolicy && (
                <Grid item xs={12}>
                  {!submitResponse?.isSuccess && (
                    <>
                      {submitResponse?.errors[0]?.exceptionName !==
                      "ExpiredCodeException" ? (
                        <>
                          <ErrorMessageContainer
                            axiosErrors={[policyError]}
                            DTEAxiosErrors={[
                              Utils.ConvertResponseToDTEResponse(policyResponse)
                                ?.errors,
                            ]}
                          />
                          <DTEHeader as="h1">Choose a new password</DTEHeader>
                          <ErrorMessageSummary
                            renderSummary={!isSubmitting}
                            errors={formErrors}
                          />
                          <DTEContent>{policyBuilder}</DTEContent>
                          <ThreeWords />
                          <form
                            onSubmit={handleSubmit(onSubmit)}
                            noValidate
                            onInvalid={() => {}}
                          >
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
                                  label="Create your password"
                                  required
                                  autocomplete="new-password"
                                  spellcheck={false}
                                />
                              )}
                              rules={{
                                required: {
                                  value: true,
                                  message: "Enter a password",
                                },
                                validate: (value) => {
                                  let passwordError = "Enter a password that ";
                                  requireErrorMessageComma = false;
                                  validationSuccess = true;
                                  const regExMinLength = new RegExp(
                                    `^.{${passwordPolicy.minimumLength},}$`
                                  );
                                  if (!regExMinLength.test(value)) {
                                    passwordError += `is at least ${passwordPolicy.minimumLength} characters long`;
                                    minLengthErrorOccured = true;
                                    includesStatement = " and includes ";
                                    validationSuccess = false;
                                  } else {
                                    includesStatement = "includes ";
                                  }
                                  if (passwordPolicy.requireUppercase) {
                                    passwordError = errorConstruction(
                                      passwordError,
                                      !/[A-Z]/.test(value),
                                      "at least 1 capital letter",
                                      "at least 1 capital letter"
                                    );
                                  }
                                  if (passwordPolicy.requireLowercase) {
                                    passwordError = errorConstruction(
                                      passwordError,
                                      !/[a-z]/.test(value),
                                      "1 lowercase letter",
                                      "at least 1 lowercase letter"
                                    );
                                  }
                                  if (passwordPolicy.requireNumbers) {
                                    passwordError = errorConstruction(
                                      passwordError,
                                      !/\d/.test(value),
                                      "1 number",
                                      "at least 1 number"
                                    );
                                  }
                                  if (
                                    passwordPolicy.requireSymbols &&
                                    passwordPolicy.allowedPasswordSymbols
                                  ) {
                                    const regExSymbols = new RegExp(
                                      `[\\${passwordPolicy.allowedPasswordSymbols.replace(
                                        / /g,
                                        "\\"
                                      )}]`
                                    );
                                    passwordError = errorConstruction(
                                      passwordError,
                                      !regExSymbols.test(value),
                                      "1 symbol",
                                      "at least 1 symbol"
                                    );
                                  }
                                  includesStatement = "";
                                  passwordError = errorConstruction(
                                    passwordError,
                                    !/^[^ ]+$/.test(value),
                                    "does not include spaces",
                                    "does not include spaces",
                                    true
                                  );
                                  if (passwordPolicy.allowedPasswordSymbols) {
                                    const regExIllegal = new RegExp(
                                      `[^a-zA-Z0-9 \\${passwordPolicy.allowedPasswordSymbols.replace(
                                        / /g,
                                        "\\"
                                      )}]`
                                    );
                                    passwordError = errorConstruction(
                                      passwordError,
                                      regExIllegal.test(value),
                                      "only includes symbols from this list ##allowedsymbols##",
                                      "only includes symbols from this list ##allowedsymbols##",
                                      true
                                    );
                                  }
                                  let finalErrorMessage = passwordError.replace(
                                    /,([^,]*)$/,
                                    ` and$1`
                                  );
                                  if (passwordPolicy.allowedPasswordSymbols) {
                                    finalErrorMessage =
                                      finalErrorMessage.replace(
                                        `##allowedsymbols##`,
                                        passwordPolicy.allowedPasswordSymbols.replace(
                                          / /g,
                                          ""
                                        )
                                      );
                                  }
                                  return validationSuccess
                                    ? true
                                    : finalErrorMessage;
                                },
                              }}
                            />
                            <Controller
                              control={control}
                              name="password2"
                              render={({ fieldState: { error } }) => (
                                <PasswordShowHide
                                  id="password2"
                                  label="Confirm your password"
                                  error={error?.message}
                                  onValueChange={(e) =>
                                    setValue("password2", e.target.value)
                                  }
                                  required
                                  spellcheck={false}
                                />
                              )}
                              rules={{
                                required: {
                                  message: "Confirm the password",
                                  value: true,
                                },
                                validate: (value) => {
                                  if (value === getValues().password) {
                                    return true;
                                  }
                                  return "Enter the same password as above";
                                },
                              }}
                            />
                            <Grid container spacing={4} alignItems="center">
                              <Grid item xs={4}>
                                <DTEButton $fullwidth disabled={loadingForgot}>
                                  Save
                                </DTEButton>
                              </Grid>
                              <Grid item>
                                <StyledDTEContent>
                                  <DTERouteLink
                                    to="/UserLogin"
                                    renderStyle="standard"
                                  >
                                    Cancel
                                  </DTERouteLink>
                                </StyledDTEContent>
                              </Grid>
                            </Grid>
                          </form>
                          <ErrorMessageContainer
                            axiosError={errorForgot}
                            DTEAxiosErrors={[submitResponse?.errors]}
                          />
                        </>
                      ) : (
                        <>
                          <DTEHeader as="h2">
                            Unable to reset your password
                          </DTEHeader>
                          <DTEContent>
                            Your password reset link has expired as the link
                            only lasts for 1 hour.
                          </DTEContent>
                          <DTEContent>
                            You will need to reset your password again.
                          </DTEContent>
                          <DTERouteLink to="/ForgottenPassword">
                            Reset your password
                          </DTERouteLink>
                        </>
                      )}
                    </>
                  )}
                  {submitResponse?.isSuccess && (
                    <>
                      <DTEHeader as="h2">
                        Your password has been updated
                      </DTEHeader>
                      <DTERouteLink to="/">Sign in</DTERouteLink>
                    </>
                  )}
                  {loadingForgot && <LoadingIndicator text="Submitting..." />}
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
