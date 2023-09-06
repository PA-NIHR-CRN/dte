import { ReactNode, useContext, useEffect } from "react";
import ReactGA from "react-ga";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useLocation, useHistory } from "react-router-dom";
import DocumentTitle from "react-document-title";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import { AuthContext } from "../../../context/AuthContext";
import StepWrapper from "../StepWrapper/StepWrapper";
import DTEContent from "../UI/DTETypography/DTEContent/DTEContent";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import DTERouteLink from "../UI/DTERouteLink/DTERouteLink";
import DTEHeader from "../UI/DTETypography/DTEHeader/DTEHeader";
import ErrorMessageContainer from "../ErrorMessageContainer/ErrorMessageContainer";
import Utils from "../../../Helper/Utils";
import { DTEAxiosError } from "../../../types/AuthTypes";
import ResendEmail from "../FormElements/CommonElements/ResendEmail";
import UserLogin from "./UserLogin";
import { ContentContext } from "../../../context/ContentContext";

// Component for the Redirect from IDG login
function Verify() {
  const { content } = useContext(ContentContext);
  const { logOutToken } = useContext(AuthContext);
  const history = useHistory();
  const { search } = useLocation();
  const theme = useTheme();
  const headerVariant = useMediaQuery(theme.breakpoints.down("xs")) ? "h2" : "h1";

  const code = new URLSearchParams(search).get("code");
  const userId = new URLSearchParams(search).get("userId");
  if (!code || !userId) {
    history.push("/Participants/Register/Continue/Questions");
  }
  const confirmurl = `${process.env.REACT_APP_BASE_API}/users/confirmsignup`;
  const [{ response: confirmationResponse, loading: confirmationLoading, error: confirmationError }] = useAxiosFetch(
    {
      url: confirmurl,
      method: "POST",
      data: {
        code,
        userId,
      },
    },
    {
      useCache: false,
    }
  );

  useEffect(() => {
    if (Utils.ConvertResponseToDTEResponse(confirmationResponse)?.isSuccess) {
      ReactGA.pageview("/verify/success");
    } else {
      ReactGA.pageview("/verify/failure");
    }
  }, [confirmationResponse]);

  useEffect(() => {
    if (code) {
      logOutToken();
    }
  });

  const convertErrorsToResponse = (errors: DTEAxiosError[] | undefined) => {
    let message: ReactNode = <></>;
    if (errors) {
      errors.forEach((axiosError: DTEAxiosError) => {
        switch (axiosError.customCode) {
          case "Confirm_SignUp_Error_Expired_Code":
            message = (
              <>
                <DTEContent>{content["verify-email-error-expired"]}</DTEContent>
                <ResendEmail userId={userId || ""} />
              </>
            );
            break;
          case "Confirm_SignUp_Error_User_Already_Confirmed":
            message = (
              <>
                <DTEContent>{content["verify-email-error-already-used"]}</DTEContent>
                <DTERouteLink to="/UserLogin">{content["reusable-button-signin"]}</DTERouteLink>
              </>
            );
            break;
          default:
            message = (
              <>
                <DTEContent>{content["verify-email-error-technical"]}</DTEContent>
                <DTERouteLink to="/UserLogin">{content["reusable-button-signin"]}</DTERouteLink>
              </>
            );
        }
      });
    }
    return message;
  };

  return (
    <>
      {confirmationLoading && <LoadingIndicator text="Verifying Account..." />}
      <StepWrapper>
        {Utils.ConvertResponseToDTEResponse(confirmationResponse)?.isSuccess && (
          <DocumentTitle title={content["verify-email-success-document-title"]}>
            <>
              <DTEHeader as="h1" $variant={headerVariant}>
                {content["verify-email-success-header"]}
              </DTEHeader>
              {content["verify-email-continue-registration"]}
              <UserLogin nested />
            </>
          </DocumentTitle>
        )}
        {!Utils.ConvertResponseToDTEResponse(confirmationResponse)?.isSuccess &&
          Utils.ConvertResponseToDTEResponse(confirmationResponse)?.errors && (
            <DocumentTitle title={content["verify-email-failure-document-title"]}>
              <>
                <DTEHeader as="h1" $variant={headerVariant}>
                  {content["verify-email-failure-header"]}
                </DTEHeader>
                {convertErrorsToResponse(Utils.ConvertResponseToDTEResponse(confirmationResponse)?.errors)}
              </>
            </DocumentTitle>
          )}
        {confirmationError && <ErrorMessageContainer axiosError={confirmationError} />}
      </StepWrapper>
    </>
  );
}

export default Verify;
