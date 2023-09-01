import styled from "styled-components";
import React, { useEffect, useState } from "react";
import DTEContent from "../DTETypography/DTEContent/DTEContent";

const ButtonWrapper = styled.div`
  margin-top: 1rem;
`;
const NhsLoginButton = () => {
  const [nhsLoginUrl, setNhsLoginUrl] = useState("");

  useEffect(() => {
    const clientId = process.env.REACT_APP_NHS_LOGIN_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_BASE_URL;
    const scope = process.env.REACT_APP_NHS_LOGIN_SCOPE;
    const responseType = process.env.REACT_APP_NHS_LOGIN_RESPONSE_TYPE;
    const nhsBaseDomain = process.env.REACT_APP_NHS_LOGIN_URL;
    setNhsLoginUrl(
      `${nhsBaseDomain}/authorize?client_id=${clientId}&scope=${scope}&response_type=${responseType}&redirect_uri=${redirectUri}/callback`,
    );
  }, []);

  return (
    <>
      <div className="govuk-details__text">
        <DTEContent>
          You can only use NHS login if you live in England or Wales. If you use
          NHS login you will need to use this option on each occasion to access
          your account and update your details.
        </DTEContent>
      </div>
      <ButtonWrapper>
        <a href={nhsLoginUrl} className="nhslogin-button" type="submit">
          Continue to NHS login
        </a>
      </ButtonWrapper>
    </>
  );
};

export default NhsLoginButton;
