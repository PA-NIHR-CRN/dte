import { useEffect, useState, createRef } from "react";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import { useParams } from "react-router-dom";
import StepWrapper from "../../../Shared/StepWrapper/StepWrapper";
import DTEBackLink from "../../../Shared/UI/DTEBackLink/DTEBackLink";
import DTEContent from "../../../Shared/UI/DTETypography/DTEContent/DTEContent";
import DTEStepper, {
  LinearProgressPropsData,
} from "../../../Shared/UI/DTEStepper/DTEStepper";
import SelectSite, { SelectSiteData } from "./Forms/SelectSite";
import Questionnaire, { AnsweredQuestion } from "./Forms/Questionnaire";
import Consent, { ConsentData } from "./Forms/Consent";
import CheckAnswers from "./Forms/CheckAnswers";
import ThanksForApplying from "./Forms/ThanksForApplying";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";
import Utils from "../../../../Helper/Utils";
import LoadingIndicator from "../../../Shared/LoadingIndicator/LoadingIndicator";
import ErrorMessageContainer from "../../../Shared/ErrorMessageContainer/ErrorMessageContainer";

const PercentageGrid = styled(Grid)`
  && {
    padding-left: 10%;
    padding-right: 10%;
  }
`;

interface Props {
  studyid: string;
}

type ContinueSelfReferralData = {
  questionnaireData: AnsweredQuestion[];
  consentData: ConsentData;
  // remoteStudyData: any;
  selectedSiteData: SelectSiteData;
};

const ContinueSelfReferral = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { studyid } = useParams<Props>();
  const [continueSelfReferralData, setContinueSelfReferralData] =
    useState<ContinueSelfReferralData>({
      questionnaireData: [],
      consentData: {
        consent: false,
      },
      selectedSiteData: {
        identifier: "",
        name: "",
        addressLine1: "",
        addressLine2: "",
        addressLine3: "",
        addressLine4: "",
        addressLine5: "",
        postcode: "",
      },
    });

  const stepperRef = createRef<HTMLElement>();

  useEffect(() => {
    if (stepperRef?.current) {
      stepperRef.current.focus();
    }
  }, [activeStep]);

  const LinearProps: LinearProgressPropsData = {
    "aria-label": "Self referral",
  };

  const getUrl = `${process.env.REACT_APP_BASE_API}/studies/${studyid}/info`;
  const [{ response, loading, error }] = useAxiosFetch(
    {
      url: getUrl,
      method: "GET",
    },
    {
      manual: false,
      useCache: false,
    }
  );

  const getUrlSites = `${process.env.REACT_APP_BASE_API}/studies/${studyid}/sites/info`;
  const [
    { response: sitesResponse, loading: sitesLoading, error: sitesError },
  ] = useAxiosFetch(
    {
      url: getUrlSites,
      method: "GET",
    },
    {
      manual: false,
      useCache: false,
    }
  );

  const handleContinueSelfReferral = (incommingFormData: any, form: string) => {
    setContinueSelfReferralData(
      (oldContinueSelfReferralData: ContinueSelfReferralData) => {
        switch (form) {
          case "questionnaire":
            return {
              ...oldContinueSelfReferralData,
              questionnaireData: incommingFormData as AnsweredQuestion[],
            };
          case "consent":
            return {
              ...oldContinueSelfReferralData,
              consentData: incommingFormData as ConsentData,
            };
          case "selectSite":
            return {
              ...oldContinueSelfReferralData,
              selectedSiteData: incommingFormData as SelectSiteData,
            };
          default:
            return oldContinueSelfReferralData;
        }
      }
    );
    handleNext();
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        // select study site OR this is a remote study
        return (
          <SelectSite
            onSubmit={(data: SelectSiteData) =>
              handleContinueSelfReferral(data, "selectSite")
            }
            initialStateData={continueSelfReferralData.selectedSiteData}
            sites={
              Utils.ConvertResponseToDTEResponse(sitesResponse)?.content?.items
            }
          />
        );
      case 1:
        // study questionnaire
        return (
          <Questionnaire
            // onSubmit={(data: QuestionnaireData) =>
            //   handleContinueSelfReferral(data, "questionnaire")
            // }
            // initialStateData={continueSelfReferralData.questionnaireData}
            onSubmit={(data: AnsweredQuestion[]) =>
              handleContinueSelfReferral(data, "questionnaire")
            }
          />
        );
      case 2:
        return (
          <CheckAnswers
            initialStateData={continueSelfReferralData}
            changeStep={setActiveStep}
            studyTitle={
              Utils.ConvertResponseToDTEResponse(response)?.content?.title
            }
          />
        );
      case 3:
        return (
          <Consent
            initialStateData={continueSelfReferralData.consentData}
            onSubmit={(data: ConsentData) =>
              handleContinueSelfReferral(data, "consent")
            }
          />
        );
      case 4:
        return (
          <ThanksForApplying
            studyId={studyid}
            studyTitle={
              Utils.ConvertResponseToDTEResponse(response)?.content?.title
            }
            questionnaireLink={
              Utils.ConvertResponseToDTEResponse(response)?.content
                ?.studyQuestionnaireLink
            }
            data={continueSelfReferralData}
          />
        );
      default:
        return "Unknown step";
    }
  };

  const calculatePercentageComplete = (step: number, totalSteps: number) => {
    return Math.round((step / totalSteps) * 100);
  };

  return (
    <>
      <div role="complementary">
        <DTEStepper
          variant="progress"
          steps={5}
          position="static"
          activeStep={activeStep}
          nextButton={<div />}
          backButton={<div />}
          LinearProgressProps={LinearProps}
          ref={stepperRef}
        />
        <PercentageGrid
          justifyContent="space-between"
          alignItems="center"
          container
        >
          <Grid item>
            {!(activeStep === 0 || activeStep === 4) && (
              <DTEBackLink
                title="Return to previous page"
                linkText="Back"
                onClick={handleBack}
              />
            )}
          </Grid>
          <Grid item>
            <DTEContent aria-hidden>
              {calculatePercentageComplete(activeStep, 4)}% complete
            </DTEContent>
          </Grid>
        </PercentageGrid>
      </div>
      <StepWrapper>
        {(loading || sitesLoading) && <LoadingIndicator />}
        {response &&
          sitesResponse &&
          Utils.ConvertResponseToDTEResponse(response)?.isSuccess &&
          Utils.ConvertResponseToDTEResponse(sitesResponse)?.isSuccess &&
          getStepContent(activeStep)}
        <ErrorMessageContainer
          axiosErrors={[error, sitesError]}
          DTEAxiosErrors={[
            Utils.ConvertResponseToDTEResponse(response)?.errors,
            Utils.ConvertResponseToDTEResponse(sitesResponse)?.errors,
          ]}
        />
      </StepWrapper>
    </>
  );
};

export default ContinueSelfReferral;
