import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { AuthContext } from "../../../../context/AuthContext";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";
import Utils, { EmailRegex } from "../../../../Helper/Utils";
import ErrorMessageContainer from "../../../Shared/ErrorMessageContainer/ErrorMessageContainer";
import LoadingIndicator from "../../../Shared/LoadingIndicator/LoadingIndicator";
import DTEInput from "../../../Shared/UI/DTEInput/DTEInput";
import DTEHeader from "../../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import FormBaseProps from "../../../Shared/FormElements/FormBaseProps";
import FormNavigationButtons from "../../../Shared/FormElements/CommonElements/FormNavigationButtons";
import ErrorMessageSummary from "../../../Shared/ErrorMessageSummary/ErrorMessageSummary";
import { ContentContext } from "../../../../context/ContentContext";
import Honeypot from "../../../Shared/Honeypot/Honeypot";

export type UpdateEmailFormData = {
  emailAddress: string;
  confirmEmailAddress: string;
};

function UpdateEmailForm({ onCancel }: FormBaseProps) {
  const { content } = useContext(ContentContext);
  const history = useHistory();
  const { logOutToken } = useContext(AuthContext);
  const theme = useTheme();
  const headerVariant = useMediaQuery(theme.breakpoints.down("xs")) ? "h2" : "h1";
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors: formErrors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      emailAddress: "",
      confirmEmailAddress: "",
    },
  });

  const [
    { response: updateUserEmailPostResponse, loading: updateUserEmailPostLoading, error: updateUserEmailPostError },
    updateUserEmailPost,
  ] = useAxiosFetch(
    {
      method: "POST",
    },
    { useCache: false, manual: true }
  );

  const handleChangeEmail = async (data: UpdateEmailFormData) => {
    await updateUserEmailPost({
      url: `${process.env.REACT_APP_BASE_API}/users/changeemail`,
      method: "POST",
      data: {
        newEmail: data.emailAddress,
      },
    }).catch(() => {
      // console.log(err.message);
    });
  };

  useEffect(() => {
    if (Utils.ConvertResponseToDTEResponse(updateUserEmailPostResponse)?.isSuccess) {
      logOutToken();
      history.push("/Participants/EmailUpdated");
    }
  }, [updateUserEmailPostResponse]);

  return (
    <>
      <DTEHeader as="h1" $variant={headerVariant} captionKey="update-email-header">
        {content["update-email-header"]}
      </DTEHeader>
      <ErrorMessageSummary renderSummary={!isSubmitting} errors={formErrors} />
      {(updateUserEmailPostError || Utils.ConvertResponseToDTEResponse(updateUserEmailPostResponse)?.errors) && (
        <ErrorMessageContainer description={content["update-email-error-message"]}>
          <></>
        </ErrorMessageContainer>
      )}
      {updateUserEmailPostLoading && <LoadingIndicator text={content["reusable-loading-updating-details"]} />}
      <Grid container>
        <Grid item xs={12} sm={10} md={8} lg={7} xl={6}>
          <form onSubmit={handleSubmit(handleChangeEmail)} noValidate>
            <Honeypot />
            <Controller
              control={control}
              name="emailAddress"
              render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                <DTEInput
                  id="emailAddress"
                  value={value}
                  onValueChange={onChange}
                  onValueBlur={onBlur}
                  error={error?.message}
                  label={content["update-email-label-email-address"]}
                  required
                  type="email"
                  autocomplete="email"
                  spellcheck={false}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: content["update-email-validation-required"],
                },
                pattern: {
                  value: EmailRegex,
                  message: content["reusable-email-validation-invalid-format"],
                },
              }}
            />
            <Controller
              control={control}
              name="confirmEmailAddress"
              render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                <DTEInput
                  id="confirmEmailAddress"
                  value={value}
                  onValueChange={onChange}
                  onValueBlur={onBlur}
                  error={error?.message}
                  label={content["update-email-label-confirm-email"]}
                  required
                  type="email"
                  autocomplete="email"
                  spellcheck={false}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: content["update-email-label-confirm-email"],
                },
                pattern: {
                  value: EmailRegex,
                  message: content["reusable-email-validation-invalid-format"],
                },
                validate: (value) => {
                  if (value === getValues().emailAddress) {
                    return true;
                  }
                  return content["update-email-validation-match"];
                },
              }}
            />
            {content["update-email-page"]}
            <FormNavigationButtons
              nextButtonText={content["reusable-save"]}
              cancelButtonText={content["reusable-cancel"]}
              showCancelButton
              onCancel={onCancel}
            />
          </form>
        </Grid>
      </Grid>
    </>
  );
}

export default UpdateEmailForm;
