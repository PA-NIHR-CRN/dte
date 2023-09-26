import { ReactNode } from "react";

const customCodeLookup = (code: string, content: any, detail?: string | ReactNode) => {
  const defaultLoginErrorMessage = content["error-codes-default-login"];
  const defaultRegistrationErrorMessage = content["error-codes-default-registration"];
  const defaultErrorMessage = content["error-codes-default"];
  switch (code) {
    // Code used when the details have already been changed locally
    case "NO_CHANGE":
      return detail || "";
    case "User_Not_In_Allow_List_Error":
      return content["error-message-email-not-recognised"];
    case "InternalServerError":
      return defaultErrorMessage;
    case "Authentication_Error":
      return defaultLoginErrorMessage;
    case "Authentication_Not_Authorized":
      switch (detail) {
        case "Password attempts exceeded":
          return content["error-message-lock-out"];
        case "Incorrect username or password.":
          return content["signin-error-authentication-not-authorized-nhs"];
        default:
          return defaultLoginErrorMessage;
      }
    case "Authentication_User_Not_Confirmed":
      return content["error-message-account-not-verified"];
    case "Change_Email_Error_Unauthorised":
      return content["error-message-email-not-updated"];
    case "Password_Validation_Error":
      return defaultLoginErrorMessage;
    case "SignUp_Error":
      return defaultRegistrationErrorMessage;
    case "SignUp_Error_Username_Exists":
      return defaultRegistrationErrorMessage;
    case "SignUp_Error_Invalid_Parameter":
      return defaultRegistrationErrorMessage;
    case "Create_User_Error":
      return defaultRegistrationErrorMessage;
    case "Create_User_Error_User_Already_Exists":
      return defaultRegistrationErrorMessage;
    case "Set_User_Password_Error":
      return defaultRegistrationErrorMessage;
    case "Admin_Create_User_Error_Username_Exists":
      return defaultRegistrationErrorMessage;
    case "Admin_Set_User_Password_Error_Invalid_Parameter":
      return defaultRegistrationErrorMessage;
    case "Resend_Verification_Email_Error":
      return defaultRegistrationErrorMessage;
    case "Resend_Verification_Email_Error_User_Already_Confirmed":
      return defaultRegistrationErrorMessage;
    case "Forgot_Password_Error":
      return defaultErrorMessage;
    case "Forgot_Password_Error_User_Is_Not_Confirmed":
      return defaultErrorMessage;
    case "Confirm_Forgot_Password_Error":
      return defaultErrorMessage;
    case "Demographics_Not_Found_For_Participant_Error":
      return defaultErrorMessage;
    case "Participant_Registration_Already_Exists_For_Study_Error":
      return defaultErrorMessage;
    case "Study_Registration_Already_Exists_Error":
      return defaultErrorMessage;
    case "Study_Registration_Not_Found_Error":
      return defaultErrorMessage;
    case "Unable_To_Get_Addresses_From_LocationService_Error":
      return defaultErrorMessage;
    case "Unknown_Error_Getting_Addresses_From_LocationService_Error":
      return defaultErrorMessage;
    case "MFA_Session_Expired":
      return content["error-message-mfa-session-expired"];
    case "MFA_Code_Mismatch":
      return content["error-message-mfa-code-mismatch"];
    case "MFA_Code_Expired":
      return content["error-message-mfa-code-mismatch"];
    case "MFA_User_Not_Found":
      return content["error-message-mfa-account-unverified"];
    case "Mfa_Used_Token":
      return content["error-message-mfa-code-used"];
    default:
      return defaultErrorMessage || content["error-message-generic"];
  }
};

export default customCodeLookup;
