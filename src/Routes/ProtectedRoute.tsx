import { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Role } from "../types/AuthTypes";

export type ProtectedRouteProps = {
  userRole: Role;
  authenticationPath?: string;
} & RouteProps;

const generateAuthPath = (role: Role) => {
  let path = `/Login?role=${role}`;
  switch (role) {
    case Role.Admin:
      path = "/ResearchLogin";
      break;
    case Role.Researcher:
      path = "/ResearchLogin";
      break;
    case Role.Participant:
      path = "/Participants/Options";
      break;
    default:
      break;
  }
  return path;
};
const ProtectedRoute = ({
  userRole,
  authenticationPath,
  ...routeProps
}: ProtectedRouteProps) => {
  const { isAuthenticatedRole, isAuthenticated } = useContext(AuthContext);
  if (isAuthenticated()) {
    if (isAuthenticatedRole(userRole)) {
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <Route {...routeProps} />;
    }
    return <Redirect to={{ pathname: "/Unauthorized" }} />;
  }
  return (
    <Redirect
      to={{ pathname: authenticationPath || generateAuthPath(userRole) }}
    />
  );
};

export default ProtectedRoute;
