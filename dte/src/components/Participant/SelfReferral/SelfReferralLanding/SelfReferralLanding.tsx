import { useContext, useEffect } from "react";
import { Grid, Box } from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import {
  DTETimeline,
  DTETimelineItem,
  DTETimelineSeparator,
  DTETimelineConnector,
  DTETimelineContent,
  DTETimelineNumber,
} from "../../../Shared/UI/DTETimeline/DTETimeline";
import DTEHeader from "../../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../../Shared/UI/DTETypography/DTEContent/DTEContent";
import DTEHR from "../../../Shared/UI/DTEHR/DTEHR";
import StepWrapper from "../../../Shared/StepWrapper/StepWrapper";
import DTERouteLink from "../../../Shared/UI/DTERouteLink/DTERouteLink";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";
import Utils from "../../../../Helper/Utils";
import LoadingIndicator from "../../../Shared/LoadingIndicator/LoadingIndicator";
import ErrorMessageContainer from "../../../Shared/ErrorMessageContainer/ErrorMessageContainer";
import { AuthContext } from "../../../../context/AuthContext";
import { Role } from "../../../../types/AuthTypes";

interface SuitabilityProps {
  studyid: string;
}

const SelfReferralLanding = () => {
  const { studyid } = useParams<SuitabilityProps>();
  const { isAuthenticated, isAuthenticatedRole } = useContext(AuthContext);
  const history = useHistory();
  const [
    {
      response: studyInfoResponse,
      loading: studyInfoLoading,
      error: studyInfoError,
    },
  ] = useAxiosFetch(
    {
      url: `${process.env.REACT_APP_BASE_API}/studies/${studyid}/info`,
      method: "GET",
    },
    { useCache: false }
  );

  useEffect(() => {
    if (studyid) {
      localStorage.setItem("BPORStudyId", studyid);
    }
    if (isAuthenticated() && isAuthenticatedRole(Role.Participant)) {
      history.push(`/Participants/SelfReferral/Suitability/${studyid}`);
    }
  });

  return (
    <StepWrapper>
      {Utils.ConvertResponseToDTEResponse(studyInfoResponse)?.content
        ?.title && (
        <>
          <DTEHeader as="h1">
            Thanks for asking to be part of this study
          </DTEHeader>
          <DTEHeader as="h2" $variant="h4">
            {Utils.ConvertResponseToDTEResponse(studyInfoResponse)?.content
              ?.title ?? "Unknown Study"}
          </DTEHeader>
          <DTEContent as="b">
            If you&apos;re happy to proceed, you&apos;ll need to setup an
            account. This should take no longer than 10 minutes
          </DTEContent>
          <DTEHeader as="h2" $variant="h4">
            Create an account
          </DTEHeader>
          <Grid container>
            <Grid item xs={12} sm={10} md={8}>
              <DTETimeline>
                <DTETimelineItem>
                  <DTETimelineSeparator>
                    <DTETimelineNumber>1</DTETimelineNumber>
                    <DTETimelineConnector />
                  </DTETimelineSeparator>
                  <DTETimelineContent>
                    <DTEContent>
                      A simple registration process will capture your basic
                      information, including contact details.
                    </DTEContent>
                  </DTETimelineContent>
                </DTETimelineItem>
                <DTETimelineItem>
                  <DTETimelineSeparator>
                    <DTETimelineNumber>2</DTETimelineNumber>
                  </DTETimelineSeparator>
                  <DTETimelineContent>
                    <DTEContent>
                      Build your own account profile and answer a few questions
                      so we can get to know you. Your answers are strictly
                      confidential and will only be used by the study to help
                      decide if you can take part.
                    </DTEContent>
                  </DTETimelineContent>
                </DTETimelineItem>
              </DTETimeline>
              <DTEHR />
              <Box pt={2} pb={2}>
                <DTEContent as="b" $align="center">
                  Once you&apos;re registered, we&apos;ll be able to check if
                  this study is suitable for you.
                </DTEContent>
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={4}>
            <Grid item xs={12} sm={10} md={8}>
              <DTERouteLink to="/Participants/Register/Ready" $fullwidth>
                Register for Be Part of Research
              </DTERouteLink>
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={10} md={8}>
              <DTEContent $align="center">Already have an account?</DTEContent>
              <DTERouteLink
                to={`/Participants/SelfReferral/Suitability/${studyid}`}
                $fullwidth
                $outlined
              >
                Log in to an existing account
              </DTERouteLink>
            </Grid>
          </Grid>
        </>
      )}

      {studyInfoLoading && <LoadingIndicator text="Finding Study..." />}
      <ErrorMessageContainer
        axiosErrors={[studyInfoError]}
        DTEAxiosErrors={[
          Utils.ConvertResponseToDTEResponse(studyInfoResponse)?.errors,
        ]}
      />
    </StepWrapper>
  );
};

export default SelfReferralLanding;
