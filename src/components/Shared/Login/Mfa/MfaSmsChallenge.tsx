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
import DTERouteLink from "../../UI/DTERouteLink/DTERouteLink";

const MfaSmsChallenge = () => {
  const [isCodeResent, setIsCodeResent] = useState<boolean>(false);
  const { mfaDetails, saveToken, setMfaDetails, enteredMfaMobile, prevUrl } =
    useContext(AuthContext);
  const history = useHistory();

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
    if (result?.isSuccess) {
      saveToken(result?.content);
      setMfaDetails("");
      history.push("/");
    }
  };

  const handleReEnterNumber = async () => {
    history.push("/MfaChangeNumberConfirmEmail");
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
  }, [isSubmitting]);

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
        DTEAxiosErrors={[response?.errors]}
      />
    );
  };

  return (
    <DocumentTitle title="MFA Challenge SMS">
      <StepWrapper>
        <DTEHeader as="h1">Check your mobile phone</DTEHeader>
        {setupMfaError || SMSMfaResponse
          ? handleErrors(setupMfaError, SMSMfaResponse)
          : null}
        <DTEContent>
          Enter the 6 digit security code we&apos;ve sent to{" "}
          {enteredMfaMobile || removePlus(mobilePhoneNumber)}.
          {enteredMfaMobile && " to confirm this is your mobile phone number."}
          <br />
          <br />
          You need to use this code within <strong>5 minutes</strong> or it will
          expire.
        </DTEContent>
        {isCodeResent && (
          <div className="govuk-details__text">
            <DTEContent>You have been sent a new security code.</DTEContent>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                error={error?.message}
                spellcheck={false}
                autocomplete="tel-national"
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
                message: "Code must be 6 digits long",
              },
            }}
          />
          <DTEDetails summary="Not received your security code?">
            <>
              <DTEContent>
                When we are really busy, it may take a bit longer for your code
                to arrive.
              </DTEContent>
              <DTEContent>If you still did not get a security code:</DTEContent>
              <ul className="govuk-list govuk-list--bullet">
                <li>
                  <DTELinkButton
                    onClick={handleResendCode}
                    disabled={SMSMfaLoading || isSubmitting}
                  >
                    Send your security code again
                  </DTELinkButton>
                </li>
                {prevUrl !== "/UserLogin" && (
                  <li>
                    <DTELinkButton
                      onClick={handleReEnterNumber}
                      disabled={SMSMfaLoading || isSubmitting}
                    >
                      Enter your mobile phone number again
                    </DTELinkButton>
                  </li>
                )}
              </ul>
            </>
          </DTEDetails>
          {prevUrl === "/UserLogin" && (
            <DTEDetails summary="I do not have access to my mobile phone">
              <DTEContent>
                If you do not have access to your mobile phone, you can{" "}
                <DTELinkButton
                  onClick={handleReEnterNumber}
                  disabled={SMSMfaLoading || isSubmitting}
                >
                  change your mobile phone number securely.
                </DTELinkButton>
              </DTEContent>
            </DTEDetails>
          )}

          <DTEDetails summary="Use another way to secure my account">
            <DTEContent>
              If you do not have a UK mobile phone number or do not want to use
              this method, you can{" "}
              <DTERouteLink
                disabled={SMSMfaLoading || isSubmitting}
                to="/MfaTokenSetup"
                renderStyle="standard"
              >
                use an authenticator app to secure your account
              </DTERouteLink>
              .
            </DTEContent>
          </DTEDetails>
          <DTEButton type="submit" disabled={SMSMfaLoading || isSubmitting}>
            Continue
          </DTEButton>
        </form>
      </StepWrapper>
    </DocumentTitle>
  );
};

export default MfaSmsChallenge;
