import { useContext, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { ErrorMessage } from "nhsuk-react-components";
import { Controller, useForm } from "react-hook-form";
import DTECheckList from "../../../../../Shared/UI/DTECheckList/DTECheckList";
import DTEButton from "../../../../../Shared/UI/DTEButton/DTEButton";
import DTEHeader from "../../../../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import Utils from "../../../../../../Helper/Utils";
import { ContentContext } from "../../../../../../context/ContentContext";
import Honeypot from "../../../../../Shared/Honeypot/Honeypot";
import DTEContent from "../../../../../Shared/UI/DTETypography/DTEContent/DTEContent";
import DTELinkButton from "../../../../../Shared/UI/DTELinkButton/DTELinkButton";

export type ConsentFormData = {
  consent: boolean;
  consentContact: boolean;
};

interface ConsentFormProps {
  initialStateData: ConsentFormData;
  onDataChange: (data: ConsentFormData) => void;
  handleNoConsent: () => void;
}

function ConsentForm(props: ConsentFormProps) {
  const { content } = useContext(ContentContext);
  const { onDataChange, initialStateData, handleNoConsent } = props;
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      consent: initialStateData.consent,
      consentContact: initialStateData.consentContact,
    },
  });

  useEffect(() => {
    if (document.getElementsByClassName("nhsuk-error-message")[0]) {
      Utils.FocusOnError();
    }
  }, [isSubmitting]);

  return (
    <>
      <DTEHeader as="h1" captionKey="register-consent-header">
        {content["register-consent-header"]}
      </DTEHeader>
      {content["register-consent-body"]}
      <form onSubmit={handleSubmit(onDataChange)}>
        <Honeypot />
        <Controller
          control={control}
          name="consentContact"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <DTECheckList
              id="checkbox"
              name="checkbox"
              onValueChange={(e) => onChange(e[0].checked)}
              escKeyPressed={() => {}}
              error={error?.message}
              values={[
                {
                  value: "consentContact",
                  text: <>{content["register-consent-confirmation-check-text"]}</>,
                  checked: value,
                  disabled: false,
                },
              ]}
            />
          )}
          rules={{
            validate: (value) => {
              return value || content["register-consent-confirmation-check-validation"];
            },
          }}
        />
        <Controller
          control={control}
          name="consent"
          render={({ field: { onChange }, fieldState: { error } }) => (
            <>
              <Grid container direction="column" justifyContent="flex-start" spacing={2}>
                <Grid item>
                  <DTEButton
                    onClick={(e: any) => {
                      if (e) {
                        onChange(true);
                      }
                    }}
                  >
                    <span>{content["register-consent-button-yes"]}</span>
                  </DTEButton>
                </Grid>
                <Grid item>
                  <DTEContent>
                    {content["register-consent-no-text"]}
                    <DTELinkButton
                      onClick={(e: any) => {
                        if (e) {
                          e.preventDefault();
                          onChange(false);
                        }
                        handleNoConsent();
                      }}
                    >
                      {content["register-consent-no-link-text"]}
                    </DTELinkButton>{" "}
                  </DTEContent>
                </Grid>
              </Grid>
              {error && <ErrorMessage>{error.message}</ErrorMessage>}
            </>
          )}
        />
      </form>
    </>
  );
}

export default ConsentForm;
