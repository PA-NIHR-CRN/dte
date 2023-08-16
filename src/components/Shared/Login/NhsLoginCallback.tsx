import React, { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import Utils from "../../../Helper/Utils";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import { AuthContext } from "../../../context/AuthContext";
import { ContentContext } from "../../../context/ContentContext";

const userIsUnderageErrorCode = "User_Is_Underage";
const unableToMatchAccounts = "Unable_To_Match_Accounts";
function NhsLoginCallback() {
  const { content } = useContext(ContentContext);

  const { search } = useLocation();
  const authCode = new URLSearchParams(search).get("code");
  const error = new URLSearchParams(search).get("error");
  const errorDescription = new URLSearchParams(search).get("error_description");
  const state = new URLSearchParams(search).get("state");
  const history = useHistory();
  const { saveToken } = useContext(AuthContext);

  // check the auth code is valid and get the token from the API
  const [{ response, loading }, checkCode] = useAxiosFetch(
    {
      url: `${process.env.REACT_APP_BASE_API}/users/nhslogin`,
      method: "POST",
      data: {
        code: authCode,
        redirectUrl: `${process.env.REACT_APP_BASE_URL}/callback`,
      },
    },
    {
      manual: true,
      useCache: false,
    },
  );

  useEffect(() => {
    if (authCode) {
      checkCode();
    }
  }, [authCode]);

  // handle errors from the url
  useEffect(() => {
    if (error === "access_denied" && errorDescription === "ConsentNotGiven") {
      const path =
        state === "ssointegration"
          ? `/nhsnoconsent?state=${state}`
          : "/nhsnoconsent";
      history.push(path);
    }
  }, [error, errorDescription]);

  useEffect(() => {
    const result = Utils.ConvertResponseToDTEResponse(response);
    if (result?.errors?.some((e) => e.customCode === userIsUnderageErrorCode)) {
      history.push(`/under18`);
    } else if (
      result?.errors?.some((e) => e.customCode === unableToMatchAccounts)
    ) {
      history.push(`/unabletomatch`);
    } else if (result?.isSuccess) {
      saveToken(result?.content);
      const path = state === "ssointegration" ? "/nhsapplanding" : "/";
      history.push(path);
    }
  }, [response]);

  if (loading) {
    return <LoadingIndicator text={content["reusable-loading"]} />;
  }

  return null;
}

export default NhsLoginCallback;
