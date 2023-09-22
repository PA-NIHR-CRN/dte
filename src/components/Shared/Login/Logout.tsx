import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { AuthContext } from "../../../context/AuthContext";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import { ContentContext } from "../../../context/ContentContext";

function Logout() {
  const { content } = useContext(ContentContext);
  const { logOutToken, authenticatedUserId } = useContext(AuthContext);
  const history = useHistory();
  useEffect(() => {
    logOutToken();
  }, []);

  useEffect(() => {
    if (!authenticatedUserId) {
      history.push("/Participants/Options");
    }
  }, [authenticatedUserId]);

  return (
    <Grid container justifyContent="center" alignItems="center" role="main" id="main">
      <Grid item xs={12}>
        <LoadingIndicator text={content["logout-loading-logging-out"]} />
      </Grid>
    </Grid>
  );
}

export default Logout;
