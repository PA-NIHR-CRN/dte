import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Chip,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import { useParams, Link } from "react-router-dom";
import DTEPaper from "../../Shared/UI/DTEPaper/DTEPaper";
import DTEHeader from "../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEFlourish from "../../Shared/UI/DTEFlourish/DTEFlourish";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import LoadingIndicator from "../../Shared/LoadingIndicator/LoadingIndicator";
import ErrorMessageContainer from "../../Shared/ErrorMessageContainer/ErrorMessageContainer";
import DTERichTextRender from "../../Shared/UI/DTERichText/DTERichTextRender";

interface ViewStudyDetailsProps {
  studyid: string;
}

export interface LeadResearcher {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}

export interface Item {
  studyId: number;
  cpmsId: number;
  isrctnId?: any;
  title: string;
  shortName?: any;
  about?: any;
  howHelp?: any;
  whenNeeded?: any;
  studyQuestionnaireLink?: any;
  leadResearcher: LeadResearcher;
  sites?: any;
  status: string;
  createdAtUtc: Date;
  createdById: string;
  updatedAtUtc?: any;
  updatedById?: any;
}

// Component for the view participants page
function ViewStudyDetails() {
  // Get the parameters of the URL
  const { studyid } = useParams<ViewStudyDetailsProps>();

  const getUrl = `${process.env.REACT_APP_BASE_API}/studies/${studyid}`;
  // Load the study from the CMPS API. This will need to be changed to our API once we have implemented it.
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

  const useStyles = makeStyles((theme) => ({
    grid: {
      width: "100%",
      margin: "0px",
    },
    value: {
      whiteSpace: "pre-wrap",
      overflowX: "auto",
    },
    paper: {
      padding: theme.spacing(3),
      // textAlign: "center",
      color: theme.palette.text.secondary,
      border: 2,
      borderColor: theme.palette.nhsnavy.dark,
      margin: "auto",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.paper} role="main">
      <Grid item xs={12}>
        <DTEHeader as="h1" $color="blue">
          Study Details
        </DTEHeader>
        <DTEFlourish />
      </Grid>
      {/* Show the spinner while loading the page or waiting for the progress participant API response */}
      {loading && <LoadingIndicator />}
      {/* Display any errors whilst fetching the participants */}
      {error && (
        <Grid item xs={12}>
          <DTEPaper className={classes.paper}>
            {error?.response?.status === 404 ? (
              <ErrorMessageContainer>No Study found.</ErrorMessageContainer>
            ) : (
              <ErrorMessageContainer>{error.message}</ErrorMessageContainer>
            )}
          </DTEPaper>
        </Grid>
      )}

      {data && !error && !loading && (
        <Grid item xs={12}>
          <DTEPaper className={classes.paper}>
            <Chip label={`ID: ${studyid}`} />
            <DTEHeader as="h2">{data?.content?.item?.title}</DTEHeader>
            <DTEHeader as="h3" $variant="h4">
              {data?.content?.item?.shortName}
            </DTEHeader>
            <Link
              to={{
                pathname: `/Researchers/Study/${studyid}/Members`,
                state: { title: data?.content?.item?.title },
              }}
            >
              View Members
            </Link>{" "}
            <br />
            {/* <Link to={`/Researchers/Study/${studyid}/Sites`}>View Sites</Link> */}
            <Link
              to={{
                pathname: `/Researchers/Study/${studyid}/Sites`,
                state: { title: data?.content?.item?.title },
              }}
            >
              View Sites
            </Link>
            <br />
            <Link
              to={{
                pathname: `/Researchers/Study/${studyid}/Information`,
                state: { title: data?.content?.item?.title },
              }}
            >
              Add Study Information
            </Link>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  Full Details
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Table aria-label="simple table" style={{ width: "100%" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Property</TableCell>
                      <TableCell align="right">Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries<Item>(data?.content?.item).map(
                      ([key, value]) => {
                        const result = key.replace(
                          /([A-Z]+)*([A-Z][a-z])/g,
                          "$1 $2"
                        );
                        const keyReadable =
                          result.charAt(0).toUpperCase() + result.slice(1);
                        return (
                          <TableRow key={key}>
                            <TableCell component="th" scope="row">
                              {keyReadable}
                            </TableCell>
                            <TableCell>
                              <pre className={classes.value}>
                                {typeof value === "string"
                                  ? value
                                  : JSON.stringify(value, null, 2)}
                              </pre>
                              {keyReadable === "What Important" && (
                                <DTERichTextRender
                                  richText={JSON.stringify(value)}
                                />
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      }
                    )}
                  </TableBody>
                </Table>
              </AccordionDetails>
            </Accordion>
          </DTEPaper>
        </Grid>
      )}
    </Grid>
  );
}

export default ViewStudyDetails;
