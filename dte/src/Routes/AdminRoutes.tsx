import React from "react";
import ProtectedRoute from "./ProtectedRoute";
import { Role } from "../types/AuthTypes";
import AccessList from "../components/Admin/AccessList/AccessList";

export default [
  // <ProtectedRoute
  //   userRole={Role.Admin}
  //   path="/Admin/Studies"
  //   component={Studies}
  //   strict
  //   exact
  //   key="liststudies"
  // />,
  <ProtectedRoute
    userRole={Role.Admin}
    path="/Admin/AccessList"
    component={AccessList}
    strict
    exact
    key="accesslist"
  />,
  // <ProtectedRoute
  //   userRole={Role.Admin}
  //   path="/Admin/Studies/:studyid"
  //   component={UpdateStudyRequest}
  //   strict
  //   exact
  //   key="updatestudyrequest"
  // />,
];
