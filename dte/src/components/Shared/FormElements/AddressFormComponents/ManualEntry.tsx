import { Grid } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import Utils from "../../../../Helper/Utils";
import ErrorMessageSummary from "../../ErrorMessageSummary/ErrorMessageSummary";
import DTEInput from "../../UI/DTEInput/DTEInput";
import DTELinkButton from "../../UI/DTELinkButton/DTELinkButton";
import { Details, ContinueButton } from "./PostcodeLookup";

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

const ManualEntry = (props: ManualEntryProps) => {
  const {
    initialStateData,
    onDataChange,
    nextButtonText,
    hideInfo,
    showCancelButton,
    onCancel,
  } = props;
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

  return (
    <>
      <ErrorMessageSummary renderSummary={!isSubmitting} errors={formErrors} />{" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="addressLine1"
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <DTEInput
              id="addressLine1"
              label="Address line 1"
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
              return "Enter the first line of your address";
            },
          }}
        />
        <Controller
          control={control}
          name="addressLine2"
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <DTEInput
              id="addressLine2"
              label="Address line 2 (optional)"
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
              label="Address line 3 (optional)"
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
              label="Address line 4 (optional)"
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
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <DTEInput
              id="town"
              label="Town"
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
              return "Enter the town of your address";
            },
          }}
        />
        <Controller
          control={control}
          name="postcode"
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <DTEInput
              id="postcode"
              value={value}
              onValueChange={onChange}
              onValueBlur={onBlur}
              error={error?.message}
              label="Postcode (optional)"
              autocomplete="postal-code"
            />
          )}
          rules={{
            validate: (value) => {
              const cleaned = value.replace(/[^A-Za-z0-9]/g, "");
              if (
                cleaned.match(
                  /^$|([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})$/
                )
              ) {
                return true;
              }
              return "Enter a real postcode";
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
              Find your address by postcode
            </DTELinkButton>
          </Grid>
          <Grid item>{!hideInfo && <Details />}</Grid>
        </Grid>
        <ContinueButton
          buttonText="Continue"
          altButtonText={nextButtonText}
          showCancelButton={showCancelButton}
          onCancel={onCancel}
        />
      </form>
    </>
  );
};

export default ManualEntry;
