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
import { ConsentFormData } from "../components/Participant/RegistrationProcess/StartRegistrationProcess/Stepper/Forms/ConsentForm";

export type RegistrationProcessState = {
  nameFormData: NameFormData;
  dobFormData: DOBFormData;
  emailFormData: EmailFormData;
  passwordFormData: PasswordFormData;
  consentFormData: ConsentFormData;
};

export type ContinueRegistrationState = {
  mobileFormData: MobileFormData;
  addressFormData: AddressFormData;
  sexFormData: SexFormData;
  ethnicity1FormData: Ethnicity1FormData;
  ethnicity2FormData: Ethnicity2FormData;
  disabilityFormData: DisabilityFormData;
  disability2FormData: Disability2FormData;
  healthConditionFormData: HealthConditionFormData;
};
