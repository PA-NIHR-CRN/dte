import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import React, { useContext, useEffect, useState } from "react";
import DocumentTitle from "react-document-title";
import QRCode from "qrcode";
import DTEHeader from "../../UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../UI/DTETypography/DTEContent/DTEContent";
import StepWrapper from "../../StepWrapper/StepWrapper";
import DTEInput from "../../UI/DTEInput/DTEInput";
import { AuthContext } from "../../../../context/AuthContext";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";
import Utils from "../../../../Helper/Utils";
import DTEButton from "../../UI/DTEButton/DTEButton";
import LoadingIndicator from "../../LoadingIndicator/LoadingIndicator";
import DTEBackLink from "../../UI/DTEBackLink/DTEBackLink";
import ErrorMessageContainer from "../../ErrorMessageContainer/ErrorMessageContainer";
import DTEDetails from "../../UI/DTEDetails/DTEDetails";
import useInlineServerError from "../../../../hooks/useInlineServerError";
import Honeypot from "../../Honeypot/Honeypot";
import { ContentContext } from "../../../../context/ContentContext";

const ButtonWrapper = styled.div`
  margin: 1rem 0;
`;

const ComponentSpacer = styled.div`
  padding: 1rem 0;
`;

const MfaTokenSetup = () => {
  const { content } = useContext(ContentContext);
  const { mfaDetails, saveToken, setMfaDetails, setUserMfaEmail } = useContext(AuthContext);
  const history = useHistory();
  const [qrSrc, setQrSrc] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [secretKey, setSecretKey] = useState("");

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
      authenticatorAppCode: "",
    },
  });
  const [{ response: tokenCodeResponse, loading: tokenCodeLoading }] = useAxiosFetch(
    {
      url: `${process.env.REACT_APP_BASE_API}/users/setuptokenmfa`,
      method: "POST",
      data: {
        mfaDetails,
      },
    },
    { useCache: false, manual: false }
  );

  const generateQR = async (code: string) => QRCode.toDataURL(code);

  useEffect(() => {
    if (!tokenCodeResponse?.data?.content?.secretCode) return;
    setSessionId(tokenCodeResponse?.data?.content?.sessionId);
    const { username, secretCode } = tokenCodeResponse?.data?.content;
    setSecretKey(secretCode);
    const qrCode = `otpauth://totp/BePartOfResearch:${username}?secret=${secretCode}&issuer=Cognito`;
    generateQR(qrCode)
      .then((res) => {
        setQrSrc(res as string);
      })
      .catch(console.error);
  }, [tokenCodeResponse]);

  const [{ response: totpMfaResponse, loading: totpMfaLoading, error: totpMfaError }, postMfaCode] = useAxiosFetch(
    {},
    { useCache: false, manual: true }
  );
  const convertedError = useInlineServerError(totpMfaResponse);
  const copySecretKey = () => {
    navigator.clipboard.writeText(secretKey);
  };

  const onSubmit = async (data: any) => {
    const { authenticatorAppCode } = data;
    const res = await postMfaCode({
      url: `${process.env.REACT_APP_BASE_API}/users/verifytokenmfa`,
      method: "POST",
      data: {
        authenticatorAppCode,
        sessionId,
        mfaDetails,
      },
    });
    const result = Utils.ConvertResponseToDTEResponse(res);
    if (result?.errors?.some((e) => e.customCode === "Software_Token_Mfa_Challenge")) {
      setMfaDetails(result?.errors[0]?.detail as string);
      history.push("/MfaTokenChallenge");
    }
    if (result?.errors?.some((e) => e.customCode === "MFA_Session_Expired")) {
      history.push("/MfaSessionExpired");
    }
    if (result?.isSuccess) {
      saveToken(result?.content);
      setMfaDetails("");
      setUserMfaEmail("your email address");
      history.push("/");
    }
  };

  useEffect(() => {
    if (document.getElementsByClassName("nhsuk-error-message")[0]) {
      Utils.FocusOnError();
    }
  }, [isSubmitting, totpMfaResponse, convertedError]);

  return (
    <DocumentTitle title="MFA Setup Token">
      <StepWrapper>
        <ErrorMessageContainer
          axiosErrors={[totpMfaError]}
          DTEAxiosErrors={[convertedError ? [] : Utils.ConvertResponseToDTEResponse(totpMfaResponse)?.errors]}
        />
        {tokenCodeLoading ? (
          <LoadingIndicator />
        ) : (
          <>
            <DTEBackLink onClick={() => history.goBack()} linkText="Back" />
            <DTEHeader as="h1">{content["mfa-token-setup-header"]}</DTEHeader>
            {content["mfa-token-setup-instruction-text"]}
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Honeypot />
              <DTEInput
                label={content["mfa-token-setup-input-secret-key"]}
                id="secretKey"
                type="text"
                value={secretKey}
                spellcheck={false}
                disabled
              />
              <ButtonWrapper>
                <DTEButton
                  type="button"
                  onClick={copySecretKey}
                  disabled={tokenCodeLoading || isSubmitting || totpMfaLoading}
                >
                  {content["mfa-token-setup-button-copy-secret-key"]}
                </DTEButton>
              </ButtonWrapper>
              <ComponentSpacer>
                <DTEDetails summary={content["mfa-token-setup-show-qr-code-header"]}>
                  <>
                    <DTEContent>
                      <div>
                        {qrSrc ? (
                          <img src={qrSrc} alt={content["mfa-token-setup-qr-code-alt-text"]} />
                        ) : (
                          <LoadingIndicator />
                        )}
                      </div>
                    </DTEContent>
                  </>
                </DTEDetails>
              </ComponentSpacer>
              <DTEContent>{content["mfa-token-setup-hint-security-code"]}</DTEContent>
              <Controller
                control={control}
                name="authenticatorAppCode"
                render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                  <DTEInput
                    label={content["mfa-token-setup-input-security-code"]}
                    id="authenticatorAppCode"
                    type="text"
                    required
                    value={value}
                    onValueChange={onChange}
                    onValueBlur={onBlur}
                    error={convertedError || error?.message}
                    spellcheck={false}
                    disabled={tokenCodeLoading || isSubmitting || totpMfaLoading}
                  />
                )}
                rules={{
                  required: {
                    value: true,
                    message: content["mfa-token-setup-validation-security-code-required"],
                  },

                  pattern: {
                    value: /^\d{6}$/,
                    message: content["mfa-token-setup-validation-security-code-invalid"],
                  },
                }}
              />
              <DTEButton type="submit" disabled={tokenCodeLoading || isSubmitting || totpMfaLoading}>
                {content["reusable-button-continue"]}
              </DTEButton>
            </form>
          </>
        )}
      </StepWrapper>
    </DocumentTitle>
  );
};

export default MfaTokenSetup;
