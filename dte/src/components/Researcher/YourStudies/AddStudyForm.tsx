import { useState, useContext } from "react";
import { Grid, Box } from "@material-ui/core";
import { useTheme } from "styled-components";
import { useForm, Controller } from "react-hook-form";
import { CheckCircle } from "@material-ui/icons";
import DTEPaper from "../../Shared/UI/DTEPaper/DTEPaper";
import DTEHeader from "../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../Shared/UI/DTETypography/DTEContent/DTEContent";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import { AuthContext } from "../../../context/AuthContext";
import DTEInput from "../../Shared/UI/DTEInput/DTEInput";
import DTETextArea from "../../Shared/UI/DTETextArea/DTETextArea";
import DTEAccordion from "../../Shared/UI/DTEAccordion/DTEAccordion";
import DTEButton from "../../Shared/UI/DTEButton/DTEButton";
import LoadingIndicator from "../../Shared/LoadingIndicator/LoadingIndicator";
import ErrorMessageContainer from "../../Shared/ErrorMessageContainer/ErrorMessageContainer";
import Utils from "../../../Helper/Utils";
import { DTEAxiosResponse } from "../../../types/AuthTypes";
import { styledComponentsTheme } from "../../../theme";

const AddStudyForm = () => {
  const { authenticatedFirstname, authenticatedLastname, authenticatedEmail } =
    useContext(AuthContext);

  const theme = useTheme() as typeof styledComponentsTheme;
  const {
    handleSubmit,
    // watch,
    reset,
    control,
    // formState: { },
  } = useForm({ mode: "all" });

  const [formShown, setFormShown] = useState(false);

  const clearAndHideForm = () => {
    reset();
    setPostResponse(undefined);
    setFormShown(false);
  };
  const [{ loading: loadingPost, error: errorPost }, addStudyPost] =
    useAxiosFetch({}, { manual: true });

  const [postResponse, setPostResponse] = useState<
    DTEAxiosResponse | undefined
  >(undefined);

  const onSubmit = async (formData: any) => {
    setPostResponse(undefined);
    const res = await addStudyPost(
      {
        data: {
          studyId: formData.irasid,
          title: formData.studytitle,
          researcher: {
            firstname: authenticatedFirstname,
            lastname: authenticatedLastname,
            email: authenticatedEmail,
          },
        },
        url: `${process.env.REACT_APP_BASE_API}/studyregistrations`,
        method: "POST",
      },
      {
        manual: true,
      }
    ).catch(() => {
      // swallow 404 axios error -
    });

    const result = Utils.ConvertResponseToDTEResponse(res);
    // alert(JSON.stringify(result));
    setPostResponse(result);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {!formShown && (
          <Box pt={2} pb={2}>
            <DTEButton
              onClick={() => {
                setFormShown(true);
              }}
            >
              Ask for a study to be added +
            </DTEButton>
          </Box>
        )}
        {!postResponse?.isSuccess && formShown && (
          <DTEPaper
            $bandColour="Default"
            onClickClose={() => {
              clearAndHideForm();
            }}
            $spaced
            $buttonLabel="Close add study form"
          >
            <DTEHeader as="h2" $color="blue">
              Ask for another study to be added
            </DTEHeader>
            <DTEContent>
              Your request will go to the service delivery manager
            </DTEContent>
            <Box pt={2} pb={2}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  control={control}
                  name="irasid"
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <DTEInput
                      value={value}
                      onValueChange={onChange}
                      error={error?.message}
                      label="IRAS ID"
                      disabled={loadingPost}
                    />
                  )}
                  rules={{
                    required: { value: true, message: "IRAS ID required" },
                    pattern: {
                      value:
                        // eslint-disable-next-line no-useless-escape
                        /^([0-9]){5,7}$/,
                      message:
                        "Please enter a valid IRAS ID (5-7 numerical characters)",
                    },
                  }}
                />
                <DTEAccordion
                  id="donthaveirasid"
                  name="donthaveirasid"
                  sections={[
                    {
                      isDefault: false,
                      title: "I don't have an IRAS ID",
                      contentElements: [
                        {
                          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi turpis tortor, elementum a sem vel, bibendum auctor leo. Aenean fermentum viverra turpis sed pellentesque. Vestibulum maximus ullamcorper aliquet. Aenean molestie metus et ex scelerisque egestas. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed convallis felis ac consectetur vulputate. In dui metus, scelerisque vel nunc maximus, condimentum pretium turpis. Nullam accumsan felis tellus, ut molestie risus maximus et. Nulla tincidunt purus id pharetra efficitur. Mauris sed volutpat dolor, at rhoncus tortor. Etiam augue enim, commodo sed lectus sed, sollicitudin interdum justo. Nullam ut est accumsan turpis malesuada vehicula eget non urna. Etiam vulputate urna sed nunc viverra, at rutrum magna eleifend.",
                        },
                      ],
                    },
                  ]}
                />
                <Controller
                  control={control}
                  name="studytitle"
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <DTETextArea
                      disabled={loadingPost}
                      value={value}
                      onValueChange={onChange}
                      error={error?.message}
                      label="Study Title"
                    />
                  )}
                  rules={{
                    required: {
                      value: true,
                      message: "Study Title required",
                    },
                  }}
                />
                <DTEButton disabled={loadingPost}>Send Request</DTEButton>
                {loadingPost && <LoadingIndicator text="Submitting..." />}
                <ErrorMessageContainer
                  axiosError={errorPost}
                  DTEAxiosErrors={[postResponse?.errors]}
                />
              </form>
            </Box>
          </DTEPaper>
        )}
        {postResponse?.isSuccess && (
          <DTEPaper
            $bandColour={theme.NIHR.LighterGreen}
            onClickClose={() => {
              clearAndHideForm();
            }}
            $spaced
            $buttonLabel="Close study sent notification"
          >
            <Grid container direction="row" alignItems="flex-start">
              <Grid item xs={2} sm={1}>
                <Box pt={1}>
                  <CheckCircle
                    style={{ fontSize: 40, color: theme.NIHR.LighterGreen }}
                  />
                </Box>
              </Grid>
              <Grid item xs={10} sm={11}>
                <Grid container direction="row" alignItems="center">
                  <DTEHeader as="h2">
                    We&apos;ve sent your request for a new study to be added.
                  </DTEHeader>
                  <DTEContent>
                    You&apos;ll get an email about it in the next 5 days.
                  </DTEContent>
                </Grid>
              </Grid>
            </Grid>
          </DTEPaper>
        )}
      </Grid>
    </Grid>
  );
};

export default AddStudyForm;
