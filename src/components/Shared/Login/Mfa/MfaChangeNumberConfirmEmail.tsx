// import styled from "styled-components";
// import { useEffect, useContext, useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { useHistory } from "react-router-dom";
// import DocumentTitle from "react-document-title";
// import DTEHeader from "../../UI/DTETypography/DTEHeader/DTEHeader";
// import DTEContent from "../../UI/DTETypography/DTEContent/DTEContent";
// import StepWrapper from "../../StepWrapper/StepWrapper";
// import DTEInput from "../../UI/DTEInput/DTEInput";
// import DTEButton from "../../UI/DTEButton/DTEButton";
// import useAxiosFetch from "../../../../hooks/useAxiosFetch";
// import Utils, { MobileRegex } from "../../../../Helper/Utils";
// import { AuthContext } from "../../../../context/AuthContext";
// import DTEDetails from "../../UI/DTEDetails/DTEDetails";
// import DTERouteLink from "../../UI/DTERouteLink/DTERouteLink";
//
// const ButtonWrapper = styled.div`
//   margin: 1rem 0;
// `;
//
// const MfaChangeNumberConfirmEmail = () => {
//   const { mfaDetails, setMfaDetails } = useContext(AuthContext);
//   const history = useHistory();
//
//   const {
//     control,
//     handleSubmit,
//     setValue,
//     formState: { errors: formErrors, isSubmitting, isSubmitSuccessful },
//   } = useForm({
//     mode: "onSubmit",
//     reValidateMode: "onSubmit",
//     defaultValues: {
//       emailOtp: "",
//     },
//   });
//   const [
//     {
//       response: getEmailOtpResponse,
//       loading: getEmailOtpLoading,
//       error: getEmailOtpError,
//     },
//   ] = useAxiosFetch(
//     {
//       url: `${process.env.REACT_APP_BASE_API}/users/sendmfaotpemail`,
//       method: "POST",
//       data: {
//         mfaDetails,
//       },
//     },
//     { useCache: false, manual: false }
//   );
//
//   const onSubmit = async (data: any) => {
//     const { emailOtp } = data;
//     // console.log(emailOtp);
//     // const result = Utils.ConvertResponseToDTEResponse(res);
//     // if (result?.errors?.some((e) => e.customCode === "Sms_Mfa_Challenge")) {
//     //   setMfaDetails(result?.errors[0]?.detail as string);
//     //   history.push(`/MfaSmsChallenge`);
//     // }
//   };
//
//   useEffect(() => {
//     if (document.getElementsByClassName("nhsuk-error-message")[0]) {
//       Utils.FocusOnError();
//     }
//   }, [isSubmitting]);
//
//   return (
//     <DocumentTitle title="Email OTP">
//       <StepWrapper>
//         <DTEHeader as="h1">Check your email</DTEHeader>
//         <DTEContent>
//           Enter the 6 digit security code we’ve sent to `${getEmailOtpResponse}`
//           to confirm this is your email address.
//         </DTEContent>
//         <DTEContent>
//           You need to use this code within <strong>5 minutes</strong> or it will
//           expire.
//         </DTEContent>
//         <form noValidate onSubmit={handleSubmit(onSubmit)}>
//           <Controller
//             control={control}
//             name="emailOtp"
//             render={({
//               field: { value, onChange, onBlur },
//               fieldState: { error },
//             }) => (
//               <DTEInput
//                 label="Security code"
//                 id="emailOtp"
//                 required
//                 value={value}
//                 onValueChange={(e) => {
//                   onChange(e);
//                 }}
//                 onValueBlur={onBlur}
//                 error={error?.message}
//                 spellcheck={false}
//                 disabled={getEmailOtpLoading || isSubmitting}
//                 hint="The code is 6 digits. Entering the code incorrectly too many times will temporarily prevent you from signing in."
//               />
//             )}
//             rules={{
//               required: {
//                 value: true,
//                 message: "Enter a valid security code",
//               },
//             }}
//           />
//           <DTEDetails summary="Use another way to secure my account">
//             <>
//               <DTEContent>
//                 If you do not have a UK mobile phone number or do not want to
//                 use this method, you can{" "}
//                 <DTERouteLink
//                   disabled={getEmailOtpLoading || isSubmitting}
//                   to="/MfaTokenSetup"
//                   renderStyle="standard"
//                 >
//                   use an authenticator app to secure your account
//                 </DTERouteLink>
//                 .
//               </DTEContent>
//             </>
//           </DTEDetails>
//           <ButtonWrapper>
//             <DTEButton disabled={getEmailOtpLoading || isSubmitting}>
//               Continue
//             </DTEButton>
//           </ButtonWrapper>
//         </form>
//       </StepWrapper>
//     </DocumentTitle>
//   );
// };
//
// export default MfaChangeNumberConfirmEmail;
