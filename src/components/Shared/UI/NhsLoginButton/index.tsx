import styled from "styled-components";
import React, { useEffect, useState } from "react";

const ButtonWrapper = styled.div`
  margin-top: 1rem;
  margin-right: 2em;
`;

interface NhsLoginButtonProps {
  buttonText: string;
}
function NhsLoginButton({ buttonText }: NhsLoginButtonProps) {
  const [nhsLoginUrl, setNhsLoginUrl] = useState("");

  useEffect(() => {
    const clientId = process.env.REACT_APP_NHS_LOGIN_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_BASE_URL;
    const scope = process.env.REACT_APP_NHS_LOGIN_SCOPE;
    const responseType = process.env.REACT_APP_NHS_LOGIN_RESPONSE_TYPE;
    const nhsBaseDomain = process.env.REACT_APP_NHS_LOGIN_URL;
    setNhsLoginUrl(
      `${nhsBaseDomain}/authorize?client_id=${clientId}&scope=${scope}&response_type=${responseType}&redirect_uri=${redirectUri}/callback`
    );
  }, []);

  return (
    <>
      <ButtonWrapper>
        <a href={nhsLoginUrl} className="nhslogin-button" type="submit">
          {buttonText}
        </a>
      </ButtonWrapper>
    </>
  );
}

export default NhsLoginButton;
