import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import DTEPaper from "../../Shared/UI/DTEPaper/DTEPaper";
import DTEChip from "../../Shared/UI/DTEChip/DTEChip";
import DTEHeader from "../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../Shared/UI/DTETypography/DTEContent/DTEContent";
import Utils from "../../../Helper/Utils";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import ErrorMessageContainer from "../../Shared/ErrorMessageContainer/ErrorMessageContainer";
import LoadingIndicator from "../../Shared/LoadingIndicator/LoadingIndicator";
import DTETable from "../../Shared/UI/DTETable/DTETable";
import DTELinkButton from "../../Shared/UI/DTELinkButton/DTELinkButton";

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

const StudyRequestsTable = () => {
  const [studies, setStudies] = useState<StudyRequest[]>();
  const history = useHistory();

  const [
    {
      response: newRequestResponse,
      loading: newRequestLoading,
      error: newRequestError,
    },
  ] = useAxiosFetch(
    {
      url: `${process.env.REACT_APP_BASE_API}/studyregistrations/status/0`,
    },
    {
      useCache: false,
    }
  );

  const [
    {
      response: waitingForApprovalResponse,
      loading: waitingForApprovalLoading,
      error: waitingForApprovalError,
    },
  ] = useAxiosFetch(
    {
      url: `${process.env.REACT_APP_BASE_API}/studyregistrations/status/1`,
    },
    {
      useCache: false,
    }
  );

  useEffect(() => {
    if (newRequestResponse || waitingForApprovalResponse) {
      const a = Utils.ConvertResponseToDTEResponse(newRequestResponse)
        ? (Utils.ConvertResponseToDTEResponse(
            newRequestResponse
          ) as unknown as StudyRequest[])
        : [];
      const b = Utils.ConvertResponseToDTEResponse(waitingForApprovalResponse)
        ? (Utils.ConvertResponseToDTEResponse(
            waitingForApprovalResponse
          ) as unknown as StudyRequest[])
        : [];
      setStudies(() => {
        return a.concat(b);
      });
    }
  }, [newRequestResponse, waitingForApprovalResponse]);

  return (
    <>
      {(newRequestLoading || waitingForApprovalLoading) && (
        <LoadingIndicator text="Loading study requests..." />
      )}
      {!Utils.ConvertResponseToDTEResponse(newRequestResponse)?.isSuccess &&
        Utils.ConvertResponseToDTEResponse(newRequestResponse)?.errors && (
          <ErrorMessageContainer
            DTEAxiosErrors={[
              Utils.ConvertResponseToDTEResponse(newRequestResponse)?.errors,
            ]}
          />
        )}
      {!Utils.ConvertResponseToDTEResponse(waitingForApprovalResponse)
        ?.isSuccess &&
        Utils.ConvertResponseToDTEResponse(waitingForApprovalResponse)
          ?.errors && (
          <ErrorMessageContainer
            DTEAxiosErrors={[
              Utils.ConvertResponseToDTEResponse(waitingForApprovalResponse)
                ?.errors,
            ]}
          />
        )}
      {((newRequestError && newRequestError?.response?.status !== 404) ||
        (waitingForApprovalError &&
          waitingForApprovalError?.response?.status !== 404)) && (
        <ErrorMessageContainer
          axiosErrors={[newRequestError, waitingForApprovalError]}
        />
      )}
      {!newRequestLoading &&
        !waitingForApprovalLoading &&
        (studies ? (
          <DTETable
            rows={studies.map((study: StudyRequest) => {
              const date = new Date(study.submittedAtUtc);
              const formattedDate = date.toLocaleString("en-GB", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              });
              const requestedBy = (
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
                  <>
                    {study.studyRegistrationStatus === "WaitingForApproval" && (
                      <DTEChip
                        label="Under review"
                        size="small"
                        $color="light-orange"
                        $bold
                      />
                    )}
                    {study.studyRegistrationStatus === "None" && (
                      <DTEChip
                        label="New request"
                        size="small"
                        $color="grey"
                        $bold
                      />
                    )}
                  </>
                ),
                Action: (
                  <DTELinkButton
                    onClick={() => {
                      history.push(`/Admin/Studies/${study.studyId}`);
                    }}
                  >
                    Review
                  </DTELinkButton>
                ),
              };
            })}
            columns={[
              { name: "IRAS ID", width: 1 },
              { name: "Study title", width: 5 },
              { name: "Request", width: 2 },
              { name: "Status", width: 2 },
              { name: "Action", width: 1 },
            ]}
          />
        ) : (
          <DTEPaper $spaced>
            <DTEHeader as="h2" $color="blue" $align="center">
              Study requests
            </DTEHeader>
            <DTEContent $align="center">
              Requests to add studies to this service will be shown here, it
              will include the IRAS ID and who made the request.
            </DTEContent>
          </DTEPaper>
        ))}
    </>
  );
};

export default StudyRequestsTable;
