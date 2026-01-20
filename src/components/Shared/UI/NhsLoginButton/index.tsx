import styled from "styled-components";

const ButtonWrapper = styled.div`
  margin-top: 1rem;
  margin-right: 2em;
`;

interface NhsLoginButtonProps {
  buttonText: string;
}
function NhsLoginButton({ buttonText }: NhsLoginButtonProps) {
  return (
    <>
      <ButtonWrapper>
        <a href={`${process.env.REACT_APP_BASE_API}/auth/nhs/start`} className="nhslogin-button">
          {buttonText}
        </a>
      </ButtonWrapper>
    </>
  );
}

export default NhsLoginButton;
