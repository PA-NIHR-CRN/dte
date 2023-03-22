import { Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Radios } from "nhsuk-react-components";
import { Controller, useForm } from "react-hook-form";
import { ReactNode } from "react";
import DTERadio from "../../UI/DTERadio/DTERadio";
import DTEHeader from "../../UI/DTETypography/DTEHeader/DTEHeader";
import ethnicitiesStatic from "../../../../data/ethnicityData";
import FormBaseProps from "../FormBaseProps";
import { Ethnicities } from "../../../../types/ReferenceData/Ethnicities";
import EthnicityInformation from "./EthnicityInformation";
import FormNavigationButtons from "../CommonElements/FormNavigationButtons";

export type Ethnicity1FormData = {
  ethnicity: string;
};

interface Ethnicity1FormProps extends FormBaseProps {
  initialStateData: Ethnicity1FormData;
  onDataChange: (data: Ethnicity1FormData) => void;
  referenceDataEthnicities?: Ethnicities;
}

const Ethnicity1Form = (props: Ethnicity1FormProps) => {
  const {
    onDataChange,
    initialStateData,
    nextButtonText,
    hideInfo,
    hideHeader,
    showCancelButton,
    onCancel,
    instructionText,
    referenceDataEthnicities,
  } = props;
  const theme = useTheme();
  const headerVariant = useMediaQuery(theme.breakpoints.down("xs"))
    ? "h2"
    : "h1";
  let labelElement: ReactNode;
  const resolvedEthnicities: Ethnicities =
    referenceDataEthnicities || ethnicitiesStatic;

  const { control, handleSubmit } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      ethnicity: initialStateData.ethnicity,
      other:
        initialStateData.ethnicity !== "asian" &&
        initialStateData.ethnicity !== "black" &&
        initialStateData.ethnicity !== "mixed" &&
        initialStateData.ethnicity !== "white"
          ? initialStateData.ethnicity
          : "",
    },
  });

  const preOnDataChange = (data: Ethnicity1FormData & { other: string }) => {
    onDataChange({
      ethnicity:
        data.ethnicity === "other" && data.other ? data.other : data.ethnicity,
    });
  };

  if (!hideHeader) {
    labelElement = (
      <DTEHeader as="h1" $variant={headerVariant}>
        What is your ethnic group?
      </DTEHeader>
    );
  } else {
    labelElement = instructionText;
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <form
            onSubmit={handleSubmit(preOnDataChange)}
            data-testid="ethnicity-form"
            noValidate
          >
            <Controller
              control={control}
              name="ethnicity"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <DTERadio
                  id="ethnicityRadio"
                  name="ethnicity"
                  label={labelElement}
                  error={error?.message}
                  onChange={onChange}
                >
                  {Object.values(resolvedEthnicities).map((ethnicity) => {
                    return (
                      <Radios.Radio
                        value={ethnicity.shortName}
                        defaultChecked={value === ethnicity.shortName}
                        key={ethnicity.shortName}
                      >
                        {ethnicity.longName}
                      </Radios.Radio>
                    );
                  })}
                </DTERadio>
              )}
              rules={{
                validate: (value) => {
                  if (value === "") return "Select your ethnic group";
                  return true;
                },
              }}
            />
            <EthnicityInformation
              hideInfo={hideInfo || false}
              studyType="groups"
            />
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

export default Ethnicity1Form;
