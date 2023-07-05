import { useHistory } from "react-router-dom";
import React, { useEffect, useContext } from "react";
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
  const {
    mfaDetails,
    saveToken,
    setMfaDetails,
    authenticatedMobile,
    enteredMfaMobile,
  } = useContext(AuthContext);

  const mobilePhoneNumber = enteredMfaMobile || "your mobile phone";

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

  const handleAlternativeMFA = async () => {
    history.push("/MfaTokenSetup");
  };

  const handleReEnterNumber = async () => {
    history.push("/MfaSmsSetup");
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

  useEffect(() => {
    if (document.getElementsByClassName("nhsuk-error-message")[0]) {
      Utils.FocusOnError();
    }
  }, [isSubmitting]);

  const removePlus = (number: string) => number.replace("+", "");

  return (
    <DocumentTitle title="MFA Challenge SMS">
      <StepWrapper>
        <DTEHeader as="h1">Check your mobile phone</DTEHeader>
        <ErrorMessageContainer
          axiosErrors={[setupMfaError]}
          DTEAxiosErrors={[
            Utils.ConvertResponseToDTEResponse(SMSMfaResponse)?.errors,
          ]}
        />
        <DTEContent>
          {authenticatedMobile != null ? (
            <>
              Enter the 6 digit security code we’ve sent to{" "}
              {removePlus(authenticatedMobile)}.
            </>
          ) : (
            <>
              Enter the 6 digit security code we&apos;ve sent to{" "}
              {mobilePhoneNumber} to confirm this is your mobile phone number.
            </>
          )}
          <br />
          <br />
          You need to use this code within <strong>5 minutes</strong> or it will
          expire.
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
              <ul className="govuk-list govuk-list--bullet">
                <li>
                  <DTELinkButton
                    onClick={handleResendCode}
                    disabled={SMSMfaLoading || isSubmitting}
                  >
                    send your security code again
                  </DTELinkButton>
                </li>
                <li>
                  <DTELinkButton
                    onClick={handleReEnterNumber}
                    disabled={SMSMfaLoading || isSubmitting}
                  >
                    enter your mobile phone number again
                  </DTELinkButton>
                </li>
                <li>
                  <DTELinkButton
                    onClick={handleAlternativeMFA}
                    disabled={SMSMfaLoading || isSubmitting}
                  >
                    use another way to secure your account
                  </DTELinkButton>
                </li>
              </ul>
            </>
          </DTEDetails>
          <DTEDetails summary="I do not have access to my mobile phone">
            <DTEContent>
              If you do not have access to your phone you can{" "}
              <DTERouteLink
                onClick={() => history.push("/MfaChangePhoneNumber")}
                disabled={SMSMfaLoading || isSubmitting}
                to="/"
                renderStyle="standard"
              >
                change your phone number securely
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
