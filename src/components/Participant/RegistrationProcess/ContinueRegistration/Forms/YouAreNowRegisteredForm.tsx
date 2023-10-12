import { useContext, useEffect } from "react";
import { ContinueRegistrationState } from "../../../../../types/ParticipantTypes";
import useAxiosFetch from "../../../../../hooks/useAxiosFetch";
import ErrorMessageContainer from "../../../../Shared/ErrorMessageContainer/ErrorMessageContainer";
import Utils from "../../../../../Helper/Utils";
import DTEHeader from "../../../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import { AuthContext } from "../../../../../context/AuthContext";
import { ContentContext } from "../../../../../context/ContentContext";

interface YouAreNowRegisteredFormProps {
  data: ContinueRegistrationState;
  setLoading: (loading: boolean) => void;
  setLoadingText: (text: string) => void;
  setPrevRegistrationData: (text: string) => void;
}
function YouAreNowRegisteredForm(props: YouAreNowRegisteredFormProps) {
  const { content } = useContext(ContentContext);
  const { isInNHSApp } = useContext(AuthContext);
  const { data, setLoading, setLoadingText, setPrevRegistrationData } = props;

  let disability = false;
  switch (data.disabilityFormData.disability) {
    case "yes":
      disability = true;
      break;
    case "no":
      disability = false;
      break;
    default:
      break;
  }

  let gender = false;
  switch (data.sexFormData.genderAtBirth) {
    case "yes":
      gender = true;
      break;
    case "no":
      gender = false;
      break;
    default:
      break;
  }

  const [{ response, loading, error }] = useAxiosFetch(
    {
      url: `${process.env.REACT_APP_BASE_API}/participants/demographics`,
      method: "POST",
      data: {
        mobileNumber: data.mobileFormData.mobileNumber || null,
        landlineNumber: data.mobileFormData.landlineNumber || null,
        address: {
          addressLine1: data.addressFormData.address.addressLine1,
          addressLine2: data.addressFormData.address.addressLine2,
          addressLine3: data.addressFormData.address.addressLine3,
          addressLine4: data.addressFormData.address.addressLine4,
          town: data.addressFormData.address.town,
          postcode: data.addressFormData.postcode,
        },
        sexRegisteredAtBirth: data.sexFormData.sexAtBirth,
        genderIsSameAsSexRegisteredAtBirth: data.sexFormData.genderAtBirth === "noSay" ? null : gender,
        ethnicGroup: data.ethnicity1FormData.ethnicity,
        ethnicBackground: data.ethnicity2FormData.background,
        disability,
        disabilityDescription: disability ? data.disability2FormData.disabilityDescription : null,
        healthConditionInterests: data.healthConditionFormData.conditions,
      },
    },
    { useCache: false }
  );

  useEffect(() => {
    setLoadingText(content["reusable-loading-registering"]);
    setLoading(loading || false);
  }, [setLoading, setLoadingText, loading]);

  useEffect(() => {
    if (Utils.ConvertResponseToDTEResponse(response)?.isSuccess) {
      setPrevRegistrationData("");
    }
  }, [response]);

  return (
    <>
      {error && (
        <ErrorMessageContainer
          axiosErrors={[error]}
          DTEAxiosErrors={[Utils.ConvertResponseToDTEResponse(response)?.errors]}
        />
      )}
      {Utils.ConvertResponseToDTEResponse(response)?.isSuccess && (
        <>
          <DTEHeader as="h1">{content["registered-thanks-header"]}</DTEHeader>
          {isInNHSApp ? content["registered-thanks-page-nhs"] : content["registered-thanks-page"]}
        </>
      )}
    </>
  );
}

export default YouAreNowRegisteredForm;
