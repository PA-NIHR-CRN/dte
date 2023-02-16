import { Fragment, ReactNode } from "react";
import styled from "styled-components";
import { ContinueRegistrationState } from "../../../../../types/ParticipantTypes";
import DTEHeader from "../../../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../../../Shared/UI/DTETypography/DTEContent/DTEContent";
import DTEButton from "../../../../Shared/UI/DTEButton/DTEButton";
import DTELinkButton from "../../../../Shared/UI/DTELinkButton/DTELinkButton";

interface CheckAnswersFormProps {
  initialStateData: ContinueRegistrationState;
  changeStep: (step: number) => void;
}

const StyledCheckHiddenText = styled.span`
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

const CheckAnswersForm = (props: CheckAnswersFormProps) => {
  const { initialStateData, changeStep } = props;

  const formatCheckDisplayAddress = (address: any) => {
    let formattedCheckAddress: ReactNode = <></>;

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
      formattedCheckAddress = address.address.addressLine1;
    }
    if (address.address.addressLine2) {
      formattedCheckAddress = lineManagement(
        formattedCheckAddress,
        address.address.addressLine2
      );
    }
    if (address.address.addressLine3) {
      formattedCheckAddress = lineManagement(
        formattedCheckAddress,
        address.address.addressLine3
      );
    }
    if (address.address.addressLine4) {
      formattedCheckAddress = lineManagement(
        formattedCheckAddress,
        address.address.addressLine4
      );
    }
    if (address.address.town) {
      formattedCheckAddress = lineManagement(
        formattedCheckAddress,
        address.address.town
      );
    }
    if (address.postcode) {
      formattedCheckAddress = lineManagement(
        formattedCheckAddress,
        address.postcode
      );
    }
    return (<DTEContent>{formattedCheckAddress}</DTEContent>) as ReactNode;
  };

  return (
    <>
      <DTEHeader as="h1">
        Check your answers before completing your registration
      </DTEHeader>
      <dl className="govuk-summary-list">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            <DTEContent>Home address</DTEContent>
          </dt>
          <dd className="govuk-summary-list__value">
            {formatCheckDisplayAddress(initialStateData.addressFormData)}
          </dd>
          <dd className="govuk-summary-list__actions">
            <DTELinkButton onClick={() => changeStep(0)}>
              Change <StyledCheckHiddenText>home address</StyledCheckHiddenText>
            </DTELinkButton>
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            <DTEContent>Phone number</DTEContent>
          </dt>
          <dd className="govuk-summary-list__value">
            {" "}
            {initialStateData.mobileFormData.mobileNumber && (
              <>
                <DTEContent>
                  Mobile
                  <br />
                  {initialStateData.mobileFormData.mobileNumber}
                </DTEContent>
              </>
            )}
            {initialStateData.mobileFormData.landlineNumber && (
              <>
                <DTEContent>
                  Landline
                  <br />
                  {initialStateData.mobileFormData.landlineNumber}
                </DTEContent>
              </>
            )}
            {!initialStateData.mobileFormData.landlineNumber &&
              !initialStateData.mobileFormData.mobileNumber && (
                <>
                  <DTEContent>Not provided</DTEContent>
                </>
              )}
          </dd>
          <dd className="govuk-summary-list__actions">
            <DTELinkButton onClick={() => changeStep(1)}>
              Change <StyledCheckHiddenText>phone number</StyledCheckHiddenText>
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
                parseInt(initialStateData.dobFormData.year, 10),
                parseInt(initialStateData.dobFormData.month, 10) - 1,
                parseInt(initialStateData.dobFormData.day, 10),
                12
              ).toLocaleString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </DTEContent>
          </dd>
          <dd className="govuk-summary-list__actions">
            <DTELinkButton onClick={() => changeStep(2)}>
              Change{" "}
              <StyledCheckHiddenText>date of birth</StyledCheckHiddenText>
            </DTELinkButton>
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            <DTEContent>Sex registered at birth</DTEContent>
          </dt>
          <dd className="govuk-summary-list__value">
            <DTEContent>
              {initialStateData.sexFormData.sexAtBirth === "female" && "Female"}
              {initialStateData.sexFormData.sexAtBirth === "male" && "Male"}
            </DTEContent>
          </dd>
          <dd className="govuk-summary-list__actions">
            <DTELinkButton onClick={() => changeStep(3)}>
              Change{" "}
              <StyledCheckHiddenText>
                sex registered at birth
              </StyledCheckHiddenText>
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
              {initialStateData.genderFormData.genderAtBirth === "no" && "No"}
              {initialStateData.genderFormData.genderAtBirth === "yes" && "Yes"}
              {initialStateData.genderFormData.genderAtBirth === "noSay" &&
                "Prefer not to say"}
            </DTEContent>
          </dd>
          <dd className="govuk-summary-list__actions">
            <DTELinkButton onClick={() => changeStep(4)}>
              Change{" "}
              <StyledCheckHiddenText>
                gender identity same as sex registered at birth
              </StyledCheckHiddenText>
            </DTELinkButton>
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            <DTEContent>Ethnic group</DTEContent>
          </dt>
          <dd className="govuk-summary-list__value">
            <DTEContent>
              {initialStateData.ethnicity1FormData.ethnicity === "asian" &&
                "Asian or Asian British"}
              {initialStateData.ethnicity1FormData.ethnicity === "black" &&
                "Black, African, Caribbean or Black British"}
              {initialStateData.ethnicity1FormData.ethnicity === "mixed" &&
                "Mixed or multiple ethnic groups"}
              {initialStateData.ethnicity1FormData.ethnicity === "white" &&
                "White"}
              {initialStateData.ethnicity1FormData.ethnicity === "other" &&
                "Other ethnic group"}
            </DTEContent>
          </dd>
          <dd className="govuk-summary-list__actions">
            <DTELinkButton onClick={() => changeStep(5)}>
              Change <StyledCheckHiddenText>ethnic group</StyledCheckHiddenText>
            </DTELinkButton>
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            <DTEContent>Ethnic background</DTEContent>
          </dt>
          <dd className="govuk-summary-list__value">
            <DTEContent>
              {initialStateData.ethnicity2FormData.background}
            </DTEContent>
          </dd>
          <dd className="govuk-summary-list__actions">
            <DTELinkButton onClick={() => changeStep(6)}>
              Change{" "}
              <StyledCheckHiddenText>ethnic background</StyledCheckHiddenText>
            </DTELinkButton>
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            <DTEContent>Long-term conditions or illness</DTEContent>
          </dt>
          <dd className="govuk-summary-list__value">
            <DTEContent>
              {initialStateData.disabilityFormData.disability === "no" && "No"}
              {initialStateData.disabilityFormData.disability === "yes" &&
                "Yes"}
              {initialStateData.disabilityFormData.disability === "notSaying" &&
                "Prefer not to say"}
            </DTEContent>
          </dd>
          <dd className="govuk-summary-list__actions">
            <DTELinkButton onClick={() => changeStep(7)}>
              Change{" "}
              <StyledCheckHiddenText>
                long-term conditions or illness
              </StyledCheckHiddenText>
            </DTELinkButton>
          </dd>
        </div>
        {initialStateData.disabilityFormData.disability === "yes" && (
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">
              <DTEContent>
                Reduced ability to carry out daily activities
              </DTEContent>
            </dt>
            <dd className="govuk-summary-list__value">
              <DTEContent>
                {initialStateData.disability2FormData.disabilityDescription}
              </DTEContent>
            </dd>
            <dd className="govuk-summary-list__actions">
              <DTELinkButton onClick={() => changeStep(8)}>
                Change{" "}
                <StyledCheckHiddenText>
                  reduced ability to carry out daily activities
                </StyledCheckHiddenText>
              </DTELinkButton>
            </dd>
          </div>
        )}
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            <DTEContent>Areas of research</DTEContent>
          </dt>
          <dd className="govuk-summary-list__value">
            <DTEContent>
              {initialStateData.healthConditionFormData.conditions.length >
              0 ? (
                initialStateData.healthConditionFormData.conditions.map(
                  (condition) => (
                    <Fragment key={condition}>
                      {condition}
                      <br />
                    </Fragment>
                  )
                )
              ) : (
                <>Not provided</>
              )}
            </DTEContent>
          </dd>
          <dd className="govuk-summary-list__actions">
            <DTELinkButton onClick={() => changeStep(9)}>
              Change{" "}
              <StyledCheckHiddenText>areas of research</StyledCheckHiddenText>
            </DTELinkButton>
          </dd>
        </div>
      </dl>

      <DTEContent>
        If you need to change any of your answers later, you can do this in your
        Be Part of Research account.
      </DTEContent>

      <DTEButton onClick={() => changeStep(11)}>
        Complete registration
      </DTEButton>
    </>
  );
};

export default CheckAnswersForm;
