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
import DTEBackLink from "../../UI/DTEBackLink/DTEBackLink";
import DTEDetails from "../../UI/DTEDetails/DTEDetails";
import DTELinkButton from "../../UI/DTELinkButton/DTELinkButton";
import DTERouteLink from "../../UI/DTERouteLink/DTERouteLink";

const MfaSmsChallenge = () => {
  const { mfaDetails, saveToken, setMfaDetails } = useContext(AuthContext);
  const history = useHistory();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors: formErrors, isSubmitting, isSubmitSuccessful },
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
    if (result?.isSuccess) {
      saveToken(result?.content);
      setMfaDetails("");
      history.push("/");
    }
  };

  const handleResendCode = async () => {
    const res = await postMfaCode({
      url: `${process.env.REACT_APP_BASE_API}/users/resendmfachallenge`,
      method: "POST",
      data: {
        mfaDetails,
      },
    });
    const result = Utils.ConvertResponseToDTEResponse(res);
    if (result?.isSuccess) {
      setMfaDetails(result?.content);
    }
  };

  return (
    <DocumentTitle title="MFA Challenge SMS">
      <StepWrapper>
        <DTEBackLink onClick={() => history.goBack()} linkText="Back" />
        <DTEHeader as="h1">Check your mobile phone</DTEHeader>
        <ErrorMessageContainer
          axiosErrors={[setupMfaError]}
          DTEAxiosErrors={[
            Utils.ConvertResponseToDTEResponse(SMSMfaResponse)?.errors,
          ]}
        />
        <DTEContent>
          Enter the 6 digit security code we&apos;ve sent to your mobile phone.
        </DTEContent>
        <DTEDetails summary="Not received your security code?">
          <>
            <DTEContent>
              We need your email address so we can contact you when we find a
              suitable study
            </DTEContent>
            <DTELinkButton
              onClick={handleResendCode}
              disabled={SMSMfaLoading || isSubmitting}
            >
              Send the security code again
            </DTELinkButton>
          </>
        </DTEDetails>
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
                hint="The code is 6 digits"
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
          <DTEDetails summary="I do not have access to my mobile phone">
            <DTEContent>
              If you do not have access to your phone you can{" "}
              <DTERouteLink
                onClick={() => history.push("/mfa/change-phone-number")}
                disabled={SMSMfaLoading || isSubmitting}
                to="/"
                renderStyle="standard"
              >
                change your phone number securely.
              </DTERouteLink>
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
