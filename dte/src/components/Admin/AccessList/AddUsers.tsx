import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Grid, Container } from "@material-ui/core";
import DTEPaper from "../../Shared/UI/DTEPaper/DTEPaper";
import DTEContent from "../../Shared/UI/DTETypography/DTEContent/DTEContent";
import ErrorMessageContainer from "../../Shared/ErrorMessageContainer/ErrorMessageContainer";
import Utils from "../../../Helper/Utils";
import DTEHeader from "../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTETextArea from "../../Shared/UI/DTETextArea/DTETextArea";
import DTEButton from "../../Shared/UI/DTEButton/DTEButton";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import LoadingIndicator from "../../Shared/LoadingIndicator/LoadingIndicator";

interface IFormValues {
  emails: string;
}

const AddUsers = () => {
  const { control, handleSubmit, reset } = useForm({
    mode: "all",
    defaultValues: {
      emails: "",
    },
  });

  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const [
    { response: responsePost, loading: loadingPost, error: errorPost },
    submitWhitelistPost,
  ] = useAxiosFetch(
    {
      method: "POST",
    },
    { manual: true }
  );

  useEffect(() => {
    if (Utils.ConvertResponseToDTEResponse(responsePost)?.isSuccess) {
      reset();
      setShowSuccess(true);
    }
  }, [responsePost]);

  const onSubmit = async (formData: IFormValues) => {
    setShowSuccess(false);
    const url = `${process.env.REACT_APP_BASE_API}/users/accesswhitelist`;
    const splitEmailList = formData.emails?.split(",");
    const emailList = splitEmailList.map((email) => email.trim());

    const filteredEmails = emailList.filter((e) => e.includes("@"));
    const payload = {
      emails: filteredEmails,
    };
    await submitWhitelistPost(
      {
        url: `${url}`,
        method: "POST",
        data: payload,
      },
      {
        manual: true,
      }
    ).catch(() => {
      // swallow 404 axios error
    });
  };

  return (
    <>
      <Container maxWidth="lg">
        <DTEPaper>
          <DTEHeader as="h2" $variant="h4" $align="center">
            Add emails to be added to the box below
          </DTEHeader>
          <DTEContent $align="center">
            use commas to separate multiple emails. <br />
            e.g. email1@domain.com,email2@domain2.com,email3@domain.com
          </DTEContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Grid container direction="column">
                  <Grid item xs={12}>
                    <Controller
                      control={control}
                      name="emails"
                      render={({
                        field: { value, onChange },
                        fieldState: { error },
                      }) => (
                        <DTETextArea
                          value={value}
                          onValueChange={onChange}
                          error={error?.message}
                          label="Emails"
                          required
                          rows={10}
                        />
                      )}
                      rules={{
                        required: {
                          value: true,
                          message: "Email list required",
                        },
                        minLength: {
                          value: 1,
                          message: "Please Enter an email list",
                        },
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item>
                    <DTEButton disabled={loadingPost}>Submit</DTEButton>
                    {Utils.ConvertResponseToDTEResponse(responsePost)
                      ?.isSuccess &&
                      showSuccess && <p>Success</p>}
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
          {loadingPost && <LoadingIndicator />}
          {errorPost && <ErrorMessageContainer axiosError={errorPost} />}
          {!Utils.ConvertResponseToDTEResponse(responsePost)?.isSuccess &&
            Utils.ConvertResponseToDTEResponse(responsePost)?.errors && (
              <ErrorMessageContainer
                DTEAxiosErrors={[
                  Utils.ConvertResponseToDTEResponse(responsePost)?.errors,
                ]}
              />
            )}
        </DTEPaper>
      </Container>
    </>
  );
};

export default AddUsers;
