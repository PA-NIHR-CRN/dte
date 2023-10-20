import DocumentTitle from "react-document-title";
import StepWrapper from "../../../Shared/StepWrapper/StepWrapper";
import { ContentContext } from "../../../../context/ContentContext";
import { useContext } from "react";
import DTEButton from "../../../Shared/UI/DTEButton/DTEButton";
import { useHistory } from "react-router-dom";
import NhsLoginButton from "../../../Shared/UI/NhsLoginButton";
import DTEContent from "../../../Shared/UI/DTETypography/DTEContent/DTEContent";
import DTELinkButton from "../../../Shared/UI/DTELinkButton/DTELinkButton";

function StartRegistrationProcess() {
  const { content } = useContext(ContentContext);
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <DocumentTitle title={content["register-page-document-title"]}>
      <StepWrapper>
        <a href="#" onClick={handleGoBack}>
          {"< "} Back
        </a>
        {content["register-page"]}
        <div style={{ display: "flex", gap: "2rem", alignItems: "center", justifyContent: "flex-start" }}>
          <div style={{ marginLeft: "5px" }}>
            <NhsLoginButton buttonText="Continue to NHS login" />
          </div>
          <div style={{ marginTop: "39.75px" }}>
            <DTEButton $outlined onClick={() => history.push("/Participants/Register/Questions")}>
              Register with email address
            </DTEButton>
          </div>
        </div>
        <br></br>
        <DTEContent>
          If you already have an account, you can{" "}
          <DTELinkButton onClick={() => history.push("/Participants/Options")}>sign in</DTELinkButton>
        </DTEContent>
        <br></br>
        <br></br>
      </StepWrapper>
    </DocumentTitle>
  );
}

export default StartRegistrationProcess;
