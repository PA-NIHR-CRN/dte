import { useContext, useEffect } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Controller, useForm } from "react-hook-form";
import DTEInput from "../UI/DTEInput/DTEInput";
import DTEHeader from "../UI/DTETypography/DTEHeader/DTEHeader";
import DTEHeaderCaption from "../UI/DTETypography/DTEHeaderCaption/DTEHeaderCaption";
import FormBaseProps from "./FormBaseProps";
import FormNavigationButtons from "./CommonElements/FormNavigationButtons";
import ErrorMessageSummary from "../ErrorMessageSummary/ErrorMessageSummary";
import Utils from "../../../Helper/Utils";
import { ContentContext } from "../../../context/ContentContext";
import Honeypot from "../Honeypot/Honeypot";

export type MobileFormData = {
  mobileNumber?: string;
  landlineNumber?: string;
};

interface MobileNumberFormProps extends FormBaseProps {
  initialStateData: MobileFormData;
  onDataChange: (data: MobileFormData) => void;
}

function MobileNumberForm(props: MobileNumberFormProps) {
  const { content } = useContext(ContentContext);
  const {
    onDataChange,
    initialStateData,
    nextButtonText,
    hideInfo,
    hideHeader,
    showCancelButton,
    onCancel,
    instructionText,
  } = props;
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
      mobileNumber: initialStateData.mobileNumber,
      landlineNumber: initialStateData.landlineNumber,
    },
  });

  const phoneNumberRegEx =
    // eslint-disable-next-line no-useless-escape
    /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/;

  const onDataChangePreProcessing = (data: any) => {
    onDataChange({
      mobileNumber: data.mobileNumber || "",
      landlineNumber: data.landlineNumber || "",
    });
  };

  useEffect(() => {
    if (document.getElementsByClassName("nhsuk-error-message")[0]) {
      Utils.FocusOnError();
    }
  }, [isSubmitting]);

  return (
    <>
      <DTEHeaderCaption contentKey="register2-phone-header-caption" />
      {!hideHeader && (
        <DTEHeader as="h1" $variant={headerVariant}>
          {content["register2-phone-header"]}
        </DTEHeader>
      )}
      {instructionText || content["register2-phone-instruction-text"]}
      <ErrorMessageSummary renderSummary={!isSubmitting} errors={formErrors} />
      <form onSubmit={handleSubmit(onDataChangePreProcessing)}>
        <Honeypot />
        <Controller
          control={control}
          name="mobileNumber"
          render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
            <DTEInput
              id="mobileNumber"
              value={value}
              onValueChange={onChange}
              onValueBlur={onBlur}
              error={error?.message}
              label={content["register2-phone-input-mobile"]}
              autocomplete="tel"
              spellcheck={false}
              type="tel"
            />
          )}
          rules={{
            pattern: {
              value: phoneNumberRegEx,
              message: content["register2-phone-validation-mobile-invalid"],
            },
          }}
        />
        <Controller
          control={control}
          name="landlineNumber"
          render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
            <DTEInput
              id="landlineNumber"
              value={value}
              onValueChange={onChange}
              onValueBlur={onBlur}
              error={error?.message}
              label={content["register2-phone-input-landline"]}
              autocomplete="tel"
              spellcheck={false}
              type="tel"
            />
          )}
          rules={{
            pattern: {
              value: phoneNumberRegEx,
              message: content["register2-phone-validation-landline-invalid"],
            },
          }}
        />

        {!hideInfo && content["register2-phone"]}
        <FormNavigationButtons
          nextButtonText={nextButtonText || content["reusable-button-continue"]}
          showCancelButton={showCancelButton || false}
          cancelButtonText={content["reusable-cancel"]}
          onCancel={onCancel}
        />
      </form>
    </>
  );
}

export default MobileNumberForm;
