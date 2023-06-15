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
import Utils, { LandlineRegex } from "../../../../Helper/Utils";
import { AuthContext } from "../../../../context/AuthContext";
import DTEBackLink from "../../UI/DTEBackLink/DTEBackLink";

const ButtonWrapper = styled.div`
  margin: 1rem 0;
`;

const MfaLandlineSetup = () => {
  const { mfaDetails, setMfaDetails } = useContext(AuthContext);
  const history = useHistory();

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      landlineNumber: "",
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
    const { landlineNumber } = data;
    const res = await postSetupInfo({
      url: `${process.env.REACT_APP_BASE_API}/users/setupsmsmfa`,
      method: "POST",
      data: {
        landlineNumber,
        mfaDetails,
      },
    });
    const result = Utils.ConvertResponseToDTEResponse(res);
    if (result?.errors?.some((e) => e.customCode === "Sms_Mfa_Challenge")) {
      setMfaDetails(result?.errors[0]?.detail as string);
      history.push("/MfaSmsChallenge");
    }
  };

  return (
    <DocumentTitle title="Enter your landline number">
      <StepWrapper>
        <DTEBackLink onClick={() => history.goBack()} linkText="Back" />
        <DTEHeader as="h1">Enter your landline number</DTEHeader>
        <DTEContent>
          Our automated service will call you and read out a 6-digit code, so
          please have a pen and paper handy.
        </DTEContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            control={control}
            name="landlineNumber"
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <DTEInput
                label="Landline number"
                id="landlineNumber"
                type="tel"
                required
                value={value}
                onValueChange={onChange}
                onValueBlur={onBlur}
                error={error?.message}
                spellcheck={false}
                autocomplete="tel"
                disabled={setupMfaLoading || isSubmitting}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "Enter a Landline Number",
              },

              pattern: {
                value: LandlineRegex,
                message: "Enter a valid UK Landline Number",
              },
            }}
          />
          <ButtonWrapper>
            <DTEButton type="submit" disabled={setupMfaLoading || isSubmitting}>
              Continue
            </DTEButton>
          </ButtonWrapper>
        </form>
      </StepWrapper>
    </DocumentTitle>
  );
};

export default MfaLandlineSetup;
