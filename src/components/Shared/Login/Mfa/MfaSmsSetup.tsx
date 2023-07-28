import styled from "styled-components";
import { useEffect, useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import DocumentTitle from "react-document-title";
import DTEHeader from "../../UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../UI/DTETypography/DTEContent/DTEContent";
import StepWrapper from "../../StepWrapper/StepWrapper";
import DTEInput from "../../UI/DTEInput/DTEInput";
import DTEButton from "../../UI/DTEButton/DTEButton";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";
import Utils, { MobileRegex } from "../../../../Helper/Utils";
import { AuthContext } from "../../../../context/AuthContext";
import DTEDetails from "../../UI/DTEDetails/DTEDetails";
import DTERouteLink from "../../UI/DTERouteLink/DTERouteLink";

const ButtonWrapper = styled.div`
  margin: 1rem 0;
`;

const MfaSmsSetup = () => {
  const {
    mfaDetails,
    setMfaDetails,
    setEnteredMfaMobile,
    prevUrl,
    enteredMfaMobile,
  } = useContext(AuthContext);
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
      phoneNumber: enteredMfaMobile,
    },
  });
  const [{ loading: setupMfaLoading }, postSetupInfo] = useAxiosFetch(
    {},
    { useCache: false, manual: true }
  );

  useEffect(() => {
    const reissueSession = async () => {
      const res = await postSetupInfo({
        url: `${process.env.REACT_APP_BASE_API}/users/reissuesession`,
        method: "POST",
        data: {
          mfaDetails,
        },
      });
      const result = Utils.ConvertResponseToDTEResponse(res);
      if (result?.errors?.some((e) => e.customCode === "Mfa_Reissue_Session")) {
        setMfaDetails(result?.errors[0]?.detail as string);
      }
    };
    if (prevUrl === "/MfaTokenSetup") {
      reissueSession();
    }
  }, [prevUrl]);

  const onSubmit = async (data: any) => {
    const { phoneNumber } = data;
    const res = await postSetupInfo({
      url: `${process.env.REACT_APP_BASE_API}/users/setupsmsmfa`,
      method: "POST",
      data: {
        phoneNumber,
        mfaDetails,
      },
    });
    const result = Utils.ConvertResponseToDTEResponse(res);
    if (result?.errors?.some((e) => e.customCode === "Sms_Mfa_Challenge")) {
      setMfaDetails(result?.errors[0]?.detail as string);
      setEnteredMfaMobile(phoneNumber);
      history.push("/MfaSmsChallenge");
    }
  };

  useEffect(() => {
    if (document.getElementsByClassName("nhsuk-error-message")[0]) {
      Utils.FocusOnError();
    }
  }, [isSubmitting]);

  return (
    <DocumentTitle title="Enter your mobile phone number">
      <StepWrapper>
        <DTEHeader as="h1">Enter your mobile phone number</DTEHeader>
        <DTEContent>
          We will send you a 6 digit security code to your phone to confirm your
          mobile number.
        </DTEContent>
        <DTEContent>
          We will only use your mobile phone number to send you a security code
          to verify your identity. We will not use it for any other purpose.
        </DTEContent>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="phoneNumber"
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <DTEInput
                label="UK mobile phone number"
                id="mobilePhoneNumber"
                type="tel"
                required
                value={value}
                onValueChange={(e) => {
                  onChange(e);
                }}
                onValueBlur={onBlur}
                error={error?.message}
                spellcheck={false}
                autocomplete="tel-national"
                disabled={setupMfaLoading || isSubmitting}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "Enter a UK mobile phone number",
              },

              pattern: {
                value: MobileRegex,
                message: "Enter a valid UK mobile phone number",
              },
            }}
          />
          <DTEDetails summary="Use another way to secure my account">
            <>
              <DTEContent>
                If you do not have a UK mobile phone number or do not want to
                use this method, you can{" "}
                <DTERouteLink
                  disabled={setupMfaLoading || isSubmitting}
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
            <DTEButton disabled={setupMfaLoading || isSubmitting}>
              Continue
            </DTEButton>
          </ButtonWrapper>
        </form>
      </StepWrapper>
    </DocumentTitle>
  );
};

export default MfaSmsSetup;
