import { useContext, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import DTEContent from "../../UI/DTETypography/DTEContent/DTEContent";
import DTELinkButton from "../../UI/DTELinkButton/DTELinkButton";
import DTESelect from "../../UI/DTESelect/DTESelect";
import { Details, ContinueButton } from "./PostcodeLookup";
import Utils from "../../../../Helper/Utils";
import { ContentContext } from "../../../../context/ContentContext";
import Honeypot from "../../Honeypot/Honeypot";

type address = {
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  addressLine4: string;
  town: string;
  postcode?: string;
  fullAddress: string;
};

export type SelectAddressData = {
  address: address;
  manualEntry?: boolean;
  changePostcode?: boolean;
};

interface SelectAddressProps {
  addresses: address[];
  postcode: string;
  nextButtonText?: string;
  hideInfo?: boolean;
  showCancelButton?: boolean;
  onCancel?: () => void;
  onDataChange: (data: SelectAddressData) => void;
}

function SelectAddress(props: SelectAddressProps) {
  const { content } = useContext(ContentContext);
  const { onDataChange, addresses, postcode, nextButtonText, hideInfo, showCancelButton, onCancel } = props;
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      postcode,
      address: 0,
    },
  });

  const hijackOnDataChange = (data: { postcode?: string; address?: number }) => {
    if (addresses && data.address) {
      onDataChange({
        address: addresses[data.address],
      });
    }
  };

  useEffect(() => {
    if (document.getElementsByClassName("nhsuk-error-message")[0]) {
      Utils.FocusOnError();
    }
  }, [isSubmitting]);

  return (
    <>
      <Grid container spacing={2} justifyContent="flex-start" alignItems="center">
        <Grid item>
          <DTEContent>Postcode</DTEContent>
          <DTEContent>
            <b>{postcode}</b>
          </DTEContent>
        </Grid>
        <Grid item>
          <DTEContent>
            <br />
          </DTEContent>
          <DTELinkButton
            onClick={() => {
              onDataChange({
                address: {
                  addressLine1: "",
                  addressLine2: "",
                  addressLine3: "",
                  addressLine4: "",
                  town: "",
                  fullAddress: "",
                  postcode: "",
                },
                changePostcode: true,
              });
            }}
            ariaLabel="Change the postcode entered"
          >
            Change
          </DTELinkButton>
        </Grid>
      </Grid>
      <form onSubmit={handleSubmit(hijackOnDataChange)}>
        <Honeypot />
        <Controller
          control={control}
          name="address"
          defaultValue={0}
          render={({ field: { onChange }, fieldState: { error } }) => (
            <DTESelect
              id="select-address"
              name="select-address"
              label="Select your address"
              error={error?.message}
              required={false}
              options={[
                ...addresses.map((data: address, index: number) => {
                  return {
                    value: index,
                    text: data.fullAddress,
                  };
                }),
              ]}
              onValueChange={onChange}
            />
          )}
          rules={{
            validate: (value) => {
              if (addresses[value].addressLine1 === "") {
                return "Select your address or enter your address manually";
              }
              return true;
            },
          }}
        />
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <DTELinkButton
              onClick={() =>
                onDataChange({
                  address: {
                    addressLine1: "",
                    addressLine2: "",
                    addressLine3: "",
                    addressLine4: "",
                    town: "",
                    fullAddress: "",
                    postcode: "",
                  },
                  manualEntry: true,
                })
              }
            >
              Enter your address manually
            </DTELinkButton>
          </Grid>
          <Grid item>{!hideInfo && <Details />}</Grid>
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

export default SelectAddress;
