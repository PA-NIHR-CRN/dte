import { Controller, useForm } from "react-hook-form";
import { Radios } from "nhsuk-react-components";
import { useHistory } from "react-router-dom";
import DocumentTitle from "react-document-title";
import StepWrapper from "../../StepWrapper/StepWrapper";
import DTERadio from "../../UI/DTERadio/DTERadio";
import DTEHeader from "../../UI/DTETypography/DTEHeader/DTEHeader";
import DTEButton from "../../UI/DTEButton/DTEButton";
import DTEBackLink from "../../UI/DTEBackLink/DTEBackLink";
import Honeypot from "../../Honeypot/Honeypot";

type MfaNoUkMobileOptionsData = {
  ukLandline: string;
  authenticationApp: string;
};

const MfaNoUkMobileOptions = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      ukLandline: "",
      authenticationApp: "",
    },
  });

  const history = useHistory();

  const handleOptionSelect = (data: MfaNoUkMobileOptionsData) => {
    if (data.ukLandline === "yes") {
      history.push("/MfaLandlineSetup");
    } else {
      history.push("/MfaTokenSetup");
    }
  };
  return (
    <DocumentTitle title="Please select an option">
      <StepWrapper>
        <DTEBackLink onClick={() => history.goBack()} linkText="Back" />
        <DTEHeader as="h1">Please select an option</DTEHeader>
        <form onSubmit={handleSubmit(handleOptionSelect)} noValidate>
          <Honeypot />
          <Controller
            control={control}
            name="ukLandline"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <>
                <DTERadio
                  id="ukLandlineRadio"
                  name="ukLandline"
                  label="As you have selected that you do not have a UK phone number, you’ll need to provide us with another way to secure your account."
                  onChange={onChange}
                  error={error?.message}
                  infoText="As you have selected that you do not have a UK phone number, you’ll need to provide us with another way to secure your account."
                >
                  <Radios.Radio
                    value="yes"
                    defaultChecked={value === "yes"}
                    aria-label="Provide a UK landline number. Our automated service will call you and read out a 6 digit code, so please have a pen and paper handy"
                    aria-labelledby=""
                  >
                    Provide a UK landline number. Our automated service will
                    call you and read out a 6 digit code, so please have a pen
                    and paper handy
                  </Radios.Radio>
                  <Radios.Radio
                    value="no"
                    defaultChecked={value === "no"}
                    aria-label="Use an online authenticator application: We also have the option to use (TBC or TBC) in order to authenticate your account."
                    aria-labelledby=""
                  >
                    Use an online authenticator application: We also have the
                    option to use (TBC or TBC) in order to authenticate your
                    account.
                  </Radios.Radio>
                </DTERadio>
              </>
            )}
            rules={{
              validate: (value) => {
                if (value === "") return "Please select an option to continue";
                return true;
              },
            }}
          />
          <DTEButton type="submit" disabled={isSubmitting}>
            Continue
          </DTEButton>
        </form>
      </StepWrapper>
    </DocumentTitle>
  );
};

export default MfaNoUkMobileOptions;
