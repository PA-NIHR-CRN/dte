import { Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Radios } from "nhsuk-react-components";
import { Controller, useForm } from "react-hook-form";
import { ReactNode, useState, ChangeEvent, useEffect, useContext } from "react";
import DTERadio from "../../UI/DTERadio/DTERadio";
import DTEHeader from "../../UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../UI/DTETypography/DTEContent/DTEContent";
import DTEInput from "../../UI/DTEInput/DTEInput";
import FormBaseProps from "../FormBaseProps";
import FormNavigationButtons from "../CommonElements/FormNavigationButtons";
import Utils from "../../../../Helper/Utils";
import Honeypot from "../../Honeypot/Honeypot";
import getEthnicities from "../../../../data/ethnicityData";
import { ContentContext } from "../../../../context/ContentContext";

export type Ethnicity2FormData = {
  background: string;
  otherText?: string;
};

interface Ethnicity2FormProps extends FormBaseProps {
  initialStateData: Ethnicity2FormData;
  onDataChange: (data: Ethnicity2FormData) => void;
  ethnicity: string;
}

const ConditionalInput = (props: {
  value: string;
  label: string;
  onValueChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { value, label, onValueChange } = props;
  return <DTEInput value={value} onValueChange={onValueChange} label={label} />;
};

const Ethnicity2Form = (props: Ethnicity2FormProps) => {
  const { content } = useContext(ContentContext);
  const {
    onDataChange,
    initialStateData,
    nextButtonText,
    hideInfo,
    hideHeader,
    showCancelButton,
    onCancel,
    ethnicity,
    instructionText,
  } = props;

  let labelElement: ReactNode;
  const ethnicities = getEthnicities(content);
  const theme = useTheme();
  const headerVariant = useMediaQuery(theme.breakpoints.down("xs")) ? "h2" : "h1";
  const [otherText, setOtherText] = useState<string | undefined>(
    !ethnicities.asian.backgrounds
      .concat(
        ethnicities.black.backgrounds,
        ethnicities.mixed.backgrounds,
        ethnicities.white.backgrounds,
        ethnicities.other.backgrounds
      )
      .includes(initialStateData.background) &&
      initialStateData.background !== "other" &&
      initialStateData.background !== ""
      ? initialStateData.background
      : undefined
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      background:
        !ethnicities.asian.backgrounds
          .concat(
            ethnicities.black.backgrounds,
            ethnicities.mixed.backgrounds,
            ethnicities.white.backgrounds,
            ethnicities.other.backgrounds
          )
          .includes(initialStateData.background) && initialStateData.background !== ""
          ? content["reusable-other"]
          : initialStateData.background,
    },
  });

  const preOnDataChange = (data: Ethnicity2FormData) => {
    onDataChange({
      background:
        data.background === "other" && otherText && otherText.trim() !== "" ? otherText.trim() : data.background.trim(),
    });
  };

  useEffect(() => {
    if (otherText?.trim() === "") {
      setValue("background", "other");
    }
  }, [otherText]);

  if (!hideHeader) {
    const ethnicityLongName = ethnicities[ethnicity as keyof typeof ethnicities].longName;
    labelElement = (
      <DTEHeader as="h1" $variant={headerVariant}>
        {(content["register2-ethnicity2-header"] as string).replace("{{ethnicity}}", ethnicityLongName)}
      </DTEHeader>
    );
  } else if (instructionText) {
    labelElement = instructionText;
  } else {
    labelElement = <DTEContent>Studies may need this information for [reason].</DTEContent>;
  }

  useEffect(() => {
    if (document.getElementsByClassName("nhsuk-error-message")[0]) {
      Utils.FocusOnError();
    }
  }, [isSubmitting]);

  const ethnicityEntry = ethnicities[ethnicity as keyof typeof ethnicities];
  const defaultName = "Unknown"; // or any other fallback value

  const ethnicityLabel =
    ethnicity === "mixed" || !ethnicityEntry
      ? ethnicityEntry?.additionalDesc || defaultName
      : ethnicityEntry.longName.charAt(0).toUpperCase() + ethnicityEntry.longName.slice(1);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit(preOnDataChange)} data-testid="background-form" noValidate>
            <Honeypot />
            <Controller
              control={control}
              name="background"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <DTERadio
                  id="backgroundRadio"
                  name="background"
                  label={labelElement}
                  error={error?.message}
                  onChange={onChange}
                >
                  {ethnicities[ethnicity as keyof typeof ethnicities] && (
                    <>
                      {ethnicities[ethnicity as keyof typeof ethnicities].backgrounds.map((backgroundName: string) => {
                        return (
                          <Radios.Radio
                            value={backgroundName}
                            defaultChecked={value === backgroundName}
                            key={backgroundName}
                            aria-label={(content["register2-ethnic-background-aria-background"] as string).replace(
                              "{{backgroundName}}",
                              backgroundName
                            )}
                            aria-labelledby=""
                          >
                            {backgroundName}
                          </Radios.Radio>
                        );
                      })}
                      <Radios.Radio
                        value="other"
                        defaultChecked={
                          !ethnicities.asian.backgrounds
                            .concat(
                              ethnicities.black.backgrounds,
                              ethnicities.mixed.backgrounds,
                              ethnicities.white.backgrounds,
                              ethnicities.other.backgrounds,
                              [""]
                            )
                            .includes(value)
                        }
                        conditional={
                          <ConditionalInput
                            value={otherText || ""}
                            label={content["register2-ethnic-background-input-describe"]}
                            onValueChange={(e) => setOtherText(e.currentTarget.value)}
                          />
                        }
                        key="other"
                      >
                        {ethnicity === "other"
                          ? content["register2-ethnic-background-other"]
                          : (content["register2-ethnic-background-other-has-ethnicity"] as string).replace(
                              "{{ethnicity}}",
                              ethnicityLabel
                            )}
                      </Radios.Radio>
                    </>
                  )}
                </DTERadio>
              )}
              rules={{
                validate: (value) => {
                  if (value === "") return content["register2-ethnic-background-validation-background-required"];
                  return true;
                },
              }}
            />
            {!hideInfo && content["register2-ethnic-background"]}
            <FormNavigationButtons
              nextButtonText={nextButtonText || content["reusable-continue"]}
              showCancelButton={showCancelButton || false}
              cancelButtonText={content["reusable-cancel"]}
              onCancel={onCancel}
            />
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default Ethnicity2Form;
