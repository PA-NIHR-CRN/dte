import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import DocumentTitle from "react-document-title";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import LoadingIndicator from "../../Shared/LoadingIndicator/LoadingIndicator";
import Container from "../../Shared/Container/Container";
import { AddressFormData } from "../../Shared/FormElements/AddressForm";
import { DisabilityFormData } from "../../Shared/FormElements/DisabilityForm";
import { DOBFormData } from "../../Shared/FormElements/DOBForm";
import { Ethnicity1FormData } from "../../Shared/FormElements/EthnicityFormComponents/Ethnicity1Form";
import { Ethnicity2FormData } from "../../Shared/FormElements/EthnicityFormComponents/Ethnicity2Form";
import { GenderFormData } from "../../Shared/FormElements/GenderForm";
import HealthConditionForm, {
  HealthConditionFormData,
} from "../../Shared/FormElements/HealthConditionForm";
import { MobileFormData } from "../../Shared/FormElements/MobileNumberForm";
import { SexFormData } from "../../Shared/FormElements/SexForm";
import Utils from "../../../Helper/Utils";
import { Disability2FormData } from "../../Shared/FormElements/Disability2Form";
import ErrorMessageContainer from "../../Shared/ErrorMessageContainer/ErrorMessageContainer";

interface UserDataState {
  address: AddressFormData;
  mobile: MobileFormData;
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

const AreasOfResearch = () => {
  const history = useHistory();
  const containerRef = useRef<HTMLDivElement>(null);
  const [userData, setUserData] = React.useState<UserDataState>();
  const getDemographicsURL = `${process.env.REACT_APP_BASE_API}/participants/demographics`;
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

  const parseTriStateBoolean = (value: boolean, nullValue: string) => {
    if (value === null) {
      return nullValue;
    }
    return value ? "yes" : "no";
  };

  useEffect(() => {
    if (
      !userData &&
      Utils.ConvertResponseToDTEResponse(demographicsResponse)?.isSuccess
    ) {
      const response =
        Utils.ConvertResponseToDTEResponse(demographicsResponse)?.content;
      if (response) {
        const stateData: UserDataState = {
          address: {
            address: {
              addressLine1: response.address.addressLine1,
              addressLine2: response.address.addressLine2,
              addressLine3: response.address.addressLine3,
              addressLine4: response.address.addressLine4,
              town: response.address.town,
            },
            postcode: response.address.postcode,
          },
          mobile: {
            mobileNumber: response.mobileNumber,
            landlineNumber: response.landlineNumber,
          },
          dob: {
            day: new Date(response.dateOfBirth).getDate().toString(),
            month: (new Date(response.dateOfBirth).getMonth() + 1).toString(),
            year: new Date(response.dateOfBirth).getFullYear().toString(),
          },
          disability: {
            disability: parseTriStateBoolean(response.disability, "notSaying"),
          },
          disabilityDescription: {
            disability: parseTriStateBoolean(response.disability, "notSaying"),
            disabilityDescription: response.disabilityDescription,
          },
          sex: {
            sexAtBirth: response.sexRegisteredAtBirth,
          },
          ethnicity1: {
            ethnicity: response.ethnicGroup,
          },
          ethnicity2: {
            background: response.ethnicBackground,
          },
          gender: {
            genderAtBirth: parseTriStateBoolean(
              response.genderIsSameAsSexRegisteredAtBirth,
              "noSay"
            ),
          },
          healthConditions: {
            conditions: response.healthConditionInterests || [],
          },
        };
        setUserData(stateData);
      }
    }
  }, [demographicsResponse, userData]);

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

  const handleSave = async (data: HealthConditionFormData) => {
    if (userData) {
      await demographicsPost({
        url: `${process.env.REACT_APP_BASE_API}/participants/demographics`,
        method: "PUT",
        data: {
          mobileNumber: userData.mobile.mobileNumber,
          landlineNumber: userData.mobile.landlineNumber,
          address: {
            addressLine1: userData.address.address.addressLine1,
            addressLine2: userData.address.address.addressLine2,
            addressLine3: userData.address.address.addressLine3,
            addressLine4: userData.address.address.addressLine4,
            town: userData.address.address.town,
            postcode: userData.address.postcode,
          },
          dateOfBirth: new Date(
            parseInt(userData.dob.year, 10),
            parseInt(userData.dob.month, 10) - 1,
            parseInt(userData.dob.day, 10),
            12
          ).toISOString(),
          sexRegisteredAtBirth: userData.sex.sexAtBirth,
          genderIsSameAsSexRegisteredAtBirth:
            userData.gender.genderAtBirth === "noSay"
              ? null
              : userData.gender.genderAtBirth === "yes",
          ethnicGroup: userData.ethnicity1.ethnicity,
          ethnicBackground: userData.ethnicity2.background,
          disability:
            userData.disability.disability === "notSaying"
              ? null
              : userData.disability.disability === "yes",
          disabilityDescription:
            userData.disability.disability === "yes"
              ? userData.disabilityDescription.disabilityDescription
              : null,
          healthConditionInterests:
            data.conditions.length > 0 ? data.conditions : null,
        },
      }).catch(() => {});
    }
  };

  return (
    <DocumentTitle title="Which areas of research are you interested in? - Volunteer Account - Be Part of Research">
      <StyledWrapper role="main" ref={containerRef}>
        {demographicsLoading && (
          <LoadingIndicator text="Loading your details..." />
        )}
        {demographicsPostLoading && (
          <LoadingIndicator text="Updating your details..." />
        )}
        <Container>
          <ErrorMessageContainer
            axiosErrors={[demographicsPostError]}
            DTEAxiosErrors={[
              Utils.ConvertResponseToDTEResponse(demographicsPostResponse)
                ?.errors,
            ]}
          />
          <ErrorMessageContainer
            axiosErrors={[demographicsError]}
            DTEAxiosErrors={[
              Utils.ConvertResponseToDTEResponse(demographicsResponse)?.errors,
            ]}
          />
          {!demographicsLoading &&
            Utils.ConvertResponseToDTEResponse(demographicsResponse)
              ?.isSuccess &&
            userData && (
              <HealthConditionForm
                onDataChange={async (data) => {
                  await handleSave(data);
                  history.push("/");
                }}
                onCancel={() => {
                  history.push("/");
                }}
                initialStateData={
                  userData?.healthConditions || {
                    conditions: [],
                  }
                }
                nextButtonText="Save"
                showCancelButton
              />
            )}
        </Container>
      </StyledWrapper>
    </DocumentTitle>
  );
};

export default AreasOfResearch;
