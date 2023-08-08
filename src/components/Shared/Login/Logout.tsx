import { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { AuthContext } from "../../../context/AuthContext";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

function Logout() {
  const { logOutToken } = useContext(AuthContext);
  const history = useHistory();
  const [loggedOut, setLoggedOut] = useState(false);
  useEffect(() => {
    logOutToken();
    setTimeout(() => {
      setLoggedOut(true);
    }, 3000);
  }, []);

  useEffect(() => {
    if (loggedOut) {
      history.push("/Participants/Options");
    }
  }, [loggedOut]);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      role="main"
      id="main"
    >
      <Grid item xs={12}>
        {!loggedOut && <LoadingIndicator text="Logging Out..." />}
      </Grid>
    </Grid>
  );
}

export default Logout;
