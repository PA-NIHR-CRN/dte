import { useContext } from "react";
import { Grid } from "@material-ui/core";
import DTEHeader from "../../../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../../../Shared/UI/DTETypography/DTEContent/DTEContent";
import { ContinueSelfReferralData } from "../../../../../types/ParticipantTypes";
import { AuthContext } from "../../../../../context/AuthContext";
import useAxiosFetch from "../../../../../hooks/useAxiosFetch";
import LoadingIndicator from "../../../../Shared/LoadingIndicator/LoadingIndicator";
import ErrorMessageContainer from "../../../../Shared/ErrorMessageContainer/ErrorMessageContainer";
import DTERouteLink from "../../../../Shared/UI/DTERouteLink/DTERouteLink";

interface Props {
  studyId: string;
  studyTitle: string;
  data: ContinueSelfReferralData;
  questionnaireLink: string;
}

const ThanksForApplying = (props: Props) => {
  const { studyId, studyTitle, data, questionnaireLink } = props;
  const { authenticatedUserId } = useContext(AuthContext);

  const [{ response, loading, error }] = useAxiosFetch(
    {
      url: `${process.env.REACT_APP_BASE_API}/participants/participantregistrations`,
      method: "POST",
      data: {
        studyId: parseInt(studyId, 10),
        siteId: data.selectedSiteData.identifier,
        participantId: authenticatedUserId,
      },
    },
    { useCache: false }
  );

  return (
    <>
      {loading && <LoadingIndicator text="Submitting interest..." />}
      {error?.isAxiosError && (
        <>
          {error?.response?.status === 400 ? (
            <ErrorMessageContainer>
              {error?.response?.data?.Message}
            </ErrorMessageContainer>
          ) : (
            <ErrorMessageContainer>{error?.message}</ErrorMessageContainer>
          )}
        </>
      )}
      {!loading && !error && response?.status === 200 && (
        <>
          <Grid
            container
            spacing={0}
            direction="column"
            // alignItems="center"
            // justifyContent="center"
          >
            <Grid item xs={12} sm={10} md={8} lg={7} xl={6}>
              <DTEHeader as="h1">Thank you for applying to the study</DTEHeader>
              <DTEHeader as="h2" $variant="h4">
                {studyTitle}
              </DTEHeader>
              <DTEContent>
                The site team at {data.selectedSiteData.name} are asking that
                you complete a short study questionnaire in order to ensure they
                have all the information needed prior to the study starting.
              </DTEContent>
            </Grid>
            <Grid item>
              <DTERouteLink to={questionnaireLink} target="_blank" external>
                Complete the study questionnaire
              </DTERouteLink>
            </Grid>
          </Grid>
          <br />
          <DTEHeader as="h2" $variant="h4">
            What happens next?
          </DTEHeader>
          <DTEContent>
            You&apos;ll recieve an email with details of what to expect and
            details of what you need to do moving forward.
          </DTEContent>
          <DTEContent>
            This infomation will also be found in your account.
          </DTEContent>
        </>
      )}
    </>
  );
};

export default ThanksForApplying;
