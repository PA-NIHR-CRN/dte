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

// Component for the Redirect from IDG login
function Verify() {
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
                <DTEContent>This verification link has expired. We can send you the email again.</DTEContent>
                <ResendEmail userId={userId || ""} />
              </>
            );
            break;
          case "Confirm_SignUp_Error_User_Already_Confirmed":
            message = (
              <>
                <DTEContent>
                  This verification link has already been used. Please sign in to continue registration.
                </DTEContent>
                <DTERouteLink to="/UserLogin">Sign in</DTERouteLink>
              </>
            );
            break;
          default:
            message = (
              <>
                <DTEContent>
                  There may have been a technical issue. You can try to sign in to continue your registration.
                </DTEContent>
                <DTERouteLink to="/UserLogin">Sign in</DTERouteLink>
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
          <DocumentTitle title="Your email address has been verified - Volunteer Registration - Be Part of Research">
            <>
              <DTEHeader as="h1" $variant={headerVariant}>
                Your email address has been verified
              </DTEHeader>
              <DTEContent>Please sign in to continue registration.</DTEContent>
              <UserLogin nested />
            </>
          </DocumentTitle>
        )}
        {!Utils.ConvertResponseToDTEResponse(confirmationResponse)?.isSuccess &&
          Utils.ConvertResponseToDTEResponse(confirmationResponse)?.errors && (
            <DocumentTitle title="Unable to verify your email address - Volunteer Registration - Be Part of Research">
              <>
                <DTEHeader as="h1" $variant={headerVariant}>
                  Unable to verify your email address
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
