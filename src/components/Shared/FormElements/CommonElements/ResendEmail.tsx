import Utils from "../../../../Helper/Utils";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";
import ErrorMessageContainer from "../../ErrorMessageContainer/ErrorMessageContainer";
import LoadingIndicator from "../../LoadingIndicator/LoadingIndicator";
import DTEButton from "../../UI/DTEButton/DTEButton";
import { useContext } from "react";
import { ContentContext } from "../../../../context/ContentContext";

type ResendEmailProps = {
  userId?: string;
};

function ResendEmail({ userId }: ResendEmailProps) {
  const { content } = useContext(ContentContext);
  const [{ response: resendResponse, loading: resendLoading, error: resendError }, resend] = useAxiosFetch(
    {
      url: `${process.env.REACT_APP_BASE_API}/users/resendverificationemail`,
      method: "POST",
      data: {
        userId,
      },
    },
    { useCache: false, manual: true }
  );
  return userId ? (
    <>
      {resendLoading && <LoadingIndicator text={content["register-check-email-loading-resend"]} />}
      {!resendLoading && (
        <DTEButton onClick={() => resend()}>{content["register-check-email-button-resend"]}</DTEButton>
      )}
      {resendError && !Utils.ConvertResponseToDTEResponse(resendResponse)?.isSuccess && (
        <div style={{ marginTop: "1rem" }}>
          <ErrorMessageContainer
            axiosError={resendError}
            DTEAxiosErrors={[Utils.ConvertResponseToDTEResponse(resendResponse)?.errors]}
          >
            {content["register-check-email-error-resend"]}
          </ErrorMessageContainer>
        </div>
      )}
      {Utils.ConvertResponseToDTEResponse(resendResponse)?.isSuccess && (
        <div style={{ marginTop: "1rem" }}>{content["register-check-email-success-resend"]}</div>
      )}
    </>
  ) : (
    <></>
  );
}

export default ResendEmail;
