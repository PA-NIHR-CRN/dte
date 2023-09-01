import styled from "styled-components";
import React, { useEffect, useState } from "react";
import DTEContent from "../DTETypography/DTEContent/DTEContent";

const ButtonWrapper = styled.div`
  margin-top: 1rem;
`;

interface NhsLoginButtonProps {
  helperText?: string;
  buttonText: string;
}
function NhsLoginButton({ helperText, buttonText }: NhsLoginButtonProps) {
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
      <div className="govuk-details__text">
        <DTEContent>{helperText}</DTEContent>
      </div>
      <ButtonWrapper>
        <a href={nhsLoginUrl} className="nhslogin-button" type="submit">
          {buttonText}
        </a>
      </ButtonWrapper>
    </>
  );
}

export default NhsLoginButton;
