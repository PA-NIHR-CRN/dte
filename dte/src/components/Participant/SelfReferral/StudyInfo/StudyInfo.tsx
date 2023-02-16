import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Container } from "@material-ui/core";
import DTEHeader from "../../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import StepWrapper from "../../../Shared/StepWrapper/StepWrapper";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";
import LoadingIndicator from "../../../Shared/LoadingIndicator/LoadingIndicator";
import ErrorMessageContainer from "../../../Shared/ErrorMessageContainer/ErrorMessageContainer";
import Utils from "../../../../Helper/Utils";
import DTERouteLink from "../../../Shared/UI/DTERouteLink/DTERouteLink";
import DTERichTextRender from "../../../Shared/UI/DTERichText/DTERichTextRender";

const PaddedContainer = styled(Container)`
  && {
    padding: 1rem 0rem 1rem 0rem;
  }
`;
interface Props {
  studyid: string;
}

const StudyInfo = () => {
  const { studyid } = useParams<Props>();
  const url = `/Participants/SelfReferral/Continue/${studyid}`;
  const getUrl = `${process.env.REACT_APP_BASE_API}/studies/${studyid}/info`;
  const [{ response, loading, error }] = useAxiosFetch(
    {
      url: getUrl,
      method: "GET",
    },
    {
      manual: false,
      useCache: false,
    }
  );

  return (
    <>
      <StepWrapper>
        {loading && <LoadingIndicator text="Loading..." />}
        {!Utils.ConvertResponseToDTEResponse(response)?.isSuccess &&
          Utils.ConvertResponseToDTEResponse(response)?.errors && (
            <ErrorMessageContainer
              DTEAxiosErrors={[
                Utils.ConvertResponseToDTEResponse(response)?.errors,
              ]}
            />
          )}
        {error && <ErrorMessageContainer axiosErrors={[error]} />}
        {Utils.ConvertResponseToDTEResponse(response)?.isSuccess &&
          response &&
          !loading &&
          !error && (
            <>
              <PaddedContainer>
                <DTEHeader as="h2" $variant="h4" $weight="normal">
                  {Utils.ConvertResponseToDTEResponse(response)?.content?.title}
                </DTEHeader>
                <DTEHeader as="h2" $color="blue">
                  About this study
                </DTEHeader>
                {Utils.ConvertResponseToDTEResponse(response)?.content
                  ?.whatImportant && (
                  <DTERichTextRender
                    richText={`"${
                      Utils.ConvertResponseToDTEResponse(response)?.content
                        ?.whatImportant
                    }"`}
                  />
                )}
              </PaddedContainer>
              <DTERouteLink to={url}>Continue</DTERouteLink>
            </>
          )}
      </StepWrapper>
    </>
  );
};

export default StudyInfo;
