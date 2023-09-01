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

const ButtonWrapper = styled.div`
  margin: 1rem 0;
`;

const NhsAppLanding = () => {
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
    }
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
            <strong>
              This service is provided by the National Institute for Health and
              Care Research
            </strong>
          </div>
        </div>
      )}

      <StepWrapper>
        {loading && <LoadingIndicator />}
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
              You are registered with Be Part of Research
            </DTEHeader>
            <DTEContent>
              You can visit the Be Part of Research website and sign in using
              the NHS login option to change your preferences and personal
              details.
            </DTEContent>
            <DTEHeader as="h2">When will you hear from us?</DTEHeader>
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
};

export default NhsAppLanding;
