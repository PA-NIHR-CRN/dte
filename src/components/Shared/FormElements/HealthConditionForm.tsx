import { Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Controller, useForm } from "react-hook-form";
import DTEHeader from "../UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../UI/DTETypography/DTEContent/DTEContent";
import DTERouteLink from "../UI/DTERouteLink/DTERouteLink";
import DTEDetails from "../UI/DTEDetails/DTEDetails";
import FormBaseProps from "./FormBaseProps";
import DTEForwardLookup from "../UI/DTEForwardLookup/DTEForwardLookup";
import FormNavigationButtons from "./CommonElements/FormNavigationButtons";
import healthConditions from "../../../data/healthConditions";
import Honeypot from "../Honeypot/Honeypot";

export type HealthConditionFormData = {
  conditions: string[];
};

interface HealthConditionFormProps extends FormBaseProps {
  initialStateData: HealthConditionFormData;
  onDataChange: (data: HealthConditionFormData) => void;
}

const HealthConditionForm = (props: HealthConditionFormProps) => {
  const {
    onDataChange,
    initialStateData,
    nextButtonText,
    hideInfo,
    hideHeader,
    showCancelButton,
    onCancel,
    instructionText,
  } = props;
  const theme = useTheme();
  const headerVariant = useMediaQuery(theme.breakpoints.down("xs"))
    ? "h2"
    : "h1";

  const { control, handleSubmit } = useForm({
    mode: "onTouched",
    defaultValues: {
      conditions: initialStateData.conditions,
    },
  });

  return (
    <>
      {!hideHeader && (
        <DTEHeader as="h1" $variant={headerVariant}>
          Which areas of research are you interested in?
        </DTEHeader>
      )}
      {instructionText || (
        <>
          <DTEContent>
            Start entering details below to see different areas of research. You
            can select as many options as you like.
          </DTEContent>
          <DTEContent>
            For example, you can enter a health condition like
            &apos;diabetes&apos;, &apos;heart disease&apos; or
            &apos;COVID-19&apos;. You can take part whether you have a health
            condition or not by entering &apos;
            <DTERouteLink
              to="https://bepartofresearch.nihr.ac.uk/taking-part/volunteering-without-a-condition/"
              external
              target="_blank"
              renderStyle="standard"
            >
              healthy volunteers
            </DTERouteLink>
            &apos;.
          </DTEContent>
        </>
      )}
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
                  label="Areas of research"
                />
              )}
            />
            {!hideInfo && (
              <DTEDetails summary="Why we are asking this question">
                <>
                  <DTEContent>
                    We will use this information to contact you about studies
                    you may be interested in based on the areas of research you
                    select here.
                  </DTEContent>
                  <DTEContent>
                    If you do not select any areas of research we will only be
                    able to let you know about a limited number of studies based
                    on the other information you have given during your account
                    creation.
                  </DTEContent>
                </>
              </DTEDetails>
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

export default HealthConditionForm;
