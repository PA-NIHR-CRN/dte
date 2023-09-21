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
import DTELinkButton from "../../UI/DTELinkButton/DTELinkButton";
import DTEBackLink from "../../UI/DTEBackLink/DTEBackLink";
import useInlineServerError from "../../../../hooks/useInlineServerError";
import DTERouteLink from "../../UI/DTERouteLink/DTERouteLink";
import Honeypot from "../../Honeypot/Honeypot";

const MfaSmsChallenge = () => {
  const [isCodeResent, setIsCodeResent] = useState<boolean>(false);
  const {
    mfaDetails,
    saveToken,
    setMfaDetails,
    enteredMfaMobile,
    prevUrl,
    setEnteredMfaMobile,
    setUserMfaEmail,
  } = useContext(AuthContext);
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

  if (!mfaDetails) {
    history.push("/");
  }

  const [mobilePhoneNumber, setMobilePhoneNumber] =
    useState<string>("your mobile phone");

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
  const [
    { response: SMSMfaResponse, loading: SMSMfaLoading, error: setupMfaError },
    postMfaCode,
  ] = useAxiosFetch({}, { useCache: false, manual: true });

  const [convertedError, setConvertedError] = useState<any>(null);
  const serverError = useInlineServerError(SMSMfaResponse);

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
    if (result?.errors?.some((e) => e.customCode === "MFA_Session_Expired")) {
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
    if (
      response?.errors?.some((e: any) => e?.customCode === "Sms_Mfa_Challenge")
    ) {
      return null;
    }
    return (
      <ErrorMessageContainer
        axiosErrors={[error]}
        DTEAxiosErrors={[serverError ? [] : response?.errors]}
      />
    );
  };
  const urlList = ["/MfaSmsSetup", "/MfaChangePhoneNumber"];

  const interceptSubmit = (e: any) => {
    e.preventDefault();
    setConvertedError(null);
    handleSubmit(onSubmit)();
  };

  return (
    <DocumentTitle title="MFA Challenge SMS">
      <StepWrapper>
        {urlList.includes(prevUrl as string) && (
          <DTEBackLink onClick={() => history.goBack()} linkText="Back" />
        )}
        <DTEHeader as="h1">Check your mobile phone</DTEHeader>
        {setupMfaError || SMSMfaResponse
          ? handleErrors(setupMfaError, SMSMfaResponse)
          : null}
        <DTEContent>
          Enter the 6 digit security code we&apos;ve sent to{" "}
          {enteredMfaMobile || removePlus(mobilePhoneNumber)}
          {enteredMfaMobile && " to confirm this is your mobile phone number"}.
          <br />
          <br />
          You need to use this code within <strong>5 minutes</strong> or it will
          expire.
        </DTEContent>
        {isCodeResent && (
          <div className="govuk-details__text">
            <DTEContent role="alert">
              You have been sent a new security code.
            </DTEContent>
          </div>
        )}
        <form onSubmit={interceptSubmit} noValidate>
          <Honeypot />
          <Controller
            control={control}
            name="mfaCode"
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <DTEInput
                label="Security code"
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
                hint="The code is 6 digits. Entering the code incorrectly too many times will temporarily prevent you from signing in."
              />
            )}
            rules={{
              required: {
                value: true,
                message: "Enter a valid security code",
              },

              pattern: {
                value: /^\d{6}$/,
                message: "The security code must be 6 digits",
              },
            }}
          />
          <DTEDetails summary="Not received your security code?">
            <>
              <DTEContent>
                When we are really busy, it may take a bit longer for your code
                to arrive.
              </DTEContent>

              {urlList.includes(prevUrl as string) ? (
                <>
                  <DTEContent>
                    If you still did not get a security code:
                  </DTEContent>
                  <ul>
                    <li>
                      <DTELinkButton
                        onClick={handleResendCode}
                        disabled={SMSMfaLoading || isSubmitting}
                        customStyles={{ textAlign: "left" }}
                      >
                        send your security code again
                      </DTELinkButton>
                    </li>
                    <li>
                      <DTELinkButton
                        disabled={SMSMfaLoading || isSubmitting}
                        onClick={() => {
                          history.push(
                            prevUrl === "/MfaChangePhoneNumber"
                              ? "/MfaChangePhoneNumber"
                              : "/MfaSmsSetup"
                          );
                        }}
                        customStyles={{ textAlign: "left" }}
                      >
                        enter your{" "}
                        {prevUrl === "/MfaChangePhoneNumber" && "new"} mobile
                        phone number again
                      </DTELinkButton>
                    </li>
                  </ul>
                </>
              ) : (
                <DTELinkButton
                  onClick={handleResendCode}
                  disabled={SMSMfaLoading || isSubmitting}
                >
                  Send your security code again
                </DTELinkButton>
              )}
            </>
          </DTEDetails>
          {!urlList.includes(prevUrl as string) && (
            <DTEDetails summary="I do not have access to my mobile phone">
              <DTEContent>
                If you do not have access to your mobile phone, you can{" "}
                <DTERouteLink
                  disabled={SMSMfaLoading || isSubmitting}
                  to="/MfaChangeNumberConfirmEmail"
                  renderStyle="standard"
                >
                  change your mobile phone number securely.
                </DTERouteLink>
              </DTEContent>
            </DTEDetails>
          )}
          <DTEButton type="submit" disabled={SMSMfaLoading || isSubmitting}>
            Continue
          </DTEButton>
        </form>
      </StepWrapper>
    </DocumentTitle>
  );
};

export default MfaSmsChallenge;
