import React, { useEffect, useState, useRef, useContext } from "react";
import ReactGA from "react-ga";
import styled from "styled-components";
import DocumentTitle from "react-document-title";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import ErrorMessageContainer from "../../Shared/ErrorMessageContainer/ErrorMessageContainer";
import LoadingIndicator from "../../Shared/LoadingIndicator/LoadingIndicator";
import Container from "../../Shared/Container/Container";
import DTEBackLink from "../../Shared/UI/DTEBackLink/DTEBackLink";
import DTELinkButton from "../../Shared/UI/DTELinkButton/DTELinkButton";
import DTEContent from "../../Shared/UI/DTETypography/DTEContent/DTEContent";
import DTEHeader from "../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import AddressForm, { AddressFormData } from "../../Shared/FormElements/AddressForm";
import DisabilityForm, { DisabilityFormData } from "../../Shared/FormElements/DisabilityForm";
import DOBForm, { DOBFormData } from "../../Shared/FormElements/DOBForm";
import Ethnicity1Form, { Ethnicity1FormData } from "../../Shared/FormElements/EthnicityFormComponents/Ethnicity1Form";
import Ethnicity2Form, { Ethnicity2FormData } from "../../Shared/FormElements/EthnicityFormComponents/Ethnicity2Form";
import { HealthConditionFormData } from "../../Shared/FormElements/HealthConditionForm";
import MobileNumberForm, { MobileFormData } from "../../Shared/FormElements/MobileNumberForm";
import SexForm, { SexFormData } from "../../Shared/FormElements/SexForm";
import NameForm, { NameFormData } from "../../Shared/FormElements/NameForm";
import Utils, { formatDisplayAddress } from "../../../Helper/Utils";
import Disability2Form, { Disability2FormData } from "../../Shared/FormElements/Disability2Form";
import { AuthContext } from "../../../context/AuthContext";
import { ContentContext } from "../../../context/ContentContext";
import { UserContext } from "../../../context/UserContext";
import getEthnicities from "../../../data/ethnicityData";
import mapParticipantBackgrounds from "../../../Helper/mapParticipantBackgrounds/mapParticipantBackgrounds";
import mapParticipantDisabilityDesc from "../../../Helper/mapParticipantDisabilityDesc/mapParticipantDisabilityDesc";
import mapMonthDescription from "../../../Helper/mapParticipantDobMonths/mapParticipantDobMonths";

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

function UpdateParticipant() {
  const { content } = useContext(ContentContext);
  const ethnicities = getEthnicities(content);
  const { isNhsLinkedAccount } = useContext(AuthContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentPage, setCurrentPage } = useContext(UserContext);
  const [pageTitle, setPageTitle] = useState(content["update-personal-details-document-title"]);
  const [gaURL, setGaURL] = useState("/MyAccount/PersonalDetails");
  const [userData, setUserData] = React.useState<UserDataState>();
  const [cancelData, setCancelData] = React.useState<UserDataState>();
  const theme = useTheme();
  const headerVariant = useMediaQuery(theme.breakpoints.down("xs")) ? "h2" : "h1";

  const getDetailsURL = `${process.env.REACT_APP_BASE_API}/participants/details`;
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

  const getDemographicsURL = `${process.env.REACT_APP_BASE_API}/participants/demographics`;
  const [{ response: demographicsResponse, error: demographicsError }] = useAxiosFetch(
    {
      url: getDemographicsURL,
      method: "GET",
    },
    {
      manual: false,
      useCache: false,
    }
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
        setPageTitle(content["update-address-document-title"]);
        setGaURL("/MyAccount/PersonalDetails/name");
        break;
      case "address":
        setPageTitle(content["update-address-document-title"]);
        setGaURL("/MyAccount/PersonalDetails/address");
        break;
      case "dob":
        setPageTitle(content["update-date-of-birth-document-title"]);
        setGaURL("/MyAccount/PersonalDetails/dateofbirth");
        break;
      case "mobile":
        setPageTitle(content["update-phone-document-title"]);
        setGaURL("/MyAccount/PersonalDetails/phonenumber");
        break;
      case "sex":
      case "gender":
        setPageTitle(content["update-sex-document-title"]);
        setGaURL("/MyAccount/PersonalDetails/sex");
        break;
      case "ethnicity1":
        setPageTitle(content["update-ethnic-group-document-title"]);
        setGaURL("/MyAccount/PersonalDetails/ethnicgroup");
        break;
      case "ethnicity2":
        setPageTitle(content["update-ethnic-background-document-title"]);
        setGaURL("/MyAccount/PersonalDetails/ethnicbackground");
        break;
      case "disability":
        setPageTitle(content["update-disability-document-title"]);
        setGaURL("/MyAccount/PersonalDetails/conditions");
        break;
      case "disability2":
        setPageTitle(content["update-reduced-ability-document-title"]);
        setGaURL("/MyAccount/PersonalDetails/reducedability");
        break;
      default:
        setPageTitle(content["update-personal-details-document-title"]);
        setGaURL("/MyAccount/PersonalDetails");
    }
  };

  useEffect(() => {
    ReactGA.pageview(gaURL);
  }, [gaURL]);

  useEffect(() => {
    handlePageTitle(currentPage);
  }, [currentPage]);

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
      const DTEDetailsResponse = Utils.ConvertResponseToDTEResponse(response)?.content;
      const DTEDemographicsResponse = Utils.ConvertResponseToDTEResponse(demographicsResponse)?.content;
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
            day: new Date(DTEDemographicsResponse.dateOfBirth).getDate().toString(),
            month: (new Date(DTEDemographicsResponse.dateOfBirth).getMonth() + 1).toString(),
            year: new Date(DTEDemographicsResponse.dateOfBirth).getFullYear().toString(),
          },
          disability: {
            disability: parseTriStateBoolean(DTEDemographicsResponse.disability, "notSaying"),
          },
          disabilityDescription: {
            disability: parseTriStateBoolean(DTEDemographicsResponse.disability, "notSaying"),
            disabilityDescription: DTEDemographicsResponse.disabilityDescription,
          },
          sex: {
            sexAtBirth: DTEDemographicsResponse.sexRegisteredAtBirth,
            genderAtBirth: parseTriStateBoolean(DTEDemographicsResponse.genderIsSameAsSexRegisteredAtBirth, "noSay"),
          },
          ethnicity1: {
            ethnicity: DTEDemographicsResponse.ethnicGroup,
          },
          ethnicity2: {
            background: DTEDemographicsResponse.ethnicBackground,
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
    { response: demographicsPostResponse, loading: demographicsPostLoading, error: demographicsPostError },
    demographicsPost,
  ] = useAxiosFetch(
    {
      method: "PUT",
    },
    { useCache: false, manual: true }
  );

  const [{ response: detailsPostResponse, loading: detailsPostLoading, error: detailsPostError }, detailsPost] =
    useAxiosFetch(
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
    | HealthConditionFormData;

  type MappedDataType = {
    data: UserDataState | undefined;
    screen: string;
    skipUpdate?: boolean;
    updateCancelState?: boolean;
  };

  const mapDataToStateObject = (source: string, data: FormDataType): MappedDataType => {
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
                disabilityDescription: userData.disabilityDescription.disabilityDescription,
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
        const disabilityDescriptionData: Disability2FormData = data as Disability2FormData;
        return {
          data: {
            ...userData,
            disability: {
              disability: disabilityDescriptionData.disability as string,
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
        const ethnicityBackgroundData: Ethnicity2FormData = data as Ethnicity2FormData;
        return {
          data: { ...userData, ethnicity2: ethnicityBackgroundData },
          screen: "main",
          updateCancelState: true,
        };
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
              mappedData.data.sex.genderAtBirth === "noSay" ? null : mappedData.data.sex.genderAtBirth === "yes",
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

  const formatDateOfBirth = (dob: DOBFormData) => {
    const date = new Date(parseInt(dob.year, 10), parseInt(dob.month, 10) - 1, parseInt(dob.day, 10), 12);

    const day = date.toLocaleString("en-GB", { day: "numeric" });
    const year = date.toLocaleString("en-GB", { year: "numeric" });
    const month = mapMonthDescription(date.toLocaleString("en-GB", { month: "long" }), content);

    return `${day} ${month} ${year}`;
  };

  return (
    <DocumentTitle title={pageTitle}>
      <StyledWrapper role="main" id="main" ref={containerRef}>
        {loading || !userData ? (
          <LoadingIndicator />
        ) : (
          <>
            {(detailsPostLoading || demographicsPostLoading) && (
              <LoadingIndicator text={content["reusable-loading-updating-details"]} />
            )}
            <Container>
              {currentPage === "main" && <DTEBackLink href="/" linkText={content["reusable-back-link"]} />}
              {currentPage === "main" && (
                <>
                  <DTEHeader as="h1" $variant={headerVariant} captionKey="reusable-personal-details-header">
                    {content["reusable-personal-details-header"]}
                  </DTEHeader>
                  {userData && !(detailsPostLoading || demographicsPostLoading) && (
                    <>
                      {isNhsLinkedAccount && (
                        <>
                          <dl className="govuk-summary-list">
                            <div className="govuk-summary-list__row">
                              <dt className="govuk-summary-list__key">
                                <DTEContent>{content["reusable-text-name"]}</DTEContent>
                              </dt>
                              <dd className="govuk-summary-list__value">
                                <DTEContent>
                                  {userData.name.firstName} {userData.name.lastName}{" "}
                                </DTEContent>
                              </dd>
                              <dd className="govuk-summary-list__actions" />
                            </div>
                            <div className="govuk-summary-list__row">
                              <dt className="govuk-summary-list__key">
                                <DTEContent>{content["reusable-text-date-of-birth"]}</DTEContent>
                              </dt>
                              <dd className="govuk-summary-list__value">
                                <DTEContent>{formatDateOfBirth(userData.dob)}</DTEContent>
                              </dd>
                              <dd className="govuk-summary-list__actions" />
                            </div>
                          </dl>
                          <div className="govuk-details__text">{content["accountsettings-text-nhs-instruction"]}</div>
                        </>
                      )}
                      <dl className="govuk-summary-list">
                        {!isNhsLinkedAccount && (
                          <div className="govuk-summary-list__row">
                            <dt className="govuk-summary-list__key">
                              <DTEContent>{content["reusable-text-name"]}</DTEContent>
                            </dt>
                            <dd className="govuk-summary-list__value">
                              <DTEContent>
                                {userData.name.firstName} {userData.name.lastName}{" "}
                              </DTEContent>
                            </dd>
                            <dd className="govuk-summary-list__actions">
                              <DTELinkButton onClick={() => setCurrentDisplayPage("name")}>
                                {content["reusable-change"]}{" "}
                                <StyledHiddenText>{content["reusable-text-name"].toLowerCase()}</StyledHiddenText>
                              </DTELinkButton>
                            </dd>
                          </div>
                        )}
                        <div className="govuk-summary-list__row">
                          <dt className="govuk-summary-list__key">
                            <DTEContent>{content["reusable-home-address"]}</DTEContent>
                          </dt>
                          <dd className="govuk-summary-list__value">{formatDisplayAddress(userData.address)}</dd>
                          <dd className="govuk-summary-list__actions">
                            <DTELinkButton onClick={() => setCurrentDisplayPage("address")}>
                              {content["reusable-change"]}{" "}
                              <StyledHiddenText>{content["reusable-home-address"].toLowerCase()}</StyledHiddenText>
                            </DTELinkButton>
                          </dd>
                        </div>
                        <div className="govuk-summary-list__row">
                          <dt className="govuk-summary-list__key">
                            <DTEContent>{content["reusable-phone-number"]}</DTEContent>
                          </dt>
                          <dd className="govuk-summary-list__value">
                            {userData.mobile.mobileNumber || userData.mobile.landlineNumber ? (
                              <>
                                {userData.mobile.mobileNumber && (
                                  <DTEContent>
                                    {content["reusable-mobile"]}
                                    <br />
                                    {userData.mobile.mobileNumber}
                                  </DTEContent>
                                )}
                                {userData.mobile.landlineNumber && (
                                  <DTEContent>
                                    {content["reusable-landline"]}
                                    <br />
                                    {userData.mobile.landlineNumber}
                                  </DTEContent>
                                )}
                              </>
                            ) : (
                              <DTEContent>{content["reusable-not-provided"]}</DTEContent>
                            )}
                          </dd>
                          <dd className="govuk-summary-list__actions">
                            <DTELinkButton onClick={() => setCurrentDisplayPage("mobile")}>
                              {content["reusable-change"]}{" "}
                              <StyledHiddenText>{content["reusable-phone-number"].toLowerCase()}</StyledHiddenText>
                            </DTELinkButton>
                          </dd>
                        </div>
                        {!isNhsLinkedAccount && (
                          <div className="govuk-summary-list__row">
                            <dt className="govuk-summary-list__key">
                              <DTEContent>{content["reusable-text-date-of-birth"]}</DTEContent>
                            </dt>
                            <dd className="govuk-summary-list__value">
                              <DTEContent>{formatDateOfBirth(userData.dob)}</DTEContent>
                            </dd>
                            <dd className="govuk-summary-list__actions">
                              <DTELinkButton onClick={() => setCurrentDisplayPage("dob")}>
                                {content["reusable-change"]}{" "}
                                <StyledHiddenText>
                                  {content["reusable-text-date-of-birth"].toLowerCase()}
                                </StyledHiddenText>
                              </DTELinkButton>
                            </dd>
                          </div>
                        )}
                        <div className="govuk-summary-list__row">
                          <dt className="govuk-summary-list__key">
                            <DTEContent>{content["reusable-sex-registered-at-birth"]}</DTEContent>
                          </dt>
                          <dd className="govuk-summary-list__value">
                            <DTEContent>
                              {userData.sex.sexAtBirth === "female" && content["reusable-female"]}
                              {userData.sex.sexAtBirth === "male" && content["reusable-male"]}
                            </DTEContent>
                          </dd>
                          <dd className="govuk-summary-list__actions">
                            <DTELinkButton onClick={() => setCurrentDisplayPage("sex")}>
                              {content["reusable-change"]}{" "}
                              <StyledHiddenText>
                                {content["reusable-sex-registered-at-birth"].toLowerCase()}
                              </StyledHiddenText>
                            </DTELinkButton>
                          </dd>
                        </div>
                        <div className="govuk-summary-list__row">
                          <dt className="govuk-summary-list__key">
                            <DTEContent>
                              {content["reusable-gender-identity-same-as-sex-registered-at-birth"]}
                            </DTEContent>
                          </dt>
                          <dd className="govuk-summary-list__value">
                            <DTEContent>
                              {userData.sex.genderAtBirth === "yes" && content["reusable-yes"]}
                              {userData.sex.genderAtBirth === "no" && content["reusable-no"]}
                              {userData.sex.genderAtBirth === "noSay" && content["reusable-prefer-not-to-say"]}
                            </DTEContent>
                          </dd>
                          <dd className="govuk-summary-list__actions">
                            <DTELinkButton onClick={() => setCurrentDisplayPage("sex")}>
                              {content["reusable-change"]}{" "}
                              <StyledHiddenText>
                                {content["reusable-gender-identity-same-as-sex-registered-at-birth"].toLowerCase()}
                              </StyledHiddenText>
                            </DTELinkButton>
                          </dd>
                        </div>
                        <div className="govuk-summary-list__row">
                          <dt className="govuk-summary-list__key">
                            <DTEContent>{content["reusable-ethnic-group"]}</DTEContent>
                          </dt>
                          <dd className="govuk-summary-list__value">
                            <DTEContent>
                              {ethnicities[userData.ethnicity1.ethnicity as keyof typeof ethnicities].longName}
                            </DTEContent>
                          </dd>
                          <dd className="govuk-summary-list__actions">
                            <DTELinkButton onClick={() => setCurrentDisplayPage("ethnicity1")}>
                              {content["reusable-change"]}{" "}
                              <StyledHiddenText>{content["reusable-ethnic-group"].toLowerCase()}</StyledHiddenText>
                            </DTELinkButton>
                          </dd>
                        </div>
                        <div className="govuk-summary-list__row">
                          <dt className="govuk-summary-list__key">
                            <DTEContent>{content["reusable-ethnic-background"]}</DTEContent>
                          </dt>
                          <dd className="govuk-summary-list__value">
                            <DTEContent>
                              {mapParticipantBackgrounds(userData.ethnicity2.background, content)}
                            </DTEContent>
                          </dd>
                          <dd className="govuk-summary-list__actions">
                            <DTELinkButton onClick={() => setCurrentDisplayPage("ethnicity2")}>
                              {content["reusable-change"]}{" "}
                              <StyledHiddenText>{content["reusable-ethnic-background"].toLowerCase()}</StyledHiddenText>
                            </DTELinkButton>
                          </dd>
                        </div>
                        <div className="govuk-summary-list__row">
                          <dt className="govuk-summary-list__key">
                            <DTEContent>{content["reusable-long-term-conditions-or-illness"]}</DTEContent>
                          </dt>
                          <dd className="govuk-summary-list__value">
                            <DTEContent>
                              {userData.disability.disability === "yes" && content["reusable-yes"]}
                              {userData.disability.disability === "no" && content["reusable-no"]}
                              {userData.disability.disability === "notSaying" && content["reusable-prefer-not-to-say"]}
                            </DTEContent>
                          </dd>
                          <dd className="govuk-summary-list__actions">
                            <DTELinkButton onClick={() => setCurrentDisplayPage("disability")}>
                              {content["reusable-change"]}{" "}
                              <StyledHiddenText>
                                {content["reusable-long-term-conditions-or-illness"].toLowerCase()}
                              </StyledHiddenText>
                            </DTELinkButton>
                          </dd>
                        </div>
                        {userData.disability.disability === "yes" ? (
                          <div className="govuk-summary-list__row">
                            <dt className="govuk-summary-list__key">
                              <DTEContent>
                                {content["reusable-reduced-ability-to-carry-out-daily-activities"]}
                              </DTEContent>
                            </dt>
                            <dd className="govuk-summary-list__value">
                              <DTEContent>
                                {mapParticipantDisabilityDesc(
                                  userData.disabilityDescription.disabilityDescription as string,
                                  content
                                )}
                              </DTEContent>
                            </dd>
                            <dd className="govuk-summary-list__actions">
                              <DTELinkButton onClick={() => setCurrentDisplayPage("disability2")}>
                                {content["reusable-change"]}{" "}
                                <StyledHiddenText>
                                  {content["reusable-reduced-ability-to-carry-out-daily-activities"].toLowerCase()}
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
                      DTEAxiosErrors={[Utils.ConvertResponseToDTEResponse(response)?.errors]}
                    />
                  )}
                  {demographicsError && (
                    <ErrorMessageContainer
                      axiosErrors={[demographicsError]}
                      DTEAxiosErrors={[Utils.ConvertResponseToDTEResponse(demographicsResponse)?.errors]}
                    />
                  )}
                  {demographicsPostError && (
                    <ErrorMessageContainer
                      axiosErrors={[demographicsPostError]}
                      DTEAxiosErrors={[Utils.ConvertResponseToDTEResponse(demographicsPostResponse)?.errors]}
                    />
                  )}
                  {detailsPostError && (
                    <ErrorMessageContainer
                      axiosErrors={[detailsPostError]}
                      DTEAxiosErrors={[Utils.ConvertResponseToDTEResponse(detailsPostResponse)?.errors]}
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
                  nextButtonText={content["reusable-save"]}
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
                  nextButtonText={content["reusable-save"]}
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
                  nextButtonText={content["reusable-save"]}
                  hideHeader
                  showCancelButton
                  instructionText={
                    <>
                      <DTEHeader as="h1" $variant={headerVariant} captionKey="register2-disability1-header">
                        {content["register2-disability1-header"]}
                      </DTEHeader>
                      <DTEContent as="span" $displayMode="block">
                        {content["accountsettings-disability1-instruction-text"]}
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
                    const mappedData = mapDataToStateObject("DisabilityDescription", data);
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
                    disabilityDescription: userData?.disabilityDescription.disabilityDescription,
                  }}
                  nextButtonText={content["reusable-save"]}
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
                  nextButtonText={content["reusable-button-continue"]}
                  showCancelButton
                  hideHeader
                  instructionText={
                    <>
                      <DTEHeader as="h1" $variant={headerVariant} captionKey="register2-ethnicity1-header">
                        {content["register2-ethnicity1-header"]}
                      </DTEHeader>
                      <DTEContent as="span" $displayMode="block">
                        {content["accountsettings-ethnicity1-instruction-text1"]}
                      </DTEContent>
                      <DTEContent as="span" $displayMode="block">
                        {content["accountsettings-ethnicity1-instruction-text2"]}
                      </DTEContent>
                    </>
                  }
                />
              </Container>
            )}
            {currentPage === "ethnicity2" && userData && (
              <Container>
                <Ethnicity2Form
                  onDataChange={(data) => {
                    const mappedData = mapDataToStateObject("EthnicityBackground", data);
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
                  nextButtonText={content["reusable-save"]}
                  showCancelButton
                  ethnicity={userData?.ethnicity1.ethnicity || "other"}
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
                  nextButtonText={content["reusable-save"]}
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
                  nextButtonText={content["reusable-save"]}
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
                      genderAtBirth: "",
                    }
                  }
                  nextButtonText={content["reusable-save"]}
                  showCancelButton
                  hideNextQuestionText
                />
              </Container>
            )}
          </>
        )}
      </StyledWrapper>
    </DocumentTitle>
  );
}

export default UpdateParticipant;
