import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Utils, { EmailRegex } from "../../../../../../Helper/Utils";
import DTEInput from "../../../../../Shared/UI/DTEInput/DTEInput";
import DTEButton from "../../../../../Shared/UI/DTEButton/DTEButton";
import DTEHeader from "../../../../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../../../../Shared/UI/DTETypography/DTEContent/DTEContent";
import DTEDetails from "../../../../../Shared/UI/DTEDetails/DTEDetails";
import ErrorMessageSummary from "../../../../../Shared/ErrorMessageSummary/ErrorMessageSummary";
import Honeypot from "../../../../../Shared/Honeypot/Honeypot";

export type EmailFormData = {
  emailAddress: string;
};

interface EmailFormProps {
  initialStateData: EmailFormData;
  onDataChange: (data: EmailFormData) => void;
}

const EmailForm = (props: EmailFormProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onDataChange, initialStateData } = props;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const theme = useTheme();
  const headerVariant = useMediaQuery(theme.breakpoints.down("xs"))
    ? "h2"
    : "h1";
  const {
    control,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      emailAddress: initialStateData.emailAddress,
    },
  });

  useEffect(() => {
    if (document.getElementsByClassName("nhsuk-error-message")[0]) {
      Utils.FocusOnError();
    }
  }, [isSubmitting]);

  return (
    <>
      <DTEHeader as="h1" $variant={headerVariant}>
        What is your email address?
      </DTEHeader>
      <ErrorMessageSummary renderSummary={!isSubmitting} errors={formErrors} />
      <Grid container>
        <Grid item xs={12} sm={10} md={8} lg={7} xl={6}>
          <form onSubmit={handleSubmit(onDataChange)} noValidate>
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
                  label="Email address"
                  required
                  type="email"
                  autocomplete="email"
                  spellcheck={false}
                />
              )}
              rules={{
                required: { value: true, message: "Enter your email address" },
                pattern: {
                  value: EmailRegex,
                  message:
                    "Enter an email address in the correct format, like name@example.com",
                },
              }}
            />
            <DTEDetails summary="Why we are asking this question">
              <DTEContent>
                We need your email address so we can contact you when we find a
                suitable study
              </DTEContent>
            </DTEDetails>
            <DTEButton>Continue</DTEButton>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default EmailForm;
