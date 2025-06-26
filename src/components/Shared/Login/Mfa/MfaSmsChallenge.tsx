import { useHistory } from "react-router-dom";
import React, { useEffect, useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DocumentTitle from "react-document-title";
import DTEHeader from "../../UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../UI/DTETypography/DTEContent/DTEContent";
import StepWrapper from "../../StepWrapper/StepWrapper";
import DTEInput from "../../UI/DTEInput/DTEInput";
import DTEButton from "../../UI/DTEButton/DTEButton";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";
import { AuthContext } from "../../../../context/AuthContext";
import Utils from "../../../../Helper/Utils";
import ErrorMessageContainer from "../../ErrorMessageContainer/ErrorMessageContainer";
import DTEDetails from "../../UI/DTEDetails/DTEDetails";
import DTEBackLink from "../../UI/DTEBackLink/DTEBackLink";
import useInlineServerError from "../../../../hooks/useInlineServerError";
import Honeypot from "../../Honeypot/Honeypot";
import { ContentContext } from "../../../../context/ContentContext";
import DTERouteLink from "../../UI/DTERouteLink/DTERouteLink";

const MfaSmsChallenge = () => {
  const { content } = useContext(ContentContext);
  const [isCodeResent, setIsCodeResent] = useState<boolean>(false);
  const { mfaDetails, saveToken, setMfaDetails, enteredMfaMobile, prevUrl, setEnteredMfaMobile, setUserMfaEmail } =
    useContext(AuthContext);
  const history = useHistory();

  const urlParams = new URLSearchParams(window.location.search);
  const setCodeResent = urlParams.get("setCodeResent");

  useEffect(() => {
    if (setCodeResent === "true") {
      setIsCodeResent(true);
    } else {
      setIsCodeResent(false);
    }
  }, [setCodeResent]);

  const [mobilePhoneNumber, setMobilePhoneNumber] = useState<string>("your mobile phone");

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      mfaCode: "",
    },
  });
  const [{ response: SMSMfaResponse, loading: SMSMfaLoading, error: setupMfaError }, postMfaCode] = useAxiosFetch(
    {},
    { useCache: false, manual: true }
  );

  const [convertedError, setConvertedError] = useState<any>(null);
  const serverError = useInlineServerError(SMSMfaResponse, content);

  useEffect(() => {
    if (serverError) {
      setConvertedError(serverError);
    }
  }, [serverError]);

  const [{ response: maskedMobileResponse }] = useAxiosFetch(
    {
      url: `${process.env.REACT_APP_BASE_API}/users/getmaskedmobile`,
      method: "POST",
      data: {
        mfaDetails,
      },
    },
    { useCache: false, manual: false }
  );

  const onSubmit = async (data: any) => {
    const { mfaCode } = data;
    const res = await postMfaCode({
      url: `${process.env.REACT_APP_BASE_API}/users/respondtomfachallenge`,
      method: "POST",
      data: {
        mfaCode,
        mfaDetails,
      },
    });
    const result = Utils.ConvertResponseToDTEResponse(res);
    if (result?.errors?.some((e) => e.customCode === "Mfa_Session_Expired")) {
      history.push("/MfaSecurityCodeExpired");
    }
    if (
      result?.errors?.some(
        (e) =>
          e.customCode === "Not_Authorized" &&
          e.detail ===
            "Too many invalid credentials attempts. User temporarily locked. Please try again after few seconds."
      )
    ) {
      history.push("/MfaLockedOut");
    }
    if (result?.isSuccess) {
      saveToken(result?.content);
      setMfaDetails("");
      setUserMfaEmail("your email address");
      setEnteredMfaMobile("");
      history.push("/");
    }
  };

  const handleResendCode = async () => {
    setIsCodeResent(false);
    const res = await postMfaCode({
      url: `${process.env.REACT_APP_BASE_API}/users/resendmfachallenge`,
      method: "POST",
      data: {
        mfaDetails,
      },
    });
    const result = Utils.ConvertResponseToDTEResponse(res);
    setIsCodeResent(true);
    if (result?.isSuccess) {
      setMfaDetails(result?.content);
    }
    if (result?.errors?.some((e) => e.customCode === "Sms_Mfa_Challenge")) {
      setMfaDetails(result?.errors[0]?.detail as string);
    }
  };

  useEffect(() => {
    if (prevUrl === "/MfaSecurityCodeExpired") {
      handleResendCode();
    }
  }, [prevUrl]);

  useEffect(() => {
    if (document.getElementsByClassName("nhsuk-error-message")[0]) {
      Utils.FocusOnError();
    }
  }, [isSubmitting, convertedError, SMSMfaResponse]);

  useEffect(() => {
    if (maskedMobileResponse && maskedMobileResponse?.data) {
      setMobilePhoneNumber(maskedMobileResponse?.data);
    }
  }, [maskedMobileResponse]);

  const removePlus = (number: string) => {
    return number ? number.replace("+", "") : "";
  };

  const handleErrors = (error: any, responseError: any) => {
    const response = Utils.ConvertResponseToDTEResponse(responseError);
    if (response?.errors?.some((e: any) => e?.customCode === "Sms_Mfa_Challenge")) {
      return null;
    }
    return <ErrorMessageContainer axiosErrors={[error]} DTEAxiosErrors={[serverError ? [] : response?.errors]} />;
  };
  const urlList = ["/MfaSmsSetup", "/MfaChangePhoneNumber"];

  const interceptSubmit = (e: any) => {
    e.preventDefault();
    setConvertedError(null);
    handleSubmit(onSubmit)();
  };

  const phoneNumber = enteredMfaMobile || removePlus(mobilePhoneNumber);

  const codeInstructionText = enteredMfaMobile
    ? content["mfa-sms-challenge-code-instruction-text-mobile"]
    : content["mfa-sms-challenge-code-instruction-text"];

  if (!mfaDetails) {
    history.push("/");
  }

  return (
    <DocumentTitle title={content["mfa-sms-challenge-document-title"]}>
      <StepWrapper>
        {urlList.includes(prevUrl as string) && (
          <DTEBackLink onClick={() => history.goBack()} linkText={content["reusable-back-link"]} />
        )}
        <DTEHeader as="h1">{content["mfa-sms-challenge-header"]}</DTEHeader>
        {setupMfaError || SMSMfaResponse ? handleErrors(setupMfaError, SMSMfaResponse) : null}
        <DTEContent>{codeInstructionText.replace("{{phoneNumber}}", phoneNumber)}</DTEContent>
        <DTEContent>{content["mfa-sms-challenge-code-expiry-text"]}</DTEContent>
        <DTEContent>{content["mfa-sms-challenge-code-enter-mobile-again"]}</DTEContent>
        {isCodeResent && (
          <div className="govuk-details__text">
            <DTEContent role="alert">{content["mfa-sms-challenge-alert-code-resent"]}</DTEContent>
          </div>
        )}
        <form onSubmit={interceptSubmit} noValidate>
          <Honeypot />
          <Controller
            control={control}
            name="mfaCode"
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
              <DTEInput
                label={content["mfa-sms-challenge-input-code"]}
                id="mfaCode"
                type="text"
                required
                value={value}
                onValueChange={onChange}
                onValueBlur={onBlur}
                error={convertedError || error?.message}
                spellcheck={false}
                autocomplete="off"
                disabled={SMSMfaLoading || isSubmitting}
              />
            )}
            rules={{
              required: {
                value: true,
                message: content["mfa-sms-challenge-validation-code-required"],
              },

              pattern: {
                value: /^\d{6}$/,
                message: content["mfa-sms-challenge-validation-code-invalid"],
              },
            }}
          />
          <DTEDetails summary={content["mfa-sms-challenge-not-received-header"]}>
            <>
              <DTEContent>{content["mfa-change-phone-confirm-not-received-busy-text"]}</DTEContent>
              {content["mfa-change-phone-confirm-not-received-pre-links-text"]}{" "}
              <DTERouteLink
                to={prevUrl === "/MfaChangePhoneNumber" ? "/MfaChangePhoneNumber" : "/MfaSmsSetup"}
                renderStyle="standard"
                disabled={SMSMfaLoading || isSubmitting}
              >
                {prevUrl === "/MfaChangePhoneNumber"
                  ? content["mfa-sms-challenge-enter-new-mobile-again"]
                  : content["mfa-sms-challenge-enter-mobile-again"]}
              </DTERouteLink>
              {" or "}
              <DTERouteLink
                renderStyle="standard"
                disabled={SMSMfaLoading || isSubmitting}
                onClick={(e) => {
                  e.preventDefault();
                  handleResendCode();
                }}
                to={"#"}
              >
                {content["mfa-sms-challenge-link-resend-code"]}
              </DTERouteLink>
              {"."}
            </>
          </DTEDetails>
          <DTEButton type="submit" disabled={SMSMfaLoading || isSubmitting}>
            {content["reusable-button-continue"]}
          </DTEButton>
        </form>
      </StepWrapper>
    </DocumentTitle>
  );
};

export default MfaSmsChallenge;
