import { Container } from "@material-ui/core";
import { useHistory, useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import Utils from "../../../Helper/Utils";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import ErrorMessageContainer from "../../Shared/ErrorMessageContainer/ErrorMessageContainer";
import LoadingIndicator from "../../Shared/LoadingIndicator/LoadingIndicator";
import DTEButton from "../../Shared/UI/DTEButton/DTEButton";
import DTEFlourish from "../../Shared/UI/DTEFlourish/DTEFlourish";
import DTEHeader from "../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTETable from "../../Shared/UI/DTETable/DTETable";
import DTEChip from "../../Shared/UI/DTEChip/DTEChip";
import { StudySite as Site } from "../../../types/ResearcherTypes";
import StudyDetailsHeader from "../../Shared/StudyDetailsHeader/StudyDetailsHeader";

const PaddedContainer = styled(Container)`
  padding-top: 2rem;
`;

const HeaderContainer = styled.div`
  padding-top: 2rem;
`;

interface ViewSitesProps {
  studyid: string;
}

const ViewSites = () => {
  const { studyid } = useParams<ViewSitesProps>();
  const history = useHistory();
  const location = useLocation();

  const [{ response, loading, error }] = useAxiosFetch(
    {
      url: `${process.env.REACT_APP_BASE_API}/studies/${studyid}/sites`,
      method: "GET",
    },
    { manual: false, useCache: false }
  );

  return (
    <>
      <StudyDetailsHeader studyid={studyid} title={location?.state?.title} />
      <PaddedContainer maxWidth="lg" role="main">
        <DTEButton
          onClick={() => history.push(`/Researchers/Study/${studyid}`)}
          $outlined
          $backArrow
          $small
        >
          Back to study dashboard
        </DTEButton>
        {loading && <LoadingIndicator text="Loading sites..." />}
        <ErrorMessageContainer
          axiosErrors={[error]}
          DTEAxiosErrors={[
            Utils.ConvertResponseToDTEResponse(response)?.errors,
          ]}
        />
        {response && Utils.ConvertResponseToDTEResponse(response)?.isSuccess && (
          <>
            <HeaderContainer>
              <DTEHeader as="h1" $color="blue">
                Study sites
              </DTEHeader>
            </HeaderContainer>

            <DTEFlourish />
            {Utils.ConvertResponseToDTEResponse(response)?.content.items
              .length > 0 && (
              <DTETable
                rows={Utils.ConvertResponseToDTEResponse(
                  response
                )?.content.items.map((site: Site) => {
                  return {
                    "Site code":
                      site?.identifier?.split("@")[0] || "No RTS code",
                    "Site name": site?.name || "No organisation name",
                    "Site address":
                      [
                        site?.addressLine1,
                        site?.addressLine2,
                        site?.addressLine3,
                        site?.addressLine4,
                        site?.addressLine5,
                        site?.postcode,
                      ]
                        .filter((e: string | null | undefined) => e)
                        .join(", ") || "No address",
                    Status:
                      (
                        <DTEChip
                          label={site?.studySiteStatus
                            ?.replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                            .split(" ")
                            .map((word, i) =>
                              i > 0 ? word.toLowerCase() : word
                            )
                            .join(" ")}
                          $bold
                          $color="light-orange"
                        />
                      ) || "No status",
                  };
                })}
                columns={[
                  { name: "Site code", width: 1.5 },
                  { name: "Site name", width: 2 },
                  { name: "Site address", width: 4 },
                  { name: "Status", width: 2 },
                ]}
              />
            )}
          </>
        )}
      </PaddedContainer>
    </>
  );
};

export default ViewSites;
