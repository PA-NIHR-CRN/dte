import React, { useState, createRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactGA from "react-ga";
import styled from "styled-components";
import DocumentTitle from "react-document-title";
import { Grid } from "@material-ui/core";
import StepWrapper from "../../../../Shared/StepWrapper/StepWrapper";
import NameForm, {
  NameFormData,
} from "../../../../Shared/FormElements/NameForm";
import PasswordForm, { PasswordFormData } from "./Forms/PasswordForm";
import EmailForm, { EmailFormData } from "./Forms/EmailForm";
import DTEBackLink from "../../../../Shared/UI/DTEBackLink/DTEBackLink";
import DTEStepper, {
  LinearProgressPropsData,
} from "../../../../Shared/UI/DTEStepper/DTEStepper";
import CheckEmailForm from "./Forms/CheckEmailForm";
import { RegistrationProcessState } from "../../../../../types/ParticipantTypes";
import DTEContent from "../../../../Shared/UI/DTETypography/DTEContent/DTEContent";
import ConsentForm, { ConsentFormData } from "./Forms/ConsentForm";
import NoConsent from "./Forms/NoConsent";
import LoadingIndicator from "../../../../Shared/LoadingIndicator/LoadingIndicator";

const PercentageGrid = styled(Grid)`
  && {
    padding-left: 10%;
    padding-right: 10%;
  }
`;

const RegsitrationProcess = () => {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(0);
  const [registrationPageTitle, setRegistrationPageTitle] = useState(
    "What is your name? - Volunteer Registration - Be Part of Research"
  );
  const [gaURL, setGaURL] = useState("/registration/name");
  const [registrationData, setRegistrationData] =
    useState<RegistrationProcessState>({
      nameFormData: {
        firstName: "",
        lastName: "",
      },
      emailFormData: {
        emailAddress: "",
      },
      passwordFormData: {
        password: "",
        password2: "",
      },
      consentFormData: {
        consent: false,
        consentContact: false,
      } as ConsentFormData,
    });

  const stepperRef = createRef<HTMLElement>();

  useEffect(() => {
    ReactGA.pageview(gaURL);
  }, [gaURL]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
    if (stepperRef?.current) {
      stepperRef.current.focus();
    }
    updateRegistrationPageTitle(activeStep);
  }, [activeStep]);

  const LinearProps: LinearProgressPropsData = {
    "aria-label": "Registration",
  };

  const handleRegistrationDataChange = (
    incommingFormData:
      | NameFormData
      | EmailFormData
      | PasswordFormData
      | ConsentFormData
      | any,
    form: string
  ) => {
    setRegistrationData((oldRegistrationData) => {
      switch (form) {
        case "nameFormData":
          return {
            ...oldRegistrationData,
            nameFormData: incommingFormData,
          };
        case "emailFormData":
          return {
            ...oldRegistrationData,
            emailFormData: incommingFormData,
          };
        case "passwordFormData":
          return {
            ...oldRegistrationData,
            passwordFormData: incommingFormData,
          };
        case "consentFormData":
          return {
            ...oldRegistrationData,
            consentFormData: incommingFormData,
          };
        default:
          return { ...oldRegistrationData };
      }
    });
    handleNext();
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 0) {
      history.push("/Participants/register");
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleNoConsent = () => {
    setRegistrationData({
      nameFormData: {
        firstName: "",
        lastName: "",
      },
      emailFormData: {
        emailAddress: "",
      },
      passwordFormData: {
        password: "",
        password2: "",
      },
      consentFormData: {
        consent: false,
        consentContact: false,
      } as ConsentFormData,
    });
    setActiveStep(5);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <NameForm
            onDataChange={(data: NameFormData) =>
              handleRegistrationDataChange(data, "nameFormData")
            }
            initialStateData={registrationData.nameFormData}
          />
        );
      case 1:
        return (
          <EmailForm
            onDataChange={(data: EmailFormData) =>
              handleRegistrationDataChange(data, "emailFormData")
            }
            initialStateData={registrationData.emailFormData}
          />
        );
      case 2:
        return (
          <PasswordForm
            onDataChange={(data: PasswordFormData) =>
              handleRegistrationDataChange(data, "passwordFormData")
            }
            initialStateData={registrationData.passwordFormData}
            setLoading={setLoading}
            setLoadingText={setLoadingText}
          />
        );
      case 3:
        return (
          <ConsentForm
            onDataChange={(data: ConsentFormData) =>
              handleRegistrationDataChange(data, "consentFormData")
            }
            initialStateData={registrationData.consentFormData}
            handleNoConsent={handleNoConsent}
          />
        );
      case 4:
        return (
          <CheckEmailForm
            initialStateData={registrationData}
            setLoading={setLoading}
            setLoadingText={setLoadingText}
          />
        );
      case 5:
        return <NoConsent />;
      default:
        return "Unknown step";
    }
  };

  const calculatePercentageComplete = (step: number, totalSteps: number) => {
    return Math.round((step / totalSteps) * 100);
  };

  const updateRegistrationPageTitle = (step: number) => {
    switch (step) {
      case 1:
        setRegistrationPageTitle(
          "What is your email address? - Volunteer Registration - Be Part of Research"
        );
        setGaURL("/registration/email");
        break;
      case 2:
        setRegistrationPageTitle(
          "Create a password - Volunteer Registration - Be Part of Research"
        );
        setGaURL("/registration/password");
        break;
      case 3:
        setRegistrationPageTitle(
          "Consent to process your data and be contacted - Volunteer Registration - Be Part of Research"
        );
        setGaURL("/registration/consent");
        break;
      case 4:
        setRegistrationPageTitle(
          "Registering your account - Volunteer Registration - Be Part of Research"
        );
        setGaURL("/registration/registering");
        break;
      case 5:
        setRegistrationPageTitle(
          "Your registration has been cancelled - Volunteer Registration - Be Part of Research"
        );
        setGaURL("/registration/cancelled");
        break;
      default:
        setRegistrationPageTitle(
          "What is your name? - Volunteer Registration - Be Part of Research"
        );
        setGaURL("/registration/name");
    }
  };

  return (
    <DocumentTitle title={registrationPageTitle}>
      <>
        {[0, 1, 2, 3].includes(activeStep) && (
          <div role="complementary">
            <DTEStepper
              variant="progress"
              position="static"
              nextButton={<div />}
              backButton={<div />}
              steps={14}
              LinearProgressProps={{
                ...LinearProps,
                value: calculatePercentageComplete(activeStep, 14),
              }}
              ref={stepperRef}
            />
            <PercentageGrid
              justifyContent="space-between"
              alignItems="center"
              container
            >
              <Grid item>
                {!(activeStep === 4) && (
                  <DTEBackLink
                    title="Return to previous page"
                    linkText="Back"
                    onClick={handleBack}
                  />
                )}
              </Grid>
              <Grid item>
                <DTEContent aria-hidden>
                  {calculatePercentageComplete(activeStep, 14)}% complete
                </DTEContent>
              </Grid>
            </PercentageGrid>
          </div>
        )}
        {loading && <LoadingIndicator text={loadingText} />}
        <StepWrapper>{getStepContent(activeStep)}</StepWrapper>
      </>
    </DocumentTitle>
  );
};

export default RegsitrationProcess;
