import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoadingIndicator from "../../../components/Shared/LoadingIndicator/LoadingIndicator";
import { ContentContext } from "../../../context/ContentContext";

const errorSsoLoginRequired = "sso_login_required";

function NhsAppIntegration() {
  const { content } = useContext(ContentContext);
  const { search } = useLocation();
  const assertedLoginIdentity = new URLSearchParams(search).get("assertedLoginIdentity");

  useEffect(() => {
    const error = new URLSearchParams(search).get("error");

    const redirectUri = process.env.REACT_APP_BASE_URL;
    const nhsBaseDomain = process.env.REACT_APP_NHS_LOGIN_URL;
    const clientId = process.env.REACT_APP_NHS_LOGIN_CLIENT_ID;
    const scope = process.env.REACT_APP_NHS_LOGIN_SCOPE;

    const params = {
      prompt: "none",
      client_id: clientId,
      // The scope configuration value is already URI encoded.
      // Decode first to prevent double encoding.
      scope: decodeURIComponent(scope),
      asserted_login_identity: assertedLoginIdentity,
      response_type: "code",
      state: "ssointegration",
      redirect_uri: `${redirectUri}/callback`,
    };

    if (error === errorSsoLoginRequired) {
      params.prompt = "login";
    }

    const url = new URL(`${nhsBaseDomain}/authorize`);
    url.search = new URLSearchParams(params);

    window.location.href = url.toString();
  }, [assertedLoginIdentity]);

  return <LoadingIndicator text={content["reusable-loading"]} />;
}

export default NhsAppIntegration;
