import React, { useEffect, useState } from "react";
import { Grid, Box } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import DocumentTitle from "react-document-title";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import ErrorMessageContainer from "../ErrorMessageContainer/ErrorMessageContainer";
import DTEInput from "../UI/DTEInput/DTEInput";
import DTEButton from "../UI/DTEButton/DTEButton";
import DTEHeader from "../UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../UI/DTETypography/DTEContent/DTEContent";
import { DTEAxiosResponse } from "../../../types/AuthTypes";
import Utils, { EmailRegex } from "../../../Helper/Utils";
import ErrorMessageSummary from "../ErrorMessageSummary/ErrorMessageSummary";
import Honeypot from "../Honeypot/Honeypot";

function ForgottenPassword() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors: formErrors, isSubmitting },
  } = useForm({ mode: "onSubmit", reValidateMode: "onSubmit" });
  const [pageTitle, setPageTitle] = useState(
    "Reset password - Volunteer Account - Be Part of Research",
  );
  const [submitResponse, setSubmitResponse] = useState<
    DTEAxiosResponse | undefined
  >(undefined);
  const [userEmail, setUserEmail] = useState("");

  const onSubmit = async (formData: any) => {
    // setInvalidCredentials(false);
    setSubmitResponse(undefined);
    setUserEmail(formData.email);
    const res = await forgotPasswordSubmit(
      {
        url: `${process.env.REACT_APP_BASE_API}/users/forgotpassword`,
        method: "POST",
        data: { ...formData },
      },
      {
        manual: true,
      },
    ).catch(() => {
      // swallow 404 axios error -
    });
    const result = Utils.ConvertResponseToDTEResponse(res);
    setSubmitResponse(result);
    setPageTitle(
      "Check your email to reset password - Volunteer Account - Be Part of Research",
    );
  };
  useEffect(() => {
    if (document.getElementsByClassName("nhsuk-error-message")[0]) {
      Utils.FocusOnError();
    }
  }, [isSubmitting]);

  const [{ loading: loadingForgot, error: errorForgot }, forgotPasswordSubmit] =
    useAxiosFetch({}, { manual: true });

  return (
    <DocumentTitle title={pageTitle}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={10} sm={6} md={4}>
          <Box pt={isMobile ? 5 : 15} pb={isMobile ? 5 : 15}>
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={12}>
                {!(
                  submitResponse?.isSuccess ||
                  submitResponse?.errors[0].exceptionName ===
                    "UserNotFoundException"
                ) ? (
                  <>
                    <DTEHeader as="h1">Reset password</DTEHeader>
                    <DTEContent>
                      Enter your email address and we will send you a link to
                      reset your password.
                    </DTEContent>
                    <ErrorMessageSummary
                      renderSummary={!isSubmitting}
                      errors={formErrors}
                    />
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      noValidate
                      onInvalid={() => {}}
                    >
                      <Honeypot />
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
                            type="email"
                            autocomplete="email"
                            spellcheck={false}
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
                      <Grid container xs={6} sm={9} md={9}>
                        <DTEButton disabled={loadingForgot} $fullwidth>
                          Reset your password
                        </DTEButton>
                      </Grid>
                    </form>
                    <ErrorMessageContainer
                      DTEAxiosErrors={[submitResponse?.errors]}
                    />
                  </>
                ) : (
                  <>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <DTEHeader as="h1">Check your email</DTEHeader>
                        <DTEContent>
                          We&apos;ve sent an email to {watch("email")} with a
                          link to reset your password. The link lasts for 1
                          hour.
                        </DTEContent>
                        <DTEContent>
                          Unable to find it? Check your spam folder.
                        </DTEContent>
                        <DTEContent>Still unable to find the email?</DTEContent>
                      </Grid>
                      <Grid item xs={6}>
                        <DTEButton
                          $fullwidth
                          disabled={loadingForgot}
                          onClick={() => {
                            forgotPasswordSubmit(
                              {
                                url: `${process.env.REACT_APP_BASE_API}/users/forgotpassword`,
                                method: "POST",
                                data: {
                                  email: userEmail,
                                },
                              },
                              {
                                manual: true,
                              },
                            ).catch(() => {
                              // swallow 404 axios error -
                            });
                          }}
                        >
                          Resend the email
                        </DTEButton>
                      </Grid>
                    </Grid>
                  </>
                )}
                {loadingForgot && <LoadingIndicator text="Submitting..." />}
                {errorForgot && (
                  <>
                    <ErrorMessageContainer axiosError={errorForgot} />
                  </>
                )}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </DocumentTitle>
  );
}

export default ForgottenPassword;
