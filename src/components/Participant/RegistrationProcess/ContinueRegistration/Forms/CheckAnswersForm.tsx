import { Fragment, ReactNode, useContext } from "react";
import styled from "styled-components";
import { ContinueRegistrationState } from "../../../../../types/ParticipantTypes";
import DTEHeader from "../../../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../../../Shared/UI/DTETypography/DTEContent/DTEContent";
import DTEButton from "../../../../Shared/UI/DTEButton/DTEButton";
import DTELinkButton from "../../../../Shared/UI/DTELinkButton/DTELinkButton";
import { ContentContext } from "../../../../../context/ContentContext";

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

function CheckAnswersForm(props: CheckAnswersFormProps) {
  const { content } = useContext(ContentContext);
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
        address.address.addressLine2,
      );
    }
    if (address.address.addressLine3) {
      formattedCheckAddress = lineManagement(
        formattedCheckAddress,
        address.address.addressLine3,
      );
    }
    if (address.address.addressLine4) {
      formattedCheckAddress = lineManagement(
        formattedCheckAddress,
        address.address.addressLine4,
      );
    }
    if (address.address.town) {
      formattedCheckAddress = lineManagement(
        formattedCheckAddress,
        address.address.town,
      );
    }
    if (address.postcode) {
      formattedCheckAddress = lineManagement(
        formattedCheckAddress,
        address.postcode,
      );
    }
    return (<DTEContent>{formattedCheckAddress}</DTEContent>) as ReactNode;
  };

  return (
    <>
      <DTEHeader as="h1">{content["register2-check-answers-header"]}</DTEHeader>
      <dl className="govuk-summary-list">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            <DTEContent>{content["reusable-home-address"]}</DTEContent>
          </dt>
          <dd className="govuk-summary-list__value">
            {formatCheckDisplayAddress(initialStateData.addressFormData)}
          </dd>
          <dd className="govuk-summary-list__actions">
            <DTELinkButton onClick={() => changeStep(0)}>
              Change{" "}
              <StyledCheckHiddenText>
                {content["reusable-home-address"].toLowerCase()}
              </StyledCheckHiddenText>
            </DTELinkButton>
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            <DTEContent>
              {content["reusable-phone-number"].toLowerCase()}
            </DTEContent>
          </dt>
          <dd className="govuk-summary-list__value">
            {" "}
            {initialStateData.mobileFormData.mobileNumber && (
              <DTEContent>
                Mobile
                <br />
                {initialStateData.mobileFormData.mobileNumber}
              </DTEContent>
            )}
            {initialStateData.mobileFormData.landlineNumber && (
              <DTEContent>
                Landline
                <br />
                {initialStateData.mobileFormData.landlineNumber}
              </DTEContent>
            )}
            {!initialStateData.mobileFormData.landlineNumber &&
              !initialStateData.mobileFormData.mobileNumber && (
                <DTEContent>{content["reusable-not-provided"]}</DTEContent>
              )}
          </dd>
          <dd className="govuk-summary-list__actions">
            <DTELinkButton onClick={() => changeStep(1)}>
              Change{" "}
              <StyledCheckHiddenText>
                {content["reusable-phone-number"]}
              </StyledCheckHiddenText>
            </DTELinkButton>
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            <DTEContent>
              {content["reusable-sex-registered-at-birth"]}
            </DTEContent>
          </dt>
          <dd className="govuk-summary-list__value">
            <DTEContent>
              {initialStateData.sexFormData.sexAtBirth === "female" &&
                content["reusable-female"]}
              {initialStateData.sexFormData.sexAtBirth === "male" &&
                content["reusable-male"]}
            </DTEContent>
          </dd>
          <dd className="govuk-summary-list__actions">
            <DTELinkButton onClick={() => changeStep(2)}>
              Change{" "}
              <StyledCheckHiddenText>
                {content["reusable-sex-registered-at-birth"].toLowerCase()}
              </StyledCheckHiddenText>
            </DTELinkButton>
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            <DTEContent>
              {content[
                "reusable-gender-identity-same-as-sex-registered-at-birth"
              ].toLowerCase()}
            </DTEContent>
          </dt>
          <dd className="govuk-summary-list__value">
            <DTEContent>
              {initialStateData.sexFormData.genderAtBirth === "no" && "No"}
              {initialStateData.sexFormData.genderAtBirth === "yes" && "Yes"}
              {initialStateData.sexFormData.genderAtBirth === "noSay" &&
                content["reusable-prefer-not-to-say"]}
            </DTEContent>
          </dd>
          <dd className="govuk-summary-list__actions">
            <DTELinkButton onClick={() => changeStep(2)}>
              Change{" "}
              <StyledCheckHiddenText>
                {content[
                  "reusable-gender-identity-same-as-sex-registered-at-birth"
                ].toLowerCase()}
              </StyledCheckHiddenText>
            </DTELinkButton>
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            <DTEContent>{content["reusable-ethnic-group"]}</DTEContent>
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
            <DTELinkButton onClick={() => changeStep(3)}>
              Change{" "}
              <StyledCheckHiddenText>
                {content["reusable-ethnic-group"].toLowerCase()}
              </StyledCheckHiddenText>
            </DTELinkButton>
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            <DTEContent>{content["reusable-ethnic-background"]}</DTEContent>
          </dt>
          <dd className="govuk-summary-list__value">
            <DTEContent>
              {initialStateData.ethnicity2FormData.background}
            </DTEContent>
          </dd>
          <dd className="govuk-summary-list__actions">
            <DTELinkButton onClick={() => changeStep(4)}>
              Change{" "}
              <StyledCheckHiddenText>
                {content["reusable-ethnic-background"].toLowerCase()}
              </StyledCheckHiddenText>
            </DTELinkButton>
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            <DTEContent>
              {content["reusable-long-term-conditions-or-illness"]}
            </DTEContent>
          </dt>
          <dd className="govuk-summary-list__value">
            <DTEContent>
              {initialStateData.disabilityFormData.disability === "no" && "No"}
              {initialStateData.disabilityFormData.disability === "yes" &&
                "Yes"}
              {initialStateData.disabilityFormData.disability === "notSaying" &&
                content["reusable-prefer-not-to-say"]}
            </DTEContent>
          </dd>
          <dd className="govuk-summary-list__actions">
            <DTELinkButton onClick={() => changeStep(5)}>
              Change{" "}
              <StyledCheckHiddenText>
                {content[
                  "reusable-long-term-conditions-or-illness"
                ].toLowerCase()}
              </StyledCheckHiddenText>
            </DTELinkButton>
          </dd>
        </div>
        {initialStateData.disabilityFormData.disability === "yes" && (
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">
              <DTEContent>
                {
                  content[
                    "reusable-reduced-ability-to-carry-out-daily-activities"
                  ]
                }
              </DTEContent>
            </dt>
            <dd className="govuk-summary-list__value">
              <DTEContent>
                {initialStateData.disability2FormData.disabilityDescription}
              </DTEContent>
            </dd>
            <dd className="govuk-summary-list__actions">
              <DTELinkButton onClick={() => changeStep(6)}>
                Change{" "}
                <StyledCheckHiddenText>
                  {content[
                    "reusable-reduced-ability-to-carry-out-daily-activities"
                  ].toLowerCase()}
                </StyledCheckHiddenText>
              </DTELinkButton>
            </dd>
          </div>
        )}
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            <DTEContent>{content["reusable-areas-of-research"]}</DTEContent>
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
                  ),
                )
              ) : (
                <>{content["reusable-not-provided"]}</>
              )}
            </DTEContent>
          </dd>
          <dd className="govuk-summary-list__actions">
            <DTELinkButton onClick={() => changeStep(7)}>
              Change{" "}
              <StyledCheckHiddenText>
                {content["reusable-areas-of-research"]}
              </StyledCheckHiddenText>
            </DTELinkButton>
          </dd>
        </div>
      </dl>

      {content["register2-check-answers-body"]}

      <DTEButton onClick={() => changeStep(9)}>
        {content["register2-check-answers-button-complete-reg"]}
      </DTEButton>
    </>
  );
}

export default CheckAnswersForm;
