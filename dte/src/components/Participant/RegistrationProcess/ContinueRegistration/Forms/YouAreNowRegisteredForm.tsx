import { useEffect } from "react";
import styled from "styled-components";
import { ContinueRegistrationState } from "../../../../../types/ParticipantTypes";
import useAxiosFetch from "../../../../../hooks/useAxiosFetch";
import ErrorMessageContainer from "../../../../Shared/ErrorMessageContainer/ErrorMessageContainer";
import Utils from "../../../../../Helper/Utils";
import DTEHeader from "../../../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../../../Shared/UI/DTETypography/DTEContent/DTEContent";
import DTERouteLink from "../../../../Shared/UI/DTERouteLink/DTERouteLink";
import DTEHR from "../../../../Shared/UI/DTEHR/DTEHR";

interface YouAreNowRegisteredFormProps {
  data: ContinueRegistrationState;
  setLoading: (loading: boolean) => void;
  setLoadingText: (text: string) => void;
}
const YouAreNowRegisteredForm = (props: YouAreNowRegisteredFormProps) => {
  const { data, setLoading, setLoadingText } = props;

  const StyledDTEHR = styled(DTEHR)`
    margin-top: 2.5em;
  `;

  const dob = new Date(
    parseInt(data.dobFormData.year, 10),
    parseInt(data.dobFormData.month, 10) - 1,
    parseInt(data.dobFormData.day, 10),
    12
  ).toISOString();

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
  switch (data.genderFormData.genderAtBirth) {
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
        dateOfBirth: dob,
        sexRegisteredAtBirth: data.sexFormData.sexAtBirth,
        genderIsSameAsSexRegisteredAtBirth:
          data.genderFormData.genderAtBirth === "noSay" ? null : gender,
        ethnicGroup: data.ethnicity1FormData.ethnicity,
        ethnicBackground: data.ethnicity2FormData.background,
        disability,
        disabilityDescription: disability
          ? data.disability2FormData.disabilityDescription
          : null,
        healthConditionInterests: data.healthConditionFormData.conditions,
      },
    },
    { useCache: false }
  );

  useEffect(() => {
    setLoadingText("Registering Account...");
    setLoading(loading || false);
  }, [setLoading, setLoadingText, loading]);

  return (
    <>
      {error && (
        <>
          <ErrorMessageContainer
            axiosErrors={[error]}
            DTEAxiosErrors={[
              Utils.ConvertResponseToDTEResponse(response)?.errors,
            ]}
          />
        </>
      )}
      {Utils.ConvertResponseToDTEResponse(response)?.isSuccess && (
        <>
          <DTEHeader as="h1">
            Thank you for registering with Be Part of Research
          </DTEHeader>
          <DTEContent>
            We&apos;ll keep in touch with you about opportunities to take part
            in studies based on the information you have provided.
          </DTEContent>
          <DTEContent>
            You may hear from us in weeks or months or it may be longer
            depending on the areas of research you&apos;ve chosen.
          </DTEContent>
          <DTEContent>From your account page you can:</DTEContent>
          <ul>
            <li>update your details</li>
            <li>delete your account</li>
          </ul>
          <DTERouteLink to="/">Go to my account</DTERouteLink>
          <StyledDTEHR />
          <DTEContent>
            Our newsletter covers a range of interesting news and opportunities
            about research from around the UK, stay up to date by signing up
            today!
          </DTEContent>
          <DTERouteLink
            to="https://nihr.us14.list-manage.com/subscribe?u=299dc02111e8a68172029095f&id=3b030a1027"
            external
            aria-label="Sign up to our newsletter"
            target="_blank"
          >
            Sign up now
          </DTERouteLink>
          <StyledDTEHR />
          <DTEContent>
            You can find more information about{" "}
            <DTERouteLink
              to="https://bepartofresearch.nihr.ac.uk/taking-part/How-to-take-part/?utm_source=vs-website&utm_medium=referral&utm_campaign=vs-registration-complete"
              renderStyle="standard"
              target="_blank"
              external
            >
              taking part in research
            </DTERouteLink>{" "}
            by visiting our main website.
          </DTEContent>
          <DTEContent>
            You can also search for research opportunities near you, hear about
            the latest health and care discoveries and much more on{" "}
            <DTERouteLink
              to="https://bepartofresearch.nihr.ac.uk/?utm_source=vs-website&utm_medium=referral&utm_campaign=vs-registration-complete"
              renderStyle="standard"
              target="_blank"
              external
            >
              Be Part of Research.
            </DTERouteLink>
          </DTEContent>
        </>
      )}
    </>
  );
};

export default YouAreNowRegisteredForm;
