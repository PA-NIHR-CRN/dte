import { useEffect } from "react";
import { Grid } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import styled from "styled-components";
import DTEHR from "../UI/DTEHR/DTEHR";
import Utils from "../../../Helper/Utils";
import useAxiosFetch from "../../../hooks/useAxiosFetch";

interface StudyDetailsHeaderProps {
  title?: string;
  studyid: string;
}

const DetailsWrapper = styled.div`
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 10px;
`;

function StudyDetailsHeader(props: StudyDetailsHeaderProps) {
  const { title, studyid } = props;
  const [{ response, loading, error }, getDetails] = useAxiosFetch(
    {
      url: `${process.env.REACT_APP_BASE_API}/studies/${studyid}`,
      method: "GET",
    },
    { manual: true, useCache: true }
  );

  useEffect(() => {
    if (!title) {
      getDetails().catch(() => {});
    }
  }, [title]);

  return (
    <DetailsWrapper>
      <Grid justifyContent="space-between" alignItems="center" container>
        <Grid item xs={loading ? 6 : undefined}>
          {title || (
            <>
              {loading && <Skeleton variant="text" />}
              {error && "Unable to load title"}
              {response &&
                Utils.ConvertResponseToDTEResponse(response)?.isSuccess &&
                (Utils.ConvertResponseToDTEResponse(response)?.content?.item?.title || "No title found")}
              {response && !Utils.ConvertResponseToDTEResponse(response)?.isSuccess && "Unable to load title"}
            </>
          )}
        </Grid>
        <Grid item>
          <strong>IRAS ID: </strong>
          {studyid}
        </Grid>
      </Grid>
      <DTEHR />
    </DetailsWrapper>
  );
}

export default StudyDetailsHeader;
