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
import DTERouteLink from "../../UI/DTERouteLink/DTERouteLink";
import useInlineServerError from "../../../../hooks/useInlineServerError";

const ButtonWrapper = styled.div`
  margin: 1rem 0;
`;

const ComponentSpacer = styled.div`
  padding: 1rem 0;
`;

const MfaTokenSetup = () => {
  const { mfaDetails, saveToken, setMfaDetails } = useContext(AuthContext);
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
  const [{ response: tokenCodeResponse, loading: tokenCodeLoading }] =
    useAxiosFetch(
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
    const qrCode = `otpauth://totp/AWSCognito:${username}?secret=${secretCode}&issuer=Cognito`;
    generateQR(qrCode).then((res) => {
      setQrSrc(res as string);
    });
  }, [tokenCodeResponse]);

  const [
    { response: totpMfaResponse, loading: totpMfaLoading, error: totpMfaError },
    postMfaCode,
  ] = useAxiosFetch({}, { useCache: false, manual: true });
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
    if (
      result?.errors?.some(
        (e) => e.customCode === "Software_Token_Mfa_Challenge"
      )
    ) {
      setMfaDetails(result?.errors[0]?.detail as string);
      history.push("/MfaTokenChallenge");
    }
    if (result?.isSuccess) {
      saveToken(result?.content);
      setMfaDetails("");
      history.push("/");
    }
  };

  useEffect(() => {
    if (document.getElementsByClassName("nhsuk-error-message")[0]) {
      Utils.FocusOnError();
    }
  }, [isSubmitting]);

  return (
    <DocumentTitle title="MFA Setup Token">
      <StepWrapper>
        <ErrorMessageContainer
          axiosErrors={[totpMfaError]}
          DTEAxiosErrors={[
            convertedError
              ? []
              : Utils.ConvertResponseToDTEResponse(totpMfaResponse)?.errors,
          ]}
        />
        <DTEBackLink onClick={() => history.goBack()} linkText="Back" />
        <DTEHeader as="h1">Set up your authenticator app</DTEHeader>
        <DTEContent>
          You can download an authenticator app on any smart device, such as a
          smart phone or tablet. Examples of authenticator apps are the{" "}
          <DTERouteLink
            aria-label="Opens in a new tab"
            external
            target="_blank"
            to="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en&pli=1"
            renderStyle="standard"
          >
            Google Authenticator
          </DTERouteLink>{" "}
          and{" "}
          <DTERouteLink
            aria-label="Opens in a new tab"
            external
            target="_blank"
            to="https://www.microsoft.com/en-us/security/mobile-authenticator-app"
            renderStyle="standard"
          >
            Microsoft Authenticator
          </DTERouteLink>
          .
        </DTEContent>
        <DTEContent>
          Alternatively, you can install an authenticator app on a computer. An
          example of an authenticator app that doesn&apos;t require a smart
          device is the{" "}
          <DTERouteLink
            aria-label="Opens in a new tab"
            external
            target="_blank"
            to="https://authenticator.cc/docs/en/overview"
            renderStyle="standard"
          >
            Authenticator Extension
          </DTERouteLink>
          .
        </DTEContent>
        <DTEContent>
          Once your authenticator app is installed, you will then need to open
          it and manually enter the secret key or scan the QR code. Select a
          time-based code if you are given the option between time-based or
          counter-based in your authenticator app.
        </DTEContent>
        <DTEContent>
          If you need support in setting up your authenticator app, please
          contact us at{" "}
          <a href="mailto:bepartofresearch@nihr.ac.uk">
            bepartofresearch@nihr.ac.uk
          </a>
          .
        </DTEContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DTEInput
            label="Secret key"
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
              Copy secret key
            </DTEButton>
          </ButtonWrapper>
          <ComponentSpacer>
            <DTEDetails summary="Show QR code">
              <>
                <DTEContent>
                  <div>
                    {qrSrc ? (
                      <img src={qrSrc} alt="qr code" />
                    ) : (
                      <LoadingIndicator />
                    )}
                  </div>
                </DTEContent>
              </>
            </DTEDetails>
          </ComponentSpacer>
          <DTEContent>
            A 6-digit security code will appear in your authenticator app once
            it is set up. Enter this security code below.
          </DTEContent>
          <Controller
            control={control}
            name="authenticatorAppCode"
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <DTEInput
                label="Security code"
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
                message: "Enter a valid security code",
              },

              pattern: {
                value: /^\d{6}$/,
                message: "Code must be 6 digits long",
              },
            }}
          />
          <DTEButton
            type="submit"
            disabled={tokenCodeLoading || isSubmitting || totpMfaLoading}
          >
            Continue
          </DTEButton>
        </form>
        <ComponentSpacer>
          <DTERouteLink
            disabled={tokenCodeLoading || isSubmitting || totpMfaLoading}
            to="/MfaSmsSetup"
            renderStyle="standard"
          >
            Use another way to secure your account
          </DTERouteLink>
        </ComponentSpacer>
      </StepWrapper>
    </DocumentTitle>
  );
};

export default MfaTokenSetup;
