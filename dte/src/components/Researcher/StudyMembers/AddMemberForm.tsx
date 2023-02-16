import { useState, useEffect } from "react";
import { Grid, Box } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useTheme } from "styled-components";
import { useForm, Controller } from "react-hook-form";
import { CheckCircle } from "@material-ui/icons";
import WarningIcon from "@material-ui/icons/Warning";
import { Radios } from "nhsuk-react-components";
import DTEPaper from "../../Shared/UI/DTEPaper/DTEPaper";
import DTEHeader from "../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../Shared/UI/DTETypography/DTEContent/DTEContent";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import DTEInput from "../../Shared/UI/DTEInput/DTEInput";
import DTERadio from "../../Shared/UI/DTERadio/DTERadio";
import DTEButton from "../../Shared/UI/DTEButton/DTEButton";
import LoadingIndicator from "../../Shared/LoadingIndicator/LoadingIndicator";
import ErrorMessageContainer from "../../Shared/ErrorMessageContainer/ErrorMessageContainer";
import { DTEAxiosResponse } from "../../../types/AuthTypes";
import { styledComponentsTheme } from "../../../theme";
import Utils, { EmailRegex } from "../../../Helper/Utils";

interface StudyMembersURLProps {
  studyid: string;
}

interface StudyMembersProps {
  refreshParticipants: () => void;
}

const AddMemberForm = (props: StudyMembersProps) => {
  const { refreshParticipants } = props;
  const theme = useTheme() as typeof styledComponentsTheme;
  const { studyid } = useParams<StudyMembersURLProps>();
  const [postResponse, setPostResponse] = useState<
    DTEAxiosResponse | undefined
  >(undefined);
  const [getResponse, setGetResponse] = useState<DTEAxiosResponse | undefined>(
    undefined
  );

  const { handleSubmit, reset, control, getValues } = useForm({
    mode: "onTouched",
    defaultValues: {
      email: "",
      permissions: "member",
    },
  });

  const [formShown, setFormShown] = useState(false);

  const clearAndHideForm = () => {
    reset();
    setPostResponse(undefined);
    setGetResponse(undefined);
    setFormShown(false);
  };

  const [
    { response: responsePost, loading: postLoading, error: postError },
    addMemberPost,
  ] = useAxiosFetch({}, { manual: true });

  const [{ loading, error: fetchError }, getUser] = useAxiosFetch(
    {},
    {
      manual: true,
      useCache: false,
    }
  );

  const onSubmit = async (formData: { email: string; permissions: string }) => {
    setFormShown(false);
    const userResponse = await getUser(
      {
        url: `${process.env.REACT_APP_BASE_API}/researchers/${formData.email}`,
        method: "get",
      },
      {
        manual: true,
        useCache: false,
      }
    ).catch(() => {});
    setGetResponse(Utils.ConvertResponseToDTEResponse(userResponse));
  };

  const showErrorContent = (content: string) => {
    return (
      <DTEPaper
        $bandColour={theme.NIHR.Red}
        onClickClose={() => {
          clearAndHideForm();
        }}
        $spaced
        $buttonLabel="Close study sent notification"
      >
        <Grid container direction="row" alignItems="flex-start">
          <Grid item xs={2} sm={1}>
            <Box pt={1}>
              <WarningIcon style={{ fontSize: 40, color: theme.NIHR.Red }} />
            </Box>
          </Grid>
          <Grid item xs={10} sm={11}>
            <Grid container direction="row" alignItems="center">
              <DTEHeader as="h2">
                We cannot add this team member to the study
              </DTEHeader>
              <DTEContent>{content}</DTEContent>
            </Grid>
            <DTEButton
              onClick={() => {
                clearAndHideForm();
                setFormShown(true);
              }}
            >
              Add someone else +
            </DTEButton>
          </Grid>
        </Grid>
      </DTEPaper>
    );
  };

  useEffect(() => {
    if (getResponse?.isSuccess) {
      let roleEnum = 0;
      switch (getValues("permissions")) {
        case "admin":
          roleEnum = 1;
          break;
        case "member":
          roleEnum = 2;
          break;
        default:
          break;
      }
      addMemberPost(
        {
          data: {
            researcherId: getResponse.content.id,
            researcherFirstname: getResponse.content.firstname,
            researcherLastname: getResponse.content.lastname,
            researcherEmail: getResponse.content.email,
            studyId: studyid,
            role: roleEnum,
          },
          url: `${process.env.REACT_APP_BASE_API}/researcherstudies`,
          method: "POST",
        },
        {
          manual: true,
          useCache: false,
        }
      );
    }
  }, [getResponse]);

  useEffect(() => {
    if (responsePost) {
      setPostResponse(Utils.ConvertResponseToDTEResponse(responsePost));
    }
  }, [responsePost]);

  useEffect(() => {
    if (postResponse?.isSuccess) {
      refreshParticipants();
    }
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={8}>
        {loading && <LoadingIndicator text="Checking researcher..." />}
        {postLoading && <LoadingIndicator text="Adding researcher..." />}
        {!formShown &&
          !loading &&
          !postLoading &&
          !postResponse &&
          !getResponse && (
            <Box pt={2} pb={2}>
              <DTEButton
                onClick={() => {
                  reset();
                  setPostResponse(undefined);
                  setGetResponse(undefined);
                  setFormShown(true);
                }}
              >
                Add a new member to this study +
              </DTEButton>
            </Box>
          )}
        {formShown && !getResponse && !postResponse && (
          <DTEPaper
            $bandColour="Default"
            onClickClose={() => {
              clearAndHideForm();
            }}
            $spaced
            $buttonLabel="Close add study form"
            variant="outlined"
          >
            <DTEHeader as="h2" $color="blue">
              Invite a team member to join the study
            </DTEHeader>
            <DTEContent>
              If you want to add more people to this study, you can do it here.
              They&apos;ll need to have an Identity Gateway &#40;IDG&#41;
              account before they can be added.
            </DTEContent>
            <Box pt={2} pb={2}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  control={control}
                  name="email"
                  render={({
                    field: { value, onChange, onBlur },
                    fieldState: { error },
                  }) => (
                    <DTEInput
                      value={value}
                      onValueChange={onChange}
                      onValueBlur={onBlur}
                      error={error?.message}
                      label="Enter email address"
                      disabled={postLoading}
                    />
                  )}
                  rules={{
                    required: {
                      value: true,
                      message: "Email address required",
                    },
                    pattern: {
                      value: EmailRegex,
                      message:
                        "Enter an email address in the correct format, like name@example.com",
                    },
                  }}
                />
                <Controller
                  control={control}
                  name="permissions"
                  render={({
                    field: { value, onChange, onBlur },
                    fieldState: { error },
                  }) => (
                    <DTERadio
                      id="radiogroup"
                      name="radiogroup"
                      label={<>Permissions</>}
                      error={error?.message}
                      onChange={onChange}
                      onBlur={onBlur}
                    >
                      <Grid container direction="row">
                        <Grid item>
                          <Radios.Radio
                            value="member"
                            defaultChecked={value === "member"}
                          >
                            Study team member
                          </Radios.Radio>
                        </Grid>
                        <Grid item>
                          <Radios.Radio
                            value="admin"
                            defaultChecked={value === "admin"}
                          >
                            Study team admin
                          </Radios.Radio>
                        </Grid>
                      </Grid>
                    </DTERadio>
                  )}
                  rules={{
                    validate: (value) => {
                      if (value === "") return "Please select a permission";
                      return true;
                    },
                  }}
                />
                <DTEButton disabled={postLoading}>Add member +</DTEButton>
                {postLoading && <LoadingIndicator text="Submitting..." />}
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
                    style={{
                      fontSize: 40,
                      color: theme.NIHR.LighterGreen,
                      marginRight: "10px",
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={10} sm={11}>
                <Grid container direction="row" alignItems="center">
                  <DTEHeader as="h2" $variant="h4">
                    You have invited a team member to join the study
                  </DTEHeader>
                  <DTEContent>
                    You&apos;ve successfully added a team member to this study.
                  </DTEContent>
                </Grid>
                <DTEButton
                  onClick={() => {
                    clearAndHideForm();
                    setFormShown(true);
                  }}
                >
                  Add someone else +
                </DTEButton>
              </Grid>
            </Grid>
          </DTEPaper>
        )}
        {postResponse &&
          !postResponse?.isSuccess &&
          showErrorContent(
            "The email address you&apos;ve entered is already registered with this study."
          )}
        {getResponse &&
          !getResponse.isSuccess &&
          showErrorContent(
            "The email address you&apos;ve entered is not registered with the Identity Gateway. Once your colleague confirms they have registered, you&apos;ll then be able to add them."
          )}
        <ErrorMessageContainer
          axiosErrors={[postError, fetchError]}
          // DTEAxiosErrors={[postResponse?.errors]}
        />
      </Grid>
    </Grid>
  );
};

export default AddMemberForm;
