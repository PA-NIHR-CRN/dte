import React from "react";
import { Grid, Box } from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme as muiUseTheme } from "@material-ui/core/styles";
import { useTheme } from "styled-components";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import LoadingIndicator from "../../Shared/LoadingIndicator/LoadingIndicator";
import ErrorMessageContainer from "../../Shared/ErrorMessageContainer/ErrorMessageContainer";
import DTEButton from "../../Shared/UI/DTEButton/DTEButton";
import DTEContent from "../../Shared/UI/DTETypography/DTEContent/DTEContent";
import Utils from "../../../Helper/Utils";
import DTEHeader from "../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEHR from "../../Shared/UI/DTEHR/DTEHR";
import DTERouteLink from "../../Shared/UI/DTERouteLink/DTERouteLink";
import {
  DTETimeline,
  DTETimelineItem,
  DTETimelineSeparator,
  DTETimelineConnector,
  DTETimelineContent,
  DTETimelineNumber,
} from "../../Shared/UI/DTETimeline/DTETimeline";

import { styledComponentsTheme } from "../../../theme";

interface SuitabilityProps {
  studyid: string;
}

function Suitability() {
  const theme = useTheme() as typeof styledComponentsTheme;
  const defaultcolour = theme.NIHR.Blue;
  const MUItheme = muiUseTheme();
  const history = useHistory();
  const isMobile = useMediaQuery(MUItheme.breakpoints.down("sm"));
  const { studyid } = useParams<SuitabilityProps>();

  const [{ response, loading, error }] = useAxiosFetch(
    {
      url: `${process.env.REACT_APP_BASE_API}/participants/suitability/${studyid}`,
      method: "GET",
    },
    { useCache: false }
  );
  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        {/* <TopLeftSplotch /> */}

        <Grid item xs={12} sm={8}>
          <Box
            pt={isMobile ? 15 : 15}
            pb={isMobile ? 15 : 15}
            ml={isMobile ? 5 : 0}
            mr={isMobile ? 5 : 0}
          >
            {/* <DTEPaper> */}
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={12}>
                {Utils.ConvertResponseToDTEResponse(response)?.content
                  ?.isSuitable && (
                  <>
                    <DTEHeader as="h2">
                      You can take part in this study
                    </DTEHeader>
                    <Grid container direction="row" alignItems="center">
                      <Grid item>
                        <h3>
                          {Utils.ConvertResponseToDTEResponse(response)?.content
                            ?.studyTitle ?? "Unknown Study"}
                        </h3>
                        <DTEContent>
                          <b>
                            Based on the information held in your account
                            profile, you may be able to take part in this study.
                          </b>
                        </DTEContent>
                        <h3>What do I need to do now?</h3>
                        <DTETimeline>
                          <DTETimelineItem>
                            <DTETimelineSeparator>
                              <DTETimelineNumber>1</DTETimelineNumber>
                              <DTETimelineConnector />
                            </DTETimelineSeparator>
                            <DTETimelineContent>
                              <DTEContent>
                                Read the study information.
                                <br /> Make sure that the study is right for
                                you, see what&apos;s involved, and check how
                                much of your time it needs.
                              </DTEContent>
                            </DTETimelineContent>
                          </DTETimelineItem>
                          <DTETimelineItem>
                            <DTETimelineSeparator>
                              <DTETimelineNumber>2</DTETimelineNumber>
                            </DTETimelineSeparator>
                            <DTETimelineContent>
                              <DTEContent>
                                Choose your study location. <br />
                                Hopefully you&apos;ll be able to find one that
                                works for you.
                              </DTEContent>
                            </DTETimelineContent>
                          </DTETimelineItem>
                        </DTETimeline>
                        <DTEHR />
                      </Grid>
                    </Grid>
                    <Box pt={2}>
                      <DTEContent as="b">
                        Some studies may ask you to complete a questionaire to
                        see if its&apos;s appropriate for you to be screened for
                        the study
                      </DTEContent>
                    </Box>
                    <DTEContent as="b">
                      Once you&apos;ve agreed and submitted your response, the
                      study team will be in touch by email within a week.
                    </DTEContent>
                    <Box pt={2}>
                      <DTEButton
                        onClick={() => {
                          history.push(
                            `/Participants/SelfReferral/Information/${studyid}`
                          );
                        }}
                      >
                        I&apos;m ready let&apos;s go
                      </DTEButton>
                    </Box>
                  </>
                )}
                {Utils.ConvertResponseToDTEResponse(response)?.content
                  ?.isSuitable === false && (
                  // Utils.ConvertResponseToDTEResponse(studyInfoResponse)
                  //   ?.isSuccess && (
                  <>
                    <DTEHeader as="h2">
                      Unfortunately, this study is not suitable for you
                    </DTEHeader>
                    <DTEHeader as="h3">
                      {Utils.ConvertResponseToDTEResponse(response)?.content
                        ?.studyTitle ?? "Unknown Study"}
                    </DTEHeader>
                    <DTEHeader as="h4">
                      Based on the information held in your profile, this study
                      is not suitable for you because of the age range, sex,
                      gender or ethnicity of the volunteers required.
                    </DTEHeader>
                    {Utils.ConvertResponseToDTEResponse(
                      response
                    )?.content?.reasons?.map(
                      (reason: string, index: number) => (
                        <DTEContent>
                          {index}.{reason}
                        </DTEContent>
                      )
                    )}
                    <DTEHeader as="h2" color={defaultcolour}>
                      What can I do next?
                    </DTEHeader>
                    <DTEHR />
                    <DTEContent>
                      Thank you for asking to take part. We would encourage you
                      to search again to see if there&apos;s another study
                      that&apos;s more suitable for you.
                    </DTEContent>
                    <DTERouteLink
                      to="https://bepartofresearch.nihr.ac.uk/"
                      external
                    >
                      Search for a suitable study
                    </DTERouteLink>
                  </>
                )}
                {loading && <LoadingIndicator text="Checking Suitability..." />}
                <ErrorMessageContainer
                  axiosErrors={[error]}
                  DTEAxiosErrors={[
                    Utils.ConvertResponseToDTEResponse(response)?.errors,
                  ]}
                />
              </Grid>
            </Grid>
            {/* </DTEPaper> */}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Suitability;
