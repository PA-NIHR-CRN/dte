import { Grid } from "@material-ui/core";
import { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Utils from "../../../../Helper/Utils";
import ErrorMessageSummary from "../../ErrorMessageSummary/ErrorMessageSummary";
import DTEInput from "../../UI/DTEInput/DTEInput";
import DTELinkButton from "../../UI/DTELinkButton/DTELinkButton";
import { ContinueButton } from "./PostcodeLookup";
import { ContentContext } from "../../../../context/ContentContext";
import Honeypot from "../../Honeypot/Honeypot";

export type ManualEntryData = {
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  addressLine4: string;
  town: string;
  postcode: string;
  postcodeLookup?: boolean;
};

interface ManualEntryProps {
  initialStateData: ManualEntryData;
  nextButtonText?: string;
  hideInfo?: boolean;
  showCancelButton?: boolean;
  onCancel?: () => void;
  onDataChange: (data: ManualEntryData) => void;
}

function ManualEntry(props: ManualEntryProps) {
  const { content } = useContext(ContentContext);
  const { initialStateData, onDataChange, nextButtonText, hideInfo, showCancelButton, onCancel } = props;
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      addressLine1: initialStateData.addressLine1,
      addressLine2: initialStateData.addressLine2,
      addressLine3: initialStateData.addressLine3,
      addressLine4: initialStateData.addressLine4,
      town: initialStateData.town,
      postcode: initialStateData.postcode,
    },
  });

  const onSubmit = (data: ManualEntryData) => {
    return onDataChange(Utils.TrimFormDataFields(data) as ManualEntryData);
  };

  useEffect(() => {
    if (document.getElementsByClassName("nhsuk-error-message")[0]) {
      Utils.FocusOnError();
    }
  }, [isSubmitting]);

  return (
    <>
      <ErrorMessageSummary renderSummary={!isSubmitting} errors={formErrors} />{" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Honeypot />
        <Controller
          control={control}
          name="addressLine1"
          render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
            <DTEInput
              id="addressLine1"
              label={content["register2-address-input-address1"]}
              onValueChange={onChange}
              onValueBlur={onBlur}
              error={error?.message}
              value={value}
              autocomplete="address-line1"
            />
          )}
          rules={{
            validate: (value) => {
              if (value && value.trim()) {
                return true;
              }
              setValue("addressLine1", "");
              return content["register2-address-validation-address1-required"];
            },
          }}
        />
        <Controller
          control={control}
          name="addressLine2"
          render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
            <DTEInput
              id="addressLine2"
              label={content["register2-address-input-address2"]}
              onValueChange={onChange}
              onValueBlur={onBlur}
              error={error?.message}
              value={value}
              autocomplete="address-line2"
            />
          )}
        />
        <Controller
          control={control}
          name="addressLine3"
          render={({ field: { value, onChange, onBlur } }) => (
            <DTEInput
              id="addressLine3"
              label={content["register2-address-input-address3"]}
              onValueChange={onChange}
              onValueBlur={onBlur}
              value={value}
              autocomplete="address-line3"
            />
          )}
        />
        <Controller
          control={control}
          name="addressLine4"
          render={({ field: { value, onChange, onBlur } }) => (
            <DTEInput
              id="addressLine4"
              label={content["register2-address-input-address4"]}
              onValueChange={onChange}
              onValueBlur={onBlur}
              value={value}
              autocomplete="address-level4"
            />
          )}
        />
        <Controller
          control={control}
          name="town"
          render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
            <DTEInput
              id="town"
              label={content["register2-address-input-town"]}
              onValueChange={onChange}
              onValueBlur={onBlur}
              error={error?.message}
              value={value}
              autocomplete="address-level1"
            />
          )}
          rules={{
            validate: (value) => {
              if (value && value.trim()) {
                return true;
              }
              setValue("town", "");
              return content["register2-address-validation-town-required"];
            },
          }}
        />
        <Controller
          control={control}
          name="postcode"
          render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
            <DTEInput
              id="postcode"
              value={value}
              onValueChange={onChange}
              onValueBlur={onBlur}
              error={error?.message}
              label={content["register2-address-input-postcode"]}
              autocomplete="postal-code"
            />
          )}
          rules={{
            validate: (value) => {
              const cleaned = value.replace(/[^A-Za-z0-9]/g, "");
              if (value.trim() === "") {
                return "Enter your postcode";
              }
              if (
                cleaned.match(
                  /^$|([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})$/
                )
              ) {
                return true;
              }
              return content["register2-address-validation-postcode-invalid"];
            },
          }}
        />
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <DTELinkButton
              onClick={() =>
                onDataChange({
                  addressLine1: "",
                  addressLine2: "",
                  addressLine3: "",
                  addressLine4: "",
                  town: "",
                  postcode: "",
                  postcodeLookup: true,
                })
              }
            >
              {content["register2-address-button-find-by-postcode"]}
            </DTELinkButton>
          </Grid>
          <Grid item>{!hideInfo && content["register2-address"]}</Grid>
        </Grid>
        <ContinueButton
          buttonText={content["reusable-button-continue"]}
          altButtonText={nextButtonText}
          showCancelButton={showCancelButton}
          onCancel={onCancel}
        />
      </form>
    </>
  );
}

export default ManualEntry;
