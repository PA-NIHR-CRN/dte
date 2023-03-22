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
import GenderForm, {
  GenderFormData,
} from "../../../Shared/FormElements/GenderForm";
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
import ErrorMessageContainer from "../../../Shared/ErrorMessageContainer/ErrorMessageContainer";
import Utils from "../../../../Helper/Utils";
import ConsentForm from "../StartRegistrationProcess/Stepper/Forms/ConsentForm";

const PercentageGrid = styled(Grid)`
  && {
    padding-left: 10%;
    padding-right: 10%;
  }
`;

const ContinueRegistration = () => {
  const { isNhsLinkedAccount, isInNHSApp } = useContext(AuthContext);
  const history = useHistory();
  const [isUserConsented, setIsUserConsented] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [changing, setChanging] = useState(false);
  const [pageTitle, setPageTitle] = useState(
    "What is your home address? - Volunteer Registration - Be Part of Research"
  );
  const [gaURL, setGaURL] = useState("/registration/address");
  useEffect(() => {
    if (activeStep === 9) {
      setChanging(true);
      return;
    }
    if (activeStep === 10) {
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
  const [registrationData, setRegistrationData] =
    useState<ContinueRegistrationState>({
      addressFormData: {
        address: {
          addressLine1: "",
          addressLine2: "",
          addressLine3: "",
          addressLine4: "",
          town: "",
        },
        postcode: "",
      } as AddressFormData,
      mobileFormData: {
        mobileNumber: undefined,
        landlineNumber: undefined,
      } as MobileFormData,
      ethnicity1FormData: {
        ethnicity: "",
      } as Ethnicity1FormData,
      ethnicity2FormData: {
        background: "",
      } as Ethnicity2FormData,
      disabilityFormData: {
        disability: "",
      } as DisabilityFormData,
      disability2FormData: {
        disabilityDescription: "",
      } as Disability2FormData,
      healthConditionFormData: {
        conditions: [],
      } as HealthConditionFormData,
      sexFormData: {
        sexAtBirth: "",
      } as SexFormData,
      genderFormData: {
        genderAtBirth: "",
      } as GenderFormData,
    });

  const LinearProps: LinearProgressPropsData = {
    "aria-label": "Registration",
  };

  const [{ response, loading: demographicsLoading, error }] = useAxiosFetch(
    {
      url: `${process.env.REACT_APP_BASE_API}/referencedata/demographics/ethnicity`,
      method: "GET",
    },
    { useCache: true, manual: false }
  );

  useEffect(() => {
    setLoadingText("Loading questions...");
    setLoading(demographicsLoading || false);
  }, [demographicsLoading, setLoadingText, setLoading]);

  const handleRegistrationDataChange = (
    incommingFormData:
      | AddressFormData
      | MobileFormData
      | Ethnicity1FormData
      | Ethnicity2FormData
      | DisabilityFormData
      | Disability2FormData
      | HealthConditionFormData
      | SexFormData
      | GenderFormData,
    form: string
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
        case "genderFormData":
          return {
            ...oldRegistrationData,
            genderFormData: incommingFormData as GenderFormData,
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
        activeStep !== 4 &&
        (activeStep !== 6 ||
          registrationData.disabilityFormData.disability !== "yes")
      ) {
        setActiveStep(9);
      } else {
        handleNext();
      }
    }
    if (activeStep !== 4 && activeStep !== 6) {
      setCancelData(registrationData);
    }
  }, [registrationData]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      if (
        registrationData.disabilityFormData.disability !== "yes" &&
        activeStep === 6
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
        activeStep === 8
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
    setActiveStep(9);
  };

  const nextButtonText = useMemo(
    () => (changing ? "Save" : "Continue"),
    [changing]
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
        return (
          <GenderForm
            onDataChange={(data: GenderFormData) =>
              handleRegistrationDataChange(data, "genderFormData")
            }
            initialStateData={registrationData.genderFormData}
            showCancelButton={changing}
            onCancel={handleCancel}
            nextButtonText={nextButtonText}
          />
        );
      case 4:
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
                }
              );
            }}
            initialStateData={registrationData.ethnicity1FormData}
            showCancelButton
            onCancel={handleCancel}
            referenceDataEthnicities={
              Utils.ConvertResponseToDTEResponse(response)?.content
            }
          />
        ) : (
          <Ethnicity1Form
            onDataChange={(data: Ethnicity1FormData) =>
              handleRegistrationDataChange(data, "ethnicity1FormData")
            }
            initialStateData={registrationData.ethnicity1FormData}
            referenceDataEthnicities={
              Utils.ConvertResponseToDTEResponse(response)?.content
            }
          />
        );
      case 5:
        return (
          <Ethnicity2Form
            onDataChange={(data: Ethnicity2FormData) =>
              handleRegistrationDataChange(data, "ethnicity2FormData")
            }
            initialStateData={registrationData.ethnicity2FormData}
            ethnicity={registrationData.ethnicity1FormData.ethnicity}
            referenceDataEthnicities={
              Utils.ConvertResponseToDTEResponse(response)?.content
            }
            showCancelButton={changing}
            onCancel={handleCancel}
            nextButtonText={nextButtonText}
          />
        );
      case 6:
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
                }
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
      case 7:
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
      case 8:
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
      case 9:
        return (
          <CheckAnswersForm
            initialStateData={registrationData}
            changeStep={setActiveStep}
          />
        );
      case 10:
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
        setPageTitle(
          "What is your phone number? - Volunteer Registration - Be Part of Research"
        );
        setGaURL("/registration/phone");
        break;
      case 2:
        setPageTitle(
          "What is your sex? - Volunteer Registration - Be Part of Research"
        );
        setGaURL("/registration/sex");
        break;
      case 3:
        setPageTitle(
          "Is the gender you identify with the same as your sex registered at birth? - Volunteer Registration - Be Part of Research"
        );
        setGaURL("/registration/gender");
        break;
      case 4:
        setPageTitle(
          "What is your ethnic group? - Volunteer Registration - Be Part of Research"
        );
        setGaURL("/registration/ethnicgroup");
        break;
      case 5:
        setPageTitle(
          "Which of the following best describes your ethnic background? - Volunteer Registration - Be Part of Research"
        );
        setGaURL("/registration/ethnicbackground");
        break;
      case 6:
        setPageTitle(
          "Do you have any health conditions that have lasted, or are expected to last, for 12 months or more? - Volunteer Registration - Be Part of Research"
        );
        setGaURL("/registration/conditions");
        break;
      case 7:
        setPageTitle(
          "Do any of your conditions or illnesses reduce your ability to carry out day-to-day activities? - Volunteer Registration - Be Part of Research"
        );
        setGaURL("/registration/reducedability");
        break;
      case 8:
        setPageTitle(
          "Which areas of research are you interested in? - Volunteer Registration - Be Part of Research"
        );
        setGaURL("/registration/areasofresearch");
        break;
      case 9:
        setPageTitle(
          "Check your answers before completing your registration - Volunteer Registration - Be Part of Research"
        );
        setGaURL("/registration/checkyouranswers");
        break;
      case 10:
        setPageTitle(
          "Thank you for registering with Be Part of Research - Volunteer Account - Be Part of Research"
        );
        setGaURL("/registration/complete");
        break;
      default:
        setPageTitle(
          "What is your home address? - Volunteer Registration - Be Part of Research"
        );
        setGaURL("/registration/address");
    }
  };

  const [{ response: userDetailsResponse, loading: isUserDetailsLoading }] =
    useAxiosFetch(
      {
        url: `${process.env.REACT_APP_BASE_API}/participants/details`,
        method: "GET",
      },
      {
        manual: false,
        useCache: false,
      }
    );

  useEffect(() => {
    if (userDetailsResponse) {
      const consent =
        Utils.ConvertResponseToDTEResponse(userDetailsResponse)?.content;
      if (consent) {
        setIsUserConsented(consent.consentRegistration);
      }
    }
  }, [userDetailsResponse]);

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
    }
  );

  // add a post request to the consent endpoint
  const handleConsent = () => {
    postConsent().then((res) =>
      setIsUserConsented(res.data.content.userConsents)
    );
  };

  // if consent is not given, redirect to the consent page
  if (isUserDetailsLoading) {
    return <LoadingIndicator />;
  }

  return isUserConsented || !isNhsLinkedAccount ? (
    <DocumentTitle title={pageTitle}>
      <>
        <ErrorMessageContainer
          axiosErrors={[error]}
          DTEAxiosErrors={[
            Utils.ConvertResponseToDTEResponse(response)?.errors,
          ]}
        />
        {isInNHSApp && (
          <>
            {!(activeStep === 0 || activeStep === 9 || activeStep === 10) && (
              <div className="nhsuk-width-container ">
                <DTEBackLink
                  title="Return to previous page"
                  linkText="Back"
                  onClick={handleBack}
                  ariaLabel="Return to previous page"
                />
              </div>
            )}

            <div className="nhs-app-provider-banner">
              <div className="nhsuk-width-container">
                <strong>
                  This service is provided by the National Institute for Health
                  and Care Research
                </strong>
              </div>
            </div>
          </>
        )}
        {response && Utils.ConvertResponseToDTEResponse(response)?.isSuccess && (
          <>
            <div role="complementary">
              {activeStep < 10 && (
                <DTEStepper
                  variant="progress"
                  position="static"
                  nextButton={<div />}
                  backButton={<div />}
                  steps={14}
                  LinearProgressProps={{
                    ...LinearProps,
                    value: calculatePercentageComplete(activeStep + 5, 14),
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
                      activeStep === 9 ||
                      activeStep === 10
                    ) &&
                      !isInNHSApp && (
                        <DTEBackLink
                          title="Return to previous page"
                          linkText="Back"
                          onClick={handleBack}
                        />
                      )}
                  </Grid>
                )}
                <Grid item>
                  {activeStep < 10 && (
                    <DTEContent aria-hidden>
                      {calculatePercentageComplete(activeStep + 5, 14)}%
                      complete
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
            <strong>
              This service is provided by the National Institute for Health and
              Care Research
            </strong>
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
};

export default ContinueRegistration;
