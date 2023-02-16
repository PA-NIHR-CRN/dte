import { useState, useEffect, ReactNode } from "react";
import DTEPaper from "../../Shared/UI/DTEPaper/DTEPaper";
import DTEChip from "../../Shared/UI/DTEChip/DTEChip";
import DTEHeader from "../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../Shared/UI/DTETypography/DTEContent/DTEContent";
import Utils from "../../../Helper/Utils";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import ErrorMessageContainer from "../../Shared/ErrorMessageContainer/ErrorMessageContainer";
import LoadingIndicator from "../../Shared/LoadingIndicator/LoadingIndicator";
import DTETable from "../../Shared/UI/DTETable/DTETable";

interface LeadResearcher {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}

interface StudyRequest {
  studyId: number;
  title: string;
  researcher: LeadResearcher;
  studyRegistrationStatus: string;
  approvedAtUtc: Date;
  submittedAtUtc: Date;
  createdById: string;
}

const DeclinedStudyRequestsTable = () => {
  const getStudyRegistrationsURL = `${process.env.REACT_APP_BASE_API}/studyregistrations/status/5`;
  const [{ response, loading, error }] = useAxiosFetch(
    {
      url: getStudyRegistrationsURL,
      method: "GET",
    },
    {
      manual: false,
      useCache: false,
    }
  );

  const [studies, setStudies] = useState<StudyRequest[]>();

  useEffect(() => {
    if (response) {
      const parsedResponse = Utils.ConvertResponseToDTEResponse(response);
      if (parsedResponse) {
        setStudies(() => {
          return parsedResponse as unknown as StudyRequest[];
        });
      }
    }
  }, [response]);

  return (
    <>
      {error && <ErrorMessageContainer axiosErrors={[error]} />}
      {loading && <LoadingIndicator text="Loading study requests..." />}
      {!Utils.ConvertResponseToDTEResponse(response)?.isSuccess &&
        Utils.ConvertResponseToDTEResponse(response)?.errors && (
          <ErrorMessageContainer
            DTEAxiosErrors={[
              Utils.ConvertResponseToDTEResponse(response)?.errors,
            ]}
          />
        )}
      {!loading &&
        !error &&
        (studies ? (
          <DTETable
            rows={studies.map((study: StudyRequest) => {
              const date = new Date(study.submittedAtUtc);
              const formattedDate = date.toLocaleString("en-GB", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              });
              const requestedBy: ReactNode = (
                <>
                  {formattedDate} by <br /> {study.researcher.firstname}{" "}
                  {study.researcher.lastname}
                </>
              );
              return {
                "IRAS ID": study.studyId,
                "Study title": study.title,
                Request: requestedBy,
                Status: (
                  <DTEChip label="Declined" size="small" $color="red" $bold />
                ),
              };
            })}
            columns={[
              { name: "IRAS ID", width: 1 },
              { name: "Study title", width: 5 },
              { name: "Request", width: 2 },
              { name: "Status", width: 1 },
            ]}
          />
        ) : (
          <DTEPaper $spaced>
            <DTEHeader as="h2" $color="blue" $align="center">
              Study requests
            </DTEHeader>
            <DTEContent $align="center">
              Declined requests for studies to this service will be shown here,
              it will include the IRAS ID and who made the request.
            </DTEContent>
          </DTEPaper>
        ))}
    </>
  );
};

export default DeclinedStudyRequestsTable;
