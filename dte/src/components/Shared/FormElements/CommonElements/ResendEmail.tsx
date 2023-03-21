import Utils from "../../../../Helper/Utils";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";
import ErrorMessageContainer from "../../ErrorMessageContainer/ErrorMessageContainer";
import LoadingIndicator from "../../LoadingIndicator/LoadingIndicator";
import DTEButton from "../../UI/DTEButton/DTEButton";
import DTEContent from "../../UI/DTETypography/DTEContent/DTEContent";

type ResendEmailProps = {
  userId?: string;
};

const ResendEmail = ({ userId }: ResendEmailProps) => {
  const [
    { response: resendResponse, loading: resendLoading, error: resendError },
    resend,
  ] = useAxiosFetch(
    {
      url: `${process.env.REACT_APP_BASE_API}/users/resendverificationemail`,
      method: "POST",
      data: {
        email: userId,
      },
    },
    { useCache: false, manual: true }
  );
  return userId ? (
    <>
      {resendLoading && <LoadingIndicator text="Resending Email..." />}
      {!resendLoading && (
        <DTEButton onClick={() => resend()}>
          Resend verification email
        </DTEButton>
      )}
      {resendError &&
        !Utils.ConvertResponseToDTEResponse(resendResponse)?.isSuccess && (
          <div style={{ marginTop: "1rem" }}>
            <ErrorMessageContainer
              axiosError={resendError}
              DTEAxiosErrors={[
                Utils.ConvertResponseToDTEResponse(resendResponse)?.errors,
              ]}
            >
              <DTEContent>
                There has been a technical issue. Please try again later.
              </DTEContent>
            </ErrorMessageContainer>
          </div>
        )}
      {Utils.ConvertResponseToDTEResponse(resendResponse)?.isSuccess && (
        <div style={{ marginTop: "1rem" }}>
          <DTEContent>
            We&apos;ve resent the email. If you need help, please contact{" "}
            <a href="mailto:bepartofresearch@nihr.ac.uk">
              bepartofresearch@nihr.ac.uk
            </a>
          </DTEContent>
        </div>
      )}
    </>
  ) : (
    <></>
  );
};

export default ResendEmail;
