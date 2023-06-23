import styled from "styled-components";
import { useContext, useState } from "react";
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
import DTECheckBox from "../../UI/DTECheckBox/DTECheckBox";

const ButtonWrapper = styled.div`
  margin: 1rem 0;
`;

const MfaSmsSetup = () => {
  const { mfaDetails, setMfaDetails } = useContext(AuthContext);
  const history = useHistory();
  const [ukMobileNumber, setUkMobileNumber] = useState("");
  const [ukMobileInputDisabled, setUkMobileInputDisabled] = useState(false);
  const [ukMobileChecked, setUkMobileChecked] = useState(false);
  const [ukMobileICheckboxDisabled, setUkMobileICheckboxDisabled] =
    useState(false);

  // if (!mfaDetails) {
  //   history.push("/");
  // }
  const {
    trigger,
    control,
    handleSubmit,
    setValue,
    formState: { errors: formErrors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      phoneNumber: "",
    },
  });
  const [
    {
      response: setupMfaResponse,
      loading: setupMfaLoading,
      error: setupMfaError,
    },
    postSetupInfo,
  ] = useAxiosFetch({}, { useCache: false, manual: true });

  const onSubmit = async (data: any) => {
    if (ukMobileChecked) {
      history.push(`/MfaSmsChallenge?mobilePhoneNumber=${ukMobileNumber}`);
    }
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
      history.push(`/MfaSmsChallenge?mobilePhoneNumber=${ukMobileNumber}`);
    }
  };

  const handleButtonClick = async () => {
    if (ukMobileChecked) {
      history.push("/MfaNoUkMobileOptions");
    } else {
      const result = await trigger(); // manually triggers validation
      if (result) {
        // form is valid
        await handleSubmit(onSubmit)(); // manually submits form
      }
    }
  };

  const handleUKMobileCheckbox = async () => {
    setUkMobileChecked(!ukMobileChecked);
    setUkMobileInputDisabled(!ukMobileInputDisabled);
  };

  return (
    <DocumentTitle title="Enter your mobile phone number">
      <StepWrapper>
        <DTEHeader as="h1">Enter your mobile phone number</DTEHeader>
        <DTEContent>
          We will send you a 6 digit security code to confirm your mobile phone
          number.
        </DTEContent>
        <DTEContent>
          We will only use your mobile phone number to send you a security code
          to verify your identity. We will not use it for any other purpose.
        </DTEContent>
        <form noValidate>
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
                  setUkMobileNumber(e.target.value);
                  if (e.target.value.length > 0)
                    setUkMobileICheckboxDisabled(true);
                  else setUkMobileICheckboxDisabled(false);
                }}
                onValueBlur={onBlur}
                error={error?.message}
                spellcheck={false}
                autocomplete="tel-national"
                disabled={
                  setupMfaLoading || isSubmitting || ukMobileInputDisabled
                }
              />
            )}
            rules={{
              required: {
                value: true,
                message: "Enter a UK Phone Number",
              },

              pattern: {
                value: MobileRegex,
                message: "Enter a valid UK Phone Number",
              },
            }}
          />
          <DTECheckBox
            id="noMobileNumber"
            label="Use another way to secure my account"
            defaultChecked={ukMobileChecked}
            value="Use another way to secure my account"
            onClick={() => handleUKMobileCheckbox()}
            disabled={ukMobileICheckboxDisabled}
          />
          <DTEDetails summary="Not received your security code?">
            <>
              <DTEContent>
                When we are really busy, it may take a bit longer for your code
                to arrive.
              </DTEContent>
              <DTELinkButton
                onClick={handleResendCode}
                disabled={SMSMfaLoading || isSubmitting}
              >
                Send the security code again
              </DTELinkButton>
            </>
          </DTEDetails>
          <ButtonWrapper>
            <DTEButton
              type="button"
              onClick={handleButtonClick}
              disabled={setupMfaLoading || isSubmitting}
            >
              Continue
            </DTEButton>
          </ButtonWrapper>
        </form>
      </StepWrapper>
    </DocumentTitle>
  );
};

export default MfaSmsSetup;
