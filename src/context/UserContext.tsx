import React, { useState, createContext, ReactNode } from "react";

import { DOBFormData } from "../components/Shared/FormElements/DOBForm";
import { ConsentFormData } from "../components/Participant/RegistrationProcess/StartRegistrationProcess/Stepper/Forms/ConsentForm";
import { ContinueRegistrationState, RegistrationProcessState } from "../types/ParticipantTypes";
import { AddressFormData } from "../components/Shared/FormElements/AddressForm";
import { MobileFormData } from "../components/Shared/FormElements/MobileNumberForm";
import { Ethnicity1FormData } from "../components/Shared/FormElements/EthnicityFormComponents/Ethnicity1Form";
import { Ethnicity2FormData } from "../components/Shared/FormElements/EthnicityFormComponents/Ethnicity2Form";
import { DisabilityFormData } from "../components/Shared/FormElements/DisabilityForm";
import { Disability2FormData } from "../components/Shared/FormElements/Disability2Form";
import { HealthConditionFormData } from "../components/Shared/FormElements/HealthConditionForm";
import { SexFormData } from "../components/Shared/FormElements/SexForm";

interface UserContextType {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  registrationData: RegistrationProcessState;
  setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationProcessState>>;
  continueRegistrationData: ContinueRegistrationState;
  setContinueRegistrationData: React.Dispatch<React.SetStateAction<ContinueRegistrationState>>;
  continueRegistrationActiveStep: number;
  setContinueRegistrationActiveStep: React.Dispatch<React.SetStateAction<number>>;
  currentPage: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  currentAccountPage: string;
  setCurrentAccountPage: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<UserContextType>({} as UserContextType);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [registrationData, setRegistrationData] = useState<RegistrationProcessState>({
    nameFormData: {
      firstName: "",
      lastName: "",
    },
    dobFormData: {
      day: "",
      month: "",
      year: "",
    } as DOBFormData,
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

  const [continueRegistrationData, setContinueRegistrationData] = useState<ContinueRegistrationState>({
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
      genderAtBirth: "",
    } as SexFormData,
  });

  const [activeStep, setActiveStep] = useState(0);
  const [continueRegistrationActiveStep, setContinueRegistrationActiveStep] = useState(0);
  // state for updating the update user page
  const [currentPage, setCurrentPage] = useState<string>("main");
  const [currentAccountPage, setCurrentAccountPage] = useState<string>("main");

  return (
    <UserContext.Provider
      value={{
        activeStep,
        setActiveStep,
        registrationData,
        setRegistrationData,
        continueRegistrationData,
        setContinueRegistrationData,
        continueRegistrationActiveStep,
        setContinueRegistrationActiveStep,
        currentPage,
        setCurrentPage,
        currentAccountPage,
        setCurrentAccountPage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
