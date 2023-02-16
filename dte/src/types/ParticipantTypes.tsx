import { NameFormData } from "../components/Shared/FormElements/NameForm";
import { EmailFormData } from "../components/Participant/RegistrationProcess/StartRegistrationProcess/Stepper/Forms/EmailForm";
import { PasswordFormData } from "../components/Participant/RegistrationProcess/StartRegistrationProcess/Stepper/Forms/PasswordForm";
import { AddressFormData } from "../components/Shared/FormElements/AddressForm";
import { MobileFormData } from "../components/Shared/FormElements/MobileNumberForm";
import { DOBFormData } from "../components/Shared/FormElements/DOBForm";
import { SexFormData } from "../components/Shared/FormElements/SexForm";
import { Ethnicity1FormData } from "../components/Shared/FormElements/EthnicityFormComponents/Ethnicity1Form";
import { Ethnicity2FormData } from "../components/Shared/FormElements/EthnicityFormComponents/Ethnicity2Form";
import { DisabilityFormData } from "../components/Shared/FormElements/DisabilityForm";
import { Disability2FormData } from "../components/Shared/FormElements/Disability2Form";
import { HealthConditionFormData } from "../components/Shared/FormElements/HealthConditionForm";
import { GenderFormData } from "../components/Shared/FormElements/GenderForm";
import { ConsentFormData } from "../components/Participant/RegistrationProcess/StartRegistrationProcess/Stepper/Forms/ConsentForm";
import { SelectSiteData } from "../components/Participant/SelfReferral/ContinueSelfReferral/Forms/SelectSite";
import { ConsentData } from "../components/Participant/SelfReferral/ContinueSelfReferral/Forms/Consent";

export interface StudyInfo {
  id: string;
  title: string;
  description: string;
  sites: Site[];
}
export interface Site {
  name: string;
  rtsIdentifier: string;
}

export interface DTECommand {
  type: string;
  source: string;
  id: string;
  time: string;
  dataContentType: string;
  dataSchema: string;
}

export type RegistrationProcessState = {
  nameFormData: NameFormData;
  emailFormData: EmailFormData;
  passwordFormData: PasswordFormData;
  consentFormData: ConsentFormData;
};

export type ContinueRegistrationState = {
  mobileFormData: MobileFormData;
  addressFormData: AddressFormData;
  dobFormData: DOBFormData;
  sexFormData: SexFormData;
  genderFormData: GenderFormData;
  ethnicity1FormData: Ethnicity1FormData;
  ethnicity2FormData: Ethnicity2FormData;
  disabilityFormData: DisabilityFormData;
  disability2FormData: Disability2FormData;
  healthConditionFormData: HealthConditionFormData;
};

export type ContinueSelfReferralData = {
  questionnaireData: any;
  consentData: ConsentData;
  // remoteStudyData: any;
  selectedSiteData: SelectSiteData;
};
