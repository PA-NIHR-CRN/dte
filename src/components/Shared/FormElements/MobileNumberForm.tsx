import { useEffect } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Controller, useForm } from "react-hook-form";
import DTEInput from "../UI/DTEInput/DTEInput";
import DTEDetails from "../UI/DTEDetails/DTEDetails";
import DTEHeader from "../UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../UI/DTETypography/DTEContent/DTEContent";
import FormBaseProps from "./FormBaseProps";
import FormNavigationButtons from "./CommonElements/FormNavigationButtons";
import ErrorMessageSummary from "../ErrorMessageSummary/ErrorMessageSummary";
import Utils from "../../../Helper/Utils";

export type MobileFormData = {
  mobileNumber?: string;
  landlineNumber?: string;
};

interface MobileNumberFormProps extends FormBaseProps {
  initialStateData: MobileFormData;
  onDataChange: (data: MobileFormData) => void;
}

function MobileNumberForm(props: MobileNumberFormProps) {
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
      {!hideHeader && (
        <DTEHeader as="h1" $variant={headerVariant}>
          What is your phone number? (optional)
        </DTEHeader>
      )}
      {instructionText || (
        <DTEContent>
          You may provide either a mobile or a landline number if you choose.
        </DTEContent>
      )}
      <ErrorMessageSummary renderSummary={!isSubmitting} errors={formErrors} />
      <form onSubmit={handleSubmit(onDataChangePreProcessing)}>
        <Controller
          control={control}
          name="mobileNumber"
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <DTEInput
              id="mobileNumber"
              value={value}
              onValueChange={onChange}
              onValueBlur={onBlur}
              error={error?.message}
              label="Mobile number"
              autocomplete="tel"
              spellcheck={false}
              type="tel"
            />
          )}
          rules={{
            pattern: {
              value: phoneNumberRegEx,
              message:
                "Enter a valid mobile number, like 07700 900 982 or +44 7700 900 982",
            },
          }}
        />
        <Controller
          control={control}
          name="landlineNumber"
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <DTEInput
              id="landlineNumber"
              value={value}
              onValueChange={onChange}
              onValueBlur={onBlur}
              error={error?.message}
              label="Landline number"
              autocomplete="tel"
              spellcheck={false}
              type="tel"
            />
          )}
          rules={{
            pattern: {
              value: phoneNumberRegEx,
              message:
                "Enter a valid landline number, like 01632 960 001 or +44 1632 960 001",
            },
          }}
        />

        {!hideInfo && (
          <DTEDetails summary="Why we are asking this question">
            <DTEContent>
              Study teams may need to have a contact phone number for
              volunteers.
            </DTEContent>
            <DTEContent>
              Some studies will offer text messages as a way to contact
              volunteers, they will need your mobile number if you choose for
              them to contact you in this way.
            </DTEContent>
          </DTEDetails>
        )}
        <FormNavigationButtons
          nextButtonText={nextButtonText || "Continue"}
          showCancelButton={showCancelButton || false}
          onCancel={onCancel}
        />
      </form>
    </>
  );
}

export default MobileNumberForm;
