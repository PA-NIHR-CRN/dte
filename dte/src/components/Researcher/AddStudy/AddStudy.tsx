import React, { useContext } from "react";
import {
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TextField,
  Button,
} from "@material-ui/core";
import { AddCircle, Help } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import DTEPaper from "../../Shared/UI/DTEPaper/DTEPaper";
import DTEHeader from "../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import LoadingIndicator from "../../Shared/LoadingIndicator/LoadingIndicator";
import ErrorMessageContainer from "../../Shared/ErrorMessageContainer/ErrorMessageContainer";
import ErrorSummary from "../../Shared/ErrorMessageContainer/ErrorSummary";
import Utils from "../../../Helper/Utils";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import { AuthContext } from "../../../context/AuthContext";

function AddStudy() {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors: formErrors },
  } = useForm({ mode: "all" });

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

  const onSubmit = async (formData: any) => {
    clearAddStudyPost();
    // setIsDirty(true);
    setAddEnabled(true);
    await getStudyDetails(
      {
        url: `${process.env.REACT_APP_BASE_API}/studies/cpms/${formData.CPMSId}`,
        method: "GET",
      },
      {
        manual: true,
      }
    ).catch(() => {
      // swallow 404 axios error -
    });
  };

  const errorMessage = "Unable to Locate Study by CPMS Id";
  const [addEnabled, setAddEnabled] = React.useState(false);

  const [{ data, error, /* response, */ loading }, getStudyDetails] =
    useAxiosFetch({});

  const [
    { response: responsePost, loading: loadingPost, error: errorPost },
    addStudyPost,
    clearAddStudyPost,
  ] = useAxiosFetch({});

  const { authenticatedUserId, authenticatedFirstname, authenticatedLastname } =
    useContext(AuthContext);
  const handleOnClickAdd = async (id: string) => {
    setAddEnabled(false);
    await addStudyPost(
      {
        data: {
          studyId: id,
          title: data?.title,
          shortName: data?.shortName,
          researcher: {
            firstname: authenticatedFirstname,
            lastname: authenticatedLastname,
            email: authenticatedUserId,
          },
        },
        url: `${process.env.REACT_APP_BASE_API}/studyregistrations`,
        method: "POST",
      },
      {
        manual: true,
      }
    ).catch(() => {
      // swallow 404 axios error - we need todo some error handling here.
    });
  };

  return (
    <Grid container spacing={2} className={classes.grid}>
      <Grid item xs={12}>
        <DTEPaper className={classes.paper}>
          <DTEHeader as="h4">
            Search for a trial using the CPMS Id in order to add it to DTE.
          </DTEHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id="CPMSId"
              defaultValue=""
              label="CPMS ID"
              variant="outlined"
              fullWidth
              required
              error={!!formErrors.CPMSId}
              aria-invalid={!!formErrors.CPMSId}
              type="number"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register("CPMSId", {
                required: { value: true, message: "CPMS Id Required" },
                minLength: {
                  value: 5,
                  message: "CPMS Id must be a minimum of 5 characters",
                },
                maxLength: {
                  value: 30,
                  message: "CPMS Id must be a maximum of 30 characters",
                },
              })}
            />
            <Button type="submit" disabled={loading || loadingPost}>
              Submit
            </Button>
            <ErrorSummary errors={formErrors} />
          </form>
        </DTEPaper>
      </Grid>
      {data && !loading && !error && (
        <Grid item xs={12}>
          <DTEPaper className={classes.paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={data?.id}>
                  <TableCell component="th" scope="row">
                    {data?.shortName}
                  </TableCell>
                  <TableCell>{data?.title}</TableCell>
                  <TableCell>{data?.status?.name}</TableCell>
                  <TableCell>
                    {Utils.IsCPMSStatusDTEReady(data?.status?.name) ? (
                      <Tooltip title="Add Study to DTE">
                        <IconButton
                          onClick={() => handleOnClickAdd(data?.id)}
                          disabled={!addEnabled}
                        >
                          <AddCircle color="error" />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <>
                        Incorrect study status.
                        <Tooltip
                          title={`Status must be one of : ${process.env.REACT_APP_DTE_READY_STATUS_LIST}`}
                        >
                          <IconButton
                            area-label="Report"
                            color="primary"
                            disabled={
                              loading ||
                              loadingPost ||
                              responsePost?.status === 202
                            }
                          >
                            <Help />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </DTEPaper>
        </Grid>
      )}
      {
        error?.isAxiosError && (
          <Grid item xs={12}>
            <DTEPaper className={classes.paper}>
              <ErrorMessageContainer>{errorMessage}</ErrorMessageContainer>
            </DTEPaper>
          </Grid>
        ) /* replace error message */
      }
      {errorPost?.isAxiosError /* && !isDirty */ && (
        <Grid item xs={12}>
          <DTEPaper className={classes.paper}>
            {errorPost?.response?.status === 400 ? (
              <ErrorMessageContainer>
                {errorPost?.response?.data?.Message}
              </ErrorMessageContainer>
            ) : (
              <ErrorMessageContainer>
                4{errorPost?.message}
              </ErrorMessageContainer>
            )}
          </DTEPaper>
        </Grid>
      )}
      {loading && (
        <Grid item xs={12}>
          <DTEPaper className={classes.paper}>
            <LoadingIndicator text="Searching for CPMS Id..." />
          </DTEPaper>
        </Grid>
      )}
      {loadingPost && <LoadingIndicator text="Submitting..." />}
      {responsePost?.status === 201 && !errorPost && !loadingPost && (
        <DTEHeader as="h4">Successfully submitted</DTEHeader>
      )}
    </Grid>
  );
}

export default AddStudy;
