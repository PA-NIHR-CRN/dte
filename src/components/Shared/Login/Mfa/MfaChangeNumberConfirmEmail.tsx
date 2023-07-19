import styled from "styled-components";
import React, { useEffect, useContext } from "react";
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
import DTERouteLink from "../../UI/DTERouteLink/DTERouteLink";
import DTELinkButton from "../../UI/DTELinkButton/DTELinkButton";
import DTEBackLink from "../../UI/DTEBackLink/DTEBackLink";
import ErrorMessageContainer from "../../ErrorMessageContainer/ErrorMessageContainer";

const ButtonWrapper = styled.div`
  margin: 1rem 0;
`;

const MfaChangeNumberConfirmEmail = () => {
  const { mfaDetails } = useContext(AuthContext);
  const history = useHistory();

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
  const [{ loading: getEmailOtpLoading }, resendCode] = useAxiosFetch(
    {
      url: `${process.env.REACT_APP_BASE_API}/users/sendmfaotpemail`,
      method: "POST",
      data: {
        mfaDetails,
      },
    },
    { useCache: false, manual: false }
  );

  const handleResendCode = async () => {
    await resendCode();
  };

  const [
    {
      response: validateEmailOtpRespose,
      loading: validateEmailOtpLoading,
      error: validateEmailOtpError,
    },
    validateEmailOtp,
  ] = useAxiosFetch({}, { useCache: false, manual: true });

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
    if (response?.errors?.some((e) => e.customCode === "MFA_Code_Expired")) {
      history.push("/MfaTokenChallenge");
    }
    if (response?.isSuccess) {
      history.push("/MfaChangePhoneNumber");
    }
  };

  useEffect(() => {
    if (document.getElementsByClassName("nhsuk-error-message")[0]) {
      Utils.FocusOnError();
    }
  }, [isSubmitting]);

  return (
    <DocumentTitle title="Email OTP">
      <StepWrapper>
        <DTEBackLink onClick={() => history.goBack()} linkText="Back" />
        <DTEHeader as="h1">Check your email</DTEHeader>
        <ErrorMessageContainer
          axiosErrors={[validateEmailOtpError]}
          DTEAxiosErrors={[
            Utils.ConvertResponseToDTEResponse(validateEmailOtpRespose)?.errors,
          ]}
        />
        <DTEContent>
          Enter the 6 digit security code we’ve sent to to confirm this is your
          email address.
        </DTEContent>
        <DTEContent>
          You need to use this code within <strong>5 minutes</strong> or it will
          expire.
        </DTEContent>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
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
                required
                value={value}
                onValueChange={(e) => {
                  onChange(e);
                }}
                onValueBlur={onBlur}
                error={error?.message}
                spellcheck={false}
                disabled={getEmailOtpLoading || isSubmitting}
                hint="The code is 6 digits. Entering the code incorrectly too many times will temporarily prevent you from signing in."
              />
            )}
            rules={{
              required: {
                value: true,
                message: "Enter a valid security code",
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
                <li>check your spam folder</li>
                <li>
                  <DTELinkButton
                    onClick={handleResendCode}
                    disabled={validateEmailOtpLoading || isSubmitting}
                  >
                    Send your security code again
                  </DTELinkButton>
                </li>
              </ul>
            </>
          </DTEDetails>
          <DTEDetails summary="Use another way to secure my account">
            <>
              <DTEContent>
                If you do not have a UK mobile phone number or do not want to
                use this method, you can{" "}
                <DTERouteLink
                  disabled={validateEmailOtpLoading || isSubmitting}
                  to="/MfaTokenSetup"
                  renderStyle="standard"
                >
                  use an authenticator app to secure your account
                </DTERouteLink>
                .
              </DTEContent>
            </>
          </DTEDetails>
          <ButtonWrapper>
            <DTEButton disabled={getEmailOtpLoading || isSubmitting}>
              Continue
            </DTEButton>
          </ButtonWrapper>
        </form>
      </StepWrapper>
    </DocumentTitle>
  );
};

export default MfaChangeNumberConfirmEmail;
