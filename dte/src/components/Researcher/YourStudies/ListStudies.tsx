import { Link as RouterLink } from "react-router-dom";
import { Link } from "@material-ui/core";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import DTEChip from "../../Shared/UI/DTEChip/DTEChip";
import Utils from "../../../Helper/Utils";
import ErrorMessageContainer from "../../Shared/ErrorMessageContainer/ErrorMessageContainer";
import DTEPaper from "../../Shared/UI/DTEPaper/DTEPaper";
import DTEHeader from "../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../Shared/UI/DTETypography/DTEContent/DTEContent";
import LoadingIndicator from "../../Shared/LoadingIndicator/LoadingIndicator";
import DTETable from "../../Shared/UI/DTETable/DTETable";

interface LeadResearcher {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}
interface Study {
  studyId: number;
  cpmsId: number;
  irasId: number;
  isrctnId: string;
  title: string;
  shortName: string;
  about: string;
  howHelp: string;
  whenNeeded: string;
  studyQuestionnaireLink: string;
  leadResearcher: LeadResearcher;
  sites?: any;
  status: string;
  createdAtUtc: Date;
  createdById: string;
  updatedAtUtc?: any;
  updatedById?: any;
}

const ListStudies = () => {
  const url = `${process.env.REACT_APP_BASE_API}/studies?limit=100`;
  const [{ response, loading, error }] = useAxiosFetch(
    {
      url,
      method: "GET",
    },
    {
      manual: false,
      useCache: true,
    }
  );

  return (
    <>
      {loading && <LoadingIndicator text="Loading studies..." />}
      {!Utils.ConvertResponseToDTEResponse(response)?.isSuccess &&
        Utils.ConvertResponseToDTEResponse(response)?.errors && (
          <ErrorMessageContainer
            DTEAxiosErrors={[
              Utils.ConvertResponseToDTEResponse(response)?.errors,
            ]}
          />
        )}
      {error && <ErrorMessageContainer axiosError={error} />}
      {response &&
        Utils.ConvertResponseToDTEResponse(response)?.isSuccess &&
        (Utils.ConvertResponseToDTEResponse(response)?.content.items?.length >
        0 ? (
          <DTETable
            rows={Utils.ConvertResponseToDTEResponse(
              response
            )?.content.items.map((study: Study) => {
              return {
                // id: i,
                "IRAS ID": `${study.studyId}`,
                "CPMS ID": `${study.cpmsId !== 0 ? study.cpmsId : null}`,
                "Study title": (
                  <Link
                    component={RouterLink}
                    to={`/Researchers/Study/${study.studyId}`}
                    underline="hover"
                  >
                    {study.title}
                  </Link>
                ),

                Status: (
                  <DTEChip
                    label={
                      study.status === "InSetup"
                        ? "Study in set up"
                        : study.status
                            .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                            .split(" ")
                            .map((word, i) =>
                              i > 0 ? word.toLowerCase() : word
                            )
                            .join(" ")
                    }
                    size="small"
                    $color="light-orange"
                    $bold
                  />
                ),
                "Last updated": `${new Date(
                  study.createdAtUtc
                ).toLocaleDateString("en-GB")}`,
              };
            })}
            columns={[
              { name: "IRAS ID", width: 1 },
              { name: "CPMS ID", width: 1 },
              { name: "Study title", width: 4 },
              { name: "Last updated", width: 1 },
              { name: "Status", width: 1 },
            ]}
          />
        ) : (
          <DTEPaper $spaced>
            <DTEHeader as="h1" $variant="h2" $color="blue" $align="center">
              You have no studies added to DTE
            </DTEHeader>
            <DTEContent $align="center">
              Please contact your study team admin, they will need to add you to
              a study before it can be seen here
            </DTEContent>
          </DTEPaper>
        ))}
    </>
  );
};

export default ListStudies;
