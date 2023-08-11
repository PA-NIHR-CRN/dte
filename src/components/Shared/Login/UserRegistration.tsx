import React, { useState } from "react";
import { TextField, Button, Grid, makeStyles } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import DTEPaper from "../UI/DTEPaper/DTEPaper";
import ErrorSummary from "../ErrorMessageContainer/ErrorSummary";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import ErrorMessageContainer from "../ErrorMessageContainer/ErrorMessageContainer";
import DTEHeader from "../UI/DTETypography/DTEHeader/DTEHeader";

function UserRegistration() {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm({ mode: "all" });

  const [successfullRegistration, setSuccessfullRegistration] = useState(false);
  const onSubmit = async (formData: any) => {
    const res = await registerAccount(
      {
        url: `${process.env.REACT_APP_BASE_API}/users/create`,
        method: "POST",
        data: { ...formData },
      },
      {
        manual: true,
      },
    ).catch(() => {
      // swallow 404 axios error -
    });
    if (res?.status === 200) {
      if (res.data?.success === true) {
        enqueueSnackbar("Successfully Registered", { variant: "success" });
        setSuccessfullRegistration(true);
      } else {
        enqueueSnackbar("Failed to Register", { variant: "error" });
        setSuccessfullRegistration(false);
      }
    } else {
      enqueueSnackbar("Failed to Register", { variant: "error" });
    }
  };

  const { enqueueSnackbar } = useSnackbar();

  const [
    { data: dataRegister, loading: loadingRegister, error: errorRegister },
    registerAccount,
    // clearUpdateParticipant,
  ] = useAxiosFetch({});

  const useStyles = makeStyles((theme) => ({
    grid: {
      width: "100%",
      margin: "0px",
    },
    paper: {
      padding: theme.spacing(3),
      textAlign: "center",
      color: theme.palette.text.secondary,
      border: 2,
      borderColor: theme.palette.nhsnavy.dark,
    },
    field: {
      margin: "10px",
    },
  }));
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={2}
      className={classes.grid}
      justifyContent="center"
    >
      <Grid item xs={12} md={6}>
        <DTEPaper className={classes.paper}>
          {successfullRegistration && (
            <DTEHeader as="h4">
              Registration Successfull, please check your email for an account
              verification email
            </DTEHeader>
          )}
          {!successfullRegistration && (
            <>
              <DTEHeader as="h4">
                Please enter a username and password to register an account
              </DTEHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  id="username"
                  className={classes.field}
                  defaultValue=""
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  type="string"
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register("username", {
                    required: { value: true, message: "Email required" },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Enter a valid e-mail address",
                    },
                    minLength: {
                      value: 1,
                      message: "Please Enter a valid email address",
                    },
                  })}
                />
                <TextField
                  id="password"
                  className={classes.field}
                  defaultValue=""
                  label="Password"
                  variant="outlined"
                  fullWidth
                  required
                  type="password"
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register("password", {
                    required: { value: true, message: "Password Required" },
                  })}
                />
                <Button type="submit" disabled={loadingRegister}>
                  Register
                </Button>
                <ErrorSummary errors={formErrors} />
              </form>
            </>
          )}
          {!successfullRegistration && dataRegister && (
            <DTEHeader as="h4">
              Registration Failed: {dataRegister?.errorMessage}
            </DTEHeader>
          )}
          {loadingRegister && <LoadingIndicator />}
          {errorRegister?.isAxiosError && (
            <Grid item xs={12}>
              <DTEPaper className={classes.paper}>
                <ErrorMessageContainer>
                  {`Registration Failed: ${errorRegister.message}`}
                </ErrorMessageContainer>
              </DTEPaper>
            </Grid>
          )}
        </DTEPaper>
      </Grid>
    </Grid>
  );
}

export default UserRegistration;
