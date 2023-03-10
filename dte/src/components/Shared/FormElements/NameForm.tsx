import { useEffect } from "react";
import { Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Controller, useForm } from "react-hook-form";
import Utils from "../../../Helper/Utils";
import DTEInput from "../UI/DTEInput/DTEInput";
import DTEHeader from "../UI/DTETypography/DTEHeader/DTEHeader";
import FormBaseProps from "./FormBaseProps";
import FormNavigationButtons from "./CommonElements/FormNavigationButtons";
import ErrorMessageSummary from "../ErrorMessageSummary/ErrorMessageSummary";

export type NameFormData = {
  firstName: string;
  lastName: string;
};
interface NameFormProps extends FormBaseProps {
  initialStateData: NameFormData;
  onDataChange: (data: NameFormData) => void;
}

const NameForm = (props: NameFormProps) => {
  const {
    onDataChange,
    initialStateData,
    nextButtonText,
    hideHeader,
    instructionText,
    showCancelButton,
    onCancel,
  } = props;
  const theme = useTheme();
  const headerVariant = useMediaQuery(theme.breakpoints.down("xs"))
    ? "h2"
    : "h1";
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      firstName: initialStateData.firstName,
      lastName: initialStateData.lastName,
    },
  });

  const onSubmit = (data: NameFormData) => {
    return onDataChange(Utils.TrimFormDataFields(data) as NameFormData);
  };

  useEffect(() => {
    if (document.getElementsByClassName("nhsuk-error-message")[0]) {
      Utils.FocusOnError();
    }
  }, [isSubmitting]);

  return (
    <>
      {!hideHeader && (
        <DTEHeader as="h1" $variant={headerVariant}>
          What is your name?
        </DTEHeader>
      )}
      {instructionText}
      <ErrorMessageSummary renderSummary={!isSubmitting} errors={formErrors} />
      <Grid container>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Controller
              control={control}
              name="firstName"
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <DTEInput
                  id="firstName"
                  value={value}
                  onValueChange={onChange}
                  onValueBlur={onBlur}
                  error={error?.message}
                  label="First name"
                  required
                  autocomplete="given-name"
                  spellcheck={false}
                />
              )}
              rules={{
                validate: (value) => {
                  if (value && value.trim()) {
                    return true;
                  }
                  setValue("firstName", "");
                  return "Enter your first name";
                },
              }}
            />
            <Controller
              control={control}
              name="lastName"
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <DTEInput
                  id="lastName"
                  value={value}
                  onValueChange={onChange}
                  onValueBlur={onBlur}
                  error={error?.message}
                  label="Last name"
                  required
                  autocomplete="family-name"
                  spellcheck={false}
                />
              )}
              rules={{
                validate: (value) => {
                  if (value && value.trim()) {
                    return true;
                  }
                  setValue("lastName", "");
                  return "Enter your last name";
                },
              }}
            />
            <FormNavigationButtons
              nextButtonText={nextButtonText || "Continue"}
              showCancelButton={showCancelButton || false}
              onCancel={onCancel}
            />
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default NameForm;
