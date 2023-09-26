import { useHistory } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
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
import useInlineServerError from "../../../../hooks/useInlineServerError";
import Honeypot from "../../Honeypot/Honeypot";
import { ContentContext } from "../../../../context/ContentContext";

const MfaTotpChallenge = () => {
  const { content } = useContext(ContentContext);
  const { mfaDetails, saveToken, setMfaDetails, setEnteredMfaMobile, setUserMfaEmail } = useContext(AuthContext);
  const history = useHistory();
  const [convertedError, setConvertedError] = useState<any>(null);
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
  const [{ response: TokenMfaResponse, loading: TokenMfaLoading, error: setupMfaError }, postMfaCode] = useAxiosFetch(
    {},
    { useCache: false, manual: true }
  );
  useEffect(() => {
    if (document.getElementsByClassName("nhsuk-error-message")[0]) {
      Utils.FocusOnError();
    }
  }, [isSubmitting, convertedError, TokenMfaResponse]);

  const serverError = useInlineServerError(TokenMfaResponse, content);

  useEffect(() => {
    if (serverError) {
      setConvertedError(serverError);
    }
  }, [serverError]);

  if (!mfaDetails) {
    history.push("/");
  }

  const onSubmit = async (data: any) => {
    const { mfaCode } = data;
    const res = await postMfaCode({
      url: `${process.env.REACT_APP_BASE_API}/users/respondtototpmfachallenge`,
      method: "POST",
      data: {
        mfaCode,
        mfaDetails,
      },
    });
    const result = Utils.ConvertResponseToDTEResponse(res);
    if (result?.errors?.some((e) => e.customCode === "MFA_Session_Expired")) {
      history.push("/MfaSessionExpired");
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
      setEnteredMfaMobile("");
      setUserMfaEmail("your email address");
      history.push("/");
    }
  };

  const interceptSubmit = (e: any) => {
    e.preventDefault();
    setConvertedError(null);
    handleSubmit(onSubmit)();
  };

  return (
    <DocumentTitle title={content["mfa-token-challenge-document-title"]}>
      <StepWrapper>
        <DTEHeader as="h1">{content["mfa-token-challenge-header"]}</DTEHeader>
        <ErrorMessageContainer
          axiosErrors={[setupMfaError]}
          DTEAxiosErrors={[serverError ? [] : Utils.ConvertResponseToDTEResponse(TokenMfaResponse)?.errors]}
        />
        <DTEContent>{content["mfa-token-challenge-instruction-text"]}</DTEContent>
        <form onSubmit={interceptSubmit} noValidate>
          <Honeypot />
          <Controller
            control={control}
            name="mfaCode"
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
              <DTEInput
                label={content["mfa-token-challenge-input-security-code"]}
                id="mfaCode"
                type="text"
                required
                value={value}
                onValueChange={onChange}
                onValueBlur={onBlur}
                error={convertedError || error?.message}
                spellcheck={false}
                disabled={TokenMfaLoading || isSubmitting}
                autocomplete="off"
              />
            )}
            rules={{
              required: {
                value: true,
                message: content["mfa-token-challenge-validation-security-code-required"],
              },

              pattern: {
                value: /^\d{6}$/,
                message: content["mfa-token-challenge-validation-security-code-invalid"],
              },
            }}
          />
          <DTEButton type="submit" disabled={TokenMfaLoading || isSubmitting}>
            {content["mfa-token-challenge-button-send-security-code"]}
          </DTEButton>
        </form>
      </StepWrapper>
    </DocumentTitle>
  );
};

export default MfaTotpChallenge;
