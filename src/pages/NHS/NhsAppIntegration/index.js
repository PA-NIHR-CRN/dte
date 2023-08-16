import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoadingIndicator from "../../../components/Shared/LoadingIndicator/LoadingIndicator";
import { ContentContext } from "../../../context/ContentContext";

function NhsAppIntegration() {
  const { content } = useContext(ContentContext);
  const { search } = useLocation();
  const assertedLoginIdentity = new URLSearchParams(search).get(
    "assertedLoginIdentity",
  );

  useEffect(() => {
    const redirectUri = process.env.REACT_APP_BASE_URL;
    const nhsBaseDomain = process.env.REACT_APP_NHS_LOGIN_URL;
    const clientId = process.env.REACT_APP_NHS_LOGIN_CLIENT_ID;
    const scope = process.env.REACT_APP_NHS_LOGIN_SCOPE;
    window.location.href = `${nhsBaseDomain}/authorize?prompt=none&client_id=${clientId}&scope=${scope}&asserted_login_identity=${assertedLoginIdentity}&response_type=code&state=ssointegration&redirect_uri=${redirectUri}/callback`;
  }, [assertedLoginIdentity]);

  return <LoadingIndicator text={content["reusable-loading"]} />;
}

export default NhsAppIntegration;
