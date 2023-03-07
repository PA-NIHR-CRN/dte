import { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { ErrorMessage } from "nhsuk-react-components";
import { Controller, useForm } from "react-hook-form";
import DTECheckList from "../../../../../Shared/UI/DTECheckList/DTECheckList";
import DTEButton from "../../../../../Shared/UI/DTEButton/DTEButton";
import DTERouteLink from "../../../../../Shared/UI/DTERouteLink/DTERouteLink";
import DTEHeader from "../../../../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../../../../Shared/UI/DTETypography/DTEContent/DTEContent";
import DTELinkButton from "../../../../../Shared/UI/DTELinkButton/DTELinkButton";
import Utils from "../../../../../../Helper/Utils";

export type ConsentFormData = {
  consent: boolean;
  consentContact: boolean;
};

interface ConsentFormProps {
  initialStateData: ConsentFormData;
  onDataChange: (data: ConsentFormData) => void;
  handleNoConsent: () => void;
}

const ConsentForm = (props: ConsentFormProps) => {
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
      <DTEHeader as="h1">
        Consent to process your data and be contacted by Be Part of Research
      </DTEHeader>
      <DTEContent>
        By consenting and registering for the service, you are giving permission
        for any information you share to be processed by Be Part of Research, a
        service that is managed and operated by the National Institute for
        Health and Care Research Clinical Research Network Coordinating Centre
        (NIHR CRNCC). This will allow Be Part of Research to contact you with
        information about areas of research you have expressed an interest in,
        as well as research opportunities of national interest.
      </DTEContent>
      <DTEContent>
        To find out more about how the NIHR CRNCC will process and store your
        information and your rights as a data subject, please read the{" "}
        <DTERouteLink
          to="https://bepartofresearch.nihr.ac.uk/site-policies/privacy-policy/"
          renderStyle="standard"
          target="_blank"
          external
        >
          Be Part of Research Privacy Policy
        </DTERouteLink>
        . The Data Controller for this service is the Department of Health and
        Social Care (DHSC).
      </DTEContent>
      <DTEContent>
        You can withdraw your consent at any time - to do this please see the{" "}
        <DTERouteLink
          to="https://bepartofresearch.nihr.ac.uk/site-policies/privacy-policy/"
          renderStyle="standard"
          target="_blank"
          external
        >
          Be Part of Research Privacy Policy
        </DTERouteLink>
        .
      </DTEContent>
      <DTEContent>
        If you do not consent to sharing your information, you will not be able
        to use this service to register your interest and be contacted about
        research opportunities.
      </DTEContent>
      <form onSubmit={handleSubmit(onDataChange)}>
        <Controller
          control={control}
          name="consentContact"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <>
              <DTECheckList
                id="checkbox"
                name="checkbox"
                onValueChange={(e) => onChange(e[0].checked)}
                escKeyPressed={() => {}}
                error={error?.message}
                values={[
                  {
                    value: "consentContact",
                    text: (
                      <>
                        I confirm that I have read and understood the{" "}
                        <DTERouteLink
                          to="https://bepartofresearch.nihr.ac.uk/site-policies/privacy-policy/"
                          renderStyle="standard"
                          target="_blank"
                          external
                        >
                          Be Part of Research Privacy Policy
                        </DTERouteLink>
                        .
                      </>
                    ),
                    checked: value,
                    disabled: false,
                  },
                ]}
              />
            </>
          )}
          rules={{
            validate: (value) => {
              return (
                value ||
                "Confirm that the Privacy and Data Sharing Policy has been read and understood before giving consent"
              );
            },
          }}
        />
        <DTEContent>
          Do you give consent for your information to be processed by the Be
          Part of Research service provided by NIHR CRNCC on behalf of the DHSC
          for the purposes outlined above?
        </DTEContent>
        <Controller
          control={control}
          name="consent"
          render={({ field: { onChange }, fieldState: { error } }) => (
            <>
              <Grid
                container
                direction="column"
                justifyContent="flex-start"
                spacing={2}
              >
                <Grid item>
                  <DTEButton
                    onClick={(e: any) => {
                      if (e) {
                        onChange(true);
                      }
                    }}
                  >
                    Yes, I consent and wish to register now
                  </DTEButton>
                </Grid>
                <Grid item>
                  <DTELinkButton
                    onClick={(e: any) => {
                      if (e) {
                        e.preventDefault();
                        onChange(false);
                      }
                      handleNoConsent();
                    }}
                  >
                    No, I do not consent and wish to cancel this registration
                  </DTELinkButton>
                </Grid>
              </Grid>
              {error && <ErrorMessage>{error.message}</ErrorMessage>}
            </>
          )}
        />
      </form>
    </>
  );
};

export default ConsentForm;
