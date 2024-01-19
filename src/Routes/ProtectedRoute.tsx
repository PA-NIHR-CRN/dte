import { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export type ProtectedRouteProps = {
  authenticationPath?: string;
} & RouteProps;

const ProtectedRoute = ({ authenticationPath, ...routeProps }: ProtectedRouteProps) => {
  const { isAuthenticated } = useContext(AuthContext);
  if (isAuthenticated()) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Route {...routeProps} />;
  }
  return <Redirect to={{ pathname: authenticationPath || "/Participants/Options" }} />;
};

export default ProtectedRoute;
