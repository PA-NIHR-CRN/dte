import { Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import DTEHeader from "../UI/DTETypography/DTEHeader/DTEHeader";
import FormBaseProps from "./FormBaseProps";
import PostcodeLookup, {
  PostcodeLookupData,
} from "./AddressFormComponents/PostcodeLookup";
import ManualEntry, {
  ManualEntryData,
} from "./AddressFormComponents/ManualEntry";
import SelectAddress, {
  SelectAddressData,
} from "./AddressFormComponents/SelectAddress";

type address = {
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  addressLine4: string;
  town: string;
};

export type AddressFormData = {
  address: address;
  postcode: string;
  manualEntry?: boolean;
};

type AddressFormState = {
  postcodeLookupData: PostcodeLookupData;
  manualEntryData: ManualEntryData;
  selectAddressData: SelectAddressData;
};

interface AddressFormProps extends FormBaseProps {
  initialStateData: AddressFormData;
  onDataChange: (data: AddressFormData) => void;
}

function AddressForm(props: AddressFormProps) {
  const {
    onDataChange,
    initialStateData,
    hideHeader,
    nextButtonText,
    showCancelButton,
    instructionText,
    onCancel,
    hideInfo,
  } = props;
  const theme = useTheme();
  const headerVariant = useMediaQuery(theme.breakpoints.down("xs"))
    ? "h2"
    : "h1";
  const [formStage, setFormStage] = useState("postcodeLookup");

  const [addressData, setAddressData] = useState<AddressFormState>({
    postcodeLookupData: {
      addresses: [],
      postcode: initialStateData.postcode,
    },
    manualEntryData: initialStateData.manualEntry
      ? {
          addressLine1: initialStateData.address.addressLine1,
          addressLine2: initialStateData.address.addressLine2,
          addressLine3: initialStateData.address.addressLine3,
          addressLine4: initialStateData.address.addressLine4,
          town: initialStateData.address.town,
          postcode: initialStateData.postcode,
        }
      : {
          addressLine1: "",
          addressLine2: "",
          addressLine3: "",
          addressLine4: "",
          town: "",
          postcode: "",
        },
    selectAddressData: {
      address: {
        addressLine1: "",
        addressLine2: "",
        addressLine3: "",
        addressLine4: "",
        town: "",
        fullAddress: "",
        postcode: "",
      },
    },
  });

  const handleDataChange = (
    data: PostcodeLookupData | ManualEntryData | SelectAddressData,
    stage: string,
  ) => {
    setAddressData((oldData: AddressFormState) => {
      switch (stage) {
        case "postcodeLookupData":
          if ((data as PostcodeLookupData).manualEntry) {
            setFormStage("manualEntry");
            return { ...oldData };
          }
          if ((data as PostcodeLookupData).addresses.length === 1) {
            return { ...oldData };
          }
          setFormStage("selectAddress");
          return {
            ...oldData,
            postcodeLookupData: data as PostcodeLookupData,
          };
        case "manualEntryData":
          if ((data as ManualEntryData).postcodeLookup) {
            setFormStage("postcodeLookup");
            return { ...oldData };
          }
          return {
            ...oldData,
            manualEntryData: data as ManualEntryData,
          };
        case "selectAddressData":
          if ((data as SelectAddressData).manualEntry) {
            setFormStage("manualEntry");
            return { ...oldData };
          }
          if ((data as SelectAddressData).changePostcode) {
            setFormStage("postcodeLookup");
            return { ...oldData };
          }
          return {
            ...oldData,
            selectAddressData: data as SelectAddressData,
          };
        default:
          return { ...oldData };
      }
    });
    if (stage === "manualEntryData" && (data as ManualEntryData).addressLine1) {
      onDataChange({
        address: {
          addressLine1: (data as ManualEntryData).addressLine1,
          addressLine2: (data as ManualEntryData).addressLine2,
          addressLine3: (data as ManualEntryData).addressLine3,
          addressLine4: (data as ManualEntryData).addressLine4,
          town: (data as ManualEntryData).town,
        },
        postcode: (data as ManualEntryData).postcode,
        manualEntry: true,
      });
    } else if (
      stage === "selectAddressData" &&
      (data as SelectAddressData).address.addressLine1
    ) {
      onDataChange({
        address: {
          addressLine1: (data as SelectAddressData).address.addressLine1,
          addressLine2: (data as SelectAddressData).address.addressLine2,
          addressLine3: (data as SelectAddressData).address.addressLine3,
          addressLine4: (data as SelectAddressData).address.addressLine4,
          town: (data as SelectAddressData).address.town,
        },
        postcode: (data as SelectAddressData).address.postcode || "",
        manualEntry: false,
      });
    }
  };

  useEffect(() => {
    if (initialStateData.manualEntry) setFormStage("manualEntry");
  }, [initialStateData.manualEntry]);

  return (
    <>
      {!hideHeader && (
        <DTEHeader as="h1" $variant={headerVariant}>
          What is your home address?
        </DTEHeader>
      )}
      {instructionText}
      <Grid container>
        <Grid item xs={12} sm={10} md={8} lg={7} xl={6}>
          {formStage === "postcodeLookup" && (
            <PostcodeLookup
              onDataChange={(data: PostcodeLookupData) =>
                handleDataChange(data, "postcodeLookupData")
              }
              initialStateData={addressData.postcodeLookupData}
              showCancelButton={showCancelButton}
              onCancel={onCancel}
              hideInfo={hideInfo}
            />
          )}
          {formStage === "selectAddress" && (
            <SelectAddress
              onDataChange={(data: SelectAddressData) =>
                handleDataChange(data, "selectAddressData")
              }
              addresses={addressData.postcodeLookupData.addresses}
              postcode={addressData.postcodeLookupData.postcode}
              nextButtonText={nextButtonText}
              showCancelButton={showCancelButton}
              onCancel={onCancel}
              hideInfo={hideInfo}
            />
          )}
          {formStage === "manualEntry" && (
            <ManualEntry
              onDataChange={(data: ManualEntryData) =>
                handleDataChange(data, "manualEntryData")
              }
              initialStateData={addressData.manualEntryData}
              nextButtonText={nextButtonText}
              showCancelButton={showCancelButton}
              onCancel={onCancel}
              hideInfo={hideInfo}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default AddressForm;
