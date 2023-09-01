import { Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Radios } from "nhsuk-react-components";
import { Controller, useForm } from "react-hook-form";
import { ReactNode, useContext, useEffect } from "react";
import DTERadio from "../UI/DTERadio/DTERadio";
import DTEDetails from "../UI/DTEDetails/DTEDetails";
import DTEHeader from "../UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../UI/DTETypography/DTEContent/DTEContent";
import FormBaseProps from "./FormBaseProps";
import FormNavigationButtons from "./CommonElements/FormNavigationButtons";
import Utils from "../../../Helper/Utils";
import { ContentContext } from "../../../context/ContentContext";

export type SexFormData = {
  sexAtBirth: string;
  genderAtBirth: string;
};

interface SexFormProps extends FormBaseProps {
  initialStateData: SexFormData;
  hideNextQuestionText?: boolean;
  onDataChange: (data: SexFormData) => void;
}

function SexForm(props: SexFormProps) {
  const { content } = useContext(ContentContext);
  let questionHeader: ReactNode;
  const {
    onDataChange,
    initialStateData,
    nextButtonText,
    hideInfo,
    hideHeader,
    showCancelButton,
    hideNextQuestionText,
    onCancel,
    instructionText,
  } = props;
  const theme = useTheme();
  const headerVariant = useMediaQuery(theme.breakpoints.down("sm")) ? "h2" : "h1";
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      sexAtBirth: initialStateData.sexAtBirth,
      genderAtBirth: initialStateData.genderAtBirth,
    },
  });

  const sexHeader = <DTEHeader as="h2">What is your sex?</DTEHeader>;
  const genderHeader = (
    <DTEHeader as="h2">Is the gender you identify with the same as your sex registered at birth?</DTEHeader>
  );
  if (!hideHeader) {
    questionHeader = (
      <DTEHeader as="h1" $variant={headerVariant}>
        Sex and gender identity
      </DTEHeader>
    );
  } else if (instructionText) {
    questionHeader = instructionText;
  } else {
    questionHeader = (
      <DTEContent>
        Studies may need this information for [reason] - we respect that your identifying gender might be different.
      </DTEContent>
    );
  }

  useEffect(() => {
    if (document.getElementsByClassName("nhsuk-error-message")[0]) {
      Utils.FocusOnError();
    }
  }, [isSubmitting]);

  return (
    <Grid container>
      <Grid item xs={12}>
        {questionHeader}
        <form onSubmit={handleSubmit(onDataChange)} noValidate>
          <Controller
            control={control}
            name="sexAtBirth"
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
              <DTERadio
                id="sexRadio"
                name="SexAtBirth"
                label={sexHeader}
                error={error?.message}
                infoText={!hideNextQuestionText ? "This question is about your sex registered at birth." : ""}
                onChange={onChange}
                onBlur={onBlur}
              >
                {!hideNextQuestionText && (
                  <DTEContent aria-hidden="true">This question is about your sex registered at birth.</DTEContent>
                )}
                <Radios.Radio
                  value="female"
                  defaultChecked={value === "female"}
                  aria-label="I am Female"
                  aria-labelledby=""
                >
                  {content["reusable-female"]}
                </Radios.Radio>
                <Radios.Radio value="male" defaultChecked={value === "male"} aria-label="I am Male" aria-labelledby="">
                  {content["reusable-male"]}
                </Radios.Radio>
              </DTERadio>
            )}
            rules={{
              validate: (value) => {
                if (value === "") return "Select if you are Female or Male";
                return true;
              },
            }}
          />
          <Controller
            control={control}
            name="genderAtBirth"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <DTERadio
                id="genderRadio"
                name="GenderAtBirth"
                label={genderHeader}
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
                  {content["reusable-prefer-not-to-say"]}
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
                Some studies can only include people of a specific sex, or may be focused on people whose gender differs
                from their assigned sex at birth. We may use this information when contacting you about studies you may
                be interested in.
              </DTEContent>
              <DTEContent>
                We&apos;re also asking this so we can make sure there is a mix of different people taking part in
                research. We want to make sure everyone 18 and over in the UK feels able to take part in research if
                they wish to and look to improve our service where our data shows this may not be the case.
              </DTEContent>
            </DTEDetails>
          )}
          <FormNavigationButtons
            nextButtonText={nextButtonText || content["reusable-button-continue"]}
            showCancelButton={showCancelButton || false}
            onCancel={onCancel}
          />
        </form>
      </Grid>
    </Grid>
  );
}

export default SexForm;
