import { Grid } from "@material-ui/core";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactGA from "react-ga";
import DocumentTitle from "react-document-title";
import Utils from "../../../../../../Helper/Utils";
import useAxiosFetch from "../../../../../../hooks/useAxiosFetch";
import { RegistrationProcessState } from "../../../../../../types/ParticipantTypes";
import ErrorMessageContainer from "../../../../../Shared/ErrorMessageContainer/ErrorMessageContainer";
import DTEButton from "../../../../../Shared/UI/DTEButton/DTEButton";
import DTEHeader from "../../../../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../../../../Shared/UI/DTETypography/DTEContent/DTEContent";
import DTERouteLink from "../../../../../Shared/UI/DTERouteLink/DTERouteLink";
import CheckYourEmail from "../../../../../Shared/FormElements/CommonElements/CheckYourEmail";

interface CheckEmailFormProps {
  initialStateData: RegistrationProcessState;
  setLoading: (loading: boolean) => void;
  setLoadingText: (text: string) => void;
}

const CheckEmailForm = (props: CheckEmailFormProps) => {
  const { initialStateData, setLoadingText, setLoading } = props;
  const history = useHistory();

  const dob = new Date(
    parseInt(initialStateData.dobFormData.year, 10),
    parseInt(initialStateData.dobFormData.month, 10) - 1,
    parseInt(initialStateData.dobFormData.day, 10),
    12
  ).toISOString();

  const [{ response, loading, error }] = useAxiosFetch(
    {
      url: `${process.env.REACT_APP_BASE_API}/users/signup`,
      method: "POST",
      data: {
        firstname: initialStateData?.nameFormData?.firstName,
        lastname: initialStateData?.nameFormData?.lastName,
        email: initialStateData?.emailFormData?.emailAddress,
        password: initialStateData?.passwordFormData?.password,
        dateOfBirth: dob,
        consentRegistration: true,
      },
    },
    { useCache: false }
  );

  useEffect(() => {
    setLoadingText("Registering Account...");
    setLoading(loading || false);
  }, [setLoading, setLoadingText, loading]);

  useEffect(() => {
    if (Utils.ConvertResponseToDTEResponse(response)?.isSuccess) {
      ReactGA.pageview("/register/checkemail");
    } else {
      ReactGA.pageview("/register/failed");
    }
  }, [response]);

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={10} md={8}>
          {error && (
            <>
              <ErrorMessageContainer axiosError={error} />
              <Grid container spacing={4}>
                <Grid item xs={12} sm={10} md={10}>
                  <DTEButton
                    onClick={() => {
                      history.push("/");
                    }}
                  >
                    Go back
                  </DTEButton>
                </Grid>
              </Grid>
            </>
          )}
          {/* Successfully hit the end point and response is positive */}
          {Utils.ConvertResponseToDTEResponse(response)?.isSuccess && (
            <DocumentTitle title="Check your email - Volunteer Registration - Be Part of Research">
              <CheckYourEmail
                emailAddress={initialStateData?.emailFormData?.emailAddress}
              />
            </DocumentTitle>
          )}
          {/* Successfully hit the end point and response is negative */}
          {Utils.ConvertResponseToDTEResponse(response)?.errors && !loading && (
            <>
              {Utils.ConvertResponseToDTEResponse(response)?.errors.some(
                (e) => e?.customCode === "User_Not_In_Allow_List_Error"
              ) && (
                <DocumentTitle title="Unable to create account - Volunteer Registration - Be Part of Research">
                  <>
                    <DTEHeader as="h1" $variant="h2">
                      Unable to create account
                    </DTEHeader>
                    <DTEContent as="b" $marginBottom="medium">
                      Your data has not been stored.
                    </DTEContent>
                    <DTEContent>
                      The email address is not recognised by the service. If you
                      want to help test this new service, contact
                      bepartofresearch@nihr.ac.uk to sign up.
                    </DTEContent>
                    <DTERouteLink
                      external
                      to="https://bepartofresearch.nihr.ac.uk/"
                    >
                      Go to Be Part of Research homepage
                    </DTERouteLink>
                  </>
                </DocumentTitle>
              )}
              {Utils.ConvertResponseToDTEResponse(response)?.errors.some(
                (e) => e?.customCode === "SignUp_Error_Username_Exists"
              ) && (
                <DocumentTitle title="Unable to create account - Volunteer Registration - Be Part of Research">
                  <>
                    <DTEHeader as="h1" $variant="h2">
                      Unable to create account
                    </DTEHeader>
                    <DTEContent as="b" $marginBottom="medium">
                      Your data has not been stored.
                    </DTEContent>
                    <DTEContent>
                      The email address may already be registered or there may
                      have been a technical issue. You can try again or reset
                      password from the Sign in page.
                    </DTEContent>
                    <DTERouteLink to="/UserLogin">Sign in</DTERouteLink>
                  </>
                </DocumentTitle>
              )}
              {!Utils.ConvertResponseToDTEResponse(response)?.errors.some(
                (e) => e?.customCode === "User_Not_In_Allow_List_Error"
              ) &&
                !Utils.ConvertResponseToDTEResponse(response)?.errors.some(
                  (e) => e?.customCode === "SignUp_Error_Username_Exists"
                ) && (
                  <ErrorMessageContainer
                    DTEAxiosErrors={[
                      Utils.ConvertResponseToDTEResponse(response)?.errors,
                    ]}
                  />
                )}
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default CheckEmailForm;
