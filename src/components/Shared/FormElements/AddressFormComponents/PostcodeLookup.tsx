import { Grid } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Utils from "../../../../Helper/Utils";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";
import ErrorMessageContainer from "../../ErrorMessageContainer/ErrorMessageContainer";
import LoadingIndicator from "../../LoadingIndicator/LoadingIndicator";
import DTEButton from "../../UI/DTEButton/DTEButton";
import DTEInput from "../../UI/DTEInput/DTEInput";
import DTELinkButton from "../../UI/DTELinkButton/DTELinkButton";
import ErrorMessageSummary from "../../ErrorMessageSummary/ErrorMessageSummary";
import Honeypot from "../../Honeypot/Honeypot";
import { Address } from "../../../../types/ParticipantTypes";
import { ContentContext } from "../../../../context/ContentContext";

export type PostcodeLookupData = {
  postcode: string;
  addresses: Address[];
  manualEntry?: boolean;
};

interface PostcodeLookupProps {
  initialStateData: PostcodeLookupData;
  showCancelButton?: boolean;
  hideInfo?: boolean;
  onCancel?: () => void;
  onDataChange: (data: PostcodeLookupData) => void;
}

interface ContinueButtonProps {
  buttonText: string;
  altButtonText?: string;
  showCancelButton?: boolean;
  onCancel?: () => void;
}

export function ContinueButton(props: ContinueButtonProps) {
  const { buttonText, altButtonText, showCancelButton, onCancel } = props;

  const { content } = useContext(ContentContext);

  return (
    <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
      <Grid item>
        <DTEButton>{altButtonText || buttonText}</DTEButton>
      </Grid>
      {showCancelButton && onCancel && (
        <Grid item>
          <DTELinkButton type="button" padded onClick={() => onCancel()}>
            {content["reusable-cancel"]}
          </DTELinkButton>
        </Grid>
      )}
    </Grid>
  );
}

function PostcodeLookup(props: PostcodeLookupProps) {
  const { initialStateData, showCancelButton, hideInfo, onCancel, onDataChange } = props;

  const { content } = useContext(ContentContext);

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      postcode: initialStateData.postcode,
      addresses: initialStateData.addresses,
    },
  });

  const [addresses, setAddresses] = useState<Address[]>();
  const [postcode, setPostcode] = useState("");

  const [{ response, loading }, getAddresses] = useAxiosFetch({});

  const onPostcodeSubmit = async (formData: PostcodeLookupData) => {
    await getAddresses(
      {
        url: `${process.env.REACT_APP_BASE_API}/location/postcode/${formData.postcode.replace(/[^A-Za-z0-9]/g, "")}`,
        method: "GET",
      },
      {
        manual: true,
      }
    ).catch(() => {
      // swallow 404 axios error -
    });
    setPostcode(
      formData.postcode
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "")
        .replace(/[A-Z0-9]{3}$/, " $&")
    );
  };

  useEffect(() => {
    if (response && Utils.ConvertResponseToDTEResponse(response)?.isSuccess) {
      const addresses = Utils.ConvertResponseToDTEResponse(response)?.content;
      setAddresses([
        {
          addressLine1: "",
          addressLine2: "",
          addressLine3: "",
          addressLine4: "",
          town: "",
          fullAddress: `${addresses.length} ${
            addresses.length === 1
              ? content["register2-address-address-found"]
              : content["register2-address-addresses-found"]
          }`,
          postcode: "",
        },
        ...content.map((addressFromApi: Address) => {
          return {
            addressLine1: addressFromApi.addressLine1,
            addressLine2: addressFromApi.addressLine2,
            addressLine3: addressFromApi.addressLine3,
            addressLine4: addressFromApi.addressLine4,
            town: addressFromApi.town,
            fullAddress: addressFromApi.fullAddress,
            postcode: addressFromApi.postcode,
          };
        }),
      ]);
    }
  }, [response]);

  useEffect(() => {
    if (addresses) onDataChange({ postcode, addresses });
  }, [addresses]);

  useEffect(() => {
    if (document.getElementsByClassName("nhsuk-error-message")[0]) {
      Utils.FocusOnError();
    }
  }, [isSubmitting]);

  return (
    <>
      <ErrorMessageSummary renderSummary={!isSubmitting} errors={formErrors} />
      {response && (!Utils.ConvertResponseToDTEResponse(response)?.isSuccess || addresses?.length === 1) && (
        <ErrorMessageContainer
          simpleErrors={[
            {
              detail: content["register2-address-no-address-found"],
            },
          ]}
        />
      )}
      {loading && <LoadingIndicator text={content["register2-address-loading-addresses"]} />}
      <form onSubmit={handleSubmit(onPostcodeSubmit)}>
        <Honeypot />
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
              label={content["reusable-postcode"]}
              autocomplete="postal-code"
            />
          )}
          rules={{
            required: { value: true, message: content["register2-address-validation-postcode-required"] },
            validate: (value) => {
              const cleaned = value.replace(/[^A-Za-z0-9]/g, "");
              if (
                cleaned.match(
                  /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})$/
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
            <ContinueButton
              buttonText={content["register2-address-button-find"]}
              showCancelButton={showCancelButton}
              onCancel={onCancel}
            />
          </Grid>
          <Grid item>
            <DTELinkButton onClick={() => onDataChange({ postcode: "", addresses: [], manualEntry: true })}>
              {content["register2-address-button-enter-manually"]}
            </DTELinkButton>
          </Grid>
          <Grid item>{!hideInfo && content["register2-address"]}</Grid>
        </Grid>
      </form>
    </>
  );
}

export default PostcodeLookup;
