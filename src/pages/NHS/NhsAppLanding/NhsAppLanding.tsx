import { useHistory } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import DTEHeader from "../../../components/Shared/UI/DTETypography/DTEHeader/DTEHeader";
import StepWrapper from "../../../components/Shared/StepWrapper/StepWrapper";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import Utils from "../../../Helper/Utils";
import { AuthContext } from "../../../context/AuthContext";
import LoadingIndicator from "../../../components/Shared/LoadingIndicator/LoadingIndicator";
import { ContentContext } from "../../../context/ContentContext";

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
            <DTEHeader as="h1">
              {content["nhsapp-landing-be-part-of-research"]}
            </DTEHeader>
            {content["nhsapp-landing-page"]}
          </>
        )}
        {!loading && completedDemographics && (
          <>
            <DTEHeader as="h1">
              {content["reusable-registered-with-bpor"]}
            </DTEHeader>
            {content["reusable-nhs-confirmation"]}
            <DTEHeader as="h2">{content["reusable-hear-from-us"]}</DTEHeader>
            {content["nhsapp-landing-hear-from-us"]}
          </>
        )}
      </StepWrapper>
    </>
  );
}

export default NhsAppLanding;
