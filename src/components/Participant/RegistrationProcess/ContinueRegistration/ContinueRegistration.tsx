import { useHistory } from "react-router-dom";
import React, {
  useEffect,
  createRef,
  useState,
  useMemo,
  useContext,
} from "react";
import ReactGA from "react-ga";
import styled from "styled-components";
import DocumentTitle from "react-document-title";
import { Grid } from "@material-ui/core";
import StepWrapper from "../../../Shared/StepWrapper/StepWrapper";
import AddressForm, {
  AddressFormData,
} from "../../../Shared/FormElements/AddressForm";
import DTEContent from "../../../Shared/UI/DTETypography/DTEContent/DTEContent";
import DTEBackLink from "../../../Shared/UI/DTEBackLink/DTEBackLink";
import DTEStepper, {
  LinearProgressPropsData,
} from "../../../Shared/UI/DTEStepper/DTEStepper";
import { ContinueRegistrationState } from "../../../../types/ParticipantTypes";
import CheckAnswersForm from "./Forms/CheckAnswersForm";
import DisabilityForm, {
  DisabilityFormData,
} from "../../../Shared/FormElements/DisabilityForm";
import Disability2Form, {
  Disability2FormData,
} from "../../../Shared/FormElements/Disability2Form";
import Ethnicity1Form, {
  Ethnicity1FormData,
} from "../../../Shared/FormElements/EthnicityFormComponents/Ethnicity1Form";
import Ethnicity2Form, {
  Ethnicity2FormData,
} from "../../../Shared/FormElements/EthnicityFormComponents/Ethnicity2Form";
import HealthConditionsForm, {
  HealthConditionFormData,
} from "../../../Shared/FormElements/HealthConditionForm";
import MobileNumberForm, {
  MobileFormData,
} from "../../../Shared/FormElements/MobileNumberForm";
import SexForm, { SexFormData } from "../../../Shared/FormElements/SexForm";
import YouAreNowRegisteredForm from "./Forms/YouAreNowRegisteredForm";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";
import { AuthContext } from "../../../../context/AuthContext";
import LoadingIndicator from "../../../Shared/LoadingIndicator/LoadingIndicator";
import Utils from "../../../../Helper/Utils";
import ConsentForm from "../StartRegistrationProcess/Stepper/Forms/ConsentForm";
import { ContentContext } from "../../../../context/ContentContext";
import { UserContext } from "../../../../context/UserContext";

const PercentageGrid = styled(Grid)`
  && {
    padding-left: 10%;
    padding-right: 10%;
  }
`;

function ContinueRegistration() {
  const { content } = useContext(ContentContext);
  const { isNhsLinkedAccount, isInNHSApp } = useContext(AuthContext);
  const {
    continueRegistrationActiveStep: activeStep,
    setContinueRegistrationActiveStep: setActiveStep,
    continueRegistrationData: registrationData,
    setContinueRegistrationData: setRegistrationData,
  } = useContext(UserContext);
  const history = useHistory();
  const [isUserConsented, setIsUserConsented] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState(content["reusable-loading"]);
  const [changing, setChanging] = useState(false);
  const [pageTitle, setPageTitle] = useState(
    content["register2-address-document-title"],
  );
  const [gaURL, setGaURL] = useState("/registration/address");
  useEffect(() => {
    if (activeStep === 8) {
      setChanging(true);
      return;
    }
    if (activeStep === 9) {
      setChanging(false);
    }
  }, [activeStep]);

  const stepperRef = createRef<HTMLElement>();

  useEffect(() => {
    ReactGA.pageview(gaURL);
  }, [gaURL]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
    if (stepperRef?.current) {
      stepperRef.current.focus();
    }
    updatePageTitle(activeStep);
  }, [activeStep]);

  const [cancelData, setCancelData] =
    useState<ContinueRegistrationState | null>(null);

  const LinearProps: LinearProgressPropsData = {
    "aria-label": "Registration",
  };

  useEffect(() => {
    setLoadingText("Loading questions...");
    setLoading(loading || false);
  }, [loading, setLoadingText, setLoading]);

  const handleRegistrationDataChange = (
    incommingFormData:
      | AddressFormData
      | MobileFormData
      | Ethnicity1FormData
      | Ethnicity2FormData
      | DisabilityFormData
      | Disability2FormData
      | HealthConditionFormData
      | SexFormData,
    form: string,
  ) => {
    setRegistrationData((oldRegistrationData: ContinueRegistrationState) => {
      switch (form) {
        case "addressFormData":
          return {
            ...oldRegistrationData,
            addressFormData: incommingFormData as AddressFormData,
          };
        case "mobileFormData":
          return {
            ...oldRegistrationData,
            mobileFormData: incommingFormData as MobileFormData,
          };

        case "ethnicity1FormData":
          return {
            ...oldRegistrationData,
            ethnicity1FormData: incommingFormData as Ethnicity1FormData,
            ethnicity2FormData: {
              background: "",
              otherText: undefined,
            },
          };
        case "ethnicity2FormData":
          return {
            ...oldRegistrationData,
            ethnicity2FormData: incommingFormData as Ethnicity2FormData,
          };
        case "disabilityFormData":
          return {
            ...oldRegistrationData,
            disabilityFormData: incommingFormData as DisabilityFormData,
          };
        case "disability2FormData":
          return {
            ...oldRegistrationData,
            disability2FormData: incommingFormData as Disability2FormData,
          };
        case "healthConditionFormData":
          return {
            ...oldRegistrationData,
            healthConditionFormData:
              incommingFormData as HealthConditionFormData,
          };
        case "sexFormData":
          return {
            ...oldRegistrationData,
            sexFormData: incommingFormData as SexFormData,
          };
        default:
          return { ...oldRegistrationData };
      }
    });
  };

  useEffect(() => {
    if (registrationData.addressFormData.address.addressLine1) {
      if (
        changing &&
        activeStep !== 3 &&
        (activeStep !== 5 ||
          registrationData.disabilityFormData.disability !== "yes")
      ) {
        setActiveStep(8);
      } else {
        handleNext();
      }
    }
    if (activeStep !== 3 && activeStep !== 5) {
      setCancelData(registrationData);
    }
  }, [registrationData]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      if (
        registrationData.disabilityFormData.disability !== "yes" &&
        activeStep === 5
      ) {
        return prevActiveStep + 2;
      }
      return prevActiveStep + 1;
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => {
      if (
        registrationData.disabilityFormData.disability !== "yes" &&
        activeStep === 7
      ) {
        return prevActiveStep - 2;
      }
      return prevActiveStep - 1;
    });
  };

  const handleCancel = () => {
    if (cancelData) {
      setRegistrationData(cancelData);
    }
    setActiveStep(8);
  };

  const nextButtonText = useMemo(
    () =>
      changing ? content["reusable-save"] : content["reusable-button-continue"],
    [changing],
  );

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <AddressForm
            onDataChange={(data: AddressFormData) =>
              handleRegistrationDataChange(data, "addressFormData")
            }
            initialStateData={registrationData.addressFormData}
            showCancelButton={changing}
            onCancel={handleCancel}
            nextButtonText={nextButtonText}
          />
        );
      case 1:
        return (
          <MobileNumberForm
            onDataChange={(data: MobileFormData) =>
              handleRegistrationDataChange(data, "mobileFormData")
            }
            initialStateData={registrationData.mobileFormData}
            showCancelButton={changing}
            onCancel={handleCancel}
            nextButtonText={nextButtonText}
          />
        );
      case 2:
        return (
          <SexForm
            onDataChange={(data: SexFormData) =>
              handleRegistrationDataChange(data, "sexFormData")
            }
            initialStateData={registrationData.sexFormData}
            showCancelButton={changing}
            onCancel={handleCancel}
            nextButtonText={nextButtonText}
          />
        );
      case 3:
        return changing ? (
          <Ethnicity1Form
            onDataChange={(data: Ethnicity1FormData) => {
              setRegistrationData(
                (oldRegistrationData: ContinueRegistrationState) => {
                  return {
                    ...oldRegistrationData,
                    ethnicity1FormData: data,
                    ethnicity2FormData:
                      data.ethnicity ===
                      cancelData?.ethnicity1FormData.ethnicity
                        ? oldRegistrationData.ethnicity2FormData
                        : {
                            background: "",
                            otherText: undefined,
                          },
                  };
                },
              );
            }}
            initialStateData={registrationData.ethnicity1FormData}
            showCancelButton
            onCancel={handleCancel}
          />
        ) : (
          <Ethnicity1Form
            onDataChange={(data: Ethnicity1FormData) =>
              handleRegistrationDataChange(data, "ethnicity1FormData")
            }
            initialStateData={registrationData.ethnicity1FormData}
          />
        );
      case 4:
        return (
          <Ethnicity2Form
            onDataChange={(data: Ethnicity2FormData) =>
              handleRegistrationDataChange(data, "ethnicity2FormData")
            }
            initialStateData={registrationData.ethnicity2FormData}
            ethnicity={registrationData.ethnicity1FormData.ethnicity}
            showCancelButton={changing}
            onCancel={handleCancel}
            nextButtonText={nextButtonText}
          />
        );
      case 5:
        return changing ? (
          <DisabilityForm
            onDataChange={(data: DisabilityFormData) => {
              setRegistrationData(
                (oldRegistrationData: ContinueRegistrationState) => {
                  return {
                    ...oldRegistrationData,
                    disabilityFormData: data,
                    disability2FormData: {
                      disability: "",
                      disabilityDescription:
                        data.disability === "yes"
                          ? oldRegistrationData.disability2FormData
                              .disabilityDescription
                          : undefined,
                    },
                  };
                },
              );
              if (data.disability === "no") {
                setCancelData((oldCancelData: any) => {
                  return {
                    ...oldCancelData,
                    disabilityFormData: data,
                    disability2FormData: {
                      disabilityDescription: undefined,
                    },
                  };
                });
              }
            }}
            initialStateData={registrationData.disabilityFormData}
            showCancelButton
            onCancel={handleCancel}
            nextButtonText={nextButtonText}
          />
        ) : (
          <DisabilityForm
            onDataChange={(data: DisabilityFormData) =>
              handleRegistrationDataChange(data, "disabilityFormData")
            }
            initialStateData={registrationData.disabilityFormData}
            nextButtonText={nextButtonText}
          />
        );
      case 6:
        return (
          <Disability2Form
            onDataChange={(data: Disability2FormData) =>
              handleRegistrationDataChange(data, "disability2FormData")
            }
            initialStateData={registrationData.disability2FormData}
            showCancelButton={changing}
            onCancel={handleCancel}
            nextButtonText={nextButtonText}
          />
        );
      case 7:
        return (
          <HealthConditionsForm
            onDataChange={(data: HealthConditionFormData) =>
              handleRegistrationDataChange(data, "healthConditionFormData")
            }
            initialStateData={registrationData.healthConditionFormData}
            showCancelButton={changing}
            onCancel={handleCancel}
            nextButtonText={nextButtonText}
          />
        );
      case 8:
        return (
          <CheckAnswersForm
            initialStateData={registrationData}
            changeStep={setActiveStep}
          />
        );
      case 9:
        return (
          <YouAreNowRegisteredForm
            data={registrationData}
            setLoading={setLoading}
            setLoadingText={setLoadingText}
          />
        );

      default:
        return "Unknown step";
    }
  };

  const calculatePercentageComplete = (step: number, totalSteps: number) => {
    return Math.round((step / totalSteps) * 100);
  };

  const updatePageTitle = (step: number) => {
    switch (step) {
      case 1:
        setPageTitle(content["register2-phone-document-title"]);
        setGaURL("/registration/phone");
        break;
      case 2:
        setPageTitle(content["register2-sex-gender-document-title"]);
        setGaURL("/registration/sex");
        break;
      case 3:
        setPageTitle(content["register2-ethnic-group-document-title"]);
        setGaURL("/registration/ethnicgroup");
        break;
      case 4:
        setPageTitle(content["register2-ethnic-background-document-title"]);
        setGaURL("/registration/ethnicbackground");
        break;
      case 5:
        setPageTitle(content["register2-disability-document-title"]);
        setGaURL("/registration/conditions");
        break;
      case 6:
        setPageTitle(content["register2-reduced-ability-document-title"]);
        setGaURL("/registration/reducedability");
        break;
      case 7:
        setPageTitle(content["register2-health-conditions-document-title"]);
        setGaURL("/registration/areasofresearch");
        break;
      case 8:
        setPageTitle(content["register2-check-your-answers-document-title"]);
        setGaURL("/registration/checkyouranswers");
        break;
      case 9:
        setPageTitle(
          content["register2-you-are-now-registered-document-title"],
        );
        setGaURL("/registration/complete");
        break;
      default:
        setPageTitle(content["register2-address-document-title"]);
        setGaURL("/registration/address");
    }
  };

  const [{ response, loading: loadingDetails }] = useAxiosFetch(
    {
      url: `${process.env.REACT_APP_BASE_API}/participants/details`,
      method: "GET",
    },
    {
      manual: false,
      useCache: false,
    },
  );

  useEffect(() => {
    if (response) {
      const consent = Utils.ConvertResponseToDTEResponse(response)?.content;
      if (consent) {
        setIsUserConsented(consent.consentRegistration);
      }
    }
  }, [response]);

  const [, postConsent] = useAxiosFetch(
    {
      url: `${process.env.REACT_APP_BASE_API}/users/nhssignup`,
      method: "POST",
      data: {
        consentRegistration: true,
      },
    },
    {
      manual: true,
      useCache: false,
    },
  );

  // add a post request to the consent endpoint
  const handleConsent = () => {
    postConsent().then((res) =>
      setIsUserConsented(res.data.content.userConsents),
    );
  };

  // if consent is not given, redirect to the consent page
  if (loadingDetails) {
    return <LoadingIndicator text={content["reusable-loading"]} />;
  }

  return isUserConsented || !isNhsLinkedAccount ? (
    <DocumentTitle title={pageTitle}>
      <>
        {isInNHSApp && (
          <>
            {!(activeStep === 0 || activeStep === 8 || activeStep === 9) && (
              <div className="nhsuk-width-container ">
                <DTEBackLink
                  title={content["reusable-aria-go-back"]}
                  linkText={content["reusable-back-link"]}
                  onClick={handleBack}
                  ariaLabel={content["reusable-aria-go-back"]}
                />
              </div>
            )}

            <div className="nhs-app-provider-banner">
              <div className="nhsuk-width-container">
                {content["reusable-nhs-app-provider-banner"]}
              </div>
            </div>
          </>
        )}
        {response && (
          <>
            <div role="complementary">
              {activeStep < 9 && (
                <DTEStepper
                  variant="progress"
                  position="static"
                  nextButton={<div />}
                  backButton={<div />}
                  steps={14}
                  LinearProgressProps={{
                    ...LinearProps,
                    value: calculatePercentageComplete(activeStep + 5, 13),
                  }}
                  ref={stepperRef}
                />
              )}
              <PercentageGrid
                justifyContent="space-between"
                alignItems="center"
                container
              >
                {changing ? (
                  <Grid item />
                ) : (
                  <Grid item>
                    {!(
                      activeStep === 0 ||
                      activeStep === 8 ||
                      activeStep === 9
                    ) &&
                      !isInNHSApp && (
                        <DTEBackLink
                          title={content["reusable-aria-go-back"]}
                          linkText={content["reusable-back-link"]}
                          onClick={handleBack}
                        />
                      )}
                  </Grid>
                )}
                <Grid item>
                  {activeStep < 9 && (
                    <DTEContent aria-hidden>
                      {calculatePercentageComplete(activeStep + 5, 13)}%
                      {content["reusable-progress-complete"]}
                    </DTEContent>
                  )}
                </Grid>
              </PercentageGrid>
            </div>
            {loading && <LoadingIndicator text={loadingText} />}
            <StepWrapper>{getStepContent(activeStep)}</StepWrapper>
          </>
        )}
      </>
    </DocumentTitle>
  ) : (
    <>
      {isInNHSApp && (
        <div className="nhs-app-provider-banner">
          <div className="nhsuk-width-container">
            {content["reusable-nhs-app-provider-banner"]}
          </div>
        </div>
      )}
      <StepWrapper>
        <ConsentForm
          onDataChange={handleConsent}
          initialStateData={{
            consent: false,
            consentContact: false,
          }}
          handleNoConsent={() => {
            history.push("/NhsNoVsConsent");
          }}
        />
      </StepWrapper>
    </>
  );
}

export default ContinueRegistration;
