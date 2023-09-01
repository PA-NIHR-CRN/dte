import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoadingIndicator from "../../../components/Shared/LoadingIndicator/LoadingIndicator";

const NhsAppIntegration = () => {
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

  return <LoadingIndicator text="Loading..." />;
};

export default NhsAppIntegration;
