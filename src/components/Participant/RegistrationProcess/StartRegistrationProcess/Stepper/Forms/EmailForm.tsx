import { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Utils, { EmailRegex } from "../../../../../../Helper/Utils";
import DTEInput from "../../../../../Shared/UI/DTEInput/DTEInput";
import DTEButton from "../../../../../Shared/UI/DTEButton/DTEButton";
import DTEHeader from "../../../../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import ErrorMessageSummary from "../../../../../Shared/ErrorMessageSummary/ErrorMessageSummary";
import { ContentContext } from "../../../../../../context/ContentContext";

export type EmailFormData = {
  emailAddress: string;
};

interface EmailFormProps {
  initialStateData: EmailFormData;
  onDataChange: (data: EmailFormData) => void;
}

function EmailForm(props: EmailFormProps) {
  const { content } = useContext(ContentContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onDataChange, initialStateData } = props;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const theme = useTheme();
  const headerVariant = useMediaQuery(theme.breakpoints.down("xs")) ? "h2" : "h1";
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
        {content["register-email-header"]}
      </DTEHeader>
      <ErrorMessageSummary renderSummary={!isSubmitting} errors={formErrors} />
      <Grid container>
        <Grid item xs={12} sm={10} md={8} lg={7} xl={6}>
          <form onSubmit={handleSubmit(onDataChange)} noValidate>
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
                  message: content["register-email-validation-required"],
                },
                pattern: {
                  value: EmailRegex,
                  message: content["reusable-email-validation-invalid-format"],
                },
              }}
            />
            {content["register-email-page"]}
            <DTEButton>{content["reusable-button-continue"]}</DTEButton>
          </form>
        </Grid>
      </Grid>
    </>
  );
}

export default EmailForm;
