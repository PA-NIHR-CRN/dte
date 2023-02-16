import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Radios } from "nhsuk-react-components";
import { Controller, useForm } from "react-hook-form";
import { ReactNode } from "react";
import DTERadio from "../UI/DTERadio/DTERadio";
import DTEDetails from "../UI/DTEDetails/DTEDetails";
import DTEHeader from "../UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../UI/DTETypography/DTEContent/DTEContent";
import FormNavigationButtons from "./CommonElements/FormNavigationButtons";
import FormBaseProps from "./FormBaseProps";

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
  const theme = useTheme();
  const headerVariant = useMediaQuery(theme.breakpoints.down("xs"))
    ? "h2"
    : "h1";
  const { control, handleSubmit } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      disability: initialStateData.disability,
    },
  });

  if (!hideHeader) {
    labelElement = (
      <DTEHeader as="h1" $variant={headerVariant}>
        Do you have any physical or mental health conditions or illness lasting
        or expected to last 12 months or more?
      </DTEHeader>
    );
  } else {
    labelElement = instructionText;
  }

  return (
    <>
      <form onSubmit={handleSubmit(onDataChange)} noValidate>
        <Controller
          control={control}
          name="disability"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <DTERadio
              id="disabilityRadio"
              name="disability"
              label={labelElement}
              onChange={onChange}
              error={error?.message}
            >
              <Radios.Radio value="yes" defaultChecked={value === "yes"}>
                Yes
              </Radios.Radio>
              <Radios.Radio value="no" defaultChecked={value === "no"}>
                No
              </Radios.Radio>
              <DTEContent $radioList>or</DTEContent>
              <Radios.Radio
                value="notSaying"
                defaultChecked={value === "notSaying"}
              >
                Prefer not to say
              </Radios.Radio>
            </DTERadio>
          )}
          rules={{
            validate: (value) => {
              if (value === "")
                return "Select whether you have any physical or mental health conditions or illness lasting or expected to last 12 months or more";
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
              information when contacting you about studies you may be
              interested in.
            </DTEContent>
            <DTEContent>
              If we find that people with disabilities are under represented in
              signing up to be contacted about research we will look at how to
              improve this.
            </DTEContent>
          </DTEDetails>
        )}
        <FormNavigationButtons
          nextButtonText={disabilityNextButtonText || "Continue"}
          showCancelButton={disabilityShowCancelButton || false}
          onCancel={onCancel}
        />
      </form>
    </>
  );
};

export default DisabilityForm;
