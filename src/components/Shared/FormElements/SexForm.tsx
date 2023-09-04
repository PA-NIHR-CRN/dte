import { Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Radios } from "nhsuk-react-components";
import { Controller, useForm } from "react-hook-form";
import { ReactNode, useContext, useEffect } from "react";
import DTERadio from "../UI/DTERadio/DTERadio";
import DTEHeader from "../UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../UI/DTETypography/DTEContent/DTEContent";
import FormBaseProps from "./FormBaseProps";
import FormNavigationButtons from "./CommonElements/FormNavigationButtons";
import Utils from "../../../Helper/Utils";
import { ContentContext } from "../../../context/ContentContext";
import Honeypot from "../Honeypot/Honeypot";

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

  const sexHeader = <DTEHeader as="h2">{content["register2-sexgender-input-sex"]}</DTEHeader>;
  const genderHeader = <DTEHeader as="h2">{content["register2-sexgender-input-gender"]}</DTEHeader>;
  if (!hideHeader) {
    questionHeader = (
      <DTEHeader as="h1" $variant={headerVariant}>
        {content["register2-sexgender-header"]}
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
          <Honeypot />
          <Controller
            control={control}
            name="sexAtBirth"
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
              <DTERadio
                id="sexRadio"
                name="SexAtBirth"
                label={sexHeader}
                error={error?.message}
                infoText={!hideNextQuestionText ? content["register2-sexgender-info-sex"] : ""}
                onChange={onChange}
                onBlur={onBlur}
              >
                {!hideNextQuestionText && (
                  <DTEContent aria-hidden="true">{content["register2-sexgender-info-sex"]}</DTEContent>
                )}
                <Radios.Radio
                  value="female"
                  defaultChecked={value === "female"}
                  aria-label={content["register2-sexgender-aria-female"]}
                  aria-labelledby=""
                >
                  {content["reusable-female"]}
                </Radios.Radio>
                <Radios.Radio
                  value="male"
                  defaultChecked={value === "male"}
                  aria-label={content["register2-sexgender-aria-male"]}
                  aria-labelledby=""
                >
                  {content["reusable-male"]}
                </Radios.Radio>
              </DTERadio>
            )}
            rules={{
              validate: (value) => {
                if (value === "") return content["register2-sexgender-validation-sex-required"];
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
                  aria-label={content["register2-sexgender-aria-gender-yes"]}
                  aria-labelledby=""
                >
                  {content["reusable-yes"]}
                </Radios.Radio>
                <Radios.Radio
                  value="no"
                  defaultChecked={value === "no"}
                  aria-label={content["register2-sexgender-aria-gender-no"]}
                  aria-labelledby=""
                >
                  {content["reusable-no"]}
                </Radios.Radio>
                <DTEContent $radioList>{content["reusable-or"]}</DTEContent>
                <Radios.Radio
                  value="noSay"
                  defaultChecked={value === "noSay"}
                  aria-label={content["register2-sexgender-aria-gender-prefer-not-say"]}
                  aria-labelledby=""
                >
                  {content["reusable-prefer-not-to-say"]}
                </Radios.Radio>
              </DTERadio>
            )}
            rules={{
              validate: (value) => {
                if (value === "") return content["register2-sexgender-validation-gender-required"];
                return true;
              },
            }}
          />
          {!hideInfo && content["register2-sexgender"]}
          <FormNavigationButtons
            nextButtonText={nextButtonText || content["reusable-button-continue"]}
            showCancelButton={showCancelButton || false}
            cancelButtonText={content["reusable-cancel"]}
            onCancel={onCancel}
          />
        </form>
      </Grid>
    </Grid>
  );
}

export default SexForm;
