import React, { useState, createRef, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import ReactGA from "react-ga";
import styled from "styled-components";
import DocumentTitle from "react-document-title";
import { Grid } from "@material-ui/core";
import StepWrapper from "../../../../Shared/StepWrapper/StepWrapper";
import NameForm, { NameFormData } from "../../../../Shared/FormElements/NameForm";
import PasswordForm, { PasswordFormData } from "./Forms/PasswordForm";
import DOBForm, { DOBFormData } from "../../../../Shared/FormElements/DOBForm";
import EmailForm, { EmailFormData } from "./Forms/EmailForm";
import DTEBackLink from "../../../../Shared/UI/DTEBackLink/DTEBackLink";
import DTEStepper, { LinearProgressPropsData } from "../../../../Shared/UI/DTEStepper/DTEStepper";
import CheckEmailForm from "./Forms/CheckEmailForm";
import DTEContent from "../../../../Shared/UI/DTETypography/DTEContent/DTEContent";
import ConsentForm, { ConsentFormData } from "./Forms/ConsentForm";
import NoConsent from "./Forms/NoConsent";
import LoadingIndicator from "../../../../Shared/LoadingIndicator/LoadingIndicator";
import { ContentContext } from "../../../../../context/ContentContext";
import { UserContext } from "../../../../../context/UserContext";
import calculatePercentageComplete from "../../../../../Helper/calculatePercentageComplete/calculatePercentageComplete";

const PercentageGrid = styled(Grid)`
  && {
    padding-left: 10%;
    padding-right: 10%;
  }
`;

function RegsitrationProcess() {
  const { content } = useContext(ContentContext);
  const { activeStep, setActiveStep, registrationData, setRegistrationData } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState(content["reusable-loading"]);
  const history = useHistory();
  const [registrationPageTitle, setRegistrationPageTitle] = useState(content["register-name-document-title"]);
  const [gaURL, setGaURL] = useState("/registration/name");

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
    incommingFormData: NameFormData | DOBFormData | EmailFormData | PasswordFormData | ConsentFormData | any,
    form: string
  ) => {
    setRegistrationData((oldRegistrationData) => {
      switch (form) {
        case "nameFormData":
          return {
            ...oldRegistrationData,
            nameFormData: incommingFormData,
          };
        case "dobFormData":
          return {
            ...oldRegistrationData,
            dobFormData: incommingFormData as DOBFormData,
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
      history.goBack();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleNoConsent = () => {
    setRegistrationData({
      dobFormData: {
        day: "",
        month: "",
        year: "",
      },
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
    setActiveStep(6);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <NameForm
            onDataChange={(data: NameFormData) => handleRegistrationDataChange(data, "nameFormData")}
            initialStateData={registrationData.nameFormData}
          />
        );
      case 1:
        return (
          <DOBForm
            onDataChange={(data: DOBFormData) => handleRegistrationDataChange(data, "dobFormData")}
            initialStateData={registrationData.dobFormData}
            nextButtonText={content["reusable-button-continue"]}
          />
        );
      case 2:
        return (
          <EmailForm
            onDataChange={(data: EmailFormData) => handleRegistrationDataChange(data, "emailFormData")}
            initialStateData={registrationData.emailFormData}
          />
        );
      case 3:
        return (
          <PasswordForm
            onDataChange={(data: PasswordFormData) => handleRegistrationDataChange(data, "passwordFormData")}
            initialStateData={registrationData.passwordFormData}
            setLoading={setLoading}
            setLoadingText={setLoadingText}
          />
        );
      case 4:
        return (
          <ConsentForm
            onDataChange={(data: ConsentFormData) => handleRegistrationDataChange(data, "consentFormData")}
            initialStateData={registrationData.consentFormData}
            handleNoConsent={handleNoConsent}
          />
        );
      case 5:
        return (
          <CheckEmailForm initialStateData={registrationData} setLoading={setLoading} setLoadingText={setLoadingText} />
        );
      case 6:
        return <NoConsent />;
      default:
        return "Unknown step";
    }
  };

  const updateRegistrationPageTitle = (step: number) => {
    switch (step) {
      case 1:
        setRegistrationPageTitle(content["register-date-of-birth-document-title"]);
        setGaURL("/registration/dateofbirth");
        break;
      case 2:
        setRegistrationPageTitle(content["register-email-document-title"]);
        setGaURL("/registration/email");
        break;
      case 3:
        setRegistrationPageTitle(content["register-password-document-title"]);
        setGaURL("/registration/password");
        break;
      case 4:
        setRegistrationPageTitle(content["register-consent-document-title"]);
        setGaURL("/registration/consent");
        break;
      case 5:
        setRegistrationPageTitle(content["register-check-email-registering-document-title"]);
        setGaURL("/registration/registering");
        break;
      case 6:
        setRegistrationPageTitle(content["register-no-consent-document-title"]);
        setGaURL("/registration/cancelled");
        break;
      default:
        setRegistrationPageTitle(content["register-name-document-title"]);
        setGaURL("/registration/name");
    }
  };

  return (
    <DocumentTitle title={registrationPageTitle}>
      <>
        {[0, 1, 2, 3, 4].includes(activeStep) && (
          <div role="complementary">
            <DTEStepper
              variant="progress"
              position="static"
              nextButton={<div />}
              backButton={<div />}
              steps={14}
              LinearProgressProps={{
                ...LinearProps,
                value: calculatePercentageComplete(activeStep, 13),
              }}
              ref={stepperRef}
            />
            <PercentageGrid justifyContent="space-between" alignItems="center" container>
              <Grid item>
                {activeStep !== 6 && (
                  <DTEBackLink
                    title={content["reusable-aria-go-back"]}
                    linkText={content["reusable-back-link"]}
                    ariaLabel={content["reusable-aria-go-back"]}
                    onClick={handleBack}
                  />
                )}
              </Grid>
              <Grid item>
                <DTEContent aria-hidden>
                  {calculatePercentageComplete(activeStep, 13)}% {content["reusable-progress-complete"]}
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
}

export default RegsitrationProcess;
