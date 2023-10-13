import styled from "styled-components";
import React, { useEffect, useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import DocumentTitle from "react-document-title";
import DTEHeader from "../../UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../UI/DTETypography/DTEContent/DTEContent";
import StepWrapper from "../../StepWrapper/StepWrapper";
import DTEInput from "../../UI/DTEInput/DTEInput";
import DTEButton from "../../UI/DTEButton/DTEButton";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";
import Utils from "../../../../Helper/Utils";
import { AuthContext } from "../../../../context/AuthContext";
import DTEDetails from "../../UI/DTEDetails/DTEDetails";
import DTELinkButton from "../../UI/DTELinkButton/DTELinkButton";
import DTEBackLink from "../../UI/DTEBackLink/DTEBackLink";
import ErrorMessageContainer from "../../ErrorMessageContainer/ErrorMessageContainer";
import useInlineServerError from "../../../../hooks/useInlineServerError";
import LoadingIndicator from "../../LoadingIndicator/LoadingIndicator";
import Honeypot from "../../Honeypot/Honeypot";
import { ContentContext } from "../../../../context/ContentContext";

const ButtonWrapper = styled.div`
  margin: 1rem 0;
`;

const MfaChangeNumberConfirmEmail = () => {
  const { content } = useContext(ContentContext);
  const { mfaDetails, prevUrl, userMfaEmail, setUserMfaEmail } = useContext(AuthContext);
  const [isCodeResent, setIsCodeResent] = useState<boolean>(false);
  const history = useHistory();
  const [userEmail, setUserEmail] = useState<string>(userMfaEmail);
  // get setCodeResent from url query params
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
  const [{ response: userEmailRespose, loading: getEmailOtpLoading }, resendCode] = useAxiosFetch(
    {
      url: `${process.env.REACT_APP_BASE_API}/users/sendmfaotpemail`,
      method: "POST",
      data: {
        mfaDetails,
      },
    },
    { useCache: false, manual: prevUrl === "/MfaChangePhoneNumber" }
  );

  const handleResendCode = async () => {
    setIsCodeResent(false);
    await resendCode();
    setIsCodeResent(true);
  };

  const [
    { response: validateEmailOtpRespose, loading: validateEmailOtpLoading, error: validateEmailOtpError },
    validateEmailOtp,
  ] = useAxiosFetch({}, { useCache: false, manual: true });
  const [convertedError, setConvertedError] = useState<any>(null);
  const serverError = useInlineServerError(validateEmailOtpRespose, content);

  useEffect(() => {
    if (serverError) {
      setConvertedError(serverError);
    }
  }, [serverError]);

  const onSubmit = async (data: any) => {
    const { mfaCode } = data;
    const res = await validateEmailOtp({
      url: `${process.env.REACT_APP_BASE_API}/users/validatemfaotpemail`,
      method: "POST",
      data: {
        mfaDetails,
        mfaCode,
      },
    });
    const response = Utils.ConvertResponseToDTEResponse(res);
    if (response?.errors?.some((e) => e.customCode === "Mfa_Code_Expired")) {
      history.push("/MfaSecurityCodeExpired");
    }
    if (response?.isSuccess) {
      history.push("/MfaChangePhoneNumber");
    }
  };

  useEffect(() => {
    const result = Utils.ConvertResponseToDTEResponse(userEmailRespose);
    if (result?.isSuccess) {
      setUserEmail(result?.content);
      setUserMfaEmail(result?.content);
    }
  }, [userEmailRespose]);

  useEffect(() => {
    if (document.getElementsByClassName("nhsuk-error-message")[0]) {
      Utils.FocusOnError();
    }
  }, [isSubmitting, getEmailOtpLoading, convertedError]);

  const interceptSubmit = (e: any) => {
    e.preventDefault();
    setConvertedError(null);
    handleSubmit(onSubmit)();
  };

  return (
    <DocumentTitle title={content["mfa-change-phone-confirm-document-title"]}>
      <StepWrapper>
        {getEmailOtpLoading ? (
          <LoadingIndicator />
        ) : (
          <>
            {prevUrl !== "/MfaSecurityCodeExpired" && (
              <DTEBackLink onClick={() => history.goBack()} linkText={content["reusable-back-link"]} />
            )}
            <DTEHeader as="h1">{content["mfa-change-phone-confirm-header"]}</DTEHeader>
            <ErrorMessageContainer
              axiosErrors={[validateEmailOtpError]}
              DTEAxiosErrors={[serverError ? [] : Utils.ConvertResponseToDTEResponse(validateEmailOtpRespose)?.errors]}
            />
            <DTEContent>
              {(content["mfa-change-phone-confirm-instruction-text"] as string).replace("{{userEmail}}", userEmail)}
            </DTEContent>
            <DTEContent>{content["mfa-change-phone-confirm-expiry-text"]}</DTEContent>
            {isCodeResent && (
              <div className="govuk-details__text">
                <DTEContent role="alert">{content["mfa-change-phone-alert-code-sent"]}</DTEContent>
              </div>
            )}
            <form noValidate onSubmit={interceptSubmit}>
              <Honeypot />
              <Controller
                control={control}
                name="mfaCode"
                render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                  <DTEInput
                    label={content["mfa-change-phone-confirm-input-code"]}
                    id="mfaCode"
                    required
                    value={value}
                    onValueChange={(e) => {
                      const trimmedValue = e.target.value.trim();
                      onChange(trimmedValue);
                    }}
                    onValueBlur={onBlur}
                    error={convertedError || error?.message}
                    spellcheck={false}
                    disabled={getEmailOtpLoading || isSubmitting}
                    hint={content["mfa-change-phone-confirm-hint-code"]}
                  />
                )}
                rules={{
                  required: {
                    value: true,
                    message: content["mfa-change-phone-confirm-validation-code-required"],
                  },
                  minLength: {
                    value: 6,
                    message: content["mfa-change-phone-confirm-validation-code-invalid"],
                  },
                  maxLength: {
                    value: 6,
                    message: content["mfa-change-phone-confirm-validation-code-invalid"],
                  },
                  pattern: {
                    value: /^\d{6}$/,
                    message: content["mfa-change-phone-confirm-validation-code-invalid"],
                  },
                }}
              />
              <DTEDetails summary={content["mfa-change-phone-confirm-not-received-header"]}>
                <>
                  {content["mfa-change-phone-not-received-body"]}
                  <ul className="govuk-list govuk-list--bullet">
                    <li>
                      <DTEContent>{content["mfa-change-phone-confirm-check-spam"]}</DTEContent>
                    </li>
                    <li>
                      <DTEContent>
                        <DTELinkButton onClick={handleResendCode} disabled={validateEmailOtpLoading || isSubmitting}>
                          {content["mfa-change-phone-confirm-link-resend-code"]}
                        </DTELinkButton>
                      </DTEContent>
                    </li>
                  </ul>
                </>
              </DTEDetails>
              <ButtonWrapper>
                <DTEButton disabled={getEmailOtpLoading || isSubmitting}>
                  {content["reusable-button-continue"]}
                </DTEButton>
              </ButtonWrapper>
            </form>
          </>
        )}
      </StepWrapper>
    </DocumentTitle>
  );
};

export default MfaChangeNumberConfirmEmail;
