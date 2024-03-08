import React, { useContext, useEffect, useState } from "react";
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
import DTEHeaderCaption from "../UI/DTETypography/DTEHeaderCaption/DTEHeaderCaption";
import DTEContent from "../UI/DTETypography/DTEContent/DTEContent";
import { DTEAxiosResponse } from "../../../types/AuthTypes";
import Utils, { EmailRegex } from "../../../Helper/Utils";
import ErrorMessageSummary from "../ErrorMessageSummary/ErrorMessageSummary";
import { ContentContext } from "../../../context/ContentContext";
import Honeypot from "../Honeypot/Honeypot";

function ForgottenPassword() {
  const { content } = useContext(ContentContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors: formErrors, isSubmitting },
  } = useForm({ mode: "onSubmit", reValidateMode: "onSubmit" });
  const [pageTitle, setPageTitle] = useState(content["resetpassword-document-title"]);
  const [submitResponse, setSubmitResponse] = useState<DTEAxiosResponse | undefined>(undefined);
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
      }
    ).catch(() => {
      // swallow 404 axios error -
    });
    const result = Utils.ConvertResponseToDTEResponse(res);
    setSubmitResponse(result);
    setPageTitle(content["resetpassword-check-email-document-title"]);
  };
  useEffect(() => {
    if (document.getElementsByClassName("nhsuk-error-message")[0]) {
      Utils.FocusOnError();
    }
  }, [isSubmitting]);

  const [{ loading: loadingForgot, error: errorForgot }, forgotPasswordSubmit] = useAxiosFetch({}, { manual: true });

  return (
    <DocumentTitle title={pageTitle}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={10} sm={6} md={4}>
          <Box pt={isMobile ? 5 : 15} pb={isMobile ? 5 : 15}>
            <Grid container direction="column" alignItems="center" justifyContent="center">
              <Grid item xs={12}>
                {!(submitResponse?.isSuccess || submitResponse?.errors[0].exceptionName === "UserNotFoundException") ? (
                  <>
                    <DTEHeaderCaption contentKey="resetpassword-header-caption" />
                    <DTEHeader as="h1">{content["resetpassword-header"]}</DTEHeader>
                    <DTEContent>{content["resetpassword-body"]}</DTEContent>
                    <ErrorMessageSummary renderSummary={!isSubmitting} errors={formErrors} />
                    <form onSubmit={handleSubmit(onSubmit)} noValidate onInvalid={() => {}}>
                      <Honeypot />
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
                            type="email"
                            autocomplete="email"
                            spellcheck={false}
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
                      <Grid container xs={6} sm={9} md={9}>
                        <DTEButton disabled={loadingForgot} $fullwidth>
                          {content["resetpassword-button-reset"]}
                        </DTEButton>
                      </Grid>
                    </form>
                    <ErrorMessageContainer DTEAxiosErrors={[submitResponse?.errors]} />
                  </>
                ) : (
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <DTEHeaderCaption contentKey="reusable-check-your-email-header-caption" />
                      <DTEHeader as="h1">{content["reusable-check-your-email-header"]}</DTEHeader>
                      <DTEContent as="b" $marginBottom="large">
                        {content["reusable-check-email-bold-text"]} {watch("email")}
                      </DTEContent>
                      {content["resetpassword-check-email-text-linksent"]}
                      {content["reusable-check-email-body"]}
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
                            }
                          ).catch(() => {
                            // swallow 404 axios error -
                          });
                        }}
                      >
                        {content["resetpassword-button-resend-email"]}
                      </DTEButton>
                    </Grid>
                  </Grid>
                )}
                {loadingForgot && <LoadingIndicator text={content["reusable-loading-submitting"]} />}
                {errorForgot && <ErrorMessageContainer axiosError={errorForgot} />}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </DocumentTitle>
  );
}

export default ForgottenPassword;
