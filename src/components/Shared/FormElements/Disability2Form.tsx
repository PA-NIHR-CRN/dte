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

export type Disability2FormData = {
  disability?: string;
  disabilityDescription?: string;
};

interface Disability2FormProps extends FormBaseProps {
  initialStateData: Disability2FormData;
  onDataChange: (data: Disability2FormData) => void;
}

function Disability2Form(props: Disability2FormProps) {
  let labelElement: ReactNode;
  const {
    onDataChange,
    initialStateData,
    nextButtonText: disability2NextButtonText,
    hideInfo,
    hideHeader,
    instructionText,
    showCancelButton: disability2ShowCancelButton,
    onCancel,
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
      disabilityDescription: initialStateData.disabilityDescription,
    },
  });

  const onSubmit = async ({ disabilityDescription }: any) => {
    const newData: Disability2FormData = {
      disabilityDescription,
      disability: props.initialStateData.disability,
    };
    onDataChange(newData);
  };

  if (!hideHeader) {
    labelElement = (
      <>
        <DTEHeader as="h1" $variant={headerVariant}>
          Do any of your conditions or illnesses reduce your ability to carry
          out day to day activities?
        </DTEHeader>
        <DTEContent as="span" $displayMode="block">
          For example, eating, washing, walking or going shopping.
        </DTEContent>
      </>
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
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Controller
        control={control}
        name="disabilityDescription"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <DTERadio
            id="disabilityDescriptionRadio"
            name="disabilityDescription"
            label={labelElement}
            onChange={onChange}
            error={error?.message}
          >
            <Radios.Radio
              value="Yes, a lot"
              defaultChecked={value === "Yes, a lot"}
              aria-label="Yes, my condition reduces my ability to carry out day to day activities a lot"
              aria-labelledby=""
            >
              Yes, a lot
            </Radios.Radio>
            <Radios.Radio
              value="Yes, a little"
              defaultChecked={value === "Yes, a little"}
              aria-label="Yes, my condition reduces my ability to carry out day to day activities a little"
              aria-labelledby=""
            >
              Yes, a little
            </Radios.Radio>
            <Radios.Radio
              value="Not at all"
              defaultChecked={value === "Not at all"}
              aria-label="No, my condition does not reduce my ability to carry out day to day activities at all"
              aria-labelledby=""
            >
              Not at all
            </Radios.Radio>
            <DTEContent $radioList>or</DTEContent>
            <Radios.Radio
              value="Prefer not to say"
              defaultChecked={value === "Prefer not to say"}
              aria-label="I would prefer not to say how much my condition reduces my ability to carry out day to day activities"
              aria-labelledby=""
            >
              Prefer not to say
            </Radios.Radio>
          </DTERadio>
        )}
        rules={{
          validate: (value) => {
            if (!value || value.length === 0)
              return "Select whether any of your conditions or illnesses reduce your ability to carry out day to day activities";
            return true;
          },
        }}
      />
      {!hideInfo && (
        <DTEDetails summary="Why we are asking this question">
          <DTEContent>
            Some studies will require volunteers with disabilities, other
            studies want to make sure they have a representative sample of the
            population taking part in research studies. We may use this
            information when contacting you about studies you may be interested
            in.
          </DTEContent>
          <DTEContent>
            If we find that people with disabilities are under represented in
            signing up to be contacted about research we will look at how to
            improve this.
          </DTEContent>
        </DTEDetails>
      )}
      <FormNavigationButtons
        nextButtonText={disability2NextButtonText || "Continue"}
        showCancelButton={disability2ShowCancelButton || false}
        onCancel={onCancel}
      />
    </form>
  );
}

export default Disability2Form;
