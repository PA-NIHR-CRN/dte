import DocumentTitle from "react-document-title";
import StepWrapper from "../../../Shared/StepWrapper/StepWrapper";
import { ContentContext } from "../../../../context/ContentContext";
import { useContext } from "react";
import { Grid } from "@material-ui/core";
import DTEBackLink from "../../../Shared/UI/DTEBackLink/DTEBackLink";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const StyledGridElementLeft = styled(Grid)`
  padding-left: 1em;
  && {
    text-align: left;
  }
  padding-bottom: -1em;
  margin-bottom: 0;
`;

function StartRegistrationProcess() {
  const { content } = useContext(ContentContext);
  const history = useHistory();

  return (
    <DocumentTitle title={content["register-page-document-title"]}>
      <>
        <Grid container alignItems="center" justifyContent="flex-start">
          <Grid item sm={2} md={1} />
          <StyledGridElementLeft item xs={12} sm={10} md={11}>
            <DTEBackLink
              linkText={content["reusable-back-link"]}
              onClick={() => history.goBack()}
              ariaLabel={content["reusable-aria-go-back"]}
            />
          </StyledGridElementLeft>
        </Grid>
        <StepWrapper>{content["register-page"]}</StepWrapper>
      </>
    </DocumentTitle>
  );
}

export default StartRegistrationProcess;
