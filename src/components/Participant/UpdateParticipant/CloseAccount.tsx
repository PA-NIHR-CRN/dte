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
import DTERouteLink from "../../Shared/UI/DTERouteLink/DTERouteLink";
import DTEButton from "../../Shared/UI/DTEButton/DTEButton";
import Container from "../../Shared/Container/Container";
import DTELinkButton from "../../Shared/UI/DTELinkButton/DTELinkButton";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import Utils from "../../../Helper/Utils";
import LoadingIndicator from "../../Shared/LoadingIndicator/LoadingIndicator";
import ErrorMessageContainer from "../../Shared/ErrorMessageContainer/ErrorMessageContainer";

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

const CloseAccount = () => {
  const history = useHistory();
  const { logOutToken, isNhsLinkedAccount } = useContext(AuthContext);
  const [requireConf, setRequireConf] = useState(true);
  const theme = useTheme();
  const headerVariant = useMediaQuery(theme.breakpoints.down("xs"))
    ? "h2"
    : "h1";

  const [
    {
      response: closeUserAccountResponse,
      loading: closeUserAccountLoading,
      error: closeUserAccountError,
    },
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
    if (
      Utils.ConvertResponseToDTEResponse(closeUserAccountResponse)?.isSuccess
    ) {
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
    <DocumentTitle title="Close your account - Volunteer Account - Be Part of Research">
      <Container>
        <div role="main" id="main">
          <DTEBackLink href="/" linkText="Back" />
          <DTEHeader as="h1" $variant={headerVariant}>
            Close your account
          </DTEHeader>
          {isNhsLinkedAccount ? (
            <DTEContent $marginBottom="medium">
              If you have changed your mind and wish to withdraw your consent to
              be contacted, this will have no effect on your NHS login account.
            </DTEContent>
          ) : (
            <DTEContent $marginBottom="medium">
              {" "}
              If you have changed your mind and wish to close your account, you
              are withdrawing your consent for Be Part of Research to process
              and store your personal information.
            </DTEContent>
          )}
          <DTEContent $marginBottom="medium">
            Be Part of Research will no longer contact you about areas of
            research you have expressed an interest in.
          </DTEContent>
          <DTEContent $marginBottom="medium">
            When closing your account Be Part of Research will keep some
            anonymous data to help improve the service. To find out more please
            read the{" "}
            <DTERouteLink
              external
              target="_blank"
              renderStyle="standard"
              to="https://bepartofresearch.nihr.ac.uk/site-policies/privacy-policy/"
            >
              Be Part of Research Privacy Policy
            </DTERouteLink>
            .
          </DTEContent>
          <DTEContent $marginBottom="medium">
            To take part in the future you can register again.
          </DTEContent>
          {requireConf ? (
            <DTEButton onClick={() => setRequireConf(false)}>
              Close your account
            </DTEButton>
          ) : (
            <>
              {closeUserAccountLoading && (
                <LoadingIndicator text="Closing your account..." />
              )}
              {(closeUserAccountError ||
                Utils.ConvertResponseToDTEResponse(closeUserAccountResponse)
                  ?.errors) && (
                <ErrorMessageContainer
                  axiosErrors={[closeUserAccountError]}
                  DTEAxiosErrors={[
                    Utils.ConvertResponseToDTEResponse(closeUserAccountResponse)
                      ?.errors,
                  ]}
                />
              )}

              <StyledErrorSummary>
                <DTEContent as="b" $marginBottom="small">
                  Confirm if you want to close your account
                </DTEContent>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>
                    <DTEButton
                      $danger
                      onClick={() => handleConfirmCloseAccount()}
                    >
                      Confirm
                    </DTEButton>
                  </Grid>
                  <Grid item>
                    <DTELinkButton
                      type="button"
                      padded
                      onClick={() => setRequireConf(true)}
                    >
                      Cancel
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
};

export default CloseAccount;
