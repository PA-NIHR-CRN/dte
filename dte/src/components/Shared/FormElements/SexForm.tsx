import { Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Radios } from "nhsuk-react-components";
import { Controller, useForm } from "react-hook-form";
import { ReactNode } from "react";
import DTERadio from "../UI/DTERadio/DTERadio";
import DTEDetails from "../UI/DTEDetails/DTEDetails";
import DTEHeader from "../UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../UI/DTETypography/DTEContent/DTEContent";
import FormBaseProps from "./FormBaseProps";
import FormNavigationButtons from "./CommonElements/FormNavigationButtons";

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
  const { control, handleSubmit } = useForm({
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
                      ? "We’ll ask about your gender on the next screen. This question is about your sex registered at birth."
                      : ""
                  }
                  onChange={onChange}
                  onBlur={onBlur}
                >
                  {!hideNextQuestionText && (
                    <DTEContent aria-hidden="true">
                      We’ll ask about your gender on the next screen. This
                      question is about your sex registered at birth.
                    </DTEContent>
                  )}
                  <Radios.Radio
                    value="female"
                    defaultChecked={value === "female"}
                  >
                    Female
                  </Radios.Radio>
                  <Radios.Radio value="male" defaultChecked={value === "male"}>
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
