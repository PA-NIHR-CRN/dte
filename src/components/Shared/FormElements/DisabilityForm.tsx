import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Radios } from "nhsuk-react-components";
import { Controller, useForm } from "react-hook-form";
import { ReactNode, useContext, useEffect } from "react";
import DTERadio from "../UI/DTERadio/DTERadio";
import DTEHeader from "../UI/DTETypography/DTEHeader/DTEHeader";
import DTEHeaderCaption from "../UI/DTETypography/DTEHeaderCaption/DTEHeaderCaption";
import DTEContent from "../UI/DTETypography/DTEContent/DTEContent";
import FormNavigationButtons from "./CommonElements/FormNavigationButtons";
import FormBaseProps from "./FormBaseProps";
import Utils from "../../../Helper/Utils";
import Honeypot from "../Honeypot/Honeypot";
import { ContentContext } from "../../../context/ContentContext";

export type DisabilityFormData = {
  disability: string;
};

interface DisabilityFormProps extends FormBaseProps {
  initialStateData: DisabilityFormData;
  onDataChange: (data: DisabilityFormData) => void;
}

const DisabilityForm = (props: DisabilityFormProps) => {
  let labelElement: ReactNode;
  const {
    onDataChange,
    initialStateData,
    nextButtonText: disabilityNextButtonText,
    hideInfo,
    hideHeader,
    instructionText,
    showCancelButton: disabilityShowCancelButton,
    onCancel,
  } = props;
  const { content } = useContext(ContentContext);
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
      disability: initialStateData.disability,
    },
  });
  if (!hideHeader) {
    labelElement = (
      <>
        <DTEHeaderCaption contentKey="register2-disability1-header-caption" />;
        <DTEHeader as="h1" $variant={headerVariant}>
          {content["register2-disability1-header"]}
        </DTEHeader>
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
    <>
      <form onSubmit={handleSubmit(onDataChange)} noValidate>
        <Honeypot />
        <Controller
          control={control}
          name="disability"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <>
              <DTERadio
                id="disabilityRadio"
                name="disability"
                label={labelElement}
                onChange={onChange}
                error={error?.message}
                infoText={content["register2-disability1-info-disability"]}
              >
                <DTEContent aria-hidden="true">{content["register2-disability1-info-disability"]}</DTEContent>
                <Radios.Radio
                  value="yes"
                  defaultChecked={value === "yes"}
                  aria-label={content["register2-disability1-aria-yes"]}
                  aria-labelledby=""
                >
                  {content["reusable-yes"]}
                </Radios.Radio>
                <Radios.Radio
                  value="no"
                  defaultChecked={value === "no"}
                  aria-label={content["register2-disability1-aria-no"]}
                  aria-labelledby=""
                >
                  {content["reusable-no"]}
                </Radios.Radio>
                <DTEContent $radioList>{content["reusable-or"]}</DTEContent>
                <Radios.Radio value="notSaying" defaultChecked={value === "notSaying"}>
                  {content["reusable-prefer-not-to-say"]}
                </Radios.Radio>
              </DTERadio>
            </>
          )}
          rules={{
            validate: (value) => {
              if (value === "") return content["register2-disability1-validation-disability-required"];
              return true;
            },
          }}
        />
        {!hideInfo && content["register2-disability"]}
        <FormNavigationButtons
          nextButtonText={disabilityNextButtonText || content["reusable-button-continue"]}
          showCancelButton={disabilityShowCancelButton || false}
          cancelButtonText={content["reusable-cancel"]}
          onCancel={onCancel}
        />
      </form>
    </>
  );
};

export default DisabilityForm;
