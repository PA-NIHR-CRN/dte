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
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import ErrorMessageContainer from "../ErrorMessageContainer/ErrorMessageContainer";
import Utils from "../../../Helper/Utils";
import FormNavigationButtons from "./CommonElements/FormNavigationButtons";

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
  const [
    {
      response: healthConditionsResponse,
      loading: healthConditionsLoading,
      error: healthConditionsError,
    },
  ] = useAxiosFetch(
    {
      url: `${process.env.REACT_APP_BASE_API}/referencedata/health/healthconditions`,
    },
    {
      useCache: false,
    }
  );

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
            Start typing in the search box, for example &apos;diabetes&apos;,
            &apos;heart disease&apos; or &apos;COVID-19&apos;. Then you&apos;ll
            see a range of matching research areas you can select from.
          </DTEContent>
          <DTEContent>
            Please select all the areas you are interested in. You can choose
            more than one.
          </DTEContent>
          <DTEContent>
            In addition to studies for people with a diagnosis of a disease or
            condition, lots of studies need healthy volunteers too. Type in
            &apos;Healthy Volunteers&apos; and select it if you are interested
            in taking part in research as a{" "}
            <DTERouteLink
              to="https://bepartofresearch.nihr.ac.uk/taking-part/volunteering-without-a-condition/"
              external
              target="_blank"
              renderStyle="standard"
            >
              healthy volunteer
            </DTERouteLink>
            .
          </DTEContent>
        </>
      )}
      <Grid container>
        <Grid item xs={12} sm={10} md={9} lg={8} xl={8}>
          {(healthConditionsError ||
            Utils.ConvertResponseToDTEResponse(healthConditionsResponse)
              ?.isSuccess === false) && (
            <Grid item xs={12}>
              <ErrorMessageContainer
                DTEAxiosErrors={[
                  Utils.ConvertResponseToDTEResponse(healthConditionsResponse)
                    ?.errors,
                ]}
                axiosErrors={[healthConditionsError]}
              />
            </Grid>
          )}
          {healthConditionsLoading ? (
            <LoadingIndicator text="Loading health conditions..." />
          ) : (
            <form onSubmit={handleSubmit(onDataChange)} noValidate>
              <Controller
                control={control}
                name="conditions"
                render={({ field: { value, onChange } }) => (
                  <DTEForwardLookup
                    id="healthConditions"
                    values={value}
                    data={
                      Utils.ConvertResponseToDTEResponse(
                        healthConditionsResponse
                      )?.content
                    }
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
                      you may be interested in based on the areas of research
                      you select here.
                    </DTEContent>
                    <DTEContent>
                      If you do not select any areas of research we will only be
                      able to let you know about a limited number of studies
                      based on the other information you have given during your
                      account creation.
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
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default HealthConditionForm;
