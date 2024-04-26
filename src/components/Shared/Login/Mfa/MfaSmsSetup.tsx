import styled from "styled-components";
import { useEffect, useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import DocumentTitle from "react-document-title";
import DTEHeader from "../../UI/DTETypography/DTEHeader/DTEHeader";
import StepWrapper from "../../StepWrapper/StepWrapper";
import DTEInput from "../../UI/DTEInput/DTEInput";
import DTEButton from "../../UI/DTEButton/DTEButton";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";
import Utils, { MobileRegex } from "../../../../Helper/Utils";
import { AuthContext } from "../../../../context/AuthContext";
import LoadingIndicator from "../../LoadingIndicator/LoadingIndicator";
import Honeypot from "../../Honeypot/Honeypot";
import { ContentContext } from "../../../../context/ContentContext";

const ButtonWrapper = styled.div`
  margin: 1rem 0;
`;

const MfaSmsSetup = () => {
  const { content } = useContext(ContentContext);
  const { mfaDetails, setMfaDetails, setEnteredMfaMobile, prevUrl, enteredMfaMobile } = useContext(AuthContext);
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
  const [{ loading: setupMfaLoading }, postSetupInfo] = useAxiosFetch({}, { useCache: false, manual: true });

  useEffect(() => {
    const reissueSession = async () => {
      try {
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
      } catch (err) {
        console.error(err);
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
    <DocumentTitle title={content["mfa-sms-setup-document-title"]}>
      <StepWrapper>
        {setupMfaLoading ? (
          <LoadingIndicator />
        ) : (
          <>
            <DTEHeader as="h1" captionKey="mfa-sms-setup-header">
              {content["mfa-sms-setup-header"]}
            </DTEHeader>
            {content["mfa-sms-setup-instruction-text"]}
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <Honeypot />
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                  <DTEInput
                    label={content["mfa-sms-setup-input-phone"]}
                    id="mobilePhoneNumber"
                    type="tel"
                    required
                    value={value}
                    onValueChange={(e) => {
                      onChange(e);
                      setEnteredMfaMobile(e.target.value);
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
                    message: content["mfa-sms-setup-validation-phone-required"],
                  },
                  pattern: {
                    value: MobileRegex,
                    message: content["mfa-sms-setup-validation-phone-invalid"],
                  },
                }}
              />
              {content["mfa-sms-setup"]}
              <ButtonWrapper>
                <DTEButton disabled={setupMfaLoading || isSubmitting}>{content["reusable-button-continue"]}</DTEButton>
              </ButtonWrapper>
            </form>
          </>
        )}
      </StepWrapper>
    </DocumentTitle>
  );
};

export default MfaSmsSetup;
