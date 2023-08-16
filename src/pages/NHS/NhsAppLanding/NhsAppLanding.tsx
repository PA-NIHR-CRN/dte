import styled from "styled-components";
import { useHistory } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import DTEContent from "../../../components/Shared/UI/DTETypography/DTEContent/DTEContent";
import DTEHeader from "../../../components/Shared/UI/DTETypography/DTEHeader/DTEHeader";
import StepWrapper from "../../../components/Shared/StepWrapper/StepWrapper";
import DTEButton from "../../../components/Shared/UI/DTEButton/DTEButton";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import Utils from "../../../Helper/Utils";
import { AuthContext } from "../../../context/AuthContext";
import LoadingIndicator from "../../../components/Shared/LoadingIndicator/LoadingIndicator";
import { ContentContext } from "../../../context/ContentContext";

const ButtonWrapper = styled.div`
  margin: 1rem 0;
`;

function NhsAppLanding() {
  const { content } = useContext(ContentContext);
  const history = useHistory();
  const { isInNHSApp } = useContext(AuthContext);
  const [completedDemographics, setCompletedDemographics] = useState(false);
  const getDemographicsURL = `${process.env.REACT_APP_BASE_API}/participants/demographics`;
  const [{ response, loading, error }] = useAxiosFetch(
    {
      url: getDemographicsURL,
      method: "GET",
    },
    {
      manual: false,
      useCache: false,
    },
  );

  useEffect(() => {
    if (response) {
      const dteResponse = Utils.ConvertResponseToDTEResponse(response);
      if (dteResponse?.isSuccess) {
        const hasDemographics = dteResponse?.content.hasDemographics;
        if (hasDemographics && !isInNHSApp) {
          history.push("/");
        }
        setCompletedDemographics(hasDemographics);
      }
    }
  }, [response, error, loading]);

  return (
    <>
      {isInNHSApp && (
        <div className="nhs-app-provider-banner">
          <div className="nhsuk-width-container">
            {content["reusable-nhs-app-provider-banner"]}
          </div>
        </div>
      )}

      <StepWrapper>
        {loading && <LoadingIndicator text={content["reusable-loading"]} />}
        {!loading && !completedDemographics && (
          <>
            <DTEHeader as="h1">Be Part of Research</DTEHeader>
            <DTEContent>
              Be Part of Research helps you find and join a range of health and
              care research.
            </DTEContent>
            <DTEContent>
              Anyone can take part, whether you have a health condition or not.
              You could take part at a local hospital, your GP surgery or even
              at home.
            </DTEContent>
            <DTEContent>
              Simply register your details and choose the health conditions
              you&apos;re interested in. You&apos;ll then be sent details of
              studies you may want to join.
            </DTEContent>
            <ButtonWrapper>
              <DTEButton
                onClick={() => {
                  history.push("/Participants/register/continue/questions");
                }}
              >
                Start Registration
              </DTEButton>
            </ButtonWrapper>
          </>
        )}
        {!loading && completedDemographics && (
          <>
            <DTEHeader as="h1">
              {content["reusable-registered-with-bpor"]}
            </DTEHeader>
            {content["reusable-nhs-confirmation"]}
            <DTEHeader as="h2">{content["reusable-hear-from-us"]}</DTEHeader>
            <DTEContent>
              As you are registered with Be Part of Research, you may hear from
              us in the coming weeks or months about opportunities to take part
              in research. Some areas of research have more studies than others
              and so how long this will be may vary.
            </DTEContent>
          </>
        )}
      </StepWrapper>
    </>
  );
}

export default NhsAppLanding;
