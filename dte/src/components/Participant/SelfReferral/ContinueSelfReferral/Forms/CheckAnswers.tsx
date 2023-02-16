import DTEHR from "../../../../Shared/UI/DTEHR/DTEHR";
import DTELinkButton from "../../../../Shared/UI/DTELinkButton/DTELinkButton";
import DTEButton from "../../../../Shared/UI/DTEButton/DTEButton";
import DTEHeader from "../../../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../../../Shared/UI/DTETypography/DTEContent/DTEContent";
import { AnsweredQuestion } from "./Questionnaire";

interface Props {
  studyTitle: string;
  initialStateData: any;
  changeStep: (step: number) => void;
}

const CheckAnswers = (props: Props) => {
  const { studyTitle, initialStateData, changeStep } = props;

  return (
    <>
      <DTEHeader as="h1">Review and check your answers for the study</DTEHeader>
      <DTEHeader as="h2" $variant="h4">
        {studyTitle}
      </DTEHeader>
      <DTEHR />
      <DTEContent as="strong" $marginBottom="small">
        Research location
      </DTEContent>
      <DTEContent>{initialStateData.selectedSiteData.name}</DTEContent>
      <DTEContent>
        {[
          initialStateData.selectedSiteData.addressLine1,
          initialStateData.selectedSiteData.addressLine2,
          initialStateData.selectedSiteData.addressLine3,
          initialStateData.selectedSiteData.addressLine4,
          initialStateData.selectedSiteData.addressLine5,
          initialStateData.selectedSiteData.postcode,
        ]
          .filter((e: string | null | undefined) => e)
          .join(", ") || "No address"}
      </DTEContent>
      <DTELinkButton onClick={() => changeStep(0)}>Change</DTELinkButton>
      <DTEHR />
      <DTEContent as="strong" $marginBottom="small">
        Questionnaire
      </DTEContent>
      {initialStateData.questionnaireData.map((question: AnsweredQuestion) => {
        return (
          <div key={question.question.question}>
            <DTEContent>{question.question.question}</DTEContent>
            <DTEContent>
              <i>{question.answer}</i>
            </DTEContent>
          </div>
        );
      })}
      <DTELinkButton onClick={() => changeStep(1)}>Change</DTELinkButton>
      <DTEHR />
      <DTEButton onClick={() => changeStep(3)}>Accept and continue</DTEButton>
    </>
  );
};

export default CheckAnswers;
