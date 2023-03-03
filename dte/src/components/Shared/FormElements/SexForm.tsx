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
import FormBaseProps from "./FormBaseProps";
import FormNavigationButtons from "./CommonElements/FormNavigationButtons";
import Utils from "../../../Helper/Utils";

export type SexFormData = {
  sexAtBirth: string;
};

interface SexFormProps extends FormBaseProps {
  initialStateData: SexFormData;
  hideNextQuestionText?: boolean;
  onDataChange: (data: SexFormData) => void;
}

const SexForm = (props: SexFormProps) => {
  let labelElement: ReactNode;
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
  const headerVariant = useMediaQuery(theme.breakpoints.down("sm"))
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
      sexAtBirth: initialStateData.sexAtBirth,
    },
  });

  if (!hideHeader) {
    labelElement = (
      <DTEHeader as="h1" $variant={headerVariant}>
        What is your sex?
      </DTEHeader>
    );
  } else if (instructionText) {
    labelElement = instructionText;
  } else {
    labelElement = (
      <DTEContent>
        Studies may need this information for [reason] - we respect that your
        identifying gender might be different.
      </DTEContent>
    );
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
              name="sexAtBirth"
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <DTERadio
                  id="sexRadio"
                  name="SexAtBirth"
                  label={labelElement}
                  error={error?.message}
                  infoText={
                    !hideNextQuestionText
                      ? "The next question asks about your gender"
                      : ""
                  }
                  onChange={onChange}
                  onBlur={onBlur}
                >
                  <Radios.Radio
                    value="female"
                    defaultChecked={value === "female"}
                    aria-label="I am Female"
                    aria-labelledby=""
                  >
                    Female
                  </Radios.Radio>
                  <Radios.Radio
                    value="male test"
                    defaultChecked={value === "male"}
                    aria-label="I am Male"
                    aria-labelledby=""
                  >
                    Male
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
            {!hideInfo && (
              <>
                <DTEDetails summary="Why we are asking this question">
                  <DTEContent>
                    Some studies can only include people of a specific sex, we
                    may use this information when contacting you about studies
                    you may be interested in.
                  </DTEContent>
                </DTEDetails>
                {!hideNextQuestionText && (
                  <DTEContent aria-hidden="true">
                    The next question asks about your gender
                  </DTEContent>
                )}
              </>
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
