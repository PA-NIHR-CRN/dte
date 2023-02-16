import DTEPaper from "../../Shared/UI/DTEPaper/DTEPaper";
import DTEHeader from "../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../Shared/UI/DTETypography/DTEContent/DTEContent";
import Utils from "../../../Helper/Utils";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import ErrorMessageContainer from "../../Shared/ErrorMessageContainer/ErrorMessageContainer";
import LoadingIndicator from "../../Shared/LoadingIndicator/LoadingIndicator";
import DTETable from "../../Shared/UI/DTETable/DTETable";

interface AllowUser {
  email: string;
}

const AccessListTable = () => {
  const [
    {
      response: accessListResponse,
      loading: accessListLoading,
      // error: accessListError,
    },
  ] = useAxiosFetch(
    {
      url: `${process.env.REACT_APP_BASE_API}/users/accesswhitelist`,
    },
    {
      useCache: false,
    }
  );

  return (
    <>
      {accessListLoading && <LoadingIndicator text="Loading access list..." />}
      {!Utils.ConvertResponseToDTEResponse(accessListResponse)?.isSuccess &&
        Utils.ConvertResponseToDTEResponse(accessListResponse)?.errors && (
          <ErrorMessageContainer
            DTEAxiosErrors={[
              Utils.ConvertResponseToDTEResponse(accessListResponse)?.errors,
            ]}
          />
        )}
      {!accessListLoading &&
        Utils.ConvertResponseToDTEResponse(accessListResponse)?.isSuccess &&
        (Utils.ConvertResponseToDTEResponse(accessListResponse)?.content
          ?.length > 0 ? (
          <DTETable
            rows={Utils.ConvertResponseToDTEResponse(
              accessListResponse
            )?.content.map((user: AllowUser) => {
              return {
                Email: user.email,
              };
            })}
            columns={[{ name: "Email", width: 10 }]}
          />
        ) : (
          <DTEPaper $spaced>
            <DTEHeader as="h2" $align="center">
              Access List
            </DTEHeader>
            <DTEContent $align="center">
              Emails of users who are allowed to register for private beta will
              be displayed here.
            </DTEContent>
          </DTEPaper>
        ))}
    </>
  );
};

export default AccessListTable;
