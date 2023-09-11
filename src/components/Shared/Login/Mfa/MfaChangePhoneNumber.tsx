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
import Utils, { MobileRegex } from "../../../../Helper/Utils";
import { AuthContext } from "../../../../context/AuthContext";
import DTEBackLink from "../../UI/DTEBackLink/DTEBackLink";
import Honeypot from "../../Honeypot/Honeypot";
import { ContentContext } from "../../../../context/ContentContext";

const ButtonWrapper = styled.div`
  margin: 1rem 0;
`;

const MfaChangePhoneNumber = () => {
  const { content } = useContext(ContentContext);
  const { mfaDetails, setMfaDetails, setEnteredMfaMobile, enteredMfaMobile } = useContext(AuthContext);
  const history = useHistory();

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

  const [{ loading: setupMfaLoading }, postSetupInfo] = useAxiosFetch({}, { useCache: false, manual: true });

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
    <DocumentTitle title={content["mfa-change-phone-document-title"]}>
      <StepWrapper>
        <DTEBackLink onClick={() => history.goBack()} linkText="Back" />
        <DTEHeader as="h1">{content["mfa-change-phone-header"]}</DTEHeader>
        <DTEContent>{content["mfa-change-phone-instruction-text"]}</DTEContent>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Honeypot />
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
              <DTEInput
                label={content["mfa-change-phone-input-phone"]}
                id="mobilePhoneNumber"
                type="tel"
                required
                value={value}
                onValueChange={onChange}
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
                message: content["mfa-change-phone-validation-phone-required"],
              },

              pattern: {
                value: MobileRegex,
                message: content["mfa-change-phone-validation-phone-invalid"],
              },
            }}
          />
          <ButtonWrapper>
            <DTEButton disabled={setupMfaLoading || isSubmitting}>{content["reusable-button-continue"]}</DTEButton>
          </ButtonWrapper>
        </form>
      </StepWrapper>
    </DocumentTitle>
  );
};

export default MfaChangePhoneNumber;
