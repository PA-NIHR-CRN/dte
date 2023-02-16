import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  Card,
  CardContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DTEPaper from "../../Shared/UI/DTEPaper/DTEPaper";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import LoadingIndicator from "../../Shared/LoadingIndicator/LoadingIndicator";
import ErrorMessageContainer from "../../Shared/ErrorMessageContainer/ErrorMessageContainer";
import { Study } from "../../../types/ResearcherTypes";
import Utils from "../../../Helper/Utils";
import DTEHeader from "../../Shared/UI/DTETypography/DTEHeader/DTEHeader";

function ViewStudies() {
  const getUrl = `${process.env.REACT_APP_BASE_API}/studies`;

  const [{ data, loading, error }] = useAxiosFetch(
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
      margin: "auto",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    padded: {
      margin: theme.spacing(2),
    },
  }));
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={2}
      className={classes.paper}
      direction="row"
      justifyContent="center"
    >
      {/* Show the spinner while loading the page or waiting for the progress  API response */}
      {loading && <LoadingIndicator />}
      {/* Display any errors whilst fetching the studies */}
      {(error ||
        Utils.ConvertResponseToDTEResponse(data)?.isSuccess === false) && (
        <Grid item xs={12}>
          <DTEPaper className={classes.paper}>
            <ErrorMessageContainer
              DTEAxiosErrors={[
                Utils.ConvertResponseToDTEResponse(data)?.errors,
              ]}
              axiosErrors={[error]}
            />
          </DTEPaper>
        </Grid>
      )}

      {Utils.ConvertResponseToDTEResponse(data)?.isSuccess &&
        !error &&
        !loading && (
          <Grid item xs={12} md={8} lg={4}>
            <DTEPaper className={classes.paper}>
              {Utils.ConvertResponseToDTEResponse(data)?.content.items.map(
                (study: Study) => (
                  <Card variant="outlined" className={classes.padded}>
                    <CardContent>
                      <DTEHeader $variant="h4" as="h2">
                        {study?.studyTitle || ""}
                      </DTEHeader>
                      <Table aria-label="simple table" size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Property</TableCell>
                            <TableCell>Value</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.entries(study).map(([key, value]) => {
                            const result = key.replace(
                              /([A-Z]+)*([A-Z][a-z])/g,
                              "$1 $2"
                            );
                            const keyReadable =
                              result.charAt(0).toUpperCase() + result.slice(1);
                            if (value) {
                              return (
                                <TableRow key={key}>
                                  <TableCell>{keyReadable}</TableCell>
                                  <TableCell>
                                    {typeof value === "string"
                                      ? value
                                      : JSON.stringify(value, null, 2)}
                                  </TableCell>
                                </TableRow>
                              );
                            }
                            return null;
                          })}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                )
              )}
            </DTEPaper>
          </Grid>
        )}
    </Grid>
  );
}

export default ViewStudies;
