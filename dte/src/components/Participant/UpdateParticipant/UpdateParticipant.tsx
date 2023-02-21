import React, {
  ReactNode,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import ReactGA from "react-ga";
import styled from "styled-components";
import DocumentTitle from "react-document-title";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { AuthContext } from "../../../context/AuthContext";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import ErrorMessageContainer from "../../Shared/ErrorMessageContainer/ErrorMessageContainer";
import LoadingIndicator from "../../Shared/LoadingIndicator/LoadingIndicator";
import Container from "../../Shared/Container/Container";
import DTEBackLink from "../../Shared/UI/DTEBackLink/DTEBackLink";
import DTELinkButton from "../../Shared/UI/DTELinkButton/DTELinkButton";
import DTEContent from "../../Shared/UI/DTETypography/DTEContent/DTEContent";
import DTEHeader from "../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import AddressForm, {
  AddressFormData,
} from "../../Shared/FormElements/AddressForm";
import DisabilityForm, {
  DisabilityFormData,
} from "../../Shared/FormElements/DisabilityForm";
import DOBForm, { DOBFormData } from "../../Shared/FormElements/DOBForm";
import Ethnicity1Form, {
  Ethnicity1FormData,
} from "../../Shared/FormElements/EthnicityFormComponents/Ethnicity1Form";
import Ethnicity2Form, {
  Ethnicity2FormData,
} from "../../Shared/FormElements/EthnicityFormComponents/Ethnicity2Form";
import GenderForm, {
  GenderFormData,
} from "../../Shared/FormElements/GenderForm";
import { HealthConditionFormData } from "../../Shared/FormElements/HealthConditionForm";
import MobileNumberForm, {
  MobileFormData,
} from "../../Shared/FormElements/MobileNumberForm";
import SexForm, { SexFormData } from "../../Shared/FormElements/SexForm";
import NameForm, { NameFormData } from "../../Shared/FormElements/NameForm";
import Utils from "../../../Helper/Utils";
import Disability2Form, {
  Disability2FormData,
} from "../../Shared/FormElements/Disability2Form";
import { Ethnicities } from "../../../types/ReferenceData/Ethnicities";

interface UserDataState {
  address: AddressFormData;
  mobile: MobileFormData;
  name: NameFormData;
  dob: DOBFormData;
  disability: DisabilityFormData;
  disabilityDescription: Disability2FormData;
  sex: SexFormData;
  ethnicity1: Ethnicity1FormData;
  ethnicity2: Ethnicity2FormData;
  gender: GenderFormData;
  healthConditions: HealthConditionFormData;
}

const StyledWrapper = styled.div`
  scroll-margin-top: 10em;
`;

const StyledHiddenText = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  border: 0;
  white-space: nowrap;
`;

const UpdateParticipant = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState<string>("main");
  const [pageTitle, setPageTitle] = useState(
    "Personal details - Volunteer Account - Be Part of Research"
  );
  const [gaURL, setGaURL] = useState("/MyAccount/PersonalDetails");
  const [userData, setUserData] = React.useState<UserDataState>();
  const [cancelData, setCancelData] = React.useState<UserDataState>();
  const { authenticatedUserId } = useContext(AuthContext);
  const theme = useTheme();
  const headerVariant = useMediaQuery(theme.breakpoints.down("xs"))
    ? "h2"
    : "h1";

  const getDetailsURL = `${process.env.REACT_APP_BASE_API}/participants/${authenticatedUserId}/details`;
  const [{ response, loading, error }] = useAxiosFetch(
    {
      url: getDetailsURL,
      method: "GET",
    },
    {
      manual: false,
      useCache: false,
    }
  );

  const getDemographicsURL = `${process.env.REACT_APP_BASE_API}/participants/${authenticatedUserId}/demographics`;
  const [
    {
      response: demographicsResponse,
      loading: demographicsLoading,
      error: demographicsError,
    },
  ] = useAxiosFetch(
    {
      url: getDemographicsURL,
      method: "GET",
    },
    {
      manual: false,
      useCache: false,
    }
  );

  const [
    {
      response: ethnicityResponse,
      loading: ethnicityLoading,
      error: ethnicityError,
    },
  ] = useAxiosFetch(
    {
      url: `${process.env.REACT_APP_BASE_API}/referencedata/demographics/ethnicity`,
      method: "GET",
    },
    { useCache: true, manual: false }
  );

  const setCurrentDisplayPage = (page: string) => {
    setCurrentPage(page);
    containerRef.current?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  };

  const handlePageTitle = (page: string) => {
    switch (page) {
      case "name":
        setPageTitle(
          "What is your name? - Volunteer Account - Be Part of Research"
        );
        setGaURL("/MyAccount/PersonalDetails/name");
        break;
      case "address":
        setPageTitle(
          "What is your home address? - Volunteer Account - Be Part of Research"
        );
        setGaURL("/MyAccount/PersonalDetails/address");
        break;
      case "dob":
        setPageTitle(
          "What is your date of birth? - Volunteer Account - Be Part of Research"
        );
        setGaURL("/MyAccount/PersonalDetails/dateofbirth");
        break;
      case "mobile":
        setPageTitle(
          "What is your phone number? - Volunteer Account - Be Part of Research"
        );
        setGaURL("/MyAccount/PersonalDetails/phonenumber");
        break;
      case "sex":
        setPageTitle(
          "What is your sex? - Volunteer Account - Be Part of Research"
        );
        setGaURL("/MyAccount/PersonalDetails/sex");
        break;
      case "gender":
        setPageTitle(
          "Is the gender you identify with the same as your sex registered at birth? - Volunteer Account - Be Part of Research"
        );
        setGaURL("/MyAccount/PersonalDetails/gender");
        break;
      case "ethnicity1":
        setPageTitle(
          "What is your ethnic group? - Volunteer Account - Be Part of Research"
        );
        setGaURL("/MyAccount/PersonalDetails/ethnicgroup");
        break;
      case "ethnicity2":
        setPageTitle(
          "Which of the following best describes your ethnic background? - Volunteer Account - Be Part of Research"
        );
        setGaURL("/MyAccount/PersonalDetails/ethnicbackground");
        break;
      case "disability":
        setPageTitle(
          "Do you have any physical or mental health conditions or illness lasting or expected to last 12 months or more? - Volunteer Account - Be Part of Research"
        );
        setGaURL("/MyAccount/PersonalDetails/conditions");
        break;
      case "disability2":
        setPageTitle(
          "Do any of your conditions or illnesses reduce your ability to carry out day-to-day activities? - Volunteer Account - Be Part of Research"
        );
        setGaURL("/MyAccount/PersonalDetails/reducedability");
        break;
      default:
        setPageTitle(
          "Personal details - Volunteer Account - Be Part of Research"
        );
        setGaURL("/MyAccount/PersonalDetails");
    }
  };

  useEffect(() => {
    ReactGA.pageview(gaURL);
  }, [gaURL]);

  useEffect(() => {
    handlePageTitle(currentPage);
  }, [currentPage]);

  const formatDisplayAddress = (address: any) => {
    let formattedAddress: ReactNode = <></>;

    const lineManagement = (builder: ReactNode, newElement: string) => {
      const intialBuilder: ReactNode = `<>{newElement}</>`;
      const newLineBuilder: ReactNode = (
        <>
          {builder} <br /> {newElement}
        </>
      );
      return builder !== <></> ? newLineBuilder : intialBuilder;
    };

    if (address.address.addressLine1) {
      formattedAddress = address.address.addressLine1;
    }
    if (address.address.addressLine2) {
      formattedAddress = lineManagement(
        formattedAddress,
        address.address.addressLine2
      );
    }
    if (address.address.addressLine3) {
      formattedAddress = lineManagement(
        formattedAddress,
        address.address.addressLine3
      );
    }
    if (address.address.addressLine4) {
      formattedAddress = lineManagement(
        formattedAddress,
        address.address.addressLine4
      );
    }
    if (address.address.town) {
      formattedAddress = lineManagement(formattedAddress, address.address.town);
    }
    if (address.postcode) {
      formattedAddress = lineManagement(formattedAddress, address.postcode);
    }
    return (<DTEContent>{formattedAddress}</DTEContent>) as ReactNode;
  };

  const parseTriStateBoolean = (value: boolean, nullValue: string) => {
    if (value === null) {
      return nullValue;
    }
    return value ? "yes" : "no";
  };

  useEffect(() => {
    if (
      !userData &&
      Utils.ConvertResponseToDTEResponse(response)?.isSuccess &&
      Utils.ConvertResponseToDTEResponse(demographicsResponse)?.isSuccess
    ) {
      const DTEDetailsResponse =
        Utils.ConvertResponseToDTEResponse(response)?.content;
      const DTEDemographicsResponse =
        Utils.ConvertResponseToDTEResponse(demographicsResponse)?.content;
      if (DTEDetailsResponse && DTEDemographicsResponse) {
        const stateData: UserDataState = {
          address: {
            address: {
              addressLine1: DTEDemographicsResponse.address.addressLine1,
              addressLine2: DTEDemographicsResponse.address.addressLine2,
              addressLine3: DTEDemographicsResponse.address.addressLine3,
              addressLine4: DTEDemographicsResponse.address.addressLine4,
              town: DTEDemographicsResponse.address.town,
            },
            postcode: DTEDemographicsResponse.address.postcode,
          },
          mobile: {
            mobileNumber: DTEDemographicsResponse.mobileNumber,
            landlineNumber: DTEDemographicsResponse.landlineNumber,
          },
          name: {
            firstName: DTEDetailsResponse.firstname || "",
            lastName: DTEDetailsResponse.lastname || "",
          },
          dob: {
            day: new Date(DTEDemographicsResponse.dateOfBirth)
              .getDate()
              .toString(),
            month: (
              new Date(DTEDemographicsResponse.dateOfBirth).getMonth() + 1
            ).toString(),
            year: new Date(DTEDemographicsResponse.dateOfBirth)
              .getFullYear()
              .toString(),
          },
          disability: {
            disability: parseTriStateBoolean(
              DTEDemographicsResponse.disability,
              "notSaying"
            ),
          },
          disabilityDescription: {
            disability: parseTriStateBoolean(
              DTEDemographicsResponse.disability,
              "notSaying"
            ),
            disabilityDescription:
              DTEDemographicsResponse.disabilityDescription,
          },
          sex: {
            sexAtBirth: DTEDemographicsResponse.sexRegisteredAtBirth,
          },
          ethnicity1: {
            ethnicity: DTEDemographicsResponse.ethnicGroup,
          },
          ethnicity2: {
            background: DTEDemographicsResponse.ethnicBackground,
          },
          gender: {
            genderAtBirth: parseTriStateBoolean(
              DTEDemographicsResponse.genderIsSameAsSexRegisteredAtBirth,
              "noSay"
            ),
          },
          healthConditions: {
            conditions: DTEDemographicsResponse.healthConditionInterests || [],
          },
        };
        setUserData(stateData);
        setCancelData(stateData);
      }
    }
  }, [response, demographicsResponse, userData]);

  const [
    {
      response: demographicsPostResponse,
      loading: demographicsPostLoading,
      error: demographicsPostError,
    },
    demographicsPost,
  ] = useAxiosFetch(
    {
      method: "PUT",
    },
    { useCache: false, manual: true }
  );

  const [
    {
      response: detailsPostResponse,
      loading: detailsPostLoading,
      error: detailsPostError,
    },
    detailsPost,
  ] = useAxiosFetch(
    {
      method: "PUT",
    },
    { useCache: false, manual: true }
  );

  type FormDataType =
    | AddressFormData
    | MobileFormData
    | DOBFormData
    | DisabilityFormData
    | Disability2FormData
    | SexFormData
    | Ethnicity1FormData
    | Ethnicity2FormData
    | GenderFormData
    | HealthConditionFormData;

  type MappedDataType = {
    data: UserDataState | undefined;
    screen: string;
    skipUpdate?: boolean;
    updateCancelState?: boolean;
  };

  const mapDataToStateObject = (
    source: string,
    data: FormDataType
  ): MappedDataType => {
    if (!userData) return { data: undefined, screen: "main" };

    switch (source) {
      case "Address": {
        const addressData: AddressFormData = data as AddressFormData;
        return {
          data: { ...userData, address: addressData },
          screen: "main",
        };
      }
      case "Mobile": {
        const mobileData: MobileFormData = data as MobileFormData;
        return { data: { ...userData, mobile: mobileData }, screen: "main" };
      }
      case "DateOfBirth": {
        const dobData: DOBFormData = data as DOBFormData;
        return { data: { ...userData, dob: dobData }, screen: "main" };
      }
      case "Disability": {
        const disabilityData: DisabilityFormData = data as DisabilityFormData;
        if (disabilityData.disability === "yes") {
          return {
            data: {
              ...userData,
              disability: disabilityData,
              disabilityDescription: {
                disabilityDescription:
                  userData.disabilityDescription.disabilityDescription,
                disability: "yes",
              },
            },
            screen: "disability2",
            skipUpdate: true,
          };
        }
        return {
          data: {
            ...userData,
            disability: disabilityData,
            disabilityDescription: {
              disabilityDescription: undefined,
              disability: "",
            },
          },
          screen: "main",
          updateCancelState: true,
        };
      }
      case "DisabilityDescription": {
        const disabilityDescriptionData: Disability2FormData =
          data as Disability2FormData;
        return {
          data: {
            ...userData,
            disability: {
              disability: disabilityDescriptionData.disability,
            },
            disabilityDescription: disabilityDescriptionData,
          },
          screen: "main",
          updateCancelState: true,
        };
      }
      case "Sex": {
        const sexData: SexFormData = data as SexFormData;
        return { data: { ...userData, sex: sexData }, screen: "main" };
      }
      case "Ethnicity": {
        const ethnicityData: Ethnicity1FormData = data as Ethnicity1FormData;
        return {
          data: {
            ...userData,
            ethnicity1: ethnicityData,
            ethnicity2:
              ethnicityData.ethnicity === cancelData?.ethnicity1.ethnicity
                ? userData.ethnicity2
                : {
                    background: "",
                    otherText: undefined,
                  },
          },
          screen: "ethnicity2",
          skipUpdate: true,
        };
      }
      case "EthnicityBackground": {
        const ethnicityBackgroundData: Ethnicity2FormData =
          data as Ethnicity2FormData;
        return {
          data: { ...userData, ethnicity2: ethnicityBackgroundData },
          screen: "main",
          updateCancelState: true,
        };
      }
      case "Gender": {
        const genderData: GenderFormData = data as GenderFormData;
        return { data: { ...userData, gender: genderData }, screen: "main" };
      }
      default: {
        return { data: userData, screen: "main" };
      }
    }
  };

  const handleUpdateUserDetails = async (data: NameFormData) => {
    await detailsPost({
      url: `${process.env.REACT_APP_BASE_API}/participants/details`,
      method: "PUT",
      data: {
        firstname: data.firstName,
        lastname: data.lastName,
      },
    }).catch(() => {
      // console.log(err);
    });

    setUserData((oldUserData: UserDataState | undefined) => {
      if (oldUserData) {
        return {
          ...oldUserData,
          name: data,
        };
      }
      return undefined;
    });
    setCurrentDisplayPage("main");
  };

  const handleUpdateUserDemographics = async (mappedData: MappedDataType) => {
    if (mappedData.data) {
      if (!mappedData.skipUpdate) {
        await demographicsPost({
          url: `${process.env.REACT_APP_BASE_API}/participants/demographics`,
          method: "PUT",
          data: {
            mobileNumber: mappedData.data.mobile.mobileNumber,
            landlineNumber: mappedData.data.mobile.landlineNumber,
            address: {
              addressLine1: mappedData.data.address.address.addressLine1,
              addressLine2: mappedData.data.address.address.addressLine2,
              addressLine3: mappedData.data.address.address.addressLine3,
              addressLine4: mappedData.data.address.address.addressLine4,
              town: mappedData.data.address.address.town,
              postcode: mappedData.data.address.postcode,
            },
            dateOfBirth: new Date(
              parseInt(mappedData.data.dob.year, 10),
              parseInt(mappedData.data.dob.month, 10) - 1,
              parseInt(mappedData.data.dob.day, 10),
              12
            ).toISOString(),
            sexRegisteredAtBirth: mappedData.data.sex.sexAtBirth,
            genderIsSameAsSexRegisteredAtBirth:
              mappedData.data.gender.genderAtBirth === "noSay"
                ? null
                : mappedData.data.gender.genderAtBirth === "yes",
            ethnicGroup: mappedData.data.ethnicity1.ethnicity,
            ethnicBackground: mappedData.data.ethnicity2.background,
            disability:
              mappedData.data.disability.disability === "notSaying"
                ? null
                : mappedData.data.disability.disability === "yes",
            disabilityDescription:
              mappedData.data.disability.disability === "yes"
                ? mappedData.data.disabilityDescription.disabilityDescription
                : null,
            healthConditionInterests:
              mappedData.data.healthConditions.conditions.length > 0
                ? mappedData.data.healthConditions.conditions
                : null,
          },
        }).catch(() => {
          // console.log(err);
        });
      }

      setUserData((oldUserData: UserDataState | undefined) => {
        if (oldUserData && mappedData.data) {
          return {
            ...oldUserData,
            mobile: mappedData.data.mobile,
            address: mappedData.data.address,
            dob: mappedData.data.dob,
            sex: mappedData.data.sex,
            gender: mappedData.data.gender,
            ethnicity1: mappedData.data.ethnicity1,
            ethnicity2: mappedData.data.ethnicity2,
            disability: mappedData.data.disability,
            disabilityDescription: mappedData.data.disabilityDescription,
            healthConditions: mappedData.data.healthConditions,
          };
        }
        return undefined;
      });
    }

    if (mappedData.updateCancelState) {
      setCancelData(mappedData.data);
    }

    setCurrentDisplayPage(mappedData.screen);
  };

  return (
    <DocumentTitle title={pageTitle}>
      <StyledWrapper role="main" id="main" ref={containerRef}>
        {(loading || demographicsLoading || ethnicityLoading) && (
          <LoadingIndicator />
        )}
        {(detailsPostLoading || demographicsPostLoading) && (
          <LoadingIndicator text="Updating your details..." />
        )}
        <Container>
          {currentPage === "main" && <DTEBackLink href="/" linkText="Back" />}
          {currentPage === "main" && (
            <>
              <DTEHeader as="h1" $variant={headerVariant}>
                Personal details
              </DTEHeader>
              {userData &&
                ethnicityResponse &&
                !(
                  detailsPostLoading ||
                  demographicsPostLoading ||
                  ethnicityLoading
                ) && (
                  <>
                    <dl className="govuk-summary-list">
                      <div className="govuk-summary-list__row">
                        <dt className="govuk-summary-list__key">
                          <DTEContent>Name</DTEContent>
                        </dt>
                        <dd className="govuk-summary-list__value">
                          <DTEContent>
                            {userData.name.firstName} {userData.name.lastName}{" "}
                          </DTEContent>
                        </dd>
                        <dd className="govuk-summary-list__actions">
                          <DTELinkButton
                            onClick={() => setCurrentDisplayPage("name")}
                          >
                            Change <StyledHiddenText>name</StyledHiddenText>
                          </DTELinkButton>
                        </dd>
                      </div>
                      <div className="govuk-summary-list__row">
                        <dt className="govuk-summary-list__key">
                          <DTEContent>Home address</DTEContent>
                        </dt>
                        <dd className="govuk-summary-list__value">
                          {formatDisplayAddress(userData.address)}
                        </dd>
                        <dd className="govuk-summary-list__actions">
                          <DTELinkButton
                            onClick={() => setCurrentDisplayPage("address")}
                          >
                            Change{" "}
                            <StyledHiddenText>home address</StyledHiddenText>
                          </DTELinkButton>
                        </dd>
                      </div>
                      <div className="govuk-summary-list__row">
                        <dt className="govuk-summary-list__key">
                          <DTEContent>Phone number</DTEContent>
                        </dt>
                        <dd className="govuk-summary-list__value">
                          {userData.mobile.mobileNumber ||
                          userData.mobile.landlineNumber ? (
                            <>
                              {userData.mobile.mobileNumber && (
                                <DTEContent>
                                  Mobile
                                  <br />
                                  {userData.mobile.mobileNumber}
                                </DTEContent>
                              )}
                              {userData.mobile.landlineNumber && (
                                <DTEContent>
                                  Landline
                                  <br />
                                  {userData.mobile.landlineNumber}
                                </DTEContent>
                              )}
                            </>
                          ) : (
                            <DTEContent>Not provided</DTEContent>
                          )}
                        </dd>
                        <dd className="govuk-summary-list__actions">
                          <DTELinkButton
                            onClick={() => setCurrentDisplayPage("mobile")}
                          >
                            Change{" "}
                            <StyledHiddenText>phone number</StyledHiddenText>
                          </DTELinkButton>
                        </dd>
                      </div>
                      <div className="govuk-summary-list__row">
                        <dt className="govuk-summary-list__key">
                          <DTEContent>Date of birth</DTEContent>
                        </dt>
                        <dd className="govuk-summary-list__value">
                          <DTEContent>
                            {new Date(
                              parseInt(userData.dob.year, 10),
                              parseInt(userData.dob.month, 10) - 1,
                              parseInt(userData.dob.day, 10),
                              12
                            ).toLocaleString("en-GB", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </DTEContent>
                        </dd>
                        <dd className="govuk-summary-list__actions">
                          <DTELinkButton
                            onClick={() => setCurrentDisplayPage("dob")}
                          >
                            Change{" "}
                            <StyledHiddenText>date of birth</StyledHiddenText>
                          </DTELinkButton>
                        </dd>
                      </div>
                      <div className="govuk-summary-list__row">
                        <dt className="govuk-summary-list__key">
                          <DTEContent>Sex registered at birth</DTEContent>
                        </dt>
                        <dd className="govuk-summary-list__value">
                          <DTEContent>
                            {userData.sex.sexAtBirth.charAt(0).toUpperCase() +
                              userData.sex.sexAtBirth.slice(1)}
                          </DTEContent>
                        </dd>
                        <dd className="govuk-summary-list__actions">
                          <DTELinkButton
                            onClick={() => setCurrentDisplayPage("sex")}
                          >
                            Change{" "}
                            <StyledHiddenText>
                              sex registered at birth
                            </StyledHiddenText>
                          </DTELinkButton>
                        </dd>
                      </div>
                      <div className="govuk-summary-list__row">
                        <dt className="govuk-summary-list__key">
                          <DTEContent>
                            Gender identity same as sex registered at birth
                          </DTEContent>
                        </dt>
                        <dd className="govuk-summary-list__value">
                          <DTEContent>
                            {userData.gender.genderAtBirth === "noSay"
                              ? "Prefer not to say"
                              : userData.gender.genderAtBirth
                                  .charAt(0)
                                  .toUpperCase() +
                                userData.gender.genderAtBirth.slice(1)}
                          </DTEContent>
                        </dd>
                        <dd className="govuk-summary-list__actions">
                          <DTELinkButton
                            onClick={() => setCurrentDisplayPage("gender")}
                          >
                            Change{" "}
                            <StyledHiddenText>
                              gender identity same as sex registered at birth
                            </StyledHiddenText>
                          </DTELinkButton>
                        </dd>
                      </div>
                      <div className="govuk-summary-list__row">
                        <dt className="govuk-summary-list__key">
                          <DTEContent>Ethnic group</DTEContent>
                        </dt>
                        <dd className="govuk-summary-list__value">
                          <DTEContent>
                            {
                              (
                                Utils.ConvertResponseToDTEResponse(
                                  ethnicityResponse
                                )?.content as Ethnicities
                              )[userData.ethnicity1.ethnicity].longName
                            }
                          </DTEContent>
                        </dd>
                        <dd className="govuk-summary-list__actions">
                          <DTELinkButton
                            onClick={() => setCurrentDisplayPage("ethnicity1")}
                          >
                            Change{" "}
                            <StyledHiddenText>ethnic group</StyledHiddenText>
                          </DTELinkButton>
                        </dd>
                      </div>
                      <div className="govuk-summary-list__row">
                        <dt className="govuk-summary-list__key">
                          <DTEContent>Ethnic background</DTEContent>
                        </dt>
                        <dd className="govuk-summary-list__value">
                          <DTEContent>
                            {userData.ethnicity2.background}
                          </DTEContent>
                        </dd>
                        <dd className="govuk-summary-list__actions">
                          <DTELinkButton
                            onClick={() => setCurrentDisplayPage("ethnicity2")}
                          >
                            Change{" "}
                            <StyledHiddenText>
                              ethnic background
                            </StyledHiddenText>
                          </DTELinkButton>
                        </dd>
                      </div>
                      <div className="govuk-summary-list__row">
                        <dt className="govuk-summary-list__key">
                          <DTEContent>
                            Long-term conditions or illness
                          </DTEContent>
                        </dt>
                        <dd className="govuk-summary-list__value">
                          <DTEContent>
                            {userData.disability.disability === "notSaying"
                              ? "Prefer not to say"
                              : userData.disability.disability
                                  .charAt(0)
                                  .toUpperCase() +
                                userData.disability.disability.slice(1)}
                          </DTEContent>
                        </dd>
                        <dd className="govuk-summary-list__actions">
                          <DTELinkButton
                            onClick={() => setCurrentDisplayPage("disability")}
                          >
                            Change{" "}
                            <StyledHiddenText>
                              long-term conditions or illness
                            </StyledHiddenText>
                          </DTELinkButton>
                        </dd>
                      </div>
                      {userData.disability.disability === "yes" ? (
                        <div className="govuk-summary-list__row">
                          <dt className="govuk-summary-list__key">
                            <DTEContent>
                              Reduced ability to carry out daily activities
                            </DTEContent>
                          </dt>
                          <dd className="govuk-summary-list__value">
                            <DTEContent>
                              {
                                userData.disabilityDescription
                                  .disabilityDescription
                              }
                            </DTEContent>
                          </dd>
                          <dd className="govuk-summary-list__actions">
                            <DTELinkButton
                              onClick={() =>
                                setCurrentDisplayPage("disability2")
                              }
                            >
                              Change{" "}
                              <StyledHiddenText>
                                reduced ability to carry out daily activities
                              </StyledHiddenText>
                            </DTELinkButton>
                          </dd>
                        </div>
                      ) : (
                        <></>
                      )}
                    </dl>
                  </>
                )}
              {error && (
                <ErrorMessageContainer
                  axiosErrors={[error]}
                  DTEAxiosErrors={[
                    Utils.ConvertResponseToDTEResponse(response)?.errors,
                  ]}
                />
              )}
              {demographicsError && (
                <ErrorMessageContainer
                  axiosErrors={[demographicsError]}
                  DTEAxiosErrors={[
                    Utils.ConvertResponseToDTEResponse(demographicsResponse)
                      ?.errors,
                  ]}
                />
              )}
              {demographicsPostError && (
                <ErrorMessageContainer
                  axiosErrors={[demographicsPostError]}
                  DTEAxiosErrors={[
                    Utils.ConvertResponseToDTEResponse(demographicsPostResponse)
                      ?.errors,
                  ]}
                />
              )}
              {detailsPostError && (
                <ErrorMessageContainer
                  axiosErrors={[detailsPostError]}
                  DTEAxiosErrors={[
                    Utils.ConvertResponseToDTEResponse(detailsPostResponse)
                      ?.errors,
                  ]}
                />
              )}
              {ethnicityError && (
                <ErrorMessageContainer
                  axiosErrors={[ethnicityError]}
                  DTEAxiosErrors={[
                    Utils.ConvertResponseToDTEResponse(ethnicityResponse)
                      ?.errors,
                  ]}
                />
              )}
            </>
          )}
        </Container>
        {currentPage === "name" && (
          <Container>
            <NameForm
              onDataChange={handleUpdateUserDetails}
              onCancel={() => {
                setCurrentDisplayPage("main");
              }}
              initialStateData={{
                firstName: userData?.name.firstName || "",
                lastName: userData?.name.lastName || "",
              }}
              nextButtonText="Save"
              showCancelButton
            />
          </Container>
        )}
        {currentPage === "address" && (
          <Container>
            <AddressForm
              onDataChange={(data) => {
                const mappedData = mapDataToStateObject("Address", data);
                if (mappedData) {
                  handleUpdateUserDemographics(mappedData);
                }
              }}
              onCancel={() => {
                setCurrentDisplayPage("main");
              }}
              initialStateData={
                userData?.address || {
                  address: {
                    addressLine1: "",
                    addressLine2: "",
                    addressLine3: "",
                    addressLine4: "",
                    town: "",
                  },
                  postcode: "",
                }
              }
              nextButtonText="Save"
              showCancelButton
            />
          </Container>
        )}
        {currentPage === "disability" && (
          <Container>
            <DisabilityForm
              onDataChange={(data) => {
                const mappedData = mapDataToStateObject("Disability", data);
                if (mappedData) {
                  handleUpdateUserDemographics(mappedData);
                }
              }}
              onCancel={() => {
                setCurrentDisplayPage("main");
              }}
              initialStateData={
                userData?.disability || {
                  disability: "no",
                }
              }
              nextButtonText="Save"
              hideHeader
              showCancelButton
              instructionText={
                <>
                  <DTEHeader as="h1" $variant={headerVariant}>
                    Do you have any physical or mental health conditions or
                    illness lasting or expected to last 12 months or more?
                  </DTEHeader>
                  <DTEContent as="span" $displayMode="block">
                    If Yes, we will ask you a further question about the impact
                    of your conditions or illness. Both questions will need to
                    be answered before your changes can be saved.
                  </DTEContent>
                </>
              }
            />
          </Container>
        )}
        {currentPage === "disability2" && (
          <Container>
            <Disability2Form
              onDataChange={(data) => {
                const mappedData = mapDataToStateObject(
                  "DisabilityDescription",
                  data
                );
                if (mappedData) {
                  handleUpdateUserDemographics(mappedData);
                }
              }}
              onCancel={() => {
                setUserData(cancelData);
                setCurrentDisplayPage("main");
              }}
              initialStateData={{
                disability: userData?.disability.disability || "",
                disabilityDescription:
                  userData?.disabilityDescription.disabilityDescription,
              }}
              nextButtonText="Save"
              showCancelButton
            />
          </Container>
        )}

        {currentPage === "ethnicity1" && (
          <Container>
            <Ethnicity1Form
              onDataChange={(data) => {
                const mappedData = mapDataToStateObject("Ethnicity", data);
                if (mappedData) {
                  handleUpdateUserDemographics(mappedData);
                }
              }}
              onCancel={() => {
                setCurrentDisplayPage("main");
              }}
              initialStateData={
                userData?.ethnicity1 || {
                  ethnicity: "",
                }
              }
              nextButtonText="Continue"
              showCancelButton
              hideHeader
              instructionText={
                <>
                  <DTEHeader as="h1" $variant={headerVariant}>
                    What is your ethnic group?
                  </DTEHeader>
                  <DTEContent as="span" $displayMode="block">
                    If you change your ethnic group you will also need to change
                    your ethnic background in the next question.
                  </DTEContent>
                  <DTEContent as="span" $displayMode="block">
                    Once both questions have been answered the changes can be
                    saved.
                  </DTEContent>
                </>
              }
              referenceDataEthnicities={
                Utils.ConvertResponseToDTEResponse(ethnicityResponse)?.content
              }
            />
          </Container>
        )}
        {currentPage === "ethnicity2" && (
          <Container>
            <Ethnicity2Form
              onDataChange={(data) => {
                const mappedData = mapDataToStateObject(
                  "EthnicityBackground",
                  data
                );
                if (mappedData) {
                  handleUpdateUserDemographics(mappedData);
                }
              }}
              onCancel={() => {
                if (cancelData) {
                  setUserData(cancelData);
                  setCurrentDisplayPage("main");
                }
              }}
              initialStateData={
                userData?.ethnicity2 || {
                  background: "",
                }
              }
              nextButtonText="Save"
              showCancelButton
              ethnicity={userData?.ethnicity1.ethnicity || "other"}
              referenceDataEthnicities={
                Utils.ConvertResponseToDTEResponse(ethnicityResponse)?.content
              }
            />
          </Container>
        )}
        {currentPage === "mobile" && (
          <Container>
            <MobileNumberForm
              onDataChange={(data) => {
                const mappedData = mapDataToStateObject("Mobile", data);
                if (mappedData) {
                  handleUpdateUserDemographics(mappedData);
                }
              }}
              onCancel={() => {
                setCurrentDisplayPage("main");
              }}
              initialStateData={
                userData?.mobile || {
                  mobileNumber: "",
                  landlineNumber: "",
                }
              }
              nextButtonText="Save"
              showCancelButton
            />
          </Container>
        )}
        {currentPage === "gender" && (
          <Container>
            <GenderForm
              onDataChange={(data) => {
                const mappedData = mapDataToStateObject("Gender", data);
                if (mappedData) {
                  handleUpdateUserDemographics(mappedData);
                }
              }}
              onCancel={() => {
                setCurrentDisplayPage("main");
              }}
              initialStateData={
                userData?.gender || {
                  genderAtBirth: "",
                }
              }
              nextButtonText="Save"
              showCancelButton
            />
          </Container>
        )}
        {currentPage === "dob" && (
          <Container>
            <DOBForm
              onDataChange={(data) => {
                const mappedData = mapDataToStateObject("DateOfBirth", data);
                if (mappedData) {
                  handleUpdateUserDemographics(mappedData);
                }
              }}
              onCancel={() => {
                setCurrentDisplayPage("main");
              }}
              initialStateData={
                userData?.dob || {
                  day: "",
                  month: "",
                  year: "",
                }
              }
              nextButtonText="Save"
              showCancelButton
            />
          </Container>
        )}
        {currentPage === "sex" && (
          <Container>
            <SexForm
              onDataChange={(data) => {
                const mappedData = mapDataToStateObject("Sex", data);
                if (mappedData) {
                  handleUpdateUserDemographics(mappedData);
                }
              }}
              onCancel={() => {
                setCurrentDisplayPage("main");
              }}
              initialStateData={
                userData?.sex || {
                  sexAtBirth: "",
                }
              }
              nextButtonText="Save"
              showCancelButton
              hideNextQuestionText
            />
          </Container>
        )}
      </StyledWrapper>
    </DocumentTitle>
  );
};

export default UpdateParticipant;
