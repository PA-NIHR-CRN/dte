import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  IconButton,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { PersonAdd, PersonAddDisabled } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import DTEPaper from "../../Shared/UI/DTEPaper/DTEPaper";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import LoadingIndicator from "../../Shared/LoadingIndicator/LoadingIndicator";
import ErrorMessageContainer from "../../Shared/ErrorMessageContainer/ErrorMessageContainer";
import { Participant, ParticipantStatus } from "../../../types/ResearcherTypes";
import Utils from "../../../Helper/Utils";

interface ViewParticipantsProps {
  studyid: string;
  siteid: string;
  statusid: string;
}

// Component for the view participants page
function ViewParticipants() {
  // Get the parameters of the URL
  const { studyid, siteid, statusid } = useParams<ViewParticipantsProps>();
  const [filteredData, setFilteredData] = React.useState([]);
  const [statusFilter, setStatusFilter] = React.useState(statusid || "Applied");

  const getUrl = siteid
    ? `${process.env.REACT_APP_BASE_API}/Studies/${studyid}/sites/${siteid}/participantstatus/${statusFilter}`
    : `${process.env.REACT_APP_BASE_API}/Studies/${studyid}/participants/status/${statusFilter}`;
  // Load the participants of the study from the API
  const [{ data, loading, error } /* , getParticipants */] = useAxiosFetch(
    {
      url: getUrl,
      method: "GET",
    },
    {
      manual: false,
      useCache: false,
    }
  );

  const [
    { loading: loadingPost, error: errorPost },
    changeStatusPost,
    clearStatusPost,
  ] = useAxiosFetch({ method: "POST" }, { manual: true });

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
      margin: "auto",
    },
  }));
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    setFilteredData(data);
  }, [data]);

  // Handle the researcher accepting or rejecting a participant
  const handleOnClickApproveReject = async (
    id: string,
    participantStatus: ParticipantStatus,
    siteId: string
  ) => {
    const url =
      participantStatus === ParticipantStatus.screening
        ? `${process.env.REACT_APP_BASE_API}/studies/${studyid}/sites/${siteId}/participants/${id}/screening`
        : `${process.env.REACT_APP_BASE_API}/studies/${studyid}/sites/${siteId}/participants/${id}/notselected`;
    const res = await changeStatusPost({
      url: `${url}`,
    }).catch(() => {
      // swallow 404 axios error - we need todo some error handling here.
    });

    if (res?.status === 200) {
      enqueueSnackbar(
        `Participant ${id} successfully moved to ${
          participantStatus === ParticipantStatus.screening
            ? "Screening"
            : "Rejected"
        }`,
        { variant: "success" }
      );
    } else {
      enqueueSnackbar(
        `Error: Participant ${id} failed to be moved to ${
          participantStatus === ParticipantStatus.screening
            ? "Approved"
            : "Rejected"
        }`,
        { variant: "error" }
      );
    }
    // remove acting upon item.
    setFilteredData(
      filteredData.filter((item: Participant) => item.participantId !== id)
    );
  };

  // Triggered when the select changes
  const filterStatusChange = (event: any) => {
    clearStatusPost();
    setStatusFilter(event.target.value);
  };

  // The "progress participant to screening" button
  const screeningButton = (
    email: string,
    siteId: string,
    disabled?: boolean
  ) => (
    <Tooltip title="Progress to screening" aria-label="Progress to screening">
      <IconButton
        onClick={() =>
          handleOnClickApproveReject(email, ParticipantStatus.screening, siteId)
        }
        disabled={disabled}
      >
        <PersonAdd />
      </IconButton>
    </Tooltip>
  );

  // The "don't progress participant" to screening button
  const notSelectedButton = (
    email: string,
    siteId: string,
    disabled?: boolean
  ) => (
    <Tooltip
      title="Not selected to progress"
      aria-label="Not selected to progress"
    >
      <IconButton
        onClick={() =>
          handleOnClickApproveReject(
            email,
            ParticipantStatus.notSelected,
            siteId
          )
        }
        disabled={disabled}
      >
        <PersonAddDisabled />
      </IconButton>
    </Tooltip>
  );

  return (
    <Grid container spacing={2} className={classes.paper}>
      <Grid item xs={6}>
        <DTEPaper className={classes.paper}>
          {siteid && (
            <h3>
              Participants at site {siteid} for study {studyid}
            </h3>
          )}
          {!siteid && <h3>Participants at all sites for study {studyid}</h3>}

          <FormControl fullWidth>
            <InputLabel id="status-filter-select-label">Status</InputLabel>
            <Select
              labelId="status-filter-select-label"
              id="status-filter-select"
              value={statusFilter}
              label="Status"
              onChange={filterStatusChange}
              disabled={loading}
            >
              <MenuItem value="None">None</MenuItem>
              <MenuItem value="Applied">Applied</MenuItem>
              <MenuItem value="Screening">Screening</MenuItem>
              <MenuItem value="NotSelected">NotSelected</MenuItem>
              <MenuItem value="Enrolled">Enrolled</MenuItem>
              <MenuItem value="NotEnrolled">NotEnrolled</MenuItem>
              <MenuItem value="Withdrawn">Withdrawn</MenuItem>
            </Select>
          </FormControl>
        </DTEPaper>
      </Grid>

      {/* Show the spinner while loading the page or waiting for the progress participant API response */}
      {loading && <LoadingIndicator />}
      {/* Display any errors whilst fetching the participants */}
      {error && (
        <Grid item xs={12}>
          <DTEPaper className={classes.paper}>
            {error?.response?.status === 404 ? (
              <ErrorMessageContainer>
                No Participants found.
              </ErrorMessageContainer>
            ) : (
              <ErrorMessageContainer>{error.message}</ErrorMessageContainer>
            )}
          </DTEPaper>
        </Grid>
      )}

      {/* Display any errors when progressing a participant */}
      {errorPost && (
        <Grid item xs={12}>
          <DTEPaper className={classes.paper}>
            ERROR POST
            <ErrorMessageContainer>{errorPost?.message}</ErrorMessageContainer>
          </DTEPaper>
        </Grid>
      )}
      {filteredData?.length > 0 && !error && !loading && !loadingPost && (
        <Grid item xs={12}>
          <DTEPaper className={classes.paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First name</TableCell>
                  <TableCell>Second name</TableCell>
                  <TableCell>Date of birth</TableCell>
                  <TableCell>Phone number</TableCell>
                  <TableCell>Email address</TableCell>
                  <TableCell>Ethnicity</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Sex at birth</TableCell>
                  <TableCell>Site</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Last updated </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Iterate through the participants */}

                {filteredData.map((participant: Participant) => {
                  return (
                    <TableRow key={participant?.participantId}>
                      <TableCell>
                        {participant?.participantDetails?.firstname}
                      </TableCell>
                      <TableCell>
                        {participant?.participantDetails?.lastname}
                      </TableCell>
                      <TableCell>
                        {Utils.ConvertDate(
                          participant?.participantDemographics?.dateOfBirth
                        )}
                      </TableCell>
                      <TableCell>
                        {participant?.participantDetails?.phoneNumber}
                      </TableCell>
                      <TableCell>
                        {participant?.participantDetails?.email}
                      </TableCell>
                      <TableCell>
                        {participant?.participantDemographics?.ethnicity}
                      </TableCell>
                      <TableCell>
                        {participant?.participantDemographics?.gender}
                      </TableCell>
                      <TableCell>
                        {participant?.participantDemographics?.sex}
                      </TableCell>
                      <TableCell>{participant?.siteId}</TableCell>
                      <TableCell>
                        {participant?.participantRegistrationStatus}
                      </TableCell>
                      <TableCell>
                        {Utils.ConvertDateWithTime(participant?.updatedAtUtc)}
                      </TableCell>
                      <TableCell>
                        {/* Only display the buttons if the current status is "Applied" */}
                        {participant?.participantRegistrationStatus ===
                          "Applied" &&
                          screeningButton(
                            participant?.participantId,
                            participant?.siteId,
                            loadingPost
                          )}
                        {participant.participantRegistrationStatus ===
                          "Applied" &&
                          notSelectedButton(
                            participant?.participantId,
                            participant?.siteId,
                            loadingPost
                          )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </DTEPaper>
        </Grid>
      )}
    </Grid>
  );
}

export default ViewParticipants;
