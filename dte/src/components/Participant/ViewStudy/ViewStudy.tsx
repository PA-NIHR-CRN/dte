import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Grid,
  FormControl,
  TextField,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import DTEPaper from "../../Shared/UI/DTEPaper/DTEPaper";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import LoadingIndicator from "../../Shared/LoadingIndicator/LoadingIndicator";
import ErrorMessageContainer from "../../Shared/ErrorMessageContainer/ErrorMessageContainer";
import { Site } from "../../../types/ParticipantTypes";
import ErrorSummary from "../../Shared/ErrorMessageContainer/ErrorSummary";
import { AuthContext } from "../../../context/AuthContext";
import DTEHeader from "../../Shared/UI/DTETypography/DTEHeader/DTEHeader";

interface ViewStudyProps {
  cpmsId: string;
}

interface IFormInput {
  siteselect: string;
}
const defaultValues = {
  siteselect: "",
};

function ViewStudy() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "all", defaultValues });
  const { cpmsId } = useParams<ViewStudyProps>();
  const { authenticatedUserId } = useContext(AuthContext);

  const onSubmit = async (formData: IFormInput) => {
    await registerInterestPost(
      {
        data: {
          studyId: Number(cpmsId),
          siteId: formData?.siteselect,
          participantId: authenticatedUserId,
        },
        url: `${process.env.REACT_APP_BASE_API}/studies/participantregistrations`,
        method: "POST",
      },
      { manual: true }
    ).catch(() => {
      // swallow 404 axios error - we need todo some error handling here.
    });
  };
  const [
    {
      response: responsePost,
      // data: dataPost,
      loading: loadingPost,
      error: errorPost,
    },
    registerInterestPost,
  ] = useAxiosFetch({});

  const getCpmsStudiesURL = `${process.env.REACT_APP_BASE_API}/studies/cpms/${cpmsId}`;
  const [{ data, loading, error }] = useAxiosFetch(
    {
      url: getCpmsStudiesURL,
      method: "GET",
    },
    {
      useCache: false,
    }
  );

  // check to see if we have already submitted interest for this study.
  const getCpmsStudyParticipantsURL = `${process.env.REACT_APP_BASE_API}/studies/${cpmsId}/participants/${authenticatedUserId}`;
  const [
    {
      response: alreadySubmittedInterestResponse,
      loading: alreadySubmittedInterestLoading,
      error: alreadySubmittedInterestError,
    },
    refetchAlreadySubmitted,
  ] = useAxiosFetch(
    {
      url: getCpmsStudyParticipantsURL,
      method: "GET",
    },
    {
      useCache: false,
    }
  );

  React.useEffect(() => {
    const getData = async () => {
      await refetchAlreadySubmitted();
    };

    getData().catch((e) => {
      // eslint-disable-next-line no-console
      console.log(
        `There has been a problem with your fetch operation: ${e.message}`
      );
    });
  }, []);

  // convert to styled components later
  const useStyles = makeStyles((theme) => ({
    grid: {
      width: "100%",
      margin: "0px",
    },
    paper: {
      padding: theme.spacing(3),
      textAlign: "center",
      color: theme.palette.text.secondary,
      border: 2,
      borderColor: theme.palette.nhsnavy.dark,
    },
  }));

  const classes = useStyles();

  const selectedSite = watch("siteselect");
  const unableToFindStudyError =
    "Sorry, We are unable to locate the given study";
  const unableToExpressInterestError = "Sorry, something went wrong.";
  return (
    <Grid container spacing={2} className={classes.grid}>
      {(loading || alreadySubmittedInterestLoading) && <LoadingIndicator />}
      {error?.isAxiosError && (
        <Grid item xs={12}>
          <DTEPaper className={classes.paper}>
            <ErrorMessageContainer>
              {unableToFindStudyError /* error?.message */}
            </ErrorMessageContainer>
          </DTEPaper>
        </Grid>
      )}
      {errorPost?.isAxiosError && (
        <Grid item xs={12}>
          <DTEPaper className={classes.paper}>
            <ErrorMessageContainer>
              {unableToExpressInterestError /* errorPost?.message */}
            </ErrorMessageContainer>
          </DTEPaper>
        </Grid>
      )}
      {data && !loading && (
        <Grid item xs={12}>
          <DTEPaper className={classes.paper}>
            <DTEHeader as="h4">{data?.shortName}</DTEHeader>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>CPMS ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Short Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={data?.id}>
                  <TableCell>{data?.id}</TableCell>
                  <TableCell component="th" scope="row">
                    {data?.title}
                  </TableCell>
                  <TableCell>{data?.shortName}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Typography>{data?.researchSummary}</Typography>
            {alreadySubmittedInterestError /* should we should check if the participant is authed here? */ && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                  <TextField
                    select
                    id="siteselect"
                    // defaultValue={data?..Id}
                    value={selectedSite}
                    label="Site"
                    // onChange={handleSiteSelectChange}
                    required
                    error={!!errors.siteselect}
                    aria-invalid={!!errors.siteselect}
                    type="number"
                    disabled={loadingPost || responsePost?.status === 201}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register("siteselect", {
                      required: { value: true, message: "Trial Site Required" },
                    })}
                  >
                    {data?.sites?.map(
                      ({ name: siteName, rtsIdentifier }: Site) => (
                        <MenuItem key={rtsIdentifier} value={rtsIdentifier}>
                          {siteName}
                        </MenuItem>
                      )
                    )}
                  </TextField>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={
                      loadingPost ||
                      responsePost?.status === 201 ||
                      selectedSite.length === 0
                    }
                  >
                    Express Interest
                  </Button>
                  {loadingPost && (
                    <LoadingIndicator text="Submitting, Please Wait" />
                  )}
                  <ErrorSummary errors={errors} />
                  {responsePost?.status === 201 && (
                    <DTEHeader as="h4">Successfully Submitted</DTEHeader>
                  )}
                </FormControl>
              </form>
            )}
            {alreadySubmittedInterestResponse && (
              <DTEHeader as="h4">
                You have already registered interest in this study.
              </DTEHeader>
            )}
          </DTEPaper>
        </Grid>
      )}
    </Grid>
  );
}

export default ViewStudy;
