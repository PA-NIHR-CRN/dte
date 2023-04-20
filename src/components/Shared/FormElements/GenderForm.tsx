import { Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Radios } from "nhsuk-react-components";
import { Controller, useForm } from "react-hook-form";
import { ReactNode, useEffect } from "react";
import DTERadio from "../UI/DTERadio/DTERadio";
import DTEDetails from "../UI/DTEDetails/DTEDetails";
import DTEHeader from "../UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../UI/DTETypography/DTEContent/DTEContent";
import FormNavigationButtons from "./CommonElements/FormNavigationButtons";
import FormBaseProps from "./FormBaseProps";
import Utils from "../../../Helper/Utils";

export type GenderFormData = {
  genderAtBirth: string;
};

interface GenderFormProps extends FormBaseProps {
  initialStateData: GenderFormData;
  onDataChange: (data: GenderFormData) => void;
}

const SexForm = (props: GenderFormProps) => {
  let labelElement: ReactNode;
  const {
    onDataChange,
    initialStateData,
    nextButtonText,
    hideInfo,
    hideHeader,
    showCancelButton,
    onCancel,
    instructionText,
  } = props;
  const theme = useTheme();
  const headerVariant = useMediaQuery(theme.breakpoints.down("xs"))
    ? "h2"
    : "h1";
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      genderAtBirth: initialStateData.genderAtBirth,
    },
  });

  if (!hideHeader) {
    labelElement = (
      <DTEHeader as="h1" $variant={headerVariant}>
        Is the gender you identify with the same as your sex registered at
        birth?
      </DTEHeader>
    );
  } else {
    labelElement = instructionText;
  }

  useEffect(() => {
    if (document.getElementsByClassName("nhsuk-error-message")[0]) {
      Utils.FocusOnError();
    }
  }, [isSubmitting]);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit(onDataChange)} noValidate>
            <Controller
              control={control}
              name="genderAtBirth"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <DTERadio
                  id="genderRadio"
                  name="GenderAtBirth"
                  label={labelElement}
                  error={error?.message}
                  onChange={onChange}
                >
                  <Radios.Radio
                    value="yes"
                    defaultChecked={value === "yes"}
                    aria-label="Yes, the gender I identify with is the same as my registered sex at birth"
                    aria-labelledby=""
                  >
                    Yes
                  </Radios.Radio>
                  <Radios.Radio
                    value="no"
                    defaultChecked={value === "no"}
                    aria-label="No, the gender I identify with is not the same as my registered sex at birth"
                    aria-labelledby=""
                  >
                    No
                  </Radios.Radio>
                  <DTEContent $radioList>or</DTEContent>
                  <Radios.Radio
                    value="noSay"
                    defaultChecked={value === "noSay"}
                    aria-label="I prefer not to say whether the gender I identify with is the same as my registered sex at birth "
                    aria-labelledby=""
                  >
                    Prefer not to say
                  </Radios.Radio>
                </DTERadio>
              )}
              rules={{
                validate: (value) => {
                  if (value === "")
                    return "Select whether the gender you identify with is the same as your sex registered at birth";
                  return true;
                },
              }}
            />
            {!hideInfo && (
              <DTEDetails summary="Why we are asking this question">
                <DTEContent>
                  We&apos;re asking this so we can make sure there is a mix of
                  different people taking part in research.
                </DTEContent>
                <DTEContent>
                  We also want to make sure everyone 18 and over in the UK feels
                  able to take part in research if they wish to.
                </DTEContent>
                <DTEContent>
                  If we find that people, whose gender they identify with is not
                  the same as the sex they were registered at birth, are not
                  signing up to be contacted about research we will look at how
                  to improve this.
                </DTEContent>
              </DTEDetails>
            )}
            <FormNavigationButtons
              nextButtonText={nextButtonText || "Continue"}
              showCancelButton={showCancelButton || false}
              onCancel={onCancel}
            />
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default SexForm;
