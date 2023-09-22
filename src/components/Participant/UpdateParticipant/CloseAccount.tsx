import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import styled from "styled-components";
import DocumentTitle from "react-document-title";
import { useTheme } from "@material-ui/core/styles";
import { ErrorSummary } from "nhsuk-react-components";
import { Grid } from "@material-ui/core";
import ReactGA from "react-ga";
import { AuthContext } from "../../../context/AuthContext";
import DTEHeader from "../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEBackLink from "../../Shared/UI/DTEBackLink/DTEBackLink";
import DTEContent from "../../Shared/UI/DTETypography/DTEContent/DTEContent";
import DTEButton from "../../Shared/UI/DTEButton/DTEButton";
import Container from "../../Shared/Container/Container";
import DTELinkButton from "../../Shared/UI/DTELinkButton/DTELinkButton";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import Utils from "../../../Helper/Utils";
import LoadingIndicator from "../../Shared/LoadingIndicator/LoadingIndicator";
import ErrorMessageContainer from "../../Shared/ErrorMessageContainer/ErrorMessageContainer";
import { ContentContext } from "../../../context/ContentContext";

const StyledErrorSummary = styled(ErrorSummary)`
  margin-bottom: 1rem;
  padding: 16px;
  border-color: ${(Props) => Props.theme.NIHR.Red};
  p {
    font-size: 18px;
    color: ${(Props) => Props.theme.NIHR.Red};
    font-weight: bolder;
    margin: 0;
    button {
      padding: 0;
    }
  }
`;

function CloseAccount() {
  const { content } = useContext(ContentContext);
  const history = useHistory();
  const { logOutToken, isNhsLinkedAccount } = useContext(AuthContext);
  const [requireConf, setRequireConf] = useState(true);
  const theme = useTheme();
  const headerVariant = useMediaQuery(theme.breakpoints.down("xs")) ? "h2" : "h1";

  const [
    { response: closeUserAccountResponse, loading: closeUserAccountLoading, error: closeUserAccountError },
    closeUserAccount,
  ] = useAxiosFetch(
    {
      method: "DELETE",
    },
    { useCache: false, manual: true }
  );

  const handleConfirmCloseAccount = async () => {
    await closeUserAccount({
      url: `${process.env.REACT_APP_BASE_API}/users/deleteparticipantaccount`,
      method: "DELETE",
    }).catch(() => {
      // console.log(err.message);
    });
  };

  useEffect(() => {
    if (Utils.ConvertResponseToDTEResponse(closeUserAccountResponse)?.isSuccess) {
      logOutToken();
      history.push("/Participants/accountclosed");
    }
  }, [closeUserAccountResponse]);

  useEffect(() => {
    if (!closeUserAccountResponse) {
      if (requireConf) {
        ReactGA.pageview("/MyAccount/CloseAccount");
      } else {
        ReactGA.pageview("/MyAccount/CloseAccountConfirmation");
      }
    }
  }, [requireConf]);

  return (
    <DocumentTitle title={content["closeaccount-document-title"]}>
      <Container>
        <div role="main" id="main">
          <DTEBackLink href="/" linkText={content["reusable-back-link"]} />
          <DTEHeader as="h1" $variant={headerVariant}>
            {content["reusable-close-your-account"]}
          </DTEHeader>
          {isNhsLinkedAccount ? content["closeaccount-page-nhs"] : content["closeaccount-page"]}

          {requireConf ? (
            <DTEButton onClick={() => setRequireConf(false)}>{content["reusable-close-your-account"]}</DTEButton>
          ) : (
            <>
              {closeUserAccountLoading && <LoadingIndicator text={content["closeaccount-loading-close"]} />}
              {(closeUserAccountError || Utils.ConvertResponseToDTEResponse(closeUserAccountResponse)?.errors) && (
                <ErrorMessageContainer
                  axiosErrors={[closeUserAccountError]}
                  DTEAxiosErrors={[Utils.ConvertResponseToDTEResponse(closeUserAccountResponse)?.errors]}
                />
              )}

              <StyledErrorSummary>
                <DTEContent as="b" $marginBottom="small">
                  {content["closeaccount-button-close-confirm"]}
                </DTEContent>
                <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                  <Grid item>
                    <DTEButton $danger onClick={() => handleConfirmCloseAccount()}>
                      {content["reusable-confirm"]}
                    </DTEButton>
                  </Grid>
                  <Grid item>
                    <DTELinkButton type="button" padded onClick={() => setRequireConf(true)}>
                      {content["reusable-cancel"]}
                    </DTELinkButton>
                  </Grid>
                </Grid>
              </StyledErrorSummary>
            </>
          )}
        </div>
      </Container>
    </DocumentTitle>
  );
}

export default CloseAccount;
