import { Fragment, useContext } from "react";
import styled from "styled-components";
import { ContinueRegistrationState } from "../../../../../types/ParticipantTypes";
import DTEHeader from "../../../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../../../Shared/UI/DTETypography/DTEContent/DTEContent";
import DTEButton from "../../../../Shared/UI/DTEButton/DTEButton";
import DTELinkButton from "../../../../Shared/UI/DTELinkButton/DTELinkButton";
import { formatDisplayAddress } from "../../../../../Helper/Utils";
import { ContentContext } from "../../../../../context/ContentContext";
import mapParticipantBackgrounds from "../../../../../Helper/mapParticipantBackgrounds/mapParticipantBackgrounds";
import mapParticipantDisabilityDesc from "../../../../../Helper/mapParticipantDisabilityDesc/mapParticipantDisabilityDesc";

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

  return (
    <>
      <DTEHeader as="h1" captionKey="register2-check-answers-header">
        {content["register2-check-answers-header"]}
      </DTEHeader>
      <dl className="govuk-summary-list">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            <DTEContent>{content["reusable-home-address"]}</DTEContent>
          </dt>
          <dd className="govuk-summary-list__value">{formatDisplayAddress(initialStateData.addressFormData)}</dd>
          <dd className="govuk-summary-list__actions">
            <DTELinkButton onClick={() => changeStep(0)}>
              {content["reusable-change"]}{" "}
              <StyledCheckHiddenText>{content["reusable-home-address"].toLowerCase()}</StyledCheckHiddenText>
            </DTELinkButton>
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            <DTEContent>{content["reusable-phone-number"]}</DTEContent>
          </dt>
          <dd className="govuk-summary-list__value">
            {" "}
            {initialStateData.mobileFormData.mobileNumber && (
              <DTEContent>
                {content["reusable-mobile"]}
                <br />
                {initialStateData.mobileFormData.mobileNumber}
              </DTEContent>
            )}
            {initialStateData.mobileFormData.landlineNumber && (
              <DTEContent>
                {content["reusable-landline"]}
                <br />
                {initialStateData.mobileFormData.landlineNumber}
              </DTEContent>
            )}
            {!initialStateData.mobileFormData.landlineNumber && !initialStateData.mobileFormData.mobileNumber && (
              <DTEContent>{content["reusable-not-provided"]}</DTEContent>
            )}
          </dd>
          <dd className="govuk-summary-list__actions">
            <DTELinkButton onClick={() => changeStep(1)}>
              {content["reusable-change"]}{" "}
              <StyledCheckHiddenText>{content["reusable-phone-number"].toLowerCase()}</StyledCheckHiddenText>
            </DTELinkButton>
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            <DTEContent>{content["reusable-sex-registered-at-birth"]}</DTEContent>
          </dt>
          <dd className="govuk-summary-list__value">
            <DTEContent>
              {initialStateData.sexFormData.sexAtBirth === "female" && content["reusable-female"]}
              {initialStateData.sexFormData.sexAtBirth === "male" && content["reusable-male"]}
            </DTEContent>
          </dd>
          <dd className="govuk-summary-list__actions">
            <DTELinkButton onClick={() => changeStep(2)}>
              {content["reusable-change"]}{" "}
              <StyledCheckHiddenText>{content["reusable-sex-registered-at-birth"].toLowerCase()}</StyledCheckHiddenText>
            </DTELinkButton>
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            <DTEContent>{content["reusable-gender-identity-same-as-sex-registered-at-birth"]}</DTEContent>
          </dt>
          <dd className="govuk-summary-list__value">
            <DTEContent>
              {initialStateData.sexFormData.genderAtBirth === "no" && content["reusable-no"]}
              {initialStateData.sexFormData.genderAtBirth === "yes" && content["reusable-yes"]}
              {initialStateData.sexFormData.genderAtBirth === "noSay" && content["reusable-prefer-not-to-say"]}
            </DTEContent>
          </dd>
          <dd className="govuk-summary-list__actions">
            <DTELinkButton onClick={() => changeStep(2)}>
              {content["reusable-change"]}{" "}
              <StyledCheckHiddenText>
                {content["reusable-gender-identity-same-as-sex-registered-at-birth"].toLowerCase()}
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
              {initialStateData.ethnicity1FormData.ethnicity === "asian" && content["reusable-asian"]}
              {initialStateData.ethnicity1FormData.ethnicity === "black" && content["reusable-black"]}
              {initialStateData.ethnicity1FormData.ethnicity === "mixed" && content["reusable-mixed"]}
              {initialStateData.ethnicity1FormData.ethnicity === "white" && content["reusable-white"]}
              {initialStateData.ethnicity1FormData.ethnicity === "other" && content["reusable-other"]}
            </DTEContent>
          </dd>
          <dd className="govuk-summary-list__actions">
            <DTELinkButton onClick={() => changeStep(3)}>
              {content["reusable-change"]}{" "}
              <StyledCheckHiddenText>{content["reusable-ethnic-group"].toLowerCase()}</StyledCheckHiddenText>
            </DTELinkButton>
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            <DTEContent>{content["reusable-ethnic-background"]}</DTEContent>
          </dt>
          <dd className="govuk-summary-list__value">
            <DTEContent>
              {mapParticipantBackgrounds(initialStateData.ethnicity2FormData.background, content)}
            </DTEContent>
          </dd>
          <dd className="govuk-summary-list__actions">
            <DTELinkButton onClick={() => changeStep(4)}>
              {content["reusable-change"]}{" "}
              <StyledCheckHiddenText>{content["reusable-ethnic-background"].toLowerCase()}</StyledCheckHiddenText>
            </DTELinkButton>
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            <DTEContent>{content["reusable-long-term-conditions-or-illness"]}</DTEContent>
          </dt>
          <dd className="govuk-summary-list__value">
            <DTEContent>
              {initialStateData.disabilityFormData.disability === "no" && content["reusable-no"]}
              {initialStateData.disabilityFormData.disability === "yes" && content["reusable-yes"]}
              {initialStateData.disabilityFormData.disability === "notSaying" && content["reusable-prefer-not-to-say"]}
            </DTEContent>
          </dd>
          <dd className="govuk-summary-list__actions">
            <DTELinkButton onClick={() => changeStep(5)}>
              {content["reusable-change"]}{" "}
              <StyledCheckHiddenText>
                {content["reusable-long-term-conditions-or-illness"].toLowerCase()}
              </StyledCheckHiddenText>
            </DTELinkButton>
          </dd>
        </div>
        {initialStateData.disabilityFormData.disability === "yes" && (
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">
              <DTEContent>{content["reusable-reduced-ability-to-carry-out-daily-activities"]}</DTEContent>
            </dt>
            <dd className="govuk-summary-list__value">
              <DTEContent>
                {mapParticipantDisabilityDesc(
                  initialStateData.disability2FormData.disabilityDescription as string,
                  content
                )}
              </DTEContent>
            </dd>
            <dd className="govuk-summary-list__actions">
              <DTELinkButton onClick={() => changeStep(6)}>
                {content["reusable-change"]}{" "}
                <StyledCheckHiddenText>
                  {content["reusable-reduced-ability-to-carry-out-daily-activities"].toLowerCase()}
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
              {initialStateData.healthConditionFormData.conditions.length > 0 ? (
                initialStateData.healthConditionFormData.conditions.map((condition) => (
                  <Fragment key={condition}>
                    {condition}
                    <br />
                  </Fragment>
                ))
              ) : (
                <>{content["reusable-not-provided"]}</>
              )}
            </DTEContent>
          </dd>
          <dd className="govuk-summary-list__actions">
            <DTELinkButton onClick={() => changeStep(7)}>
              {content["reusable-change"]}{" "}
              <StyledCheckHiddenText>{content["reusable-areas-of-research"]}</StyledCheckHiddenText>
            </DTELinkButton>
          </dd>
        </div>
      </dl>

      {content["register2-check-answers-body"]}

      <DTEButton onClick={() => changeStep(9)}>{content["register2-check-answers-button-complete-reg"]}</DTEButton>
    </>
  );
}

export default CheckAnswersForm;
