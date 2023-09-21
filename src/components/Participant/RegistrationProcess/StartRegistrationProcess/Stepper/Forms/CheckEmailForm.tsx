import { Grid } from "@material-ui/core";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactGA from "react-ga";
import DocumentTitle from "react-document-title";
import Utils from "../../../../../../Helper/Utils";
import useAxiosFetch from "../../../../../../hooks/useAxiosFetch";
import { RegistrationProcessState } from "../../../../../../types/ParticipantTypes";
import ErrorMessageContainer from "../../../../../Shared/ErrorMessageContainer/ErrorMessageContainer";
import DTEButton from "../../../../../Shared/UI/DTEButton/DTEButton";
import DTEHeader from "../../../../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import CheckYourEmail from "../../../../../Shared/FormElements/CommonElements/CheckYourEmail";
import { ContentContext } from "../../../../../../context/ContentContext";
import Cookies from "js-cookie";

interface CheckEmailFormProps {
  initialStateData: RegistrationProcessState;
  setLoading: (loading: boolean) => void;
  setLoadingText: (text: string) => void;
}

function CheckEmailForm(props: CheckEmailFormProps) {
  const { content } = useContext(ContentContext);
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
        selectedLocale: Cookies.get("selectedLanguage") || "en-GB",
      },
    },
    { useCache: false }
  );

  useEffect(() => {
    setLoadingText(content["reusable-loading-registering"]);
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
                  {content["reusable-go-back"]}
                </DTEButton>
              </Grid>
            </Grid>
          </>
        )}
        {/* Successfully hit the end point and response is positive */}
        {Utils.ConvertResponseToDTEResponse(response)?.isSuccess && (
          <DocumentTitle title={content["register-check-email-document-title"]}>
            <CheckYourEmail emailAddress={initialStateData?.emailFormData?.emailAddress} />
          </DocumentTitle>
        )}
        {/* Successfully hit the end point and response is negative */}
        {Utils.ConvertResponseToDTEResponse(response)?.errors && !loading && (
          <>
            {Utils.ConvertResponseToDTEResponse(response)?.errors.some(
              (e) => e?.customCode === "SignUp_Error_Username_Exists"
            ) && (
              <DocumentTitle title={content["register-check-email-fail-document-title"]}>
                <>
                  <DTEHeader as="h1" $variant="h2">
                    {content["register-check-email-fail-header"]}
                  </DTEHeader>
                  {content["register-check-email-fail-body"]}
                </>
              </DocumentTitle>
            )}
            {!Utils.ConvertResponseToDTEResponse(response)?.errors.some(
              (e) => e?.customCode === "SignUp_Error_Username_Exists"
            ) && <ErrorMessageContainer DTEAxiosErrors={[Utils.ConvertResponseToDTEResponse(response)?.errors]} />}
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default CheckEmailForm;
