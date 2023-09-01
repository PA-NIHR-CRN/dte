import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { AuthContext } from "../../../context/AuthContext";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

function Logout() {
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
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      role="main"
      id="main"
    >
      <Grid item xs={12}>
        <LoadingIndicator text="Logging Out..." />
      </Grid>
    </Grid>
  );
}

export default Logout;
