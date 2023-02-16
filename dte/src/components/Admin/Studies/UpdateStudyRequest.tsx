import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams, useHistory } from "react-router-dom";
import { Grid, Container } from "@material-ui/core";
import styled from "styled-components";
import ErrorMessageContainer from "../../Shared/ErrorMessageContainer/ErrorMessageContainer";
import Utils from "../../../Helper/Utils";
import DTEFlourish from "../../Shared/UI/DTEFlourish/DTEFlourish";
import DTEHeader from "../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEInput from "../../Shared/UI/DTEInput/DTEInput";
import DTETextArea from "../../Shared/UI/DTETextArea/DTETextArea";
import DTEButton from "../../Shared/UI/DTEButton/DTEButton";
import DTEChip from "../../Shared/UI/DTEChip/DTEChip";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import LoadingIndicator from "../../Shared/LoadingIndicator/LoadingIndicator";

const PaddedContainer = styled(Container)`
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

const PaddedP = styled.p`
  padding-top: 2rem;
  padding-bottom: 4rem;
`;

interface Props {
  studyid: string;
}

interface IFormValues {
  cpmsid: string;
  irasid: number;
  isrctnid: string;
  title: string;
}

enum Action {
  approve,
  reject,
}

const UpdateStudyRequest = () => {
  const { studyid } = useParams<Props>();
  const history = useHistory();
  const getUrl = `${process.env.REACT_APP_BASE_API}/studyregistrations/${studyid}`;

  const [{ error: updateStatusError }] = useAxiosFetch(
    {
      url: `${process.env.REACT_APP_BASE_API}/studyregistrations/${studyid}/startreview`,
      method: "POST",
      data: {},
    },
    {
      manual: false,
      useCache: false,
    }
  );

  const [{ response: responseGet, loading: loadingGet, error: errorGet }] =
    useAxiosFetch(
      {
        url: getUrl,
        method: "GET",
      },
      {
        manual: false,
        useCache: false,
      }
    );

  const { control, handleSubmit, setValue } = useForm({
    mode: "all",
    defaultValues: {
      irasid: "",
      title: "",
      cpmsid: "",
      isrctnid: "",
    },
  });

  useEffect(() => {
    if (responseGet) {
      setValue(
        "irasid",
        Utils.ConvertResponseToDTEResponse(responseGet)?.content?.studyId,
        { shouldValidate: false }
      );
      setValue(
        "title",
        Utils.ConvertResponseToDTEResponse(responseGet)?.content?.title,
        { shouldValidate: false }
      );
    }
  }, [responseGet]);

  const [
    { response: responsePost, loading: loadingPost, error: errorPost },
    approveOrRejectRequestPost,
  ] = useAxiosFetch(
    {
      method: "POST",
    },
    { manual: true }
  );

  useEffect(() => {
    if (responsePost) {
      history.push("/Admin/Studies");
    }
  }, [responsePost]);

  const handleApproveReject = async (formData: IFormValues, action: Action) => {
    const url =
      action === Action.approve
        ? `${process.env.REACT_APP_BASE_API}/studyregistrations/${formData.irasid}/approve`
        : `${process.env.REACT_APP_BASE_API}/studyregistrations/${formData.irasid}/reject`;
    const payload = {
      title: formData.title,
      cpmsid: formData.cpmsid === "" ? 0 : formData.cpmsid,
      isrctnid: formData.isrctnid,
    };
    await approveOrRejectRequestPost(
      {
        url: `${url}`,
        method: "POST",
        data: action === Action.approve ? payload : {},
      },
      {
        manual: true,
      }
    ).catch(() => {
      // swallow 404 axios error
    });
  };

  const approve = (data: IFormValues) =>
    handleApproveReject(data, Action.approve);
  const reject = (data: IFormValues) =>
    handleApproveReject(data, Action.reject);

  return (
    <>
      <PaddedContainer maxWidth="lg">
        <DTEButton
          onClick={() => history.push(`/Admin/Studies`)}
          $outlined
          $backArrow
          // $small
        >
          Back to study requests
        </DTEButton>
      </PaddedContainer>
      <Container maxWidth="lg">
        <DTEHeader as="h1" $color="blue">
          Study record
        </DTEHeader>
        <DTEFlourish />
        {updateStatusError && (
          <ErrorMessageContainer axiosErrors={[updateStatusError]} />
        )}
        {loadingGet && <LoadingIndicator text="Loading request..." />}
        {!Utils.ConvertResponseToDTEResponse(responseGet)?.isSuccess &&
          Utils.ConvertResponseToDTEResponse(responseGet)?.errors && (
            <ErrorMessageContainer
              DTEAxiosErrors={[
                Utils.ConvertResponseToDTEResponse(responseGet)?.errors,
              ]}
            />
          )}
        {errorGet && <ErrorMessageContainer axiosErrors={[errorGet]} />}
        {responseGet &&
          Utils.ConvertResponseToDTEResponse(responseGet)?.isSuccess && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {Utils.ConvertResponseToDTEResponse(responseGet)?.content
                  ?.studyRegistrationStatus === "None" ? (
                  <DTEChip
                    label="New request"
                    size="small"
                    $color="grey"
                    $bold
                  />
                ) : (
                  <DTEChip
                    label="Under review"
                    size="small"
                    $color="light-orange"
                    $bold
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={10} md={8} lg={7} xl={6}>
                <form noValidate>
                  <Grid container direction="column">
                    <Grid item xs={12}>
                      <Controller
                        control={control}
                        name="title"
                        render={({
                          field: { value, onChange },
                          fieldState: { error },
                        }) => (
                          <DTETextArea
                            value={value}
                            onValueChange={onChange}
                            error={error?.message}
                            label="Study title"
                            required
                          />
                        )}
                        rules={{
                          required: {
                            value: true,
                            message: "Study title required",
                          },
                          minLength: {
                            value: 1,
                            message: "Please Enter a valid study title",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <Controller
                        control={control}
                        name="irasid"
                        render={({
                          field: { value, onChange },
                          fieldState: { error },
                        }) => (
                          <DTEInput
                            value={value}
                            onValueChange={onChange}
                            error={error?.message}
                            label="IRAS ID"
                            required
                            disabled
                          />
                        )}
                        rules={{
                          required: {
                            value: true,
                            message: "IRAS ID required",
                          },
                          minLength: {
                            value: 1,
                            message: "Please Enter a valid IRAS ID",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <Controller
                        control={control}
                        name="cpmsid"
                        render={({
                          field: { value, onChange },
                          fieldState: { error },
                        }) => (
                          <DTEInput
                            value={value}
                            error={error?.message}
                            onValueChange={onChange}
                            label="CPMS ID"
                            required
                          />
                        )}
                        rules={{
                          pattern: {
                            value:
                              // eslint-disable-next-line no-useless-escape
                              /^\d*$/,
                            message: "CMPS ID should be a number",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <Controller
                        control={control}
                        name="isrctnid"
                        render={({ field: { value, onChange } }) => (
                          <DTEInput
                            value={value}
                            onValueChange={onChange}
                            label="ISRCTN ID"
                            required
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item>
                      <DTEButton onClick={handleSubmit(approve)}>
                        Update and approve request
                      </DTEButton>
                    </Grid>
                    <Grid item>
                      <DTEButton onClick={handleSubmit(reject)} $outlined>
                        Decline request
                      </DTEButton>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
              <Grid item xs={12}>
                <PaddedP>
                  Requested by
                  <br />
                  {
                    Utils.ConvertResponseToDTEResponse(responseGet)?.content
                      ?.researcher.firstname
                  }{" "}
                  {
                    Utils.ConvertResponseToDTEResponse(responseGet)?.content
                      ?.researcher.lastname
                  }
                  {", "}
                  {
                    Utils.ConvertResponseToDTEResponse(responseGet)?.content
                      ?.researcher.email
                  }
                </PaddedP>
              </Grid>
            </Grid>
          )}
        {loadingPost && <LoadingIndicator />}
        {errorPost && <ErrorMessageContainer axiosError={errorPost} />}
      </Container>
    </>
  );
};

export default UpdateStudyRequest;
