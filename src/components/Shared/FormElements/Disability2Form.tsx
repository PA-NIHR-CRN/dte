import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Radios } from "nhsuk-react-components";
import { Controller, useForm } from "react-hook-form";
import { ReactNode, useContext, useEffect } from "react";
import DTERadio from "../UI/DTERadio/DTERadio";
import DTEHeader from "../UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../UI/DTETypography/DTEContent/DTEContent";
import FormNavigationButtons from "./CommonElements/FormNavigationButtons";
import FormBaseProps from "./FormBaseProps";
import Utils from "../../../Helper/Utils";
import { ContentContext } from "../../../context/ContentContext";
import Honeypot from "../Honeypot/Honeypot";

export type Disability2FormData = {
  disability?: string;
  disabilityDescription?: string;
};

interface Disability2FormProps extends FormBaseProps {
  initialStateData: Disability2FormData;
  onDataChange: (data: Disability2FormData) => void;
}

function Disability2Form(props: Disability2FormProps) {
  const { content } = useContext(ContentContext);
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
  const headerVariant = useMediaQuery(theme.breakpoints.down("xs")) ? "h2" : "h1";
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
        <DTEHeader as="h1" $variant={headerVariant} captionKey="register2-disability2-header">
          {content["register2-disability2-header"]}
        </DTEHeader>
        {content["register2-disability2-instruction-text"]}
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
      <Honeypot />
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
              aria-label={content["register2-disability2-aria-yes-lots"]}
              aria-labelledby=""
            >
              {content["register2-disability2-input-yes-lots"]}
            </Radios.Radio>
            <Radios.Radio
              value="Yes, a little"
              defaultChecked={value === "Yes, a little"}
              aria-label={content["register2-disability2-aria-yes-little"]}
              aria-labelledby=""
            >
              {content["register2-disability2-input-yes-little"]}
            </Radios.Radio>
            <Radios.Radio
              value="Not at all"
              defaultChecked={value === "Not at all"}
              aria-label={content["register2-disability2-aria-not-at-all"]}
              aria-labelledby=""
            >
              {content["register2-disability2-input-not-at-all"]}
            </Radios.Radio>
            <DTEContent $radioList>{content["reusable-or"]}</DTEContent>
            <Radios.Radio
              value="Prefer not to say"
              defaultChecked={value === "Prefer not to say"}
              aria-label={content["register2-disability2-aria-prefer-not-say"]}
              aria-labelledby=""
            >
              {content["reusable-prefer-not-to-say"]}
            </Radios.Radio>
          </DTERadio>
        )}
        rules={{
          validate: (value) => {
            if (!value || value.length === 0) return content["register2-disability2-validation-description-required"];
            return true;
          },
        }}
      />
      {!hideInfo && content["register2-disability"]}
      <FormNavigationButtons
        nextButtonText={disability2NextButtonText || content["reusable-button-continue"]}
        showCancelButton={disability2ShowCancelButton || false}
        cancelButtonText={content["reusable-cancel"]}
        onCancel={onCancel}
      />
    </form>
  );
}

export default Disability2Form;
