import { useContext, useEffect } from "react";
import { Grid, Chip, Button } from "@material-ui/core";
import { useLocation, useHistory } from "react-router-dom";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import { AuthContext } from "../../../context/AuthContext";
import DTEPaper from "../UI/DTEPaper/DTEPaper";
import { Role } from "../../../types/AuthTypes";

// Component for the Redirect from IDG login
function Login() {
  const { hash } = useLocation();
  const idToken = new URLSearchParams(hash.slice(1)).get("id_token");
  const {
    token,
    saveToken,
    authenticatedEmail,
    authenticatedUserId,
    authenticatedEmailVerified,
    isAuthenticatedRole,
    isInNHSApp,
  } = useContext(AuthContext);

  const history = useHistory();
  useEffect(() => {
    if (!idToken) {
      history.push("/");
    } else {
      saveToken(idToken);
    }
  }, []);

  const checkTokenUrl = `${process.env.REACT_APP_BASE_API}/token`;
  const [{ response, loading }, checkToken] = useAxiosFetch(
    {
      url: checkTokenUrl,
      method: "GET",
    },
    {
      manual: true,
      useCache: false,
    }
  );

  const returnToOriginatingPage = () => {
    if (isInNHSApp) {
      history.push("/participants/introduction");
    } else {
      history.push("/");
    }
  };

  useEffect(() => {
    if (token === undefined) {
      history.push("/");
    }
    if (token) {
      if (isAuthenticatedRole(Role.Participant) && !(process.env.REACT_APP_DEBUG_AUTH === "true")) {
        returnToOriginatingPage();
      } else if (process.env.REACT_APP_DEBUG_AUTH === "true") {
        checkToken();
      } else {
        returnToOriginatingPage();
      }
    }
  }, [token]);

  return (
    <Grid container justifyContent="center" alignItems="center" role="main" id="main">
      {idToken && process.env.REACT_APP_DEBUG_AUTH === "true" && (
        <Grid item xs={12}>
          <DTEPaper>
            <h3>Successful Login </h3>
            <p>{`TOKEN: ${token}`}</p>
            <Chip label={`EMAIL: ${authenticatedEmail}`} />
            <Chip label={`ID: ${authenticatedUserId}`} />
            <Chip label={`Email Verified: ${authenticatedEmailVerified}`} />
            {!loading && <Chip color="primary" label={`Server Verification: ${response?.status === 200}`} />}
            <Button onClick={() => returnToOriginatingPage()}>Continue</Button>
          </DTEPaper>
        </Grid>
      )}
    </Grid>
  );
}

export default Login;
