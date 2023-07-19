import { useHistory } from "react-router-dom";
import React, { useContext } from "react";
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
import DTELinkButton from "../../UI/DTELinkButton/DTELinkButton";
import DTEDetails from "../../UI/DTEDetails/DTEDetails";
import DTERouteLink from "../../UI/DTERouteLink/DTERouteLink";
import MfaSmsSetup from "./MfaSmsSetup";

const MfaTotpChallenge = () => {
  const { mfaDetails, saveToken, setMfaDetails } = useContext(AuthContext);
  const history = useHistory();

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
  const [
    {
      response: TokenMfaResponse,
      loading: TokenMfaLoading,
      error: setupMfaError,
    },
    postMfaCode,
  ] = useAxiosFetch({}, { useCache: false, manual: true });

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
    if (result?.isSuccess) {
      saveToken(result?.content);
      setMfaDetails("");
      history.push("/");
    }
  };

  return (
    <DocumentTitle title="MFA Challenge TOTP">
      <StepWrapper>
        <DTEHeader as="h1">Enter your 6 Digit code</DTEHeader>
        <ErrorMessageContainer
          axiosErrors={[setupMfaError]}
          DTEAxiosErrors={[
            Utils.ConvertResponseToDTEResponse(TokenMfaResponse)?.errors,
          ]}
        />
        <DTEContent>
          Please enter the 6 digit code from your authenticator app.
        </DTEContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            control={control}
            name="mfaCode"
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <DTEInput
                label="Code"
                id="mfaCode"
                type="text"
                required
                value={value}
                onValueChange={onChange}
                onValueBlur={onBlur}
                error={error?.message}
                spellcheck={false}
                disabled={TokenMfaLoading || isSubmitting}
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
          <DTEDetails summary="I do not have access to my authenticator app">
            <DTEContent>
              If you do not have access to your authenticator app, you can{" "}
              <DTERouteLink
                to="/MfaSmsSetup"
                disabled={isSubmitting}
                renderStyle="standard"
              >
                use a UK mobile phone number to secure your account.
              </DTERouteLink>
            </DTEContent>
          </DTEDetails>
          <DTEButton type="submit" disabled={TokenMfaLoading || isSubmitting}>
            Send security code
          </DTEButton>
        </form>
      </StepWrapper>
    </DocumentTitle>
  );
};

export default MfaTotpChallenge;
