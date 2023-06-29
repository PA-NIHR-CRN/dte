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

const MfaTokenSetup = () => {
  const { mfaDetails, saveToken, setMfaDetails } = useContext(AuthContext);
  const history = useHistory();
  const [qrSrc, setQrSrc] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [username, setUsername] = useState("");

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors: formErrors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      authenticatorAppCode: "",
    },
  });
  const [
    {
      response: tokenCodeResponse,
      loading: tokenCodeLoading,
      error: tokenCodeError,
    },
  ] = useAxiosFetch(
    {
      url: `${process.env.REACT_APP_BASE_API}/users/setuptokenmfa`,
      method: "POST",
      data: {
        mfaDetails,
      },
    },
    { useCache: false, manual: false }
  );

  // eslint-disable-next-line consistent-return
  const generateQR = async (code: string) => {
    try {
      return await QRCode.toDataURL(code);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!tokenCodeResponse?.data?.content?.secretCode) return;
    setSessionId(tokenCodeResponse?.data?.content?.sessionId);
    setUsername(tokenCodeResponse?.data?.content?.username);
    const qrCode = `otpauth://totp/AWSCognito:${tokenCodeResponse?.data.content.username}?secret=${tokenCodeResponse?.data.content.secretCode}&issuer=Cognito`;
    generateQR(qrCode).then((res) => {
      setQrSrc(res as string);
    });
  }, [tokenCodeResponse]);

  const [
    { response: totpMfaResponse, loading: totpMfaLoading, error: totpMfaError },
    postMfaCode,
  ] = useAxiosFetch({}, { useCache: false, manual: true });

  const onSubmit = async (data: any) => {
    const { authenticatorAppCode } = data;
    console.log(sessionId);
    const res = await postMfaCode({
      // url: `${process.env.REACT_APP_BASE_API}/users/respondtototpmfachallenge`,
      url: `${process.env.REACT_APP_BASE_API}/users/verifytokenmfa`,
      method: "POST",
      data: {
        authenticatorAppCode,
        mfaDetails,
        // sessionId,
        // username,
      },
    });
    const result = Utils.ConvertResponseToDTEResponse(res);
    if (result?.isSuccess) {
      saveToken(result?.content);
      setMfaDetails("");
      history.push("/");
    }
  };

  return (
    <DocumentTitle title="MFA Setup Token">
      <StepWrapper>
        <ErrorMessageContainer
          axiosErrors={[totpMfaError]}
          DTEAxiosErrors={[
            Utils.ConvertResponseToDTEResponse(totpMfaResponse)?.errors,
          ]}
        />
        <DTEBackLink onClick={() => history.goBack()} linkText="Back" />
        <DTEHeader as="h1">Connect your authenticator app</DTEHeader>
        <DTEContent>
          Open your authenticator app and scan the QR code below.
        </DTEContent>
        <DTEContent>
          If you cant scan the QR code, enter the code below it into your
          authenticator app.
        </DTEContent>
        <div>
          {qrSrc ? <img src={qrSrc} alt="qr code" /> : <LoadingIndicator />}
        </div>
        <DTEContent>{}</DTEContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            control={control}
            name="authenticatorAppCode"
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <DTEInput
                label="Authenticator app code"
                id="authenticatorAppCode"
                type="text"
                required
                value={value}
                onValueChange={onChange}
                onValueBlur={onBlur}
                error={error?.message}
                spellcheck={false}
                disabled={tokenCodeLoading || isSubmitting || totpMfaLoading}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "Enter your MFA Code",
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
            Send security code
          </DTEButton>
        </form>
      </StepWrapper>
    </DocumentTitle>
  );
};

export default MfaTokenSetup;
