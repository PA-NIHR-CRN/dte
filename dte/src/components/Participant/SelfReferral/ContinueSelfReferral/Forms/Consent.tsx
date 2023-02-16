import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { ErrorMessage } from "nhsuk-react-components";
import { Controller, useForm } from "react-hook-form";
import DTEHeader from "../../../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../../../Shared/UI/DTETypography/DTEContent/DTEContent";
import DTEButton from "../../../../Shared/UI/DTEButton/DTEButton";
import DTERouteLink from "../../../../Shared/UI/DTERouteLink/DTERouteLink";

export type ConsentData = {
  consent: boolean;
};

interface Props {
  initialStateData: ConsentData;
  onSubmit: (data: ConsentData) => void;
}

const Consent = (props: Props) => {
  const { initialStateData, onSubmit } = props;
  const { control, handleSubmit } = useForm({
    mode: "all",
    defaultValues: {
      consent: initialStateData.consent,
    },
  });

  const [showNotConsented, setShowNotConsented] = useState(false);

  return (
    <>
      {!showNotConsented && (
        <>
          <DTEHeader as="h1">Give consent</DTEHeader>
          <DTEContent>
            By providing your consent, you are giving permission for the
            National Institute for Health Research Clinical Research Network
            Coordinating Centre (NIHR CRNCC) to share the data from your ‘User
            Profile’, and any other data the study team has requested to
            establish if you would be suitable for screening for the study, with
            the research study site team. This information will be used to
            contact you about the study, and allow the study team to
            pre-populate your data. Additional information can be found in the
            DTE Privacy and Data Sharing Policy.
          </DTEContent>
          <DTEContent>
            To find out more about how the NIHR CRNCC will process, store and
            share your personal information, your rights, and what to do if you
            want to withdraw your consent, read the DTE Privacy and Data Sharing
            Policy.
          </DTEContent>
          <DTEContent>
            You can withdraw your consent at any time; to do this, please see
            the DTE Privacy and Data Sharing Policy.
          </DTEContent>
          <DTEContent>
            Do you give permission for your personal information to be processed
            and shared by the NIHR CRNCC on behalf of the Department of Health
            and Social Care (DHSC) for the purposes outlined above?
          </DTEContent>

          <form onSubmit={handleSubmit(onSubmit)}>
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
                        Yes - I Consent
                      </DTEButton>
                    </Grid>
                    <Grid item>
                      <DTEButton
                        $outlined
                        onClick={(e: any) => {
                          if (e) {
                            e.preventDefault();
                            onChange(false);
                          }
                          setShowNotConsented(true);
                        }}
                      >
                        No - I do not Consent
                      </DTEButton>
                    </Grid>
                  </Grid>
                  {error && <ErrorMessage>{error.message}</ErrorMessage>}
                </>
              )}
            />
          </form>
        </>
      )}
      {showNotConsented && (
        <>
          <DTEHeader as="h1">
            If you don&apos;t consent to sharing your information
          </DTEHeader>
          <DTEContent>
            You will not be able to use this service and cannot register your
            interest to take part in studies.
          </DTEContent>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            spacing={2}
          >
            <Grid item>
              <DTEButton
                onClick={() => {
                  setShowNotConsented(false);
                }}
              >
                Back to consent
              </DTEButton>
            </Grid>
            <Grid item>
              <DTERouteLink
                to="https://bepartofresearch.nihr.ac.uk/"
                $outlined
                external
              >
                Return to Be Part of Research
              </DTERouteLink>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Consent;
