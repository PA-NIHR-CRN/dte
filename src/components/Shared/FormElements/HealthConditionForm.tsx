import { Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Controller, useForm } from "react-hook-form";
import DTEHeader from "../UI/DTETypography/DTEHeader/DTEHeader";
import FormBaseProps from "./FormBaseProps";
import DTEForwardLookup from "../UI/DTEForwardLookup/DTEForwardLookup";
import FormNavigationButtons from "./CommonElements/FormNavigationButtons";
import healthConditions from "../../../data/healthConditions";
import { useContext } from "react";
import { ContentContext } from "../../../context/ContentContext";
import Honeypot from "../Honeypot/Honeypot";

export type HealthConditionFormData = {
  conditions: string[];
};

interface HealthConditionFormProps extends FormBaseProps {
  initialStateData: HealthConditionFormData;
  onDataChange: (data: HealthConditionFormData) => void;
}

function HealthConditionForm(props: HealthConditionFormProps) {
  const { content } = useContext(ContentContext);
  const {
    onDataChange,
    initialStateData,
    nextButtonText,
    hideHeader,
    showCancelButton,
    onCancel,
    instructionText,
  } = props;
  const theme = useTheme();
  const headerVariant = useMediaQuery(theme.breakpoints.down("xs")) ? "h2" : "h1";

  const { control, handleSubmit } = useForm({
    mode: "onTouched",
    defaultValues: {
      conditions: initialStateData.conditions,
    },
  });

  return (
    <>
      {!hideHeader && (
        <DTEHeader as="h1" $variant={headerVariant} captionKey="register2-health-conditions-header">
          {content["register2-health-conditions-header"]}
        </DTEHeader>
      )}
      {instructionText || content["register2-health-conditions-instruction-text"]}
      <Grid container>
        <Grid item xs={12} sm={10} md={9} lg={8} xl={8}>
          <form onSubmit={handleSubmit(onDataChange)} noValidate>
            <Honeypot />
            <Controller
              control={control}
              name="conditions"
              render={({ field: { value, onChange } }) => (
                <DTEForwardLookup
                  id="healthConditions"
                  values={value}
                  data={healthConditions}
                  onSelectedValuesChange={onChange}
                  label={content["reusable-areas-of-research"]}
                />
              )}
            />
            <FormNavigationButtons
              nextButtonText={nextButtonText || content["reusable-button-continue"]}
              showCancelButton={showCancelButton || false}
              cancelButtonText={content["reusable-cancel"]}
              onCancel={onCancel}
            />
          </form>
        </Grid>
      </Grid>
    </>
  );
}

export default HealthConditionForm;
