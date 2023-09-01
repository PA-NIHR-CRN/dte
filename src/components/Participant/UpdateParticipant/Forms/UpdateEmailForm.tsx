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
import DTEContent from "../../../Shared/UI/DTETypography/DTEContent/DTEContent";
import DTEDetails from "../../../Shared/UI/DTEDetails/DTEDetails";
import FormBaseProps from "../../../Shared/FormElements/FormBaseProps";
import FormNavigationButtons from "../../../Shared/FormElements/CommonElements/FormNavigationButtons";
import ErrorMessageSummary from "../../../Shared/ErrorMessageSummary/ErrorMessageSummary";
import Honeypot from "../../../Shared/Honeypot/Honeypot";

export type UpdateEmailFormData = {
  emailAddress: string;
  confirmEmailAddress: string;
};

const UpdateEmailForm = ({ onCancel }: FormBaseProps) => {
  const history = useHistory();
  const { logOutToken } = useContext(AuthContext);
  const theme = useTheme();
  const headerVariant = useMediaQuery(theme.breakpoints.down("xs"))
    ? "h2"
    : "h1";
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
    {
      response: updateUserEmailPostResponse,
      loading: updateUserEmailPostLoading,
      error: updateUserEmailPostError,
    },
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
    if (
      Utils.ConvertResponseToDTEResponse(updateUserEmailPostResponse)?.isSuccess
    ) {
      logOutToken();
      history.push("/Participants/EmailUpdated");
    }
  }, [updateUserEmailPostResponse]);

  return (
    <>
      <DTEHeader as="h1" $variant={headerVariant}>
        What is your new email address?
      </DTEHeader>
      <ErrorMessageSummary renderSummary={!isSubmitting} errors={formErrors} />
      {(updateUserEmailPostError ||
        Utils.ConvertResponseToDTEResponse(updateUserEmailPostResponse)
          ?.errors) && (
        <ErrorMessageContainer description="Your email address has not been updated. The email address may already be registered or there may have been a technical issue.">
          <></>
        </ErrorMessageContainer>
      )}
      {updateUserEmailPostLoading && (
        <LoadingIndicator text="Updating your details..." />
      )}
      <Grid container>
        <Grid item xs={12} sm={10} md={8} lg={7} xl={6}>
          <form onSubmit={handleSubmit(handleChangeEmail)} noValidate>
            <Honeypot />
            <Controller
              control={control}
              name="emailAddress"
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <DTEInput
                  id="emailAddress"
                  value={value}
                  onValueChange={onChange}
                  onValueBlur={onBlur}
                  error={error?.message}
                  label="New email address"
                  required
                  type="email"
                  autocomplete="email"
                  spellcheck={false}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "Enter your new email address",
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
              name="confirmEmailAddress"
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <DTEInput
                  id="confirmEmailAddress"
                  value={value}
                  onValueChange={onChange}
                  onValueBlur={onBlur}
                  error={error?.message}
                  label="Confirm your new email address"
                  required
                  type="email"
                  autocomplete="email"
                  spellcheck={false}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "Confirm your new email address",
                },
                pattern: {
                  value: EmailRegex,
                  message:
                    "Enter an email address in the correct format, like name@example.com",
                },
                validate: (value) => {
                  if (value === getValues().emailAddress) {
                    return true;
                  }
                  return "Enter the same email address as above";
                },
              }}
            />
            <DTEDetails summary="Why we are asking this question">
              <DTEContent>
                We need your email address so we can contact you when we find a
                suitable study
              </DTEContent>
            </DTEDetails>
            <FormNavigationButtons
              nextButtonText="Save"
              showCancelButton
              onCancel={onCancel}
            />
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default UpdateEmailForm;
