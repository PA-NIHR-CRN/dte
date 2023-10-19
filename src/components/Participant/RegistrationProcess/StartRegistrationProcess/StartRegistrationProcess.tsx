import DocumentTitle from "react-document-title";
import StepWrapper from "../../../Shared/StepWrapper/StepWrapper";
import { ContentContext } from "../../../../context/ContentContext";
import { useContext } from "react";
import { Stack } from "@mui/material";
import DTEButton from "../../../Shared/UI/DTEButton/DTEButton";
import { useHistory } from "react-router-dom";
import NhsLoginButton from "../../../Shared/UI/NhsLoginButton";

function StartRegistrationProcess() {
  const { content } = useContext(ContentContext);
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <DocumentTitle title={content["register-page-document-title"]}>
      <StepWrapper>
        {content["register-page"]}
        <Stack spacing={2} direction="row">
          <NhsLoginButton buttonText="Continue to NHS login" />
          <a href="https://volunteer.bepartofresearch.nihr.ac.uk/Participants/Register/Questions">
            <DTEButton $padded>Register with email address</DTEButton>
          </a>
        </Stack>
        <br></br>
        <span style={{ margin: "10px 0" }}>
          If you already have an account, you can{" "}
          <a href="https://volunteer.bepartofresearch.nihr.ac.uk/Participants/Options">sign in</a>.
        </span>
        <br></br>
        <br></br>
        <a href="#" onClick={handleGoBack}>
          Back
        </a>
      </StepWrapper>
    </DocumentTitle>
  );
}

export default StartRegistrationProcess;
